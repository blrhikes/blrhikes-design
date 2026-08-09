/* EventTicket — the dense list row: a tear-off date stub, the essentials,
   and a chevron. No photo, so many fit on a screen.

   The four stub spans sit flush with no whitespace between them, as in the
   Astro source — the stub is a tight vertical block and a text node between
   the spans would space it out. */
import Pill from "../ui/Pill";
import IconLine from "../ui/IconLine";
import { useIcon } from "../icon-seam";

export default function EventTicket({ ticket }: { ticket: any }) {
  const drawIcon = useIcon();
  return (
    <article className="card ticket-row">
      <div className="ticket-stub">
        <span className="mon">{ticket.stub.mon}</span>
        <span className="day">{ticket.stub.day}</span>
        <span className="dow">{ticket.stub.dow}</span>
        <span className="time">{ticket.stub.time}</span>
      </div>
      <div className="ticket-body">
        <h4 className="title" style={{ fontSize: "1.05rem" }}>
          {ticket.name}
        </h4>
        <IconLine icon="location-dot">{ticket.where}</IconLine>
        <div className="ticket-tags">
          {ticket.tags.map((t: any, i: number) => (
            <Pill variant={t.variant} key={i}>
              {t.text}
            </Pill>
          ))}
        </div>
      </div>
      <div className="ticket-chev">
        {drawIcon("chevron-right")}
      </div>
    </article>
  );
}
