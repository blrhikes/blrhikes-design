/* The icon seam — how the app substitutes its inline-SVG icons into otherwise
   canonical markup without the design repo ever knowing.

   Owner decision (2026-08-08, P3 start): icons are a blessed divergence. The
   design repo draws Font Awesome `<i>` tags; blrhikes-app vendors inline SVG
   with no CDN and keeps doing so. Rather than blessing a diff rule per icon
   per page, every synced component asks THIS context how to draw an icon.

   The contract that keeps the harness honest: the DEFAULT renderer emits the
   byte-identical `<i class="fa-…">` the components used to hardcode, so the
   clone's prerendered HTML — which is what `pnpm diff` compares — is unchanged
   by the seam's existence. Only a consumer that mounts a provider (the app)
   sees different markup, and that consumer is not under the harness.

   `regular` picks the outline weight (the clock, the calendar); everything
   else is solid, exactly as before. */
import { createContext, useContext } from "react";

export type IconOpts = { regular?: boolean };
export type IconRenderer = (name: string, opts?: IconOpts) => React.ReactNode;

export const defaultIconRenderer: IconRenderer = (name, opts) => (
  <i className={`fa-${opts?.regular ? "regular" : "solid"} fa-${name}`} aria-hidden="true"></i>
);

export const IconContext = createContext<IconRenderer>(defaultIconRenderer);

export function useIcon(): IconRenderer {
  return useContext(IconContext);
}
