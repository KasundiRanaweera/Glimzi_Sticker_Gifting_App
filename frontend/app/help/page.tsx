import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";

export const metadata: Metadata = { title: "Help center" };

export default function HelpPage() {
  return (
    <PageHead
      crumb="Help center"
      title="How can we help?"
      lead="Search the answers below, or send us a message and a real person will reply."
    />
  );
}
