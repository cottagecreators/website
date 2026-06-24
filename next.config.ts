import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cottage photos are served from Hospitable's CDN (see src/data/galleries.ts).
    remotePatterns: [
      new URL("https://assets.hospitable.com/property_images/**"),
      new URL("https://a0.muscache.com/im/pictures/**"),
    ],
  },
};

export default nextConfig;
