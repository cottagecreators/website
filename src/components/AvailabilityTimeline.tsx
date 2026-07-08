"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { properties } from "@/data/properties";
import {
  type CalendarDay,
  type TimelineResponse,
  addDays,
  eachDay,
  isCheckInEligible,
  nightsBetween,
  parseISO,
  shortDate,
  shortMonth,
  todayISO,
  validateStay,
} from "@/lib/calendar";

type Status = "loading" | "live" | "hidden";
type Selection = { slug: string; checkIn: string; checkOut: string };

const HORIZON_DAYS = 90;
const CELL = 48; // px per day column (wide enough for a nightly price)
const NAME_COL = 168; // px for the sticky property-name column
const WEEKDAY = ["S", "M", "T", "W", "T", "F", "S"];

// Solid fills for the two states; BOOKED is clay/60 flattened over bone so it
// can be used inside the diagonal gradients on turnover (check-in/out) days.
const AVAIL = "var(--color-bone)";
const BOOKED = "color-mix(in srgb, var(--color-clay) 60%, var(--color-bone))";
const CHECKOUT_BG = `linear-gradient(to top right, ${BOOKED} 0 49%, ${AVAIL} 51%)`;
const CHECKIN_BG = `linear-gradient(to top right, ${AVAIL} 0 49%, ${BOOKED} 51%)`;

/**
 * Horizontal, all-properties availability strip for the homepage — one row per
 * cottage, one column per day. Nightly rates + minimum stays show on open days;
 * turnover (check-in/out) days get a diagonal split. Guests can pick a check-in
 * then a check-out on a single cottage's row and a "Book Now" link appears.
 * Fetches the live /api/availability endpoint (dynamic server only); on the
 * static export the fetch fails and the whole section removes itself.
 */
export default function AvailabilityTimeline() {
  const [status, setStatus] = useState<Status>("loading");
  const [rows, setRows] = useState<Map<string, Map<string, CalendarDay>>>(new Map());
  const [sel, setSel] = useState<Selection | null>(null);
  const [hint, setHint] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const today = todayISO();
  const end = addDays(today, HORIZON_DAYS);
  const days = useMemo(() => eachDay(today, end), [today, end]);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ start: today, end });
    fetch(`/api/availability?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<TimelineResponse>;
      })
      .then((data) => {
        if (cancelled) return;
        const map = new Map<string, Map<string, CalendarDay>>();
        for (const p of data.properties) {
          map.set(p.slug, new Map(p.days.map((d) => [d.date, d])));
        }
        setRows(map);
        setStatus("live");
      })
      .catch(() => {
        if (!cancelled) setStatus("hidden");
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick(slug: string, date: string) {
    const dayMap = rows.get(slug);
    if (!dayMap) return;
    setHint("");
    // Start fresh when nothing's picked, a different cottage is clicked, or a
    // full range already exists.
    if (!sel || sel.slug !== slug || (sel.checkIn && sel.checkOut)) {
      if (!isCheckInEligible(dayMap, date, today)) {
        setHint("That date isn't available for check-in.");
        return;
      }
      setSel({ slug, checkIn: date, checkOut: "" });
      return;
    }
    // Choosing the check-out on the same cottage.
    if (date <= sel.checkIn) {
      if (isCheckInEligible(dayMap, date, today)) setSel({ slug, checkIn: date, checkOut: "" });
      else setHint("That date isn't available for check-in.");
      return;
    }
    const error = validateStay(dayMap, sel.checkIn, date);
    if (error) {
      setHint(error);
      return;
    }
    setSel({ slug, checkIn: sel.checkIn, checkOut: date });
  }

  // Static export / API down: render nothing.
  if (status === "hidden") return null;

  const selName = sel ? properties.find((p) => p.slug === sel.slug)?.name : undefined;
  const nights = sel?.checkIn && sel.checkOut ? nightsBetween(sel.checkIn, sel.checkOut) : 0;
  const complete = !!sel?.checkIn && !!sel?.checkOut;

  return (
    <section id="availability" className="bg-bone py-20 md:py-28">
      <div className="container-edge">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Plan your dates</p>
            <h2
              className="mt-3.5 font-display text-[clamp(30px,4.5vw,44px)] leading-[1.05] text-pine"
              style={{ fontWeight: 500 }}
            >
              Availability at a glance
            </h2>
          </div>
          <div className="flex items-center gap-5 text-[12px] text-muted">
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-[3px] border border-edge bg-bone" />
              Available
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-[3px] bg-clay/60" />
              Booked
            </span>
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-[3px] border border-edge"
                style={{ background: CHECKOUT_BG }}
              />
              Check-in / out
            </span>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[8px] border border-edge">
          {status === "loading" ? (
            <div className="h-[200px] animate-pulse bg-cream/50" aria-hidden />
          ) : (
            <div ref={scrollRef} className="overflow-x-auto">
              <div style={{ minWidth: NAME_COL + days.length * CELL }}>
                {/* Month + day header */}
                <div
                  className="grid border-b border-edge bg-cream/40"
                  style={{ gridTemplateColumns: `${NAME_COL}px repeat(${days.length}, ${CELL}px)` }}
                >
                  <div className="sticky left-0 z-10 bg-cream/40" />
                  {days.map((date) => {
                    const d = parseISO(date);
                    const dom = d.getUTCDate();
                    const isMonthStart = dom === 1 || date === today;
                    return (
                      <div key={date} className="px-0.5 py-1 text-center">
                        <div className="h-[14px] text-[10px] font-semibold uppercase text-clay">
                          {isMonthStart ? shortMonth(d.getUTCMonth()) : ""}
                        </div>
                        <div className="text-[11px] text-muted">{WEEKDAY[d.getUTCDay()]}</div>
                        <div className="text-[12px] font-medium text-ink">{dom}</div>
                      </div>
                    );
                  })}
                </div>

                {/* One row per property */}
                {properties.map((p, rowIdx) => {
                  const dayMap = rows.get(p.slug);
                  const selectedHere = sel?.slug === p.slug;
                  return (
                    <div
                      key={p.slug}
                      className={`grid ${rowIdx > 0 ? "border-t border-edge" : ""}`}
                      style={{ gridTemplateColumns: `${NAME_COL}px repeat(${days.length}, ${CELL}px)` }}
                    >
                      <Link
                        href={`/${p.slug}`}
                        className="sticky left-0 z-10 flex items-center border-r border-edge bg-bone px-4 text-[13px] font-medium text-pine transition-colors hover:text-clay"
                      >
                        {p.name}
                      </Link>
                      {days.map((date) => {
                        const info = dayMap?.get(date);
                        const available = !!info?.available;
                        const price = info?.price;
                        const minStay = info?.minStay ?? 0;

                        const prev = dayMap?.get(addDays(date, -1));
                        const prevAvailable = prev ? !!prev.available : available;
                        const isCheckout = !!prev && available && !prevAvailable;
                        const isCheckin = !!prev && !available && prevAvailable;

                        const isStart = selectedHere && date === sel!.checkIn;
                        const isEnd = selectedHere && date === sel!.checkOut;
                        const endpoint = isStart || isEnd;
                        const inRange =
                          selectedHere &&
                          !!sel!.checkIn &&
                          !!sel!.checkOut &&
                          date > sel!.checkIn &&
                          date < sel!.checkOut;

                        let style: React.CSSProperties | undefined;
                        let bgClass: string;
                        if (endpoint) bgClass = "bg-clay";
                        else if (inRange) bgClass = "bg-clay/25";
                        else if (isCheckout) {
                          bgClass = "";
                          style = { background: CHECKOUT_BG };
                        } else if (isCheckin) {
                          bgClass = "";
                          style = { background: CHECKIN_BG };
                        } else bgClass = available ? "bg-bone" : "bg-clay/60";

                        const title = `${p.name} · ${date} · ${available ? "Available" : "Booked"}${
                          available && price != null ? ` · $${Math.round(price).toLocaleString("en-CA")}/night` : ""
                        }${available && minStay > 1 ? ` · ${minStay}-night min` : ""}`;

                        return (
                          <button
                            key={date}
                            type="button"
                            onClick={() => handleClick(p.slug, date)}
                            title={title}
                            style={style}
                            className={[
                              "flex h-14 flex-col items-center justify-center border-l border-edge/50 p-0 leading-none transition-[filter]",
                              date === today ? "border-l-2 border-l-clay" : "",
                              bgClass,
                              endpoint ? "" : "hover:brightness-[0.97]",
                            ].join(" ")}
                          >
                            {available && price != null && (
                              <span
                                className={`text-[10px] font-medium tabular-nums ${
                                  endpoint ? "text-bone" : "text-pine/85"
                                }`}
                              >
                                ${Math.round(price).toLocaleString("en-CA")}
                              </span>
                            )}
                            {available && minStay > 1 && (
                              <span
                                className={`mt-0.5 text-[8px] uppercase tracking-wide ${
                                  endpoint ? "text-bone/80" : "text-muted"
                                }`}
                              >
                                {minStay} nt min
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Selection / Book Now bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-muted">
            {hint ? (
              <span className="text-clay">{hint}</span>
            ) : complete ? (
              <>
                <span className="font-semibold text-pine">{selName}</span> ·{" "}
                <span className="font-semibold text-pine">
                  {shortDate(sel!.checkIn)} → {shortDate(sel!.checkOut)}
                </span>{" "}
                · {nights} night{nights > 1 ? "s" : ""}
              </>
            ) : sel?.checkIn ? (
              <>
                <span className="font-semibold text-pine">{selName}</span> — now pick your
                check-out date.
              </>
            ) : (
              <>
                Live from our booking calendar. Click a check-in date, then a check-out date,
                to book direct.
              </>
            )}
          </p>
          <div className="flex items-center gap-4">
            {sel?.checkIn && (
              <button
                type="button"
                onClick={() => {
                  setSel(null);
                  setHint("");
                }}
                className="text-[13px] text-muted underline decoration-edge underline-offset-2 hover:text-clay"
              >
                Clear
              </button>
            )}
            {complete && (
              <Link
                href={`/${sel!.slug}?checkin=${sel!.checkIn}&checkout=${sel!.checkOut}`}
                className="inline-flex items-center justify-center rounded-[4px] bg-clay px-6 py-3 text-[14px] font-semibold text-bone transition-colors hover:bg-clay-dark"
              >
                Book {selName} &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
