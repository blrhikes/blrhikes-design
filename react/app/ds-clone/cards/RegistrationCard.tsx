/* RegistrationCard — everything you need to decide and sign up, in one
   surface: the day, the price, the facts, who is leading, who is going, how
   full it is, and the button. One shape, rendered identically by the
   showcase's event section and by the real event page's rail — only the
   content and the `sticky` flag differ.

   The Astro original carries a scoped <style> block for `.rc-head` /
   `.rc-price` / `.rc-people`. Astro implements the scoping by hashing a
   `data-astro-cid-*` attribute onto every element in the file — a build
   artifact of Astro's, not something the design paints, so the normaliser
   strips it the same way it strips React's own SSR artifacts. The rules
   themselves are cloned verbatim into registration-card.css beside this file,
   unscoped: same three selectors, same page, and nothing else on it is called
   `.rc-head`. When the app adopts this component (P3) they move into
   theme.css under a numbered section. */
import Meter from "../ui/Meter";
import AttendeeFaces from "../ui/AttendeeFaces";
import PillLead from "../ui/PillLead";
import DateBlock from "../ui/DateBlock";
import Btn from "../ui/Btn";
import { useIcon } from "../icon-seam";
import type { Pair } from "../types";

import "./registration-card.css";

type Props = {
  /* The day, as the DateBlock beside the price — the card's first fact. */
  date?: { mon: string; day: string; dow: string; label?: string };
  price: string;
  unit?: string;
  /* Structured, not an HTML string: the price is data and the label is a
     translatable phrase, so the component does the bolding. */
  member?: { price: string; label?: string };
  rows?: Pair[];
  /* Name and role separate — "Led by" is a phrase a locale owns, the name is
     not. `role` defaults to "Led by". */
  lead?: { initials: string; name: string; role?: string };
  going?: { count: string; more?: string; faces: string[] };
  meter?: { taken: number; total: number; note: string };
  cta: string;
  ctaIcon?: string;
  /** When set AND the card is open, the CTA is a real link (`Btn` renders an
      <a>) instead of a button. Absent — the design repo's only case — the
      output is the unchanged <button>. A closed/full card stays a disabled
      button either way: a disabled state is a button concept, and a link that
      goes nowhere is worse than a button that says why. */
  ctaHref?: string;
  fine?: string;
  /* The commit surface's own state. "open" is a live button. "full" and
     "closed" render the button disabled — a card whose event still takes a
     waitlist is `open` with a waitlist `cta`, not `full`. */
  state?: "open" | "full" | "closed";
  /* Sticks to the viewport by default; pass false where the card already
     sits inside a sticky rail. */
  sticky?: boolean;
  class?: string;
};

export default function RegistrationCard({
  date,
  price,
  unit,
  member,
  rows,
  lead,
  going,
  meter,
  cta,
  ctaIcon,
  ctaHref,
  fine,
  state = "open",
  sticky = true,
  class: klass,
}: Props) {
  const drawIcon = useIcon();
  const open = state === "open";
  const cls = ["card", "aside-card", !sticky && "aside-card--static", klass]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={cls}>
      <div className="rc-head">
        {date && <DateBlock {...date} />}
        <div className="rc-price">
          <p className="price-big">{price}{unit && <> <span className="mono">{unit}</span></>}</p>
          {member && <p className="fine">{member.label ?? "Members pay"} <strong>{member.price}</strong></p>}
        </div>
      </div>

      {rows && (
        <dl className="aside-rows">
          {rows.map(([label, value]) => (
            <div key={label} className="aside-row"><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      )}

      {(lead || going) && (
        <div className="rc-people">
          {lead && <PillLead initials={lead.initials}>{lead.role ?? "Led by"} {lead.name}</PillLead>}
          {going && <AttendeeFaces as="span" {...going} />}
        </div>
      )}

      {meter && (
        <>
          <Meter taken={meter.taken} total={meter.total} />
          <p className="fine meter-note">{meter.note}</p>
        </>
      )}

      <Btn variant="primary" block disabled={!open} href={open && ctaHref ? ctaHref : undefined}>{cta}{open && ctaIcon && <> {drawIcon(ctaIcon)}</>}</Btn>
      {fine && <p className="fine">{fine}</p>}
    </aside>
  );
}
