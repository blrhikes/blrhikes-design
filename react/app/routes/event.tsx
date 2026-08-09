/* The event detail surface — src/pages/event.astro.

   The first page of the clone and the one the whole loop is proved on: it is
   the richest surface in the system (cover, article, rail, registration card,
   trail overlay card) and the one the app adopts first at P3. */
import BaseLayout from "../ds-clone/BaseLayout";
import EventCover from "../ds-clone/event/EventCover";
import EventArticle from "../ds-clone/event/EventArticle";
import EventTrail from "../ds-clone/event/EventTrail";
import EventRail from "../ds-clone/event/EventRail";
import { eventLinks } from "../../../src/data/nav.js";
import { cover } from "../../../src/data/images.js";
import type { NavLink } from "../ds-clone/types";

/* Imported here, not in root: event.astro imports it after BaseLayout's
   sheets, and the cascade is order-sensitive by design. A route module's CSS
   lands after the root's for the same reason. */
import "../../../src/styles/event.css";

export function meta() {
  return [{ title: "Fern Gully Sunrise Hike · BLR Hikes" }];
}

export default function EventPage() {
  return (
    <BaseLayout
      links={eventLinks as NavLink[]}
      brandHref="/"
      themePicker
      footer="quiet"
      footerNote="Event detail surface · content from the app's dev data · themes via the paint-roller"
    >
      <EventCover
        photo={cover("297a66e4-5885-427b-b68d-724c0395dac9", 1600)}
        alt="First light over the fern gullies"
        eyebrow="Upcoming hike"
        title="Fern Gully Sunrise Hike"
        when="Thu, 13 Aug 2026, 5:00 am"
        where="Emerald Hills, south-west"
        spots="13 of 20 spots left"
      />

      <div className="container ev-main">
        <div className="ev-col">
          <EventTrail />
          <EventArticle />
        </div>

        <EventRail />
      </div>
    </BaseLayout>
  );
}
