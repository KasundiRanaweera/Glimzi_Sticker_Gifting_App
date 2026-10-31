"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { GreetingCard } from "@/components/art/GreetingCard";
import { Phone } from "@/components/art/Phone";
import { Sticker } from "@/components/art/Sticker";
import { Icon } from "@/components/icons/Icon";
import type { Gift, Occasion } from "@/lib/api";
import { site } from "@/lib/site";
import { cn, stagger, usd } from "@/lib/utils";

// The two tilted cards beside the phone; positions are fixed in CSS.
const heroSlots = [
  { caption: "A little pick-me-up.", className: "hero-gift-coffee" },
  { caption: "Just because.", className: "hero-gift-flower" },
];

export function Hero({ occasions, heroGifts }: { occasions: Occasion[]; heroGifts: Gift[] }) {
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const timer = useRef<number>(undefined);
  const occ = occasions[index];
  const gift = occ.gift;

  // Fade the card out, swap the occasion, fade back in. Reduced motion swaps instantly.
  const step = (dir: 1 | -1) => {
    const next = (index + dir + occasions.length) % occasions.length;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setIndex(next);
    window.clearTimeout(timer.current);
    setSwapping(true);
    timer.current = window.setTimeout(() => {
      setIndex(next);
      setSwapping(false);
    }, 200);
  };

  return (
    <section className="hero" aria-labelledby="home-h1">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker hi" style={stagger(0)}>
            Little gestures. Big feelings.
          </p>
          <h1 className="display hi" id="home-h1" style={stagger(1)}>
            Send more
            <br /> smiles.
          </h1>
          <p className="hero-lead hi" style={stagger(2)}>
            A card, a little gift, a whole lot of love.
          </p>
          <div className="hero-cta hi" style={stagger(3)}>
            <Link className="btn btn-primary" href="/download">
              <span>Start gifting</span>
              <Icon name="arrow-right" size="sm" className="i-move" />
            </Link>
            <Link className="link hero-link" href="/gift-cards">
              Explore gift cards
            </Link>
          </div>
          <p className="hero-note hi" style={stagger(4)}>
            <svg className="hero-note-heart" aria-hidden="true">
              <use href="/sprite.svg#s-heart" />
            </svg>
            <span>
              For their big days.
              <br />
              And the little ones, too.
            </span>
          </p>
        </div>

        <div className="hero-scene">
          <span className="hero-orbit" aria-hidden="true" />
          {heroGifts.slice(0, heroSlots.length).map((g, i) => (
            <Link key={g.id} className={cn("hero-gift hi-scale", heroSlots[i].className)} href={`/gift-cards/${g.id}`} aria-label={`${g.name} gift card`}>
              <Image src={`/images/${g.image}.webp`} alt="" width={900} height={900} sizes="160px" loading="eager" fetchPriority="high" />
              <span>{heroSlots[i].caption}</span>
            </Link>
          ))}

          <Phone className="hero-phone hi-scale" label={`The ${site.name} app showing a card ready to send, with a gift card attached`}>
            <div className="app-top">
              <span className="ab">
                <Icon name="chevron-left" />
              </span>
              <span className="who">
                {occ.recipient}
                <small>{occ.schedule}</small>
              </span>
              <span className="send">Send</span>
            </div>
            <div className="app-body">
              <div className="screen-card">
                <GreetingCard eager className={cn("swap-fade", swapping && "is-out")} image={occ.image ?? undefined} title={occ.title} message={occ.message} />
              </div>
              <div className="app-gift">
                <Image src={`/images/${gift.image}.webp`} alt="" width={900} height={900} sizes="48px" />
                <span>
                  <b>{gift.name}</b>Gift card attached
                </span>
                <span className="amt">{usd(occ.amount)}</span>
              </div>
            </div>
            <div className="app-tabs">
              <span className="on">
                <Icon name="home" />
                Home
              </span>
              <span>
                <Icon name="inbox" />
                Inbox
              </span>
              <span>
                <Icon name="gift" />
                Gifts
              </span>
              <span>
                <Icon name="wallet" />
                Wallet
              </span>
            </div>
          </Phone>

          <span className="hero-sent hi" style={stagger(4)} aria-hidden="true">
            <Icon name="check" size="sm" />A little joy, delivered.
          </span>
          <Sticker shape="flower" tone="coral" className="hero-flower stk-in" style={stagger(0)} />
          <Sticker shape="smile" tone="sun" className="hero-smile stk-in" style={stagger(1)} />

          <div className="occ hi" style={stagger(4)}>
            <button className="icon-btn" type="button" onClick={() => step(-1)} aria-label="Previous occasion">
              <Icon name="chevron-left" size="sm" />
            </button>
            <span className="occ-label" aria-live="polite">
              {occ.label}
            </span>
            <button className="icon-btn" type="button" onClick={() => step(1)} aria-label="Next occasion">
              <Icon name="chevron-right" size="sm" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
