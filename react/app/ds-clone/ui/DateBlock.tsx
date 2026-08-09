/* DateBlock — the torn-off calendar chip. */
type Props = { mon: string; day: string; dow: string; label?: string };

export default function DateBlock({ mon, day, dow, label }: Props) {
  return (
    <div className="dateblock" aria-label={label ?? `${dow} ${day} ${mon}`}><span className="db-mon">{mon}</span><span className="db-day">{day}</span><span className="db-dow">{dow}</span></div>
  );
}
