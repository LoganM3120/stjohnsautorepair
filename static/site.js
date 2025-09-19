(function () {
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileNav = document.getElementById('mobile-navigation');

  if (menuButton && mobileNav) {
    const toggleMenu = () => {
      const isOpen = mobileNav.getAttribute('data-open') === 'true';
      const nextState = !isOpen;
      mobileNav.setAttribute('data-open', String(nextState));
      mobileNav.setAttribute('aria-hidden', String(!nextState));
      menuButton.setAttribute('aria-expanded', String(nextState));
    };

    menuButton.addEventListener('click', toggleMenu);

    mobileNav.querySelectorAll('a, [data-quote-trigger]').forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileNav.getAttribute('data-open') === 'true') {
          menuButton.click();
        }
      });
    });
  }

  const year = new Date().getFullYear();
  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(year);
  });

  const quoteModal = document.querySelector('[data-quote-modal]');

  if (quoteModal) {
    const quoteTriggers = document.querySelectorAll('[data-quote-trigger]');
    const dismissButtons = quoteModal.querySelectorAll('[data-quote-dismiss]');
    const otherField = quoteModal.querySelector('[data-other-field]');
    const otherInput = quoteModal.querySelector('[data-other-input]');
    const copyToggle = quoteModal.querySelector('[data-copy-toggle]');
    const copyInput = quoteModal.querySelector('[data-copy-input]');
    const quoteForm = quoteModal.querySelector('.quote-form');
    const statusNode = quoteModal.querySelector('[data-quote-status]');
    const submitButton = quoteForm
      ? quoteForm.querySelector('button[type="submit"]')
      : null;
    const defaultSubmitText =
      submitButton && submitButton.textContent
        ? submitButton.textContent
        : 'Submit Request';
    const focusableSelectors =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]';
    let lastFocusedElement = null;
    const setStatus = (message, status) => {
      if (!statusNode) {
        return;
      }

      statusNode.textContent = message;

      if (status) {
        statusNode.setAttribute('data-status', status);
      } else {
        statusNode.removeAttribute('data-status');
      }
    };

    const openQuoteModal = () => {
      if (!quoteModal) return;

      lastFocusedElement = document.activeElement;
      quoteModal.setAttribute('data-open', 'true');
      quoteModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('quote-modal-open');
      setStatus('', null);
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultSubmitText;
      }

      const firstField = quoteModal.querySelector('[data-first-field]');
      window.setTimeout(() => {
        if (firstField && typeof firstField.focus === 'function') {
          firstField.focus();
        }
      }, 0);
    };

    const closeQuoteModal = () => {
      if (!quoteModal) return;

      quoteModal.setAttribute('data-open', 'false');
      quoteModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('quote-modal-open');

      if (
        lastFocusedElement &&
        typeof lastFocusedElement.focus === 'function'
      ) {
        lastFocusedElement.focus();
      }
    };

    const handleOtherFieldVisibility = () => {
      if (!otherField || !otherInput) return;

      const selected = quoteModal.querySelector(
        'input[name="preferred_contact"]:checked'
      );
      const showOther = selected && selected.value === 'other';
      const shouldFocus = showOther && otherInput.hasAttribute('disabled');

      otherField.hidden = !showOther;
      if (showOther) {
        otherInput.removeAttribute('disabled');
        if (shouldFocus) {
          window.setTimeout(() => otherInput.focus(), 0);
        }
      } else {
        otherInput.value = '';
        otherInput.setAttribute('disabled', 'true');
      }
    };

    quoteTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openQuoteModal();
      });
    });

    dismissButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        closeQuoteModal();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && quoteModal.getAttribute('data-open') === 'true') {
        closeQuoteModal();
      }
    });

    quoteModal.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab' || quoteModal.getAttribute('data-open') !== 'true') {
        return;
      }

      const focusable = quoteModal.querySelectorAll(focusableSelectors);
      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    quoteModal
      .querySelectorAll('input[name="preferred_contact"]')
      .forEach((input) => {
        input.addEventListener('change', handleOtherFieldVisibility);
      });

    handleOtherFieldVisibility();

    if (copyToggle && copyInput) {
      copyToggle.addEventListener('click', () => {
        const isActive = copyToggle.getAttribute('aria-pressed') === 'true';
        const nextState = !isActive;

        copyToggle.setAttribute('aria-pressed', String(nextState));
        copyToggle.classList.toggle('quote-form__toggle--active', nextState);
        copyInput.value = nextState ? 'yes' : 'no';
      });
    }

    if (quoteForm) {
      quoteForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        setStatus('Sending your request...', 'pending');

        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';
        }

        const formData = new FormData(quoteForm);
        const payload = Object.fromEntries(formData.entries());

        try {
          const response = await fetch('/api/request-quote', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          const result = await response
            .json()
            .catch(() => ({ message: 'Unable to send your request.' }));

          if (!response.ok) {
            const errorMessage =
              result && typeof result.message === 'string' && result.message
                ? result.message
                : 'We could not send your request. Please try again later.';
            throw new Error(errorMessage);
          }

          setStatus(
            "Thanks! We've received your request and will reach out soon.",
            'success'
          );
          quoteForm.reset();

          if (copyToggle && copyInput) {
            copyToggle.setAttribute('aria-pressed', 'false');
            copyToggle.classList.remove('quote-form__toggle--active');
            copyInput.value = 'no';
          }

          handleOtherFieldVisibility();
        } catch (error) {
          const message =
            error instanceof Error && error.message
              ? error.message
              : 'We could not send your request. Please try again later.';
          setStatus(message, 'error');
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = defaultSubmitText;
          }
        }
      });
    }
  }
})();
