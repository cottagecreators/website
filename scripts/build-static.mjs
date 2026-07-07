// Static export build for either static target:
//
//   node scripts/build-static.mjs pages    -> GitHub Pages  (basePath /website)
//   node scripts/build-static.mjs droplet   -> DigitalOcean  (Caddy file_server)
//
// The /api/availability Route Handlers are `force-dynamic` (they read the
// request and call the Hospitable API at runtime). Dynamic Route Handlers can't
// be part of a Next.js static export (`output: "export"`), so we temporarily
// move the `api` directory out of `src/app`, run the export, then always move
// it back — leaving the working tree untouched whether the build passes or fails.
//
// On these static builds the availability features gracefully degrade: the
// booking calendar falls back to plain date inputs and the homepage timeline
// hides itself. The live experience runs on the dynamic (standalone) build.

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { rename } from "node:fs/promises";

const TARGETS = {
  pages: { GITHUB_PAGES: "true" },
  droplet: { DROPLET: "true" },
};

const target = process.argv[2];
if (!TARGETS[target]) {
  console.error(`Usage: node scripts/build-static.mjs <${Object.keys(TARGETS).join("|")}>`);
  process.exit(2);
}

const API_DIR = "src/app/api";
const STASH_DIR = ".api-export-stash";

async function main() {
  const hasApi = existsSync(API_DIR);
  if (hasApi) await rename(API_DIR, STASH_DIR);

  try {
    const result = spawnSync("next", ["build"], {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, ...TARGETS[target] },
    });
    process.exitCode = result.status ?? 1;
  } finally {
    if (hasApi) await rename(STASH_DIR, API_DIR);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
