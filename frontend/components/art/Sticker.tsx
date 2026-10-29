import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type StickerShape = "burst" | "scallop" | "circle" | "heart" | "spark" | "smile" | "flower" | "pill" | "tag";
export type StickerTone = "coral" | "sun" | "sage" | "ink";

// Die-cut sticker: paper underlay + coloured face from the sprite. Decorative, so hidden from screen readers.
export function Sticker({
  shape,
  tone,
  label,
  className,
  style,
}: {
  shape: StickerShape;
  tone: StickerTone;
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={cn("stk", `stk-${tone}`, className)} style={style} aria-hidden="true">
      <svg>
        <use href={`/sprite.svg#s-${shape}`} />
      </svg>
      {label && <b>{label}</b>}
    </span>
  );
}
