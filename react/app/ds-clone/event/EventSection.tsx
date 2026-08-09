/* One block of the event article: an icon'd heading and whatever follows. */
import { useIcon } from "../icon-seam";

type Props = { icon: string; regular?: boolean; title: string; children?: React.ReactNode };

export default function EventSection({ icon, regular, title, children }: Props) {
  const drawIcon = useIcon();
  return (
    <section>
      <h2 className="ev-sec-title">{drawIcon(icon, { regular })} {title}</h2>
      {children}
    </section>
  );
}
