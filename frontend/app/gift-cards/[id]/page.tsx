import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/layout/PageHead";
import { GIFTS, giftById } from "@/data/catalogue";

// Every shop is prerendered; unknown ids hit notFound() below.
export function generateStaticParams() {
  return GIFTS.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: PageProps<"/gift-cards/[id]">): Promise<Metadata> {
  const gift = giftById((await params).id);
  return { title: gift ? `${gift.name} gift card` : "Gift card" };
}

// shortcut: title only; amounts, delivery, specs, related shops and the basket arrive on Day 4.
export default async function GiftCardPage({ params }: PageProps<"/gift-cards/[id]">) {
  const gift = giftById((await params).id);
  if (!gift) notFound();
  return <PageHead crumb={gift.name} title={gift.name} lead={gift.tagline} />;
}
