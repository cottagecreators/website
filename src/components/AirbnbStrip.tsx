import Image from "next/image";
import { properties } from "@/data/properties";

/**
 * "Still prefer Airbnb?" strip — image previews of each cottage linking out to
 * its Airbnb listing (and its reviews), shown below the homepage availability
 * timeline. Gently nudges toward booking direct while meeting Airbnb-loyal
 * guests where they are.
 */
export default function AirbnbStrip() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-edge">
        <div className="max-w-2xl">
          <p className="eyebrow">Still prefer Airbnb?</p>
          <h2
            className="mt-3.5 font-display text-[clamp(28px,4.5vw,40px)] leading-[1.05] text-pine"
            style={{ fontWeight: 500 }}
          >
            Read the reviews, then book direct
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
            Totally fair — find each cottage on Airbnb, five-star reviews and
            Superhost badge included. When you&apos;re ready, booking direct here
            saves you about 15%.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {properties.map((p) => (
            <a
              key={p.slug}
              href={p.airbnb}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-[8px] border border-edge bg-bone shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]"
            >
              <div className="relative h-[180px] overflow-hidden">
                <Image
                  src={p.heroImage}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-display text-[19px] text-pine" style={{ fontWeight: 500 }}>
                    {p.name}
                  </p>
                  <p className="text-[13px] text-muted">{p.tagline}</p>
                </div>
                <span className="shrink-0 text-[13px] font-semibold text-[#E31C5F] transition-transform group-hover:translate-x-0.5">
                  View on Airbnb &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
