"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/data/galleries";

export default function Gallery({
  images,
  propertyName,
}: {
  images: GalleryImage[];
  propertyName: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const show = useCallback(
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
      else if (e.key === "ArrowRight") show(1);
      else if (e.key === "ArrowLeft") show(-1);
    };
    window.addEventListener("keydown", onKey);
    // Prevent background scroll while the lightbox is open.
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, show]);

  if (images.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-stone-900 mb-1">Photo Gallery</h2>
      <p className="text-stone-500 mb-6">
        {images.length} photos — tap any image to explore.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={img.url}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 text-left focus:outline-none focus:ring-2 focus:ring-stone-800"
            aria-label={`View photo ${i + 1}: ${img.caption}`}
          >
            <Image
              src={img.url}
              alt={img.caption}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
              {img.caption}
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${propertyName} photo viewer`}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              show(-1);
            }}
            className="absolute left-2 sm:left-6 text-white/70 hover:text-white text-4xl px-3 py-6"
            aria-label="Previous photo"
          >
            &#8249;
          </button>

          {/* Image + caption */}
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh]">
              <Image
                src={images[active].url}
                alt={images[active].caption}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <p className="text-center text-stone-200 mt-4 px-6">
              {images[active].caption}
            </p>
            <p className="text-center text-stone-500 text-sm mt-1">
              {active + 1} / {images.length}
            </p>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              show(1);
            }}
            className="absolute right-2 sm:right-6 text-white/70 hover:text-white text-4xl px-3 py-6"
            aria-label="Next photo"
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
}
