/* TrailCardProminent — the trail at the lead event's size: feat-card's torn
   ends and photo flank, restructured to the owner's sketch (2026-08-10):
   photo left and the words right on the top row, then one full-width band of
   facts — grade, area, direction, the mono stats — under both. NO TrailLinks
   rail: the gated actions belong to the trail page; this card's one door is
   the title's .photo-link, whose stretch covers the whole card (.card is the
   positioned ancestor here). */
import PhotoWrap from "../ui/PhotoWrap";
import Pill from "../ui/Pill";
import Rating from "../ui/Rating";
import IconLine from "../ui/IconLine";
import TrailStats from "../ui/TrailStats";
import HighlightTags from "../ui/HighlightTags";
import type { Trail } from "../types";

export default function TrailCardProminent({ trail }: { trail: Trail }) {
  return (
    <article className="card feat-card trail-card-prominent">
      <PhotoWrap photo={trail.photo} alt={trail.alt}>
        <span className="photo-badge"><Rating value={trail.rating} onPhoto /></span>
      </PhotoWrap>
      <div className="feat-body">
        <h3 className="title feat-title">{trail.href ? <a className="photo-link" href={trail.href}>{trail.name}</a> : trail.name}</h3>
        <p className="fine clamp-2">{trail.blurb}</p>
        <HighlightTags tags={trail.tags} />
      </div>
      <div className="tcp-band">
        <Pill variant={trail.gradeVariant}>{trail.grade}</Pill>
        <IconLine icon="location-dot">{trail.place}</IconLine>
        <IconLine icon="compass">{trail.compass} of Bengaluru</IconLine>
        <TrailStats stats={trail.stats} />
      </div>
    </article>
  );
}
