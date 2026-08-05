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
];

export const defaultTheme = "kraft";

/* localStorage key, shared by the pre-paint inline script and theme.js. */
export const storageKey = "blrhikes-theme";
