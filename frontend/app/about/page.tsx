import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageHead
      crumb="About"
      title={
        <>
          We make small gestures easier to <span className="hl">send.</span>
        </>
      }
      lead="Glimzi started with a birthday card that never got posted. This is the app we wished we’d had."
    />
  );
}
