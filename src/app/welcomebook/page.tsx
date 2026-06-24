import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome Book",
  description: "Everything you need to know for your stay at Cottage Creators.",
};

// Canva design embedded on the original cottagecreators.ca/welcomebook.
const CANVA_ID = "DAE8poJ7Eq0";
const CANVA_EMBED = `https://www.canva.com/design/${CANVA_ID}/view?embed`;
const CANVA_VIEW = `https://www.canva.com/design/${CANVA_ID}/view?utm_content=${CANVA_ID}&utm_campaign=designshare&utm_medium=embeds&utm_source=link`;

export default function WelcomeBook() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-edge max-w-3xl">
        <p className="eyebrow">Before you arrive</p>
        <h1
          className="mt-3 font-display text-[clamp(34px,5vw,46px)] leading-[1.04] text-pine"
          style={{ fontWeight: 500 }}
        >
          The Welcome Book
        </h1>
        <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-muted">
          Everything you need for a smooth, restful stay — directions, the lay
          of the land, house notes, and our favourite things to do on Three
          Mile Lake.
        </p>

        {/* Canva embed — responsive via the aspect-ratio padding trick */}
        <div
          className="mt-10 overflow-hidden rounded-[8px] border border-edge shadow-[0_2px_8px_0_rgba(63,69,81,0.16)]"
          style={{ position: "relative", width: "100%", height: 0, paddingTop: "129.4118%" }}
        >
          <iframe
            loading="lazy"
            title="Water's Edge Welcome Book"
            src={CANVA_EMBED}
            allowFullScreen
            allow="fullscreen"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              padding: 0,
              margin: 0,
            }}
          />
        </div>

        <a
          href={CANVA_VIEW}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block text-[14px] font-semibold text-clay transition-transform hover:translate-x-0.5"
        >
          Open the Welcome Book in a new tab &rarr;
        </a>
      </div>
    </section>
  );
}
