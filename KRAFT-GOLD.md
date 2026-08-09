# Kraft Gold

A light theme (keyboard shortcut `;`): Kraft with Milestone's yellow in place of the dark warm neutral. The ground, paper grain, torn edge, type stack and hand-placed card lean are all Kraft's — see [KRAFT.md](KRAFT.md) — because the two themes differ in exactly one thing, and this theme file is that thing.

Defined in `src/styles/themes/kraft-gold.css`, activated via `data-theme="kraft-gold"` on `<html>`.

## How the sharing works

`kraft.css` scopes every one of its selectors to *both* themes (`:is([data-theme="kraft"], [data-theme="kraft-gold"])`), so the shared palette is declared once and can't drift. `kraft-gold.css` only re-points the four accent tokens. Anything that must differ between the two belongs in the variant file; anything shared belongs in `kraft.css`.

## The paper wash (inherited)

The ground texture carries a white overlay, declared in `kraft.css` and shared here: the paper scan (`kraft-paper.jpg`) is darker than the intended ground, so `--ground-img` layers a flat white scrim over it as a first background layer —

```css
--kraft-wash: 0.65;
--ground-img:
  linear-gradient(rgb(255 255 255 / var(--kraft-wash)), rgb(255 255 255 / var(--kraft-wash))),
  url("/assets/kraft-paper.jpg");
```

— the brightness-up/contrast-down effect of a CSS filter without using `filter`, which would also hit every child element. `--kraft-wash` is the knob; raise the alpha to lighten the texture. `body` in `base.css` paints the token. This wash is also why Gold's `--accent-tint` below must stay translucent.

## The four accent tokens

Lifted from `milestone.css` — the live site's yellow-400:

| Token | Value | Note |
| --- | --- | --- |
| `--accent` | `#facc15` | yellow-400, Milestone's fill unchanged |
| `--on-accent` | `#1c1917` | stone-900 — white on this yellow fails badly |
| `--accent-type` | `#713f12` | yellow-900 — 6.9:1 on Kraft's washed ground |
| `--accent-tint` | `rgb(250 204 21 / 0.3)` | translucent, unlike Milestone's solid yellow-100 |

Two constraints shape these values:

- **Fill vs. type split.** Kraft's own accent (`#44403c`) is emphasis by *darkness* — it is the ink, one shade removed — so one color serves as both fill and text. Yellow cannot do that job: yellow-400 manages only 1.5:1 as text on the paper ground. So the tokens split the way Milestone's do — the fill is the bright yellow, but accent-as-type steps down the same ramp to yellow-900, the only rung that clears 4.5:1. Same hue, legible weight.
- **Translucent tint.** Milestone's tint is solid yellow-100, but Kraft's surfaces are alpha over the paper scan; a solid fill would stamp the grain out of every chip and focus ring that uses it, so the tint stays translucent here.

## Flourish

One rule beyond the tokens: `.btn-primary:hover` darkens to `#eab308` (yellow-500) — Milestone's hover, borrowed for the same reason. On a fill this bright, "darken" is the only move that still reads as a state change.

## Picker fingerprint

Kraft's dots with the third swapped for the yellow: `#d4b896`, `#faf3e8`, `#facc15`, `#1a1a1a`.
