"use client";

import { useState } from "react";

export interface WelcomeBook {
  /** Cottage name, used as the tab label. */
  name: string;
  /** Canva design id. */
  canvaId: string;
}

/**
 * Tabbed Canva viewer for the welcome books. Only the active book's iframe is
 * mounted, so a single (heavy, portrait) Canva embed loads at a time.
 */
export default function WelcomeBookViewer({ books }: { books: WelcomeBook[] }) {
  const [active, setActive] = useState(0);
  const book = books[active];
  const embed = `https://www.canva.com/design/${book.canvaId}/view?embed`;
  const view = `https://www.canva.com/design/${book.canvaId}/view?utm_content=${book.canvaId}&utm_campaign=designshare&utm_medium=embeds&utm_source=link`;

  return (
    <div className="mt-10">
      {books.length > 1 && (
        <div
          role="tablist"
          aria-label="Welcome books"
          className="flex flex-wrap gap-1 border-b border-edge"
        >
          {books.map((b, i) => {
            const selected = i === active;
            return (
              <button
                key={b.canvaId}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(i)}
                className={[
                  "-mb-px border-b-2 px-4 py-2.5 text-[14px] font-semibold transition-colors",
                  selected
                    ? "border-clay text-clay"
                    : "border-transparent text-muted hover:text-ink",
                ].join(" ")}
              >
                {b.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Canva embed — responsive via the aspect-ratio padding trick */}
      <div
        className="mt-6 overflow-hidden rounded-[8px] border border-edge shadow-[0_2px_8px_0_rgba(63,69,81,0.16)]"
        style={{ position: "relative", width: "100%", height: 0, paddingTop: "129.4118%" }}
      >
        <iframe
          // key forces a fresh iframe when switching tabs
          key={book.canvaId}
          loading="lazy"
          title={`${book.name} Welcome Book`}
          src={embed}
          allowFullScreen
          allow="fullscreen"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
            padding: 0,
            margin: 0,
          }}
        />
      </div>

      <a
        href={view}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block text-[14px] font-semibold text-clay transition-transform hover:translate-x-0.5"
      >
        Open {book.name}&apos;s welcome book in a new tab &rarr;
      </a>
    </div>
  );
}
