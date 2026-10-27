// Every brand string lives here so a rename touches one file.
export const site = {
  name: "Glimzi",
  title: "Glimzi | Cards, gift cards and little gifts in one app",
  description:
    "Glimzi is the gifting app for little gestures: personal cards with stickers, gift cards from independent shops and cash gifts, delivered on the right day.",
  year: 2026,
  madeIn: "Made with care, everywhere.", // shortcut: placeholder line, swap for real cities once the brand has them
};

export type NavLink = { href: string; label: string };

export const mainNav: NavLink[] = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/gift-cards", label: "Gift cards" },
  { href: "/pricing", label: "Pricing" },
  { href: "/help", label: "Help" },
  { href: "/about", label: "About" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/gift-cards", label: "Gift cards" },
      { href: "/pricing", label: "Pricing" },
      { href: "/download", label: "Download" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/about#careers", label: "Careers" },
      { href: "/about#press", label: "Press" },
      { href: "/gift-cards#suggest", label: "For shops" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/help", label: "Help center" },
      { href: "/help#contact", label: "Contact us" },
      { href: "/legal", label: "Terms" },
      { href: "/legal#privacy", label: "Privacy" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { href: "/legal", label: "Terms" },
  { href: "/legal#privacy", label: "Privacy" },
  { href: "/legal#cookies", label: "Cookies" },
];
