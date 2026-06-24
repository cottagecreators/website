"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/data/galleries";

/**
 * Property hero gallery: a 5-image mosaic (1 large + 4 small) with a
 * "+N photos" tile. Any tile opens a full-screen lightbox over the complete
 * photo set, with keyboard + click navigation.
 */
export default function GalleryMosaic({
  images,
  propertyName,
}: {
  images: GalleryImage[];
  propertyName: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (delta: number) =>
      setActive((i) =>
        i === null ? i : (i + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  if (images.length === 0) return null;

  const tiles = images.slice(0, 5);
  const extra = images.length - 5;

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:grid-rows-2 sm:[height:clamp(360px,42vw,520px)]">
        {tiles.map((img, i) => {
          const isLead = i === 0;
          const isLast = i === 4;
          return (
            <button
              key={img.url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1} of ${images.length}: ${img.caption}`}
              className={[
                "group relative overflow-hidden bg-edge/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay",
                isLead
                  ? "col-span-2 row-span-2 aspect-[4/3] sm:aspect-auto"
                  : "aspect-[4/3] sm:aspect-auto",
                // round only the outer corners of the mosaic
                isLead ? "rounded-l-[6px]" : "",
                i === 1 ? "sm:rounded-tr-[6px]" : "",
                isLast ? "rounded-br-[6px]" : "",
              ].join(" ")}
            >
              <Image
                src={img.url}
                alt={img.caption}
                fill
                sizes="(max-width: 768px) 50vw, 28vw"
                className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                priority={isLead}
              />
              {isLast && extra > 0 && (
                <span className="absolute inset-0 flex items-center justify-center bg-pine-deep/55 text-sm font-semibold text-bone backdrop-blur-[1px]">
                  +{extra} photos
                </span>
              )}
            </button>
          );
        })}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-pine-deep/95 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${propertyName} photo viewer`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 text-3xl leading-none text-bone/80 hover:text-bone"
          >
            &times;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-2 px-3 py-6 text-4xl text-bone/70 hover:text-bone sm:left-6"
          >
            &#8249;
          </button>

          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[70vh] w-full">
              <Image
                src={images[active].url}
                alt={images[active].caption}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-4 px-6 text-center text-sm text-cream/80">
              {images[active].caption}
            </p>
            <p className="mt-1 text-center text-xs text-cream/45">
              {active + 1} / {images.length}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-2 px-3 py-6 text-4xl text-bone/70 hover:text-bone sm:right-6"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
