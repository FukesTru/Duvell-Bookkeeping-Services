/* Duvell Bookkeeping Services: menu, services dropdown, contact links and scroll movement.
   Everything on the site still reads and works with this script switched off. */
(function () {
  var d = document.documentElement;
  var body = document.body;
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

  /* Every Contact link (#contact) scrolls to the form on the page so the whole form is in view:
     centred when it fits between the sticky header and the phone buttons, otherwise just under the header. */
  function scrollToForm(smooth) {
    var section = document.getElementById('contact');
    if (!section) return false;
    var target = section.querySelector('.form-embed') || section;
    var headerH = header ? header.offsetHeight : 0;
    var bottomSpace = window.innerWidth < 1080 ? 100 : 0;
    var room = window.innerHeight - headerH - bottomSpace;
    var r = target.getBoundingClientRect();
    var gap = r.height < room ? (room - r.height) / 2 : 12;
    var top = window.scrollY + r.top - headerH - gap;
    window.scrollTo({ top: Math.max(0, top), behavior: smooth && !reduceMotion ? 'smooth' : 'auto' });
    return true;
  }
  document.querySelectorAll('a[href="#contact"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (body.classList.contains('menu-open')) setMenu(false);
      if (scrollToForm(true)) {
        e.preventDefault();
        if (window.history && window.history.replaceState) window.history.replaceState(null, '', '#contact');
      }
    });
  });
  if (window.location.hash === '#contact') {
    window.addEventListener('load', function () { window.setTimeout(function () { scrollToForm(false); }, 600); });
  }

  /* On phones the round call and contact buttons stay hidden until the visitor scrolls past the hero,
     so they never cover the hero's own buttons on first load. */
  var hero = document.querySelector('.home-hero, .page-hero');
  if (hero && 'IntersectionObserver' in window) {
    body.classList.add('fab-wait');
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { body.classList.toggle('fab-wait', entry.isIntersecting); });
    }, { rootMargin: '0px 0px -40% 0px' }).observe(hero);
  }

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
