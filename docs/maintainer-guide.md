# Maintainer Guide

Use this reference when you are updating the registry or adding new templates.

## Project layout

```
├── app/                      # Marketing + docs site (not shipped via registry)
├── registry/
│   └── new-york/
│       └── blocks/           # Source files for each registry item
│           ├── clerk-convex-starter/
│           └── ...
├── public/r/                 # Generated JSON files consumed by the shadcn CLI
├── registry.json             # Registry configuration
└── scripts/                  # Local smoke tests
```

Keep source files under `registry/new-york/blocks/<block-name>/`. The `public/r/` directory is generated; do not edit those JSON files by hand.

## Common scripts

| Command | Description |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Run the marketing/showcase site locally |
| `pnpm registry:build` | Build the JSON files under `public/r/` |
| `pnpm template:test` | Spin up a throwaway Next.js app, install the Clerk + Convex stack, and run Convex typecheck |
| `node scripts/build-registry.mjs` | Offline-friendly build of `public/r/` (mirrors `shadcn build`) |

## Release checklist

1. `pnpm install`
2. `pnpm registry:build`
3. `pnpm template:test`
4. Commit the source changes **and** the generated `public/r/*.json`
5. Push to the deployment branch (Vercel picks up `main` automatically)

## Adding or updating a block

1. **Create the source directory** in `registry/new-york/blocks/<your-block>/` and add files.
2. **Reference those files** from `registry.json` using the appropriate `type` and optional `target`. Example snippet:
   ```json
   {
     "name": "clerk-convex-starter",
     "type": "registry:block",
     "title": "Clerk + Convex Starter",
     "description": "One-step Clerk authentication and Convex backend setup with a polished landing experience.",
     "files": [
       {
         "path": "registry/new-york/blocks/clerk-convex-starter/app/page.tsx",
         "type": "registry:page",
         "target": "app/page.tsx"
       }
     ],
     "envVars": {
       "CLERK_JWT_ISSUER_DOMAIN": "https://your-app.clerk.accounts.dev"
     }
   }
   ```
3. **Document dependencies** in the `dependencies`, `devDependencies`, or `registryDependencies` arrays when the block requires additional npm packages or other registry items.
4. **Run `pnpm registry:build`** to regenerate JSON outputs.
5. **Manually verify** the generated files by opening `public/r/<block-name>.json` or loading `http://localhost:3000/r/<block-name>.json` while running the dev server.

## Testing changes

- `pnpm template:test` ensures the combined Clerk + Convex templates install and pass Convex type checking.
- For new blocks, create a temporary Next.js project and install via `pnpx shadcn add file://.../public/r/<block>.json` to confirm the CLI flow and file targets.

## Documentation updates

- Update [`docs/quick-start.md`](./quick-start.md) if installation steps change.
- Summarise major template updates in `README.md` so end users know what is available.

## Deployment

This repository is deployed to Vercel. Pushing to `main` triggers a new build and publishes the registry under `https://registry-pi-black.vercel.app`. JSON files are served from `/r/<name>.json`.
