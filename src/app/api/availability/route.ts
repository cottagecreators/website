import { NextResponse } from "next/server";
import { properties } from "@/data/properties";
import { fetchCalendar, resolveRange } from "@/lib/hospitable";

// All-properties availability for the homepage timeline. Fully live per request
// on the DigitalOcean server; excluded from the static export by
// scripts/build-pages.mjs (the timeline hides itself when it's absent).
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { start, end } = resolveRange(
    url.searchParams.get("start"),
    url.searchParams.get("end"),
    90,
  );

  try {
    const results = await Promise.all(
      properties.map(async (p) => ({
        slug: p.slug,
        name: p.name,
        days: await fetchCalendar(p.hospitableUuid, start, end),
      })),
    );
    return NextResponse.json({ start, end, properties: results });
  } catch {
    return NextResponse.json(
      { error: "Availability temporarily unavailable" },
      { status: 502 },
    );
  }
}
