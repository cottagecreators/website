/**
 * Social-proof line placed near every CTA:
 *   ★ 5.0 · Superhost · As seen in Narcity
 * `theme` adapts the colours for light vs. dark backgrounds.
 */

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.3l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
    </svg>
  );
}

export default function TrustLine({
  theme = "light",
  className = "",
}: {
  theme?: "light" | "dark";
  className?: string;
}) {
  const text = theme === "dark" ? "text-cream/85" : "text-muted";
  const dot = theme === "dark" ? "text-sand/60" : "text-edge";
  const star = theme === "dark" ? "text-sand" : "text-clay";

  return (
    <p
      className={[
        "flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] font-medium tracking-wide",
        text,
        className,
      ].join(" ")}
    >
      <span className="inline-flex items-center gap-1.5">
        <Star className={`h-3.5 w-3.5 ${star}`} />
        5.0
      </span>
      <span className={dot} aria-hidden="true">
        ·
      </span>
      <span>Superhost</span>
      <span className={dot} aria-hidden="true">
        ·
      </span>
      <span>As seen in Narcity</span>
    </p>
  );
}
