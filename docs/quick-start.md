# Quick Start

Use this guide if you want to install the templates from this registry into your own Next.js project.

## Prerequisites

- Node.js 18 or newer
- pnpm 9 or npm 10 (examples below use pnpm)
- An existing Next.js App Router project that has been initialised with `pnpx shadcn init`
- Accounts for [Clerk](https://clerk.com) and [Convex](https://convex.dev)

## 1. Install the Clerk + Convex core block

The core block wires Clerk authentication to a Convex backend with minimal UI.

```bash
pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-core.json
```

After the CLI finishes, create the required Convex deployment and Clerk application, then copy the environment variables into `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=
NEXT_PUBLIC_CONVEX_URL=
```

> Configure your Clerk JWT template with `{ "aud": "convex" }` so Convex can validate tokens.

## 2. (Optional) Layer on the Starter UI

The optional starter block adds the Tailwind-powered landing page and dashboard experience. Install it after the core block.

```bash
pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-starter.json
```

The CLI will prompt before overwriting files such as `app/layout.tsx`, `app/page.tsx`, and `app/globals.css`. Accept the overwrites to enable the full experience.

## 3. Install dependencies and run the app

```bash
pnpm install
pnpm dlx convex@latest dev   # first terminal – sync Convex schema
pnpm dev                      # second terminal – run Next.js locally
```

Visit `http://localhost:3000` to view the starter UI. Use the Convex dashboard to seed data or invite additional users.

## 4. Repeat installs with the registry alias (optional)

Add the hosted registry to your project's `components.json` to make subsequent installs easier:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "registries": {
    "@vabole": "https://registry-pi-black.vercel.app/r/{name}.json"
  }
}
```

Now you can install by name:

```bash
pnpx shadcn add @vabole/clerk-convex-core
pnpx shadcn add @vabole/clerk-convex-starter
```

## 5. Troubleshooting

- Re-run `pnpx shadcn add ... --overwrite` if files get out of sync.
- Make sure both Convex and Next.js servers are running; the dashboard relies on realtime Convex queries.
- If Tailwind styles do not apply, verify that `postcss.config.mjs` and `app/globals.css` were overwritten by the starter block.

Happy building! 🚀
