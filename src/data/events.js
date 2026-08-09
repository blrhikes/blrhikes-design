/* Event content, from the app's dev/seed.json. */
import { cover } from "./images.js";

/* The card that runs twice in the Event surfaces section — once torn along
   the ends, once torn down the sides. */
export const graniteGauntlet = {
  name: "Granite Gauntlet Night Trek",
  photo: cover("42873d1c-24ef-4a32-8e0f-7971cb77c0d5", 1200),
  date: { mon: "Aug", day: "15", dow: "Sat" },
  dateLabel: "Sat 15 Aug",
  time: "10:00 pm · carpools leave 8:00 pm",
  where: "south-west of Bengaluru · 65 km drive",
  blurb:
    "Up the slab scramble under a waning moon, the summit by midnight, maggi on the stove, back at the base by 3 am. First-timers welcome — the grade is steady and we walk it slow.",
  badge: { text: "9 spots left", variant: "live" },
  kind: { icon: "mountain-sun", text: "Hike" },
  lead: { initials: "SH", name: "Shreshth" },
  going: { count: "11 going", more: "+8", faces: ["CH", "DH", "SA"] },
  price: "₹950",
};

/* EventCard — photo on top, two up. */
export const eventCards = [
  {
    name: "Savandurga Full Moon Walk",
    photo: cover("4c6abe3c-722c-4025-99aa-5f7ce9409841"),
    date: { mon: "Aug", day: "22", dow: "Sat" },
    dateLabel: "Sat 22 Aug",
    start: "5:30 pm start",
    badge: { text: "Full", variant: "full" },
    pills: [
      { icon: "mountain-sun", text: "Hike" },
      { text: "₹850" },
      { text: "₹700 members", variant: "ok" },
    ],
    where: "Savandurga, Magadi",
    lead: { initials: "AS", name: "Ava Sharma" },
    blurb:
      "Asia’s largest monolith by moonlight — a slow, quiet climb up the open rock with the city glowing on the horizon.",
    going: { count: "30 going", more: "+27", faces: ["SR", "RH", "RA"] },
    actions: [{ text: "Join waitlist", variant: "secondary" }],
  },
  {
    name: "Glasswater Lake Day Hike",
    photo: cover("e5546183-141c-472d-a193-e6d44e728c8e"),
    date: { mon: "Aug", day: "11", dow: "Tue" },
    dateLabel: "Tue 11 Aug",
    start: "7:00 am start",
    badge: { text: "12 spots left", variant: "live" },
    pills: [
      { icon: "fish", text: "Hike + Swim" },
      { text: "₹600" },
      { text: "₹500 members", variant: "ok" },
    ],
    where: "north of Bengaluru · 60 km drive",
    lead: { initials: "SH", name: "Shreshth" },
    blurb:
      "An easy lakeside loop and a long swim — lake and waterfall days include the swim-safety kit. Breakfast at the village mess after.",
    going: { count: "8 going", more: "+6", faces: ["CH", "DH"] },
    actions: [
      { text: "Details", variant: "secondary" },
      { text: "Register", variant: "primary" },
    ],
  },
];

/* EventTicket — dense rows, no photo. */
export const eventTickets = [
  {
    stub: { mon: "Aug", day: "08", dow: "Sat", time: "4:30 am" },
    name: "Skandagiri Sunrise Hike",
    where: "Skandagiri, Chikkaballapur",
    tags: [
      { text: "Paid ₹999 ✓", variant: "ok" },
      { text: "Pickup: Koramangala", variant: "member" },
    ],
  },
  {
    stub: { mon: "Jul", day: "10", dow: "Fri", time: "6:00 am" },
    name: "Kabbaladurga Day Hike",
    where: "Kabbala, Kanakapura",
    tags: [{ text: "Completed" }, { text: "₹800" }],
  },
];

/* The Skandagiri event, rendered through the cover + detail surfaces. */
export const skandagiri = {
  id: "evt_skandagiri",
  name: "Skandagiri Sunrise Hike",
  photo: cover("d02a2140-5496-466d-a04f-cfb393c5f82c", 1600),
  when: "Sat 8 Aug · 04:30 – 11:00",
  where: "Skandagiri, Chikkaballapur",
  price: "₹1,200 · members ₹999",
};
