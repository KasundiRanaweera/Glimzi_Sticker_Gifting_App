import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <PageHead
      center
      crumb="Pricing"
      title={
        <>
          Free to send. <span className="hl">Plus</span> for the extras.
        </>
      }
      lead="Cards and gift cards are free to send forever. Plus adds scheduling, reminders and more designs."
    />
  );
}
