/* Duvell Bookkeeping Services: menu, dropdowns, contact links and scroll movement.
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
  window.addEventListener('resize', function () {
    if (desk.matches && body.classList.contains('menu-open')) setMenu(false);
  });

  /* Dropdowns (Services, Service areas).
     Desktop: open on hover, on click and while focus is inside; Enter or Space on the button toggles;
     Escape closes and returns focus to the button. Phone menu: each button opens an accordion.
     aria-expanded always matches what is shown, because the CSS shows a panel only from it. */
  var desk = window.matchMedia('(min-width: 1240px)');
  var drops = Array.prototype.slice.call(document.querySelectorAll('.has-dropdown'));
  var suppressFocusOpen = false;
  function setDrop(li, open) {
    var b = li.querySelector('.dropdown-toggle');
    if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (!open) li._hoverOpen = false;
  }
  function closeDropdowns(except) {
    drops.forEach(function (li) { if (li !== except) setDrop(li, false); });
  }
  drops.forEach(function (li) {
    var btn = li.querySelector('.dropdown-toggle');
    if (!btn) return;
    var pointer = false;
    btn.addEventListener('pointerdown', function () { pointer = true; });
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') === 'true';
      closeDropdowns(li);
      if (open && li._hoverOpen && desk.matches) { li._hoverOpen = false; pointer = false; return; }
      setDrop(li, !open);
      pointer = false;
    });
    li.addEventListener('mouseenter', function () {
      if (!desk.matches) return;
      closeDropdowns(li);
      if (btn.getAttribute('aria-expanded') !== 'true') { setDrop(li, true); li._hoverOpen = true; }
    });
    li.addEventListener('mouseleave', function () {
      if (!desk.matches) return;
      if (li._hoverOpen || !li.contains(document.activeElement)) setDrop(li, false);
    });
    li.addEventListener('focusin', function () {
      if (!desk.matches || suppressFocusOpen) return;
      if (pointer) return;
      closeDropdowns(li);
      setDrop(li, true);
    });
    li.addEventListener('focusout', function (e) {
      if (!desk.matches) return;
      if (!e.relatedTarget || !li.contains(e.relatedTarget)) setDrop(li, false);
    });
    li.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || btn.getAttribute('aria-expanded') !== 'true') return;
      e.stopPropagation();
      setDrop(li, false);
      suppressFocusOpen = true;
      btn.focus();
      suppressFocusOpen = false;
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.has-dropdown')) closeDropdowns();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeDropdowns();
    if (body.classList.contains('menu-open')) {
      setMenu(false);
      if (toggle) toggle.focus();
    }
  });

  /* Every Contact link (#contact) scrolls to the form on the page so the whole form is in view:
     centred between the sticky header and the band kept for the chat bubble, otherwise just under the header. */
  function scrollToForm(smooth) {
    var section = document.getElementById('contact');
    if (!section) return false;
    var target = section.querySelector('.form-embed') || section;
    var headerH = header ? header.offsetHeight : 0;
    /* Keep the form clear of the bottom band where the chat widget's welcome bubble opens */
    var bottomSpace = 205;
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
    if (a.getAttribute('href') === here) {
      a.setAttribute('aria-current', 'page');
      var parent = a.closest('.has-dropdown');
      if (parent) parent.classList.add('has-current');
    }
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
  var pending = [];
  items.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < vh * 0.95) el.classList.add('is-in');
    else { io.observe(el); pending.push(el); }
  });
  /* Anything the page has already scrolled past is shown too, even after a jump, and it stays shown,
     so no section is ever left blank. */
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking || !pending.length) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      var limit = window.innerHeight;
      var atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      pending = pending.filter(function (el) {
        if (atEnd || el.getBoundingClientRect().top < limit) { el.classList.add('is-in'); io.unobserve(el); return false; }
        return true;
      });
    });
  }, { passive: true });
})();
