import type { Metadata } from "next";
import Link from "next/link";
import AirbnbEmbed from "@/components/AirbnbEmbed";
import { properties, siteConfig } from "@/data/properties";


export const metadata: Metadata = {
  title: "Book Now",
  description:
    "Book your Muskoka cottage getaway direct and save 15% compared to Airbnb.",
};

export default function BookNow() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Direct Booking CTA */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Book Now</h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-6">
          Want to save on Airbnb fees? Save 15% by booking directly through our
          reservation system.
        </p>
        <a
          href={siteConfig.hospitable}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-stone-800 text-white px-10 py-4 rounded text-lg font-medium hover:bg-stone-700 transition-colors"
        >
          Book Direct &amp; Save 15%
        </a>
      </div>

      <div className="border-t border-stone-200 pt-12">
        <h2 className="text-2xl font-bold text-stone-900 text-center mb-8">
          Or Book via Airbnb
        </h2>
        <p className="text-stone-600 text-center mb-8">
          Prefer to book through Airbnb? No problem at all.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <AirbnbEmbed key={property.slug} property={property} />
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="text-stone-600 hover:text-stone-900 transition-colors"
        >
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
