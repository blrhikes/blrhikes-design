/* TrailHero — the trail page's opening: the EventCover family (same backing
   tear, same copy stack) with the copy a trail needs — a subtitle of place
   instead of when/where rows, and children for the app's admin badge pills.
   Ported FROM blrhikes-app (2026-08-10). */
import { useIcon } from "./icon-seam";

type Props = {
  photo: string;
  alt: string;
  backHref: string;
  backLabel: string;
  eyebrow?: string;
  title: string;
  sub?: string;
  /** The showcase exhibit passes false — `.flush-top` sends the whole page's
      top bar transparent, which an exhibit must not do. */
  flush?: boolean;
  children?: React.ReactNode;
};

export default function TrailHero({ photo, alt, backHref, backLabel, eyebrow, title, sub, flush = true, children }: Props) {
  const drawIcon = useIcon();
  return (
    <header className={flush ? "ev-cover flush-top" : "ev-cover"} style={{ "--photo": `url('${photo}')` } as React.CSSProperties}>
      <div className="ev-cover-backing" aria-hidden="true"></div>
      <img className="photo" src={photo} alt={alt} />
      <div className="container">
        <div className="ev-cover-copy">
          <a className="ev-back" href={backHref}>{drawIcon("arrow-left")} {backLabel}</a>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="display-1">{title}</h1>
          {sub && <p className="ev-sub">{sub}</p>}
          {children}
        </div>
      </div>
    </header>
  );
}
