/* Trail content, from the app's dev/seed.json. Split by the surface each set
   demonstrates: the three-up TrailCard grid, the wide two-up card, the
   overlay variant, and the edge exhibit in the Edges section. */
import { cover } from "./images.js";

/* TrailCard — three up, stats only, no prose. */
export const trailCards = [
  {
    name: "Immovable Rock Cave",
    photo: cover("63972ac0-b799-418f-991f-0fd3c921601e"),
    alt: "Mouth of the immovable rock cave",
    grade: "Easy",
    rating: "4.5",
    where: "south-west of Bengaluru",
    badge: { text: "Members", variant: "member" },
    stats: [
      ["Length", "2.4 km"],
      ["Gain", "+124 m"],
      ["Drive", "1 h 08"],
    ],
    tags: [
      ["dungeon", "Cave"],
      ["hill-rockslide", "Scramble"],
    ],
  },
  {
    name: "Stone Arch Scramble",
    photo: cover("e3a30b20-dae5-469b-9f87-7904ab371b9a"),
    alt: "The stone arch on the scramble",
    grade: "Hard",
    gradeVariant: "full",
    rating: "4.5",
    where: "south-west of Bengaluru",
    stats: [
      ["Length", "2.5 km"],
      ["Gain", "+367 m"],
      ["Drive", "2 h 16"],
    ],
    tags: [
      ["gopuram", "Temple"],
      ["hill-rockslide", "Scramble"],
      ["archway", "Arch"],
      ["triangle-exclamation", "Exposed"],
    ],
  },
  {
    name: "Hidden Sister Falls",
    photo: cover("b70052c9-89aa-438a-9f22-6562156037d5"),
    alt: "The hidden sister falls",
    grade: "Mod–hard",
    rating: "4.5",
    where: "east of Bengaluru",
    stats: [
      ["Length", "2.0 km"],
      ["Gain", "+215 m"],
      ["Drive", "1 h 55"],
    ],
    tags: [
      ["leaf", "Bushwhack"],
      ["droplet", "Waterfall"],
    ],
  },
  {
    name: "Crystal Lake Loop",
    photo: cover("82ce7345-082d-4434-af79-46d31b64a60c"),
    alt: "Lakeside path on the crystal lake loop",
    grade: "Easy–mod",
    rating: "5.0",
    where: "north-west of Bengaluru",
    stats: [
      ["Length", "4.5 km"],
      ["Gain", "+111 m"],
      ["Drive", "1 h 33"],
    ],
    tags: [
      ["campground", "Camping"],
      ["water", "Lake"],
      ["mountain", "Hilltop"],
    ],
  },
  {
    name: "Verdant Valley",
    photo: cover("ed5fbef6-e482-41fc-b5c6-46adc9fec28f"),
    alt: "Forest path in the verdant valley",
    grade: "Moderate",
    rating: "4.0",
    where: "south-east of Bengaluru",
    stats: [
      ["Length", "6.9 km"],
      ["Gain", "+154 m"],
      ["Drive", "2 h 27"],
    ],
    tags: [
      ["water", "Lake"],
      ["tree", "Forest"],
    ],
  },
  {
    name: "Divine Hollow Trail",
    photo: cover("be4cbba1-4671-4981-a3d6-25b867a08eaf"),
    alt: "Still water in the divine hollow",
    grade: "Easy",
    rating: "4.0",
    where: "south of Bengaluru",
    stats: [
      ["Length", "0.9 km"],
      ["Gain", "+14 m"],
      ["Drive", "1 h 26"],
    ],
    tags: [
      ["water", "Lake"],
      ["cubes-stacked", "Quarry"],
    ],
  },
];

/* TrailCardWide — two up, with the blurb and the map/GPX links. */
export const trailCardsWide = [
  {
    name: "Cavern Crimson Loop",
    slug: "cavern-crimson-loop",
    photo: cover("0e487a9f-1278-49d8-81e4-65d4ad83ab35"),
    alt: "The cave mouth on the Cavern Crimson loop",
    grade: "Moderate",
    rating: "4.0",
    where: "south-west of Bengaluru",
    blurb:
      "A lake, a hilltop and a cave strung into one loop — the long version of the ridge walk, best done before the sun is up properly.",
    stats: [
      ["Length", "3.9 km"],
      ["Gain", "+224 m"],
      ["Hike", "3 h 29"],
      ["Drive", "1 h 59"],
    ],
    tags: [
      ["water", "Lake"],
      ["mountain", "Hilltop"],
      ["dungeon", "Cave"],
    ],
    start: "12.94689,77.18148",
    map: "https://www.gaiagps.com/map/?loc=15.1/77.1746/12.9498",
  },
  {
    name: "Forest Cathedral Trail",
    slug: "forest-cathedral-trail",
    photo: cover("3e948008-c060-4997-9271-7e49f1b9ac55"),
    alt: "Tall trees on the Forest Cathedral trail",
    grade: "Moderate",
    rating: "4.5",
    where: "north of Bengaluru",
    badge: { text: "Members", variant: "member" },
    blurb:
      "Unmonitored access, so we go in as a group and come out as one. The climb is in the trees the whole way; the lake is the reward.",
    stats: [
      ["Length", "3.5 km"],
      ["Gain", "+191 m"],
      ["Hike", "3 h 00"],
      ["Drive", "1 h 30"],
    ],
    tags: [
      ["water", "Lake"],
      ["tree", "Forest"],
    ],
    start: "12.554942,77.383009",
    map: "https://www.gaiagps.com/map/?loc=14.0/77.3788/12.5535",
  },
  {
    name: "Ancient Stone Crest",
    slug: "ancient-stone-crest",
    photo: cover("84b40703-0381-46e5-b3b5-e217081a92d7"),
    alt: "Dolmens on the Ancient Stone Crest",
    grade: "Easy",
    rating: "4.0",
    where: "south-east of Bengaluru",
    blurb:
      "Open access, low gain, flat ground at the top for tents — the easiest camping night on the list, and dogs are welcome.",
    stats: [
      ["Length", "2.3 km"],
      ["Gain", "+67 m"],
      ["Hike", "1 h 56"],
      ["Drive", "1 h 57"],
    ],
    tags: [
      ["campground", "Camping"],
      ["paw", "Pet-friendly"],
    ],
    start: "12.63947,78.095",
    map: "https://www.gaiagps.com/map/?loc=15.4/78.0981/12.6367",
  },
  {
    name: "Mahout's Mountain",
    slug: "mahouts-mountain",
    photo: cover("7ff2b311-909a-44b2-9332-5790c5ff3ba1"),
    alt: "The ridge on Mahout's Mountain at sunset",
    grade: "Easy–mod",
    rating: "3.5",
    where: "south-east of Bengaluru",
    blurb:
      "The sunset hill. Two hours out, an hour up, and the whole plain goes gold from the top — camp if you'd rather not drive back.",
    stats: [
      ["Length", "2.8 km"],
      ["Gain", "+184 m"],
      ["Hike", "2 h 38"],
      ["Drive", "2 h 06"],
    ],
    tags: [
      ["campground", "Camping"],
      ["mountain", "Hilltop"],
    ],
    start: "12.67871,78.08359",
    map: "https://www.gaiagps.com/map/?loc=9.4/77.7249/12.6860",
  },
];

/* TrailCardOverlay — name and facts ride on the cover. */
export const trailCardsOverlay = [
  {
    name: "Panorama Boulder Trail",
    slug: "panorama-boulder-trail",
    photo: cover("fc5014a8-e4b4-4351-a590-ca78b721f356", 1200),
    alt: "Boulders and the plain from the panorama trail",
    grade: "Easy–mod",
    rating: "4.0",
    compass: "South-west",
    place: "Kanakapura",
    blurb:
      "A short climb onto a boulder field that opens the whole plain up at once — the cave and the shrine are on the way back down.",
    stats: [
      ["Length", "3.0 km"],
      ["Gain", "+215 m"],
      ["Hike", "2 h 55"],
      ["Drive", "1 h 48"],
    ],
    tags: [
      ["mountain", "Hilltop"],
      ["gopuram", "Temple"],
      ["dungeon", "Cave"],
    ],
    start: "12.561673,77.371764",
    map: "https://www.gaiagps.com/map/?loc=9.1/77.4150/12.8114",
  },
  {
    name: "Coconut Rock Caves",
    slug: "coconut-rock-caves",
    photo: cover("a667125d-70ba-438d-88f2-0d182442f49b", 1200),
    alt: "The big cave mouth under coconut rock",
    grade: "Moderate",
    rating: "4.5",
    compass: "South-west",
    place: "Ramanagara",
    blurb:
      "Two caves on one walk, the second big enough to stand up in. Forest most of the way, so it holds up on a hot morning.",
    stats: [
      ["Length", "4.7 km"],
      ["Gain", "+165 m"],
      ["Hike", "3 h 37"],
      ["Drive", "1 h 40"],
    ],
    tags: [
      ["dungeon", "Cave"],
      ["tree", "Forest"],
    ],
    start: "12.629055,77.333985",
    map: "https://www.gaiagps.com/map/?folderId=db30eafd-6d32-4963-bc3e-19b74d74",
  },
];

/* The Edges exhibit — the same card under each edge treatment. `edge` picks
   the BigCard modifiers; `wide` puts it across the full grid. */
export const edgeCards = [
  {
    edge: "torn",
    caption: "Torn — <span class=\"mono\">--cut: url(#cut-hero)</span>",
    name: "Cascading Vista Trail",
    photo: cover("980a6687-2537-48bc-b882-775cfb462194", 1200),
    alt: "Falls on the cascading vista trail",
    where: "north of Bengaluru",
    blurb:
      "The long way up: 5.5 km and 460 m of climbing past the falls — the biggest single day in the library, saved for the season the stream actually runs.",
    tags: [
      ["droplet", "Waterfall"],
      ["mountain", "Hilltop"],
    ],
    stats: [
      ["Length", "5.5 km"],
      ["Gain", "+460 m"],
      ["Drive", "1 h 20"],
      ["Rating", "★ 4.5"],
    ],
  },
  {
    edge: "flat",
    caption: "Flat — <span class=\"mono\">--cut: opacity(1)</span>",
    name: "Cascading Vista Trail",
    photo: cover("980a6687-2537-48bc-b882-775cfb462194", 1200),
    alt: "Falls on the cascading vista trail",
    where: "north of Bengaluru",
    blurb:
      "The long way up: 5.5 km and 460 m of climbing past the falls — the biggest single day in the library, saved for the season the stream actually runs.",
    tags: [
      ["droplet", "Waterfall"],
      ["mountain", "Hilltop"],
    ],
    stats: [
      ["Length", "5.5 km"],
      ["Gain", "+460 m"],
      ["Drive", "1 h 20"],
      ["Rating", "★ 4.5"],
    ],
  },
  {
    edge: "torn-tb",
    caption:
      "Half width, sides straight — <span class=\"mono\">--cut: url(#cut-tb)</span>",
    name: "Sounder Hill",
    photo: cover("0ff1212f-a169-4abc-a495-c34ff4df1c37", 1200),
    alt: "Open rock on Sounder Hill",
    where: "south-west of Bengaluru",
    blurb:
      "The closest summit in the library — under an hour's drive, open rock the whole way up, and back in town before lunch.",
    tags: [["mountain", "Hilltop"]],
    stats: [
      ["Length", "3.3 km"],
      ["Gain", "+259 m"],
      ["Drive", "0 h 55"],
      ["Rating", "★ 4.0"],
    ],
  },
  {
    edge: "torn",
    full: true,
    caption: "Torn, full width",
    name: "Wind Perch Trail",
    photo: cover("d02a2140-5496-466d-a04f-cfb393c5f82c", 1600),
    alt: "View from the wind perch",
    where: "south-west of Bengaluru",
    blurb:
      "The short, steep one: under three kilometres but nearly five hundred metres of climbing, ending on an open clifftop with the whole valley underfoot.",
    tags: [
      ["mountain", "Clifftop"],
      ["hill-rockslide", "Scramble"],
      ["triangle-exclamation", "Exposed"],
    ],
    stats: [
      ["Length", "2.6 km"],
      ["Gain", "+492 m"],
      ["Drive", "2 h 15"],
      ["Rating", "★ 4.0"],
    ],
  },
  {
    edge: "torn-tb",
    full: true,
    caption:
      "Torn top &amp; bottom, sides straight — <span class=\"mono\">--cut: url(#cut-tb)</span>",
    name: "Porcupine Ridge Trail",
    photo: cover("4c6abe3c-722c-4025-99aa-5f7ce9409841", 1600),
    alt: "Boulders on Porcupine Ridge",
    where: "west of Bengaluru",
    blurb:
      "An easy boulder hill with a cave near the top — short enough for a first hike, interesting enough that nobody minds coming back.",
    tags: [
      ["mountain", "Hilltop"],
      ["dungeon", "Cave"],
      ["child-reaching", "Kid-Friendly"],
    ],
    stats: [
      ["Length", "2.6 km"],
      ["Gain", "+156 m"],
      ["Drive", "1 h 31"],
      ["Rating", "★ 4.5"],
    ],
  },
];

/* The one trail the event page links out to, in the rail. */
export const emeraldFallsCircuit = {
  name: "Emerald Falls Circuit",
  photo: cover("32fcf612-a3b7-47d5-8548-0e5f62a77b00", 640),
  alt: "The lower falls on the Emerald Falls Circuit",
  grade: "Easy",
  rating: "4.6",
  where: "Emerald Hills",
  stats: [
    ["Length", "6.2 km"],
    ["Gain", "+240 m"],
    ["Drive", "1 h 15"],
  ],
  tags: [
    ["water", "Waterfall"],
    ["dove", "Birdlife"],
    ["campground", "Camp spot"],
    ["child-reaching", "Kid-friendly"],
    ["paw", "Pet-friendly"],
  ],
};
