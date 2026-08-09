# Shortlisted components

The components that survived the exploration and are meant
to carry into the app (`../blrhikes-app`). One entry per component, in the
order they'd be built.

Each entry follows the same template:

> **What it's for** · **Anatomy** (the layers, top to bottom) · **Markup**
> (the canonical instance) · **Class contract** (what each class is
> responsible for, and where it lives) · **Layout** · **Tokens** it paints
> from · **Theme notes** · **Behaviour** (JS, if any) · **Accessibility** ·
> **Open questions**.

Naming follows the memo convention: `Component-Variant` with a hyphen
(`EventCardProminent-TornSides`). A component with no hyphen is the base

| Component                   | Status      | Entry                                 |
| --------------------------- | ----------- | ------------------------------------- |
| EventCard                   | shortlisted | [below](#eventcard)                   |
| EventCardProminent-TornEnds | shortlisted | [below](#eventcardprominent-tornends) |
| EventPage _(surface)_       | built       | [below](#eventpage)                   |
| EventCover                  | page-scoped | [below](#eventcover)                  |
| EventArticle                | page-scoped | [below](#eventarticle)                |
| EventRail                   | page-scoped | [below](#eventrail)                   |
| RegistrationCard            | shortlisted | [below](#registrationcard)            |
| TrailCardWide-TornEnds      | shortlisted | [below](#trailcardwide-tornends)      |
| TrailCardOverlay            | shortlisted | [below](#trailcardoverlay)            |
| Notice                      | shortlisted | [below](#notice)                      |
| HighlightTags               | shortlisted | [below](#highlighttags)               |
| VehicleCard                 | shortlisted | [below](#vehiclecard)                 |
| TornPaper _(mechanism)_     | shortlisted | [below](#tornpaper)                   |
| PillLead                    | shortlisted | [below](#pilllead)                    |

---

## EventCard

The workhorse of the events index. A cover photo carrying the four things you
need before you commit — **when** (DateBlock, top-left), **whether you can
still get in** (capacity pill, top-right), **what and where** (title and time
on the wash) — and a body that answers price, place, who's going, and what to
do about it.

Three per row at desktop, one at phone. Where TrailCardOverlay is for
_browsing places_, EventCard is for _deciding on a date_: everything above the
fold is time-sensitive.

### What it's for

- The **events index** — a run of upcoming hikes, scanned top to bottom.
- Distinct from `EventCardProminent` (the featured two-column card at the top
  of the page, same tokens, cover beside the body instead of above it) and
  `EventTicket` (post-registration, no cover). EventCard is the default.

### Anatomy

```
┌─ article.card.photo-card ────────────────────────────────────┐
│ ┌─ .photo-wrap ────────────────────────────────────────────┐ │
│ │  img.photo                          16:10 cover          │ │
│ │  .photo-dateblock > .dateblock       ← top-left          │ │
│ │  .photo-badge > .pill.pill-full|pill-live  ← top-right   │ │
│ │  ┌─ .photo-title ──────────────────────── bottom, abs ─┐ │ │
│ │  │  ::before   the dark wash (own layer, z-index -1)   │ │ │
│ │  │  h3.title                                           │ │ │
│ │  │  p.photo-date       "5:30 pm start"                 │ │ │
│ │  └─────────────────────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌─ .photo-body ────────────────────────── grid, start ─────┐ │
│ │  .cluster          type · price · member price           │ │
│ │  p.iconline        the place                             │ │
│ │  p.fine.clamp-2    the blurb, two lines hard             │ │
│ │  p.face-stack      AttendeeFaces + "30 going"            │ │
│ │  .card-foot        start time  │  actions (margin-top:auto)│
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Markup

Canonical instance, from `src/components/cards/EventCard.astro`:

```html
<article class="card photo-card">
  <div class="photo-wrap" style="--photo:url('…')">
    <img class="photo" src="…" alt="" loading="lazy" />
    <div class="photo-title">
      <h3 class="title">Savandurga Full Moon Walk</h3>
      <p class="photo-date">5:30 pm start</p>
    </div>
    <div class="photo-dateblock">
      <div class="dateblock" aria-label="Sat 22 Aug">
        <span class="db-mon">Aug</span>
        <span class="db-day">22</span>
        <span class="db-dow">Sat</span>
      </div>
    </div>
    <span class="photo-badge"><span class="pill pill-full">Full</span></span>
  </div>
  <div class="photo-body">
    <div class="cluster">
      <span class="pill">
        <i class="fa-solid fa-mountain-sun" aria-hidden="true"></i>
        Hike
      </span>
      <span class="pill">₹850</span>
      <span class="pill pill-ok">₹700 members</span>
    </div>
    <p class="iconline">
      <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
      Savandurga, Magadi
    </p>
    <p class="fine clamp-2">Asia's largest monolith by moonlight — a slow, quiet climb …</p>
    <p class="face-stack" aria-label="30 going">
      <span class="face">RA</span>
      <span class="face">RH</span>
      <span class="face">SR</span>
      <span class="face face-more">+27</span>
      <span class="going">30 going</span>
    </p>
    <div class="card-foot">
      <span class="iconline">
        <i class="fa-regular fa-clock" aria-hidden="true"></i>
        5:30 pm start
      </span>
      <span class="actions">
        <a class="btn btn-secondary btn-sm" href="#">Details</a>
        <a class="btn btn-primary btn-sm" href="#">Register</a>
      </span>
    </div>
  </div>
</article>
```

The container is `div.event-grid`.

### Class contract

| Class                                                              | Adds                                                                                                  | Defined at                |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------- |
| `.card`                                                            | the surface: background, border, radius                                                               | `base.css`                |
| `.photo-card`                                                      | `padding:0`, `overflow:clip`, flex column — a card whose first child is a photo bleeding to the edges | `base.css:1532`           |
| `.photo-wrap`                                                      | `position: relative` — the positioning context for the cover furniture                                | `base.css:1736`           |
| `.photo-title`                                                     | absolutely positioned bottom block, white type, `isolation: isolate`                                  | `base.css:1740`           |
| `.photo-title::before`                                             | the dark wash, as its own layer at `z-index: -1`                                                      | `base.css:1751`           |
| `.photo-title .photo-date`                                         | the start time under the title, mono, white at 85%                                                    | `base.css:1763`           |
| `.photo-dateblock` / `.dateblock`                                  | DateBlock pinned to the top-left corner: month in the accent, oversized day, weekday under it         | `base.css:1845` / `:1805` |
| `.photo-badge`                                                     | the opposite corner — capacity state                                                                  | `base.css:1771`           |
| `.pill-live` / `.pill-full` / `.pill-ok`                           | the three semantic pill states: spots left (accent), full (danger), member price (ok)                 | `base.css:621`–`622`      |
| `.photo-body`                                                      | grid, `gap: 0.45rem`, `align-content: start`                                                          | `base.css:1545`           |
| `.cluster`                                                         | wrapping flex row for the type/price pills                                                            | `base.css:597`            |
| `.iconline`                                                        | icon + text line, icon in `--accent-type`                                                             | `base.css:1570`           |
| `.clamp-2`                                                         | the blurb, exactly two lines                                                                          | `base.css:1777`           |
| `.face-stack` / `.face-shadow` / `.face` / `.face-more` / `.going` | AttendeeFaces — overlapping octagonal initial discs, `+n` for the rest                                | `base.css:1631`           |
| `.card-foot`                                                       | `margin-top: auto`, rule above, time on the left and actions on the right                             | `base.css:1784`           |

Three invariants worth carrying into the app:

1. **The wash is a separate layer from the type.** `.photo-title::before` at
   `z-index: -1` under `isolation: isolate`. Kraft tears the wash's edge with
   an SVG filter; the title stays crisp. Same split as TrailCardOverlay.
2. **The two corners are a pair.** DateBlock top-left, capacity top-right, both
   at `0.7rem`. A theme that moves one (kraft pushes both to `1.8rem` to clear
   the top tear) must move the other.
3. **The face stack is a group of people, not a number.** `+n` only absorbs the
   overflow; the first three are always faces. Each disc is the app's rounded
   octagon (`#face-octagon`), and it takes **two elements** — the octagon is a
   `clip-path`, which clips a `box-shadow` away with it, so the lift has to be
   a `drop-shadow()` on a `.face-shadow` wrapper. The row is written backwards
   (label, `+n`, faces reversed) and flipped with `row-reverse`, which is what
   puts the first face on top with no `z-index` anywhere.

### Layout

- **Grid**: `.event-grid` is `repeat(auto-fit, minmax(18rem, 1fr))`, gap
  `1.25rem` — three up on desktop, two around 40rem, one below ~37rem.
- **Cover**: `16 / 10` (`.photo-card .photo`). Wider than a trail cover's 4:3,
  because an event photo is a _scene_ and the card's job is the furniture on
  top of it, not the picture.
- **Body**: grid with `align-content: start`, so the content stacks from the
  top and the slack collects at the bottom — where `.card-foot`'s
  `margin-top: auto` pins the footer. Cards in a row therefore end their
  action rows on the same line regardless of blurb length.
- **`.clamp-2`** is what makes that work: two lines hard, so the only variable
  height in the body is the pill cluster wrapping.

### Tokens

`--surface` `--surface-2` `--surface-raise` `--line` `--line-soft` `--ink`
`--ink-soft` `--ink-faint` `--accent-type` `--accent-tint` `--danger`
`--danger-tint` `--ok` `--ok-tint` `--font-mono` `--font-display`
`--pill-radius` `--ctl-radius` `--label-case` `--w-medium` `--w-strong`

Plus `--photo` (the cover URL, on `.photo-wrap`) per instance.

### Theme notes

- **Kraft** — the cover's bottom edge and the wash's edge both tear
  (`url(#cut-photo)`); `.photo-badge` and `.photo-dateblock` both drop to
  `1.8rem` to clear the top rip, and `.photo-title` takes extra
  `padding-bottom`. Tunable in the tear lab (`src/pages/tear-lab.astro`).
- Everything else takes the component unchanged. The wash and the white type
  are theme-neutral literals by construction, so a new theme only has to get
  `.card`, the pill states and the DateBlock tokens right.

### Behaviour

None. No JS touches EventCard — unlike TrailCardOverlay, which needs
`src/scripts/htags.js` to keep its highlight row one line deep.

### Accessibility

- `h3.title` assumes an `h2` section head above. Parameterise in the app.
- `.dateblock` carries `aria-label="Sat 22 Aug"` because the three spans read
  as "Aug 22 Sat" out of order otherwise. `.face-stack` carries
  `aria-label="30 going"` for the same reason — the initials are noise to a
  screen reader.
- Cover `alt` is `""` in the demo: the photo is decorative when the title sits
  on it. In the app, either keep it empty or describe the place — never repeat
  the title.
- The capacity pill is colour **and** text (`Full`, `12 spots left`), so the
  state survives a monochrome or colour-blind read.
- Contrast on the cover comes from the wash, not the photograph
  (`rgb(10 10 10 / 0.8)` at the base to transparent at 70%).

### Open questions

- The card is not a link; `Details` / `Register` are the only targets. Should
  the cover be a link to the event page?
- `Details` + `Register` vs a single `Join waitlist` — the action set changes
  with capacity state, and that logic isn't expressed anywhere in the markup.
- The pill cluster mixes categories: type (`Hike`) and price (`₹850`,
  `₹700 members`) are the same shape but different kinds of fact.
- Price is shown twice over (`₹850` / `₹700 members`) with no indication of
  which applies to the person reading. Members should probably see one number.

---

## EventCardProminent-TornEnds

The one event at the top of the page that gets a whole row to itself. Same
facts as EventCard, turned on its side: the cover takes the left flank, the
body takes the right, and the extra width buys a display-sized title, an
unclamped-but-still-two-line blurb, and the lead's name on a chip beside the
type pill.

`-TornEnds` is the edge variant: the rip runs along the top and bottom, and
the left and right stay on the fine cut. Its sibling `EventCardProminent-
TornSides` (`.torn-lr`) transposes that — same markup, one extra class.

### What it's for

- The **featured slot**: one upcoming hike promoted above the index, where a
  16:10 thumbnail would undersell the photograph.
- Distinct from `EventCard` (the three-up default, cover above the body) and
  `EventTicket` (post-registration, no cover). Use at most one per view — a
  run of these reads as a list of banners, not a hierarchy.

### Anatomy

```
┌─ article.card.feat-card ──────────────────── grid 1.1fr / 1fr ──────────┐
│ ┌─ .photo-wrap ─────────── 4:3 ─┐ ┌─ .feat-body ──── flex column ─────┐ │
│ │  img.photo      inset, cover  │ │ ┌─ .feat-head ─────────────────┐  │ │
│ │  ::before  backing, top half, │ │ │  .dateblock    ← when        │  │ │
│ │            through --cut      │ │ │  h3.title.feat-title         │  │ │
│ │  ::after   backing, bottom,   │ │ │  p.iconline    the time      │  │ │
│ │            through #cut-photo │ │ └──────────────────────────────┘  │ │
│ │  .photo-badge  ← capacity     │ │  p.iconline      the place        │ │
│ │                               │ │  p.fine.clamp-2  the blurb        │ │
│ │                               │ │  .cluster   type · lead · faces   │ │
│ │                               │ │  .card-foot price │ actions       │ │
│ └───────────────────────────────┘ └───────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

Note where the DateBlock lives: on the **body**, beside the title, not pinned
to the cover the way EventCard pins it. At this size the title is the anchor,
and the date reads as its first fact.

### Markup

Canonical instance, from `src/components/cards/EventCardProminent.astro`:

```html
<article class="card feat-card">
  <div class="photo-wrap" style="--photo:url('…')">
    <img class="photo" src="…" alt="" loading="lazy" />
    <span class="photo-badge"><span class="pill pill-live">9 spots left</span></span>
  </div>
  <div class="feat-body">
    <div class="feat-head">
      <div class="dateblock" aria-label="Sat 15 Aug">
        <span class="db-mon">Aug</span>
        <span class="db-day">15</span>
        <span class="db-dow">Sat</span>
      </div>
      <div>
        <h3 class="title feat-title">Granite Gauntlet Night Trek</h3>
        <p class="iconline">
          <i class="fa-regular fa-clock" aria-hidden="true"></i>
          10:00 pm · carpools leave 8:00 pm
        </p>
      </div>
    </div>
    <p class="iconline">
      <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
      south-west of Bengaluru · 65 km drive
    </p>
    <p class="fine clamp-2">Up the slab scramble under a waning moon, the summit by midnight …</p>
    <div class="cluster">
      <span class="pill">
        <i class="fa-solid fa-mountain-sun" aria-hidden="true"></i>
        Hike
      </span>
      <span class="pill pill-member pill-lead">
        Led by Shreshth
        <span class="face-shadow"><span class="face">SH</span></span>
      </span>
      <span class="face-stack" aria-label="11 going">
        <span class="going">11 going</span>
        <span class="face-shadow"><span class="face face-more">+8</span></span>
        <span class="face-shadow"><span class="face">CH</span></span>
        <span class="face-shadow"><span class="face">DH</span></span>
        <span class="face-shadow"><span class="face">SA</span></span>
      </span>
    </div>
    <div class="card-foot">
      <p class="price">₹950</p>
      <span class="actions">
        <a class="btn btn-secondary btn-sm" href="/event/">Details</a>
        <a class="btn btn-primary btn-sm" href="#">Register</a>
      </span>
    </div>
  </div>
</article>
```

No grid container — the card is full-measure inside `.container`. Add
`.torn-lr` to the `<article>` for the TornSides variant; nothing else changes.

### Class contract

| Class                                                              | Adds                                                                                  | Defined at             |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ---------------------- |
| `.card`                                                            | the surface: background, border, radius                                               | `base.css:423`         |
| `.feat-card`                                                       | `padding:0`, `overflow:clip`, and the two-column grid `minmax(0,1.1fr) minmax(0,1fr)` | `base.css:1853`        |
| `.feat-card .photo-wrap`                                           | `aspect-ratio: 4/3` **and** `min-height: 100%` — see Layout                           | `base.css:1874`        |
| `.feat-card .photo`                                                | absolutely inset, `object-fit: cover`                                                 | `base.css:1862`        |
| `.photo-badge`                                                     | the capacity pill, top corner of the cover                                            | `base.css:1771`        |
| `.feat-body`                                                       | flex column, `gap: 0.65rem`, `padding: clamp(1.25rem, 3vw, 1.75rem)`                  | `base.css:1887`        |
| `.feat-head`                                                       | the DateBlock/title row: flex, `align-items: flex-start`                              | `base.css:1894`        |
| `.feat-title`                                                      | `clamp(1.6rem, 3vw, 2.1rem)` — display scale, not `.title`'s 1.25rem                  | `base.css:1904`        |
| `.dateblock` / `.db-mon` / `.db-day` / `.db-dow`                   | DateBlock, inline here rather than pinned to a corner                                 | `base.css:1805`        |
| `.iconline`                                                        | icon + text line, icon in `--accent-type`                                             | `base.css:1570`        |
| `.clamp-2`                                                         | the blurb, exactly two lines                                                          | `base.css:1777`        |
| `.cluster`                                                         | wrapping flex row: type pill, lead chip, face stack                                   | `base.css:597`         |
| `.pill-lead`                                                       | the lead chip — chamfered, borderless, with the face flush to its trailing edge       | `base.css:657`         |
| `.face-stack` / `.face-shadow` / `.face` / `.face-more` / `.going` | AttendeeFaces                                                                         | `base.css:1631`        |
| `.card-foot`                                                       | rule above, price left / actions right                                                | `base.css:1784`        |
| `.torn-lr`                                                         | _(variant)_ transposes the rip to the left and right edges                            | `themes/kraft.css:187` |

Three invariants worth carrying into the app:

1. **The two flanks must end on the same line.** The cover is `aspect-ratio:
4 / 3` for its shape **and** `min-height: 100%` so the grid can stretch it:
   with the ratio alone, a definite height wins over the grid's `stretch` and
   the cover finishes a couple of pixels short of the body. The ratio sizes
   the row; the `min-height` makes the cover fill whatever the row becomes.
2. **The lead chip is text-then-face.** `Led by <name>` followed by the disc,
   with `.pill-lead`'s padding on the _leading_ side only, so the octagon is
   flush with the pill's trailing edge. Flipping the order means flipping that
   padding — the chamfer clip is symmetric and needs no change.
3. **A photograph is never filtered.** The clean `<img>` is clipped a little
   short and the _same_ image is repainted behind it through the theme's cut,
   so the ragged edge is backing pixels. This is the same split EventCard and
   TrailCard use; it is what keeps a torn card from looking like a warped one.

### Layout

- **Grid**: `minmax(0, 1.1fr) minmax(0, 1fr)` — the cover gets the larger
  share. Collapses to a single column at `46rem`, cover on top, at which point
  the card is an oversized EventCard.
- **Cover**: `4 / 3`, unlike EventCard's 16:10. The taller frame is what lets
  the cover hold its own beside a body of six stacked rows.
- **Body**: `flex-direction: column` with a fixed gap, and `.card-foot` pushed
  down by `margin-top: auto`. If the body's content ever exceeds the 4:3 row,
  the row grows and the cover grows with it — content is never clipped to hold
  the ratio.
- **`.feat-head > div > * + *`** gives the title/time pair its own `0.4rem`
  rhythm, tighter than the body's `0.65rem`, so they read as one block.

### Tokens

`--surface` `--surface-raise` `--line` `--line-soft` `--ink` `--ink-soft`
`--ink-faint` `--accent-type` `--accent-tint` `--font-display` `--font-mono`
`--card-radius` `--ctl-radius` `--pill-radius` `--card-shadow` `--cut`
`--w-medium` `--w-strong` `--label-case` `--label-track`

Plus `--photo` (the cover URL, on `.photo-wrap`) per instance.

### Theme notes

- **Kraft** — the card's surface layer is cut away over the cover's flank with
  a `polygon()` rather than an `inset()`, because the photo only covers the
  left column once the grid splits; below `46rem` it falls back to the plain
  inset that `.photo-card` uses. The top edge is the image backing's tear
  alone, so no surface colour peeks out from behind the photograph.
- **Kraft, `-TornSides`** — the right edge is an _internal seam against the
  body_, not the card's outer boundary, so it gets the same filter with less of
  it let out: the backing frays 6px past the seam instead of 30, into the 10px
  the clean image gives up. Both backing halves are clipped at the same 6px
  the surface is, so the two flanks start on one line.
- Every other theme takes the component unchanged — `--cut` resolves to
  `opacity(1)` and the edges are simply straight.

### Behaviour

None. No JS touches this card.

### Accessibility

- `h3.feat-title` assumes an `h2` section head above. Parameterise in the app.
- `.dateblock` carries `aria-label="Sat 15 Aug"`; the three spans read as
  "Aug 15 Sat" out of order otherwise. `.face-stack` carries its count for the
  same reason.
- Cover `alt` is `""`: the photo is decorative when every fact is beside it.
- The capacity pill is colour **and** text (`9 spots left`).
- The lead chip reads "Led by Shreshth" in full — the initials in the disc are
  decoration, not the name.

### Open questions

- `Details` points at the event page and `Register` does not point anywhere
  yet. Should the whole card be the link, with the buttons as affordances?
- The lead chip and the face stack are both people, rendered two different
  ways in the same row. One of them probably wins.
- At `46rem` the card collapses to EventCard's shape but keeps the display
  title, which is very large on a phone. Should `.feat-title` drop to `.title`
  once stacked?
- Nothing expresses _why_ this event is featured. Editorially chosen, or the
  next one out?

---

## EventPage

Not a component — the **surface** the event components compose into, and the
one page in this repo that is a real screen rather than a specimen shelf. A
full-bleed cover running under the top bar, then a two-column split: the
article on the left, a sticky rail on the right.

It exists to answer a different question from the showcase. The showcase asks
_does this component hold up under thirteen themes_; the event page asks _do
these components hold up next to each other, at real content length, on one
screen_. It is kraft-only for now, and its top bar renders without the theme
picker for that reason.

### What it's for

- The **event detail screen** — the page a `Details` link on `EventCard` or
  `EventCardProminent` opens.
- Everything on it is either a shared component (`RegistrationCard`,
  `TrailCard`, `Notice`, `Pill`, `Btn`) or a page-scoped block prefixed `ev-`.
  Nothing in `src/styles/event.css` is a colour, a face, or anything a theme
  would need to override — it is layout painted from the token contract.

### Anatomy

```
┌─ BaseLayout ────────────────────────────────────────────────────────────┐
│  PaperFilters · TopBar (no theme picker) ── sticky, overlays the cover   │
│ ┌─ main ──────────────────────────────────────────────────────────────┐ │
│ │ ┌─ EventCover · header.ev-cover ─────────────── full bleed ────────┐ │ │
│ │ │  .ev-cover-backing   the same photo, torn (z-index -2)           │ │ │
│ │ │  img.photo           the clean photo, clipped short (z-index -1) │ │ │
│ │ │  .container > .ev-cover-copy    back link · eyebrow · h1 · when  │ │ │
│ │ └──────────────────────────────────────────────────────────────────┘ │ │
│ │ ┌─ .container.ev-main ─────────────── grid  1fr / 22rem ───────────┐ │ │
│ │ │ ┌─ .ev-col ───────────────┐  ┌─ EventRail · aside.ev-aside ────┐ │ │ │
│ │ │ │ EventTrail              │  │  RegistrationCard  (not sticky) │ │ │ │
│ │ │ │  TrailCardOverlay       │  │  .card      "Already registered"│ │ │ │
│ │ │ │ article.card.ev-article │  └─────────────────────────────────┘ │ │ │
│ │ │ │  p.lede · EventSection ×7│                                     │ │ │
│ │ │ └─────────────────────────┘                                      │ │ │
│ │ └──────────────────────────────────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────────────────────────────────┘ │
│  SiteFooter variant="quiet"                                             │
└─────────────────────────────────────────────────────────────────────────┘
```

### Markup

From `src/pages/event.astro`:

```astro
<BaseLayout
  title="Fern Gully Sunrise Hike · BLR Hikes"
  links={eventLinks}
  brandHref="/"
  footer="quiet"
  footerNote="…"
>
  <EventCover photo={…} alt="…" eyebrow="Upcoming hike" title="…" when="…" where="…" spots="…" />

  <div class="container ev-main">
    <EventArticle />
    <EventRail />
  </div>
</BaseLayout>
```

### Class contract

| Class                  | Adds                                                                                       | Defined at      |
| ---------------------- | ------------------------------------------------------------------------------------------ | --------------- |
| `.ev-main`             | the split: `grid-template-columns: minmax(0, 1fr) 22rem`, `align-items: start`             | `event.css:98`  |
| `.ev-article`          | the left column's card padding, `clamp(1.5rem, 3.5vw, 2.75rem)`                            | `event.css:111` |
| `.ev-aside`            | the rail: grid, `gap: 1.75rem`, sticky under the top bar                                   | `event.css:216` |
| `.ev-col`              | the left column — the trail, then the article, gapped wide enough to clear both torn edges | `event.css:241` |
| `.ev-block-title`      | the mono label above a block that is not itself a card                                     | `event.css:227` |
| `.ev-block-title--gap` | that label's spacing under it                                                              | `event.css:273` |
| `.ev-links`            | the "Already registered?" list — icon + link rows                                          | `event.css:247` |

### Layout

- **Columns**: `minmax(0, 1fr) 22rem`. The rail is a fixed measure because its
  contents are fixed-width things (a price, a meter, a link list); the
  article column takes the slack. Collapses to one column at `62rem`, article first.
- **Column gap**: `clamp(1rem, 2.5vw, 1.75rem)` — tight, because both columns
  are now cards and the paper edges do the separating.
- **The rail sticks, the card inside it does not.** `.ev-aside` is
  `position: sticky`; the `RegistrationCard` inside takes `sticky={false}`,
  which is `.aside-card--static`. See the invariant below.
- **The cover runs under the top bar** — `margin-top: calc(-1 * var(--topbar-h))`
  with matching `padding-top`, so the photo starts at the viewport's top edge
  and the type still clears the bar.

One invariant, learned the hard way:

> **`.aside-card--static` is `position: relative`, never `static`.** A card's
> paper is `.card::before`, absolutely positioned with `inset: 0`, which
> resolves against the nearest _positioned_ ancestor. `.card` is `relative`, so
> normally that is the card. Un-position the card and the paper resolves
> against `.ev-aside` instead — one card's surface stretches over the whole
> rail and the three blocks render as a single long sheet. If a card must not
> stick, clear the offset (`top: auto`), don't remove the positioning.

### Tokens

Layout only — every colour comes from the contract via the components it
composes. The page's own reads are `--topbar-h`, `--ink-soft`, `--ink-hint`,
`--accent-type`, `--line`, `--line-soft`, `--ok`, `--danger`, `--font-mono`,
`--font-display`, `--label-track`, `--w-medium`.

### Theme notes

Kraft only for now. The three `[data-theme="kraft"]` rules at the foot of
`event.css` tear the cover's bottom edge and the cover wash; every other theme
skips them and gets straight edges, which is a correct render rather than a
broken one. Wiring another theme means checking the cover's white type against
that theme's photo treatment — nothing else.

### Behaviour

`src/scripts/htags.js` only, for the trail card's highlight row. The theme picker and
pagenav scripts are bundled by the layout but no-op here: neither finds its
markup.

### Accessibility

- One `h1` (the event name, on the cover); `EventSection` emits `h2`s in the
  article. The rail's labels are `p`, not headings, because they title blocks
  rather than sections of the document.
- The cover photo carries a real `alt` — it is the only image of the place
  above the fold.
- The FAQ is `<details>`/`<summary>`, so it is keyboard-operable and
  findable-in-page without JS.
- The cover's contrast comes from `.ev-cover-copy::before`, a gradient wash
  under the type, not from the photograph.

### Open questions

- The trail above the article is `TrailCardOverlay`, which does have an entry
  here; the three-up `TrailCard` base still does not.
- Nothing on the page is stateful: "Already registered?" links render for
  everyone, including people who have not registered.
- The article is one long column with no in-page navigation. At this length
  the showcase's `PageNav` would earn its place.
- The page is a single hard-coded instance. Parameterising it is the point at
  which the `ev-` blocks either become components or fold into the app.

---

## EventCover

The event's first screen: a full-bleed photograph running under the sticky top
bar, with the name, the when and the where sitting on a gradient wash at its
foot.

### What it's for

- The **event detail header**. Distinct from `PhotoCover` on the showcase
  (`section.cover`, a 16:9 band inside the page flow) — this one bleeds under
  the top bar and sizes to `clamp(20rem, 46vw, 30rem)` instead of a ratio.

### Anatomy

```
┌─ header.ev-cover ──────────────────── flex, align-items: flex-end ──────┐
│  .ev-cover-backing   the same photo as a background, torn   z-index -2  │
│  img.photo           the clean photograph, clipped short    z-index -1  │
│ ┌─ .container ──────────────────────────────── width: 100% ───────────┐ │
│ │ ┌─ .ev-cover-copy ────────────────────────── isolation: isolate ───┐ │ │
│ │ │  ::before   the wash, inset -50vw sideways, z-index -1           │ │ │
│ │ │  a.ev-back      ← All events                                     │ │ │
│ │ │  p.eyebrow      Upcoming hike                                    │ │ │
│ │ │  h1.display-1   the event name                                   │ │ │
│ │ │  p.ev-when      calendar + location                              │ │ │
│ │ │  p > .pill.pill-on-photo   capacity                              │ │ │
│ │ └──────────────────────────────────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

### Markup

Canonical instance, from `src/components/event/EventCover.astro`:

```html
<header class="ev-cover" style="--photo:url('…')">
  <div class="ev-cover-backing" aria-hidden="true"></div>
  <img class="photo" src="…" alt="First light over the fern gullies" />
  <div class="container">
    <div class="ev-cover-copy">
      <a class="ev-back" href="/">
        <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
        All events
      </a>
      <p class="eyebrow">Upcoming hike</p>
      <h1 class="display-1">Fern Gully Sunrise Hike</h1>
      <p class="ev-when">
        <span>
          <i class="fa-regular fa-calendar" aria-hidden="true"></i>
          Thu, 13 Aug 2026, 5:00 am
        </span>
        <span>
          <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
          Emerald Hills, south-west
        </span>
      </p>
      <p><span class="pill pill-on-photo">13 of 20 spots left</span></p>
    </div>
  </div>
</header>
```

### Class contract

| Class                    | Adds                                                                                                                             | Defined at     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `.ev-cover`              | the bleed: negative `margin-top` of `--topbar-h` with matching padding, `min-height: clamp(20rem, 46vw, 30rem)`, flex/`flex-end` | `event.css:16` |
| `.ev-cover > .container` | `width: 100%` — see the invariant                                                                                                | `event.css:49` |
| `.ev-cover .photo`       | the clean photograph, `inset: 0`, `object-fit: cover`, clipped short at the bottom                                               | `event.css:26` |
| `.ev-cover-backing`      | the same photo as a `background-image` behind it, from `--photo`                                                                 | `event.css:36` |
| `.ev-cover-copy`         | the type block: `isolation: isolate`, generous `padding-block`                                                                   | `event.css:55` |
| `.ev-cover-copy::before` | the wash, its own layer at `z-index: -1`, `inset: -1px -50vw` so it spans the viewport                                           | `event.css:62` |
| `.ev-back`               | the mono back-link                                                                                                               | `event.css:74` |
| `.ev-when`               | the wrapping meta row                                                                                                            | `event.css:88` |
| `.pill-on-photo`         | frosted white pill — `pill-live`'s accent tokens are dark ink on a light tint and vanish on a photograph                         | `base.css`     |

Two invariants:

1. **`.container` inside a flex parent needs a stated width.** `.ev-cover` is
   `display: flex`, so its `.container` child is a flex item and sizes to its
   _content_, not to 100% — and `.container`'s `margin-inline: auto` then
   centres that shrunken box, indenting the title away from the article below.
   `width: 100%` and the measure lines up. The showcase's `.cover-inner` states
   its width for the same reason.
2. **The photograph is never filtered.** Same split every card uses: the clean
   `<img>` is clipped a little short at the bottom, and `.ev-cover-backing`
   repaints the same image behind it through `#cut-photo`, so the ragged edge
   is backing pixels.

### Layout

- **Height** is `min-height: clamp(20rem, 46vw, 30rem)` rather than an aspect
  ratio, so a wide viewport crops the photo instead of growing the band. (The
  showcase's `.cover` does use a ratio, and has to state `width: 100%` or the
  `max-height` transfers back through the ratio and shrinks the band.)
- **The wash spans the viewport** (`inset: -1px -50vw`) even though the type
  stays in the measure, so the gradient reaches both screen edges under a
  full-bleed photograph.

### Tokens

`--topbar-h` `--font-mono` `--label-track`, plus the `#fff` /
`rgb(255 255 255 / …)` / `rgb(10 10 10 / …)` literals on the type and wash —
deliberately not tokens, since a photograph has no colour scheme.

Plus `--photo` (the cover URL, on the header) per instance.

### Theme notes

- **Kraft** — `.ev-cover-backing` runs `#cut-photo`, the clean photo is clipped
  `inset(0 0 16px 0)`, and the wash's own bottom edge runs `#cut-photo-wide`: a
  longer-wavelength variant, because the wash spans the viewport and the
  ordinary photo cut reads as a repeating comb at that width.
- Every other theme gets straight edges and is correct as-is.

### Behaviour

None.

### Accessibility

- The `h1` is here, not in the article.
- `.ev-cover-backing` is `aria-hidden` — it is the same image twice.
- The capacity pill is text as well as tone.
- Contrast comes from the wash, so it holds over a bright sky.

### Open questions

- The back link says "All events" but points at the showcase index. In the app
  it wants a real events route.
- The cover states capacity and the rail states it again, as a meter. Two
  numbers for one fact.

---

## EventArticle

The left column: everything a hiker reads before deciding. A lede, then a run
of `EventSection` blocks — the plan, carpools, highlights, what's in and out,
what to bring, difficulty, and the folds at the bottom.

Since it is a `.card`, it takes the same paper and the same torn top and
bottom edge as the `RegistrationCard` beside it, which is what stops the page
reading as prose-next-to-a-widget.

### What it's for

- The **body of the event detail page**. Three small components do the
  repeating shapes inside it, all in `src/components/event/`:
  `EventSection` (an icon'd `h2` plus whatever follows), `EventList` (the
  ticked/crossed list), `EventFaq` (the `<details>` folds).

### Anatomy

```
┌─ article.card.ev-article ────────────────────────────────────────────┐
│  p.lede                                                              │
│ ┌─ EventSection · section ─────────────────────────────────────────┐ │
│ │  h2.ev-sec-title    <i> + label                                  │ │
│ │  …slot: dl.ev-plan | EventList | p.fine | Notice | EventFaq      │ │
│ └──────────────────────────────────────────────────────────────────┘ │
│  … × 7, with .ev-cols wrapping the included/not-included pair        │
└──────────────────────────────────────────────────────────────────────┘
```

### Markup

From `src/components/event/EventArticle.astro`:

```html
<article class="card ev-article">
  <p class="lede">Catch first light over the fern gullies …</p>

  <section>
    <h2 class="ev-sec-title">
      <i class="fa-regular fa-clock" aria-hidden="true"></i>
      The plan
    </h2>
    <dl class="ev-plan">
      <div>
        <dt>3:30 am</dt>
        <dd>Carpools leave the city …</dd>
      </div>
    </dl>
  </section>

  <section>
    <h2 class="ev-sec-title">
      <i class="fa-solid fa-suitcase-rolling" aria-hidden="true"></i>
      What to bring
    </h2>
    <ul class="ev-list">
      <li>
        <i class="fa-solid fa-check" aria-hidden="true"></i>
        <span>
          Headlamp or torch
          <span class="note">— we start in the dark</span>
        </span>
      </li>
    </ul>
  </section>

  <section>
    <h2 class="ev-sec-title">
      <i class="fa-regular fa-circle-question" aria-hidden="true"></i>
      Before you ask
    </h2>
    <details class="ev-fold">
      <summary>
        <i class="fa-solid fa-seedling" aria-hidden="true"></i>
        Is it beginner-friendly?
      </summary>
      <div><p>Yes — this is the one we recommend for a first hike.</p></div>
    </details>
  </section>
</article>
```

### Class contract

| Class                                         | Adds                                                                                            | Defined at            |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------- |
| `.card`                                       | the paper and its torn top/bottom edge                                                          | `base.css:423`        |
| `.ev-article`                                 | prose padding, `clamp(1.5rem, 3.5vw, 2.75rem)` — wider than `.card`'s default 1.5rem            | `event.css:111`       |
| `.ev-article > * + *`                         | the section rhythm, `clamp(1.75rem, 3.5vw, 2.75rem)`                                            | `event.css:113`       |
| `.ev-article a`                               | prose links — `base.css` styles no bare `<a>`, since every link on the showcase carries a class | `event.css:117`       |
| `.ev-sec-title`                               | the icon'd `h2`: display face, icon in `--accent-type` at `0.85em`                              | `event.css:126`       |
| `.ev-plan`                                    | the timetable: `5.5rem` mono time column against wrapping copy, baseline-aligned                | `event.css:140`       |
| `.ev-cols`                                    | the included/not-included pair, `auto-fit minmax(15rem, 1fr)`                                   | `event.css:158`       |
| `.ev-list` / `.ev-list--yes` / `.ev-list--no` | the mark carries the tone (`--ok` / `--danger`), the type never does                            | `event.css:165`–`177` |
| `.ev-list .note`                              | the trailing aside inside an item                                                               | `event.css:178`       |
| `.ev-fold`                                    | the FAQ folds: rules above, chevron via `::after`, rotated when `[open]`                        | `event.css:182`       |
| `.ev-safety-note`                             | the one `Notice` in the body, and its air above                                                 | `event.css:269`       |

### Layout

- **Rhythm** is one rule: `.ev-article > * + *`. Every block inherits it, so a
  new section needs no spacing of its own.
- **`.ev-plan`** is a grid, not a table — the times are the spine and the copy
  wraps against them, baseline-aligned so a two-line entry still reads level.
- **The folds are closed by default**, because they are the answers to
  questions you only ask if you have them.

### Tokens

`--ink` `--ink-soft` `--ink-hint` `--accent-type` `--ok` `--danger`
`--line-soft` `--font-display` `--font-mono` `--display-weight` `--w-medium`

### Theme notes

Nothing theme-specific. The article is one `.card`, so it takes whatever edge
the theme gives every other card — kraft's torn top and bottom, straight
everywhere else.

### Behaviour

None. `<details>` does its own work.

### Accessibility

- `h2` per section under the cover's `h1`.
- `<details>`/`<summary>` rather than a JS accordion: keyboard-operable,
  findable in page, and open-able by the browser's find-on-page.
- The included/not-included lists carry the distinction in the **mark**
  (`fa-check` vs `fa-xmark`) as well as the colour.
- Every decorative `<i>` is `aria-hidden`.

### Open questions

- `.ev-sec-title` duplicates `.title`'s job at a different size. One of them
  should win.
- The icons are decorative but load-bearing for scanning — a section without
  one would read as a different kind of block.
- No in-page navigation for a column this long.

---

## EventRail

The right column: what you do with an event once you have read about it.
Register, and — if you already have — get to the gear list and the transport
plan. (Where you are going used to live here too; it now leads the article
column as a `TrailCardOverlay`, which the rail is too narrow to carry.)

### What it's for

- The **event detail rail**. Sticky on desktop, stacked under the article
  below `62rem`.
- One of its two blocks is a shared component rendered plainly
  (`RegistrationCard`); only the links block is page-scoped. The trail moved
  out to the article column, where there is width for `TrailCardOverlay`.

### Anatomy

```
┌─ aside.ev-aside ─────────────── grid, gap 1.75rem, sticky ───────────┐
│  RegistrationCard                                 sticky={false}     │
│ ┌─ .card ──────────────────────────────────────────────────────────┐ │
│ │  p.ev-block-title   "Already registered?"                        │ │
│ │  ul.ev-links        gear · travel form · my ride · plan · group  │ │
│ └──────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

### Markup

From `src/components/event/EventRail.astro`:

```astro
<aside class="ev-aside">
  <RegistrationCard
    date={{ mon: "Aug", day: "13", dow: "Thu", label: "Thu 13 Aug" }}
    price="₹900" unit="/ person" memberNote="Members pay <strong>₹750</strong>"
    rows={[["Start", "05:00 at the blue gate"], ["End", "~10:00, back in the city"]]}
    lead={{ initials: "AS", text: "Led by Ava Sharma" }}
    going={{ count: "3 going", faces: ["CD", "EL", "DO"] }}
    meter={{ taken: 7, total: 20, note: "7 / 20 registered · 13 left" }}
    cta="Register" ctaIcon="arrow-right"
    sticky={false}
  />

  <div class="card">
    <p class="ev-block-title">Already registered?</p>
    <ul class="ev-links">
      <li><a href="#"><i class="fa-solid fa-suitcase-rolling" aria-hidden="true"></i> Gear checklist …</a></li>
    </ul>
  </div>
</aside>
```

### Class contract

| Class                 | Adds                                                                      | Defined at      |
| --------------------- | ------------------------------------------------------------------------- | --------------- |
| `.ev-aside`           | grid, `gap: 1.75rem`, sticky at `--topbar-h + 1rem`; static below `62rem` | `event.css:216` |
| `.ev-block-title`     | the mono uppercase label for a block                                      | `event.css:227` |
| `.ev-links`           | the link list: icon + label rows, accent icons, underline on hover        | `event.css:247` |
| `.aside-card--static` | the registration card's opt-out of its own stickiness                     | `base.css:1262` |

One invariant, and the bug it came from:

> The rail is `position: sticky`, which makes it a positioned ancestor. A card
> inside it that is un-positioned (`position: static`) hands its `.card::before`
> paper to the rail, and that one layer then covers all three blocks — the rail
> renders as a single long card. `sticky={false}` therefore resolves to
> `position: relative; top: auto`, not `position: static`.

### Layout

- **`gap: 1.75rem`** between blocks, wide enough to clear both torn edges.
- **The rail sticks; the cards inside it do not**, so the whole column travels
  as one.

### Tokens

`--topbar-h` `--ink-soft` `--ink-hint` `--accent-type` `--font-mono`
`--label-track`, plus whatever the two shared components read.

### Theme notes

Nothing theme-specific of its own.

### Behaviour

None of its own. (`src/scripts/htags.js` serves the trail card, which now
lives in the article column.)

### Accessibility

- The block labels are `p.ev-block-title`, not headings — they title UI blocks,
  not sections of the document.
- The WhatsApp link carries an external-link glyph as well as the brand icon.

### Open questions

- "Already registered?" shows for everyone. It should be state-dependent.
- Below `62rem` the rail drops under the entire article, which puts the
  register button a long scroll from the top. A sticky bottom bar is the usual
  answer.
- Five links is the most this block can hold before it wants grouping.

---

## RegistrationCard

Everything you need to decide and sign up, in one surface: the day, the price,
the facts, who is leading, who is going, how full it is, and the button.

One shape, two homes — the showcase's event section and the real event page's
rail render the **same component with the same parts in the same order**. Only
the content and the `sticky` flag differ. That is the point of the entry: it is
the one component in this repo proven against two different contexts.

### What it's for

- The **commit surface** for an event: the block that turns reading into
  registering.
- Every part below the price is optional, so a context with less to say drops
  parts rather than forking the component.

### Anatomy

```
┌─ aside.card.aside-card ──────────────────────────────────────────────┐
│ ┌─ .rc-head ───────────────────────────── flex, align-items center ─┐│
│ │  DateBlock          ← the day                                     ││
│ │ ┌─ .rc-price ─────────────────────────────────────────────────┐   ││
│ │ │  p.price-big     ₹900  <span class="mono">/ person</span>   │   ││
│ │ │  p.fine          Members pay ₹750                           │   ││
│ │ └─────────────────────────────────────────────────────────────┘   ││
│ └───────────────────────────────────────────────────────────────────┘│
│  dl.aside-rows      Start · End            label ⟷ value             │
│ ┌─ .rc-people ──────────────────── flex, wrap, gap 0.45rem 0.9rem ──┐│
│ │  p.ledby         Led by <name> <face>                             ││
│ │  span.face-stack AttendeeFaces + "3 going"                        ││
│ └───────────────────────────────────────────────────────────────────┘│
│  .meter + p.fine.meter-note        7 / 20 registered · 13 left       │
│  Btn variant="primary" block       Register →                        │
└──────────────────────────────────────────────────────────────────────┘
```

### Markup

Canonical instance, from `src/components/cards/RegistrationCard.astro`:

```html
<aside class="card aside-card">
  <div class="rc-head">
    <div class="dateblock" aria-label="Thu 13 Aug">
      <span class="db-mon">Aug</span>
      <span class="db-day">13</span>
      <span class="db-dow">Thu</span>
    </div>
    <div class="rc-price">
      <p class="price-big">
        ₹900
        <span class="mono">/ person</span>
      </p>
      <p class="fine">
        Members pay
        <strong>₹750</strong>
      </p>
    </div>
  </div>

  <dl class="aside-rows">
    <div class="aside-row">
      <dt>Start</dt>
      <dd>05:00 at the blue gate</dd>
    </div>
    <div class="aside-row">
      <dt>End</dt>
      <dd>~10:00, back in the city</dd>
    </div>
  </dl>

  <div class="rc-people">
    <p class="ledby">
      Led by Ava Sharma
      <span class="face">AS</span>
    </p>
    <span class="face-stack" aria-label="3 going">
      <span class="going">3 going</span>
      <span class="face-shadow"><span class="face">CD</span></span>
      <span class="face-shadow"><span class="face">EL</span></span>
      <span class="face-shadow"><span class="face">DO</span></span>
    </span>
  </div>

  <div class="meter" role="img" aria-label="7 of 20 spots taken">
    <div class="meter-fill" style="width:35%"></div>
  </div>
  <p class="fine meter-note">7 / 20 registered · 13 left</p>

  <button class="btn btn-primary btn-block">
    Register
    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
  </button>
</aside>
```

### Props

| Prop              | Shape                        | Notes                                                                |
| ----------------- | ---------------------------- | -------------------------------------------------------------------- |
| `date`            | `{ mon, day, dow, label? }`  | the DateBlock beside the price                                       |
| `price` / `unit`  | strings                      | `unit` renders mono, after a space                                   |
| `member`          | `{ price, label? }`          | structured; the component bolds the price. `label` defaults "Members pay" |
| `rows`            | `[label, value][]`           | the fact rows                                                        |
| `lead`            | `{ initials, name, role? }`  | name and role separate; `role` defaults "Led by"                     |
| `going`           | `{ count, more?, faces }`    |                                                                      |
| `meter`           | `{ taken, total, note }`     | percentage is derived                                                |
| `cta` / `ctaIcon` | strings                      |                                                                      |
| `fine`            | string                       | trailing fine print                                                  |
| `state`           | `"open" \| "full" \| "closed"` | default `open`; `full`/`closed` disable the CTA. An event still taking a waitlist is `open` with a waitlist `cta` |
| `sticky`          | boolean, default `true`      | `false` adds `.aside-card--static`                                   |

### Class contract

| Class                                               | Adds                                                                               | Defined at                |
| --------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------- |
| `.card`                                             | the paper and its torn edge                                                        | `base.css:423`            |
| `.aside-card`                                       | `position: sticky; top: 4.5rem`, and the `0.8rem` vertical rhythm between children | `base.css:1252` / `:1250` |
| `.aside-card--static`                               | `position: relative; top: auto` — see the invariant                                | `base.css:1262`           |
| `.rc-head`                                          | DateBlock + price row, flex, centred                                               | scoped, in the component  |
| `.rc-price`                                         | the price/member pair's own `0.2rem` rhythm                                        | scoped                    |
| `.rc-people`                                        | lead + going, wrapping flex with a real gap                                        | scoped                    |
| `.price-big` / `.price-big .mono`                   | the display-scale price and its mono unit                                          | `base.css:1271`           |
| `.aside-rows` / `.aside-row`                        | the fact list — `dl` with label left, value right                                  | `base.css:1283`           |
| `.ledby`                                            | the lead line, inline-flex, `--face-size: 1.35rem`                                 | `base.css:1717`           |
| `.face-stack` / `.face-shadow` / `.face` / `.going` | AttendeeFaces                                                                      | `base.css:1631`           |
| `.meter` / `.meter-fill` / `.meter-note`            | capacity                                                                           | `base.css:901`            |
| `.btn-block`                                        | the full-width CTA                                                                 | `base.css:1304`           |

Three invariants:

1. **`.aside-card--static` is `relative`, not `static`.** The card's paper is
   `.card::before` with `inset: 0`; un-positioning the card gives that layer to
   the nearest positioned ancestor, which in a sticky rail is the rail itself.
   One card's paper then covers every sibling.
2. **`.ledby` and `.face-stack` are both `inline-flex`.** Put them next to each
   other without a wrapper and they collide — hence `.rc-people`, which also
   lets them stack when the card is narrow.
3. **The lead is text-then-face.** `Led by <name>` then the disc, matching
   `pill-lead` on `EventCardProminent`. Unlike the pill, `.ledby`'s padding is
   symmetric, so flipping the order needs no CSS change.

### Layout

- **The head is a row**, so the day and the price read as one fact rather than
  two stacked ones.
- **The parts are optional and ordered.** Drop `rows` and the card still reads;
  the order (day → price → facts → people → capacity → action) is the order a
  decision gets made in.
- **The card's rhythm** is `.aside-card > * + *` at `0.8rem`, so a dropped part
  costs no spacing fix.

### Tokens

`--surface` `--surface-raise` `--line` `--line-soft` `--ink` `--ink-faint`
`--ink-hint` `--accent` `--accent-type` `--ok` `--font-display` `--font-mono`
`--card-radius` `--ctl-radius` `--cut` `--w-medium` `--w-strong`
`--label-track`

### Theme notes

Nothing theme-specific. The scoped styles are layout only — a flex row, a
rhythm, a gap — all painted from the contract, so every theme takes the card
unchanged.

### Behaviour

None.

### Accessibility

- `.meter` is `role="img"` with `aria-label="7 of 20 spots taken"`; the bar
  alone says nothing.
- `.dateblock` and `.face-stack` carry labels, since their spans read out of
  order otherwise.
- The capacity is stated as text (`7 / 20 registered · 13 left`) as well as
  drawn.
- The CTA is a `<button>` when it has no `href` and an `<a>` when it does, via
  `Btn`.

### Open questions

- Price and member price are both shown with no indication of which applies to
  the reader — the same open question `EventCard` has.

Resolved 2026-08-07: `memberNote` (an HTML string) became structured
`member: { price, label? }`; `lead` split into `{ initials, name, role? }` so
the phrase is translatable; and `state: "open" | "full" | "closed"` gives the
card a real closed rendering (disabled CTA) instead of an always-live button.

---

## TrailCardWide-TornEnds

The trail library's second density: **two per row instead of three**, name
under the cover rather than on it. The extra column width buys a fourth stat, an
unclamped blurb, and the three-way link rail out to the field — the things
`TrailCard` has to drop to fit three across.

`-TornEnds` names the edge: the rip runs along the **top and bottom**, sides
kept to the fine cut. It is kraft's default tear, so the variant carries no
class of its own — it is what `.photo-card` gets when nothing says otherwise.
The named counterpart is `TrailCardWide-TornSides` (`.torn-lr`), which
transposes the axis.

### What it's for

- The **trail library index** at reading density — someone comparing routes on
  numbers, not scanning photographs.
- Sits between `TrailCard` (three up, clamped, no link rail) and
  `TrailCardOverlay` (two up, name on the cover, body reduced to what the photo
  can't say). Same anatomy and same axis as `TrailCard` — cover on top, body
  under it. A theme that dresses `.photo-card` dresses this too, unchanged.

### Anatomy

```
┌─ article.card.photo-card.trail-card-wide ────────────────────┐
│ ┌─ .photo-wrap ────────────────────────────────────────────┐ │
│ │  img.photo                          4:3 cover            │ │
│ │  .photo-badge > .pill.pill-member    ← top-right, opt.   │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌─ .photo-body ────────────────────────── flex column ─────┐ │
│ │  .photo-toprow     grade pill  │  .rating                │ │
│ │  h3.title                                                │ │
│ │  p.iconline        the area                              │ │
│ │  p.fine            the blurb, unclamped                  │ │
│ │  dl.trail-stats    Length · Gain · Hike · Drive          │ │
│ │  .htags            HighlightTag row, one line deep       │ │
│ │  .trail-links      Trek start · Map · GPX  (margin-top:auto)│
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Markup

Canonical instance, from `src/components/cards/TrailCardWide.astro`:

```html
<article class="card photo-card trail-card-wide">
  <div class="photo-wrap" style="--photo:url('…')">
    <img class="photo" src="…" alt="The cave mouth on the Cavern Crimson loop" loading="lazy" />
  </div>
  <div class="photo-body">
    <div class="photo-toprow">
      <span class="pill">Moderate</span>
      <span class="rating">
        <i class="fa-solid fa-star" aria-hidden="true"></i>
        4.0
      </span>
    </div>
    <h3 class="title">Cavern Crimson Loop</h3>
    <p class="iconline">
      <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
      south-west of Bengaluru
    </p>
    <p class="fine">A lake, a hilltop and a cave strung into one loop — the long version …</p>
    <dl class="trail-stats mono">
      <div>
        <dt>Length</dt>
        <dd>3.9 km</dd>
      </div>
      <div>
        <dt>Gain</dt>
        <dd>+224 m</dd>
      </div>
      <div>
        <dt>Hike</dt>
        <dd>3 h 29</dd>
      </div>
      <div>
        <dt>Drive</dt>
        <dd>1 h 59</dd>
      </div>
    </dl>
    <div class="htags">
      <span class="htag">
        <i class="fa-solid fa-water" aria-hidden="true"></i>
        Lake
      </span>
      <span class="htag">
        <i class="fa-solid fa-mountain" aria-hidden="true"></i>
        Hilltop
      </span>
      <span class="htag">
        <i class="fa-solid fa-dungeon" aria-hidden="true"></i>
        Cave
      </span>
    </div>
    <div class="trail-links">
      <a class="trail-link" href="…">
        <i class="fa-solid fa-person-hiking" aria-hidden="true"></i>
        Trek start
      </a>
      <a class="trail-link" href="…">
        <i class="fa-solid fa-map" aria-hidden="true"></i>
        Map
      </a>
      <a class="trail-link" href="…" download>
        <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i>
        GPX
      </a>
    </div>
  </div>
</article>
```

The container is `div.trail-grid.trail-grid--wide`.

### Class contract

| Class                          | Adds                                                                                                  | Defined at      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- | --------------- |
| `.card`                        | the surface: background, border, radius                                                               | `base.css`      |
| `.photo-card`                  | `padding:0`, `overflow:clip`, flex column — a card whose first child is a photo bleeding to the edges | `base.css:1532` |
| `.trail-card-wide .photo-body` | the wide-density body: flex column, `1.1rem 1.25rem 1.35rem` padding, wrapping stats                  | `base.css:1987` |
| `.photo-wrap`                  | `position: relative` — positioning context for the badge                                              | `base.css:1736` |
| `.photo-toprow`                | grade on the left, rating on the right, one line                                                      | `base.css:1553` |
| `.trail-stats`                 | the four-cell `dl`, rules above and below; wraps rather than squeezes at this width                   | `base.css:997`  |
| `.htags` / `.htag`             | HighlightTag row — what the trail _has_                                                               | `base.css:1491` |
| `.trail-links` / `.trail-link` | the three-column link rail, dashed dividers                                                           | `base.css:2002` |

The variant's whole difference from `TrailCardOverlay` is which classes are
**absent**: no `.trail-card-overlay`, so `.photo-title` never enters the tree
and the name stays in the body where the theme's ink colour applies to it.
That is also why this variant, unlike the overlay, is fully theme-coloured —
there is no type over a photograph anywhere in it.

### Layout

- **Grid**: `.trail-grid--wide` is `repeat(auto-fit, minmax(26rem, 1fr))`, gap
  `2.5rem 1.25rem` — more air between rows than columns, or the tall cards read
  as one continuous block. Falls to one column under ~53rem.
- **Cover**: `4 / 3`, from `.trail-grid .photo-card .photo` — a trail photo is
  a place and wants the vertical.
- **Body**: flex column (not the grid `.photo-body` uses elsewhere) so
  `.trail-links` pins to the bottom with `margin-top: auto` however tall the
  blurb runs. Two cards in a row end their link rails on the same line.
- **Stats**: four cells here rather than `TrailCard`'s three; they wrap instead
  of squeezing, which is what the extra column width is spent on.
- **Link rail**: `.trail-links` reclaims the body's bottom padding with a
  negative margin and hands it back as padding (`--foot: 1.35rem`), so the
  dashed dividers run from the top rule to the card's bottom edge.

### Tokens

`--surface` `--surface-2` `--line` `--line-soft` `--ink` `--ink-soft`
`--ink-faint` `--ink-hint` `--accent-type` `--accent-tint` `--font-mono`
`--pill-radius` `--label-case` `--w-medium`

Plus `--photo` (the cover URL, on `.photo-wrap`) per instance, and `--foot`
(the body's bottom padding / the link rail's reach, declared on the card).

### Theme notes

- **Kraft** — this is the default cut. `#cut-1/2/3` alternate by `nth-child` so
  neighbouring cards don't repeat the same rip; the cover's top edge tears on
  the card's filter and its bottom edge on the finer `#cut-photo`, with the
  clean `<img>` clipped `inset(24px 3px 12px 3px)` so every ragged pixel is
  backing rather than photo. `.photo-card::before` is clipped `40px` off the
  top so no surface colour peeks out from behind the cover's rip. Tunable in
  the tear lab (`src/pages/tear-lab.astro`).
- Every other theme takes it unchanged.

### Behaviour

`src/scripts/htags.js` clamps `.htags` to one line, hiding the overflow into a `+N`
chip. Without it a trail with eight highlights would be taller than its
neighbour and the two-up row would lose its alignment.

### Accessibility

- `h3.title` assumes an `h2` section head above. Parameterise in the app.
- Cover `alt` describes the place (`"The cave mouth on the Cavern Crimson
loop"`). Decorative `<i>` glyphs are all `aria-hidden="true"`.
- `dl` / `dt` / `dd` for the stats — genuinely a definition list.
- `.rating` prints the number (`4.0`), not a row of star glyphs, so it survives
  a screen reader and a monochrome render alike.
- The GPX link is a `download`, which is worth saying in the label rather than
  leaving to the icon.

### Open questions

- Shared with `TrailCardOverlay`: the card isn't a link, the blurb is
  unclamped, and there's no empty state for a trail with no highlights or no
  GPX. (`--foot` duplicating the body's bottom padding was resolved
  2026-08-07: the card declares it once and both readers inherit it.)
- `Hike` and `Drive` are durations while `Length` and `Gain` are distances, all
  four in one undifferentiated `dl`. Worth splitting in the app.
- The grade pill (`Moderate`) reuses the neutral `.pill` here but `.pill-full`
  for `Hard` elsewhere in the demos — the mapping from grade to tone isn't
  fixed yet.

---

## TrailCardOverlay

The trail library's third density. The trail's **name rides on the cover**
instead of sitting under it, with the fixed facts — grade, direction, area —
as pills stacked above it. The body below keeps only what the photograph
cannot say: the numbers, what the trail has, and the three ways out to the
field.

Two per row at the wide density. It's the browsing card — the one that makes a
trail library feel like a set of places rather than a list of rows.

### What it's for

- The **trail library index**, where someone is scanning for a place, not
  reading specs. The photo is the primary content; the name belongs on it.
- Distinct from `TrailCard` (three per row, name under the cover, clamped
  blurb) and `TrailCardWide` (two per row, name under the cover, four stats +
  link rail). TrailCardOverlay is `TrailCardWide`'s anatomy with the title
  block moved onto the photo.

### Anatomy

```
┌─ article.card.photo-card.trail-card-wide.trail-card-overlay ─┐
│ ┌─ .photo-wrap ────────────────────────────────────────────┐ │
│ │  img.photo                          4:3 cover            │ │
│ │  .photo-badge > .rating.rating-on-photo    ← top-right   │ │
│ │  ┌─ .photo-title ──────────────────────── bottom, abs ─┐ │ │
│ │  │  ::before   the dark wash (own layer, z-index -1)   │ │ │
│ │  │  .photo-pills > .pill.pill-on-photo × n             │ │ │
│ │  │  h3.title                                           │ │ │
│ │  └─────────────────────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌─ .photo-body ────────────────────────── flex column ─────┐ │
│ │  p.fine            the blurb, unclamped                  │ │
│ │  dl.trail-stats    Length · Gain · Hike · Drive          │ │
│ │  .htags            HighlightTag row, one line deep       │ │
│ │  .trail-links      Trek start · Map · GPX  (margin-top:auto)│
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Markup

Canonical instance, from `src/components/cards/TrailCardOverlay.astro`:

```html
<article class="card photo-card trail-card-wide trail-card-overlay">
  <div class="photo-wrap" style="--photo:url('…')">
    <img class="photo" src="…" alt="Boulders and the plain from the panorama trail" loading="lazy" />
    <span class="photo-badge">
      <span class="rating rating-on-photo">
        <i class="fa-solid fa-star" aria-hidden="true"></i>
        4.0
      </span>
    </span>
    <div class="photo-title">
      <div class="photo-pills">
        <span class="pill pill-on-photo">Easy–mod</span>
        <span class="pill pill-on-photo">
          <i class="fa-solid fa-compass" aria-hidden="true"></i>
          South-west
        </span>
        <span class="pill pill-on-photo">
          <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
          Kanakapura
        </span>
      </div>
      <h3 class="title">Panorama Boulder Trail</h3>
    </div>
  </div>
  <div class="photo-body">
    <p class="fine">A short climb onto a boulder field that opens the whole plain up at once …</p>
    <dl class="trail-stats mono">
      <div>
        <dt>Length</dt>
        <dd>3.0 km</dd>
      </div>
      <div>
        <dt>Gain</dt>
        <dd>+215 m</dd>
      </div>
      <div>
        <dt>Hike</dt>
        <dd>2 h 55</dd>
      </div>
      <div>
        <dt>Drive</dt>
        <dd>1 h 48</dd>
      </div>
    </dl>
    <div class="htags">
      <span class="htag">
        <i class="fa-solid fa-mountain" aria-hidden="true"></i>
        Hilltop
      </span>
      <span class="htag">
        <i class="fa-solid fa-gopuram" aria-hidden="true"></i>
        Temple
      </span>
      <span class="htag">
        <i class="fa-solid fa-dungeon" aria-hidden="true"></i>
        Cave
      </span>
    </div>
    <div class="trail-links">
      <a class="trail-link" href="…">
        <i class="fa-solid fa-person-hiking" aria-hidden="true"></i>
        Trek start
      </a>
      <a class="trail-link" href="…">
        <i class="fa-solid fa-map" aria-hidden="true"></i>
        Map
      </a>
      <a class="trail-link" href="…" download>
        <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i>
        GPX
      </a>
    </div>
  </div>
</article>
```

The container is `div.trail-grid.trail-grid--wide`.

### Class contract

The class list is a stack, not a name — each class adds one thing, and the
component is the composition. That's what lets a theme dress `.photo-card`
once and get all three trail densities for free.

| Class                                              | Adds                                                                                                  | Defined at                |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------- |
| `.card`                                            | the surface: background, border, radius                                                               | `base.css`                |
| `.photo-card`                                      | `padding:0`, `overflow:clip`, flex column — a card whose first child is a photo bleeding to the edges | `base.css:1532`           |
| `.trail-card-wide .photo-body`                     | the wide-density body: flex column, `1.1rem 1.25rem 1.35rem` padding, wrapping stats                  | `base.css:1987`           |
| `.trail-card-overlay .photo-title`                 | moves the title onto the cover: `padding-top`, larger `.title`                                        | `base.css:1929`           |
| `.trail-card-wide.trail-card-overlay .photo-title` | the compound — cover is twice as wide, so the name takes a display size rather than a card size       | `base.css:1940`           |
| `.photo-wrap`                                      | `position: relative` — the positioning context for everything on the cover                            | `base.css:1736`           |
| `.photo-title`                                     | absolutely positioned bottom block, white type, `isolation: isolate`                                  | `base.css:1740`           |
| `.photo-title::before`                             | the dark wash, as its own layer at `z-index: -1`                                                      | `base.css:1751`           |
| `.photo-pills` / `.pill-on-photo`                  | the fixed-facts row; frosted white pills that survive any photograph                                  | `base.css:1948` / `:1957` |
| `.rating-on-photo`                                 | rating badge with its own dark backing, since it sits outside the wash                                | `base.css:1971`           |
| `.trail-stats`                                     | the four-cell `dl`, rules above and below                                                             | `base.css:997`            |
| `.htags` / `.htag`                                 | HighlightTag row — what the trail _has_                                                               | `base.css:1491`           |
| `.trail-links` / `.trail-link`                     | the three-column link rail, dashed dividers                                                           | `base.css:2002`           |

Two invariants worth carrying into the app:

1. **The wash is a separate layer from the type.** `.photo-title::before` at
   `z-index: -1` under `isolation: isolate`. Kraft tears the wash's edge with
   an SVG filter; the title text is a sibling and stays crisp. This is the
   app's `cover-wash` / `cover-scrim--torn` split.
2. **Nothing on the cover is theme-coloured.** `#fff`, `rgb(255 255 255 /
0.16)`, `rgb(10 10 10 / 0.55)` — literals, not tokens. A photograph has no
   colour scheme, so type over one is white in every theme.

### Layout

- **Grid**: `.trail-grid--wide` is `repeat(auto-fit, minmax(26rem, 1fr))`,
  gap `2.5rem 1.25rem` — more air between rows than columns, or the tall cards
  read as one continuous block. Falls to one column under ~53rem.
- **Cover**: `4 / 3`, set by `.trail-grid .photo-card .photo`. Taller than an
  event cover's 16:10, because a trail photo is a _place_ and wants the
  vertical.
- **Title block**: `padding: 4.5rem 1.4rem 1rem` at the wide+overlay compound.
  The 4.5rem top is the wash's runway — the gradient needs that height to fade
  out before it meets the photo.
- **Body**: flex column (not the grid `.photo-body` uses elsewhere) so
  `.trail-links` can pin to the bottom with `margin-top: auto` however tall the
  blurb runs. Two cards in a row therefore end their link rails on the same
  line.
- **Link rail**: `.trail-links` reclaims the body's bottom padding with a
  negative margin and hands it back to the links as padding (`--foot`), so the
  dashed dividers run from the top rule to the card's bottom edge.

### Tokens

Paints only from the contract — nothing in `base.css` knows themes exist.

`--surface` `--line` `--line-soft` `--ink` `--ink-soft` `--ink-faint`
`--ink-hint` `--accent-type` `--accent-tint` `--font-mono` `--pill-radius`
`--label-case` `--w-medium`

Plus the two per-instance inputs: `--photo` (the cover URL, on `.photo-wrap`)
and `--foot` (the body's bottom padding / the link rail's reach, declared on
the card).

### Theme notes

- **Kraft** — the cover's bottom edge and the wash's edge both tear
  (`url(#cut-photo)`); `.photo-title` takes extra `padding-bottom` to keep the
  white title clear of the rip. Every variable is tunable in the tear lab (`src/pages/tear-lab.astro`).
- Every other theme takes the component unchanged. Because the overlay layer
  is theme-neutral by construction, a new theme only has to get `.card` and
  the body tokens right.

### Behaviour

`src/scripts/htags.js` clamps `.htags` to exactly one line: tags that would wrap are
hidden and counted into a trailing `+N` chip. Measured rather than estimated,
and re-measured on resize, on font load, and on `data-theme` change. This is
what keeps a trail with eight highlights the same card height as one with two
— without it, the two-per-row grid loses its alignment.

No other JS. The card is not itself a link; `.trail-link` are the only
interactive elements.

### Accessibility

- `h3.title` — the heading level assumes the card sits under an `h2` section
  head. Parameterise this in the app.
- Cover `alt` describes the place, not the trail (`"Boulders and the plain
from the panorama trail"`). Every decorative `<i>` is `aria-hidden="true"`.
- `dl` / `dt` / `dd` for the stats — they are genuinely a definition list.
- Contrast on the cover comes from the wash, not the photograph. The gradient
  runs `rgb(10 10 10 / 0.8)` at the base to transparent at 70%, which holds
  white type over a bright sky. Worth re-checking if the wash is ever softened.
- The rating badge carries its own `rgb(10 10 10 / 0.55)` backing precisely
  because it sits at the top corner, outside the wash's reach.

### Open questions

- Should the whole card be a link to the trail page, with `.trail-link` as
  nested actions? Currently nothing navigates to the trail itself.
- The blurb is unclamped here (unlike `TrailCard`'s `.clamp-2`), so two cards
  in a row can differ in height. `margin-top: auto` on the link rail absorbs
  it, but a long blurb still stretches the row.
- No empty state: a trail with no highlights renders an empty `.htags` row,
  and one with no GPX renders a dead third column.

Resolved 2026-08-07: `--foot` is declared once on `.photo-card` (re-pointed by
`.trail-card-wide`), and `.photo-body`'s bottom padding and `.trail-links`'
reclaim both read it — one token, both readers in step.

---

## Notice

The boxed aside — a strip of the card's second surface with a punched hole in
it, for the sentence that must not read as body copy: the safety note, the
payment caveat, the thing that changes what you pack. The hole is what makes
it kraft's: the strip reads as a sheet filed onto the card, not a `<blockquote>`
with a background.

### What it's for

- The **inline aside** inside an article or a card — one or two sentences with
  a tone. Distinct from the app's page-level `NoticeBar` (a banner across the
  viewport); Notice belongs to the surface it interrupts.
- The one `variant` is `danger`. Everything else is the neutral strip.

### Anatomy

```
┌─ .notice ──────────────────────────────────────────────┐
│  ::before   the punched hole — filled with --surface,  │
│             the CONTAINER's paper, so it reads as a    │
│             hole through the strip                     │
│  <slot>     the copy; <strong> takes --ink             │
└────────────────────────────────────────────────────────┘
```

### Markup

Canonical instance, from `src/components/ui/Notice.astro`:

```html
<div class="notice">
  Rain shifts this plan: if the gullies are running we walk the ridge
  instead. <strong>Check the group the night before.</strong>
</div>

<div class="notice notice-danger notice-hole-tl">
  No network on the trail. <strong>Download the map before you leave.</strong>
</div>
```

### Class contract

| Class                    | Adds                                                                                              | Defined at             |
| ------------------------ | -------------------------------------------------------------------------------------------------- | ---------------------- |
| `.notice`                | the strip: `--surface-2`, no border, no radius, leading gutter for the hole                        | `base.css:1083`        |
| `.notice::before`        | the hole: a `--surface` disc with a solid (unblurred) inset shadow — a punched hole has a cut edge | `base.css:1097`        |
| `.notice-hole-top`       | the punch moved above the copy — a sheet on a spike, copy reclaims the full width                  | `base.css:1113`        |
| `.notice-hole-tl`        | the corner punch — level with the first line, tighter gutter                                       | `base.css:1128`        |
| `.notice strong`         | the sentence that matters, in `--ink` at `--w-medium`                                              | `base.css:1138`        |
| `.notice-danger`         | the one tonal variant: `--danger-tint` behind the same anatomy                                     | `base.css:1143`        |

One invariant:

1. **The hole is filled with the container's surface, not the notice's.**
   `::before` paints `--surface` — the card beneath — so the disc reads as a
   hole punched through the strip. A notice on a different backing (e.g.
   `--surface-2` itself) loses the illusion; the fill would need to follow the
   backing.

### Layout

- `padding: 0.8rem 1rem 0.8rem 2.4rem` — the leading gutter is the hole's.
  The two hole variants trade that gutter for top padding (`-top`) or tighten
  it (`-tl`).
- No radius and no border, deliberately: the strip is a different paper, not a
  smaller card.

### Tokens

`--surface` `--surface-2` `--ink` `--ink-soft` `--danger-tint` `--w-medium`

### Theme notes

None — the hole variants live in `base.css`, not the kraft theme, and no theme
overrides any of it. The cut-edge shadow is a literal (`rgb(0 0 0 / 0.3)`)
because a punched edge is shadow, not scheme.

### Behaviour

None.

### Accessibility

- The hole is `::before` with empty content — decoration, invisible to a
  screen reader.
- The `danger` state is tint only; the **copy** must carry the urgency
  ("Download the map _before you leave_"), since the tint won't survive a
  monochrome read.
- Consider `role="note"` in the app when the aside is genuinely an aside.

### Open questions

- `danger` is the only variant. Does the app want an `ok` (confirmation) tone,
  or is that a different component?
- The app's `NoticeBar` and this share a name and nothing else. Rename one
  (`Aside`? `NoticeInline`?) before both live in one codebase.

---

## HighlightTags

What a trail **has** — cave, lake, temple, quarry — as opposed to what it _is_
(easy, full, members'). A row of quiet mono chips, icon in the accent, that is
**always exactly one line deep**: tags that would wrap are hidden and counted
into a trailing `+N` chip.

### What it's for

- The highlight row on every trail card density (`TrailCard`,
  `TrailCardWide`, `TrailCardOverlay`) and anywhere else a thing's features
  are listed in a space that must not grow.
- Distinct from `Pill` (status: tonal, can be loud) — an `.htag` is quiet by
  weight and never carries state.

### Anatomy

```
┌─ .htags ──────────────────────────── flex, wrap, overflow hidden ─┐
│  .htag × n        icon (accent) + mono label                      │
│  .htag.htag-more  "+N" — appended by htags.js, counts the hidden  │
└───────────────────────────────────────────────────────────────────┘
```

### Markup

Canonical instance, from `src/components/ui/HighlightTags.astro` — the markup
lists **every** tag; the clamp is the script's job:

```html
<div class="htags">
  <span class="htag"><i class="fa-solid fa-water" aria-hidden="true"></i>Lake</span>
  <span class="htag"><i class="fa-solid fa-mountain" aria-hidden="true"></i>Hilltop</span>
  <span class="htag"><i class="fa-solid fa-dungeon" aria-hidden="true"></i>Cave</span>
</div>
```

### Class contract

| Class           | Adds                                                                                       | Defined at      |
| --------------- | ------------------------------------------------------------------------------------------ | --------------- |
| `.htags`        | the row: flex, `wrap`, `gap: 0.35rem`, `overflow: hidden` — the no-JS fallback (see below) | `base.css:2037` |
| `.htag`         | the chip: mono at 0.8rem, `--ink-faint`, `--line` border, `--pill-radius`, `nowrap`        | `base.css:2044` |
| `.htag i`       | the icon, in `--accent-type`                                                               | `base.css:2058` |
| `.htag-more`    | the overflow count — same shell, no icon, accent tint so it reads as a control             | `base.css:2065` |
| `.htag[hidden]` | `display: none` — stated because `[hidden]` alone loses to `.htag`'s `display`             | `base.css:2072` |

Two invariants:

1. **The markup is complete; the clamp is behaviour.** Every tag is in the
   DOM. `htags.js` hides from the first wrapping tag on, then keeps giving
   ground until the `+N` chip itself fits on the measured line. No JS →
   `.htags` simply wraps — degraded but correct, which is what lets this pass
   the app's progressive-enhancement bar. (The app currently hard-caps at
   `slice(0, 4)` instead; the port replaces the cap with the measure.)
2. **Measured, not estimated — and re-measured.** On resize (rAF-throttled),
   on `document.fonts.ready`, and on `data-theme` change, because a theme swap
   changes the font and therefore the line. In the app the theme observer can
   go; the font and resize triggers stay.

### Layout

- One line deep by contract. This is what keeps a trail with eight highlights
  the same card height as one with two, and the two-up grid level.
- `overflow: hidden` on the row means even the no-JS wrapped state never
  bleeds outside a clipped card.

### Tokens

`--font-mono` `--ink-faint` `--line` `--pill-radius` `--accent-type`
`--accent-tint`

### Theme notes

None — no theme touches `.htag`. The chip is quiet in every theme by
construction.

### Behaviour

`src/scripts/htags.js` (~70 lines, no dependencies). Remove-and-refit is
idempotent: each pass removes the old `+N` chip, unhides everything, measures
`offsetTop`s, and re-cuts. In the app this becomes a small effect/hook on the
row component rather than a page-level script.

### Accessibility

- Icons are `aria-hidden`; the label is the text.
- Hidden tags are `hidden` — removed from the accessibility tree, so a screen
  reader hears the same clamped list a sighted user sees, plus "+N". If the
  full list matters, the card should link somewhere that states it.
- `+N` is not interactive. If it ever becomes a "show all" control it must be
  a `<button>`.

### Open questions

- Should `+N` expand in place on tap (it currently just counts), and if so,
  what does that do to the level-row guarantee?
- The app stores highlight icons by name (`h.icon`); the mapping from
  highlight kind → icon lives in data, not the component. Keep it that way.

---

## VehicleCard

One car in the carpool manifest: who is driving what, where from, when it
leaves, and the seats — a row of discs where **an occupied seat IS its
occupant**. The seat row is the card's centre: capacity drawn as things you
can sit on, each filled one carrying its rider's initials, so the row does the
work a separate face stack used to duplicate.

### What it's for

- The **transport plan**: the manifest of cars for an event, one card per
  vehicle, inside a `.manifest` list on the carpool surface.
- In the app this is the DS shape for what `event-plan.tsx` and
  `event-my-ride.tsx` build — the app's version keeps its per-pickup roster
  list below the shell (see open questions).

### Anatomy

```
┌─ .vehicle ─────────────────────────────────────────────────┐
│ ┌─ .vehicle-head ──────────── flex, space-between ───────┐ │
│ │  strong   car icon + driver · vehicle-label   (left)   │ │
│ │  span.mono  from · N seats                    (right)  │ │
│ └────────────────────────────────────────────────────────┘ │
│  p.vehicle-route.mono   leaves 03:10 · ETA 05:05 · route ↗ │
│  .seats     SeatRow — Ⓡ Ⓡ Ⓢ ◌ ◌      role="img"           │
│  p.vehicle-riders       names + pickup points, as text     │
└────────────────────────────────────────────────────────────┘
```

### Markup

Canonical instance, from `src/components/cards/VehicleCard.astro` (SeatRow
expanded):

```html
<div class="vehicle">
  <div class="vehicle-head">
    <strong>
      <i class="fa-solid fa-car-side" aria-hidden="true"></i>
      Rahul<span class="vehicle-label"> · Jimny</span>
    </strong>
    <span class="mono">Cooke Town · 5 seats</span>
  </div>
  <p class="vehicle-route mono">
    <span>leaves 03:10</span>
    <span>ETA 05:05</span>
    <a href="…">route <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
  </p>
  <div class="seats" role="img" aria-label="driver plus 2 of 4 rider seats filled">
    <span class="seat seat-driver">R</span>
    <span class="seat">RA</span>
    <span class="seat">SR</span>
    <span class="seat seat-free"></span>
    <span class="seat seat-free"></span>
  </div>
  <p class="vehicle-riders">Rahul · Radhika (New Tipassandra) · Srilekha (Koramangala)</p>
</div>
```

The container is `.manifest` (`> * + *` at `0.9rem`). The logistics line is
optional **as a unit** — a manifest drawn before times are set renders
without it rather than printing TBDs.

### Props

| Prop                           | Shape           | Notes                                                                   |
| ------------------------------ | --------------- | ----------------------------------------------------------------------- |
| `driver`                       | string          | the person; its first letter seeds the driver seat                      |
| `vehicle`                      | string?         | the machine — "Jimny", "white Swift" — one step quieter than its driver |
| `from` / `seats`               | string / number | the head's right side                                                   |
| `filled`                       | number          | occupants, **driver included**; the card hands SeatRow `filled - 1`     |
| `faces`                        | string[]?       | rider initials, in seat order                                           |
| `riders`                       | string          | the text line — names and pickup points, what circles can't say         |
| `departs` / `eta` / `routeUrl` | strings?        | the logistics line; any subset renders clean                            |

### Class contract

| Class              | Adds                                                                                                     | Defined at      |
| ------------------ | -------------------------------------------------------------------------------------------------------- | --------------- |
| `.manifest`        | the list rhythm between cards                                                                            | `base.css:1962` |
| `.vehicle`         | the shell: `--surface-2`, `--line-soft` border, `--ctl-radius` — a control-scale card, not a `.card` (no paper, no tear) | `base.css:1966` |
| `.vehicle-head`    | driver left, origin/seats right, baseline-aligned                                                        | `base.css:1973` |
| `.vehicle-label`   | the machine, `--ink-faint` at weight 400 — riders scan for the person first                              | `base.css:1986` |
| `.vehicle-route`   | the logistics line; dot separators drawn by `> * + *::before`, so any subset of its parts reads clean    | `base.css:1993` |
| `.vehicle-head i`  | the car icon                                                                                             | `base.css:2200` |
| `.seats`           | the seat row, flex, `gap: 0.3rem`                                                                        | `base.css:2010` |
| `.seat`            | an occupied seat: a disc, the same shape a person is drawn as everywhere else (`.face`) — `--ink-faint` ground, initials in `--surface` | `base.css:2020` |
| `.seat-free`       | an empty seat: transparent, `1.5px` **dotted** `--ink-hint` — an absence with a shape                    | `base.css:2037` |
| `.seat-driver`     | the driver's seat: `--ok` with the initial — a car with a driver is a car that goes                      | `base.css:2046` |
| `.seat-over`       | a rider past capacity: `--danger`, still carrying its initials. Drawn, not clamped                       | `base.css:2053` |
| `.vehicle-riders`  | the text line's size and colour at this scale                                                            | `base.css:2058` |

Three invariants:

1. **A vehicle is not a `.card`.** It sits _on_ a card (the manifest), so it
   takes the control radius and the second surface — no paper layer, no torn
   edge. Kraft has nothing to say about it, which is why it survives every
   theme untouched.
2. **One seat, one circle, occupied or not.** The seats absorbed the
   AttendeeFaces stack the card used to draw under them — a filled seat is a
   face disc with initials, so the same person is never drawn twice. The
   `.vehicle-riders` line below keeps only what circles can't say: names and
   pickup points.
3. **Free seats are outlined, not faded.** Dotted, transparent — so
   filled/free survives monochrome without leaning on the accent, and
   over-capacity (`--danger`) stays the only tonal alarm in the row.

### Layout

- The head is one line, baseline-aligned, `space-between` — driver and
  logistics never interleave.
- Each row takes its own small top margin; the card has no internal rhythm
  rule because its rows are fixed.

### Tokens

`--surface` `--surface-2` `--line-soft` `--ctl-radius` `--ok` `--danger`
`--ink-hint` `--ink-faint` `--accent-type` `--w-medium` `--font-mono`

### Theme notes

None — every theme takes it unchanged.

### Behaviour

None.

### Accessibility

- `.seats` is `role="img"` with the full sentence (`"driver plus 2 of 4 rider
seats filled, 1 over capacity"`) — the discs and their initials are drawn
  for sighted scanning; the label carries the fact.
- The rider names are real text in `.vehicle-riders`; the initials in the
  seats are decoration.
- The card is not interactive apart from the route link. If the app makes it
  a link to "my ride", the whole card wants to be the target, not the
  driver's name.

### Open questions

- The app's per-pickup roster (each stop with its time and who boards there)
  stays app-side below this shell — a list that long is a different
  component, not more rows on this card.
- No empty state for a manifest with zero vehicles; the surface above needs
  one ("No carpools planned yet" already exists in the app).

Resolved 2026-08-07, in three steps: SeatRow adopted the app SeatMeter's
driver-seat + over-capacity treatment; the seats then absorbed the face stack
(one seat, one circle, initials in the disc); and the head split `driver`
from `vehicle` while `departs`/`eta`/`routeUrl` gave the logistics a home as
an optional one-line unit.

---

## TornPaper

Not a component — the **mechanism** every torn edge on this site runs on, and
a different animal from the app's current tear. The app cuts every edge with
one fine isotropic filter; this repo adds a second, **anisotropic** pass, so a
card's sides keep the fine 3px cut while its top and bottom rip ±18–21px —
paper torn by hands, not trimmed by pinking shears. It lives in
`src/styles/torn-paper.css` (geometry) + `PaperFilters.astro` (the SVG defs),
scoped so themes opt in; porting it to the app means replacing the filter defs
in `paper.tsx` and the tear geometry in `theme.css` §2.

### What it's for

- Every torn edge: cards, covers, the hero, the stats strip, the notice, the
  viewport-wide cover wash. One definition set per page, so a card torn on
  one surface tears the same way on another.
- Worn by the Kraft and Milestone families; any theme opts in by joining the
  `:is()` scope and pointing `--cut` at a filter. Everything else keeps
  straight edges and is correct as-is.

### Anatomy — the two-pass filter

```
#cut-1/2/3 (a card's edge):
  pass 1  feTurbulence (isotropic, bf 0.04) → displace scale 3
          — the app's fine cut, on all four edges
  pass 2  feTurbulence fractalNoise, bf 0.015 × 0.002  ← varies only along x
          feComponentTransfer neutralises the R channel to 0.5
          → displace scale 36–48, so it moves pixels ONLY vertically
          — the rip, on the top and bottom edges alone
```

The second pass's noise is stretched flat (x-frequency ≫ y-frequency) and one
displacement channel is pinned to neutral, which is what makes the rip
directional. `#cut-lr` is the same recipe turned on its side (bf 0.002 × 0.015,
G channel pinned): sides rip, top and bottom stay fine.

### The filter roster (`PaperFilters.astro`)

| Filter                         | Job                                                                  | Amplitude    |
| ------------------------------ | -------------------------------------------------------------------- | ------------ |
| `#cut-1` / `#cut-2` / `#cut-3` | a card's edge; three seeds so neighbours never repeat                | ±18–21px t/b |
| `#cut-hero`                    | the hero band — bigger teeth for a bigger sheet                      | ±24px t/b    |
| `#cut-tb`                      | pure vertical rip, no fine pass (the edge exhibit)                   | ±20px t/b    |
| `#cut-photo` / `#cut-photo-tb` | a photograph's own edge — finer teeth so it doesn't repeat the card's | ±5px         |
| `#cut-lr` / `#cut-lr-2`        | the transposed card cut (`.torn-lr`)                                 | ±19px l/r    |
| `#cut-photo-lr`                | the transposed photo cut; also the notice's single fraying edge      | ±5px         |
| `#cut-photo-wide`              | the viewport-wide cover wash — longer wavelength, or the tear reads as a repeating comb at that width | ±6px |

### Class contract (`torn-paper.css`)

| Rule                              | Adds                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| `.card:nth-child(3n+2)` / `(3n)`  | rotates `--cut` through `#cut-2`/`#cut-3` so neighbouring tears never repeat               |
| `.photo-card`, `.feat-card`       | `overflow: visible` — the corner-rounding clip would shear the fringe flat                 |
| `.photo-card::before`             | the surface layer clipped `inset(40px -80px -80px -80px)`: the torn top belongs to the image backing ALONE, and negative insets keep the outward fray unsheared (clip-path clips AFTER the filter) |
| `.feat-card::before`              | the same cut-away as a `polygon()` over the photo's flank only; plain inset once stacked   |
| `.photo-wrap::before` / `::after` | the torn-photo split: two backing halves repainting the SAME image — top half through the card's `--cut`, bottom half through `#cut-photo` — with the straight seam hidden under the clean img |
| `.photo` (clean img)              | no filter, ever; clipped `inset(24px 3px 12px 3px)` so every ragged pixel is backing       |
| `.photo-badge` / `.photo-dateblock` | both corners drop to `1.8rem` to clear the top rip — they move as a pair                 |
| `.photo-title::before`            | the wash tears on `#cut-photo`; the title is a sibling layer and stays crisp               |
| `.stats::before`                  | the stats strip as ONE torn sheet (fill moved to a filtered layer), not four floating cells |
| `.notice` / `.notice::after`      | a strip torn off a larger sheet: fill on its own filtered layer, `clip-path: inset(0 -30px 0 0)` frees exactly ONE edge to fray; text and the punched hole stay crisp |
| `.torn-lr` family                 | the transposed tear, plus the furniture moving back (badges to `0.9rem`, title clearing the smaller cut) |
| `.feat-card.torn-lr .photo-wrap`  | the internal-seam nuance: same filter both sides, but the right (a join, not a boundary) lets out 6px of fray instead of 30 — teeth, not a rip |
| `.card.carpool-form`, `.bigcard--flat` | the opt-outs: `--cut: opacity(1)` — a control surface is not a sheet, and a ragged edge on something you type into reads as damage |

### Per-component variation

Every component wears the mechanism a little differently — the tear is one
system, but which edges rip, which layer carries them, and what moves out of
their way is decided per component:

| Component | Its tear |
| --- | --- |
| **Plain `.card`** (EventArticle, RegistrationCard, EventRail's blocks) | the whole sheet on `--cut` (#cut-1/2/3 by grid position): top and bottom rip, sides fine. Nothing else to coordinate — one layer, one filter. |
| **EventCard / TrailCardWide / TrailCardOverlay** (`.photo-card`) | the torn **top belongs to the image backing alone** — the surface layer is clipped 40px out of the top so no paper peeks from behind the photo. Cover = the backing split (top half on the card's cut, bottom half on the finer `#cut-photo`); clean img clipped `24/3/12/3`. The DateBlock and badge both drop to `1.8rem` to clear the rip — they move as a pair. The title wash tears on `#cut-photo`; the title pads `1.5rem` clear of the bottom rip. |
| **EventCardProminent** (`.feat-card`) | same as `.photo-card`, but the surface cut-away is a `polygon()` over the photo's flank only (the photo spans just the left column once the grid splits); stacked below `46rem` it falls back to the plain inset. |
| **EventCardProminent-TornSides** (`.feat-card.torn-lr`) | the transpose, plus the internal-seam nuance: left edge (outer boundary) frays 30px, right edge (a join against the body) lets out only 6px of the same filter — teeth, not a rip. Both backing halves clip to the surface's 6px so the top starts on one line. |
| **EventCover** (`.ev-cover`) | backing on `#cut-photo`, clean photo clipped `16px` at the bottom only, and the **wash** tears on `#cut-photo-wide` — the viewport-wide layer needs the longer wavelength or the tear reads as a comb. |
| **TrailStats strip** (`.stats`) | one torn sheet, not four floating cells: the fill moves to a single filtered `::before` on `#cut-2`; the cells go transparent with hairline dividers. |
| **Notice** | a strip torn off a larger sheet: fill on its own filtered layer through `#cut-photo-lr` (the fine ±5px side cut — the card rip would swallow a strip this short), `clip-path: inset(0 -30px 0 0)` freeing exactly ONE edge to fray. Text and the punched hole stay crisp above it. |
| **Torn-lr cards** (`.torn-lr`) | the rip transposed to the sides; the badge and DateBlock come back to `0.9rem` (no top rip to clear) and the title clears the smaller bottom cut. |
| **VehicleCard / the carpool form** | **no tear** — `--cut: opacity(1)`. A control surface is not a sheet; a ragged edge on something you type into (or a manifest you read) reads as damage, and the rip would compete with the field borders. |
| **BigCard exhibits** | `--flat` opts out entirely; `--torn-tb` runs the pure-vertical `#cut-tb` with no fine pass — the reference specimens for the lab. |

### Invariants

1. **A photograph is never filtered.** The clean `<img>` is clipped slightly
   smaller and the same image is repainted behind it through the filters —
   all raggedness is backing-fringe pixels. This is what keeps a torn photo
   from looking like a warped one. (The app already holds this invariant; it
   keeps it.)
2. **`--cut` is the single lever.** Cards, backings, washes and strips all
   read it (or a named filter), so a theme re-points one variable — and an
   opt-out is `--cut: opacity(1)`, never a restated geometry.
3. **Clip after filter.** Every clip that shapes a filtered layer uses
   negative insets on the sides that must stay ragged, because `clip-path`
   applies after `filter` and a 0 inset shears the fray straight.
4. **Different sheets, different teeth.** Card ±19, hero ±24, photo ±5,
   viewport wash long-wavelength ±6. Two adjacent edges never run the same
   amplitude, which is what sells the collage.

### Tokens

Geometry only — `--cut` (the filter), `--notice-paper` (the notice strip's
fill), everything else painted by the layers it filters. No colours of its
own.

### Theme notes

Loaded **after** every theme file, so a theme cannot out-order the shared
geometry. A theme joins by adding itself to the `:is()` scope; it tunes by
setting the tokens, never by restating rules.

### Behaviour

None at runtime. `src/pages/tear-lab.astro` is the tuning bench — every
filter variable behind the tear is adjustable there before it gets frozen
into `PaperFilters.astro`.

### Accessibility

- Pure decoration: filters apply to backgrounds and backings, never to text
  or interactive elements; the SVG defs are `aria-hidden` and zero-sized.
- The torn-photo split keeps the actual photograph crisp, so nothing a
  screen-magnifier user reads is displaced.

### Open questions

- The app's port order: filters first (`paper.tsx` defs), then card geometry
  (`theme.css` §2), then the photo-backing split on its card covers — each
  step renders correctly on its own.
- The app rounds card corners (`--ds-radius-card: 0.875rem`); this mechanism
  assumes square sheets (kraft's `--card-radius: 0`). Adopting the big rip
  without deciding the radius question leaves rounded corners on a hand-torn
  edge — the exact noise KRAFT.md calls out.
- `filter` on large layers costs paint time; the app should confirm the
  two-pass filters hold 60fps on its longest pages (the design repo's pages
  are short).

---

## PillLead

The one pill that carries a person: a label ("Led by Ava Sharma") with that
person's face sitting in the pill's trailing cap, edge to edge — the disc IS
the pill's right end. One pill rather than a pill beside a disc, because two
elements read as two separate credits for the same person.

### What it's for

- Naming the lead wherever an event states one: `EventCardProminent`'s pill
  cluster and `RegistrationCard`'s people row render the same chip, so the
  same fact is stated in the same shape everywhere.

### Markup

Canonical instance, from `src/components/ui/PillLead.astro` (a `Pill` with
`.pill-lead` and the face nested):

```html
<span class="pill pill-member pill-lead">
  Led by Ava Sharma<span class="face-shadow"><span class="face">AS</span></span>
</span>
```

No whitespace between the label and the face: the gap is `.pill-lead`'s own,
and a text node would add a second one the disc cannot close.

### Class contract

| Class          | Adds                                                                                              | Defined at     |
| -------------- | -------------------------------------------------------------------------------------------------- | -------------- |
| `.pill-lead`   | the shape: `--face-size` pinned to the chip height, padding on the leading side only, no border, and `border-radius: 999px` regardless of `--pill-radius` — this pill ends in a circle whatever the theme thinks of corners | `base.css` |
| `.pill-lead` (type) | **sans, not mono, and no label case** (2026-08-07): every other pill is a label — HIKE, ₹600 — but a name is not a label; uppercasing overrides how someone spells themselves and mono types it like data | `base.css` |
| `.pill-lead .face-shadow` | the disc's lift turned OFF — the pill is already the surface it would lift from        | `base.css` |

### Invariants

1. **Text-then-face.** `Led by <name>` then the disc, with the asymmetric
   padding making the disc flush to the trailing edge. Flipping the order
   means flipping the padding.
2. **Name and role are separate inputs** in any implementation ("Led by" is a
   phrase a locale owns; the name is not) — the app's port takes
   `{ name, role?, face? }` with `role` defaulting to "Led by".

### Accessibility

- The chip reads "Led by Ava Sharma" in full — the initials in the disc are
  decoration, not the name.

### Open questions

- None open. (Sans-not-mono and the name/role split were both decided
  2026-08-07.)

## PageHeader

What every app page opens with when it has no photographic cover: a mono
breadcrumb line, an optional eyebrow, the display title, one line of fine
print, and room for an action or two on the same baseline. The first component
ported FROM blrhikes-app into the canon (2026-08-08) rather than the other way.

### What it's for

- Listing and utility pages — `/events`, `/trails`, admin surfaces. A page
  that opens on a photograph uses EventCover instead; the two never stack.
- The crumbs speak in the data voice (mono, uppercase); the title in the
  display voice; the sub in fine print. No background and no rule underneath:
  it is a heading, not a bar, and the ground already separates it.

### Parts

- `.page-head` — flex row, baseline-aligned, wraps on narrow screens.
- `.crumbs` / `.crumb` / `.crumbs-sep` — links for the ancestors, plain text
  with `aria-current="page"` for the leaf.
- `.page-head-actions` — the right-hand cluster; small buttons (`btn-sm`).

### Open questions

- None yet.

## CtaPanel

The inverted sell: one dark panel, a claim in the display voice, a line of
copy, a single action. Ported FROM blrhikes-app (2026-08-08), where it closes
the home page on membership.

### What it's for

- Exactly one per page, near the foot — the moment the page stops informing
  and asks for something. Two of these on one screen is a bazaar.

### How it inverts

One custom property is the whole trick: the panel re-points `--surface` at
`--ink`, so the torn edge, border and shadow are the ordinary card's — a card
whose paper happens to be ink. Type over it paints from the ground pair and an
opacity step; no new tokens, and every theme inverts correctly for free.

### Open questions

- None yet.

## StatBand

The claims, as numbers: a row of big display numerals with quiet labels under
them. Componentised out of the showcase's Trails section (2026-08-08) because
the app's home page carries the same band.

### What it's for

- Three or four `[number, label]` pairs, one row. The sentence around them
  belongs to the page; the band carries no prose of its own.

### Open questions

- None yet.

## TravelForm

The rider's half of the travel section: three mode cards (radio group), the
start/pickup pair, the vehicle + seats row, notes, one save button. Extracted
from the Travel section as a component (2026-08-08) so blrhikes-app can wrap
it around its real progressively-enhanced form — in the app every control is
inside a real `<form method="post">` and works with JavaScript off.

### Parts

- `.carpool-form` on a `.card` — the form IS a card.
- `.mode-row` / `.mode-card` — the radio cards; checked state paints from the
  accent pair.
- `Field` rows; `.field-row` for the two-up pair; `.check` for the checkbox.

### Open questions

- None yet.
