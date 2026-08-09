/* SectionHead — the numbered eyebrow, the display heading and the note. */
type Props = {
  eyebrow: string;
  title: string;
  flush?: boolean;
  children?: React.ReactNode;
};

export default function SectionHead({ eyebrow, title, flush, children }: Props) {
  return (
    <header className="section-head" style={flush ? { marginBottom: "0" } : undefined}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-2">{title}</h2>
      {/* Astro's `Astro.slots.has("default")`; in React the children prop is
          the same question asked of the caller instead of the renderer. */}
      {children && <p className="section-note">{children}</p>}
    </header>
  );
}
