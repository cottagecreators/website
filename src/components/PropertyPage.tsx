import Link from "next/link";
import GalleryMosaic from "@/components/GalleryMosaic";
import BookingCard from "@/components/BookingCard";
import BookDirectButton from "@/components/BookDirectButton";
import StayNextDoor from "@/components/StayNextDoor";
import InstagramFeed from "@/components/InstagramFeed";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/properties";
import { galleries } from "@/data/galleries";
import type { Property } from "@/data/properties";

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <strong className="text-pine">{value}</strong>
      <span className="text-muted">{label}</span>
    </span>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      className="mt-[3px] h-4 w-4 shrink-0 text-clay"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

// Flat, shareable welcome-book URL per cottage.
const welcomeBookHref: Record<string, string> = {
  thewatersedge: "/welcomebook-thewatersedge",
  muskokacabana: "/welcomebook-cabana",
  thenest: "/welcomebook-nest",
};

export default function PropertyPage({ property }: { property: Property }) {
  const photos = galleries[property.slug] ?? [];
  const welcomeBook = welcomeBookHref[property.slug];

  return (
    <>
      {/* Gallery mosaic (header spacer above already clears the fixed header) */}
      <section className="container-edge pt-6 md:pt-8">
        <GalleryMosaic images={photos} propertyName={property.name} />
      </section>

      {/* Title + two-column body */}
      <section className="container-edge pb-24 pt-12 md:pb-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
          {/* Left column */}
          <div>
            <Reveal>
              <p className="eyebrow">{property.tagline}</p>
              <h1
                className="mt-3 font-display text-[clamp(34px,5vw,46px)] leading-[1.02] text-pine"
                style={{ fontWeight: 500 }}
              >
                {property.name}
              </h1>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-b border-edge pb-6 text-[14px]">
                <Stat value={property.sleeps} label={property.sleeps === 1 ? "guest" : "guests"} />
                <Stat value={property.bedrooms} label={property.bedrooms === 1 ? "bedroom" : "bedrooms"} />
                <Stat value={property.beds} label={property.beds === 1 ? "bed" : "beds"} />
                <Stat value={property.baths} label={property.baths === 1 ? "bath" : "baths"} />
              </div>
              {welcomeBook && (
                <Link
                  href={welcomeBook}
                  className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-clay transition-transform hover:translate-x-0.5"
                >
                  Read the {property.name} Welcome Book &rarr;
                </Link>
              )}
            </Reveal>

            <Reveal>
              <p className="mt-7 max-w-[60ch] text-[16.5px] leading-relaxed text-ink/85">
                {property.description}
              </p>
            </Reveal>

            {/* Feature grid */}
            <Reveal>
              <div className="mt-9">
                <h2 className="font-display text-[26px] text-pine" style={{ fontWeight: 500 }}>
                  What you&apos;ll love
                </h2>
                <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  {property.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-[15px] text-ink/85">
                      <Check />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Press cards (no emoji) */}
            {property.featured && property.featured.length > 0 && (
              <Reveal>
                <div className="mt-12">
                  <p className="eyebrow">As seen in</p>
                  <h2 className="mt-3 font-display text-[26px] text-pine" style={{ fontWeight: 500 }}>
                    Featured across the web
                  </h2>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {property.featured.map((f) => (
                      <a
                        key={f.url}
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col rounded-[6px] border border-edge bg-bone p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_14px_30px_-20px_rgba(0,0,0,0.4)]"
                      >
                        <span className="font-display text-[20px] text-pine" style={{ fontWeight: 500 }}>
                          {f.source}
                        </span>
                        <span className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-muted">
                          {f.blurb}
                        </span>
                        <span className="mt-3 text-[12px] font-semibold text-clay">
                          {f.kind === "Watch" ? "Watch" : "Read"} &rarr;
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Instagram (where present) */}
            {property.instagramPosts && property.instagramPosts.length > 0 && (
              <div className="mt-12">
                <InstagramFeed
                  posts={property.instagramPosts}
                  heading={`${property.name} on Instagram`}
                  profileUrl={siteConfig.instagram}
                />
              </div>
            )}
          </div>

          {/* Right column — sticky booking card (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <BookingCard property={property} />
            </div>
          </div>
        </div>
      </section>

      {/* Stay next door */}
      <StayNextDoor current={property} />

      {/* Mobile sticky booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-edge bg-bone/95 px-4 py-3 backdrop-blur-sm lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="leading-tight">
            <span className="font-display text-[22px] text-pine" style={{ fontWeight: 500 }}>
              ${property.priceFrom}
            </span>
            <span className="text-[12px] text-muted"> / night</span>
            <span className="block text-[11px] font-semibold text-[#5FA873]">
              Save ~15% vs Airbnb
            </span>
          </div>
          <BookDirectButton href={property.hospitable} />
        </div>
      </div>

      {/* Spacer so the mobile bar never covers the footer's last line */}
      <div className="h-20 lg:hidden" aria-hidden="true" />

      <div className="container-edge pb-10 lg:pb-16">
        <Link href="/" className="text-[14px] text-muted transition-colors hover:text-ink">
          &larr; Back to all stays
        </Link>
      </div>
    </>
  );
}
