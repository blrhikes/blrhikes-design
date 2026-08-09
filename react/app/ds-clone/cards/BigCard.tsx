/* BigCard — the edge exhibit. Same card, one edge treatment each: torn on
   every side, flat, or torn along the ends with the sides left straight.
   Tune every variable behind these in the tear lab.

   `caption` arrives as HTML (the Astro source uses `set:html`), so it is
   injected rather than escaped. That is safe here and only here: the value
   comes from the design repo's own `trails.js`, never from user input. */
import PhotoWrap from "../ui/PhotoWrap";
import IconLine from "../ui/IconLine";
import TrailStats from "../ui/TrailStats";
import HighlightTags from "../ui/HighlightTags";

export default function BigCard({ card }: { card: any }) {
  const flat = card.edge === "flat";
  return (
    <article
      className={[
        "card",
        "bigcard",
        flat ? "bigcard--flat" : "bigcard--torn",
        card.edge === "torn-tb" && "bigcard--torn-tb",
        card.full && "bigcard--full",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <PhotoWrap photo={card.photo} alt={card.alt} backing={!flat} />
      <div className="bigcard-body">
        <p className="comp-title" dangerouslySetInnerHTML={{ __html: card.caption }} />
        <h3 className="title bigcard-title">{card.name}</h3>
        <IconLine icon="location-dot">{card.where}</IconLine>
        <p className="fine">{card.blurb}</p>
        <HighlightTags tags={card.tags} />
        <TrailStats stats={card.stats} />
      </div>
    </article>
  );
}
