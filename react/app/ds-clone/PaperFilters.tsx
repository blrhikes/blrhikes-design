/* PaperFilters — src/components/PaperFilters.astro, verbatim.

   The one component where "verbatim" needs saying twice: the tear is these
   filter defs plus the CSS that references them, so a mistyped baseFrequency
   is a silent visual regression that no amount of code review catches. Every
   numeric attribute is written as a STRING on purpose — `scale={3.5}` and
   `scale="3.5"` serialise the same today, but the string cannot be reformatted
   by React's number handling, and the harness compares the serialisation.

   React's camelCased SVG props (baseFrequency, numOctaves, xChannelSelector,
   clipPathUnits) serialise back to the DOM's own attribute names, so the
   output is the same attribute set Astro emits; the normaliser sorts within
   the tag, so their order is not compared. */
export default function PaperFilters() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <filter id="cut-1" x="-10%" y="-30%" width="120%" height="160%">
        <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" result="n1" />
        <feDisplacementMap in="SourceGraphic" in2="n1" scale="3" xChannelSelector="R" yChannelSelector="G" result="d1" />
        <feTurbulence type="fractalNoise" baseFrequency="0.015 0.002" numOctaves="3" seed="9" result="n2" />
        <feComponentTransfer in="n2" result="n2f"><feFuncR type="linear" slope="0" intercept="0.5" /></feComponentTransfer>
        <feDisplacementMap in="d1" in2="n2f" scale="38" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="cut-2" x="-10%" y="-30%" width="120%" height="160%">
        <feTurbulence type="turbulence" baseFrequency="0.035" numOctaves="4" seed="3" result="n1" />
        <feDisplacementMap in="SourceGraphic" in2="n1" scale="3" xChannelSelector="R" yChannelSelector="G" result="d1" />
        <feTurbulence type="fractalNoise" baseFrequency="0.018 0.002" numOctaves="3" seed="13" result="n2" />
        <feComponentTransfer in="n2" result="n2f"><feFuncR type="linear" slope="0" intercept="0.5" /></feComponentTransfer>
        <feDisplacementMap in="d1" in2="n2f" scale="36" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="cut-3" x="-10%" y="-30%" width="120%" height="160%">
        <feTurbulence type="turbulence" baseFrequency="0.045" numOctaves="4" seed="7" result="n1" />
        <feDisplacementMap in="SourceGraphic" in2="n1" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="d1" />
        <feTurbulence type="fractalNoise" baseFrequency="0.013 0.002" numOctaves="3" seed="21" result="n2" />
        <feComponentTransfer in="n2" result="n2f"><feFuncR type="linear" slope="0" intercept="0.5" /></feComponentTransfer>
        <feDisplacementMap in="d1" in2="n2f" scale="42" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="cut-hero" x="-10%" y="-30%" width="120%" height="160%">
        <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="5" result="n1" />
        <feDisplacementMap in="SourceGraphic" in2="n1" scale="5" xChannelSelector="R" yChannelSelector="G" result="d1" />
        <feTurbulence type="fractalNoise" baseFrequency="0.011 0.002" numOctaves="3" seed="31" result="n2" />
        <feComponentTransfer in="n2" result="n2f"><feFuncR type="linear" slope="0" intercept="0.5" /></feComponentTransfer>
        <feDisplacementMap in="d1" in2="n2f" scale="48" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="cut-tb" x="-10%" y="-30%" width="120%" height="160%">
        <feTurbulence type="fractalNoise" baseFrequency="0.014 0.002" numOctaves="3" seed="53" result="n" />
        <feComponentTransfer in="n" result="nf"><feFuncR type="linear" slope="0" intercept="0.5" /></feComponentTransfer>
        <feDisplacementMap in="SourceGraphic" in2="nf" scale="40" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="cut-photo" x="-10%" y="-30%" width="120%" height="160%">
        <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" seed="11" result="n1" />
        <feDisplacementMap in="SourceGraphic" in2="n1" scale="2" xChannelSelector="R" yChannelSelector="G" result="d1" />
        <feTurbulence type="fractalNoise" baseFrequency="0.03 0.002" numOctaves="3" seed="47" result="n2" />
        <feComponentTransfer in="n2" result="n2f"><feFuncR type="linear" slope="0" intercept="0.5" /></feComponentTransfer>
        <feDisplacementMap in="d1" in2="n2f" scale="10" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="cut-photo-tb" x="-10%" y="-30%" width="120%" height="160%">
        <feTurbulence type="fractalNoise" baseFrequency="0.03 0.002" numOctaves="3" seed="47" result="n" />
        <feComponentTransfer in="n" result="nf"><feFuncR type="linear" slope="0" intercept="0.5" /></feComponentTransfer>
        <feDisplacementMap in="SourceGraphic" in2="nf" scale="10" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      {/* The transposed cut: the same two-pass recipe with the anisotropic pass
          turned on its side. Its noise varies only along Y and its G channel is
          neutralised, so it displaces purely HORIZONTALLY — the left and right
          edges rip ±19px while the top and bottom keep the fine 3px cut. The
          filter region grows sideways instead of vertically to match. */}
      <filter id="cut-lr" x="-30%" y="-10%" width="160%" height="120%">
        <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" seed="5" result="n1" />
        <feDisplacementMap in="SourceGraphic" in2="n1" scale="3" xChannelSelector="R" yChannelSelector="G" result="d1" />
        <feTurbulence type="fractalNoise" baseFrequency="0.002 0.015" numOctaves="3" seed="23" result="n2" />
        <feComponentTransfer in="n2" result="n2f"><feFuncG type="linear" slope="0" intercept="0.5" /></feComponentTransfer>
        <feDisplacementMap in="d1" in2="n2f" scale="38" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="cut-lr-2" x="-30%" y="-10%" width="160%" height="120%">
        <feTurbulence type="turbulence" baseFrequency="0.035" numOctaves="4" seed="29" result="n1" />
        <feDisplacementMap in="SourceGraphic" in2="n1" scale="3" xChannelSelector="R" yChannelSelector="G" result="d1" />
        <feTurbulence type="fractalNoise" baseFrequency="0.002 0.018" numOctaves="3" seed="37" result="n2" />
        <feComponentTransfer in="n2" result="n2f"><feFuncG type="linear" slope="0" intercept="0.5" /></feComponentTransfer>
        <feDisplacementMap in="d1" in2="n2f" scale="36" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="cut-photo-lr" x="-30%" y="-10%" width="160%" height="120%">
        <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" seed="11" result="n1" />
        <feDisplacementMap in="SourceGraphic" in2="n1" scale="2" xChannelSelector="R" yChannelSelector="G" result="d1" />
        <feTurbulence type="fractalNoise" baseFrequency="0.002 0.03" numOctaves="3" seed="47" result="n2" />
        <feComponentTransfer in="n2" result="n2f"><feFuncG type="linear" slope="0" intercept="0.5" /></feComponentTransfer>
        <feDisplacementMap in="d1" in2="n2f" scale="10" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* AttendeeFaces disc, lifted from the app's #ds-rounded-octagon
          (blrhikes-app/app/components/ds/paper.tsx). Kept, unreferenced, since
          the owner moved the faces to circles on 2026-08-06: it is the app's
          actual shape, and this is the file it would come back through. */}
      {/* The wash spans the viewport, so its noise has to run at a longer
          wavelength or the tear reads as a repeating comb at that width. */}
      <filter id="cut-photo-wide" x="-5%" y="-30%" width="110%" height="160%">
        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="4" seed="11" result="n1" />
        <feDisplacementMap in="SourceGraphic" in2="n1" scale="2" xChannelSelector="R" yChannelSelector="G" result="d1" />
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.002" numOctaves="3" seed="47" result="n2" />
        <feComponentTransfer in="n2" result="n2f"><feFuncR type="linear" slope="0" intercept="0.5" /></feComponentTransfer>
        <feDisplacementMap in="d1" in2="n2f" scale="12" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      <clipPath id="face-octagon" clipPathUnits="objectBoundingBox">
        <path d="M0.364,0 L0.636,0 Q0.7,0 0.748,0.048 L0.952,0.252 Q1,0.3 1,0.364 L1,0.636 Q1,0.7 0.952,0.748 L0.748,0.952 Q0.7,1 0.636,1 L0.364,1 Q0.3,1 0.252,0.952 L0.048,0.748 Q0,0.7 0,0.636 L0,0.364 Q0,0.3 0.048,0.252 L0.252,0.048 Q0.3,0 0.364,0 Z" />
      </clipPath>
    </svg>
  );
}
