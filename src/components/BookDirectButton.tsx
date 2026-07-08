import Link from "next/link";
import { siteConfig } from "@/data/properties";

/**
 * The single, never-reworded primary action across the whole site.
 * Always reads "Book Direct & Save 15%".
 *
 * External booking links (the default Hospitable URL) open in a new tab; an
 * internal target — a route or an on-page anchor like "/#availability" — is
 * navigated in-app instead.
 */

const LABEL = "Book Direct & Save 15%";

type Size = "md" | "lg";

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-[13px] text-[15px]",
  lg: "px-8 py-4 text-base",
};

export default function BookDirectButton({
  href = siteConfig.hospitable,
  size = "md",
  className = "",
  block = false,
  onClick,
}: {
  href?: string;
  size?: Size;
  className?: string;
  block?: boolean;
  onClick?: () => void;
}) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-[4px]",
    "bg-clay text-bone font-semibold tracking-wide",
    "shadow-[0_1px_3px_rgba(0,0,0,0.12)]",
    "transition-colors duration-200 hover:bg-clay-dark",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
    sizeClasses[size],
    block ? "w-full" : "",
    className,
  ].join(" ");

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {LABEL}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes}>
      {LABEL}
    </a>
  );
}
