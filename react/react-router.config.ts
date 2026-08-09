import type { Config } from "@react-router/dev/config";

/* The clone exists to be diffed, so every cloned route is prerendered: the
   build drops a static .html file per route and `scripts/diff-pages.sh`
   compares it against the Astro build of the same page.
   Add a route here the moment it is cloned — a route that is not prerendered
   produces no file, and the harness reports it as missing rather than as
   passing. */
export default {
  ssr: true,
  prerender: ["/event", "/"],
} satisfies Config;
