import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TrustLine from "@/components/TrustLine";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Book Now",
  description:
    "Book your Muskoka cottage direct and save ~15% vs Airbnb — live availability and pricing for all three cottages, or book on Airbnb.",
};

export default function BookNow() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-edge">
        <div className="max-w-2xl">
          <p className="eyebrow">Reserve your stay</p>
          <h1
            className="mt-3 font-display text-[clamp(34px,5vw,48px)] leading-[1.04] text-pine"
            style={{ fontWeight: 500 }}
          >
            Book your Muskoka escape
          </h1>
          <p className="mt-4 text-[16.5px] leading-relaxed text-muted">
            Book directly and save about 15% versus Airbnb — the same cottages and
            five-star stay, minus the platform fees. Pick a cottage to see live
            availability, real pricing, and reserve in a few clicks. Prefer
            Airbnb? Those links are here too.
          </p>
          <TrustLine className="mt-5" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.slug}
              className="flex flex-col overflow-hidden rounded-[8px] border border-edge bg-bone shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
            >
              <Link
                href={`/${property.slug}`}
                className="group relative block h-[200px] overflow-hidden"
              >
                <Image
                  src={property.heroImage}
                  alt={property.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="eyebrow text-muted" style={{ color: "var(--color-muted)" }}>
                  Sleeps {property.sleeps} · {property.bedrooms} bd · {property.baths} ba
                </p>
                <h2
                  className="mt-2 font-display text-[24px] leading-none text-pine"
                  style={{ fontWeight: 500 }}
                >
                  {property.name}
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  {property.tagline}
                </p>
                <p className="mt-3 text-[14px]">
                  <span className="text-muted">From</span>{" "}
                  <span className="font-semibold text-pine">${property.priceFrom}</span>{" "}
                  <span className="text-muted">/ night</span>
                </p>
                <div className="mt-auto pt-4">
                  <Link
                    href={`/${property.slug}`}
                    className="flex w-full items-center justify-center rounded-[4px] bg-clay px-5 py-3 text-[14px] font-semibold text-bone transition-colors hover:bg-clay-dark"
                  >
                    Check dates &amp; book
                  </Link>
                  <a
                    href={property.airbnb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-center text-[13px] text-muted underline decoration-edge underline-offset-2 transition-colors hover:text-clay"
                  >
                    or view on Airbnb
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[14px] text-muted">
          Travelling with a bigger group?{" "}
          <Link href="/muskokacabana" className="text-clay underline decoration-edge underline-offset-2 hover:text-clay-dark">
            Muskoka Cabana
          </Link>{" "}
          and{" "}
          <Link href="/thenest" className="text-clay underline decoration-edge underline-offset-2 hover:text-clay-dark">
            The Nest
          </Link>{" "}
          sit side by side — book both for the whole shoreline.
        </p>

        {/* Welcome book */}
        <div className="mx-auto mt-14 max-w-2xl rounded-[8px] border border-edge bg-bone p-6 text-center md:p-8">
          <p className="eyebrow">Already booked?</p>
          <h2 className="mt-2 font-display text-[26px] text-pine" style={{ fontWeight: 500 }}>
            Read the Welcome Book
          </h2>
          <p className="mx-auto mt-2 max-w-[52ch] text-[14.5px] leading-relaxed text-muted">
            Directions, house notes, and our favourite things to do on Three Mile
            Lake — everything for a smooth arrival, straight from our live guide.
          </p>
          <Link
            href="/welcomebook"
            className="mt-4 inline-flex items-center justify-center rounded-[4px] border border-clay px-6 py-3 text-[14px] font-semibold text-clay transition-colors hover:bg-clay hover:text-bone"
          >
            Open the Welcome Book &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
