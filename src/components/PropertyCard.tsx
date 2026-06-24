import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/${property.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.heroImage}
          alt={property.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-stone-900">
          {property.name}
        </h3>
        <p className="text-sm text-stone-500 mt-1">{property.tagline}</p>
        <p className="text-stone-600 mt-3 text-sm line-clamp-2">
          {property.description}
        </p>
        <span className="inline-block mt-4 text-sm font-medium text-stone-800 group-hover:underline">
          View Property &rarr;
        </span>
      </div>
    </Link>
  );
}
