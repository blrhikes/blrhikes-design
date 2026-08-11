/* The theme roster — one entry per file in src/styles/themes.
   This is the single source of truth: the picker chips, the keyboard
   shortcuts and the labels in js all read it, so adding a theme means
   adding its stylesheet and one row here. `dots` is the four-colour
   fingerprint the picker shows under the name. */
export const themes = [
  {
    id: "kraft",
    label: "Kraft",
    key: "1",
    dots: ["#d4b896", "#faf3e8", "#44403c", "#1a1a1a"],
  },
  {
    id: "contour",
    label: "Contour",
    key: "2",
    dots: ["#f2efe2", "#faf8ef", "#2e6b3f", "#ab4420"],
  },
  {
    id: "monsoon",
    label: "Monsoon",
    key: "3",
    dots: ["#0f1a17", "#1e2c27", "#f0a63c", "#e8efe8"],
  },
  {
    id: "poster",
    label: "Poster",
    key: "4",
    dots: ["#f8e8c4", "#fdf6e5", "#d13f1e", "#f0a007"],
  },
  {
    id: "hivis",
    label: "Hi-Vis",
    key: "5",
    dots: ["#141414", "#1d1d1d", "#ff5b04", "#f4f4f2"],
  },
  {
    id: "solstice-day",
    label: "Solstice Day",
    key: "6",
    dots: ["#fefae0", "#a4b465", "#626f47", "#ffcf50"],
  },
  {
    id: "solstice-night",
    label: "Solstice Night",
    key: "7",
    dots: ["#1a1625", "#69247c", "#da498d", "#fac67a"],
  },
  {
    id: "bluebird",
    label: "Bluebird",
    key: "8",
    dots: ["#f4fbfd", "#97dde9", "#525ea7", "#ffc349"],
  },
  {
    id: "canopy",
    label: "Canopy",
    key: "9",
    dots: ["#191a19", "#1e5128", "#4e9f3d", "#d8e9a8"],
  },
  {
    id: "mono",
    label: "Mono",
    key: "0",
    dots: ["#fafafa", "#f0f0f0", "#161616", "#8f8f8f"],
  },
  {
    id: "canopy-day",
    label: "Canopy Day",
    key: "-",
    dots: ["#eef4da", "#d8e9a8", "#1e5128", "#4e9f3d"],
  },
  {
    id: "milestone",
    label: "Milestone",
    key: "=",
    dots: ["#f5f5f4", "#facc15", "#1c1917", "#70631a"],
  },
  {
    /* Milestone's palette exactly — same dots on purpose, since the pair
       differs only in how the cards cast. */
    id: "milestone-soft",
    label: "Milestone Soft",
    key: "[",
    dots: ["#f5f5f4", "#facc15", "#1c1917", "#70631a"],
  },
  {
    id: "kraft-night",
    label: "Kraft Night",
    key: "]",
    dots: ["#17130f", "#3a3026", "#e8dcc8", "#f2e9db"],
  },
  {
    /* Milestone Soft's palette after dark — the app's own dark mode. */
    id: "milestone-night",
    label: "Milestone Night",
    key: "\\",
    dots: ["#1c1917", "#292524", "#eab308", "#fafaf9"],
  },
  {
    /* Kraft's palette with Milestone's yellow in the accent slot — the dots
       are Kraft's, third one swapped. */
    id: "kraft-gold",
    label: "Kraft Gold",
    key: ";",
    dots: ["#d4b896", "#faf3e8", "#facc15", "#1a1a1a"],
  },
  {
    /* Kraft's paper and tear, Canopy Day's forest. */
    id: "kraft-canopy",
    label: "Kraft Canopy",
    key: "'",
    dots: ["#cfd9ac", "#d8e9a8", "#1e5128", "#4e9f3d"],
  },
  {
    /* The number row and its punctuation are spent; `,` is the next free
       unshifted key, and collides with neither `s` nor Shift+D. */
    id: "stargazing",
    label: "Stargazing",
    key: ",",
    dots: ["#070b18", "#1b2340", "#ffd166", "#a9c8ff"],
  },
  {
    /* Solstice Night's palette out in Stargazing's dark — the dots are the
       crossover: this ground, Solstice's purple, Kraft Gold's yellow in the
       fill slot, and the amber both parents already shared. */
    id: "solstice-stars",
    label: "Solstice Stars",
    key: ".",
    dots: ["#150f22", "#69247c", "#facc15", "#fac67a"],
  },
];

export const defaultTheme = "kraft";

/* localStorage key, shared by the pre-paint inline script and theme.js. */
export const storageKey = "blrhikes-theme";

/* ------------------------------------------------------------- shadows -- */

/* The shadow override, orthogonal to the theme: it sets `data-shadows` on
   <html>, which src/styles/shadow-toggle.css reads. Three states rather than a
   checkbox, because "on" and "the theme's own" are genuinely different answers
   — six of the themes ship deliberately flat, and for the other eleven "on" is
   what they already do. A checkbox would have to mean something different
   depending on which theme was showing.

   The empty id is the default and writes no attribute at all, so a page with
   no stored preference renders exactly as its theme intends. */
export const shadowModes = [
  { id: "", label: "Theme" },
  { id: "on", label: "On" },
  { id: "off", label: "Off" },
];

export const shadowKey = "blrhikes-shadows";

/* Cycles the three, unshifted — the theme shortcuts are the number row and its
   punctuation, and the debug panel is Shift+D, so `s` is free. */
export const shadowCycleKey = "s";

/* ----------------------------------------------------------- query string -- */

/* `?theme=poster&shadows=off` — the same two settings, set from the URL so a
   particular look can be linked to rather than described ("open the site, hit
   4, then turn shadows off"). Read before first paint, ahead of localStorage,
   and then stored: a link that only lasted until the next click would be a
   worse version of the picker rather than a way to share what you are seeing.

   `shadows=theme` is how the URL spells the default mode, since an empty
   `shadows=` in a link reads like a mistake. */
export const themeParam = "theme";
export const shadowParam = "shadows";
