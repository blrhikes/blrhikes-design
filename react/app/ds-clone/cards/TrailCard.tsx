/* TrailCard — the library card: cover, grade and rating, the mono facts
   strip, and the highlight tags. Three up in the grid, one up in a rail. */
import PhotoWrap from "../ui/PhotoWrap";
import Pill from "../ui/Pill";
import Rating from "../ui/Rating";
import IconLine from "../ui/IconLine";
import TrailStats from "../ui/TrailStats";
import HighlightTags from "../ui/HighlightTags";

export default function TrailCard({ trail }: { trail: any }) {
  return (
    <article className="card photo-card">
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
        <TrailStats stats={trail.stats} />
        <HighlightTags tags={trail.tags} />
      </div>
    </article>
  );
}
