/* Edges — the same card through every edge treatment. The surface is a
   filtered background layer so text stays crisp, and photos are repainted
   behind a clean image so they never warp. */
import SectionHead from "../ui/SectionHead";
import Spec from "../ui/Spec";
import BigCard from "../cards/BigCard";
import { edgeCards } from "../../../../src/data/trails.js";

export default function EdgesSection() {
  return (
    <section className="section" id="edges">
      <div className="container">
        <SectionHead eyebrow="07 · Edges" title="Torn, and not">
          The same card through every edge treatment. The surface is a filtered
          background layer so text stays crisp, and photos are repainted behind
          a clean image so they never warp. Tune every variable in the{" "}
          <a href="/tear-lab/">tear lab</a>.
        </SectionHead>

        <Spec>BigCard — edge exhibit</Spec>
        <div className="bigcard-grid">
          {edgeCards.map((card: any) => (
            <BigCard card={card} key={card.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
