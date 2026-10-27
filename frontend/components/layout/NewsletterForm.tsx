"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/Icon";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// shortcut: confirms locally only; Day 6 posts to POST /api/newsletter.
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const submit = () => {
    const ok = EMAIL.test(email.trim());
    setInvalid(!ok);
    if (!ok) return document.getElementById("news-email")?.focus();
    setStatus("loading");
    setTimeout(() => setStatus("done"), 750);
  };

  if (status === "done")
    return (
      <div className="success" role="status">
        <span className="tick">
          <Icon name="check" />
        </span>
        <div>
          <strong>You’re on the list.</strong>
          <p>Preview only: no email was stored or sent.</p>
        </div>
      </div>
    );

  return (
    <form
      className="news-form"
      noValidate
      aria-label="Newsletter sign-up"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className={`field${invalid ? " is-invalid" : ""}`}>
        <label className="sr-only" htmlFor="news-email">
          Email address
        </label>
        <input
          className="input"
          id="news-email"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          aria-invalid={invalid || undefined}
          aria-describedby="news-email-err"
          onChange={(e) => {
            setEmail(e.target.value);
            if (invalid) setInvalid(!EMAIL.test(e.target.value.trim()));
          }}
        />
        <p className="err" id="news-email-err">
          <Icon name="alert" size="sm" />
          <span>Enter an email like name@example.com.</span>
        </p>
      </div>
      <button
        className={`btn btn-sun${status === "loading" ? " is-loading" : ""}`}
        type="submit"
        aria-busy={status === "loading" || undefined}
      >
        <span className="btn-label">Subscribe</span>
        <span className="spin" aria-hidden="true" />
      </button>
    </form>
  );
}
