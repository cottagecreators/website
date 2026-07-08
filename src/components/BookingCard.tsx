"use client";

import { useEffect, useState } from "react";
import AvailabilityPicker from "@/components/AvailabilityPicker";
import BookDirectButton from "@/components/BookDirectButton";
import TrustLine from "@/components/TrustLine";
import type { Property } from "@/data/properties";
import type { Quote } from "@/lib/calendar";

/**
 * Booking card used in the property page's sticky right column. Shows the
 * "from" rate, the direct-booking savings, a live availability calendar (with a
 * plain date-input fallback on the static export), the single primary CTA, a
 * trust line, and a small Airbnb fallback link.
 *
 * When a live quote is available, "Book Direct" goes straight to that quote's
 * pre-filled Hospitable checkout URL. Otherwise it falls back to the property's
 * Hospitable link with the chosen dates as a soft hand-off.
 */
export default function BookingCard({ property }: { property: Property }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);

  // Prefill the check-in from a ?checkin=YYYY-MM-DD query param, so clicking a
  // date on the homepage availability timeline lands here with it selected.
  // Read from the URL on mount (avoids useSearchParams' Suspense requirement and
  // works on the static export too).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ci = params.get("checkin");
    const co = params.get("checkout");
    const iso = /^\d{4}-\d{2}-\d{2}$/;
    // One-time read of the URL after mount (external source) — intentionally
    // sets state here rather than during render to avoid an SSR mismatch.
    if (ci && iso.test(ci)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCheckIn(ci);
      if (co && iso.test(co) && co > ci) setCheckOut(co);
    }
  }, []);

  const params = new URLSearchParams();
  if (checkIn) params.set("startDate", checkIn);
  if (checkOut) params.set("endDate", checkOut);
  const qs = params.toString();
  const fallbackHref = qs ? `${property.hospitable}?${qs}` : property.hospitable;
  const href = quote?.bookingUrl ?? fallbackHref;

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

      <AvailabilityPicker
        property={property}
        checkIn={checkIn}
        checkOut={checkOut}
        onSelect={(ci, co) => {
          setCheckIn(ci);
          setCheckOut(co);
        }}
        onQuote={setQuote}
      />

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
