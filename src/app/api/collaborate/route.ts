import { NextResponse } from "next/server";

// Live per request on the DigitalOcean server; excluded from the static export
// by scripts/build-static.mjs. Forwards a validated creator application to a
// Google Apps Script Web App (COLLAB_WEBHOOK_URL) which appends a row to the
// creators Sheet. Shares COLLAB_SECRET with the script so only we can write.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COLLAB_TYPES = ["comp-stay", "discount", "paid"] as const;
const NOTICE = ["24h", "2-3 days", "1 week", "not interested"] as const;
const FOLLOWERS = ["Under 1K", "1K–5K", "5K–10K", "10K–50K", "50K–100K", "100K–500K", "500K+"] as const;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const webhook = process.env.COLLAB_WEBHOOK_URL;
  const secret = process.env.COLLAB_SECRET;
  if (!webhook) {
    return NextResponse.json({ error: "Applications aren't open yet." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const location = clean(body.location, 120);
  const niche = clean(body.niche, 200);
  const otherLinks = clean(body.otherLinks, 500);
  // Stored without the leading @ so the Sheet column is consistent to filter/look up.
  const instagram = clean(body.instagram, 100).replace(/^@/, "");
  const tiktok = clean(body.tiktok, 100).replace(/^@/, "");
  const instagramFollowers = instagram ? FOLLOWERS.find((f) => f === body.instagramFollowers) ?? "" : "";
  const tiktokFollowers = tiktok ? FOLLOWERS.find((f) => f === body.tiktokFollowers) ?? "" : "";
  const rate = clean(body.rate, 200);
  const groupSize = clean(body.groupSize, 20);
  const message = clean(body.message, 2000);

  const collabTypes = Array.isArray(body.collabTypes)
    ? COLLAB_TYPES.filter((t) => (body.collabTypes as unknown[]).includes(t))
    : [];
  const lastMinute = NOTICE.find((n) => n === body.lastMinute) ?? "";

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!instagram && !tiktok) {
    return NextResponse.json({ error: "Add your Instagram or TikTok handle." }, { status: 400 });
  }
  if ((instagram && !instagramFollowers) || (tiktok && !tiktokFollowers)) {
    return NextResponse.json({ error: "Pick a follower range for each handle." }, { status: 400 });
  }
  if (collabTypes.length === 0) {
    return NextResponse.json({ error: "Choose at least one type of collaboration." }, { status: 400 });
  }
  if (!lastMinute) {
    return NextResponse.json({ error: "Let us know about last-minute stays." }, { status: 400 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        secret,
        name,
        email,
        phone,
        location,
        instagram,
        instagramFollowers,
        tiktok,
        tiktokFollowers,
        otherLinks,
        niche,
        collabTypes: collabTypes.join(", "),
        rate,
        lastMinute,
        groupSize,
        message,
        source: "website",
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
    if (!res.ok || data.ok === false) throw new Error("upstream");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
}
