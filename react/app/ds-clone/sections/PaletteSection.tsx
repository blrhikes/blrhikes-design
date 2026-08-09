/* The token contract, as swatches. Every slot listed here is one a theme
   must set — the list doubles as the checklist in the README. */
import SectionHead from "../ui/SectionHead";
import Spec from "../ui/Spec";

const slots = [
  "ground",
  "surface",
  "surface-2",
  "ink",
  "ink-faint",
  "accent",
  "accent-type",
  "ok",
  "danger",
  "line",
];

export default function PaletteSection() {
  return (
    <section className="section" id="palette">
      <div className="container">
        <SectionHead eyebrow="01 · Palette" title="Colour is a contract">
          Slots are named for their <em>job</em>, not their hue. A theme re-points
          every slot in one file; no component knows themes exist.
        </SectionHead>
        <Spec>Token swatches</Spec>
        <div className="swatches">
          {slots.map((slot) => (
            <figure
              className="swatch"
              style={{ "--sw": `var(--${slot})` } as React.CSSProperties}
              key={slot}
            >
              <figcaption>{slot}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
