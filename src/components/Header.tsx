"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BookDirectButton from "@/components/BookDirectButton";

const navLinks = [
  { href: "/thewatersedge", label: "The Water's Edge" },
  { href: "/muskokacabana", label: "Muskoka Cabana" },
  { href: "/thenest", label: "The Nest" },
  { href: "/contact-us", label: "Contact" },
];

// Secondary links surfaced in the full-screen mobile menu only.
const moreLinks = [
  { href: "/welcomebook", label: "Welcome Book" },
  { href: "/rental-agreement", label: "Rental Agreement" },
  { href: "/media-kit", label: "Media Kit" },
  { href: "/subscribe", label: "Subscribe" },
];

// Routes that render a dark, full-bleed hero behind the header. Only the
// home page does; property pages open with a light gallery on cream.
const heroRoutes = ["/"];

export default function Header() {
  const pathname = usePathname();
  const hasHero = heroRoutes.includes(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the full-screen menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Transparent only while over a hero and not yet scrolled.
  const overlay = hasHero && !scrolled;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          overlay
            ? ""
            : "bg-cream/95 backdrop-blur-sm border-b border-edge shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
        ].join(" ")}
        style={
          overlay
            ? {
                background:
                  "linear-gradient(180deg, rgba(20,28,22,0.55) 0%, rgba(20,28,22,0) 100%)",
              }
            : undefined
        }
      >
        <div className="container-edge">
          <div className="flex h-20 items-center justify-between">
            {/* Wordmark */}
            <Link
              href="/"
              className={[
                "font-display text-[26px] leading-none font-600 tracking-tight transition-colors",
                overlay ? "text-bone" : "text-ink",
              ].join(" ")}
              style={{ fontWeight: 600 }}
            >
              Cottage Creators
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "text-[14px] font-medium transition-colors",
                    overlay
                      ? "text-bone/85 hover:text-bone"
                      : "text-muted hover:text-ink",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
              <BookDirectButton />
            </nav>

            {/* Mobile toggle */}
            <button
              type="button"
              className="lg:hidden p-2 -mr-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                className={`h-7 w-7 ${overlay ? "text-bone" : "text-ink"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer keeps non-hero pages clear of the fixed header */}
      {!hasHero && <div className="h-20" aria-hidden="true" />}

      {/* Full-screen mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-pine-deep text-bone lg:hidden">
          <div className="container-edge">
            <div className="flex h-20 items-center justify-between">
              <span
                className="font-display text-[26px] text-bone"
                style={{ fontWeight: 600 }}
              >
                Cottage Creators
              </span>
              <button
                type="button"
                className="p-2 -mr-2"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  className="h-7 w-7 text-bone"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>

          <nav className="container-edge flex flex-1 flex-col justify-center gap-1 pb-24">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl text-bone py-2 transition-colors hover:text-sand"
                style={{ fontWeight: 500 }}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-bone/15 pt-6">
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-bone/70 hover:text-bone"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <BookDirectButton size="lg" block />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
