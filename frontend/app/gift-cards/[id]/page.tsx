import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/layout/PageHead";
import { getGift, getGifts } from "@/lib/api";

// Every shop is prerendered from the API; unknown ids hit notFound() below.
export async function generateStaticParams() {
  return (await getGifts()).map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: PageProps<"/gift-cards/[id]">): Promise<Metadata> {
  const gift = await getGift((await params).id);
  return { title: gift ? `${gift.name} gift card` : "Gift card" };
}

// shortcut: title only; amounts, delivery, specs, related shops and the basket arrive on Day 4.
export default async function GiftCardPage({ params }: PageProps<"/gift-cards/[id]">) {
  const gift = await getGift((await params).id);
  if (!gift) notFound();
  return <PageHead crumb={gift.name} title={gift.name} lead={gift.tagline} />;
}
