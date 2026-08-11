/* EateryList — food stops on the way: name keyed by a diet dot, the toilet
   verdict as a tag, the address line the members gate may withhold, and an
   optional line of blurb. The list only — the section heading and its anchor
   belong to the page. `locked` swaps every address for the lock line: the
   gate holds per page, not per row. Ported FROM blrhikes-app (2026-08-10).

   `blurb` is a ReactNode on purpose (the EventFaq precedent): the exhibits
   pass strings, the app passes markdown rendered to elements. */
import { useIcon } from "./icon-seam";

export type Eatery = {
  name: string;
  veg: boolean;
  toilet: string;
  address?: string;
  addressHref?: string;
  blurb?: React.ReactNode;
};

type Props = {
  eateries: Eatery[];
  locked?: boolean;
};

export default function EateryList({ eateries, locked }: Props) {
  const drawIcon = useIcon();
  return (
    <ul className="eateries">{eateries.map((e) => (
      <li className="eatery" key={e.name}>
        <p className="eatery-name"><span className={e.veg ? "diet diet-veg" : "diet diet-nonveg"} title={e.veg ? "Vegetarian" : "Serves non-veg"}>{drawIcon("circle")}</span>{e.name}</p>
        <p className="eatery-tags"><span className="htag">{drawIcon("restroom")}{e.toilet}</span></p>
        {locked ? (
          <p className="eatery-addr">Address for members {drawIcon("lock")}</p>
        ) : (
          e.address && (
            <p className="eatery-addr">{e.address}{e.addressHref && <a href={e.addressHref}>map {drawIcon("up-right-from-square")}</a>}</p>
          )
        )}
        {/* A div, not a <p>: the app renders markdown into this slot, and
            block elements inside a <p> are invalid HTML the browser un-nests. */}
        {e.blurb && <div className="eatery-blurb">{e.blurb}</div>}
      </li>
    ))}</ul>
  );
}
