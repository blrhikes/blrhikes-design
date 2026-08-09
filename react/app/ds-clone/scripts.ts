/* The design repo's client scripts, ported.

   They stay DOM-level rather than becoming React state on purpose: the plan's
   hard rule is that client behaviour MUST NOT change the SSR output, and the
   surest way to honour it is for the behaviour to run only after mount, on the
   same elements, doing the same mutations the .js files do. Nothing here is
   allowed to influence the first render — that is what the harness diffs.

   Ported: htags.js (the one-line tag row) and nav-drawer.js (the small-
   viewport menu). Skipped, per the plan: theme.js, pagenav.js, tear-lab.js,
   debug.js.

   Each returns its own teardown, because React effects re-run and the Astro
   IIFEs never had to. */

/* HighlightTag overflow — keep every .htags row one line deep.
   Tags that would wrap are hidden and counted into a trailing "+N" chip.
   Measured, not estimated: theme swaps change the font, so the row is
   re-measured on resize, on font load and whenever data-theme changes. */
export function htags(): () => void {
  const rows = Array.from(document.querySelectorAll<HTMLElement>(".htags"));
  if (!rows.length) return () => {};

  function fit(row: HTMLElement) {
    let chip = row.querySelector(".htag-more");
    if (chip) chip.remove();

    const tags = Array.from(row.querySelectorAll<HTMLElement>(".htag"));
    if (!tags.length) return;
    tags.forEach((t) => {
      t.hidden = false;
    });

    const top = tags[0].offsetTop;
    const firstWrapped = tags.findIndex((t) => t.offsetTop > top);
    if (firstWrapped === -1) return;

    chip = document.createElement("span");
    chip.className = "htag htag-more";
    row.appendChild(chip);

    /* Hide from the first wrapping tag on, then keep giving ground until the
       chip itself fits on the line it is counting for. */
    let cut = firstWrapped;
    for (;;) {
      tags.forEach((t, i) => {
        t.hidden = i >= cut;
      });
      chip.textContent = "+" + (tags.length - cut);
      if ((chip as HTMLElement).offsetTop <= top || cut === 0) break;
      cut--;
    }
  }

  const fitAll = () => rows.forEach(fit);

  fitAll();

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);

  let pending = false;
  const onResize = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      fitAll();
      pending = false;
    });
  };
  addEventListener("resize", onResize, { passive: true });

  const mo = new MutationObserver(fitAll);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => {
    removeEventListener("resize", onResize);
    mo.disconnect();
  };
}

/* NavDrawer — the small-viewport menu. The element is a <dialog>, so Escape,
   the scrim and inerting the page behind it are the browser's job; this is
   only the wiring the element does not do itself. */
export function navDrawer(): () => void {
  const toggle = document.getElementById("nav-toggle");
  const drawer = document.getElementById("nav-drawer") as HTMLDialogElement | null;
  if (!toggle || !drawer) return () => {};

  /* Mirrors the breakpoint in base.css. If the two ever disagree the drawer
     could be opened at a width where CSS has already put the inline nav back,
     which is why the resize listener below closes it rather than trusting it
     to be unreachable. */
  const wide = matchMedia("(min-width: 56.01rem)");

  const open = () => {
    if (!drawer.open) drawer.showModal();
    toggle.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    if (drawer.open) drawer.close();
  };

  /* `close` fires however the dialog went away — the button, Escape, the
     click-off — so the toggle's state is reflected in one place. */
  const onClose = () => toggle.setAttribute("aria-expanded", "false");
  drawer.addEventListener("close", onClose);

  toggle.addEventListener("click", open);

  const onClick = (e: MouseEvent) => {
    /* A click on the backdrop targets the dialog itself; the panel fills the
       element, so anything hitting it directly came from outside the panel. */
    if (e.target === drawer) {
      close();
      return;
    }
    if ((e.target as Element | null)?.closest("a, [data-nav-close]")) close();
  };
  drawer.addEventListener("click", onClick);

  /* Rotate the phone, or drag a desktop window wider, and the inline nav comes
     back underneath — leaving a modal over a menu that is already visible. */
  const onWide = (e: MediaQueryListEvent) => {
    if (e.matches) close();
  };
  wide.addEventListener("change", onWide);

  return () => {
    drawer.removeEventListener("close", onClose);
    drawer.removeEventListener("click", onClick);
    toggle.removeEventListener("click", open);
    wide.removeEventListener("change", onWide);
  };
}
