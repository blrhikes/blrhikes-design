/* Pill — the status/type chip. `variant` maps to the pill-* modifier the
   theme paints; `icon` is a Font Awesome solid name, drawn through the icon
   seam. */
import { useIcon } from "../icon-seam";

type Props = {
  variant?: "live" | "full" | "member" | "ok" | "on-photo";
  icon?: string;
  class?: string;
  children?: React.ReactNode;
};

export default function Pill({ variant, icon, class: klass, children }: Props) {
  const drawIcon = useIcon();
  const cls = ["pill", variant && `pill-${variant}`, klass].filter(Boolean).join(" ");
  return <span className={cls}>{icon && drawIcon(icon)}{children}</span>;
}
