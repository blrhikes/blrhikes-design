/* TrailStats — the mono facts strip. Each stat is a [label, value] pair. */
import type { Pair } from "../types";

export default function TrailStats({ stats }: { stats: Pair[] }) {
  return (
    <dl className="trail-stats mono">{stats.map(([label, value]) => (
      <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
    ))}</dl>
  );
}
