"use client";

import { useEffect, useMemo, useState } from "react";
import type { Property } from "@/data/properties";
import {
  type AvailabilityResponse,
  type CalendarDay,
  type Quote,
  addDays,
  eachDay,
  isoDate,
  monthGrid,
  monthLabel,
  nightsBetween,
  todayISO,
} from "@/lib/calendar";

type Status = "loading" | "live" | "fallback";
type QuoteState = "idle" | "loading" | "ready" | "error";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const HORIZON_DAYS = 180;

/**
 * Live availability picker for a single property. On the DigitalOcean server it
 * fetches the real Hospitable calendar and renders a month grid with booked
 * nights disabled, min-stay enforced, and a live price total. On the static
 * GitHub Pages export the /api route doesn't exist, the fetch fails, and it
 * degrades to two plain date inputs (the site's original behavior).
 */
export default function AvailabilityPicker({
  property,
  checkIn,
  checkOut,
  onSelect,
  onQuote,
}: {
  property: Property;
  checkIn: string;
  checkOut: string;
  onSelect: (checkIn: string, checkOut: string) => void;
  /** Lifts the live quote (with its pre-filled checkout URL) up to the card. */
  onQuote?: (quote: Quote | null) => void;
}) {
  const [status, setStatus] = useState<Status>("loading");
  const [days, setDays] = useState<Map<string, CalendarDay>>(new Map());
  const [viewMonth, setViewMonth] = useState<string>(todayISO().slice(0, 7));
  const [hint, setHint] = useState<string>("");
  const [adults, setAdults] = useState(2);
  const [pets, setPets] = useState(0);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteState, setQuoteState] = useState<QuoteState>("idle");

  const today = todayISO();
  const horizonEnd = addDays(today, HORIZON_DAYS);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ start: today, end: horizonEnd });
    fetch(`/api/availability/${property.slug}?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<AvailabilityResponse>;
      })
      .then((data) => {
        if (cancelled) return;
        setDays(new Map(data.days.map((d) => [d.date, d])));
        setStatus("live");
      })
      .catch(() => {
        if (!cancelled) setStatus("fallback");
      });
    return () => {
      cancelled = true;
    };
    // Fetch once on mount for this property.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property.slug]);

  // Follow the selected check-in to its month (e.g. when it's prefilled from a
  // timeline click). Selecting within the current view is a no-op.
  useEffect(() => {
    if (checkIn) setViewMonth(checkIn.slice(0, 7));
  }, [checkIn]);

  const [year, month1] = viewMonth.split("-").map(Number);
  const grid = useMemo(() => monthGrid(year, month1), [year, month1]);

  const canGoPrev = viewMonth > today.slice(0, 7);
  const canGoNext = viewMonth < horizonEnd.slice(0, 7);

  function shiftMonth(delta: number) {
    const d = new Date(Date.UTC(year, month1 - 1 + delta, 1));
    setViewMonth(isoDate(d).slice(0, 7));
  }

  /** A date is selectable as a check-in if it's today-or-later and available. */
  function isCheckInEligible(date: string): boolean {
    const info = days.get(date);
    return date >= today && !!info?.available && !info.closedForCheckin;
  }

  /** Validate a full stay; returns an error string or "" if the range is bookable. */
  function validateStay(start: string, end: string): string {
    if (end <= start) return "Check-out must be after check-in.";
    const startInfo = days.get(start);
    const endInfo = days.get(end);
    if (!startInfo || startInfo.closedForCheckin) return "Check-in isn't available on that day.";
    if (endInfo?.closedForCheckout) return "Check-out isn't available on that day.";
    // Every night in [start, end) must be available.
    for (const night of eachDay(start, addDays(end, -1))) {
      if (!days.get(night)?.available) return "Those dates include unavailable nights.";
    }
    const nights = nightsBetween(start, end);
    if (nights < startInfo.minStay) {
      return `Minimum stay is ${startInfo.minStay} night${startInfo.minStay > 1 ? "s" : ""}.`;
    }
    return "";
  }

  function handleDayClick(date: string) {
    setHint("");
    // Starting a fresh selection (nothing chosen, or both already chosen).
    if (!checkIn || (checkIn && checkOut)) {
      if (!isCheckInEligible(date)) {
        setHint("That date isn't available for check-in.");
        return;
      }
      onSelect(date, "");
      return;
    }
    // Choosing the check-out (checkIn set, checkOut not).
    if (date <= checkIn) {
      // Treat an earlier click as restarting from that date.
      if (isCheckInEligible(date)) onSelect(date, "");
      else setHint("That date isn't available for check-in.");
      return;
    }
    const error = validateStay(checkIn, date);
    if (error) {
      setHint(error);
      return;
    }
    onSelect(checkIn, date);
  }

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const stayTotal = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    let sum = 0;
    for (const night of eachDay(checkIn, addDays(checkOut, -1))) {
      const p = days.get(night)?.price;
      if (p == null) return null;
      sum += p;
    }
    return sum;
  }, [checkIn, checkOut, days]);

  // Fetch a live Hospitable quote (full price + pre-filled checkout URL) once a
  // valid stay is selected, refreshing when dates or guest counts change.
  const validForQuote =
    !!checkIn && !!checkOut && validateStay(checkIn, checkOut) === "";
  useEffect(() => {
    if (!validForQuote) {
      setQuote(null);
      setQuoteState("idle");
      onQuote?.(null);
      return;
    }
    let cancelled = false;
    setQuoteState("loading");
    const params = new URLSearchParams({
      slug: property.slug,
      checkIn,
      checkOut,
      adults: String(adults),
      pets: String(pets),
    });
    fetch(`/api/quote?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<Quote>;
      })
      .then((q) => {
        if (cancelled) return;
        setQuote(q);
        setQuoteState("ready");
        onQuote?.(q);
      })
      .catch(() => {
        if (cancelled) return;
        setQuote(null);
        setQuoteState("error");
        onQuote?.(null);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property.slug, checkIn, checkOut, adults, pets, validForQuote]);

  // ---- Fallback: plain native date inputs (static export / API unavailable) ----
  if (status === "fallback") {
    return (
      <div className="mt-4 grid grid-cols-2 gap-2">
        <label className="rounded-[5px] border border-edge px-3 py-2 focus-within:border-clay">
          <span className="block text-[9px] uppercase tracking-[0.1em] text-muted">Check-in</span>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => onSelect(e.target.value, checkOut)}
            className="mt-0.5 w-full bg-transparent text-[13px] text-ink outline-none"
            aria-label="Check-in date"
          />
        </label>
        <label className="rounded-[5px] border border-edge px-3 py-2 focus-within:border-clay">
          <span className="block text-[9px] uppercase tracking-[0.1em] text-muted">Check-out</span>
          <input
            type="date"
            value={checkOut}
            min={checkIn || today}
            onChange={(e) => onSelect(checkIn, e.target.value)}
            className="mt-0.5 w-full bg-transparent text-[13px] text-ink outline-none"
            aria-label="Check-out date"
          />
        </label>
      </div>
    );
  }

  // ---- Loading skeleton ----
  if (status === "loading") {
    return (
      <div className="mt-4 h-[280px] animate-pulse rounded-[6px] border border-edge bg-cream/50" aria-hidden />
    );
  }

  // ---- Live calendar ----
  return (
    <div className="mt-4 rounded-[6px] border border-edge p-3">
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={!canGoPrev}
          className="rounded p-1 text-muted transition-colors hover:text-clay disabled:opacity-30"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="font-display text-[15px] text-pine">{monthLabel(`${viewMonth}-01`)}</span>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          disabled={!canGoNext}
          className="rounded p-1 text-muted transition-colors hover:text-clay disabled:opacity-30"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-0.5 text-center">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="py-1 text-[10px] font-medium uppercase text-muted">
            {d}
          </span>
        ))}
        {grid.map((date, i) => {
          if (!date) return <span key={i} />;
          const info = days.get(date);
          const isPast = date < today;
          const available = !!info?.available;
          const isCheckIn = date === checkIn;
          const isCheckOut = date === checkOut;
          const endpoint = isCheckIn || isCheckOut;
          const inRange = !!checkIn && !!checkOut && date > checkIn && date < checkOut;

          // What we're picking next decides selectability. A booked day is NOT
          // a valid night to stay, but it IS a valid CHECK-OUT (turnover day:
          // the next guest checks in that morning). So while choosing a
          // check-out, allow any date the stay rules accept — validateStay only
          // checks the nights actually stayed [check-in, check-out), never the
          // check-out day's own availability.
          const choosingCheckout = !!checkIn && !checkOut;
          const selectable = isPast
            ? false
            : choosingCheckout
              ? validateStay(checkIn, date) === "" || isCheckInEligible(date)
              : isCheckInEligible(date);

          const disabled = !selectable && !endpoint;
          const struck = !available && !selectable && !endpoint;

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleDayClick(date)}
              disabled={disabled}
              aria-label={`${date}${!available ? " (booked)" : ""}`}
              className={[
                "relative aspect-square rounded-[4px] text-[12px] transition-colors",
                endpoint
                  ? "bg-clay font-semibold text-bone"
                  : inRange
                    ? "bg-clay/15 text-ink"
                    : struck
                      ? "text-muted/40 line-through"
                      : !selectable
                        ? "text-muted/40"
                        : "text-ink hover:bg-cream",
              ].join(" ")}
            >
              {Number(date.slice(-2))}
            </button>
          );
        })}
      </div>

      {/* Guests */}
      <div className="mt-3 flex items-center justify-between border-t border-edge/60 px-1 pt-3 text-[12px]">
        <span className="text-muted">Guests</span>
        <Stepper value={adults} min={1} max={property.sleeps} onChange={setAdults} label="guests" />
      </div>
      <div className="mt-2 flex items-center justify-between px-1 text-[12px]">
        <span className="text-muted">Pets</span>
        <Stepper value={pets} min={0} max={2} onChange={setPets} label="pets" />
      </div>

      {/* Price / summary */}
      <div className="mt-3 min-h-[20px] border-t border-edge/60 px-1 pt-3 text-[12px]">
        {hint ? (
          <p className="text-clay">{hint}</p>
        ) : checkIn && checkOut ? (
          quoteState === "ready" && quote ? (
            <div className="space-y-1">
              {quote.lines.map((line) => (
                <div key={line.label} className="flex justify-between text-muted">
                  <span>{line.label}</span>
                  <span>{line.formatted}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-edge/60 pt-1 font-semibold text-pine">
                <span>Total ({nights} night{nights > 1 ? "s" : ""})</span>
                <span>{quote.total.formatted}</span>
              </div>
            </div>
          ) : quoteState === "loading" ? (
            <p className="text-muted">Calculating your total…</p>
          ) : (
            <p className="text-muted">
              {nights} night{nights > 1 ? "s" : ""}
              {stayTotal != null &&
                ` · ${stayTotal.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 })}`}
              <span className="text-muted/70"> + taxes &amp; fees</span>
            </p>
          )
        ) : (
          <p className="text-muted">{checkIn ? "Select your check-out date" : "Select your check-in date"}</p>
        )}
      </div>

      {(checkIn || checkOut) && (
        <div className="mt-2 px-1 text-right">
          <button
            type="button"
            onClick={() => {
              setHint("");
              onSelect("", "");
            }}
            className="text-[11px] text-muted underline decoration-edge underline-offset-2 hover:text-clay"
          >
            Clear dates
          </button>
        </div>
      )}
    </div>
  );
}

/** Small −/+ counter used for the guest and pet selectors. */
function Stepper({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  label: string;
}) {
  const btn =
    "flex h-6 w-6 items-center justify-center rounded-full border border-edge text-ink transition-colors hover:border-clay disabled:opacity-30";
  return (
    <span className="flex items-center gap-3">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={btn}
      >
        −
      </button>
      <span className="w-4 text-center tabular-nums text-ink">{value}</span>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={btn}
      >
        +
      </button>
    </span>
  );
}
