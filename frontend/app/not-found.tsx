import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap">
        <div className="nf-art" aria-hidden="true">
          <span className="big">404</span>
          <span className="stk stk-coral nf-s1">
            <svg>
              <use href="/sprite.svg#s-burst" />
            </svg>
            <b>Oops!</b>
          </span>
          <span className="stk stk-sun nf-s2">
            <svg>
              <use href="/sprite.svg#s-smile" />
            </svg>
          </span>
        </div>
        <h1 className="h2">This page got lost in the post.</h1>
        <p className="lead" style={{ margin: "1rem auto 0" }}>
          The link may be old, or the page has moved. These will get you back on track.
        </p>
        <div className="btns">
          <Link className="btn btn-primary" href="/">
            Back to home
          </Link>
          <Link className="btn btn-ghost" href="/gift-cards">
            Browse gift cards
          </Link>
          <Link className="btn btn-ghost" href="/help">
            Visit help
          </Link>
        </div>
      </div>
    </section>
  );
}
