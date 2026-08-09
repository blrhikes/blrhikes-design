/* HighlightTag row — what a trail has. Always one line deep: the htags port
   in scripts.ts measures the row and folds the overflow into a trailing "+N"
   chip, so the markup here just lists every tag. Each tag is an
   [icon, label] pair. */
import { useIcon } from "../icon-seam";
import type { Pair } from "../types";

export default function HighlightTags({ tags }: { tags: Pair[] }) {
  const drawIcon = useIcon();
  return (
    <div className="htags">{tags.map(([icon, label]) => (
      <span key={label} className="htag">{drawIcon(icon)}{label}</span>
    ))}</div>
  );
}
