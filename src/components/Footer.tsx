import Link from "next/link";
import { siteConfig } from "@/data/properties";

const propertyLinks = [
  { href: "/thewatersedge", label: "The Water's Edge" },
  { href: "/muskokacabana", label: "Muskoka Cabana" },
  { href: "/thenest", label: "The Nest" },
];

const exploreLinks = [
  { href: "/welcomebook", label: "Welcome Book" },
  { href: "/rental-agreement", label: "Rental Agreement" },
  { href: "/media-kit", label: "Media Kit" },
  { href: "/contact-us", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-pine-deep text-cream/70">
      <div className="container-edge py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span
              className="font-display text-[26px] text-bone"
              style={{ fontWeight: 600 }}
            >
              Cottage Creators
            </span>
            <p className="mt-4 text-sm leading-relaxed">
              {siteConfig.address}
              <br />
              Three Mile Lake, Muskoka
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 inline-block text-sm text-cream/70 transition-colors hover:text-bone"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Stays */}
          <div>
            <h4 className="eyebrow eyebrow-on-dark" style={{ color: "var(--color-sand)" }}>
              Stays
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {propertyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="eyebrow eyebrow-on-dark" style={{ color: "var(--color-sand)" }}>
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="eyebrow eyebrow-on-dark" style={{ color: "var(--color-sand)" }}>
              Connect
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-bone"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-bone"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`}
                  className="transition-colors hover:text-bone"
                >
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-cream/10 pt-8 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Cottage Creators. All rights
            reserved.
          </p>
          <p>Three Mile Lake · Utterson · Muskoka, Ontario</p>
        </div>
      </div>
    </footer>
  );
}
