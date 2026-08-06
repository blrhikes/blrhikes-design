/* Which components have a written entry in COMPONENTS.md.

   Read from the file at build time rather than kept as a hand-written list,
   so the mark on the page can never claim an entry that isn't there — or miss
   one that is. Adding a `## Name` heading to COMPONENTS.md is all it takes. */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const path = fileURLToPath(new URL("../../COMPONENTS.md", import.meta.url));

const headings = readFileSync(path, "utf8")
  .split("\n")
  .filter((l) => l.startsWith("## "))
  .map((l) => l.slice(3).replace(/\*\(.*\)\*/, "").trim());

export const documented = new Set(headings);

/* The anchor GitHub and most markdown renderers generate for that heading. */
export function anchor(name) {
  return "#" + name.toLowerCase().replace(/[^a-z0-9-]/g, "");
}

export function isDocumented(name) {
  return documented.has(name);
}
