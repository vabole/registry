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

### Clerk + Convex Starter

One command wires Clerk authentication, Convex backend access, and a polished landing page with realtime messaging.
- ✅ Convex schema, queries, and mutations
- ✅ Clerk middleware, Convex client provider, and environment scaffolding
- ✅ Tailwind 4 styling with hero, dashboard, and message board UI

**Install (direct URL):**
```bash
pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-starter.json
```

**Or via registry alias:**
```bash
pnpx shadcn add @vabole/clerk-convex-starter
```

**What gets installed:**
- `app/layout.tsx` / `app/page.tsx` – full landing + dashboard experience
- `app/globals.css` – Tailwind tokens and utilities
- `components/convex-client-provider.tsx`
- `convex/` schema, functions, and `tsconfig.json`
- `middleware.ts`
- `.env.example` with Convex + Clerk variables
- `postcss.config.mjs` for Tailwind processing

**Getting started:**
1. Create a [Clerk](https://clerk.com) application
2. Create a [Convex](https://convex.dev) deployment
3. Copy environment variables (`CLERK_JWT_ISSUER_DOMAIN`, `NEXT_PUBLIC_CONVEX_URL`, etc.) into `.env.local`
4. Configure your Clerk JWT template with `{ "aud": "convex" }`
5. Run `pnpx convex dev` to sync the schema, then `pnpm dev` to start Next.js

Want more UI components afterwards? Browse [ui.shadcn.com](https://ui.shadcn.com) and install directly into the same project.

## Using this Registry

### For End Users

Install templates from this registry into your Next.js project:

```bash
# Direct URL
pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-starter.json

# Registry alias (after you add this registry)
pnpx shadcn add @vabole/clerk-convex-starter
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
