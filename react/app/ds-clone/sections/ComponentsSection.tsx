/* The working parts, each card carrying the component name the app's design
   system uses.

   The form controls are UNCONTROLLED on purpose: `defaultChecked` /
   `defaultValue` where Astro writes a bare `checked` / `selected`. React
   refuses to render a `value` or `checked` without an onChange, and a
   controlled input here would need state this page has no business holding.
   Both serialise to the same attribute, which the normaliser then normalises. */
import SectionHead from "../ui/SectionHead";
import Btn from "../ui/Btn";
import Pill from "../ui/Pill";
import HighlightTags from "../ui/HighlightTags";
import AttendeeFaces from "../ui/AttendeeFaces";
import SeatRow from "../ui/SeatRow";
import DateBlock from "../ui/DateBlock";
import Field from "../ui/Field";
import Notice from "../ui/Notice";
import type { Pair } from "../types";

const going = { count: "19 going", more: "+15", faces: ["DH", "RH", "SR", "RA"] };

export default function ComponentsSection() {
  return (
    <section className="section" id="components">
      <div className="container">
        <SectionHead eyebrow="03 · Components" title="The working parts">
          Every part carries its component name — the same names the app's design
          system uses.
        </SectionHead>

        <div className="comp-grid">
          <div className="card comp-card">
            <h3 className="comp-title">Btn — buttons</h3>
            <div className="cluster">
              <Btn variant="primary">Register — ₹1,200</Btn>
              <Btn variant="secondary">Save trail</Btn>
              <Btn variant="ghost">View route →</Btn>
              <Btn variant="danger">Cancel spot</Btn>
              <Btn variant="primary" disabled>
                Sold out
              </Btn>
            </div>
          </div>

          <div className="card comp-card">
            <h3 className="comp-title">Pill / Tag — status &amp; type</h3>
            <div className="cluster">
              <Pill variant="live">Live</Pill>
              <Pill variant="full">Full</Pill>
              <Pill variant="member">Members</Pill>
              <Pill icon="mountain-sun">Hike</Pill>
              <Pill icon="fish">Hike + Swim</Pill>
              <Pill>Easy</Pill>
              <Pill variant="full">Hard</Pill>
              <Pill variant="ok">Paid ✓</Pill>
            </div>
            <h3 className="comp-title">HighlightTag — what a trail has</h3>
            <HighlightTags
              tags={
                [
                  ["dungeon", "Cave"],
                  ["tree", "Forest"],
                  ["water", "Lake"],
                  ["cubes-stacked", "Quarry"],
                ] as Pair[]
              }
            />
          </div>

          <div className="card comp-card">
            <h3 className="comp-title">AttendeeFaces · SeatRow · DateBlock</h3>
            <AttendeeFaces {...going} />
            <p className="ledby">
              Led by Shreshth <span className="face">SH</span>
            </p>
            <SeatRow filled={3} total={5} />
            <DateBlock mon="Aug" day="08" dow="Sat" label="Sat 8 Aug" />
          </div>

          <div className="card comp-card comp-form">
            <h3 className="comp-title">Field · Select · Check — forms</h3>
            <Field id="f-name" label="Full name">
              <input id="f-name" type="text" placeholder="As on your ID" />
            </Field>
            <Field id="f-email" label="Email" error="That doesn’t look like an email address.">
              <input
                id="f-email"
                type="email"
                defaultValue="hello@example"
                aria-invalid="true"
                aria-describedby="f-email-err"
              />
            </Field>
            <Field id="f-pickup" label="Pickup point">
              <select id="f-pickup">
                <option>Hebbal flyover</option>
                <option>Mekhri Circle</option>
                <option>Yelahanka</option>
              </select>
            </Field>
            <label className="check">
              <input type="checkbox" defaultChecked />
              <span>I can offer seats in my car</span>
            </label>
          </div>

          <div className="card comp-card">
            <h3 className="comp-title">Notice — info &amp; danger</h3>
            <Notice>
              <strong>Carry 2L of water.</strong> There are no shops after the base
              village — the last stretch is exposed rock.
            </Notice>
            <Notice variant="danger">
              <strong>Skandagiri needs a forest permit.</strong> Registrations close
              48 hours before the hike so we can file the list.
            </Notice>
            <p className="spec" style={{ marginTop: "1rem" }}>
              Notice-HoleTopLeft
            </p>
            <Notice hole="tl">
              <strong>The pools are optional.</strong> Swim only with others
              around, and never near the lip of the falls.
            </Notice>
            <p className="spec" style={{ marginTop: "1rem" }}>
              Notice-HoleTop
            </p>
            <Notice hole="top">
              <strong>Registration closes 48 hours before.</strong> We file the
              list with the forest department the evening before the hike.
            </Notice>
          </div>
        </div>
      </div>
    </section>
  );
}
