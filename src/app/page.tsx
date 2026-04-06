import Image from "next/image";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { properties, siteConfig } from "@/data/properties";

export default function Home() {
  return (
    <>
      {/* Hero Section with YouTube Background Video */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* YouTube background video - muted, autoplay, loop */}
        <div className="absolute inset-0 pointer-events-none">
          <iframe
            src="https://www.youtube.com/embed/DPsvx39w0Lk?autoplay=1&mute=1&loop=1&playlist=DPsvx39w0Lk&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3"
            title="Cottage Creators background video"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full min-h-full"
            style={{ aspectRatio: "16/9" }}
          />
        </div>
        {/* Fallback image for when video hasn't loaded */}
        <Image
          src="/images/hero-1.jpeg"
          alt="Muskoka lakefront at sunset"
          fill
          className="object-cover -z-10"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            {siteConfig.name}
          </h1>
          <p className="text-xl md:text-2xl mt-4 font-light tracking-wide">
            {siteConfig.tagline}
          </p>
          <p className="text-lg mt-2 opacity-80">
            Three Mile Lake, Utterson, Ontario
          </p>
          <Link
            href="/booknow"
            className="mt-8 bg-white text-stone-900 px-8 py-3 rounded font-medium text-lg hover:bg-stone-100 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-stone-900 text-center mb-4">
          Our Properties
        </h2>
        <p className="text-stone-600 text-center max-w-2xl mx-auto mb-12">
          Choose from three unique Muskoka retreats, each with its own character
          and charm, all on beautiful Three Mile Lake.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </section>

      {/* Book Direct CTA */}
      <section className="bg-stone-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Book Direct &amp; Save</h2>
          <p className="text-stone-300 text-lg mb-8">
            Save 15% compared to Airbnb by booking directly through us. Same
            great properties, better price.
          </p>
          <a
            href={siteConfig.hospitable}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-stone-900 px-8 py-3 rounded font-medium text-lg hover:bg-stone-100 transition-colors"
          >
            Book Direct Here
          </a>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">
          Follow the Journey
        </h2>
        <p className="text-stone-600 mb-8">
          See what&apos;s happening at the cottages on Instagram
        </p>
        {/* Instagram embed placeholder - replace with Behold/Elfsight widget */}
        <div className="bg-stone-100 rounded-lg p-12 text-stone-500">
          <p className="text-lg mb-4">Instagram Feed</p>
          <p className="text-sm mb-6">
            Add your Behold or Elfsight Instagram widget script here
          </p>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-stone-800 text-white px-6 py-2.5 rounded font-medium hover:bg-stone-700 transition-colors"
          >
            @cottagecreators on Instagram
          </a>
        </div>
      </section>
    </>
  );
}
