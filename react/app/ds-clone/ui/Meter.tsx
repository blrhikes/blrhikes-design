/* Meter — how full an event is. */
type Props = { taken: number; total: number };

export default function Meter({ taken, total }: Props) {
  const pct = Math.round((taken / total) * 100);
  return (
    <div className="meter" role="img" aria-label={`${taken} of ${total} spots taken`}>
      {/* A string, not `{ width: pct }`: React appends "px" to a bare number
          on a dimensional property, which would silently make the fill 35px
          wide instead of 35%. */}
      <div className="meter-fill" style={{ width: `${pct}%` }}></div>
    </div>
  );
}
