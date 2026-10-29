import type { StickerShape } from "@/components/art/Sticker";

const items: [string, StickerShape, "sun" | "coral"][] = [
  ["Birthdays", "spark", "sun"],
  ["Thank-yous", "heart", "coral"],
  ["New homes", "circle", "sun"],
  ["First jobs", "spark", "coral"],
  ["Get well soon", "flower", "sun"],
  ["Leaving dos", "circle", "coral"],
  ["Graduations", "heart", "sun"],
  ["Just because", "flower", "coral"],
];

// The page's one moving strip. The list is rendered twice so the -50% loop is seamless; the copy is hidden from AT.
export function Marquee() {
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {items.map(([label, shape, tone]) => (
        <li key={label}>
          {label}
          <svg aria-hidden="true" style={{ color: `var(--${tone})` }}>
            <use href={`/sprite.svg#s-${shape}`} />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" aria-label="Occasions people send cards for">
      <div className="marquee-track">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
