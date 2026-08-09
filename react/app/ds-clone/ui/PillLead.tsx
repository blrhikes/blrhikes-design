/* PillLead — the one pill that carries a person: a label with that person's
   face sitting in the pill's trailing cap, edge to edge, so the disc IS the
   pill's right end. `.pill-lead` in base.css owns the shape.

   A component rather than the markup copied twice, because the nesting is
   fiddly and load-bearing: the face rides inside `.face-shadow`, whose
   `drop-shadow()` traces the disc's real silhouette, and the wrapper's lift is
   turned OFF here (the pill is already the surface it would lift from). Two
   hand-written copies would drift the first time either detail changed.

   The label is the slot, since the two callers spell it differently: the
   prominent card composes it from the event's lead name, the registration card
   is handed the whole line. */
import Pill from "./Pill";

type Props = { initials: string; class?: string; children?: React.ReactNode };

export default function PillLead({ initials, class: klass, children }: Props) {
  /* No whitespace between the label and the face: the gap is `.pill-lead`'s,
     and a text node here would add a second one the disc cannot close. */
  return (
    <Pill variant="member" class={["pill-lead", klass].filter(Boolean).join(" ")}>{children}<span className="face-shadow"><span className="face">{initials}</span></span></Pill>
  );
}
