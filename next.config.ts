import type { NextConfig } from "next";

// Cottage photos are served from the Hospitable and Airbnb CDNs.
const remotePatterns = [
  new URL("https://assets.hospitable.com/property_images/**"),
  new URL("https://a0.muscache.com/im/pictures/**"),
];

// This site is fully static (every route is SSG and images come from external
// CDNs), so both production targets ship a static export — there is no Next.js
// server to run. The deploy workflows pick the target via env vars:
//
//   GITHUB_PAGES=true  -> served from https://cottagecreators.github.io/website/
//                         so it needs the "/website" basePath + assetPrefix.
//   DROPLET=true       -> served from https://cottagecreators.ca/ (Caddy
//                         file_server on the droplet), so NO basePath.
//
// With neither flag (local dev / `next build` on a workstation) we keep the
// normal server build with image optimization so `next dev` and previews work
// exactly as before.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const isDroplet = process.env.DROPLET === "true";
const isStaticExport = isGithubPages || isDroplet;
const repoBasePath = "/website";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      // trailingSlash emits `route/index.html`, which a plain static file
      // server (GitHub Pages, Caddy file_server) resolves without rewrite rules.
      trailingSlash: true,
      // basePath/assetPrefix only apply on GitHub Pages' "/website" subpath.
      // On the droplet the site lives at the domain root, so they stay unset.
      ...(isGithubPages
        ? { basePath: repoBasePath, assetPrefix: repoBasePath }
        : {}),
      images: {
        unoptimized: true, // No image-optimization server in a static export.
        remotePatterns,
      },
    }
  : {
      // Self-contained server bundle for the Docker/DigitalOcean deploy.
      output: "standalone",
      images: {
        remotePatterns,
      },
    };

export default nextConfig;
