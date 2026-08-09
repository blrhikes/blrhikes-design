/* CtaPanel — the inverted sell. Ported FROM blrhikes-app (2026-08-08). The
   inversion is one custom property: the panel re-points --surface at ink, so
   the torn edge, border and shadow are the ordinary card's. */
import Btn from "./ui/Btn";

type Props = {
  title: string;
  blurb: string;
  cta: string;
  href: string;
};

export default function CtaPanel({ title, blurb, cta, href }: Props) {
  return (
    <section className="card cta-panel">
      <div className="cta-copy">
        <h2 className="display-2">{title}</h2>
        <p className="cta-blurb">{blurb}</p>
      </div>
      <Btn variant="primary" href={href}>
        {cta}
      </Btn>
    </section>
  );
}
