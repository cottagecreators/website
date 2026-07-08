/**
 * Client-safe calendar types and pure date helpers. Contains NO secrets and no
 * server-only code, so it can be imported by Client Components (the booking
 * picker and the homepage timeline) as well as the server-side API helpers.
 */

/** One day of a property's calendar, normalized for the UI. */
export interface CalendarDay {
  /** YYYY-MM-DD. */
  date: string;
  /** Whether the night is bookable. */
  available: boolean;
  /** Minimum nights required when checking in on this day. */
  minStay: number;
  closedForCheckin: boolean;
  closedForCheckout: boolean;
  /** Nightly rate in dollars, or null if the channel didn't return one. */
  price: number | null;
  priceFormatted: string | null;
  currency: string | null;
}

/** Payload returned by GET /api/availability/[slug]. */
export interface AvailabilityResponse {
  slug: string;
  start: string;
  end: string;
  days: CalendarDay[];
}

/** One line of a direct-booking quote (subtotal, a fee, or a tax). */
export interface QuoteLine {
  label: string;
  /** Amount in minor units (cents). */
  amount: number;
  /** Pre-formatted display string, e.g. "CA$6,400.00". */
  formatted: string;
}

/** Payload returned by GET /api/quote — a live Hospitable direct-booking quote. */
export interface Quote {
  /** Hospitable-hosted checkout URL, pre-loaded with these dates/guests. */
  bookingUrl: string;
  currency: string;
  /** Subtotal, then each non-zero fee, then each tax. */
  lines: QuoteLine[];
  total: QuoteLine;
}

/** One property row returned by GET /api/availability. */
export interface TimelineProperty {
  slug: string;
  name: string;
  days: CalendarDay[];
}

/** Payload returned by GET /api/availability. */
export interface TimelineResponse {
  start: string;
  end: string;
  properties: TimelineProperty[];
}

/** Format a Date as YYYY-MM-DD in UTC (calendar dates are timezone-agnostic here). */
export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Today as YYYY-MM-DD. */
export function todayISO(): string {
  return isoDate(new Date());
}

/** Parse a YYYY-MM-DD string to a UTC Date. */
export function parseISO(s: string): Date {
  return new Date(`${s}T00:00:00Z`);
}

/** Add `n` days to a YYYY-MM-DD string, returning a new YYYY-MM-DD string. */
export function addDays(iso: string, n: number): string {
  const d = parseISO(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return isoDate(d);
}

/** Number of nights between two YYYY-MM-DD strings (end exclusive). */
export function nightsBetween(start: string, end: string): number {
  return Math.round(
    (parseISO(end).getTime() - parseISO(start).getTime()) / 86_400_000,
  );
}

/** Inclusive list of YYYY-MM-DD dates from `start` to `end`. */
export function eachDay(start: string, end: string): string[] {
  const out: string[] = [];
  for (let d = start; d <= end; d = addDays(d, 1)) out.push(d);
  return out;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "July 2026" for a YYYY-MM-DD or a YYYY-MM key. */
export function monthLabel(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** Short month name, e.g. "Jul". */
export function shortMonth(monthIndex0: number): string {
  return MONTHS[monthIndex0].slice(0, 3);
}

/**
 * Build the 6-row week grid for a given month (YYYY-MM), returned as an array of
 * cells. Cells outside the month are null. Weeks start on Sunday.
 */
export function monthGrid(year: number, month1: number): (string | null)[] {
  const first = new Date(Date.UTC(year, month1 - 1, 1));
  const startWeekday = first.getUTCDay(); // 0 = Sunday
  const daysInMonth = new Date(Date.UTC(year, month1, 0)).getUTCDate();
  const cells: (string | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(isoDate(new Date(Date.UTC(year, month1 - 1, day))));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
