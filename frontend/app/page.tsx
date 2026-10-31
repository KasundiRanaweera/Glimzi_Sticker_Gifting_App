import { Bento } from "@/components/home/Bento";
import { CardEditor } from "@/components/home/CardEditor";
import { CashBand } from "@/components/home/CashBand";
import { GiftBand } from "@/components/home/GiftBand";
import { Hero } from "@/components/home/Hero";
import { CtaPanel, HomeFaq, Notes, Steps } from "@/components/home/HomeSections";
import { Marquee } from "@/components/home/Marquee";
import { getCategories, getFaqs, getGifts, getOccasions } from "@/lib/api";

export default async function Home() {
  const [gifts, categories, occasions, faqs] = await Promise.all([getGifts(), getCategories(), getOccasions(), getFaqs("home")]);

  return (
    <>
      <Hero occasions={occasions} heroGifts={gifts} />
      <Marquee />
      <Bento />
      <CardEditor />
      <GiftBand gifts={gifts} categories={categories} />
      <CashBand />
      <Steps />
      <Notes />
      <HomeFaq faqs={faqs} />
      <CtaPanel />
    </>
  );
}
