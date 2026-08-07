# blrhikes-design

Theme explorations for the BLR Hikes rebuild (`../blrhikes-app`). An Astro
site that renders the same set of real components — hero, palette, type ramp,
buttons, forms, event cards, trail cards, stats, table — under seventeen
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
the keys `1`–`0` and `-` `=` `[` `]` `\`. The choice is stored in
`localStorage` and applied before first paint (no flash), and the picker
closes on Escape or a click anywhere outside it. The same panel carries the
**shadow override** (`s`), which applies across every theme — see below.

Both settings also read from the **query string**, so a particular look can be
linked to rather than described:

```
/?theme=poster                 a theme by id (the ids are in src/data/themes.js)
/?shadows=off                  the shadow override: on · off · theme
/event?theme=milestone-soft&shadows=on
```

The URL wins over `localStorage` — a link that says which theme to show has to
out-rank what the recipient's browser last picked — and is then stored, so the
choice survives the next click. An unknown `?theme=` is ignored rather than
applied, since it would leave the page with no theme's tokens at all. Picking
from the panel writes both params back into the address bar (`replaceState`, so
Back still leaves the page), which is where you copy the link from; a page that
was never touched leaves the URL alone.

## Deploying

Cloudflare **Workers** with static assets, not Pages — for a site this shape
either would do, but Workers is where Cloudflare's new development goes and it
leaves room to add server logic later without moving the project.

```sh
pnpm deploy        # astro build && wrangler deploy
pnpm preview:cf    # build, then serve it through wrangler locally
```

`wrangler.jsonc` declares an **assets-only Worker** — there is no `main`, so
nothing runs on request and Cloudflare serves `dist/` off the edge. It also
sets the custom domain (`design.blrhikes.in`), `html_handling:
"auto-trailing-slash"` so Astro's directory routes resolve (`/event` →
`dist/event/index.html`), and `not_found_handling: "404-page"` so an unmatched
path gets `src/pages/404.astro` with a real 404 status.

`public/_headers` caches `/_astro/*` for a year as `immutable` — those
filenames carry a content hash, so their bytes never change. HTML deliberately
sets no `Cache-Control` there: the rules are cumulative, so a catch-all would
append a second conflicting directive to the hashed assets, and the platform
default for HTML (`max-age=0, must-revalidate`) is already right.

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
  archive.astro       variants set aside, kept renderable under every theme
  404.astro           served by Cloudflare for any unmatched path

src/layouts/
  BaseLayout.astro    <head>, the pre-paint theme script, PaperFilters,
                      TopBar, <main>, footer, the hoisted client scripts

src/components/
  PaperFilters.astro  every SVG tear filter + the AttendeeFaces octagon,
                      one definition set shared by all pages
  TopBar · ThemePicker · NavDrawer · PageNav · SiteFooter
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
                      (two exceptions, both variant files that re-point a few
                      tokens of a block scoped to the pair: milestone-soft.css
                      over milestone.css, kraft-gold.css over kraft.css)
  torn-paper.css      the hand-torn edge — geometry only, painted from the
                      contract, worn by seven themes through one :is() scope
  shadow-toggle.css   the shadow override (see below); imported last of all,
                      so it outranks every theme on order, not specificity
  event.css           page-scoped layout for the event surface
  tear-lab.css        page-scoped layout for the lab

src/scripts/
  theme.js            theme picker + the shadow override, localStorage, View
                      Transitions crossfade
  pagenav.js          floating "on this page" jump list + scroll-spy
  htags.js            clamps each HighlightTag row to one line, counts rest
  nav-drawer.js       opens/closes the small-viewport menu
  tear-lab.js         builds the lab's sliders and drives the live filters
  debug.js            the on-page layout inspector (see below)
```

## The nav at small widths

Under **56rem** the inline nav is replaced by a right-hand drawer. It is a
`<dialog>` opened with `showModal()`, so the scrim, Escape, and inerting the
page behind it are the browser's, not ours; `nav-drawer.js` adds only the
toggle wiring, click-off dismissal, closing on navigation, and closing if the
viewport grows past the breakpoint while it is open. The drawer paints the
page's own ground — texture and all — rather than a surface colour, so it
reads as the paper sliding in rather than a card floating over it.

**The theme toggle stays in the bar at every width.** It is the point of this
site, and its panel is a full-width band under the bar rather than a nav item;
burying the one control everything else exists to demonstrate behind a
hamburger would be the wrong trade. So small screens carry two controls —
theme, then menu.

The drawer renders as a sibling of `<header>`, not inside it: `.topbar` carries
a `backdrop-filter`, which makes it the containing block for anything fixed
within it. Its links and the inline nav's are the same `links` array rendered
twice; one of the two is `display: none` at any width, so only one reaches the
accessibility tree and neither can drift.

## The debug panel

`src/scripts/debug.js` — an on-page inspector for the layout bugs that only
show up on a real device. Open it with `?debug` in the URL or **Shift+D** (the
theme shortcuts are unshifted single keys, so the two cannot collide); the
state is remembered per tab.

It reports the viewport width, the document's `scrollWidth` and the difference
between them, then lists every element sticking out past the document's edge —
widest first, and starred when it has *no* overflowing ancestor, which is
usually where the cause is. Elements inside something that scrolls or clips
them are excluded: they cannot move the document. A second list catches the
containers that are silently scrolling sideways instead. Tapping a row outlines
that element and scrolls to it; **Copy report** puts the whole thing on the
clipboard as text.

It is inert until switched on, builds its own DOM, and injects its own styles
from the script — nothing about it is in `base.css`, so it cannot leak into a
theme or a component.

A `.spec` label whose component has a written entry in `COMPONENTS.md` carries
a **spec'd** mark linking to it. The mark is generated by reading that file's
headings at build time (`src/data/documented.js`), so it can neither claim an
entry that was never written nor miss one that was.

Every component demo carries a `.spec` label with its component name (the
names the app's DS uses: EventCard, EventCardProminent, EventTicket,
DateBlock, AttendeeFaces, TrailCard, HighlightTag, …). Content is real, from
`../blrhikes-app/dev/seed.json`. The seed's trail covers are GitHub
user-attachments URLs that 404 for anonymous requests, so the page uses the
same rewrite v1 ships (`src/api/rehypeTransformImageUrls.js`):
`blrhikes.com/cdn-cgi/image/…/images.blrhikes.com/<uuid>` — see
`src/data/images.js`. Type over a photo stays white in every theme, since a
photograph has no colour scheme.

Every page carries the theme picker — the event page and the tear lab
included, so a theme can be judged on a real screen and not only on the
showcase. Both reuse the shared components: the event
rail's price/lead/going card is `RegistrationCard` — the very card the
showcase's event section renders, same parts in the same order, differing
only in content and in `sticky={false}` (the rail around it already sticks).
The trail leading the article column is `TrailCardOverlay`, one up — at that
width the cover is big enough to carry the name and the fixed facts on it.

TrailCardOverlay is the chosen trail card. The two it was picked over,
TrailCard and TrailCardWide, moved to `/archive` rather than being deleted —
a decision is easier to revisit with the alternatives still standing, and they
still paint from the same contract, so they still answer a new theme.

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
| = | **Milestone** | light | The live blrhikes.com palette on Kraft's edge and type: Tailwind's warm stone ramp, yellow-400 fills with stone-900 on them, olive-green ridges |
| [ | **Milestone Soft** | light | Milestone with one token changed: the cards' hard offset stamp becomes a soft two-layer shadow cast straight down. Shares milestone.css; the variant file is only `--card-shadow` and `--pop-shadow` |

| ] | **Kraft Night** | dark | Kraft after dark: the same paper scan under a near-black wash so the grain survives, the accent inverted to pale-paper-on-ink, same tear and type |
| \\ | **Milestone Night** | dark | Milestone Soft after dark, transcribed from the app's own `dark:` classes: stone-900 ground, stone-800 cards, yellow-500 still the one accent |
| ; | **Kraft Gold** | light | Kraft with Milestone's accent: same paper, tear and type, but the dark warm neutral becomes yellow-400 (fills) / yellow-900 (type). Shares kraft.css; the variant file is only the four accent tokens |
| ' | **Kraft Canopy** | light | Kraft's paper scan and torn edges carrying Canopy Day's forest palette: the leaf wash and green dapple laid over the grain, deep-green ink and accent, Kraft's type kept |

Icons are Font Awesome 6 (CDN), matching the app's own icon names
(`location-dot`, `clock`, `mountain-sun`, `fish`, `car-side`, `star`).

### The shadow override

The one control in the picker that is not a theme. It sits below the chips,
cycles with **`s`**, persists like the theme does, and stays put across a theme
change — the comparison it exists for is a theme against *itself*.

| | |
|---|---|
| **Theme** | the default. No attribute is written; every theme lifts exactly as it means to |
| **On** | supplies a plain two-layer drop shadow to the six themes that ship flat (the four Krafts, Contour, Mono). A no-op on the other eleven, deliberately: overriding Poster's hard stamp with a generic shadow would answer a question nobody asked |
| **Off** | flattens everything, on any theme — cards, popovers, dropdowns and CTAs at once |

`data-shadows` on `<html>`, alongside `data-theme`, applied in the same
pre-paint script; the rules are `src/styles/shadow-toggle.css`, imported last
so it outranks the themes on order rather than on specificity. "Off" is cheap
because shadows in this system funnel through two tokens — `--card-shadow` and
`--pop-shadow` — so re-pointing that pair reaches everything. "On" cannot be:
CSS has no way to ask whether a theme's shadow *happens* to be `none`, so the
flat six are named in that file, and a new flat theme has to join them there.

Left alone in every state: focus rings and the avatar stack's `drop-shadow`
(they separate overlapping shapes rather than lift them), the inset line that
reads as a paper edge's thickness, the white type shadows over photographs, and
the dark themes' `drop-shadow` glows, which are light sources.

Themes 6–7, 12–13 and 16–17 all keep Kraft's typography — Fraunces over DM Sans,
weights capped at 500 — so that a theme switch reads as a change of colour
rather than a change of voice, and the palettes can be compared on equal
terms.

Themes 6–7 take their palette from
`design.codeuncode.com/blrhikes-design-system-solstice` (light and dark
modes respectively), instead of the source's Cormorant Garamond/Lora.
Theme 12 takes its palette from the running app, not the live site's faces
(Che Guevara Golden, IM FePI).

## Adding another theme

1. Copy any file in `src/styles/themes/`, rename the `[data-theme="…"]`
   selector, and import it in `src/layouts/BaseLayout.astro`.
   To wear the hand-torn edge, add the theme to the `:is()` scope at the top
   of `src/styles/torn-paper.css` and set `--cut` — the geometry is shared, so
   there is nothing to copy.
2. Set **every** token in the contract (listed at the top of `base.css`).
3. Add a row in `src/data/themes.js` — the picker chip, the keyboard
   shortcut and the label all come from there.
4. If the theme sets `--card-shadow: none`, add it to the `:is()` list in
   `src/styles/shadow-toggle.css` too, or the picker's **Shadows · On** will do
   nothing for it.

Slots are named for their job, not their colour — `--accent` is the fill,
`--accent-type` is the accent *as text* and must clear 4.5:1 on `--ground`.
