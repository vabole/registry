# Custom Component Registry

A custom [shadcn](https://ui.shadcn.com) registry for distributing React components and Next.js application templates. This registry provides ready-to-use templates featuring Clerk authentication, Convex backend integration, and more.

## What is this?

This is a **component registry**, not an application. It serves as a distribution system for:
- Complete Next.js starter templates
- Reusable React components
- Backend integration examples
- Authentication setups

Users can install these templates into their own projects using the `shadcn` CLI. A condensed installation walkthrough is
available in [`docs/quick-start.md`](docs/quick-start.md).

## Available Templates

### Clerk + Convex Core

The essentials for wiring Clerk authentication to a Convex backend:
- ✅ Convex schema, queries, and mutations
- ✅ Clerk middleware & Convex client provider
- ✅ Minimal landing page that keeps users in place until they sign in
- ✅ No Tailwind or shadcn dependencies—bring your own design system later

**Install the core (direct URL):**
```bash
pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-core.json
```

**Or via registry alias:**
```bash
pnpx shadcn add @vabole/clerk-convex-core
```

**What gets installed:**
- `app/layout.tsx` / `app/page.tsx` – minimal UI with inline styling
- `app/globals.css` – neutral base styles
- `components/convex-client-provider.tsx`
- `middleware.ts`
- `convex/` schema, functions, and `tsconfig.json`
- `.env.example` with Convex + Clerk variables

**Core setup steps:**
1. Create a [Clerk](https://clerk.com) application
2. Create a [Convex](https://convex.dev) deployment
3. Copy environment variables (`CLERK_JWT_ISSUER_DOMAIN`, `NEXT_PUBLIC_CONVEX_URL`, etc.)
4. Configure your Clerk JWT template with `{ "aud": "convex" }`
5. Run `pnpx convex dev` to sync schema, then `pnpm dev`

### Clerk + Convex Starter UI _(optional)_

Adds the polished landing page, Tailwind styling, and shadcn-inspired look on top of the core block:
- ✅ Marketing-friendly hero with feature highlights
- ✅ Tailwind-based dashboard with realtime message board
- ✅ Ready-to-use global theme tokens and animations

**Install after the core block:**
```bash
pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-starter.json

# or by name once the registry alias is configured
pnpx shadcn add @vabole/clerk-convex-starter
```

**What this layer overwrites:**
- `app/layout.tsx` to apply font variables and Tailwind classes
- `app/page.tsx` for the full landing/dashboard experience
- `app/globals.css` with Tailwind 4 tokens and utilities
- `postcss.config.mjs` for Tailwind processing

This block depends on `clerk-convex-core`; the shadcn CLI will prompt to overwrite files if you add it later. Tailwind-related packages (`tailwindcss`, `@tailwindcss/postcss`, `postcss`, `autoprefixer`, `tw-animate-css`) are added automatically.

## Using this Registry

### For End Users

Install templates from this registry into your Next.js project:

```bash
# Step 1: install the core block (direct URL)
pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-core.json

# Step 2: optionally add the UI layer
pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-starter.json

# After configuring the registry alias you can use short names
pnpx shadcn add @vabole/clerk-convex-core
pnpx shadcn add @vabole/clerk-convex-starter

# Quick one-liner for both blocks (interactive prompts)
pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-core.json \
  && pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-starter.json
```

### For Registry Maintainers

- Review [`docs/maintainer-guide.md`](docs/maintainer-guide.md) for the full project layout, release checklist, and testing
  steps.
- Helpful commands:
  ```bash
  pnpm install           # install dependencies
  pnpm dev               # run the marketing/showcase site locally
  pnpm registry:build    # regenerate public/r/*.json
  pnpm template:test     # smoke test Clerk + Convex templates
  ```

## How It Works

1. **Registry Site**: This Next.js app showcases available templates
2. **Registry Configuration**: `registry.json` defines all templates and their files
3. **Distribution**: When users run `pnpx shadcn add`, the CLI:
   - Fetches the registry configuration
   - Downloads specified template files
   - Installs dependencies
   - Places files in the correct locations

## Creating New Templates

1. Create a new directory in `registry/new-york/blocks/your-template/`
2. Add your template files
3. Update `registry.json` with a new entry:
```json
{
  "name": "your-template",
  "type": "registry:block",
  "title": "Your Template",
  "description": "Description of your template",
  "dependencies": ["package1", "package2"],
  "files": [
    {
      "path": "registry/new-york/blocks/your-template/file.tsx",
      "type": "registry:page",
      "target": "app/file.tsx"
    }
  ]
}
```
4. Run `pnpm run registry:build` to build the registry
5. Push to GitHub to deploy

## Documentation

- [Quick Start](docs/quick-start.md)
- [Maintainer Guide](docs/maintainer-guide.md)
- [shadcn Registry Documentation](https://ui.shadcn.com/docs/registry)
- [Clerk Documentation](https://clerk.com/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT
