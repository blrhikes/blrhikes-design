/* ActionTile — one way out of the page and into the field: a leading icon,
   a label over a line of fine print, the arrow that says it goes somewhere.
   `disabled` renders the same tile as an inert button. The page composes
   tiles in an `.action-tiles` grid; the tile is the component. Ported FROM
   blrhikes-app (2026-08-10). */
import { useIcon } from "./icon-seam";

type Props = {
  label: string;
  icon: string;
  note?: string;
  href?: string;
  download?: boolean;
  disabled?: boolean;
  /** App seam: render the tile as a router <Link>-style element instead of a
      bare <a>. Given `linkTo`, the app's wrapper supplies navigation; the
      clone never passes it, so prerendered HTML is untouched. */
  render?: (className: string, children: React.ReactNode) => React.ReactElement;
};

export default function ActionTile({ label, icon, note, href, download, disabled, render }: Props) {
  const drawIcon = useIcon();
  const body = (
    <>
      {drawIcon(icon)}
      <span className="tile-copy">
        <span className="tile-label">{label}</span>
        {note && <span className="tile-note">{note}</span>}
      </span>
      <span className="tile-go">{drawIcon("arrow-right")}</span>
    </>
  );
  if (disabled) {
    return (
      <button type="button" className="action-tile" disabled>
        {body}
      </button>
    );
  }
  if (render) return render("action-tile", body);
  return (
    <a className="action-tile" href={href} download={download}>
      {body}
    </a>
  );
}
