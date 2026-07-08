"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { properties } from "@/data/properties";
import {
  type CalendarDay,
  type TimelineResponse,
  addDays,
  eachDay,
  parseISO,
  shortMonth,
  todayISO,
} from "@/lib/calendar";

type Status = "loading" | "live" | "hidden";

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

/** Property slug -> link target on the site. */
function propertyHref(slug: string): string {
  return `/${slug}`;
}

/**
 * Horizontal, all-properties availability strip for the homepage — one row per
 * cottage, one column per day, booked nights shaded. No guest or pricing detail,
 * just a glanceable "what's open" view. Fetches the live /api/availability
 * endpoint (DigitalOcean only); on the static export the fetch fails and the
 * whole section removes itself.
 */
export default function AvailabilityTimeline() {
  const [status, setStatus] = useState<Status>("loading");
  const [rows, setRows] = useState<Map<string, Map<string, CalendarDay>>>(new Map());
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

  // Static export / API down: render nothing.
  if (status === "hidden") return null;

  return (
    <section className="bg-bone py-20 md:py-28">
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
                  return (
                    <div
                      key={p.slug}
                      className={`grid ${rowIdx > 0 ? "border-t border-edge" : ""}`}
                      style={{ gridTemplateColumns: `${NAME_COL}px repeat(${days.length}, ${CELL}px)` }}
                    >
                      <Link
                        href={propertyHref(p.slug)}
                        className="sticky left-0 z-10 flex items-center border-r border-edge bg-bone px-4 text-[13px] font-medium text-pine transition-colors hover:text-clay"
                      >
                        {p.name}
                      </Link>
                      {days.map((date) => {
                        const info = dayMap?.get(date);
                        const available = !!info?.available;
                        const price = info?.price;
                        const minStay = info?.minStay ?? 0;

                        // Turnover detection: compare with the previous night. A
                        // stay ending today (booked -> available) is a check-out;
                        // a stay starting today (available -> booked) is a
                        // check-in. Those days get the diagonal split.
                        const prev = dayMap?.get(addDays(date, -1));
                        const prevAvailable = prev ? !!prev.available : available;
                        const isCheckout = !!prev && available && !prevAvailable;
                        const isCheckin = !!prev && !available && prevAvailable;

                        const style = isCheckout
                          ? { background: CHECKOUT_BG }
                          : isCheckin
                            ? { background: CHECKIN_BG }
                            : undefined;
                        const bgClass = style ? "" : available ? "bg-bone" : "bg-clay/60";

                        const title = `${p.name} · ${date} · ${available ? "Available" : "Booked"}${
                          available && price != null ? ` · $${Math.round(price).toLocaleString("en-CA")}/night` : ""
                        }${available && minStay > 1 ? ` · ${minStay}-night min` : ""}`;

                        return (
                          <Link
                            key={date}
                            href={available ? `/${p.slug}?checkin=${date}` : `/${p.slug}`}
                            title={title}
                            style={style}
                            className={[
                              "flex h-14 flex-col items-center justify-center border-l border-edge/50 leading-none transition-[filter]",
                              date === today ? "border-l-2 border-l-clay" : "",
                              bgClass,
                              available ? "hover:brightness-[0.97]" : "hover:brightness-105",
                            ].join(" ")}
                          >
                            {available && price != null && (
                              <span className="text-[10px] font-medium tabular-nums text-pine/85">
                                ${Math.round(price).toLocaleString("en-CA")}
                              </span>
                            )}
                            {available && minStay > 1 && (
                              <span className="mt-0.5 text-[8px] uppercase tracking-wide text-muted">
                                {minStay} nt min
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-[13px] text-muted">
          Live from our booking calendar — nightly rates and minimum stays shown
          for open dates. Click any open date to start booking that cottage.
        </p>
      </div>
    </section>
  );
}
