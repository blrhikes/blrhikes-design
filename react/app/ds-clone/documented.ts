/* Which components have a written entry in COMPONENTS.md — the clone's port of
   src/data/documented.js.

   This is the ONE data module the clone cannot import verbatim, and the reason
   is worth stating so nobody "fixes" it back. The Astro version reads the file
   with `node:fs` at build time, which is fine for Astro (that code only ever
   runs on the server) but not here: `Spec` ships in the client bundle too, and
   Vite externalises `node:fs`/`node:url` for the browser, so the build fails
   outright on `fileURLToPath`.

   The property that matters is kept exactly: the list is still derived FROM
   COMPONENTS.md at build time, never hand-written, so the mark on the page
   cannot claim an entry that isn't there. `?raw` inlines the file's text into
   both bundles, which works everywhere and needs no filesystem at runtime.
   The parsing below is transcribed line for line. */
import source from "../../../COMPONENTS.md?raw";

const headings = source
  .split("\n")
  .filter((l) => l.startsWith("## "))
  .map((l) => l.slice(3).replace(/\*\(.*\)\*/, "").trim());

export const documented = new Set(headings);

/* The anchor GitHub and most markdown renderers generate for that heading. */
export function anchor(name: string): string {
  return "#" + name.toLowerCase().replace(/[^a-z0-9-]/g, "");
}

export function isDocumented(name: string): boolean {
  return documented.has(name);
}
