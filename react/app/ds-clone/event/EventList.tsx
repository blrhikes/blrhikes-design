/* The event page's icon'd list. `variant` picks the included/not-included
   paint; each item is [icon, text, note?]. */
import { useIcon } from "../icon-seam";
import type { IconItem } from "../types";

type Props = { variant?: "yes" | "no"; items: IconItem[] };

export default function EventList({ variant, items }: Props) {
  const drawIcon = useIcon();
  return (
    <ul className={["ev-list", variant && `ev-list--${variant}`].filter(Boolean).join(" ")}>
      {items.map(([icon, text, note]) => (
        <li key={text}>
          {drawIcon(icon)}
          <span>{text}{note && <span className="note"> — {note}</span>}</span>
        </li>
      ))}
    </ul>
  );
}
