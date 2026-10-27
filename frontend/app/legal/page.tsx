import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";

export const metadata: Metadata = { title: "Terms and privacy" };

export default function LegalPage() {
  return (
    <PageHead
      crumb="Terms and privacy"
      title="Terms and privacy"
      lead="Written to be read, not skimmed past."
    />
  );
}
