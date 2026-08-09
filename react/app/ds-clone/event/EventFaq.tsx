/* Before you ask — the folds at the bottom of the article.

   `a` is ReactNode rather than string so a consumer with rich answers (the
   app's policies are markdown) can pass rendered content; a plain string —
   which is all the design repo ever passes — serialises identically. */
import { useIcon } from "../icon-seam";

type Props = { items: { icon: string; q: string; a: React.ReactNode }[] };

export default function EventFaq({ items }: Props) {
  const drawIcon = useIcon();
  return (
    <>
      {items.map((f) => (
        <details key={f.q} className="ev-fold">
          <summary>{drawIcon(f.icon)}{" "}{f.q}</summary>
          <div><p>{f.a}</p></div>
        </details>
      ))}
    </>
  );
}
