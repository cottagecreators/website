import type { NextConfig } from "next";

// Cottage photos are served from the Hospitable and Airbnb CDNs.
const remotePatterns = [
  new URL("https://assets.hospitable.com/property_images/**"),
  new URL("https://a0.muscache.com/im/pictures/**"),
];

// The GitHub Pages deploy workflow sets GITHUB_PAGES=true. In that mode we emit
// a fully static site served from https://cottagecreators.github.io/website/.
// Without the flag (local dev, and the DigitalOcean server deploy) we produce a
// normal Next.js server build with image optimization enabled.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/website";

const nextConfig: NextConfig = isGithubPages
  ? {
      output: "export",
      trailingSlash: true,
      basePath: repoBasePath,
      assetPrefix: repoBasePath,
      images: {
        unoptimized: true, // GitHub Pages has no image-optimization server.
        remotePatterns,
      },
    }
  : {
      images: {
        remotePatterns,
      },
    };

export default nextConfig;
