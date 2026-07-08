import type { Metadata } from "next";
import SubscribeForm from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Sign up for Cottage Creators email and text promotions — seasonal offers, availability, and Muskoka inspiration.",
};

export default function Subscribe() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-edge max-w-xl">
        <p className="eyebrow">Stay in the loop</p>
        <h1
          className="mt-3 font-display text-[clamp(34px,5vw,46px)] leading-[1.04] text-pine"
          style={{ fontWeight: 500 }}
        >
          Muskoka news &amp; offers
        </h1>
        <p className="mt-4 text-[16.5px] leading-relaxed text-muted">
          Seasonal specials, last-minute openings, and a little lakeside inspiration —
          delivered how you like it. Choose email, text, or both.
        </p>

        <div className="mt-8">
          <SubscribeForm />
        </div>
      </div>
    </section>
  );
}
