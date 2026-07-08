"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "done" | "error";

export default function SubscribeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(true);
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!emailOptIn && !smsOptIn) {
      setError("Pick email, text, or both.");
      return;
    }
    setState("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, emailOptIn, smsOptIn }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[8px] border border-edge bg-bone p-8 text-center">
        <p className="font-display text-[26px] text-pine" style={{ fontWeight: 500 }}>
          You&apos;re on the list 🌲
        </p>
        <p className="mt-2 text-[15px] text-muted">
          Thanks for subscribing — we&apos;ll be in touch with Muskoka news and offers.
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-[5px] border border-edge bg-bone px-4 py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-clay";

  return (
    <form onSubmit={onSubmit} className="rounded-[8px] border border-edge bg-bone p-6 text-left md:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[13px] font-medium text-muted">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-[13px] font-medium text-muted">
            Email {emailOptIn && <span className="text-clay">*</span>}
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required={emailOptIn}
            className={inputClass}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-[13px] font-medium text-muted">
          Mobile number {smsOptIn && <span className="text-clay">*</span>}
        </span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          required={smsOptIn}
          placeholder="For text offers"
          className={inputClass}
        />
      </label>

      <fieldset className="mt-5">
        <legend className="text-[13px] font-medium text-muted">Send me…</legend>
        <div className="mt-2 space-y-2.5">
          <label className="flex items-start gap-3 text-[15px] text-ink">
            <input
              type="checkbox"
              checked={emailOptIn}
              onChange={(e) => setEmailOptIn(e.target.checked)}
              className="mt-1 h-4 w-4 accent-clay"
            />
            <span>
              <strong className="font-medium">Email promotions</strong> — seasonal offers,
              availability, and Muskoka inspiration.
            </span>
          </label>
          <label className="flex items-start gap-3 text-[15px] text-ink">
            <input
              type="checkbox"
              checked={smsOptIn}
              onChange={(e) => setSmsOptIn(e.target.checked)}
              className="mt-1 h-4 w-4 accent-clay"
            />
            <span>
              <strong className="font-medium">Text promotions</strong> — the occasional
              last-minute deal by SMS.
            </span>
          </label>
        </div>
      </fieldset>

      {error && <p className="mt-4 text-[13px] text-clay">{error}</p>}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-5 w-full rounded-[4px] bg-clay px-6 py-3 text-[15px] font-semibold text-bone transition-colors hover:bg-clay-dark disabled:opacity-60"
      >
        {state === "submitting" ? "Subscribing…" : "Subscribe"}
      </button>

      <p className="mt-3 text-[12px] text-muted">
        We respect your privacy and never share your details. Unsubscribe anytime; message
        rates may apply for texts.
      </p>
    </form>
  );
}
