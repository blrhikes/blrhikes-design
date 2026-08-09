# The React clone

A React Router v7 app that renders this repo's pages from React components,
so that **visual parity becomes a text-diffable property**.

The problem it solves: `blrhikes-app` re-implements these components from
`COMPONENTS.md` specs, and two rounds of parity fixes showed that parity
cannot be verified by reading code — the torn-cover z-index bug was invisible
in source review and obvious on screen — while the agent doing the porting is
not allowed to take screenshots. So instead of checking the app against the
design by eye, the chain is:

```
design repo (Astro)  ⇄  HTML-diff-clean  ⇄  clone (React Router)  →  app
```

Prove the React components emit byte-identical markup to the Astro ones, and
the app can be rebuilt from components that are known-correct rather than
believed-correct.

## Running it

```sh
pnpm diff              # from the repo root: build both, compare, exit = failures
pnpm diff event        # one page
SKIP_BUILD=1 pnpm diff # reuse both builds (when iterating on the normaliser)

pnpm clone:dev         # the clone on a dev server, for a human glance
pnpm clone:typecheck
```

`scripts/diff-pages.sh` is the runner and `scripts/normalise-html.py` is the
part that matters — read its docstring before changing anything about it. It
canonicalises both builds (sorted attributes, no scripts, no comments, no
build-tool attributes, browser whitespace semantics) so that what remains in a
diff is a real difference in what the page paints. It states its two blind
spots rather than hiding them.

`scripts/expected-diffs/<page>.pl` holds the differences that are deliberate.
Each one carries its reason. A rule without a reason is a regression somebody
got tired of.

## What is cloned

| Page | Status |
| --- | --- |
| `/event/` | ✅ diff clean |
| `/` (showcase) | not started |
| `/archive/` | not started |
| `/404` | parked (owner, 2026-08-08) |
| `/tear-lab/` | out of scope |

Adding a page means translating it to `.tsx`, adding it to `app/routes.ts`,
adding its path to `prerender` in `react-router.config.ts`, and adding it to
`DEFAULT_PAGES` in the diff script.

## Rules for the translation

- **Verbatim markup.** Every class name, every `<i class="fa-*">`, every
  attribute. Translate syntax only: `class`→`className`, `class:list`→a joined
  string, slots→children, `Astro.props`→a props object.
- **The CSS is imported from `../src/styles`, never copied.** Identical markup
  over identical CSS renders identically; a copy would be a second source of
  truth and would start drifting the day it was made.
- **Mock data is imported from `../src/data`, never copied.** Markup identity
  needs content identity.
- **Client behaviour runs from effects and must not change SSR output** —
  `app/ds-clone/scripts.ts` holds the ports of `htags.js` and `nav-drawer.js`.
  The harness only sees prerendered HTML, and the way to keep that honest is
  for the behaviour to genuinely not run until after mount. No suppressed
  hydration warnings as a workaround.
- **One theme, hard-set.** `<html data-theme="kraft-gold">`; no picker
  behaviour, no theme.js, and the sixteen other theme stylesheets are not
  imported. (ThemePicker's *markup* is cloned anyway — see the note in
  `app/ds-clone/ThemePicker.tsx`.)

## Traps that have already bitten

- **JSX eats whitespace that spans lines; Astro keeps it.** `<i/>` on one line
  and a label on the next means no space between icon and label in React and a
  space in Astro. Write `{" "}` explicitly. The harness catches it.
- **React serialises a valueless prop on a `data-*` attribute as `="true"`**,
  where Astro writes `=""`. Write `data-x=""`.
- **React appends `px` to a bare number in a style object.** `{ width: pct }`
  is 35 pixels, not 35 percent. Every dimensional value is a string.
- **Astro drops the literal space between two adjacent expressions in slot
  content** — `{a} {b}` renders as `ab`. This is a real bug in
  `RegistrationCard.astro`, currently carried as the one expected-difference
  rule on `/event/`. See `scripts/expected-diffs/event.pl`.
