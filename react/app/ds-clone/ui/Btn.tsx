/* Btn — renders an <a> when given an href, a <button> otherwise. */
type Props = {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm";
  block?: boolean;
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  class?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
};

export default function Btn({
  variant = "primary",
  size,
  block,
  href,
  disabled,
  type,
  class: klass,
  children,
  ...rest
}: Props) {
  const cls = ["btn", `btn-${variant}`, size === "sm" && "btn-sm", block && "btn-block", klass]
    .filter(Boolean)
    .join(" ");

  return href ? (
    <a className={cls} href={href} {...rest}>{children}</a>
  ) : (
    <button className={cls} disabled={disabled} type={type} {...rest}>{children}</button>
  );
}
