# Custom Component Registry

A custom [shadcn](https://ui.shadcn.com) registry for distributing React components and Next.js application templates. This registry provides ready-to-use templates featuring Clerk authentication, Convex backend integration, and more.

## What is this?

This is a **component registry**, not an application. It serves as a distribution system for:
- Complete Next.js starter templates
- Reusable React components
- Backend integration examples
- Authentication setups

Users can install these templates into their own projects using the `shadcn` CLI.

## Available Templates

### Clerk + Convex Starter

A complete Next.js application template with:
- ✅ Clerk authentication (sign-in/sign-up)
- ✅ Convex backend with real-time database
- ✅ Example queries and mutations
- ✅ Middleware for route protection
- ✅ TypeScript + Tailwind CSS

**Installation (Direct URL):**
```bash
pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-starter.json
```

**Or configure as a registry in your `components.json`:**
```json
{
  "registries": {
    "@vabole": "https://registry-pi-black.vercel.app/r/{name}.json"
  }
}
```
Then install with:
```bash
pnpx shadcn add @vabole/clerk-convex-starter
```

**What gets installed:**
- `app/layout.tsx` - Root layout with Clerk and Convex providers
- `app/page.tsx` - Dashboard with authentication UI
- `middleware.ts` - Clerk route protection
- `components/convex-client-provider.tsx` - Convex provider wrapper
- `convex/` - Database schema and example functions

**Setup required after installation:**
1. Create a [Clerk](https://clerk.com) account and application
2. Create a [Convex](https://convex.dev) deployment
3. Configure environment variables (see template's `.env.example`)
4. Run `pnpx convex dev` to deploy Convex functions
5. Run `pnpm dev` to start your app

For detailed setup instructions, see the [Clerk + Convex integration guide](https://clerk.com/docs/guides/development/integrations/databases/convex).

## Using this Registry

### For End Users

Install templates from this registry into your Next.js project:

```bash
# Method 1: Direct URL to JSON file (recommended)
pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-starter.json

# Method 2: After configuring registry (see below)
pnpx shadcn add @vabole/clerk-convex-starter
```

### For Registry Maintainers

This registry is built using the official shadcn registry template.

**Project Structure:**
```
├── app/                      # Showcase website (not distributed)
├── registry/
│   └── new-york/
│       └── blocks/
│           └── clerk-convex-starter/  # Template files
│               ├── layout.tsx
│               ├── page.tsx
│               ├── middleware.ts
│               ├── convex-client-provider.tsx
│               └── convex/
└── registry.json             # Registry configuration
```

**Development:**
```bash
# Install dependencies
pnpm install

# Run dev server (showcase site)
pnpm dev

# Smoke test the Clerk + Convex template
pnpm template:test

# Build the registry
pnpm run registry:build

# Deploy to Vercel
git push origin main
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

- [shadcn Registry Documentation](https://ui.shadcn.com/docs/registry)
- [Clerk Documentation](https://clerk.com/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT
