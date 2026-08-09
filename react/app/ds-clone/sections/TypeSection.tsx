/* The type ramp. Each row names the slot and shows it at working size, so a
   theme swap is legible as a change of voice rather than a change of size. */
import SectionHead from "../ui/SectionHead";
import Spec from "../ui/Spec";

const rows: [string, string, string][] = [
  ["display / 1", "display-1", "Savandurga"],
  ["display / 2", "display-2", "Full moon walk"],
  ["title", "title", "Carpools leave Bengaluru at 3 am"],
  [
    "body",
    "body-demo",
    "Classic pre-dawn climb to catch the sunrise above the clouds. Shoes with grip — the last stretch is rocky.",
  ],
  ["fine print", "fine", "Permits arranged by the crew; cost included in the ticket."],
  ["mono / data", "mono", "12.6981° N, 77.2935° E · 2.41 KM · +124 M"],
];

export default function TypeSection() {
  return (
    <section className="section" id="type">
      <div className="container">
        <SectionHead eyebrow="02 · Type" title="Two voices, one ramp">
          A display face for headlines and numerals, a workhorse for everything
          else, a mono for data. Hierarchy comes from size, colour and space.
        </SectionHead>
        <Spec>Type ramp</Spec>
        <div className="card type-card">
          {rows.map(([name, cls, demo]) => (
            <p className="type-row" key={name}>
              <span className="type-spec">{name}</span>
              <span className={`${cls} type-demo`}>{demo}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
