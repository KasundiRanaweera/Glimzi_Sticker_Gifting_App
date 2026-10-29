// Fictional shops and occasions. Day 3 moves this into the API's seed data.

export type CategoryId = "food" | "flowers" | "out" | "books";

export type Gift = {
  id: string;
  name: string;
  short: string;
  category: CategoryId;
  image: string; // file in public/images, without extension
  alt: string;
  amounts: number[];
  tagline: string;
  where: string;
  about: string;
  loved: string[];
};

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "food", label: "Food & drink" },
  { id: "flowers", label: "Flowers & plants" },
  { id: "out", label: "Going out" },
  { id: "books", label: "Books" },
];

export const GIFTS: Gift[] = [
  {
    id: "morning-crane",
    name: "Morning Crane Coffee",
    short: "Morning Crane",
    category: "food",
    image: "gc-coffee",
    alt: "Gouache illustration of a cup of coffee, a bag of beans and a croissant on coral",
    amounts: [10, 25, 50],
    tagline: "Small-batch roasts, poured all week.",
    where: "Six cafés across the city, plus beans by mail",
    about: "A family roaster that buys from the same handful of farms every year. The gift card covers drinks, pastries and bags of beans by mail.",
    loved: ["Oat flat whites", "Cardamom buns", "Beans by mail"],
  },
  {
    id: "petal-and-twine",
    name: "Petal & Twine",
    short: "Petal & Twine",
    category: "flowers",
    image: "gc-florist",
    alt: "Gouache illustration of a bouquet of coral ranunculus and daisies on yellow",
    amounts: [30, 45, 75],
    tagline: "Loose, seasonal bouquets wrapped in brown paper.",
    where: "Same-day delivery in the city, nationwide Tuesday to Friday",
    about: "A two-person flower studio working with local growers. Recipients choose the day, and the bouquet is built that morning.",
    loved: ["Ranunculus in spring", "Dried wreaths", "Same-day delivery"],
  },
  {
    id: "pixel-parlour",
    name: "Pixel Parlour",
    short: "Pixel Parlour",
    category: "out",
    image: "gc-arcade",
    alt: "Gouache illustration of an arcade joystick and buttons with yellow stars on black",
    amounts: [20, 40, 75],
    tagline: "Pinball, old cabinets and very good fries.",
    where: "Two arcade bars, 21+ after 8 pm",
    about: "Dozens of restored cabinets and a kitchen that takes snacks seriously. The card loads straight onto a game card at the door.",
    loved: ["Friday tournaments", "Loaded fries", "Birthday booths"],
  },
  {
    id: "inkwell-lane",
    name: "Inkwell Lane Books",
    short: "Inkwell Lane",
    category: "books",
    image: "gc-books",
    alt: "Gouache illustration of a stack of books with glasses and a plant on sage green",
    amounts: [15, 25, 50],
    tagline: "Crooked shelves full of very good recommendations.",
    where: "Two shops, free shipping on orders over $35",
    about: "An independent bookshop with handwritten staff picks on every table. Gift cards work in store and on their online shop.",
    loved: ["Staff picks", "Kids’ corner", "Signed first editions"],
  },
  {
    id: "rise-and-roll",
    name: "Rise & Roll Bakery",
    short: "Rise & Roll",
    category: "food",
    image: "gc-bakery",
    alt: "Gouache illustration of a sourdough loaf and cinnamon buns on a board, on peach",
    amounts: [10, 20, 40],
    tagline: "Sourdough, cinnamon buns and a queue worth joining.",
    where: "Three bakeries, open from 7 am",
    about: "A neighbourhood bakery that sells out most Saturdays. Gift card holders can pre-order loaves for the weekend.",
    loved: ["Country sourdough", "Cinnamon buns", "Weekend pre-orders"],
  },
  {
    id: "noodle-nook",
    name: "Noodle Nook Ramen",
    short: "Noodle Nook",
    category: "food",
    image: "gc-ramen",
    alt: "Gouache illustration of a bowl of ramen with egg and chopsticks on yellow",
    amounts: [20, 35, 60],
    tagline: "Slow broth, twelve seats at the counter.",
    where: "One counter, plus takeaway",
    about: "A tiny ramen counter with a big following. The card covers bowls, sides and the take-home broth kits.",
    loved: ["Shoyu ramen", "Take-home kits", "Late Fridays"],
  },
  {
    id: "leaf-loft",
    name: "Leaf Loft Plants",
    short: "Leaf Loft",
    category: "flowers",
    image: "gc-plants",
    alt: "Gouache illustration of three potted houseplants on cream",
    amounts: [25, 40, 80],
    tagline: "Houseplants that come with care notes.",
    where: "One shop, ships plants nationwide",
    about: "A plant shop that repots for free and writes a care card for every plant. Good for new homes and new desks.",
    loved: ["Free repotting", "Care cards", "Trailing pothos"],
  },
  {
    id: "starlight-screen",
    name: "Starlight Screen",
    short: "Starlight",
    category: "out",
    image: "gc-cinema",
    alt: "Gouache illustration of a striped popcorn box and two ticket stubs on coral",
    amounts: [15, 30, 50],
    tagline: "One screen, ninety seats, real butter.",
    where: "Independent cinema, tickets and snacks",
    about: "A restored single-screen cinema showing new releases and Sunday classics. The card covers tickets, popcorn and the bar.",
    loved: ["Sunday classics", "Real-butter popcorn", "Members’ nights"],
  },
];

export const giftById = (id: string) => GIFTS.find((g) => g.id === id);

export type Occasion = {
  label: string;
  to: string;
  when: string;
  image?: string; // omitted: the typographic "You did it." card
  title: string;
  message: string;
  gift: string;
  amount: number;
};

// shortcut: dates are fixed demo values for autumn 2026; derive them from today if the hero should stay current.
export const OCCASIONS: Occasion[] = [
  { label: "Birthday", to: "To Nadia", when: "Fri 6 Nov, 7:00 am", image: "card-birthday", title: "Happy birthday, Nadia!", message: "Cake first, questions later. Love, Theo", gift: "morning-crane", amount: 25 },
  { label: "Thank you", to: "To Dr. Lin", when: "Today, 6:30 pm", image: "card-thanks", title: "Thank you, truly.", message: "For the soup, the lifts and the playlist.", gift: "petal-and-twine", amount: 45 },
  { label: "New home", to: "To Rosa and Ben", when: "Sat 14 Nov, 9:00 am", image: "card-home", title: "Welcome home, you two", message: "The first ramen night is on me.", gift: "noodle-nook", amount: 35 },
  { label: "Congrats", to: "To Arjun", when: "Mon 23 Nov, 8:00 am", title: "", message: "Told you so. So proud of you.", gift: "pixel-parlour", amount: 40 },
];

export const usd = (n: number) => `$${n}`;
