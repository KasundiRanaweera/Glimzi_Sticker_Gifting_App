"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { site } from "@/lib/site";
import { stagger, usd } from "@/lib/utils";

const CHIPS = [15, 25, 50, 100];
const MIN = 5;
const MAX = 500;
const STEP = 5;

// Ink band: pick a Cash amount with chips or the ±$5 stepper; the card face follows.
export function CashBand() {
  const [amount, setAmount] = useState(25);
  const nudge = (by: number) => setAmount((a) => Math.min(MAX, Math.max(MIN, a + by)));

  return (
    <section className="band band-ink rounded-band section" style={{ marginTop: "1rem" }} aria-labelledby="home-cash">
      <div className="wrap cash">
        <h2 className="h2 rv" id="home-cash">
          Can’t decide? Send Cash.
        </h2>
        <p className="lead rv" style={{ ...stagger(1), marginTop: "1.1rem", textAlign: "center" }}>
          {site.name} Cash lets them pick any shop in the app, whenever they like.
        </p>
        <div className="cash-stage rv" style={stagger(2)}>
          <div className="cashcard" aria-hidden="true">
            <div className="cc-top">
              <span>{site.name} Cash</span>
              <svg>
                <use href="/sprite.svg#logo" />
              </svg>
            </div>
            <div>
              <div className="cc-sub">For Nadia, with love</div>
              <div className="cc-amt">{usd(amount)}</div>
            </div>
          </div>
          <span className="tag-stk" aria-hidden="true">
            Never expires
          </span>
        </div>
        <div className="cash-ctrl rv" style={stagger(3)}>
          <div className="chips" role="group" aria-label="Choose an amount">
            {CHIPS.map((v) => (
              <button key={v} className="chip" type="button" aria-pressed={amount === v} onClick={() => setAmount(v)}>
                {usd(v)}
              </button>
            ))}
          </div>
          <div className="stepper" role="group" aria-label={`Adjust amount by ${usd(STEP)}`}>
            <button type="button" onClick={() => nudge(-STEP)} disabled={amount <= MIN} aria-label={`Decrease by ${usd(STEP)}`}>
              <Icon name="minus" />
            </button>
            <output className="tnum" aria-live="polite">
              {usd(amount)}
            </output>
            <button type="button" onClick={() => nudge(STEP)} disabled={amount >= MAX} aria-label={`Increase by ${usd(STEP)}`}>
              <Icon name="plus" />
            </button>
          </div>
        </div>
        <ul className="cash-facts">
          <li className="rv">
            <span className="h4">
              <Icon name="store" />
              Spend it anywhere
            </span>
            <p>Any shop in the {site.name} catalogue, in store or online.</p>
          </li>
          <li className="rv" style={stagger(1)}>
            <span className="h4">
              <Icon name="infinity" />
              No expiry, no fees
            </span>
            <p>Nothing to pay on the receiving side, and the balance never runs out of time.</p>
          </li>
          <li className="rv" style={stagger(2)}>
            <span className="h4">
              <Icon name="repeat" />
              Swap any gift card
            </span>
            <p>Got a card for a shop you never visit? Swap it for Cash at full value.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
