/* BaseLayout's chrome — the part of src/layouts/BaseLayout.astro that lives
   below <body>. The document half is app/root.tsx; see the note there for why
   the file is split in two.

   The client scripts run from an effect, after mount, so they cannot touch
   what the harness compares. */
import { useEffect } from "react";
import PaperFilters from "./PaperFilters";
import TopBar from "./TopBar";
import SiteFooter from "./SiteFooter";
import { htags, navDrawer } from "./scripts";
import type { NavLink } from "./types";

type Props = {
  links: NavLink[];
  brandHref?: string;
  themePicker?: boolean;
  mainId?: string;
  footer?: "band" | "quiet" | "none";
  footerNote?: React.ReactNode;
  /** BaseLayout.astro's `<slot name="after" />` — outside <main>, after the footer. */
  after?: React.ReactNode;
  children: React.ReactNode;
};

export default function BaseLayout({
  links,
  brandHref,
  themePicker,
  mainId,
  footer = "band",
  footerNote,
  after,
  children,
}: Props) {
  useEffect(() => {
    const teardown = [htags(), navDrawer()];
    return () => teardown.forEach((fn) => fn());
  }, []);

  return (
    <>
      <PaperFilters />

      <TopBar links={links} brandHref={brandHref} themePicker={themePicker} />

      <main id={mainId}>{children}</main>

      {footer !== "none" && <SiteFooter variant={footer}>{footerNote}</SiteFooter>}

      {/* BaseLayout.astro's `<slot name="after" />`, which sits outside <main>
          and after the footer — where the showcase index hangs its PageNav. */}
      {after}
    </>
  );
}
