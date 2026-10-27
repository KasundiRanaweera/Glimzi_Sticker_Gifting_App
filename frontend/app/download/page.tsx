import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";

export const metadata: Metadata = { title: "Download" };

export default function DownloadPage() {
  return (
    <PageHead
      crumb="Download"
      title="Get Glimzi on your phone."
      lead="Free on iPhone and Android. Scan the code, or we’ll text you a link."
    />
  );
}
