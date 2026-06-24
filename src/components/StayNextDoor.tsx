import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import { properties } from "@/data/properties";
import type { Property } from "@/data/properties";

const eyebrows: Record<string, string> = {
  thewatersedge: "Sleeps 8 · The treehouse",
  muskokacabana: "Sleeps 6 · Sandy beach",
  thenest: "Sleeps 6 · In the trees",
};

/**
 * Cross-sell the other two cottages on the shoreline — the "stay next door /
 * book the whole shoreline" pair.
 */
export default function StayNextDoor({ current }: { current: Property }) {
  const others = properties.filter((p) => p.slug !== current.slug);

  return (
    <section className="border-t border-edge bg-cream py-20 md:py-28">
      <div className="container-edge">
        <Reveal>
          <p className="eyebrow">Stay next door</p>
          <h2
            className="mt-3.5 max-w-[28ch] font-display text-[clamp(28px,4vw,40px)] leading-[1.06] text-pine"
            style={{ fontWeight: 500 }}
          >
            Book the whole shoreline
          </h2>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted">
            All three stays share one private shoreline. Bring a bigger group
            and book two cottages side by side.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2">
            {others.map((p) => (
              <PropertyCard key={p.slug} property={p} eyebrow={eyebrows[p.slug]} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
