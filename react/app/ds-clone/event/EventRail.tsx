/* The event page's sticky rail.

   The price, the lead and who is going are one RegistrationCard — the very
   card the showcase's event section renders, same parts in the same order.
   The trail used to sit under it; it now leads the article column, where
   there is width enough for the overlay variant. */
import RegistrationCard from "../cards/RegistrationCard";
import type { Pair } from "../types";

const links: Pair[] = [
  ["suitcase-rolling", "Gear checklist — grab something to carry"],
  ["pen-to-square", "Tell us how you're getting there"],
  ["car-side", "My ride"],
  ["clipboard-list", "Full transport plan"],
];

export default function EventRail() {
  return (
    <aside className="ev-aside">
      <RegistrationCard
        date={{ mon: "Aug", day: "13", dow: "Thu", label: "Thu 13 Aug" }}
        price="₹900"
        unit="/ person"
        member={{ price: "₹750" }}
        rows={[
          ["Start", "05:00 at the blue gate"],
          ["End", "~10:00, back in the city"],
        ]}
        lead={{ initials: "AS", name: "Ava Sharma" }}
        going={{ count: "3 going", faces: ["CD", "EL", "DO"] }}
        meter={{ taken: 7, total: 20, note: "7 / 20 registered · 13 left" }}
        cta="Register"
        ctaIcon="arrow-right"
        sticky={false}
      />

      <div className="card">
        <p className="ev-block-title">Already registered?</p>
        <ul className="ev-links">
          {links.map(([icon, text]) => (
            <li key={text}><a href="#"><i className={`fa-solid fa-${icon}`} aria-hidden="true"></i> {text}</a></li>
          ))}
          <li>
            <a href="#"><i className="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp group <i className="fa-solid fa-up-right-from-square" aria-hidden="true"></i></a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
