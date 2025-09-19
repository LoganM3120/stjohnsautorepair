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
    const focusableSelectors =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]';
    let lastFocusedElement = null;

    const openQuoteModal = () => {
      if (!quoteModal) return;

      lastFocusedElement = document.activeElement;
      quoteModal.setAttribute('data-open', 'true');
      quoteModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('quote-modal-open');

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
  }
})();
