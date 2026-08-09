/* PageHeader — what every app page opens with when it has no photographic
   cover. Ported FROM blrhikes-app (2026-08-08) — the first component to
   travel that direction. No background and no bottom rule on purpose: a page
   heading, not a bar. The page provides the container. */
type Crumb = { label: string; href?: string };
type Props = {
  crumbs?: Crumb[];
  kicker?: string;
  title: string;
  sub?: string;
  /** The Astro side's `<slot name="actions" />`. */
  actions?: React.ReactNode;
};

export default function PageHeader({ crumbs = [], kicker, title, sub, actions }: Props) {
  return (
    <header className="page-head">
      <div className="page-head-copy">
        {crumbs.length > 0 && (
          <nav className="crumbs" aria-label="Breadcrumb">
            {crumbs.map((c) =>
              c.href ? (
                <span className="crumb" key={c.label}>
                  <a href={c.href}>{c.label}</a>
                  <span className="crumbs-sep" aria-hidden="true">/</span>
                </span>
              ) : (
                <span className="crumb" aria-current="page" key={c.label}>{c.label}</span>
              ),
            )}
          </nav>
        )}
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h1 className="display-2">{title}</h1>
        {sub && <p className="fine page-head-sub">{sub}</p>}
      </div>
      {actions && <div className="page-head-actions">{actions}</div>}
    </header>
  );
}
