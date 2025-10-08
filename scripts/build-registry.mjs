#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const registryPath = path.join(repoRoot, "registry.json");
const outputDir = path.join(repoRoot, "public", "r");

const registry = JSON.parse(await readFile(registryPath, "utf8"));

await mkdir(outputDir, { recursive: true });

const items = [];

for (const item of registry.items) {
  const enriched = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
  };

  if (Array.isArray(item.files)) {
    enriched.files = [];
    for (const file of item.files) {
      const content = await readFile(path.join(repoRoot, file.path), "utf8");
      enriched.files.push({
        ...file,
        content,
      });
    }
  }

  const itemPath = path.join(outputDir, `${item.name}.json`);
  await writeFile(itemPath, JSON.stringify(enriched, null, 2) + "\n", "utf8");

  items.push(enriched);
}

const aggregated = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: registry.name,
  homepage: registry.homepage,
  items,
};

await writeFile(
  path.join(outputDir, "registry.json"),
  JSON.stringify(aggregated, null, 2) + "\n",
  "utf8",
);
