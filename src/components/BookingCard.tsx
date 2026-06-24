"use client";

import { useState } from "react";
import BookDirectButton from "@/components/BookDirectButton";
import TrustLine from "@/components/TrustLine";
import type { Property } from "@/data/properties";

/**
 * Booking card used in the property page's sticky right column. Shows the
 * "from" rate, the direct-booking savings, check-in / check-out date fields,
 * the single primary CTA, a trust line, and a small Airbnb fallback link.
 * Dates are appended to the Hospitable URL as a soft hand-off (ignored if the
 * engine doesn't read them).
 */
export default function BookingCard({ property }: { property: Property }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const params = new URLSearchParams();
  if (checkIn) params.set("startDate", checkIn);
  if (checkOut) params.set("endDate", checkOut);
  const qs = params.toString();
  const href = qs ? `${property.hospitable}?${qs}` : property.hospitable;

  return (
    <div className="rounded-[8px] border border-edge bg-bone p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-baseline gap-2">
        <span className="text-xs text-muted">From</span>
        <span className="font-display text-[34px] leading-none text-pine" style={{ fontWeight: 500 }}>
          ${property.priceFrom}
        </span>
        <span className="text-[13px] text-muted">/ night</span>
      </div>
      <p className="mt-1 text-[12px] font-semibold text-[#5FA873]">
        Save ~15% vs Airbnb
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <label className="rounded-[5px] border border-edge px-3 py-2 focus-within:border-clay">
          <span className="block text-[9px] uppercase tracking-[0.1em] text-muted">
            Check-in
          </span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-0.5 w-full bg-transparent text-[13px] text-ink outline-none"
            aria-label="Check-in date"
          />
        </label>
        <label className="rounded-[5px] border border-edge px-3 py-2 focus-within:border-clay">
          <span className="block text-[9px] uppercase tracking-[0.1em] text-muted">
            Check-out
          </span>
          <input
            type="date"
            value={checkOut}
            min={checkIn || undefined}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-0.5 w-full bg-transparent text-[13px] text-ink outline-none"
            aria-label="Check-out date"
          />
        </label>
      </div>

      <BookDirectButton href={href} block className="mt-3" />

      <TrustLine className="mt-3 justify-center" />

      <a
        href={property.airbnb}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block text-center text-[12px] text-muted underline decoration-edge underline-offset-2 transition-colors hover:text-clay"
      >
        or view on Airbnb
      </a>
    </div>
  );
}
