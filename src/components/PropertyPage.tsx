import Image from "next/image";
import Link from "next/link";
import AirbnbEmbed from "@/components/AirbnbEmbed";
import Gallery from "@/components/Gallery";
import InstagramFeed from "@/components/InstagramFeed";
import { siteConfig } from "@/data/properties";
import { galleries } from "@/data/galleries";
import type { Property } from "@/data/properties";

function PersonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6Z" />
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold text-stone-900">{value}</span>
      <span className="text-sm text-stone-500">{label}</span>
    </div>
  );
}

export default function PropertyPage({ property }: { property: Property }) {
  const photos = galleries[property.slug] ?? [];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={property.heroImage}
          alt={property.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">{property.name}</h1>
          <p className="text-xl mt-3 font-light">{property.tagline}</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-2 text-base font-medium ring-1 ring-white/30">
            <PersonIcon className="h-5 w-5" />
            Sleeps {property.sleeps}
          </span>
        </div>
      </section>

      {/* Book Direct Banner */}
      <div className="bg-stone-800 text-white py-4 text-center">
        <p className="text-lg">
          Book direct and save!{" "}
          <a
            href={property.hospitable}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium hover:text-stone-200"
          >
            Book direct here
          </a>{" "}
          — 15% cheaper than Airbnb
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12 rounded-xl bg-stone-50 py-6">
          <Stat label={property.sleeps === 1 ? "Guest" : "Guests"} value={property.sleeps} />
          <Stat label="Bedrooms" value={property.bedrooms} />
          <Stat label="Beds" value={property.beds} />
          <Stat label={property.baths === 1 ? "Bath" : "Baths"} value={property.baths} />
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">
              About {property.name}
            </h2>
            <p className="text-stone-600 leading-relaxed">
              {property.description}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-900 mb-4">
              Features
            </h3>
            <ul className="space-y-2">
              {property.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="text-stone-400 mt-0.5">&#10003;</span>
                  <span className="text-stone-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Photo Gallery */}
        <Gallery images={photos} propertyName={property.name} />

        {/* Featured In */}
        {property.featured && property.featured.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-stone-900 mb-1">
              The Internet Has a Crush on {property.name} 😍
            </h2>
            <p className="text-stone-500 mb-6">
              Don&apos;t just take our word for it — here&apos;s where this
              treehouse has been spotted out in the wild.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.featured.map((f) => (
                <a
                  key={f.url}
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-4 hover:border-stone-300 hover:shadow-md transition"
                >
                  <span className="text-3xl leading-none" aria-hidden="true">
                    {f.emoji}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-stone-900">
                      {f.source}
                    </span>
                    <span className="block text-sm text-stone-600 mt-1">
                      {f.blurb}
                    </span>
                    <span className="inline-block mt-2 text-sm font-medium text-stone-800 group-hover:underline">
                      {f.kind === "Watch" ? "Watch it" : "Read it"} &rarr;
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Instagram */}
        {property.instagramPosts && property.instagramPosts.length > 0 && (
          <InstagramFeed
            posts={property.instagramPosts}
            heading={`${property.name} on Instagram`}
            profileUrl={siteConfig.instagram}
          />
        )}

        {/* Booking Section */}
        <div className="bg-stone-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">
            Book {property.name}
          </h2>
          <div className="text-center mb-8">
            <a
              href={property.hospitable}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-800 text-white px-8 py-3 rounded font-medium hover:bg-stone-700 transition-colors"
            >
              Book Direct &amp; Save 15%
            </a>
          </div>
          <p className="text-sm text-stone-500 text-center mb-4">
            Or book via Airbnb:
          </p>
          <div className="max-w-sm mx-auto">
            <AirbnbEmbed property={property} />
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-stone-600 hover:text-stone-900 transition-colors"
          >
            &larr; Back to all properties
          </Link>
        </div>
      </div>
    </>
  );
}
