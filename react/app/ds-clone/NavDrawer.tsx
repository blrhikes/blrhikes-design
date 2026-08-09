/* NavDrawer — the small-viewport menu.

   A <dialog> opened with showModal(), which buys three things a hand-rolled
   drawer has to reimplement (usually badly): the ::backdrop scrim, Escape to
   close, and the rest of the page going inert while it is open. The port of
   nav-drawer.js in scripts.ts adds only what the element does not do itself.

   It renders as a SIBLING of <header>, not inside it: `.topbar` carries a
   backdrop-filter, which makes it the containing block for anything fixed
   within it. A modal dialog is in the top layer and escapes that anyway, but
   the markup should not quietly depend on a rescue.

   The links are the same array the inline nav paints, rendered twice rather
   than moved: one of the two is `display: none` at any given width, so only
   one reaches the accessibility tree, and neither can drift from the other.

   No theme control here on purpose — see the note in TopBar.tsx.

   `data-nav-close=""` rather than a bare `data-nav-close`: React serialises a
   valueless JSX prop on a data-* attribute as `="true"`, which is a different
   string from the one Astro writes. `[data-nav-close]` matches either, so this
   is spelling, not behaviour — but the clone's job is to emit the same bytes. */
import type { NavLink } from "./types";

type Props = { links: NavLink[]; brandHref?: string };

export default function NavDrawer({ links, brandHref = "#top" }: Props) {
  return (
    <dialog className="nav-drawer" id="nav-drawer" aria-label="Menu">
      <div className="nav-drawer-head">
        <a className="brand" href={brandHref} data-nav-close="">BLR<span> Hikes</span></a>
        <button className="nav-close" data-nav-close="" aria-label="Close menu">
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <nav className="nav-drawer-links" aria-label="Menu">
        {links.map((l) => (
          <a key={l.href} href={l.href} aria-current={l.current ? "page" : undefined}>
            <span>{l.label}</span>
            <i className="fa-solid fa-arrow-right-long" aria-hidden="true"></i>
          </a>
        ))}
      </nav>
    </dialog>
  );
}
