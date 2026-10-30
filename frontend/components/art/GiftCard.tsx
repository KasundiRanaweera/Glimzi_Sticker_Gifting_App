import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Gift } from "@/lib/api";
import { usd } from "@/lib/utils";

// Paper gift card object: square gouache artwork + caption strip with the shop and an amount pill.
export function GiftCard({ gift, amount = gift.amounts[0], rotate }: { gift: Gift; amount?: number; rotate?: number }) {
  return (
    <Link
      className="gcard"
      href={`/gift-cards/${gift.id}`}
      style={rotate === undefined ? undefined : ({ "--r": `${rotate}deg` } as CSSProperties)}
    >
      <Image src={`/images/${gift.image}.webp`} alt="" width={900} height={900} sizes="(max-width: 760px) 45vw, 260px" />
      <span className="gcard-cap">
        <b>{gift.short}</b>
        <span>{usd(amount)}</span>
      </span>
      <span className="sr-only">{gift.name} gift card</span>
    </Link>
  );
}
