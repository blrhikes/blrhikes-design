/* TrailCardWide — TrailCard with room for the blurb and the route links.
   Two up; the rip runs along the top and bottom ends. */
import PhotoWrap from "../ui/PhotoWrap";
import Pill from "../ui/Pill";
import Rating from "../ui/Rating";
import IconLine from "../ui/IconLine";
import TrailStats from "../ui/TrailStats";
import HighlightTags from "../ui/HighlightTags";
import TrailLinks from "../ui/TrailLinks";

export default function TrailCardWide({ trail }: { trail: any }) {
  return (
    <article className="card photo-card trail-card-wide">
      <PhotoWrap photo={trail.photo} alt={trail.alt}>
        {trail.badge && (
          <span className="photo-badge">
            <Pill variant={trail.badge.variant}>{trail.badge.text}</Pill>
          </span>
        )}
      </PhotoWrap>
      <div className="photo-body">
        <div className="photo-toprow">
          <Pill variant={trail.gradeVariant}>{trail.grade}</Pill>
          <Rating value={trail.rating} />
        </div>
        <h3 className="title">{trail.name}</h3>
        <IconLine icon="location-dot">{trail.where}</IconLine>
        <p className="fine">{trail.blurb}</p>
        <TrailStats stats={trail.stats} />
        <HighlightTags tags={trail.tags} />
        <TrailLinks start={trail.start} map={trail.map} slug={trail.slug} />
      </div>
    </article>
  );
}
