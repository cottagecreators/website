"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "done" | "error";

const COLLAB_TYPES = [
  { key: "comp-stay", label: "Complimentary stay", hint: "a free stay in exchange for content" },
  { key: "discount", label: "Discounted stay", hint: "a reduced rate in exchange for content" },
  { key: "paid", label: "Paid promotion", hint: "a paid campaign, plus a stay" },
] as const;

const NOTICE = [
  { key: "24h", label: "Yes — I can go with 24 hours' notice" },
  { key: "2-3 days", label: "Yes — with 2–3 days' notice" },
  { key: "1 week", label: "Yes — with about a week's notice" },
  { key: "not interested", label: "No — planned stays only" },
] as const;

const FOLLOWERS = ["Under 1K", "1K–5K", "5K–10K", "10K–50K", "50K–100K", "100K–500K", "500K+"];

export default function CollaborateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [instagram, setInstagram] = useState("");
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [tiktokFollowers, setTiktokFollowers] = useState("");
  const [otherLinks, setOtherLinks] = useState("");
  const [niche, setNiche] = useState("");
  const [collabTypes, setCollabTypes] = useState<string[]>([]);
  const [rate, setRate] = useState("");
  const [lastMinute, setLastMinute] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  function toggleCollab(key: string, on: boolean) {
    setCollabTypes((prev) => (on ? [...prev, key] : prev.filter((k) => k !== key)));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!instagram.trim() && !tiktok.trim()) {
      setError("Add your Instagram or TikTok handle.");
      return;
    }
    if ((instagram.trim() && !instagramFollowers) || (tiktok.trim() && !tiktokFollowers)) {
      setError("Pick a follower range for each handle.");
      return;
    }
    if (collabTypes.length === 0) {
      setError("Choose at least one type of collaboration.");
      return;
    }
    if (!lastMinute) {
      setError("Let us know about last-minute stays.");
      return;
    }
    setState("submitting");
    try {
      const res = await fetch("/api/collaborate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          location,
          instagram,
          instagramFollowers: instagram.trim() ? instagramFollowers : "",
          tiktok,
          tiktokFollowers: tiktok.trim() ? tiktokFollowers : "",
          otherLinks,
          niche,
          collabTypes,
          rate: collabTypes.includes("paid") ? rate : "",
          lastMinute,
          groupSize,
          message,
        }),
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
          Thanks! We&apos;ll be in touch when there&apos;s a fit
          {lastMinute !== "not interested" && " — keep an eye on your inbox for last-minute openings"}.
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-[5px] border border-edge bg-bone px-4 py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-clay";
  const labelText = "text-[13px] font-medium text-muted";
  const legendClass = "font-display text-[20px] text-pine";

  return (
    <form onSubmit={onSubmit} className="rounded-[8px] border border-edge bg-bone p-6 text-left md:p-8">
      <fieldset>
        <legend className={legendClass} style={{ fontWeight: 500 }}>
          About you
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelText}>
              Name <span className="text-clay">*</span>
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelText}>
              Email <span className="text-clay">*</span>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelText}>Mobile number</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelText}>Where are you based?</span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Toronto, ON"
              className={inputClass}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className={legendClass} style={{ fontWeight: 500 }}>
          Your channels
        </legend>
        <p className="mt-1 text-[13px] text-muted">Instagram, TikTok, or both.</p>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: "Instagram handle", handle: instagram, setHandle: setInstagram, followers: instagramFollowers, setFollowers: setInstagramFollowers },
            { label: "TikTok handle", handle: tiktok, setHandle: setTiktok, followers: tiktokFollowers, setFollowers: setTiktokFollowers },
          ].map((p) => (
            <div key={p.label} className="contents">
              <label className="block">
                <span className={labelText}>{p.label}</span>
                <input
                  type="text"
                  value={p.handle}
                  onChange={(e) => p.setHandle(e.target.value)}
                  placeholder="@yourhandle"
                  autoCapitalize="none"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className={labelText}>
                  Followers {p.handle.trim() && <span className="text-clay">*</span>}
                </span>
                <select
                  value={p.followers}
                  onChange={(e) => p.setFollowers(e.target.value)}
                  required={!!p.handle.trim()}
                  className={inputClass}
                >
                  <option value="">Select a range…</option>
                  {FOLLOWERS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}
          <label className="block">
            <span className={labelText}>Other links</span>
            <input
              type="text"
              value={otherLinks}
              onChange={(e) => setOtherLinks(e.target.value)}
              placeholder="YouTube, blog, Facebook…"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelText}>Content niche</span>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Travel, couples, family, food…"
              className={inputClass}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className={legendClass} style={{ fontWeight: 500 }}>
          Collaboration <span className="text-clay">*</span>
        </legend>
        <p className="mt-1 text-[13px] text-muted">What are you open to? Choose all that apply.</p>
        <div className="mt-3 space-y-2.5">
          {COLLAB_TYPES.map((c) => (
            <label key={c.key} className="flex items-start gap-3 text-[15px] text-ink">
              <input
                type="checkbox"
                checked={collabTypes.includes(c.key)}
                onChange={(e) => toggleCollab(c.key, e.target.checked)}
                className="mt-1 h-4 w-4 accent-clay"
              />
              <span>
                <strong className="font-medium">{c.label}</strong> — {c.hint}
              </span>
            </label>
          ))}
        </div>
        {collabTypes.includes("paid") && (
          <label className="mt-4 block">
            <span className={labelText}>Your rates or packages</span>
            <input
              type="text"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 1 Reel + 3 stories — $500, or a link to your rate card"
              className={inputClass}
            />
          </label>
        )}
      </fieldset>

      <fieldset className="mt-8">
        <legend className={legendClass} style={{ fontWeight: 500 }}>
          Last-minute stays <span className="text-clay">*</span>
        </legend>
        <p className="mt-1 text-[13px] text-muted">
          When a gap opens between bookings we email this list — first to reply gets it.
          Would you like to be included?
        </p>
        <div className="mt-3 space-y-2.5">
          {NOTICE.map((n) => (
            <label key={n.key} className="flex items-start gap-3 text-[15px] text-ink">
              <input
                type="radio"
                name="lastMinute"
                value={n.key}
                checked={lastMinute === n.key}
                onChange={() => setLastMinute(n.key)}
                className="mt-1 h-4 w-4 accent-clay"
              />
              <span>{n.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr]">
        <label className="block">
          <span className={labelText}>Usual group size</span>
          <input
            type="number"
            min={1}
            max={12}
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className={labelText}>Anything else? Past collabs, ideas, dates that work…</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className={inputClass}
          />
        </label>
      </div>

      {error && <p className="mt-4 text-[13px] text-clay">{error}</p>}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-5 w-full rounded-[4px] bg-clay px-6 py-3 text-[15px] font-semibold text-bone transition-colors hover:bg-clay-dark disabled:opacity-60"
      >
        {state === "submitting" ? "Sending…" : "Join the list"}
      </button>

      <p className="mt-3 text-[12px] text-muted">
        We only use your details to contact you about collaborations and never share them.
      </p>
    </form>
  );
}
