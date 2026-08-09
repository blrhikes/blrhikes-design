/* One event, every surface: the photo cover, the detail split, the two
   prominent cards, the two-up EventCards and the dense ticket rows. Each of
   these is a top-level band rather than one nested block, so the cover can
   run full bleed between two contained sections.

   Returns a fragment of FIVE sibling <section>s, matching the Astro component
   — it is not one section with four children, and wrapping it in a div would
   break the full-bleed cover. */
import SectionHead from "../ui/SectionHead";
import Spec from "../ui/Spec";
import Notice from "../ui/Notice";
import RegistrationCard from "../cards/RegistrationCard";
import EventCardProminent from "../cards/EventCardProminent";
import EventCard from "../cards/EventCard";
import EventTicket from "../cards/EventTicket";
import { skandagiri, graniteGauntlet, eventCards, eventTickets } from "../../../../src/data/events.js";

export default function EventSurfacesSection() {
  return (
    <>
      <section className="section" id="events" style={{ paddingBottom: "1.5rem" }}>
        <div className="container">
          <SectionHead eyebrow="04 · Event surfaces" title="One event, every surface" flush>
            The Skandagiri Sunrise Hike from the seed data, rendered through the
            full set of event components.
          </SectionHead>
        </div>
      </section>

      <section className="cover" style={{ backgroundImage: `url('${skandagiri.photo}')` }}>
        <Spec onPhoto>PhotoCover</Spec>
        <div className="container cover-inner">
          <p className="cover-eyebrow">
            <span className="pill pill-live">Live</span>
            <span className="mono">{skandagiri.id} · Hike</span>
          </p>
          <h1 className="display-1">{skandagiri.name}</h1>
          <p className="cover-meta">
            <span className="mono">{skandagiri.when}</span>
            <span>{skandagiri.where}</span>
            <span className="mono">{skandagiri.price}</span>
          </p>
        </div>
      </section>

      <section className="section" style={{ borderTop: "none" }}>
        <div className="container detail-grid">
          <div>
            <Spec>Prose · Checklist · Notice</Spec>
            <div className="prose">
              <p>
                Classic pre-dawn climb to catch the sunrise above the clouds. We start
                from the base at 4:30 am sharp — carpools leave Bengaluru around 3 am.
              </p>
              <p>
                Breakfast on the way back is on us. Permits are arranged by the crew;
                the cost is included in the ticket.
              </p>
              <h3>What to bring</h3>
              <ul className="checklist">
                <li>Headlamp or torch (mandatory)</li>
                <li>2L water, light snacks</li>
                <li>Warm layer for the summit wind</li>
                <li>Shoes with grip — the last stretch is rocky</li>
              </ul>
              <Notice variant="danger">
                <strong>Skandagiri needs a forest permit.</strong> Registrations close
                48 hours before the hike so we can file the list with the department.
              </Notice>
            </div>
          </div>

          <div>
            <Spec doc="RegistrationCard">RegistrationCard · Meter</Spec>
            <RegistrationCard
              date={{ mon: "Aug", day: "08", dow: "Sat", label: "Sat 8 Aug" }}
              price="₹1,200"
              unit="/ person"
              member={{ price: "₹999" }}
              rows={[
                ["Start", "04:30 at the base"],
                ["End", "11:00 at the base"],
              ]}
              lead={{ initials: "SH", name: "Shreshth" }}
              going={{ count: "19 going", more: "+15", faces: ["DH", "RH", "SR", "RA"] }}
              meter={{ taken: 19, total: 25, note: "19 / 25 registered · 6 left" }}
              cta="Register — ₹1,200"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Spec doc="EventCardProminent-TornEnds">
            EventCardProminent-TornEnds · DateBlock — the rip runs along the top and bottom
          </Spec>
          <EventCardProminent event={graniteGauntlet} tear="ends" />

          <Spec gap doc="EventCardProminent-TornEnds">
            EventCardProminent-TornSides · DateBlock — the rip runs down the left and right
          </Spec>
          <EventCardProminent event={graniteGauntlet} tear="sides" />

          <Spec gap doc="EventCard">
            EventCard · DateBlock · AttendeeFaces
          </Spec>
          <div className="event-grid">
            {eventCards.map((event: any) => (
              <EventCard event={event} key={event.name} />
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <Spec>EventTicket — dense rows, no photo</Spec>
            <div className="ticket-list">
              {eventTickets.map((ticket: any) => (
                <EventTicket ticket={ticket} key={ticket.name} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
