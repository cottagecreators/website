import { NextResponse } from "next/server";
import { properties } from "@/data/properties";
import { createQuote } from "@/lib/hospitable";

// Live per request on the DigitalOcean server; excluded from the static export
// by scripts/build-static.mjs (the picker just falls back to the raw redirect).
export const dynamic = "force-dynamic";

function intParam(value: string | null, fallback: number, min: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(min, Math.trunc(n)) : fallback;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  const checkIn = url.searchParams.get("checkIn");
  const checkOut = url.searchParams.get("checkOut");
  const adults = intParam(url.searchParams.get("adults"), 2, 1);
  const pets = intParam(url.searchParams.get("pets"), 0, 0);

  const property = properties.find((p) => p.slug === slug);
  if (!property || !checkIn || !checkOut) {
    return NextResponse.json({ error: "Missing or invalid parameters" }, { status: 400 });
  }

  try {
    const quote = await createQuote(property.hospitableUuid, checkIn, checkOut, {
      adults,
      ...(pets > 0 ? { pets } : {}),
    });
    return NextResponse.json(quote);
  } catch {
    return NextResponse.json({ error: "Quote temporarily unavailable" }, { status: 502 });
  }
}
