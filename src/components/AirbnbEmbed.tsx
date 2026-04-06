import Image from "next/image";
import type { Property } from "@/data/properties";

export default function AirbnbEmbed({ property }: { property: Property }) {
  return (
    <a
      href={property.airbnb}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <p className="font-semibold text-stone-900">{property.name}</p>
        <p className="text-sm text-stone-500 mt-1">{property.tagline}</p>
        <span className="inline-block mt-3 text-sm font-medium text-[#FF5A5F]">
          View on Airbnb &rarr;
        </span>
      </div>
    </a>
  );
}
