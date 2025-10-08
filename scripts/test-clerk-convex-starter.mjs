#!/usr/bin/env node
import { cp, mkdir, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const fixtureDir = path.join(repoRoot, "fixtures", "clerk-convex-base");
const workDir = path.join(repoRoot, ".tmp", "clerk-convex-starter");
const starterRegistryPath = path.join(
  repoRoot,
  "public",
  "r",
  "clerk-convex-starter.json",
);

async function main() {
  console.log("• Preparing temporary workspace…");
  await rm(workDir, { recursive: true, force: true });
  await mkdir(workDir, { recursive: true });
  await cp(fixtureDir, workDir, { recursive: true });

  run("pnpm", ["install", "--prefer-offline"], { cwd: workDir });

  console.log("• Applying Clerk + Convex starter block…");
  run("pnpm", ["dlx", "shadcn@latest", "add", "--yes", "--overwrite", starterRegistryPath], {
    cwd: workDir,
  });

  console.log("• Generating Convex client types…");
  run(
    "pnpm",
    ["dlx", "convex@latest", "codegen"],
    {
      cwd: workDir,
      env: {
        ...process.env,
        CONVEX_DEPLOYMENT: "https://example.convex.cloud",
      },
    },
  );

  console.log("• Running Convex typecheck…");
  run("pnpm", ["dlx", "convex@latest", "typecheck"], {
    cwd: workDir,
    env: {
      ...process.env,
      CONVEX_DEPLOYMENT: "https://example.convex.cloud",
    },
  });

  console.log("✓ Template smoke test passed.");
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    ...options,
  });
  if (result.status !== 0) {
    throw new Error(
      `Command failed: ${command} ${args.join(" ")} (exit code ${result.status})`,
    );
  }
}

main().catch((error) => {
  console.error("Template smoke test failed.");
  console.error(error.stack || error.message);
  process.exit(1);
});
