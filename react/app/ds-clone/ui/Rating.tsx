/* Rating — a star and a number. `onPhoto` switches to the white-on-photo
   paint, since a photograph has no colour scheme to key off. */
import { useIcon } from "../icon-seam";

type Props = { value: string; onPhoto?: boolean };

export default function Rating({ value, onPhoto }: Props) {
  const drawIcon = useIcon();
  return (
    <span className={["rating", onPhoto && "rating-on-photo"].filter(Boolean).join(" ")}>{drawIcon("star")}{value}</span>
  );
}
