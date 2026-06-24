import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/data/properties";

/**
 * Standard bone-surface property card: image, eyebrow stat line, serif name,
 * short description. Used in the homepage 2-up and the "Stay next door"
 * cross-sell. `eyebrow` and `blurb` let callers tune copy per context.
 */
export default function PropertyCard({
  property,
  eyebrow,
  blurb,
}: {
  property: Property;
  eyebrow?: string;
  blurb?: string;
}) {
  return (
    <Link
      href={`/${property.slug}`}
      className="group block overflow-hidden rounded-[6px] border border-edge bg-bone shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]"
    >
      <div className="relative h-[210px] overflow-hidden">
        <Image
          src={property.heroImage}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-6">
        <p className="eyebrow text-muted" style={{ color: "var(--color-muted)" }}>
          {eyebrow ?? `Sleeps ${property.sleeps}`}
        </p>
        <h3
          className="mt-2.5 font-display text-[27px] leading-none text-pine"
          style={{ fontWeight: 500 }}
        >
          {property.name}
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
          {blurb ?? property.tagline}
        </p>
        <span className="mt-4 inline-block text-[13px] font-semibold text-clay transition-transform group-hover:translate-x-0.5">
          View cottage &rarr;
        </span>
      </div>
    </Link>
  );
}
