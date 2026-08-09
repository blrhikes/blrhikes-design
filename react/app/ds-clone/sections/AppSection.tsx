/* App surfaces — components that travelled the OTHER way: born in
   blrhikes-app, ported into the canon so the two stop drifting. */
import SectionHead from "../ui/SectionHead";
import Spec from "../ui/Spec";
import Btn from "../ui/Btn";
import PageHeader from "../PageHeader";
import CtaPanel from "../CtaPanel";

export default function AppSection() {
  return (
    <section className="section" id="app">
      <div className="container">
        <SectionHead eyebrow="08 · App surfaces" title="The app's own furniture">
          Ported <em>from</em> the app rather than to it — the surfaces every page
          shares, now spec'd here so there is one answer to what they look like.
        </SectionHead>

        <Spec doc="PageHeader">PageHeader — crumbs, kicker, title, actions on one baseline</Spec>
        <PageHeader
          crumbs={[{ label: "Events", href: "#" }, { label: "Skandagiri Sunrise Hike" }]}
          kicker="Upcoming hike"
          title="Skandagiri Sunrise Hike"
          sub="Sat 8 Aug · 04:30 at the base · 6 of 25 spots left"
          actions={
            <Btn variant="secondary" size="sm" href="#">
              Manage event
            </Btn>
          }
        />

        <Spec gap doc="CtaPanel">CtaPanel — the inverted sell, one action</Spec>
        <CtaPanel
          title="Adventure awaits"
          blurb="Membership unlocks the exact locations, GPX files and access notes for every documented trail — and gets you first pick of the trips."
          cta="What membership unlocks"
          href="#"
        />
      </div>
    </section>
  );
}
