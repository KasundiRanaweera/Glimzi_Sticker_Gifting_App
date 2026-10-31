"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GreetingCard, PlacedSticker } from "@/components/art/GreetingCard";
import type { StickerShape } from "@/components/art/Sticker";
import { Icon } from "@/components/icons/Icon";
import { stagger } from "@/lib/utils";

const DESIGNS = [
  { name: "Birthday", image: "card-birthday", title: "Happy birthday, Nadia!" },
  { name: "Thank you", image: "card-thanks", title: "Thank you, truly." },
  { name: "New home", image: "card-home", title: "Welcome home, you two" },
  { name: "Congrats", image: undefined, title: "" },
];

const STICKERS: { id: string; shape: StickerShape; color: string; name: string; label?: string; x: number; y: number; r: number; wide?: boolean }[] = [
  { id: "yay", shape: "burst", color: "var(--coral)", label: "Yay!", name: "Yay starburst", x: 80, y: 13, r: 12 },
  { id: "smile", shape: "smile", color: "var(--sun)", name: "Smiley", x: 17, y: 14, r: -12 },
  { id: "heart", shape: "heart", color: "var(--coral)", name: "Heart", x: 84, y: 50, r: 10 },
  { id: "flower", shape: "flower", color: "var(--sun)", name: "Flower", x: 15, y: 50, r: -8 },
  { id: "spark", shape: "spark", color: "var(--ink)", name: "Sparkle", x: 52, y: 7, r: 0 },
  { id: "xo", shape: "pill", color: "var(--sun)", label: "XO", name: "XO label", x: 74, y: 64, r: -8, wide: true },
];

const MAX_STICKERS = 4;
const MAX_MESSAGE = 60;
const START = { design: 0, message: "Cake first, questions later.", stickers: [] as string[] };

// Coral band: a working mini version of the in-app card editor. Nothing leaves the page.
export function CardEditor() {
  const [design, setDesign] = useState(START.design);
  const [message, setMessage] = useState(START.message);
  const [stickers, setStickers] = useState(START.stickers);
  const [lastAdded, setLastAdded] = useState<string>();
  const d = DESIGNS[design];
  const full = stickers.length >= MAX_STICKERS;

  const toggleSticker = (id: string) => {
    if (stickers.includes(id)) return setStickers(stickers.filter((s) => s !== id));
    if (full) return;
    setStickers([...stickers, id]);
    setLastAdded(id);
  };

  const reset = () => {
    setDesign(START.design);
    setMessage(START.message);
    setStickers(START.stickers);
  };

  const summary = `Card preview: ${d.name} design${stickers.length ? ` with ${stickers.length} sticker${stickers.length > 1 ? "s" : ""}` : ""}`;

  return (
    <section className="band band-coral rounded-band section" aria-labelledby="home-editor" id="make">
      <div className="wrap editor">
        <div className="editor-stage">
          <div className="editor-card">
            <div className="editor-env" aria-hidden="true" />
            <GreetingCard image={d.image} title={d.title} message={message || " "} label={summary}>
              {STICKERS.filter((s) => stickers.includes(s.id)).map((s) => (
                <PlacedSticker key={s.id} {...s} isNew={s.id === lastAdded} />
              ))}
            </GreetingCard>
          </div>
        </div>

        <div className="editor-panel">
          <div>
            <h2 className="h2 rv" id="home-editor">
              Cards that sound like you.
            </h2>
            <p className="lead rv" style={{ ...stagger(1), marginTop: "1.1rem" }}>
              Try it here: choose a design, write a line and press on a few stickers. In the app you can add photos and a voice note too.
            </p>
          </div>

          <div className="rv" style={stagger(2)}>
            <div className="ctrl-label" id="ed-design-l">
              Design
            </div>
            <div className="designs" role="group" aria-labelledby="ed-design-l">
              {DESIGNS.map((x, i) => (
                <button key={x.name} className="design-btn" type="button" aria-pressed={i === design} aria-label={`${x.name} design`} onClick={() => setDesign(i)}>
                  {x.image ? (
                    <Image src={`/images/${x.image}.webp`} alt="" width={64} height={84} />
                  ) : (
                    <span className="gc-type" style={{ position: "absolute", inset: 0, padding: 6 }}>
                      <span className="big" style={{ fontSize: "1rem" }}>
                        You <em>did</em> it.
                      </span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="field rv" style={stagger(3)}>
            <div className="ctrl-label">
              <label htmlFor="ed-msg">Your message</label>
              <span className="char">
                {message.length} / {MAX_MESSAGE}
              </span>
            </div>
            <input className="input" id="ed-msg" maxLength={MAX_MESSAGE} value={message} autoComplete="off" onChange={(e) => setMessage(e.target.value)} />
          </div>

          <div className="rv" style={stagger(4)}>
            <div className="ctrl-label" id="ed-stk-l">
              Stickers{" "}
              <span className="char" aria-live="polite">
                {stickers.length} of {MAX_STICKERS} placed{full && ", remove one to add another"}
              </span>
            </div>
            <div className="stk-tray" role="group" aria-labelledby="ed-stk-l">
              {STICKERS.map((s) => {
                const on = stickers.includes(s.id);
                return (
                  <button
                    key={s.id}
                    className="stk-btn"
                    type="button"
                    aria-pressed={on}
                    aria-label={`${s.name} sticker`}
                    disabled={full && !on}
                    onClick={() => toggleSticker(s.id)}
                  >
                    <svg style={{ color: s.color, ...(s.wide && { width: 46, height: 28 }) }} aria-hidden="true">
                      <use href={`/sprite.svg#s-${s.shape}`} />
                    </svg>
                    {s.label && <b>{s.label}</b>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rv" style={{ ...stagger(5), display: "flex", flexWrap: "wrap", gap: ".75rem", alignItems: "center" }}>
            <Link className="btn btn-primary" href="/download">
              <span>Send it from the app</span>
              <Icon name="arrow-right" className="i-move" />
            </Link>
            <button className="btn btn-ghost" type="button" onClick={reset}>
              Start over
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
