import "../src/env.js";
import { prisma } from "../src/lib/prisma.js";

// All content is fictional demo data for the Glimzi portfolio site.

const categories = [
  { id: "food", label: "Food & drink", sort: 1 },
  { id: "flowers", label: "Flowers & plants", sort: 2 },
  { id: "out", label: "Going out", sort: 3 },
  { id: "books", label: "Books", sort: 4 },
];

const gifts = [
  {
    id: "morning-crane", name: "Morning Crane Coffee", short: "Morning Crane", categoryId: "food", image: "gc-coffee", rank: 1,
    alt: "Gouache illustration of a cup of coffee, a bag of beans and a croissant on coral",
    amounts: [10, 25, 50], tagline: "Small-batch roasts, poured all week.", location: "Six cafés across the city, plus beans by mail",
    about: "A family roaster that buys from the same handful of farms every year. The gift card covers drinks, pastries and bags of beans by mail.",
    loved: ["Oat flat whites", "Cardamom buns", "Beans by mail"],
  },
  {
    id: "petal-and-twine", name: "Petal & Twine", short: "Petal & Twine", categoryId: "flowers", image: "gc-florist", rank: 2,
    alt: "Gouache illustration of a bouquet of coral ranunculus and daisies on yellow",
    amounts: [30, 45, 75], tagline: "Loose, seasonal bouquets wrapped in brown paper.", location: "Same-day delivery in the city, nationwide Tuesday to Friday",
    about: "A two-person flower studio working with local growers. Recipients choose the day, and the bouquet is built that morning.",
    loved: ["Ranunculus in spring", "Dried wreaths", "Same-day delivery"],
  },
  {
    id: "inkwell-lane", name: "Inkwell Lane Books", short: "Inkwell Lane", categoryId: "books", image: "gc-books", rank: 3,
    alt: "Gouache illustration of a stack of books with glasses and a plant on sage green",
    amounts: [15, 25, 50], tagline: "Crooked shelves full of very good recommendations.", location: "Two shops, free shipping on orders over $35",
    about: "An independent bookshop with handwritten staff picks on every table. Gift cards work in store and on their online shop.",
    loved: ["Staff picks", "Kids’ corner", "Signed first editions"],
  },
  {
    id: "pixel-parlour", name: "Pixel Parlour", short: "Pixel Parlour", categoryId: "out", image: "gc-arcade", rank: 4,
    alt: "Gouache illustration of an arcade joystick and buttons with yellow stars on black",
    amounts: [20, 40, 75], tagline: "Pinball, old cabinets and very good fries.", location: "Two arcade bars, 21+ after 8 pm",
    about: "Dozens of restored cabinets and a kitchen that takes snacks seriously. The card loads straight onto a game card at the door.",
    loved: ["Friday tournaments", "Loaded fries", "Birthday booths"],
  },
  {
    id: "noodle-nook", name: "Noodle Nook Ramen", short: "Noodle Nook", categoryId: "food", image: "gc-ramen", rank: 5,
    alt: "Gouache illustration of a bowl of ramen with egg and chopsticks on yellow",
    amounts: [20, 35, 60], tagline: "Slow broth, twelve seats at the counter.", location: "One counter, plus takeaway",
    about: "A tiny ramen counter with a big following. The card covers bowls, sides and the take-home broth kits.",
    loved: ["Shoyu ramen", "Take-home kits", "Late Fridays"],
  },
  {
    id: "rise-and-roll", name: "Rise & Roll Bakery", short: "Rise & Roll", categoryId: "food", image: "gc-bakery", rank: 6,
    alt: "Gouache illustration of a sourdough loaf and cinnamon buns on a board, on peach",
    amounts: [10, 20, 40], tagline: "Sourdough, cinnamon buns and a queue worth joining.", location: "Three bakeries, open from 7 am",
    about: "A neighbourhood bakery that sells out most Saturdays. Gift card holders can pre-order loaves for the weekend.",
    loved: ["Country sourdough", "Cinnamon buns", "Weekend pre-orders"],
  },
  {
    id: "leaf-loft", name: "Leaf Loft Plants", short: "Leaf Loft", categoryId: "flowers", image: "gc-plants", rank: 7,
    alt: "Gouache illustration of three potted houseplants on cream",
    amounts: [25, 40, 80], tagline: "Houseplants that come with care notes.", location: "One shop, ships plants nationwide",
    about: "A plant shop that repots for free and writes a care card for every plant. Good for new homes and new desks.",
    loved: ["Free repotting", "Care cards", "Trailing pothos"],
  },
  {
    id: "starlight-screen", name: "Starlight Screen", short: "Starlight", categoryId: "out", image: "gc-cinema", rank: 8,
    alt: "Gouache illustration of a striped popcorn box and two ticket stubs on coral",
    amounts: [15, 30, 50], tagline: "One screen, ninety seats, real butter.", location: "Independent cinema, tickets and snacks",
    about: "A restored single-screen cinema showing new releases and Sunday classics. The card covers tickets, popcorn and the bar.",
    loved: ["Sunday classics", "Real-butter popcorn", "Members’ nights"],
  },
];

// Fixed demo dates for autumn 2026.
const occasions = [
  { label: "Birthday", recipient: "To Nadia", schedule: "Fri 6 Nov, 7:00 am", image: "card-birthday", title: "Happy birthday, Nadia!", message: "Cake first, questions later. Love, Theo", giftId: "morning-crane", amount: 25 },
  { label: "Thank you", recipient: "To Dr. Lin", schedule: "Today, 6:30 pm", image: "card-thanks", title: "Thank you, truly.", message: "For the soup, the lifts and the playlist.", giftId: "petal-and-twine", amount: 45 },
  { label: "New home", recipient: "To Rosa and Ben", schedule: "Sat 14 Nov, 9:00 am", image: "card-home", title: "Welcome home, you two", message: "The first ramen night is on me.", giftId: "noodle-nook", amount: 35 },
  { label: "Congrats", recipient: "To Arjun", schedule: "Mon 23 Nov, 8:00 am", image: null, title: "", message: "Told you so. So proud of you.", giftId: "pixel-parlour", amount: 40 },
];

const plans = [
  {
    id: "free", name: "Free", blurb: "Everything you need to send a good card.", monthly: 0, yearly: 0, cta: "Start free",
    features: ["Unlimited cards and scheduling", "Group cards with up to 10 signatures", "3 photo pages per card", "Gift cards and Cash at face value", "Reminders for 5 people"],
  },
  {
    id: "plus", name: "Plus", blurb: "For people who send a card most weeks.", monthly: 399, yearly: 3600, featured: true, trial: "14 days free", cta: "Try Plus free",
    features: ["Everything in Free", "Video and voice notes on every card", "Unlimited photo pages", "Group cards with up to 60 signatures", "The artist collection, 600+ designs", "Unlimited reminders"],
  },
  {
    id: "family", name: "Family", blurb: "Plus for up to six people, with one shared calendar.", monthly: 699, yearly: 6000, cta: "Choose Family",
    features: ["Everything in Plus, for 6 people", "Shared family calendar and address book", "Family group gifts in one tap", "Kids’ accounts with no payment access"],
  },
];

const help: Record<string, { label: string; articles: [string, string][] }> = {
  sending: {
    label: "Sending cards",
    articles: [
      ["How do I schedule a card?", "Write your card, tap Send, then choose Schedule. Pick a date and a time. If you add the recipient’s city, we deliver in their time zone."],
      ["Can I edit a card after scheduling it?", "Yes. Open it from your outbox to change the message, the design, the gift or the date, right up until the minute it sends."],
      ["How will the recipient get my card?", "By text message, email or a private link you share yourself. It opens in any modern browser, so they don’t need the app."],
      ["Why does my card say delivered but not opened?", "Delivered means it reached their phone or inbox. Opening is up to them. If an email bounces, we tell you within the hour so you can try a phone number."],
    ],
  },
  gifts: {
    label: "Gift cards and Cash",
    articles: [
      ["Where can a gift card be used?", "Each gift card page lists where it works: in store, online or both. The recipient sees the same details when they open the gift."],
      ["How do I swap a gift card for Cash?", "In your wallet, open the gift card and tap Swap for Cash. The full value moves to your Glimzi Cash balance straight away."],
      ["Can I get a refund on a gift?", "Unopened gifts can be refunded in full within 30 days of sending. Once opened, the value belongs to the recipient."],
      ["Do gift cards or Cash expire?", "No. Gift cards and Cash bought through Glimzi never expire, and there are no fees on the receiving side."],
    ],
  },
  groups: {
    label: "Group cards",
    articles: [
      ["How do I start a group gift?", "Create a card, tap Make it a group card and share the link. Everyone can sign, add a photo and chip in an amount."],
      ["Do contributors need the app?", "No. Contributors sign and pay from the link in any browser. Only the organiser needs Glimzi."],
      ["What if the pot doesn’t reach the goal?", "The gift goes out with whatever was collected, or you can top it up before it sends. Nobody is charged until the card goes out."],
    ],
  },
  account: {
    label: "Account and billing",
    articles: [
      ["How do I cancel Plus?", "Go to Settings, then Plan, then Cancel. Two taps, no phone call. You keep Plus until the end of the period you paid for."],
      ["How do I delete my account?", "Settings, then Account, then Delete. We remove your cards and contacts within 30 days, except records we must keep for tax law."],
      ["Is my address book shared with anyone?", "Never. We use your contacts only to deliver the cards you send and to show you upcoming dates you chose to save."],
    ],
  },
};

const faqs: Record<"home" | "billing", [string, string][]> = {
  home: [
    ["Is Glimzi free?", "Cards, scheduling, group cards and reminders are free. You only pay the value of any gift card or Cash you attach. Glimzi Plus adds video, voice notes and the artist collection for $3.99 a month."],
    ["Does the person I send to need the app?", "No. Cards open in any browser from a text, an email or a private link. If they do have Glimzi, it lands in their inbox and their wallet automatically."],
    ["What if I schedule the wrong date?", "Edit, reschedule or cancel from your outbox up to the minute it sends. Attached gifts are only charged when the card actually goes out."],
    ["Where can gift cards be spent?", "Each card shows where it works, in store, online or both. Recipients can also swap any unused gift card for Glimzi Cash and spend it at another shop."],
    ["Can I get a refund on a gift?", "Unopened gifts can be refunded in full for 30 days. Once opened, the value belongs to the recipient, who can always swap it for Cash."],
  ],
  billing: [
    ["How does the free trial work?", "Plus is free for 14 days. We remind you two days before it ends, and you can cancel from Settings in two taps."],
    ["Are there fees on gift cards?", "No. A $25 gift card costs $25. Shops pay us a small commission, which is how sending stays free."],
    ["Can I switch plans later?", "Yes, at any time. Upgrades start straight away and we credit what’s left of your current period."],
    ["What happens to my cards if I cancel?", "Everything you sent and received stays in your inbox. Scheduled cards still go out; Plus-only layers like video play as a still photo."],
  ],
};

async function main() {
  // Children first, then parents, so foreign keys never block the reset.
  await prisma.$transaction([
    prisma.occasion.deleteMany(),
    prisma.gift.deleteMany(),
    prisma.category.deleteMany(),
    prisma.plan.deleteMany(),
    prisma.helpArticle.deleteMany(),
    prisma.helpTopic.deleteMany(),
    prisma.faq.deleteMany(),
  ]);

  await prisma.category.createMany({ data: categories });
  await prisma.gift.createMany({ data: gifts });
  await prisma.occasion.createMany({ data: occasions.map((o, i) => ({ ...o, sort: i })) });
  await prisma.plan.createMany({ data: plans.map((p, i) => ({ ...p, sort: i })) });
  for (const [i, [id, topic]] of Object.entries(help).entries()) {
    await prisma.helpTopic.create({
      data: {
        id,
        label: topic.label,
        sort: i,
        articles: { create: topic.articles.map(([question, answer], j) => ({ question, answer, sort: j })) },
      },
    });
  }
  await prisma.faq.createMany({
    data: Object.entries(faqs).flatMap(([group, items]) => items.map(([question, answer], sort) => ({ group, question, answer, sort }))),
  });

  console.log(`Seeded ${gifts.length} gifts, ${occasions.length} occasions, ${plans.length} plans, ${Object.keys(help).length} help topics.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
