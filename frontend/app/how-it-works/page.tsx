import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";

export const metadata: Metadata = { title: "How it works" };

export default function HowItWorksPage() {
  return (
    <PageHead
      crumb="How it works"
      title={
        <>
          Four taps from thought to <span className="hl hl-coral">delivered.</span>
        </>
      }
      lead="Choose a step to see what it looks like in the app."
    />
  );
}
