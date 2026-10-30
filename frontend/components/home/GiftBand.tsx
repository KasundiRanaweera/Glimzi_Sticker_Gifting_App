import Link from "next/link";
import { GiftCard } from "@/components/art/GiftCard";
import { Icon } from "@/components/icons/Icon";
import type { Category, Gift } from "@/lib/api";
import { stagger } from "@/lib/utils";

// The fan holds exactly four cards (positions are nth-child rules in CSS): shop id and the amount shown.
const FAN: [string, number][] = [
  ["noodle-nook", 20],
  ["inkwell-lane", 25],
  ["pixel-parlour", 40],
  ["starlight-screen", 30],
];

export function GiftBand({ gifts, categories }: { gifts: Gift[]; categories: Category[] }) {
  const fan = FAN.flatMap(([id, amount]) => {
    const gift = gifts.find((g) => g.id === id);
    return gift ? [{ gift, amount }] : [];
  });

  return (
    <section className="band band-sun rounded-band section" style={{ marginTop: "1rem" }} aria-labelledby="home-gifts">
      <div className="wrap giftband">
        <div>
          <h2 className="h2 rv" id="home-gifts">
            Gift cards they’ll actually use.
          </h2>
          <p className="lead rv" style={{ ...stagger(1), marginTop: "1.1rem" }}>
            Hand-picked independent shops, from roasters to cinemas. Attach one to any card and it arrives on the same morning.
          </p>
          <nav className="cat-list rv" style={stagger(2)} aria-label="Gift card categories">
            {categories.map((c) => (
              <Link key={c.id} href={`/gift-cards?category=${c.id}`}>
                {c.label}{" "}
                <span>
                  {c.count} {c.count === 1 ? "shop" : "shops"} <Icon name="arrow-right" size="sm" />
                </span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="fan rv" style={stagger(1)}>
          {fan.map(({ gift, amount }) => (
            <GiftCard key={gift.id} gift={gift} amount={amount} />
          ))}
        </div>
      </div>
    </section>
  );
}
