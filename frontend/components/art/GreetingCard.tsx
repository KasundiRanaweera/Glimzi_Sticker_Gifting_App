import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { StickerShape } from "./Sticker";

// 2:3 card face: illustration on top, Bricolage title and Caveat message below. Container queries size the type.
export function GreetingCard({
  image,
  title,
  message,
  className,
  eager,
  children,
}: {
  image?: string;
  title?: string;
  message: string;
  className?: string;
  eager?: boolean; // above the fold (the hero phone)
  children?: ReactNode;
}) {
  return (
    <div className={cn("gc-face", className)}>
      {image ? (
        <Image src={`/images/${image}.webp`} alt="" width={800} height={1200} sizes="240px" loading={eager ? "eager" : undefined} />
      ) : (
        <TypeArt />
      )}
      <div className="gc-text">
        {title && <div className="t">{title}</div>}
        <div className="m">{message}</div>
      </div>
      {children}
    </div>
  );
}

// The typographic "You did it." design, drawn with confetti instead of an illustration.
function TypeArt() {
  return (
    <div className="gc-type">
      <svg viewBox="0 0 200 300" preserveAspectRatio="none">
        <g fill="#ff6a4d">
          <circle cx="30" cy="40" r="6" />
          <circle cx="160" cy="30" r="5" />
          <circle cx="178" cy="120" r="7" />
          <circle cx="20" cy="190" r="5" />
        </g>
        <g fill="#15130f">
          <rect x="60" y="24" width="12" height="5" rx="2.5" transform="rotate(30 66 26)" />
          <rect x="140" y="70" width="12" height="5" rx="2.5" transform="rotate(-20 146 72)" />
          <rect x="34" y="120" width="12" height="5" rx="2.5" transform="rotate(60 40 122)" />
        </g>
      </svg>
      <div className="big">
        You <em>did</em> it.
      </div>
    </div>
  );
}

// A sticker pressed onto a card face, positioned in % of the card.
export function PlacedSticker({ shape, color, x, y, r = 0 }: { shape: StickerShape; color: string; x: number; y: number; r?: number }) {
  return (
    <span className="placed" style={{ left: `${x}%`, top: `${y}%`, "--r": `${r}deg`, color } as CSSProperties}>
      <svg>
        <use href={`/sprite.svg#s-${shape}`} />
      </svg>
    </span>
  );
}
