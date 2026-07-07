// Static GitHub Pages export build.
//
// The /api/availability Route Handlers are `force-dynamic` (they read the
// request and call the Hospitable API at runtime on the DigitalOcean server).
// Dynamic Route Handlers cannot be part of a Next.js static export (`output:
// "export"`), so we temporarily move the `api` directory out of `src/app`,
// run the export, then always move it back — leaving the working tree
// untouched whether the build succeeds or fails.

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { rename } from "node:fs/promises";

const API_DIR = "src/app/api";
const STASH_DIR = ".api-export-stash";

async function main() {
  const hasApi = existsSync(API_DIR);
  if (hasApi) await rename(API_DIR, STASH_DIR);

  try {
    const result = spawnSync("next", ["build"], {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, GITHUB_PAGES: "true" },
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
