/* TravelForm — the rider's half of the travel section. Extracted from
   CarpoolSection (2026-08-08) so the app can adopt it; every prop defaults to
   the showcase's demo content, so the extraction changed nothing on the page.

   Uncontrolled controls (defaultChecked / defaultValue) where Astro writes
   bare `checked` / `selected` — React refuses a value without onChange, and
   both serialise to the same attributes. The app wraps this in a real PE
   <form>; here it is the static exhibit. */
import Field from "./ui/Field";
import Btn from "./ui/Btn";

type Mode = { value: string; title: string; note: string; checked?: boolean };
type Props = {
  modes?: Mode[];
  start?: string;
  vehicles?: string[];
  seats?: string[];
  seatsSelected?: string;
  notes?: string;
  cta?: string;
};

export default function TravelForm({
  modes = [
    { value: "needs_pickup", title: "Need a pickup", note: "Match me with a car", checked: true },
    { value: "driving", title: "Driving", note: "I can take others" },
    { value: "own_way", title: "Own way", note: "I’ll reach the base myself" },
  ],
  start = "5th block, Koramangala",
  vehicles = ["Car — 5 seats", "Car — 3 seats", "Bike — 1 pillion"],
  seats = ["0", "1", "2", "3", "4"],
  seatsSelected = "3",
  notes = "Sri Harsha and I are starting from the same location.",
  cta = "Save travel plan",
}: Props) {
  return (
    <form className="card carpool-form">
      <div className="mode-row" role="radiogroup" aria-label="Travel mode">
        {modes.map((m) => (
          <label className="mode-card" key={m.value}>
            <input type="radio" name="mode" value={m.value} defaultChecked={m.checked} />
            <strong>{m.title}</strong>
            <span>{m.note}</span>
          </label>
        ))}
      </div>

      <Field id="cp-start" label="Starting from">
        <input id="cp-start" type="text" defaultValue={start} />
      </Field>

      <label className="check">
        <input type="checkbox" defaultChecked />
        <span>Pick me up from where I start</span>
      </label>

      <div className="field-row">
        <Field id="cp-vehicle" label="Vehicle">
          <select id="cp-vehicle">
            {vehicles.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </Field>
        <Field id="cp-seats" label="Seats you can offer">
          <select id="cp-seats" defaultValue={seatsSelected}>
            {seats.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="cp-notes" label="Notes for the organiser">
        <textarea id="cp-notes" rows={2} defaultValue={notes} />
      </Field>

      <Btn variant="primary" type="button">
        {cta}
      </Btn>
    </form>
  );
}
