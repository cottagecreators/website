/**
 * Server-only helpers for the Hospitable public API.
 *
 * IMPORTANT: this module reads `HOSPITABLE_TOKEN` and must never be imported by
 * a Client Component — it is only used by the /api/availability route handlers,
 * which run on the DigitalOcean Node server. On the static GitHub Pages export
 * there is no server, so those routes are skipped and this code never ships to
 * the browser.
 */

import type { CalendarDay } from "@/lib/calendar";

const HOSPITABLE_API = "https://public.api.hospitable.com/v2";

interface HospitableDay {
  date: string;
  min_stay?: number;
  closed_for_checkin?: boolean;
  closed_for_checkout?: boolean;
  status?: { available?: boolean };
  price?: { amount?: number; currency?: string; formatted?: string };
}

function normalizeDay(d: HospitableDay): CalendarDay {
  return {
    date: d.date,
    available: d.status?.available ?? false,
    minStay: d.min_stay ?? 1,
    closedForCheckin: d.closed_for_checkin ?? false,
    closedForCheckout: d.closed_for_checkout ?? false,
    price: typeof d.price?.amount === "number" ? d.price.amount / 100 : null,
    priceFormatted: d.price?.formatted ?? null,
    currency: d.price?.currency ?? null,
  };
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Resolve a start/end window from optional query params, defaulting to
 * [today, today + `days`]. Invalid or missing values fall back to the default.
 */
export function resolveRange(
  start: string | null,
  end: string | null,
  days = 180,
): { start: string; end: string } {
  const startDate = start && ISO_DATE.test(start) ? start : toISO(new Date());
  let endDate: string;
  if (end && ISO_DATE.test(end)) {
    endDate = end;
  } else {
    const d = new Date(`${startDate}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + days);
    endDate = toISO(d);
  }
  return { start: startDate, end: endDate };
}

/** Fetch and normalize a property's calendar. Throws on missing token / bad response. */
export async function fetchCalendar(
  uuid: string,
  start: string,
  end: string,
): Promise<CalendarDay[]> {
  const token = process.env.HOSPITABLE_TOKEN;
  if (!token) throw new Error("HOSPITABLE_TOKEN is not configured");

  const url = `${HOSPITABLE_API}/properties/${uuid}/calendar?start_date=${start}&end_date=${end}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    // Fully live per request — never cache the calendar.
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Hospitable calendar request failed: ${res.status}`);
  }
  const json = (await res.json()) as { data?: { days?: HospitableDay[] } };
  return (json.data?.days ?? []).map(normalizeDay);
}
