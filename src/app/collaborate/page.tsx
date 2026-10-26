import type { Metadata } from "next";
import CollaborateForm from "@/components/CollaborateForm";

export const metadata: Metadata = {
  title: "Creator Collaborations",
  description:
    "Content creators: join the Cottage Creators collaboration list for complimentary, discounted, or paid stays in Muskoka.",
  // Shared by direct link with creators we reach out to — keep it out of search.
  robots: { index: false, follow: false },
};

export default function Collaborate() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-edge max-w-2xl">
        <p className="eyebrow">Creator collaborations</p>
        <h1
          className="mt-3 font-display text-[clamp(34px,5vw,46px)] leading-[1.04] text-pine"
          style={{ fontWeight: 500 }}
        >
          Stay with us, share Muskoka
        </h1>
        <p className="mt-4 text-[16.5px] leading-relaxed text-muted">
          We partner with creators for complimentary, discounted, and paid stays at our
          cottages on Three Mile Lake. Tell us about you and your channels and we&apos;ll
          reach out when there&apos;s a good fit.
        </p>
        <p className="mt-3 text-[16.5px] leading-relaxed text-muted">
          <strong className="font-medium text-ink">Last-minute openings:</strong> when a
          short gap opens up between bookings — usually a night or two, a few days out —
          we email everyone on the last-minute list. First to reply gets the stay.
        </p>

        <div className="mt-8">
          <CollaborateForm />
        </div>
      </div>
    </section>
  );
}
