# Repository Guidelines

## Project Structure & Module Organization
- `registry/new-york/blocks/` contains exportable shadcn blocks. The core Clerk/Convex logic lives in `clerk-convex-core/`; optional Tailwind/shadcn UI overrides reside in `clerk-convex-starter/`. Legacy demos (e.g., `clerk-quickstart/`) remain for reference.
- `public/r/*.json` are generated registry items published to consumers. Regenerate with `pnpm template:test` or `pnpm run registry:build` after edits.
- `app/` renders the Vercel-hosted showcase. Update `app/page.tsx` when announcing new blocks.
- `scripts/test-clerk-convex-starter.mjs` provides an automated smoke test that installs core + UI blocks in a temp app and runs Convex codegen/typecheck.

## Build, Test, and Development Commands
- `pnpm dev` – Serve the showcase site locally.
- `pnpm template:test` – Install core and UI blocks into a throwaway workspace, run `convex codegen` twice, and typecheck both installs.
- `pnpm run registry:build` – Regenerate `public/r/*.json` from the block sources.
- `pnpm dlx shadcn@latest add --yes --overwrite [...]` – Useful for one-off validation; see README for command combos.

## Coding Style & Naming Conventions
- TypeScript/Next.js project using ESLint 9.x. Adhere to the default Next lint rules (no unused vars, JSX keys, etc.).
- Prefer functional components with explicit props typing. Use tailwind classes only inside the UI block; keep core block styles inline or minimal CSS.
- Registry file paths must match target install paths exactly (e.g., `"target": "app/page.tsx"`).

## Testing Guidelines
- No unit test framework is configured. Rely on the smoke test (`pnpm template:test`) to validate installs and Convex typings.
- Ensure Convex type generation succeeds without touching the network (sandbox-friendly). If you enhance tests, document the new commands here.

## Commit & Pull Request Guidelines
- Follow conventional, descriptive commits (`feat:`, `fix:`, `docs:` appear in history). Group related file updates together.
- Pull requests should summarize the block(s) touched, mention regenerated `public/r/*.json`, and include verification steps (e.g., “Ran `pnpm template:test`”).
- Provide screenshots when altering the showcase UI (`app/page.tsx`) so reviewers can confirm visual changes.
