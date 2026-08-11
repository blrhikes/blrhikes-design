/* EventCardProminent — the lead event: wide cover, DateBlock beside the
   title, attendees and price in the foot. `tear: "sides"` swaps the rip from
   the top/bottom ends to the left/right sides (the -TornSides variant). */
import PhotoWrap from "../ui/PhotoWrap";
import DateBlock from "../ui/DateBlock";
import Pill from "../ui/Pill";
import PillLead from "../ui/PillLead";
import IconLine from "../ui/IconLine";
import AttendeeFaces from "../ui/AttendeeFaces";
import Btn from "../ui/Btn";

type Props = {
  event: any;
  tear?: "ends" | "sides";
  /** Real routes for the two actions. The defaults are the design repo's own
      hardcoded hrefs, so the clone's output is unchanged; the app passes its
      event's routes. */
  detailsHref?: string;
  registerHref?: string;
  /** The event page. Given, the PHOTO becomes an overlay anchor and the
      TITLE a plain link (owner, 2026-08-10) — deliberately not the trail
      cards' stretched .photo-link, whose whole-card cover would swallow the
      Details/Register buttons in the foot. */
  href?: string;
};

export default function EventCardProminent({
  event,
  tear = "ends",
  detailsHref = "/event/",
  registerHref = "#",
  href,
}: Props) {
  return (
    <article
      className={["card", "feat-card", tear === "sides" && "torn-lr"]
        .filter(Boolean)
        .join(" ")}
    >
      <PhotoWrap photo={event.photo}>
        <span className="photo-badge">
          <Pill variant={event.badge.variant}>{event.badge.text}</Pill>
        </span>
        {/* The place belongs on the picture: it says where the picture IS, and
            it frees the body to open on the title. An on-photo PILL, not bare
            white type (owner, 2026-08-08) — the same frosted chip the trail
            overlay card wears. .photo-meta only places it now. */}
        <p className="photo-meta">
          <Pill variant="on-photo" icon="location-dot">{event.where}</Pill>
        </p>
        {href && <a className="photo-door" href={href} aria-label={event.name}></a>}
      </PhotoWrap>
      <div className="feat-body">
        <div className="feat-head">
          <DateBlock {...event.date} label={event.dateLabel} />
          <div>
            <h3 className="title feat-title">{href ? <a className="title-link" href={href}>{event.name}</a> : event.name}</h3>
            <IconLine icon="clock" regular>
              {event.time}
            </IconLine>
          </div>
        </div>
        <p className="fine clamp-2">{event.blurb}</p>
        <div className="cluster">
          <Pill icon={event.kind.icon}>{event.kind.text}</Pill>
          <PillLead initials={event.lead.initials}>Led by {event.lead.name}</PillLead>
          <AttendeeFaces as="span" {...event.going} />
        </div>
        <div className="card-foot">
          <p className="price">{event.price}</p>
          <span className="actions">
            <Btn variant="secondary" size="sm" href={detailsHref}>
              Details
            </Btn>
            <Btn variant="primary" size="sm" href={registerHref}>
              Register
            </Btn>
          </span>
        </div>
      </div>
    </article>
  );
}
