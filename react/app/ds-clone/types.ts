/* The prop shapes the Astro components declare, transcribed. Kept in one file
   so a component's .tsx is only its markup — the thing being diffed. */

export type NavLink = { href: string; label: string; current?: boolean };

/* [icon, text] and [icon, text, note?] pairs, the design repo's own shape for
   the icon'd lists. */
export type IconItem = [string, string, string?];

/* [label, value] — trail stats, aside rows. */
export type Pair = [string, string];

export type Trail = {
  name: string;
  slug: string;
  photo: string;
  alt: string;
  grade: string;
  rating: string;
  where: string;
  compass: string;
  place: string;
  blurb: string;
  start: string;
  map: string;
  stats: Pair[];
  tags: Pair[];
};
