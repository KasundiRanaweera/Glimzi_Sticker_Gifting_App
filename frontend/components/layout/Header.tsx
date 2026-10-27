"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { Icon, Logo } from "@/components/icons/Icon";
import { mainNav, site } from "@/lib/site";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href + "/");

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link className="brand" href="/" aria-label={`${site.name} home`} onClick={onClick}>
      <Logo />
      {site.name}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  // Header turns frosted once the page scrolls.
  useEffect(() => {
    const onScroll = () => headRef.current?.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Coral dot slides under the active nav link.
  useEffect(() => {
    const place = () => {
      const a = navRef.current?.querySelector<HTMLElement>('a[aria-current="page"]');
      const dot = dotRef.current;
      if (!dot) return;
      if (!a || !a.offsetParent) {
        dot.style.opacity = "0";
        return;
      }
      dot.style.transform = `translateX(${a.offsetLeft + a.offsetWidth / 2 - 3}px)`;
      dot.style.opacity = "1";
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [pathname]);

  const close = () => setMenuOpen(false);

  return (
    <header className="site-head" ref={headRef}>
      <div className="wrap">
        <Brand />
        <nav className="nav" aria-label="Primary" ref={navRef}>
          <ul>
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={isActive(pathname, l.href) ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="nav-dot" ref={dotRef} aria-hidden="true" />
        </nav>
        <div className="head-actions">
          <Link className="btn btn-primary btn-sm get" href="/download">
            Get {site.name}
          </Link>
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>
              <button className="icon-btn menu-btn" type="button" aria-label="Open menu">
                <Icon name="menu" size="lg" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="scrim" />
              <Dialog.Content className="sheet" aria-describedby={undefined}>
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="sheet-head">
                  <Brand onClick={close} />
                  <Dialog.Close asChild>
                    <button className="icon-btn" type="button" aria-label="Close menu">
                      <Icon name="x" size="lg" />
                    </button>
                  </Dialog.Close>
                </div>
                <div className="sheet-body">
                  <nav className="mnav" aria-label="Mobile">
                    {[{ href: "/", label: "Home" }, ...mainNav].map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={close}
                        aria-current={(l.href === "/" ? pathname === "/" : isActive(pathname, l.href)) ? "page" : undefined}
                      >
                        {l.label} <Icon name="arrow-right" />
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="sheet-foot">
                  <Link className="btn btn-primary btn-block" href="/download" onClick={close}>
                    Get {site.name}
                  </Link>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
