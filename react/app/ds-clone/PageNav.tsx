/* PageNav — floating, collapsible, scroll-spied. Sits clear of the sticky
   topbar in the opposite corner so neither ever covers the other.

   The behaviour (toggle, scroll-spy) lives in the page's client script, as it
   does in Astro — this renders the collapsed markup and nothing else, so the
   prerendered HTML the harness sees is the same on both sides. */
import { pageNavItems } from "../../../src/data/nav.js";

export default function PageNav() {
  return (
    <nav className="pagenav" id="pagenav" aria-label="On this page">
      <button
        className="pagenav-toggle"
        id="pagenav-toggle"
        aria-expanded="false"
        aria-controls="pagenav-list"
      >
        <i className="fa-solid fa-list-ul" aria-hidden="true" />
        <span className="pagenav-toggle-label">On this page</span>
      </button>
      <ol className="pagenav-list" id="pagenav-list" hidden>
        {pageNavItems.map((item: any) => (
          <li key={item.href}>
            <a href={item.href}>
              <span className="pagenav-n">{item.n}</span>
              {item.label}
            </a>
          </li>
        ))}
        <li className="pagenav-away">
          <a href="/event/">
            <span className="pagenav-n">
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            </span>
            Event page
          </a>
        </li>
        <li className="pagenav-away">
          <a href="/tear-lab/">
            <span className="pagenav-n">
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            </span>
            Tear lab
          </a>
        </li>
      </ol>
    </nav>
  );
}
