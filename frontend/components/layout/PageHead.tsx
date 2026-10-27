import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons/Icon";

// Inner page title block: breadcrumb, h1 (one .hl swash word at most) and a lead.
export function PageHead({ crumb, title, lead, center }: { crumb: string; title: ReactNode; lead?: string; center?: boolean }) {
  return (
    <section className="phead" style={center ? { textAlign: "center" } : undefined}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb" style={center ? { justifyContent: "center" } : undefined}>
          <Link href="/">Home</Link>
          <Icon name="chevron-right" />
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1 className="h1" style={center ? { marginInline: "auto" } : undefined}>
          {title}
        </h1>
        {lead && (
          <p className="lead" style={center ? { marginInline: "auto" } : undefined}>
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
