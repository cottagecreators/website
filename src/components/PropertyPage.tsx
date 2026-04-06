import Image from "next/image";
import Link from "next/link";
import AirbnbEmbed from "@/components/AirbnbEmbed";
import type { Property } from "@/data/properties";

export default function PropertyPage({ property }: { property: Property }) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">{property.name}</h1>
          <p className="text-xl mt-3 font-light">{property.tagline}</p>
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

        {/* Image Gallery */}
        {property.images.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {property.images.map((img, i) => (
              <div key={i} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={img}
                  alt={`${property.name} photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
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
