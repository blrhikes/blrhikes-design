/* EventCard — photo on top with the title and DateBlock riding on it, facts
   and attendees below. The three-up/two-up workhorse. */
import PhotoWrap from "../ui/PhotoWrap";
import DateBlock from "../ui/DateBlock";
import Pill from "../ui/Pill";
import IconLine from "../ui/IconLine";
import AttendeeFaces from "../ui/AttendeeFaces";
import PillLead from "../ui/PillLead";
import Btn from "../ui/Btn";

export default function EventCard({ event }: { event: any }) {
  return (
    <article className="card photo-card">
      <PhotoWrap photo={event.photo}>
        <div className="photo-title">
          <h3 className="title">{event.name}</h3>
          <p className="photo-date">{event.start}</p>
        </div>
        <div className="photo-dateblock">
          <DateBlock {...event.date} label={event.dateLabel} />
        </div>
        <span className="photo-badge">
          <Pill variant={event.badge.variant}>{event.badge.text}</Pill>
        </span>
      </PhotoWrap>
      <div className="photo-body">
        <div className="cluster">
          {event.pills.map((p: any, i: number) => (
            <Pill variant={p.variant} icon={p.icon} key={i}>
              {p.text}
            </Pill>
          ))}
        </div>
        <IconLine icon="location-dot">{event.where}</IconLine>
        <p className="fine clamp-2">{event.blurb}</p>
        {/* Who is leading and who is going, on one line — the pair the prominent
            card and the registration card both carry, in the same shape. A cluster
            rather than two blocks, so on a narrow column they wrap instead of
            taking a row each. */}
        <div className="cluster">
          {event.lead && (
            <PillLead initials={event.lead.initials}>Led by {event.lead.name}</PillLead>
          )}
          <AttendeeFaces as="span" {...event.going} />
        </div>
        <div className="card-foot">
          <IconLine icon="clock" regular as="span">
            {event.start}
          </IconLine>
          <span className="actions">
            {/* `a.href ?? "#"`: the design repo's data carries no hrefs, so its
                output keeps the literal "#" byte-for-byte; the app passes real
                routes. Behaviour seam, same contract as RegistrationCard's
                ctaHref. */}
            {event.actions.map((a: any, i: number) => (
              <Btn variant={a.variant} size="sm" href={a.href ?? "#"} key={i}>
                {a.text}
              </Btn>
            ))}
          </span>
        </div>
      </div>
    </article>
  );
}
