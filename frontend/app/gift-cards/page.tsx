import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";

export const metadata: Metadata = { title: "Gift cards" };

export default function GiftCardsPage() {
  return (
    <PageHead
      crumb="Gift cards"
      title={
        <>
          Gift cards they’ll <span className="hl">actually</span> use.
        </>
      }
      lead="Independent shops we love, chosen by our team every season. Attach one to any card."
    />
  );
}
