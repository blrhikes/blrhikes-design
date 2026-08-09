/* The event cover, full bleed, running under the top bar. Same split the
   cards use: the clean <img> is never filtered, and the SAME image is
   repainted behind it so the ragged bottom edge is backing pixels. */
import Pill from "../ui/Pill";
import { useIcon } from "../icon-seam";

type Props = {
  photo: string;
  alt: string;
  eyebrow: string;
  title: string;
  when: string;
  where: string;
  spots: string;
  /** Where "All events" points. Defaults to the design repo's own "/" so the
      prerendered clone stays byte-identical; the app passes its real route. */
  backHref?: string;
};

export default function EventCover({ photo, alt, eyebrow, title, when, where, spots, backHref = "/" }: Props) {
  const drawIcon = useIcon();
  return (
    <header className="ev-cover flush-top" style={{ "--photo": `url('${photo}')` } as React.CSSProperties}>
      <div className="ev-cover-backing" aria-hidden="true"></div>
      <img className="photo" src={photo} alt={alt} />
      <div className="container">
        <div className="ev-cover-copy">
          <a className="ev-back" href={backHref}>{drawIcon("arrow-left")} All events</a>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-1">{title}</h1>
          <p className="ev-when">
            <span>{drawIcon("calendar", { regular: true })} {when}</span>
            <span>{drawIcon("location-dot")} {where}</span>
          </p>
          {/* pill-on-photo, not pill-live: the theme's accent tokens are dark
              ink on a light tint, which vanishes on a photograph. */}
          <p><Pill variant="on-photo">{spots}</Pill></p>
        </div>
      </div>
    </header>
  );
}
