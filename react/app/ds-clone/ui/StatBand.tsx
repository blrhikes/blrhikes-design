/* StatBand — the claims, as numbers. Each stat is a [number, label] pair; the
   sentence around them belongs to the page, not the band. `plain` drops the
   band's own paper for a band that already sits ON a card — paper on paper
   reads as a mistake (the app's trail page, 2026-08-10). */
import type { Pair } from "../types";

export default function StatBand({ stats, plain }: { stats: Pair[]; plain?: boolean }) {
  return (
    <div className={plain ? "stats stats-plain" : "stats"}>
      {stats.map(([n, l]) => (
        <div className="stat" key={l}>
          <span className="stat-n">{n}</span>
          <span className="stat-l">{l}</span>
        </div>
      ))}
    </div>
  );
}
