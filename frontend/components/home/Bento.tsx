import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { GreetingCard, PlacedSticker } from "@/components/art/GreetingCard";
import { Icon } from "@/components/icons/Icon";
import { site } from "@/lib/site";

function Tile({ className, href, i, children }: { className: string; href: string; i?: number; children: ReactNode }) {
  return (
    <Link className={`tile ${className} rv`} href={href} style={i ? ({ "--i": i } as CSSProperties) : undefined}>
      <span className="go" aria-hidden="true">
        <Icon name="arrow-right" />
      </span>
      {children}
    </Link>
  );
}

// November 2026, Monday first. Leading days belong to October.
const calendar = [
  [26, 27, 28, 29, 30, 31, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
];

export function Bento() {
  return (
    <section className="section" aria-labelledby="home-feat">
      <div className="wrap">
        <div className="shead">
          <h2 className="h2 rv" id="home-feat">
            Everything a good gifter needs.
          </h2>
          <p className="lead rv" style={{ "--i": 1 } as CSSProperties}>
            One place for the card, the gift and the date, so the thought you had on Tuesday actually arrives on Friday.
          </p>
        </div>
        <div className="bento">
          <Tile className="t-card" href="/features#f-cards">
            <h3 className="h3">Make the card</h3>
            <p>Pick a design, then add photos, stickers, a voice note or your own handwriting.</p>
            <div className="tile-ui mini-editor" aria-hidden="true">
              <GreetingCard image="card-home" title="Welcome home, you two" message="The kettle is on us. Maya">
                <PlacedSticker shape="heart" color="var(--coral)" x={80} y={12} r={14} />
                <PlacedSticker shape="smile" color="var(--sun)" x={18} y={56} r={-12} />
              </GreetingCard>
              <div className="toolrail">
                <span>
                  <Icon name="image" />
                  Photo
                </span>
                <span className="on">
                  <Icon name="smile" />
                  Stickers
                </span>
                <span>
                  <Icon name="mic" />
                  Voice note
                </span>
                <span>
                  <Icon name="pen" />
                  Handwriting
                </span>
              </div>
            </div>
          </Tile>

          <Tile className="t-sched" href="/features#f-schedule" i={1}>
            <div className="sched-row">
              <div>
                <h3 className="h3">Schedule it</h3>
                <p>Write it when you think of it. It arrives at 7:00 am their time.</p>
              </div>
              <div className="cal" aria-hidden="true">
                <div className="cal-h">
                  <span>November</span>
                  <span className="muted">2026</span>
                </div>
                <div className="cal-g tnum">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span className="dw" key={i}>
                      {d}
                    </span>
                  ))}
                  {calendar.flat().map((d, i) => (
                    <span key={i} className={i < 6 ? "mute" : d === 6 ? "on" : undefined}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Tile>

          <Tile className="t-group" href="/features#f-group" i={2}>
            <h3 className="h3">Pass it round</h3>
            <p>One link lets the whole team sign the card and chip in, with or without the app.</p>
            <div className="tile-ui pool" aria-hidden="true">
              <div className="pool-top">
                <div className="faces">
                  <span style={{ background: "var(--coral)" }}>NA</span>
                  <span style={{ background: "var(--sun)" }}>TH</span>
                  <span style={{ background: "var(--sage)" }}>RB</span>
                  <span style={{ background: "var(--peach)" }}>AK</span>
                  <span style={{ background: "var(--ink)", color: "var(--paper)" }}>+5</span>
                </div>
                <div className="pool-amt tnum">
                  $145 <small>of $200</small>
                </div>
              </div>
              <div className="bar rv">
                <i />
              </div>
            </div>
          </Tile>

          <Tile className="t-wallet" href="/features#f-wallet">
            <div className="wallet-ui">
              <div>
                <h3 className="h3">Keep it in your wallet</h3>
                <p>Every gift you receive in one place, ready to spend or swap.</p>
                <ul className="tx tnum" aria-hidden="true" style={{ marginTop: "1.25rem" }}>
                  <li>
                    <span>From Hana, Inkwell Lane</span>
                    <b>$30.00</b>
                  </li>
                  <li>
                    <span>Swapped to {site.name} Cash</span>
                    <b>$18.50</b>
                  </li>
                </ul>
              </div>
              <div className="cashcard" aria-hidden="true">
                <div className="cc-top">
                  <span>{site.name} Cash</span>
                  <svg>
                    <use href="/sprite.svg#logo" />
                  </svg>
                </div>
                <div>
                  <div className="cc-sub">Balance</div>
                  <div className="cc-amt">$132.40</div>
                </div>
              </div>
            </div>
          </Tile>

          <Tile className="t-remind" href="/features#f-reminders" i={1}>
            <h3 className="h3">Never miss a day</h3>
            <p>A nudge three days before, while there’s still time.</p>
            <div className="tile-ui" aria-hidden="true">
              <div className="notif">
                <span className="app-ic">
                  <svg width="22" height="22">
                    <use href="/sprite.svg#logo" />
                  </svg>
                </span>
                <span>
                  <b>Omar turns 30 on Friday</b>Last year you sent the cake card. Same again?
                </span>
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
