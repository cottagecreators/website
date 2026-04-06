import type { Metadata } from "next";
import { siteConfig } from "@/data/properties";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Cottage Creators for bookings, questions, or media inquiries.",
};

export default function ContactUs() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-stone-900 mb-4">Contact Us</h1>
      <p className="text-stone-600 mb-8">
        Have a question about one of our properties? We&apos;d love to hear from
        you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form className="space-y-4" action={`mailto:${siteConfig.email}`} method="post" encType="text/plain">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-stone-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-stone-300 rounded px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-stone-300 rounded px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-stone-700 mb-1"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full border border-stone-300 rounded px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-stone-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full border border-stone-300 rounded px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-stone-800 text-white px-6 py-3 rounded font-medium hover:bg-stone-700 transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-stone-900 mb-2">
              Email
            </h2>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-stone-600 hover:text-stone-900 transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-stone-900 mb-2">
              Phone
            </h2>
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-stone-600 hover:text-stone-900 transition-colors"
            >
              {siteConfig.phone}
            </a>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-stone-900 mb-2">
              Location
            </h2>
            <p className="text-stone-600">{siteConfig.address}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-stone-900 mb-2">
              Social
            </h2>
            <div className="space-y-2">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-stone-600 hover:text-stone-900 transition-colors"
              >
                Instagram — @cottagecreators
              </a>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-stone-600 hover:text-stone-900 transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
