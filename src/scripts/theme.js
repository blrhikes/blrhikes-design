/* Theme picker (mxb.dev-style). The head script has already applied the
   stored theme before paint; this wires the toggle + panel, keeps
   localStorage in sync, and crossfades the swap where View Transitions are
   available. The roster comes from src/data/themes.js, so the chips, the
   keyboard shortcuts and the labels can never drift apart.

   It also wires the panel's one non-theme control, the shadow override, which
   works the same way: a roster in that same file, an attribute on <html>, and
   the CSS in src/styles/shadow-toggle.css.

   Both settings are readable from the query string — that is the head script's
   job, since it has to happen before paint — and writable back to it from
   here, so the address bar always describes what is on screen once anything
   has been touched. */
import {
  themes,
  defaultTheme,
  storageKey,
  shadowModes,
  shadowKey,
  shadowCycleKey,
  themeParam,
  shadowParam,
} from "../data/themes.js";

const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const panel = document.getElementById("themepicker");

/* Pages without the picker — the event surface, the tear lab — are kraft
   only, so there is nothing to wire. */
if (toggle && panel) {
  const labelEl = document.querySelector("[data-theme-label]");
  const options = panel.querySelectorAll("[data-theme-opt]");
  const ids = themes.map((t) => t.id);
  const keys = themes.map((t) => t.key).join("");

  /* Write the current pair back into the address bar, so what is on screen can
     be copied out of it. `replaceState` rather than `pushState`: flipping
     through themes is looking, not navigating, and it should not take
     seventeen presses of Back to leave the page.

     Only ever called from a click or a keypress — a page that quietly rewrote
     its own URL on load would turn every link into a link to today's stored
     preference. Other params (`?debug`) are left where they are. */
  const syncUrl = () => {
    try {
      const url = new URL(location.href);
      url.searchParams.set(themeParam, root.dataset.theme || defaultTheme);
      /* The default mode is spelled out rather than dropped, so a link can say
         "shadows as the theme intends" and out-rank the recipient's stored
         "off" — which silence could not do. */
      url.searchParams.set(shadowParam, root.dataset.shadows || "theme");
      history.replaceState(history.state, "", url);
    } catch (e) {}
  };

  const reflect = (theme) => {
    options.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.themeOpt === theme));
    });
    const found = themes.find((t) => t.id === theme);
    if (labelEl) labelEl.textContent = found ? found.label : theme;
  };

  const apply = (theme) => {
    if (ids.indexOf(theme) === -1) return;
    const swap = () => {
      root.dataset.theme = theme;
      reflect(theme);
      syncUrl();
    };
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduced) {
      document.startViewTransition(swap);
    } else {
      swap();
    }
    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {}
  };

  const setOpen = (open) => {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => setOpen(panel.hidden));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });

  /* Click anywhere off the panel to dismiss it. The toggle is excluded or its
     own handler would reopen what this just closed. */
  document.addEventListener("click", (e) => {
    if (panel.hidden) return;
    if (panel.contains(e.target) || toggle.contains(e.target)) return;
    setOpen(false);
  });

  options.forEach((btn) => {
    btn.addEventListener("click", () => apply(btn.dataset.themeOpt));
  });

  /* ---- the shadow override ---------------------------------------------
     Orthogonal to the theme: it stays put across a theme change, which is the
     point of it — the comparison being made is one theme against itself. The
     mode IS the attribute (see shadow-toggle.css), so there is nothing to map,
     and the default mode is the empty string, which removes the attribute
     entirely rather than writing a third value the CSS would have to know. */
  const shadowOpts = panel.querySelectorAll("[data-shadow-opt]");
  const shadowIds = shadowModes.map((m) => m.id);

  /* `fromUser` is what separates a choice from catching the buttons up to an
     attribute the pre-paint script already set — only the former belongs in
     the URL. */
  const applyShadows = (mode, fromUser) => {
    if (shadowIds.indexOf(mode) === -1) return;
    if (mode) root.dataset.shadows = mode;
    else delete root.dataset.shadows;

    shadowOpts.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.shadowOpt === mode));
    });
    try {
      localStorage.setItem(shadowKey, mode);
    } catch (e) {}
    if (fromUser) syncUrl();
  };

  shadowOpts.forEach((btn) => {
    btn.addEventListener("click", () =>
      applyShadows(btn.dataset.shadowOpt, true),
    );
  });

  // number-row keys still jump straight to a theme; `s` cycles the shadows
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "select" || tag === "textarea") return;
    if (e.key === shadowCycleKey) {
      const at = shadowIds.indexOf(root.dataset.shadows || "");
      applyShadows(shadowIds[(at + 1) % shadowIds.length], true);
      return;
    }
    const i = keys.indexOf(e.key);
    if (i !== -1) apply(ids[i]);
  });

  reflect(root.dataset.theme || defaultTheme);

  /* The pre-paint script has already set the attribute; this only catches the
     buttons up to it. */
  applyShadows(root.dataset.shadows || "");
}
