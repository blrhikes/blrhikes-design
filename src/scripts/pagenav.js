/* PageNav — the floating "on this page" list: open/close, close on Escape,
   on outside click and on jumping, plus a scroll-spy that marks the section
   currently under the sticky topbar. */
(function () {
  var nav = document.getElementById("pagenav");
  var toggle = document.getElementById("pagenav-toggle");
  var list = document.getElementById("pagenav-list");
  if (!nav || !toggle || !list) return;

  var links = [].slice.call(list.querySelectorAll('a[href^="#"]'));
  var targets = links
    .map(function (a) {
      return { link: a, el: document.getElementById(a.hash.slice(1)) };
    })
    .filter(function (t) {
      return t.el;
    });

  function setOpen(open) {
    list.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", function () {
    setOpen(list.hidden);
  });

  list.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !list.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", function (e) {
    if (!list.hidden && !nav.contains(e.target)) setOpen(false);
  });

  /* Scroll-spy: the current section is the last one whose top has passed the
     topbar. Cheaper and steadier than an IntersectionObserver here, since
     sections are taller than the viewport and several are visible at once. */
  var mark = function () {
    var line = 96; // clears the sticky topbar
    var current = targets[0];
    targets.forEach(function (t) {
      if (t.el.getBoundingClientRect().top <= line) current = t;
    });
    targets.forEach(function (t) {
      if (t === current) t.link.setAttribute("aria-current", "true");
      else t.link.removeAttribute("aria-current");
    });
  };

  var ticking = false;
  addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        mark();
        ticking = false;
      });
    },
    { passive: true }
  );

  mark();
})();
