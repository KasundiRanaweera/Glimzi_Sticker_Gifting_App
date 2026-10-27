import Link from "next/link";
import { Logo } from "@/components/icons/Icon";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { footerNav, legalNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-news">
            <h2 className="h3">Birthday season, sorted.</h2>
            <p>One email a month with new card drops, shop openings and the dates people forget.</p>
            <NewsletterForm />
          </div>
          {footerNav.map((col) => (
            <div className="foot-col" key={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-word" aria-hidden="true">
          <Logo className="" />
          {site.name}
        </div>
        <div className="foot-bottom">
          <span>
            &copy; {site.year} {site.name}. {site.madeIn}
          </span>
          <nav aria-label="Legal">
            {legalNav.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
