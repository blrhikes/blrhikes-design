import { type RouteConfig, route } from "@react-router/dev/routes";

/* Cloned pages only, at the Astro build's own paths so the harness can pair
   them by path. Anything not cloned yet simply is not here.

   404 is deliberately absent — parked by the owner, 2026-08-08. It would have
   been P0's trivial acceptance page; the event page carries that job instead. */
export default [
  route("event", "routes/event.tsx"),
  route("/", "routes/index.tsx"),
] satisfies RouteConfig;
