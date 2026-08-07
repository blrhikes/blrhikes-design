/* NavDrawer — the small-viewport menu. The element is a <dialog>, so Escape,
   the scrim and inerting the page behind it are the browser's job; this file
   is only the wiring the element does not do itself. */
(function () {
  var toggle = document.getElementById("nav-toggle");
  var drawer = document.getElementById("nav-drawer");
  if (!toggle || !drawer) return;

  /* Mirrors the breakpoint in base.css. If the two ever disagree the drawer
     could be opened at a width where CSS has already put the inline nav back,
     which is why the resize listener below closes it rather than trusting it
     to be unreachable. */
  var wide = matchMedia("(min-width: 56.01rem)");

  var open = function () {
    if (!drawer.open) drawer.showModal();
    toggle.setAttribute("aria-expanded", "true");
  };

  var close = function () {
    if (drawer.open) drawer.close();
  };

  /* `close` fires however the dialog went away — the button, Escape, the
     click-off — so the toggle's state is reflected in one place. */
  drawer.addEventListener("close", function () {
    toggle.setAttribute("aria-expanded", "false");
  });

  toggle.addEventListener("click", open);

  drawer.addEventListener("click", function (e) {
    /* A click on the backdrop targets the dialog itself; the panel fills the
       element, so anything hitting it directly came from outside the panel. */
    if (e.target === drawer) {
      close();
      return;
    }
    /* Follow a link and the drawer's work is done — including in-page hashes,
       where nothing navigates and it would otherwise sit over the section it
       just jumped to. */
    if (e.target.closest("a, [data-nav-close]")) close();
  });

  /* Rotate the phone, or drag a desktop window wider, and the inline nav comes
     back underneath — leaving a modal over a menu that is already visible. */
  wide.addEventListener("change", function (e) {
    if (e.matches) close();
  });
})();
