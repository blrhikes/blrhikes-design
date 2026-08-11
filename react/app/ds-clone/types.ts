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
  /** The compass sentence ("south-west of Bengaluru") — TrailCard's line;
      the overlay/prominent cards speak `compass` + `place` instead. */
  where?: string;
  compass: string;
  place: string;
  blurb: string;
  start: string;
  map: string;
  /** The trail PAGE. With it the overlay card's photo becomes the door
      (`.photo-link` stretches over the wrap); without it, no anchor. */
  href?: string;
  /** Pill modifier for the grade chip (e.g. "full" for a hard grade). */
  gradeVariant?: "live" | "full" | "member" | "ok" | "on-photo";
  stats: Pair[];
  tags: Pair[];
};
