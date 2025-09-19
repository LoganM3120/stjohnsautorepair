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

    mobileNav.querySelectorAll('a').forEach((link) => {
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
})();
