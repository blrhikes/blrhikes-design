/* SeatRow — the seats in a car AND the people in them, one row of circles.
   A filled seat is a face disc carrying the rider's initials (a solid disc
   when no initials are given); a free seat is a dotted outline — an absence
   with a shape, so the distinction survives monochrome.

   `driver` (an initial) draws the driver as the first seat, distinct from the
   riders, because the driver occupies one and a manifest that hides that
   over-promises by a seat. `filled` counts riders only when a driver is shown,
   and `faces` (rider initials, in seat order) labels the filled seats. Riders
   past the rider seats render as danger seats — over-capacity is a fact worth
   drawing, not clamping away.

   The four groups sit flush against each other with no whitespace between the
   expressions, matching the Astro source: `.seats` is an inline-flex row and a
   stray text node between the spans would open a gap the CSS never asked for.
   JSX strips whitespace that contains a newline, so the line breaks below are
   safe — a SPACE on one line would not be. */
type Props = {
  filled: number;
  total: number;
  driver?: string;
  faces?: string[];
};

export default function SeatRow({ filled, total, driver, faces = [] }: Props) {
  const riderSeats = driver ? Math.max(0, total - 1) : total;
  const taken = Math.min(filled, riderSeats);
  const free = Math.max(0, riderSeats - filled);
  const over = Math.max(0, filled - riderSeats);
  const label = driver
    ? `driver plus ${filled} of ${riderSeats} rider seats filled${over ? `, ${over} over capacity` : ""}`
    : `${filled} of ${total} seats filled${over ? `, ${over} over capacity` : ""}`;

  return (
    <div className="seats" role="img" aria-label={label}>
      {driver && <span className="seat seat-driver">{driver}</span>}
      {Array.from({ length: taken }, (_, i) => (
        <span className="seat" key={`t${i}`}>
          {faces[i]}
        </span>
      ))}
      {Array.from({ length: free }, (_, i) => (
        <span className="seat seat-free" key={`f${i}`} />
      ))}
      {Array.from({ length: over }, (_, i) => (
        <span className="seat seat-over" key={`o${i}`}>
          {faces[taken + i]}
        </span>
      ))}
    </div>
  );
}
