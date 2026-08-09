/* The clone's document shell — the React half of BaseLayout.astro.

   BaseLayout does two jobs: it owns the <html> document AND it paints the
   page chrome (filters, top bar, main, footer). React Router owns the
   document from a single root route, so the split is: this file is the
   document, and `app/ds-clone/BaseLayout.tsx` is the chrome, rendered by each
   cloned page. The chrome's markup is what the harness diffs; nothing here
   below <body> except the outlet, so the two halves cannot double up.

   The CSS is the design repo's own files, imported by relative path and never
   copied — the whole point of the clone is that identical markup over
   identical CSS renders identically. Import ORDER is BaseLayout's, verbatim,
   for the reason its comments give: kraft-gold re-points kraft's accent and
   wins on order, torn-paper outranks every theme's tear, shadow-toggle
   outranks every theme's lift.

   The sixteen other themes are deliberately absent (plan §P1 "skip
   entirely"): the clone is a kraft-gold surface, hard-set on <html>, with no
   picker behaviour. Their stylesheets only declare `[data-theme=...]` blocks
   that nothing here matches, so leaving them out changes no paint. */
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "../../src/styles/base.css";
import "../../src/styles/themes/kraft.css";
import "../../src/styles/themes/kraft-gold.css";
import "../../src/styles/torn-paper.css";
import "../../src/styles/shadow-toggle.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="kraft-gold">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        {/* Same two stylesheets BaseLayout links. The harness strips <head>,
            so these exist for the owner's eyes: without them the clone would
            render in fallback fonts with no icons, and a "does it look
            right?" glance would be worthless. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600&family=DM+Sans:opsz,wght@9..40,400..500&family=IBM+Plex+Sans+Condensed:wght@500;600&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..500&family=Mulish:wght@400..600&family=Anton&family=Karla:ital,wght@0,400..700;1,400&family=Archivo:ital,wdth,wght@0,62..125,400..800;1,62..125,400..700&family=Chivo+Mono:wght@400;500&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Sans:ital,wght@0,400..600&family=Lora:ital,wght@0,400..600;1,400..500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
