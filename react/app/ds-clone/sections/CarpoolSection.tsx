/* Travel — the rider's form on the left, the organiser's manifest on the
   right. Same tokens, two very different densities.

   Uncontrolled form controls throughout — see the note in ComponentsSection.
   The `cp-seats` select carries `defaultValue="3"` where the Astro source
   marks the option `selected`; React sets the selection from the parent, and
   both emit `selected` on the same option. */
import SectionHead from "../ui/SectionHead";
import Spec from "../ui/Spec";
import VehicleCard from "../cards/VehicleCard";
import TravelForm from "../TravelForm";

const vehicles = [
  {
    driver: "Rahul",
    vehicle: "Jimny",
    from: "Cooke Town",
    seats: 5,
    filled: 3,
    /* Rider initials only, in seat order — the driver seat draws its own. */
    riders: "Rahul · Radhika (New Tipassandra) · Srilekha (Koramangala)",
    faces: ["RA", "SR"],
    departs: "03:10",
    eta: "05:05",
    routeUrl: "#",
  },
  {
    /* No vehicle label and no logistics line yet — the card renders without
       either rather than printing TBDs. */
    driver: "Chandan",
    from: "Esteem Mall",
    seats: 3,
    filled: 1,
    riders: "Chandan — picking up along Bellary Road",
    faces: [],
  },
];

export default function CarpoolSection() {
  return (
    <section className="section" id="carpool">
      <div className="container">
        <SectionHead eyebrow="05 · Travel" title="How are you getting there?">
          Tell us where you start; we match riders to cars the night before.
        </SectionHead>

        <div className="carpool-grid">
          <div>
            <Spec>TravelForm · ModeCard · Field</Spec>
            <TravelForm />
          </div>

          <div>
            <Spec>CarpoolManifest · VehicleCard · SeatRow</Spec>
            <div className="card manifest">
              <h3 className="comp-title">Carpool manifest · Sat 03:00</h3>
              {vehicles.map((v) => (
                <VehicleCard {...v} key={v.driver} />
              ))}

              <h3 className="comp-title">Still need a pickup</h3>
              <ul className="pickup-list">
                <li>
                  <span>Sandip</span>
                  <span className="mono">JP Nagar 3rd phase</span>
                </li>
                <li>
                  <span>
                    Dhanashree <span className="pill">Unconfirmed</span>
                  </span>
                  <span className="mono">AECS Layout, Brookefield</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
