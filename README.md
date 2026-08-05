# blrhikes-design

Theme explorations for the BLR Hikes rebuild (`../blrhikes-app`). An Astro
site that renders the same set of real components — hero, palette, type ramp,
buttons, forms, event cards, trail cards, stats, table — under eleven
interchangeable themes.

## Run it

```sh
pnpm install
pnpm dev      # → http://localhost:4321
pnpm build    # static output in dist/
pnpm preview
```

Switch themes with the paint-roller button in the top bar (an mxb.dev-style
picker: each theme is a button showing its name over a row of colour dots) or
keys **1–0 and -**. The choice is stored in `localStorage` and applied before
first paint (no flash).

## Architecture

Mirrors the app's design-system rule: **components paint from a token
contract; a theme is one file that re-points the tokens.** Nothing in
`src/styles/base.css` knows themes exist. Astro only splits the markup — the
CSS is still hand-authored global CSS, imported once by the layout in
contract-then-themes order.

```
src/pages/
  index.astro         the showcase — eight section components in order
  event.astro         the event detail surface
  tear-lab.astro      live sliders for every torn-paper variable

src/layouts/
  BaseLayout.astro    <head>, the pre-paint theme script, PaperFilters,
                      TopBar, <main>, footer, the hoisted client scripts

src/components/
  PaperFilters.astro  every SVG tear filter + the AttendeeFaces octagon,
                      one definition set shared by all pages
  TopBar · ThemePicker · PageNav · SiteFooter
  ui/                 the primitives: Btn, Pill, HighlightTags, DateBlock,
                      AttendeeFaces, SeatRow, Meter, Notice, Rating,
                      IconLine, TrailStats, TrailLinks, Field, PhotoWrap,
                      Spec, SectionHead
  cards/              EventCard, EventCardProminent, EventTicket, TrailCard,
                      TrailCardWide, TrailCardOverlay, BigCard,
                      RegistrationCard, VehicleCard
  sections/           one component per band of the showcase
  event/              the event page's cover, article and rail
  lab/                the tear lab's live filters, preview and controls

src/data/
  themes.js           the theme roster — chips, keys, labels, all from here
  trails.js           trail content, split by the surface it demonstrates
  events.js           event content
  nav.js · images.js  nav links; the CDN image-URL rewrite

src/styles/
  base.css            the contract (documented at the top) + every component
  themes/*.css        one [data-theme="…"] block per theme + flourishes
  event.css           page-scoped layout for the event surface
  tear-lab.css        page-scoped layout for the lab

src/scripts/
  theme.js            theme picker, localStorage, View Transitions crossfade
  pagenav.js          floating "on this page" jump list + scroll-spy
  htags.js            clamps each HighlightTag row to one line, counts rest
  tear-lab.js         builds the lab's sliders and drives the live filters
```

Every component demo carries a `.spec` label with its component name (the
names the app's DS uses: EventCard, EventCardProminent, EventTicket,
DateBlock, AttendeeFaces, TrailCard, HighlightTag, …). Content is real, from
`../blrhikes-app/dev/seed.json`. The seed's trail covers are GitHub
user-attachments URLs that 404 for anonymous requests, so the page uses the
same rewrite v1 ships (`src/api/rehypeTransformImageUrls.js`):
`blrhikes.com/cdn-cgi/image/…/images.blrhikes.com/<uuid>` — see
`src/data/images.js`. Type over a photo stays white in every theme, since a
photograph has no colour scheme.

The event page and the tear lab are kraft-only surfaces, so they render the
top bar without the picker. Both reuse the shared components: the event
rail's price/lead/going card is `RegistrationCard` — the very card the
showcase's event section renders, same parts in the same order, differing
only in content and in `sticky={false}` (the rail around it already sticks).
The trail beside it is the ordinary `TrailCard`, one up instead of three.

## The themes

Each theme commits to a **single scheme** — light or dark, no paired modes
yet. The plan is to later pick one light + one dark and merge them into a
single light+dark theme.

| # | Theme | Scheme | In one line |
|---|-------|--------|-------------|
| 1 | **Kraft** | light | The current app direction: kraft paper, torn edges (SVG displacement), Fraunces + DM Sans |
| 2 | **Contour** | light | Survey-of-India map sheet: contour-lined cream, green ink, condensed uppercase, hairline rules |
| 3 | **Monsoon** | dark | Night trek in the rains: green-black mist, lantern-amber glow, Newsreader italic + Mulish, CSS rain |
| 4 | **Poster** | light | Hand-painted bus-ticket: cream + vermillion + marigold, Anton, perforated ticket cards, sunburst |
| 5 | **Hi-Vis** | dark | Trail-marker utility: near-black grid, blaze orange, wide Archivo + Chivo Mono, hard offset shadows |
| 6 | **Solstice Day** | light | Solstice light mode (design.codeuncode.com): cream + olive + sage, golden highlights, Kraft's type |
| 7 | **Solstice Night** | dark | Solstice dark mode: purple-black star-field, pink CTAs, amber type accent + hairlines, Kraft's type |
| 8 | **Bluebird** | light | A bluebird day: indigo ink/CTAs, sky-blue surfaces and hills, golden sun highlights, Bricolage Grotesque + Instrument Sans |
| 9 | **Canopy** | dark | Forest at night: #191A19 ground, deep-green surfaces, living-green accent, leaf-light #D8E9A8 highlights, Lora + Mulish |
| 0 | **Mono** | light | Grayscale wireframe: every slot IBM Plex Mono, square corners, hairlines, status via border style not hue |
| - | **Canopy Day** | light | Canopy's daytime twin: pale-leaf ground, deep-green ink/accent, same Lora + Mulish — the natural other half of a Canopy light+dark merge |

Icons are Font Awesome 6 (CDN), matching the app's own icon names
(`location-dot`, `clock`, `mountain-sun`, `fish`, `car-side`, `star`).

Themes 6–7 take their palette from
`design.codeuncode.com/blrhikes-design-system-solstice` (light and dark
modes respectively) but keep Kraft's typography — Fraunces over DM Sans,
weights capped at 500 — instead of the source's Cormorant Garamond/Lora.

## Adding another theme

1. Copy any file in `src/styles/themes/`, rename the `[data-theme="…"]`
   selector, and import it in `src/layouts/BaseLayout.astro`.
2. Set **every** token in the contract (listed at the top of `base.css`).
3. Add a row in `src/data/themes.js` — the picker chip, the keyboard
   shortcut and the label all come from there.

Slots are named for their job, not their colour — `--accent` is the fill,
`--accent-type` is the accent *as text* and must clear 4.5:1 on `--ground`.
