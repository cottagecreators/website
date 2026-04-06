import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/properties";

export const metadata: Metadata = {
  title: "Media Kit",
  description: "Cottage Creators media kit, brand assets, and press information.",
};

export default function MediaKit() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-stone-900 mb-4">Media Kit</h1>
      <p className="text-stone-600 mb-8">
        Brand assets and information for press and partnerships.
      </p>

      <div className="space-y-8">
        {/* Brand Info */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-stone-900 mb-4">
            About Cottage Creators
          </h2>
          <p className="text-stone-600 leading-relaxed">
            Cottage Creators is a luxury cottage rental experience located on
            Three Mile Lake in Utterson, Muskoka, Ontario. We offer three unique
            properties — The Water&apos;s Edge treehouse, Muskoka Cabana, and The
            Nest — each designed to provide an unforgettable escape in one of
            Ontario&apos;s most beautiful settings.
          </p>
        </section>

        {/* Logo */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-stone-900 mb-4">Logo</h2>
          <div className="bg-stone-50 rounded-lg p-8 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Cottage Creators Logo"
              width={300}
              height={100}
              className="h-24 w-auto"
            />
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-stone-900 mb-4">
            Contact for Media Inquiries
          </h2>
          <ul className="text-stone-600 space-y-2">
            <li>
              Email:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-stone-800 underline"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              Instagram:{" "}
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-800 underline"
              >
                @cottagecreators
              </a>
            </li>
            <li>
              Location: Three Mile Lake, Utterson, Muskoka, Ontario
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
