/* StatStrip — the secondary numbers (length, climb, hiking time, drive) as
   one centered row between hairlines. The primary trio is StatBand's job.
   Each fact is {n, u?, l}: a display numeral, an optional unit riding small
   beside it, a mono label under. Ported FROM blrhikes-app (2026-08-10). */
type Props = {
  stats: { n: string; u?: string; l: React.ReactNode }[];
};

export default function StatStrip({ stats }: Props) {
  return (
    <div className="stat-strip">{stats.map(({ n, u, l }, i) => (
      <div className="sstat" key={i}>
        <span className="sstat-n">{n}{u && <span className="sstat-u"> {u}</span>}</span>
        <span className="sstat-l">{l}</span>
      </div>
    ))}</div>
  );
}
