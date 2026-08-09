/* IconLine — one line of meta with a leading icon. `regular` picks the
   outline weight (the clock), everything else is solid.

   The `{" "}` after the icon is load-bearing and NOT cosmetic: the Astro
   source writes `</i> <slot />` with a literal space, and JSX drops whitespace
   between an element and an expression when a newline separates them. This is
   the exact defect the harness caught in TopBar during P1. */
import { useIcon } from "../icon-seam";

type Props = {
  icon: string;
  regular?: boolean;
  as?: "p" | "span";
  className?: string;
  children?: React.ReactNode;
};

export default function IconLine({
  icon,
  regular,
  as: Tag = "p",
  className,
  children,
}: Props) {
  const drawIcon = useIcon();
  return (
    <Tag className={["iconline", className].filter(Boolean).join(" ")}>
      {drawIcon(icon, { regular })}{" "}
      {children}
    </Tag>
  );
}
