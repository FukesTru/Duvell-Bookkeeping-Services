/* Duvell Bookkeeping Services: menu, services dropdown, contact buttons and scroll movement.
   Everything on the site still reads and works with this script switched off. */
(function () {
  var d = document.documentElement;
  var body = document.body;
  var FORM_ID = 'sticky-sidebar-left-P3fIlMHnjh2t0tnhACOz';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header shadow once the page scrolls */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.querySelector('.nav-toggle');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(!body.classList.contains('menu-open'));
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (body.classList.contains('menu-open')) {
        setMenu(false);
        if (toggle) toggle.focus();
      }
      closeDropdowns();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1080 && body.classList.contains('menu-open')) setMenu(false);
  });

  /* Services dropdown */
  var dropToggles = document.querySelectorAll('.dropdown-toggle');
  function closeDropdowns(except) {
    dropToggles.forEach(function (b) {
      if (b !== except) b.setAttribute('aria-expanded', 'false');
    });
  }
  dropToggles.forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = b.getAttribute('aria-expanded') === 'true';
      closeDropdowns(b);
      b.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.has-dropdown')) closeDropdowns();
  });

  /* Contact us buttons open the website form. If the form has not loaded,
     the link falls back to the contact section on the same page. */
  function formParts() {
    return {
      container: document.getElementById(FORM_ID + '-div'),
      launcherBox: document.getElementById(FORM_ID + '-minimize-text'),
      launcher: document.getElementById(FORM_ID + '-minimize-text-span'),
      frame: document.getElementById(FORM_ID)
    };
  }
  function openForm() {
    var p = formParts();
    if (!p.container || !p.frame) return false;
    if (p.launcherBox && p.launcherBox.style.display !== 'none') {
      var btn = p.launcher || p.launcherBox.querySelector('button, span');
      if (btn) btn.click();
    }
    p.container.classList.add('ghl-attn');
    window.setTimeout(function () { p.container.classList.remove('ghl-attn'); }, 1400);
    window.setTimeout(function () { try { p.frame.focus(); } catch (e) {} }, 350);
    return true;
  }
  document.querySelectorAll('[data-open-form]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (body.classList.contains('menu-open')) setMenu(false);
      if (openForm()) {
        e.preventDefault();
        return;
      }
      var target = document.getElementById('contact');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      }
    });
  });

  /* Mark the menu link for the page you are on */
  var here = window.location.pathname;
  document.querySelectorAll('.nav-list a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });

  /* Sections settle into place as they come into view */
  d.classList.add('js');
  var items = document.querySelectorAll('.reveal, .reveal-stagger');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  var vh = window.innerHeight;
  items.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < vh * 0.95) el.classList.add('is-in');
    else io.observe(el);
  });
})();
