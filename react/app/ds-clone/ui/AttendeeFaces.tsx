/* AttendeeFaces — the overlapping initials stack. The count reads first, the
   "+N" disc carries the remainder, and each face sits in its own
   .face-shadow so the octagon clip can cast a shadow of the clipped shape.
   `as="span"` is for the stacks that sit inline inside a .cluster. */
type Props = {
  count: string;
  more?: string;
  faces: string[];
  size?: "sm";
  as?: "p" | "span";
  class?: string;
  label?: string;
  style?: React.CSSProperties;
};

export default function AttendeeFaces({
  count,
  more,
  faces,
  size,
  as: Tag = "p",
  class: klass,
  label,
  style,
}: Props) {
  const shadow = ["face-shadow", size === "sm" && "face-sm"].filter(Boolean).join(" ");

  return (
    <Tag className={["face-stack", klass].filter(Boolean).join(" ")} aria-label={label ?? count} style={style}>
      {count && <span className="going">{count}</span>}
      {more && <span className={shadow}><span className="face face-more">{more}</span></span>}
      {faces.map((f, i) => <span key={i} className={shadow}><span className="face">{f}</span></span>)}
    </Tag>
  );
}
