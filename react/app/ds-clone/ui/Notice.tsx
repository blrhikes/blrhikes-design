/* Notice — the boxed aside. `variant` picks the danger paint; `hole` punches
   the torn-out corner or top edge the kraft theme draws. */
type Props = {
  variant?: "danger";
  hole?: "tl" | "top";
  class?: string;
  children?: React.ReactNode;
};

export default function Notice({ variant, hole, class: klass, children }: Props) {
  const holeClass = hole === "tl" ? "notice-hole-tl" : hole === "top" ? "notice-hole-top" : null;
  const cls = ["notice", variant && `notice-${variant}`, holeClass, klass].filter(Boolean).join(" ");
  return <div className={cls}>{children}</div>;
}
