/**
 * Server-only helpers for the Hospitable public API.
 *
 * IMPORTANT: this module reads `HOSPITABLE_TOKEN` and must never be imported by
 * a Client Component — it is only used by the /api/availability route handlers,
 * which run on the DigitalOcean Node server. On the static GitHub Pages export
 * there is no server, so those routes are skipped and this code never ships to
 * the browser.
 */

import type { CalendarDay, Quote, QuoteLine } from "@/lib/calendar";

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

/** Guest breakdown for a quote. `adults` is required (min 1). */
export interface QuoteGuests {
  adults: number;
  children?: number;
  infants?: number;
  pets?: number;
}

interface HospitableAmount {
  amount: number;
  formatted: string;
  label?: string;
}

function toLine(x: HospitableAmount, fallbackLabel: string): QuoteLine {
  return { label: x.label ?? fallbackLabel, amount: x.amount, formatted: x.formatted };
}

/**
 * Create a live direct-booking quote (POST /v2/properties/{uuid}/quote). Returns
 * the full price breakdown plus a Hospitable-hosted `booking_url` pre-loaded
 * with these dates and guests. Throws on missing token / bad response.
 */
export async function createQuote(
  uuid: string,
  checkin: string,
  checkout: string,
  guests: QuoteGuests,
): Promise<Quote> {
  const token = process.env.HOSPITABLE_TOKEN;
  if (!token) throw new Error("HOSPITABLE_TOKEN is not configured");

  const res = await fetch(`${HOSPITABLE_API}/properties/${uuid}/quote`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ checkin_date: checkin, checkout_date: checkout, guests }),
  });
  if (!res.ok) throw new Error(`Hospitable quote request failed: ${res.status}`);

  const { data } = (await res.json()) as {
    data: {
      booking_url: string;
      currency: string;
      financials: {
        fees?: HospitableAmount[];
        taxes?: HospitableAmount[];
        totals: { sub_total: HospitableAmount; total: HospitableAmount };
      };
    };
  };

  const f = data.financials;
  const lines: QuoteLine[] = [toLine(f.totals.sub_total, "Subtotal")];
  for (const fee of f.fees ?? []) if (fee.amount) lines.push(toLine(fee, "Fee"));
  for (const tax of f.taxes ?? []) if (tax.amount) lines.push(toLine(tax, "Tax"));

  return {
    bookingUrl: data.booking_url,
    currency: data.currency,
    lines,
    total: toLine(f.totals.total, "Total"),
  };
}
