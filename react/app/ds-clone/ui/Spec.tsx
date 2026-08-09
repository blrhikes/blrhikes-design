/* Spec — the small label naming the component being shown.

   `doc` names the component the label is about. If COMPONENTS.md has an entry
   under that exact heading, the label gets a mark linking to it; if it does
   not, the mark is simply absent. The check is against the file itself, so
   the page cannot claim documentation that was never written.

   Showcase-only, and deliberately NOT syncable into blrhikes-app: the app has
   no use for doc-links. Note this reads the clone's own `documented.ts` rather
   than `src/data/documented.js` — see that file for why it is the one data
   module that could not be imported verbatim. */
import { isDocumented, anchor } from "../documented";

type Props = {
  onPhoto?: boolean;
  gap?: boolean;
  doc?: string;
  children?: React.ReactNode;
};

export default function Spec({ onPhoto, gap, doc, children }: Props) {
  /* Narrowed to the name itself rather than a boolean, so `anchor(documented)` below
     type-checks without an assertion. Same condition, same output. */
  const documented: string | null = doc && isDocumented(doc) ? doc : null;
  return (
    <p
      className={["spec", onPhoto && "spec-on-photo"].filter(Boolean).join(" ")}
      style={gap ? { marginTop: "2rem" } : undefined}
    >
      {children}
      {documented && (
        <a
          className="spec-doc"
          href={`https://github.com/shreshthmohan/blrhikes-design/blob/main/COMPONENTS.md${anchor(documented)}`}
          title={`${documented} has an entry in COMPONENTS.md`}
        >
          spec’d
        </a>
      )}
    </p>
  );
}
