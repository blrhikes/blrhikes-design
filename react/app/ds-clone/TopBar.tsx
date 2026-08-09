/* The sticky top bar. `themePicker` adds the paint-roller toggle and the
   panel — only the showcase carries it; the event page and the lab are
   kraft-only surfaces.

   Below 56rem the inline nav gives way to a drawer (see NavDrawer.tsx). The
   theme toggle deliberately does NOT go into the drawer: it is the point of
   this site, its panel is a full-width band under the bar rather than a nav
   item, and burying the one control everything else exists to demonstrate
   behind a hamburger would be the wrong trade. So the bar keeps two controls
   at small widths — theme, then menu. */
import ThemePicker from "./ThemePicker";
import NavDrawer from "./NavDrawer";
import type { NavLink } from "./types";

type Props = {
  links: NavLink[];
  brandHref?: string;
  themePicker?: boolean;
};

export default function TopBar({ links, brandHref = "#top", themePicker }: Props) {
  return (
    <>
      <header className="topbar">
        <div className="container topbar-row">
          <a className="brand" href={brandHref}>BLR<span> Hikes</span></a>
          <nav className="nav-links" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href} aria-current={l.current ? "page" : undefined}>{l.label}</a>
            ))}
          </nav>
          <div className="topbar-ctl">
            {themePicker && (
              <button className="tp-toggle" id="theme-toggle" aria-expanded="false" aria-controls="themepicker">
                {/* An explicit space, because JSX would eat the line break
                    and butt the label against the icon. The harness caught
                    exactly this. */}
                <i className="fa-solid fa-paint-roller" aria-hidden="true"></i>{" "}
                Theme
              </button>
            )}
            <button
              className="nav-toggle"
              id="nav-toggle"
              aria-expanded="false"
              aria-controls="nav-drawer"
              aria-label="Open menu"
            >
              <i className="fa-solid fa-bars" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        {themePicker && <ThemePicker />}
      </header>

      <NavDrawer links={links} brandHref={brandHref} />
    </>
  );
}
