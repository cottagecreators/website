import { NextResponse } from "next/server";

// Live per request on the DigitalOcean server; excluded from the static export
// by scripts/build-static.mjs. Forwards a validated sign-up to a Google Apps
// Script Web App (SUBSCRIBE_WEBHOOK_URL) which appends a row to the Sheet. The
// script + our server share SUBSCRIBE_SECRET so only we can write.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const webhook = process.env.SUBSCRIBE_WEBHOOK_URL;
  const secret = process.env.SUBSCRIBE_SECRET;
  if (!webhook) {
    return NextResponse.json({ error: "Sign-up isn't configured yet." }, { status: 503 });
  }

  let body: {
    name?: string;
    email?: string;
    phone?: string;
    emailOptIn?: boolean;
    smsOptIn?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 200);
  const phone = (body.phone ?? "").trim().slice(0, 40);
  const emailOptIn = !!body.emailOptIn;
  const smsOptIn = !!body.smsOptIn;

  if (!emailOptIn && !smsOptIn) {
    return NextResponse.json({ error: "Choose email, text, or both." }, { status: 400 });
  }
  if (emailOptIn && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (smsOptIn && phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Please enter a valid mobile number for texts." }, { status: 400 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ secret, name, email, phone, emailOptIn, smsOptIn, source: "website" }),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
    if (!res.ok || data.ok === false) throw new Error("upstream");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
}
