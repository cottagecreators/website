import Link from "next/link";
import { siteConfig } from "@/data/properties";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-stone-400">{siteConfig.tagline}</p>
            <p className="text-sm text-stone-400 mt-2">{siteConfig.address}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-stone-400 hover:text-white transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
              Properties
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/thewatersedge"
                  className="hover:text-white transition-colors"
                >
                  The Water&apos;s Edge
                </Link>
              </li>
              <li>
                <Link
                  href="/muskokacabana"
                  className="hover:text-white transition-colors"
                >
                  Muskoka Cabana
                </Link>
              </li>
              <li>
                <Link
                  href="/thenest"
                  className="hover:text-white transition-colors"
                >
                  The Nest
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-8 pt-8 text-center text-sm text-stone-500">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
