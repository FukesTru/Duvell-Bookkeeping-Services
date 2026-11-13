/* Opening animation: the logo settles in on navy, a gold rule draws, then the page fades in.
   Runs once per visit (per browser tab session), lasts about 2.4 seconds, and any click, tap,
   scroll or key skips it. Skipped entirely for visitors who ask for reduced motion. The cover is
   only added by this script and also fades itself out in CSS, so it can never block the page. */
(function () {
  var d = document.documentElement;
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.sessionStorage.getItem('duvell-intro-seen')) return;
    window.sessionStorage.setItem('duvell-intro-seen', '1');
  } catch (e) {
    return;
  }
  d.classList.add('intro');
  var stage = null;
  var events = ['click', 'keydown', 'touchstart', 'wheel'];

  function cleanup() {
    d.classList.remove('intro', 'intro-done');
    if (stage && stage.parentNode) stage.parentNode.removeChild(stage);
    events.forEach(function (t) { window.removeEventListener(t, finish, true); });
  }
  function finish() {
    if (d.classList.contains('intro-done')) return;
    d.classList.add('intro-done');
    window.setTimeout(cleanup, 320);
  }
  function build() {
    stage = document.createElement('div');
    stage.className = 'intro-stage';
    stage.setAttribute('aria-hidden', 'true');
    stage.innerHTML =
      '<img src="/images/logo-icon.png" alt="" width="132" height="125">' +
      '<div class="intro-rule"></div>' +
      '<div class="intro-name">Bookkeeping Services</div>' +
      '<div class="intro-sub">Jamaica, Queens, New York</div>' +
      '<div class="intro-skip">Tap or press any key to skip</div>';
    document.body.appendChild(stage);
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
  events.forEach(function (t) { window.addEventListener(t, finish, { capture: true, passive: true }); });
  window.setTimeout(cleanup, 2700);
})();
