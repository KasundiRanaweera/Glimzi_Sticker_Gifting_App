import Link from "next/link";
import { Icon } from "@/components/icons/Icon";

// shortcut: placeholder home; the full hero, bands and sections replace this on Days 2 and 3.
export default function Home() {
  return (
    <section className="phead">
      <div className="wrap">
        <h1 className="display">
          Send more
          <br />
          smiles.
        </h1>
        <p className="lead">A card, a little gift, a whole lot of love.</p>
        <div className="btns" style={{ display: "flex", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/download">
            Start gifting <Icon name="arrow-right" />
          </Link>
          <Link className="btn btn-ghost" href="/gift-cards">
            Explore gift cards
          </Link>
        </div>
      </div>
    </section>
  );
}
