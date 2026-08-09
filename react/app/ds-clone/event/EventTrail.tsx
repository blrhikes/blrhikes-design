/* The trail the hike follows, above the article. A TrailCardOverlay rather
   than a TrailCard: at the article's width the cover is big enough to carry
   the name and the fixed facts on it, which is exactly the density that
   variant was drawn for. */
import TrailCardOverlay from "../cards/TrailCardOverlay";
import { emeraldFallsCircuit } from "../../../../src/data/trails.js";
import type { Trail } from "../types";

export default function EventTrail() {
  return (
    <div className="ev-trail">
      <p className="ev-block-title ev-block-title--gap">We’re going here:</p>
      <div className="trail-grid trail-grid--wide">
        <TrailCardOverlay trail={emeraldFallsCircuit as Trail} />
      </div>
    </div>
  );
}
