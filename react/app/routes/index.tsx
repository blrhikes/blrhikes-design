/* Clone of src/pages/index.astro — the showcase index (P2).

   Same composition, same order, same props. The eight bands are each their own
   section component, exactly as in the Astro page, so a difference the harness
   reports points at one band rather than at "the page". */
import BaseLayout from "../ds-clone/BaseLayout";
import PageNav from "../ds-clone/PageNav";
import HeroSection from "../ds-clone/sections/HeroSection";
import PaletteSection from "../ds-clone/sections/PaletteSection";
import TypeSection from "../ds-clone/sections/TypeSection";
import ComponentsSection from "../ds-clone/sections/ComponentsSection";
import EventSurfacesSection from "../ds-clone/sections/EventSurfacesSection";
import CarpoolSection from "../ds-clone/sections/CarpoolSection";
import TrailsSection from "../ds-clone/sections/TrailsSection";
import EdgesSection from "../ds-clone/sections/EdgesSection";
import AppSection from "../ds-clone/sections/AppSection";
import { showcaseLinks } from "../../../src/data/nav.js";
import type { NavLink } from "../ds-clone/types";

export function meta() {
  return [{ title: "BLR Hikes — theme explorations" }];
}

export default function IndexPage() {
  return (
    <BaseLayout
      links={showcaseLinks as NavLink[]}
      themePicker
      mainId="top"
      footerNote={
        <>
          Theme explorations · fifteen skins over one token contract · content &amp;
          images from the app’s seed data · themes via the paint-roller, or the
          number row and the punctuation keys after it
        </>
      }
      after={<PageNav />}
    >
      <HeroSection />
      <PaletteSection />
      <TypeSection />
      <ComponentsSection />
      <EventSurfacesSection />
      <CarpoolSection />
      <TrailsSection />
      <EdgesSection />
      <AppSection />
    </BaseLayout>
  );
}
