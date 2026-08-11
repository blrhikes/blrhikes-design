/* GateNote — the members gate, kept warm: a dashed boundary, a lock in the
   accent, one short paragraph of why, room for a single CTA. An invitation
   rather than an error. Ported FROM blrhikes-app (2026-08-10). */
import { useIcon } from "./icon-seam";

type Props = {
  children?: React.ReactNode;
  cta?: React.ReactNode;
};

export default function GateNote({ children, cta }: Props) {
  const drawIcon = useIcon();
  return (
    <div className="gate-note">
      {drawIcon("lock")}
      <p className="gate-copy">{children}</p>
      {cta && <p className="gate-cta">{cta}</p>}
    </div>
  );
}
