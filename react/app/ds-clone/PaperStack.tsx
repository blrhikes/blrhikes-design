/* PaperStack — two sheets of torn paper, on purpose: a card whose content
   rides a second torn sheet inset within the first. Born as an accident on
   the app's trail page (2026-08-10) — StatBand's torn backing stacked inside
   the stats card — kept as a deliberate mechanism. Use sparingly: one per
   page, if that. */
type Props = {
  class?: string;
  children?: React.ReactNode;
};

export default function PaperStack({ class: klass, children }: Props) {
  const cls = ["card", "paper-stack", klass].filter(Boolean).join(" ");
  return (
    <section className={cls}>
      <div className="paper-sheet">{children}</div>
    </section>
  );
}
