/* The trail library. TrailCardOverlay is the chosen variant (owner,
   2026-08-06); TrailCard and TrailCardWide, which it was picked over, moved to
   /archive rather than being deleted — a decision is easier to revisit with
   the alternatives still standing. */
import SectionHead from "../ui/SectionHead";
import Spec from "../ui/Spec";
import Pill from "../ui/Pill";
import TrailCardOverlay from "../cards/TrailCardOverlay";
import StatBand from "../ui/StatBand";
import { trailCardsOverlay } from "../../../../src/data/trails.js";

const stats: [string, string][] = [
  ["214", "members"],
  ["63", "hikes done"],
  ["1,480", "km walked"],
  ["0", "people left behind"],
];

/* `variant` is typed as Pill's own union rather than `string`: these are
   literals in the source, and letting them widen would hide a typo'd modifier
   that renders an unstyled pill. */
type PillVariant = "live" | "full" | "member" | "ok" | "on-photo";

const registrations: [string, string, { text: string; variant?: PillVariant }, string][] = [
  ["Ananya R", "Skandagiri Sunrise Hike", { text: "Paid ✓", variant: "ok" }, "₹999"],
  ["Vikram S", "Skandagiri Sunrise Hike", { text: "Pending" }, "₹1,200"],
  ["Meera K", "Granite Gauntlet Night Trek", { text: "Paid ✓", variant: "ok" }, "₹950"],
  ["Arjun N", "Savandurga Full Moon Walk", { text: "Waitlist", variant: "full" }, "—"],
];

export default function TrailsSection() {
  return (
    <section className="section" id="trails">
      <div className="container">
        <SectionHead eyebrow="06 · Trails" title="The trail library" />

        <Spec doc="TrailCardOverlay">
          TrailCardOverlay · HighlightTag — name and facts on the cover, two per row
        </Spec>
        <div className="trail-grid trail-grid--wide">
          {trailCardsOverlay.map((trail: any) => (
            <TrailCardOverlay trail={trail} key={trail.slug} />
          ))}
        </div>

        <p className="fine" style={{ marginTop: "1.25rem" }}>
          The variants this was picked over — TrailCard and TrailCardWide — are in
          the <a href="/archive/">archive</a>.
        </p>

        <Spec gap>StatBand</Spec>
        <StatBand stats={stats} />

        <Spec gap>Table — recent registrations</Spec>
        <div className="card table-card">
          {/* Four columns of tabular data have a min-content width a phone does
              not have; the wrapper lets the TABLE scroll sideways instead of the
              page. tabindex makes it reachable by keyboard, which a scrollable
              region needs to be. */}
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Recent registrations"
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Event</th>
                  <th>Status</th>
                  <th className="num">Amount</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map(([name, event, status, amount]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{event}</td>
                    <td>
                      <Pill variant={status.variant}>{status.text}</Pill>
                    </td>
                    <td className="num mono">{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
