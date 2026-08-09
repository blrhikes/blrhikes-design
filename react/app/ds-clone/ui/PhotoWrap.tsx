/* PhotoWrap — the cover of any card.

   The tear is a two-layer trick: the clean <img> is never filtered (a warped
   photograph reads as a mistake), and the SAME image is repainted behind it
   through the theme's photo filter via --photo, so the ragged bottom edge is
   made of backing pixels. `backing: false` drops the variable, which is how
   the flat exhibit card opts out. */
type Props = {
  photo: string;
  alt?: string;
  backing?: boolean;
  eager?: boolean;
  children?: React.ReactNode;
};

export default function PhotoWrap({ photo, alt = "", backing = true, eager, children }: Props) {
  return (
    <div
      className="photo-wrap"
      style={backing ? ({ "--photo": `url('${photo}')` } as React.CSSProperties) : undefined}
    >
      <img className="photo" src={photo} alt={alt} loading={eager ? "eager" : "lazy"} />
      {children}
    </div>
  );
}
