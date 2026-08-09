/* The hero, on the app's PhotoHero shape (components/ds/home.tsx): a
   full-bleed photograph, the type on a scrim at its foot, one primary action,
   and a row of faces carrying a claim under it.

   `.flush-top` is the hook base.css reads — the bar goes transparent and rides
   on this photo, so the image reaches the top of the viewport.

   The ridgeline SVG stays as the ground behind the photograph, shown while it
   loads and left standing if it never arrives. That is the app's own pattern
   (`--ds-photo-bg`), and it is why eleven themes' `.ridges` rules still earn
   their place. */
import Btn from "../ui/Btn";
import AttendeeFaces from "../ui/AttendeeFaces";
import { defaultTheme, themes } from "../../../../src/data/themes.js";

/* The Astro source reads `.label` straight off `.find(...)`. `themes` always
   contains `defaultTheme`, so the lookup cannot miss — but TS cannot know
   that, and a non-null assertion states the invariant without changing what
   is rendered. */
const label = themes.find((t: any) => t.id === defaultTheme)!.label;

export default function HeroSection() {
  return (
    <section className="hero flush-top">
      <div className="hero-art" aria-hidden="true">
        <svg viewBox="0 0 520 340" className="ridges" preserveAspectRatio="xMidYMax slice">
          <circle className="sun" cx="368" cy="92" r="46" />
          <path
            className="r1"
            d="M0 210 L70 150 L128 196 L210 108 L300 200 L368 148 L452 214 L520 176 L520 340 L0 340 Z"
          />
          <path
            className="r2"
            d="M0 258 L90 206 L170 252 L268 178 L354 250 L448 204 L520 244 L520 340 L0 340 Z"
          />
          <path
            className="r3"
            d="M0 306 L110 262 L214 300 L330 246 L430 296 L520 268 L520 340 L0 340 Z"
          />
        </svg>
      </div>

      {/* Two crops, not one image at two widths: the mobile frame is a portrait
          composition with the subject centred, a genuinely different picture. Both
          are the app's own files.

          A <picture> with a media query rather than the app's two <img>s — art
          direction is exactly what it is for, and the browser fetches only the one
          it will use, where two display:none-toggled images fetch both. */}
      <picture>
        <source media="(min-width: 64rem)" srcSet="/images/hero.webp" />
        <img className="hero-photo" src="/images/hero-mobile.webp" alt="" loading="eager" />
      </picture>

      <div className="hero-scrim">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow theme-name">
              {/* `data-theme-label=""`, not a bare `data-theme-label`: React
                  serialises a valueless data-* prop as `="true"` where Astro
                  writes `=""`. Same defect the harness caught on NavDrawer's
                  `data-nav-close` in P1. */}
              Theme — <span data-theme-label="">{label}</span>
            </p>
            <h1 className="display-1">
              Walk out
              <br />
              of the city.
            </h1>
            <p className="lede">
              Small-group hikes around Bengaluru — sunrise summits, night treks and
              lake days, planned end to end.
            </p>
            <div className="hero-actions">
              <Btn variant="primary" href="#events">
                See upcoming hikes
              </Btn>
              <Btn variant="secondary" href="#trails">
                Browse trails
              </Btn>
            </div>
            {/* The app's AvatarRow: faces, then the claim beside them. The faces
                are decorative — the claim is the content — so the stack carries no
                count of its own and the sentence does the talking. */}
            <p className="hero-next">
              <AttendeeFaces as="span" count="" faces={["SR", "RH", "RA", "DH"]} label="" />
              <span>
                Walked with <strong>214 members</strong> so far
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
