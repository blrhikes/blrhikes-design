/* TrailLinks — trek start, map and the GPX download.

   Each link renders only when its value is non-empty. The design repo always
   passes all three, so its output is unchanged; the app passes "" for what a
   viewer may not have — the trek start behind the exact-coordinates gate, the
   GPX behind membership — and an absent link is honest where a link to
   nowhere is not. */
import { useIcon } from "../icon-seam";

type Props = { start: string; map: string; slug: string };

export default function TrailLinks({ start, map, slug }: Props) {
  const drawIcon = useIcon();
  return (
    <div className="trail-links">
      {start && <a className="trail-link" href={`https://www.google.com/maps/search/?api=1&query=${start}`}>{drawIcon("person-hiking")}Trek start</a>}
      {map && <a className="trail-link" href={map}>{drawIcon("map")}Map</a>}
      {slug && <a className="trail-link" href={`/gpx/${slug}.gpx`} download>{drawIcon("file-arrow-down")}GPX</a>}
    </div>
  );
}
