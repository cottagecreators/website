import type { Metadata } from "next";
import WelcomeBookViewer from "@/components/WelcomeBookViewer";
import { welcomeBooks } from "@/data/welcomeBooks";

export const metadata: Metadata = {
  title: "Welcome Book",
  description: "Everything you need to know for your stay at Cottage Creators.",
};

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
          Mile Lake. Pick the book for your cottage below, or open it on its own
          page to share.
        </p>

        <WelcomeBookViewer books={welcomeBooks} />
      </div>
    </section>
  );
}
