import Image from "next/image";
import Link from "next/link";
import BookDirectButton from "@/components/BookDirectButton";
import TrustLine from "@/components/TrustLine";
import Reveal from "@/components/Reveal";
import PropertyCard from "@/components/PropertyCard";
import AvailabilityTimeline from "@/components/AvailabilityTimeline";
import AirbnbStrip from "@/components/AirbnbStrip";
import { properties, siteConfig } from "@/data/properties";
import { galleries } from "@/data/galleries";

const watersEdge = properties.find((p) => p.slug === "thewatersedge")!;
const cabana = properties.find((p) => p.slug === "muskokacabana")!;
const nest = properties.find((p) => p.slug === "thenest")!;

const HERO_IMAGE =
  "https://assets.hospitable.com/property_images/1879234/oqtQWcKjkOkDSQUIAE3AiK9Bv2AFQfDGtieh6lFv.jpg";

// Curated lifestyle shots from the real gallery for the story + Instagram grid.
const we = galleries.thewatersedge;
const storyImage = we[30] ?? we[0]; // canoe at the dock during a glowing sunset
const instaPhotos = [we[2], we[4], we[15], we[20], we[10], we[9]].filter(Boolean);

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sand"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Red Adirondack chairs around a lakeside fire pit as the treehouse glows at sunset on Three Mile Lake"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* dark left-to-right gradient for headline legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(20,28,22,0.92) 0%, rgba(20,28,22,0.84) 38%, rgba(20,28,22,0.55) 58%, rgba(20,28,22,0.15) 82%, rgba(20,28,22,0) 100%)",
          }}
        />
        {/* gentle bottom + top scrims */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,28,22,0.35) 0%, rgba(20,28,22,0) 22%, rgba(20,28,22,0) 65%, rgba(20,28,22,0.45) 100%)",
          }}
        />
        <div className="relative z-10 flex min-h-screen items-center">
          <div className="container-edge">
            <div className="max-w-[680px] pt-24">
              <p
                className="eyebrow eyebrow-on-dark"
                style={{ color: "var(--color-sand)", letterSpacing: "0.24em" }}
              >
                Muskoka · Three Mile Lake, Ontario
              </p>
              <h1
                className="mt-5 font-display text-[clamp(44px,7vw,64px)] leading-[0.98] text-bone"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-0.015em",
                  textShadow: "0 2px 30px rgba(20,28,22,0.55)",
                }}
              >
                Wake up in the trees,
                <br />
                steps from the lake.
              </h1>
              <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-cream/90">
                A one-of-a-kind treehouse and two cottages beside it, on a
                private Muskoka shoreline designed for slow mornings and golden
                evenings.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <BookDirectButton size="lg" />
                <Link
                  href="/thewatersedge"
                  className="inline-flex items-center justify-center rounded-[4px] border border-bone/60 px-7 py-4 text-[15px] font-semibold tracking-wide text-bone transition-colors hover:bg-bone/10"
                >
                  Explore the treehouse
                </Link>
              </div>
              <TrustLine theme="dark" className="mt-7" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Properties showcase ===== */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-edge">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="eyebrow">Three retreats, one shoreline</p>
                <h2 className="mt-3.5 font-display text-[clamp(32px,5vw,44px)] leading-[1.05] text-pine" style={{ fontWeight: 500 }}>
                  Choose your stay
                </h2>
              </div>
              <p className="max-w-[36ch] text-[15px] leading-relaxed text-muted">
                Book the Cabana &amp; Nest together for larger groups — they sit
                side by side, the whole point of next door.
              </p>
            </div>
          </Reveal>

          {/* Featured — The Water's Edge */}
          <Reveal delay={80}>
            <Link
              href="/thewatersedge"
              className="group relative mt-10 block h-[420px] overflow-hidden rounded-[6px] sm:h-[440px]"
            >
              <Image
                src={watersEdge.heroImage}
                alt="The Water's Edge treehouse glowing above the water amid golden autumn trees"
                fill
                sizes="(max-width: 1140px) 100vw, 1140px"
                className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(20,28,22,0.85) 0%, rgba(20,28,22,0.10) 55%, rgba(20,28,22,0) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7 text-bone sm:flex-row sm:items-end sm:justify-between sm:p-9">
                <div className="max-w-[56ch]">
                  <span className="inline-block rounded-[3px] bg-clay/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]">
                    Most loved · Sleeps 8
                  </span>
                  <h3 className="mt-3.5 font-display text-[clamp(30px,4.5vw,40px)] leading-none text-bone" style={{ fontWeight: 500 }}>
                    The Water&apos;s Edge
                  </h3>
                  <p className="mt-2 text-[15px] text-cream/85">
                    The treehouse — floating hammock net, two-sided fireplace,
                    wood-fired hot tub, private dock.
                  </p>
                </div>
                <span className="inline-flex w-fit items-center rounded-[4px] bg-bone px-5 py-3 text-[13px] font-semibold text-pine transition-transform group-hover:translate-x-0.5">
                  View treehouse &rarr;
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Two smaller cottages */}
          <Reveal delay={120}>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <PropertyCard
                property={cabana}
                eyebrow="Sleeps 6 · Sandy beach"
                blurb="A refreshed 1950s cottage steps from the beach — pine floors, leather couches, lake views from the table."
              />
              <PropertyCard
                property={nest}
                eyebrow="Sleeps 6 · In the trees"
                blurb="A jewel up in the trees with near floor-to-ceiling windows on three sides and non-stop lake views."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Availability timeline (live; DigitalOcean only) ===== */}
      <AvailabilityTimeline />

      {/* ===== Still prefer Airbnb? ===== */}
      <AirbnbStrip />

      {/* ===== Book-direct value band ===== */}
      <section className="bg-pine text-bone">
        <div className="container-edge py-20 md:py-28">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
              <div>
                <p className="eyebrow eyebrow-on-dark" style={{ color: "var(--color-sand)" }}>
                  Book direct
                </p>
                <h2 className="mt-3.5 font-display text-[clamp(30px,4.5vw,40px)] leading-[1.04] text-bone" style={{ fontWeight: 500 }}>
                  Same cottages.
                  <br />
                  Better price.
                </h2>
                <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-cream/75">
                  Booking with us directly is about 15% cheaper than Airbnb — no
                  platform fees, the same five-star stay, and a real human to
                  message.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <ul className="flex flex-col gap-4">
                  <li className="flex gap-3.5">
                    <Check />
                    <span className="text-[15px] text-cream/90">
                      ~15% lower nightly rate, every night
                    </span>
                  </li>
                  <li className="flex gap-3.5">
                    <Check />
                    <span className="text-[15px] text-cream/90">
                      A direct line to your hosts, Shari &amp; David
                    </span>
                  </li>
                  <li className="flex gap-3.5">
                    <Check />
                    <span className="text-[15px] text-cream/90">
                      Book two cottages together for groups
                    </span>
                  </li>
                </ul>
                <div className="mt-3">
                  <BookDirectButton size="lg" />
                  <TrustLine theme="dark" className="mt-4" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Story ===== */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-edge">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] border border-edge">
                <Image
                  src={storyImage.url}
                  alt={storyImage.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <p className="eyebrow">Your hosts</p>
                <h2 className="mt-3.5 font-display text-[clamp(30px,4.5vw,44px)] leading-[1.05] text-pine" style={{ fontWeight: 500 }}>
                  Built by hand, on a lake we love
                </h2>
                <div className="mt-5 space-y-4 text-[16.5px] leading-relaxed text-muted">
                  <p>
                    Shari &amp; David van de Pol designed The Water&apos;s Edge
                    in 2018 — a treehouse they dreamed up for their own family on
                    a quiet stretch of Three Mile Lake, then opened to guests who
                    wanted the same slow, unhurried kind of Muskoka.
                  </p>
                  <p>
                    Today the shoreline holds three stays: the treehouse, the
                    Cabana, and the Nest. We still host every booking ourselves,
                    so when you book direct you&apos;re talking to the people who
                    built the place.
                  </p>
                </div>
                <Link
                  href="/contact-us"
                  className="mt-6 inline-block text-[14px] font-semibold text-clay transition-transform hover:translate-x-0.5"
                >
                  Say hello &rarr;
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Press strip ===== */}
      <section className="border-y border-edge bg-bone py-16">
        <div className="container-edge text-center">
          <Reveal>
            <p className="eyebrow" style={{ color: "var(--color-muted)" }}>
              As seen in
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
              {watersEdge.featured?.slice(0, 4).map((f) => (
                <a
                  key={f.url}
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-[clamp(20px,3vw,26px)] text-pine/70 transition-colors hover:text-pine"
                  style={{ fontWeight: 500 }}
                >
                  {f.source}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Instagram grid ===== */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-edge">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">@cottagecreators</p>
                <h2 className="mt-3.5 font-display text-[clamp(30px,4.5vw,44px)] leading-[1.05] text-pine" style={{ fontWeight: 500 }}>
                  From the shoreline
                </h2>
              </div>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-semibold text-clay transition-transform hover:translate-x-0.5"
              >
                Follow along &rarr;
              </a>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
              {instaPhotos.map((photo) => (
                <a
                  key={photo.url}
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-[6px] border border-edge"
                >
                  <Image
                    src={photo.url}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
