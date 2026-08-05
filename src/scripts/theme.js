/* Theme picker (mxb.dev-style). The head script has already applied the
   stored theme before paint; this wires the toggle + panel, keeps
   localStorage in sync, and crossfades the swap where View Transitions are
   available. The roster comes from src/data/themes.js, so the chips, the
   keyboard shortcuts and the labels can never drift apart. */
import { themes, defaultTheme, storageKey } from "../data/themes.js";

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

  options.forEach((btn) => {
    btn.addEventListener("click", () => apply(btn.dataset.themeOpt));
  });

  // number-row keys still jump straight to a theme
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "select" || tag === "textarea") return;
    const i = keys.indexOf(e.key);
    if (i !== -1) apply(ids[i]);
  });

  reflect(root.dataset.theme || defaultTheme);
}
