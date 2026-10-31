import Image from "next/image";
import Link from "next/link";
import { Sticker, type StickerShape, type StickerTone } from "@/components/art/Sticker";
import { Icon } from "@/components/icons/Icon";
import { Accordion } from "@/components/ui/Accordion";
import type { Faq } from "@/lib/api";
import { site } from "@/lib/site";
import { stagger } from "@/lib/utils";

// The quieter home sections after the three product bands: steps, notes wall, FAQ and the closing CTA.

const STEPS = [
  ["Pick the moment", "Birthdays, new jobs, thank-yous or a Tuesday that needs a lift."],
  ["Make it yours", "Write a line, add stickers, attach a gift card or pass it round the group."],
  ["Send or schedule", "It arrives by text, email or private link. No app needed to open it."],
];

export function Steps() {
  return (
    <section className="section" aria-labelledby="home-steps">
      <div className="wrap steps-split">
        <div style={{ position: "relative" }} className="rv">
          <div className="photo steps-photo">
            <Image
              src="/images/photo-envelope.webp"
              alt="A hand holding out a coral envelope with a yellow flower sticker on the flap"
              width={1400}
              height={933}
              sizes="(max-width: 1000px) 100vw, 640px"
            />
          </div>
          <Sticker
            shape="burst"
            tone="sun"
            label={
              <>
                For
                <br />
                you
              </>
            }
          />
        </div>
        <div>
          <h2 className="h2 rv" id="home-steps">
            From thought to doorstep in three taps.
          </h2>
          <ol className="steps-list">
            {STEPS.map(([title, text], i) => (
              <li key={title} className="rv" style={stagger(i + 1)}>
                <span className="n">{i + 1}</span>
                <div>
                  <h3 className="h4">{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="rv" style={{ ...stagger(4), marginTop: "2rem" }}>
            <Link className="link" href="/how-it-works">
              See the whole flow <Icon name="arrow-right" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

// shortcut: drafted demo replies, not real customers; swap for genuine ones before launch.
const NOTES: { quote: string; who: string; context: string; shape: StickerShape; tone: StickerTone }[] = [
  { quote: "You remembered the exact cake from my 21st. I cried into my coffee. Good tears.", who: "Lena, to her sister", context: "Birthday card with a Morning Crane gift", shape: "heart", tone: "coral" },
  { quote: "Fourteen signatures from three time zones. I’m framing the voice notes.", who: "Marcus, leaving his job", context: "Group card from the design team", shape: "smile", tone: "sun" },
  { quote: "The ramen card was perfect. We went the same night. Thank you, Auntie!", who: "Rosa and Ben", context: "New home card with Noodle Nook", shape: "spark", tone: "ink" },
  { quote: "Arrived at 7 on the dot, like you were standing at the door.", who: "Edith, 71", context: "Scheduled thank-you card", shape: "flower", tone: "coral" },
];

export function Notes() {
  return (
    <section className="section band-cream2" style={{ paddingTop: "clamp(4.5rem,8vw,7rem)" }} aria-labelledby="home-notes">
      <div className="wrap">
        <div className="shead">
          <h2 className="h2 rv" id="home-notes">
            Notes that came back.
          </h2>
          <p className="lead rv" style={stagger(1)}>
            A few thank-you replies, shared with us by the people who sent the cards.
          </p>
        </div>
        <div className="notes">
          {NOTES.map((n, i) => (
            <figure key={n.who} className="note rv" style={stagger(i)}>
              <Sticker shape={n.shape} tone={n.tone} />
              <blockquote>“{n.quote}”</blockquote>
              <figcaption>
                <b>{n.who}</b>
                {n.context}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="section" aria-labelledby="home-faq">
      <div className="wrap faq-split">
        <div className="faq-aside">
          <h2 className="h2 rv" id="home-faq">
            Before your first card.
          </h2>
          <p className="lead rv" style={stagger(1)}>
            The questions people ask before they download. A real person answers the rest.
          </p>
          <Link className="btn btn-ghost rv" style={stagger(2)} href="/help">
            Visit the help center
          </Link>
        </div>
        <Accordion className="rv" items={faqs} />
      </div>
    </section>
  );
}

export function CtaPanel() {
  return (
    <section className="section" style={{ paddingTop: 0 }} aria-labelledby="home-cta">
      <div className="wrap">
        <div className="cta-panel rv">
          <div className="cta-copy">
            <h2 className="h2" id="home-cta">
              Someone’s day is coming up.
            </h2>
            <p className="lead">Set the card up now. We’ll remind you, and it lands right on time.</p>
            <div className="cta-actions">
              <Link className="btn btn-primary btn-lg" href="/download">
                <Icon name="phone" />
                <span>Get {site.name}</span>
              </Link>
              <Link className="btn btn-ghost btn-lg" href="/pricing">
                See pricing
              </Link>
            </div>
          </div>
          <div className="cta-photo">
            <Image
              src="/images/photo-wrap.webp"
              alt="Hands pressing a round coral sticker onto a gift wrapped in kraft paper"
              width={1100}
              height={1100}
              sizes="(max-width: 1000px) 100vw, 560px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
