# Kraft

The default theme (`defaultTheme = "kraft"` in `src/data/themes.js`, keyboard shortcut `1`). A light theme built on the idea of a hiking journal: kraft-paper ground with real grain, hand-torn card edges, and cards that sit *on* the paper rather than floating above it — flat by conviction.

Defined in `src/styles/themes/kraft.css`, activated via `data-theme="kraft"` on `<html>`.

## Palette

| Token | Value | Role |
| --- | --- | --- |
| `--ground` | `#d4b896` | Warm kraft tan behind everything |
| `--ground-img` | white scrim + `kraft-paper.jpg` | Real paper-scan texture (see below) |
| `--surface` / `--surface-2` / `--surface-raise` | translucent creams (`rgb(250 243 232 / .72)` etc.) | Card papers — alpha so the grain shows through |
| `--ink` → `--ink-hint` | `#1a1a1a` → `#6b5b4a` | Text ramp, drifting warmer as it fades |
| `--accent` / `--accent-type` | `#44403c` | A dark warm neutral — emphasis by *darkness*, not hue; ink one shade removed |
| `--on-accent` | `#faf3e8` | Cream on the dark accent |
| `--ok` / `--danger` | `#2a5f41` / `#b91c1c` | Status greens/reds, tinted variants included |

The paper scan is darker than the ground, so `--ground-img` layers a white scrim (`--kraft-wash: 0.65`) over the JPEG — the brightness-up/contrast-down effect of a CSS filter without using `filter`, which would also hit every child element. Raise the alpha to lighten the texture.

## Shape and shadow

- `--card-radius: 0` — a torn edge is its own shape; rounding a corner that then rips off is noise, so torn cards are square.
- `--card-border`, `--card-shadow`, `--pop-shadow` are all `none` — paper on paper. (The site-wide shadow toggle in `shadow-toggle.css` can override this.)
- Controls keep a modest `--ctl-radius: 0.5rem`; pills are fully round.

## Type

- Display: **Fraunces** (serif), weight 500, no uppercase transform.
- Body: **DM Sans**; mono: IBM Plex Mono.
- Labels: uppercase with `0.08em` tracking.

## The torn edge

Kraft sets `--cut: url(#cut-1)` but the tear itself is a shared mechanism, not part of the palette — it lives in `src/styles/torn-paper.css` and is worn by the whole Kraft and Milestone families. Highlights:

- Cards are flat filtered layers with crisp content; sides keep a fine 3px cut while tops and bottoms rip ±18–21px (SVG filters emitted by `PaperFilters.astro`).
- Neighbouring cards rotate through `#cut-1/2/3` so the tear never visibly repeats.
- Photos are never filtered: the clean image is clipped slightly smaller and the same image is repainted behind it through the filter, so all raggedness is backing-fringe pixels.
- Some things deliberately don't tear — the carpool form (a control surface, not a sheet) and the flat exhibit cards opt out with `--cut: opacity(1)`.

## Kraft's own flourish

The one thing in the theme file beyond tokens: a hand-placed lean. The 2nd and 3rd event/trail/photo cards rotate `0.4deg` / `-0.35deg`, like photos taped to a journal page.

## Variants

`kraft.css` scopes its whole palette to both `kraft` and `kraft-gold`, so the variants stay thin re-pointings rather than drifting copies:

- **Kraft Gold** (`kraft-gold.css`, key `;`, [KRAFT-GOLD.md](KRAFT-GOLD.md)) — identical except the four accent tokens, lifted from Milestone's yellow-400. Yellow can't do emphasis-by-darkness, so the tokens split: bright `#facc15` fills, but accent-as-type steps down to yellow-900 (`#713f12`), the only rung that clears 4.5:1 on the washed paper ground. The tint stays translucent so it doesn't stamp the grain out of chips.
- **Kraft Night** (`kraft-night.css`, key `]`) — the palette after dark.
- **Kraft Canopy** (`kraft-canopy.css`, key `'`) — Kraft's paper and tear with Canopy Day's forest greens.

Picker fingerprint (the four dots): `#d4b896`, `#faf3e8`, `#44403c`, `#1a1a1a`.
