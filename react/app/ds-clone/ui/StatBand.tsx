/* StatBand — the claims, as numbers. Each stat is a [number, label] pair; the
   sentence around them belongs to the page, not the band. */
import type { Pair } from "../types";

export default function StatBand({ stats }: { stats: Pair[] }) {
  return (
    <div className="stats">
      {stats.map(([n, l]) => (
        <div className="stat" key={l}>
          <span className="stat-n">{n}</span>
          <span className="stat-l">{l}</span>
        </div>
      ))}
    </div>
  );
}
