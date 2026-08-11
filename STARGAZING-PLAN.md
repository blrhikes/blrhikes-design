# Stargazing — plan

A proposed eighteenth theme: **dark**, keyboard shortcut `,`, id `stargazing`,
declared in `src/styles/themes/stargazing.css`.

Nothing here is built yet. This file is the plan; delete it once the theme
lands, or grow it into `STARGAZING.md` alongside `KRAFT.md` and
`KRAFT-GOLD.md`.

## The idea

A clear night sky away from the city. Near-black indigo ground; a Milky Way
haze of violet and blue glows; a real field of stars tiled across the page;
starlight gold as the single accent, carrying both the fills and the accent
type; cool pale-blue hairlines so the structure reads as night rather than as
warm lamplight.

It sits next to **Solstice Night** deliberately and differs from it on the two
axes that matter: Solstice Night is purple-and-pink with amber type, lit from
two soft glows; Stargazing is blue-black with one gold accent, and its texture
is literal — points of light, not a wash.

**Typography is Kraft's, unchanged** — Fraunces over DM Sans, weights capped at
500 — like themes 6–7, 12–13 and 16–17, so switching to it reads as a change of
colour rather than a change of voice.

**No torn edge.** `--cut: opacity(1)`, and the theme is *not* added to the
`:is()` scope in `torn-paper.css` — same choice Solstice Night makes.

## The ground, and the borrowed noise

`--ground-img` is four layers, painted in this order (topmost first, as CSS
lists them):

1. **The star field** — new to this theme. A tiled `data:image/svg+xml` of
   roughly two dozen white circles at varying radius (0.6–1.6) and opacity
   (0.25–0.9) scattered over a 300×300 box. The SVG carries intrinsic
   `width`/`height`, so it tiles at 300px with no `background-size` rule
   needed — which matters, because `--ground-img` is a single token and any
   sizing would have to be restated for every layer.
2. **Milky Way haze, top right** — `radial-gradient(circle at 75% 10%,
   rgb(124 140 255 / 0.14), transparent 70%)`.
3. **Cold glow, bottom left** — `radial-gradient(circle at 15% 85%,
   rgb(60 110 190 / 0.16), transparent 55%)`.
4. **The grain** — the *same* `feTurbulence` fractal-noise data-URI Solstice
   Night uses, verbatim: `baseFrequency='0.4' numOctaves='3'
   stitchTiles='stitch'`, `opacity='0.08'`, 100×100. Copied rather than
   factored out, because each theme file is meant to be readable on its own and
   the two may drift (this one may want a lower opacity under the stars — if it
   does, that is a one-value edit, not a shared-abstraction problem).

And, as in `solstice-night.css`, one scoped rule pins it:

```css
[data-theme="stargazing"] body {
  background-attachment: fixed;
}
```

so the sky holds still while the page scrolls past it.

## The tokens

Every slot in the contract at the top of `base.css`, set in one block.

| Slot | Value | Note |
| --- | --- | --- |
| `color-scheme` | `dark` | |
| `--ground` | `#070b18` | midnight, barely blue of black |
| `--surface` | `rgb(60 78 138 / 0.18)` | translucent, so the stars show through the cards |
| `--surface-2` | `rgb(60 78 138 / 0.3)` | |
| `--surface-raise` | `#111a30` | opaque — popovers and dropdowns must not show sky |
| `--ink` | `#eef2fb` | |
| `--ink-soft` | `#c9d2e8` | |
| `--ink-faint` | `#97a3c2` | 7.4:1 on the ground |
| `--ink-hint` | `#6b7799` | 4.2:1 — the faintest rung, matching Solstice Night's |
| `--accent` | `#ffd166` | starlight gold, the fill |
| `--on-accent` | `#1a1405` | ~12.9:1 on the gold |
| `--accent-type` | `#ffd166` | the same gold as type: ~13.1:1 on the ground, well past the 4.5:1 the contract demands |
| `--accent-tint` | `rgb(255 209 102 / 0.13)` | |
| `--ok` | `#8fd3a8` | |
| `--ok-tint` | `rgb(143 211 168 / 0.14)` | |
| `--danger` | `#f2707a` | |
| `--danger-tint` | `rgb(242 112 122 / 0.15)` | |
| `--line` | `rgb(169 200 255 / 0.16)` | pale-blue hairlines, not gold — the one place this theme parts from Solstice Night's habit of bordering everything in the accent |
| `--line-soft` | `rgb(169 200 255 / 0.08)` | |
| `--card-radius` | `1rem` | |
| `--ctl-radius` | `0.5rem` | |
| `--pill-radius` | `999px` | |
| `--card-border` | `1px solid rgb(169 200 255 / 0.14)` | |
| `--card-shadow` | `0 18px 44px -20px rgb(0 0 0 / 0.7)` | the theme lifts, so it stays out of the flat list in `shadow-toggle.css` |
| `--pop-shadow` | `0 0 22px rgb(124 140 255 / 0.3)` | a cold glow |
| `--cut` | `opacity(1)` | no tear |
| type | Fraunces / DM Sans / IBM Plex Mono, `--display-weight: 500`, `--w-medium: 500`, `--w-strong: 500`, `--label-case: uppercase`, `--label-track: 0.08em`, `--display-case: none`, `--display-track: 0` | Kraft's, verbatim |

## Flourishes

Four scoped rules, mirroring the shape of `solstice-night.css`:

```css
/* The sun in the ridges becomes the moon: pale, high, haloed. */
[data-theme="stargazing"] .ridges .sun {
  fill: #e8eeff;
  filter: drop-shadow(0 0 18px rgb(232 238 255 / 0.55));
}

/* The numerals read as the brightest things on the page. */
[data-theme="stargazing"] .stat-n {
  text-shadow: 0 0 14px rgb(255 209 102 / 0.35);
}

/* Indigo climbing to gold — night into starlight. */
[data-theme="stargazing"] .meter-fill {
  background: linear-gradient(90deg, #3c4e8a, #ffd166);
}
```

(The `body` pin above is the fourth.)

These `drop-shadow` glows are light sources, not lift, so the shadow override
leaves them alone — the rule `shadow-toggle.css` already states for the dark
themes.

## Files touched

1. **new** `src/styles/themes/stargazing.css` — the block above, with the
   header comment every theme file carries.
2. `src/layouts/BaseLayout.astro` — one `import` after the other dark themes,
   and `seventeen` → `eighteen` in the file's opening comment.
3. `src/data/themes.js` — one row appended:

   ```js
   {
     id: "stargazing",
     label: "Stargazing",
     key: ",",
     dots: ["#070b18", "#1b2340", "#ffd166", "#a9c8ff"],
   },
   ```

   `,` because the number row and `-` `=` `[` `]` `\` `;` `'` are all taken; it
   is unshifted (the roster's convention), and collides with neither `s` nor
   Shift+D.
4. `README.md` — `seventeen` → `eighteen`, `,` added to the shortcut list, and
   a row in the theme table:

   > `,` | **Stargazing** | dark | A clear night away from the city: indigo-black under a tiled star field and a Milky Way haze, starlight gold as the one accent, cool pale-blue hairlines, Kraft's type

   plus `,` folded into the sentence listing which themes keep Kraft's
   typography.
5. `src/scripts/theme.js` — the stale count in the comment at line 42
   (`seventeen presses of Back`).
6. `src/styles/shadow-toggle.css` — the stale count at line 20 (`Eleven of the
   seventeen already lift` → `Twelve of the eighteen`). The `:is()` list of flat
   themes is **unchanged**: Stargazing casts a shadow of its own.

## Not touched

The React clone. Its `ThemePicker.tsx` imports `src/data/themes.js` directly,
so the picker's markup picks the new chip up on both sides at once and stays
byte-identical; `react/app/root.tsx` deliberately imports only the Kraft
stylesheets, so no import belongs there.

## Verification

```sh
pnpm build          # every theme file is imported and parses
pnpm diff event     # the clone parity harness stays clean
```

Then a look at `/?theme=stargazing`, `/event?theme=stargazing` and
`/archive?theme=stargazing` — the third is where the shared contract gets
tested hardest, since the archived cards paint from it too.

## Open questions

- **Gold in both accent slots.** Solstice Night splits them (pink fill, amber
  type). Keeping one gold here is simpler and the contrast is ample, but if the
  CTAs end up too loud against the dark blue, the fill could move to a
  periwinkle `#7c8cff` with the gold left as type only. Worth judging on screen
  rather than deciding now.
- **Star density.** Two dozen per 300px tile is a guess. If the repeat becomes
  visible at wide viewports, the fix is a larger tile with the same count, not
  more stars.
