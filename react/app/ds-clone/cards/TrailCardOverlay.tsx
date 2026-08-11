/* TrailCardOverlay — the wide card with the name and the facts moved onto
   the cover. Type over a photo stays white in every theme: a photograph has
   no colour scheme, so the on-photo pills are the only paint that reads. */
import PhotoWrap from "../ui/PhotoWrap";
import Pill from "../ui/Pill";
import Rating from "../ui/Rating";
import TrailStats from "../ui/TrailStats";
import HighlightTags from "../ui/HighlightTags";
import TrailLinks from "../ui/TrailLinks";
import type { Trail } from "../types";

export default function TrailCardOverlay({ trail }: { trail: Trail }) {
  return (
    <article className="card photo-card trail-card-wide trail-card-overlay">
      <PhotoWrap photo={trail.photo} alt={trail.alt}>
        <span className="photo-badge"><Rating value={trail.rating} onPhoto /></span>
        <div className="photo-title">
          <div className="photo-pills">
            <Pill variant="on-photo">{trail.grade}</Pill>
            <Pill variant="on-photo" icon="compass">{trail.compass}</Pill>
            <Pill variant="on-photo" icon="location-dot">{trail.place}</Pill>
          </div>
          {/* With an href the PHOTO is the card's door to the trail page: the
              anchor's ::after stretches over the whole photo-wrap, the name is
              the link text, and the .trail-link rail below stays independent. */}
          <h3 className="title">{trail.href ? <a className="photo-link" href={trail.href}>{trail.name}</a> : trail.name}</h3>
        </div>
      </PhotoWrap>
      <div className="photo-body">
        <p className="fine">{trail.blurb}</p>
        <TrailStats stats={trail.stats} />
        <HighlightTags tags={trail.tags} />
        <TrailLinks start={trail.start} map={trail.map} slug={trail.slug} />
      </div>
    </article>
  );
}
