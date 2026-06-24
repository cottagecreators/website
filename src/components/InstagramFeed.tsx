"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const EMBED_SCRIPT_ID = "instagram-embed-script";

export default function InstagramFeed({
  posts,
  heading,
  profileUrl,
}: {
  posts: string[];
  heading: string;
  profileUrl: string;
}) {
  useEffect(() => {
    const process = () => window.instgrm?.Embeds.process();
    if (document.getElementById(EMBED_SCRIPT_ID)) {
      process();
      return;
    }
    const script = document.createElement("script");
    script.id = EMBED_SCRIPT_ID;
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = process;
    document.body.appendChild(script);
  }, [posts]);

  if (posts.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
        <h2 className="text-2xl font-bold text-stone-900">{heading}</h2>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-stone-800 hover:underline"
        >
          Follow us on Instagram &rarr;
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((url) => (
          <blockquote
            key={url}
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{ margin: 0, width: "100%", minWidth: "unset" }}
          />
        ))}
      </div>
    </section>
  );
}
