/* The page foot. The showcase uses the .footer band; the event page uses the
   quieter .site-foot. */
type Props = { variant?: "band" | "quiet"; children?: React.ReactNode };

export default function SiteFooter({ variant = "band", children }: Props) {
  return variant === "band" ? (
    <footer className="footer">
      <div className="container footer-row">
        <p className="brand-foot">BLR Hikes</p>
        <p className="fine">{children}</p>
      </div>
    </footer>
  ) : (
    <footer className="site-foot">
      <div className="container">
        <p className="brand-foot">BLR Hikes</p>
        <p className="fine">{children}</p>
      </div>
    </footer>
  );
}
