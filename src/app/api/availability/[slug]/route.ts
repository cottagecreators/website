import { NextResponse } from "next/server";
import { properties } from "@/data/properties";
import { fetchCalendar, resolveRange } from "@/lib/hospitable";

// Fully live on every request (DigitalOcean Node server). This route is
// excluded from the static GitHub Pages export by scripts/build-pages.mjs,
// because dynamic Route Handlers cannot be statically exported. When it's
// absent, AvailabilityPicker falls back to plain date inputs.
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) {
    return NextResponse.json({ error: "Unknown property" }, { status: 404 });
  }

  const url = new URL(request.url);
  const { start, end } = resolveRange(
    url.searchParams.get("start"),
    url.searchParams.get("end"),
  );

  try {
    const days = await fetchCalendar(property.hospitableUuid, start, end);
    return NextResponse.json({ slug, start, end, days });
  } catch {
    return NextResponse.json(
      { error: "Availability temporarily unavailable" },
      { status: 502 },
    );
  }
}
