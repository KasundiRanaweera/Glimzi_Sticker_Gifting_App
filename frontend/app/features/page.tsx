import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";

export const metadata: Metadata = { title: "Features" };

export default function FeaturesPage() {
  return (
    <PageHead
      crumb="Features"
      title={
        <>
          Small tools for <span className="hl">big feelings.</span>
        </>
      }
      lead="Glimzi does a few things and does them carefully: the card, the gift, the cash and the date."
    />
  );
}
