import { Bento } from "@/components/home/Bento";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";

// shortcut: the product bands, steps, notes wall, FAQ and CTA land on Day 3.
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Bento />
    </>
  );
}
