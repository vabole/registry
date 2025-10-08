import * as React from "react"

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <code className="text-sm bg-muted p-3 rounded-md block overflow-x-auto">{children}</code>
)

const List = ({ items }: { items: { key: string; content: React.ReactNode }[] }) => (
  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
    {items.map((item) => (
      <li key={item.key}>{item.content}</li>
    ))}
  </ul>
)

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-12">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Custom Registry</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          One command to launch Clerk + Convex
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Ship a landing page, authentication flow, and realtime Convex backend in a single shadcn install. Need more UI
          later? Pull components straight from <a className="underline hover:text-foreground" href="https://ui.shadcn.com" target="_blank" rel="noreferrer">ui.shadcn.com</a>.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        <article className="flex flex-col gap-4 rounded-3xl border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Clerk + Convex Starter</h2>
            <p className="text-sm text-muted-foreground">
              Installs the Convex backend wiring, Clerk auth hooks, and a Tailwind-powered landing experience in one go.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Install</h3>
            <CodeBlock>pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-starter.json</CodeBlock>
            <CodeBlock>pnpx shadcn add @vabole/clerk-convex-starter</CodeBlock>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Non-interactive</h3>
            <CodeBlock>pnpm dlx shadcn@latest add --yes --overwrite public/r/clerk-convex-starter.json</CodeBlock>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">What&apos;s included</h3>
            <List
              items={[
                { key: 'starter-landing', content: 'Hero section, dashboard UI, and realtime message board' },
                { key: 'starter-convex', content: 'Convex schema, queries, mutations, and project tsconfig' },
                { key: 'starter-provider', content: 'Convex + Clerk provider wrapper' },
                { key: 'starter-globals', content: 'Tailwind 4 tokens and animations in `app/globals.css`' },
                { key: 'starter-env', content: 'Environment scaffolding (`.env.example`, middleware, Convex config)' },
              ]}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Next steps</h3>
            <List
              items={[
                {
                  key: 'starter-accounts',
                  content: (
                    <>
                      Create apps in{' '}
                      <a className="underline hover:text-foreground" href="https://clerk.com" target="_blank" rel="noreferrer">
                        Clerk
                      </a>{' '}
                      and{' '}
                      <a className="underline hover:text-foreground" href="https://convex.dev" target="_blank" rel="noreferrer">
                        Convex
                      </a>
                    </>
                  ),
                },
                { key: 'starter-env-vars', content: 'Configure `CLERK_JWT_ISSUER_DOMAIN` & `NEXT_PUBLIC_CONVEX_URL`' },
                { key: 'starter-audience', content: 'Ensure your Clerk JWT template includes `{ "aud": "convex" }`' },
                { key: 'starter-sync', content: <code className="bg-muted px-1 py-0.5">pnpx convex dev</code> },
                { key: 'starter-dev', content: <code className="bg-muted px-1 py-0.5">pnpm dev</code> },
              ]}
            />
          </div>
        </article>

        <article className="flex flex-col gap-4 rounded-3xl border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Extend your UI</h2>
            <p className="text-sm text-muted-foreground">
              Keep things lean with the starter, then mix in components from the official shadcn registry as your product grows.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Grab components</h3>
            <CodeBlock>pnpx shadcn add button</CodeBlock>
            <CodeBlock>pnpx shadcn add card</CodeBlock>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Tips</h3>
            <List
              items={[
                { key: 'extend-consistency', content: 'Stick with the Tailwind tokens installed by the starter for a cohesive look.' },
                { key: 'extend-icons', content: 'Bring in icons via `pnpm add lucide-react` whenever you add icon-heavy components.' },
                { key: 'extend-replay', content: 'Re-run `pnpx shadcn add ... --overwrite` if you tweak templates and need updates.' },
              ]}
            />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Docs & Resources</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              key: 'docs-core',
              label: 'Convex × Clerk guide',
              href: 'https://docs.convex.dev/auth/clerk',
              description: 'Official Convex documentation for configuring Clerk issuers and JWT claims.',
            },
            {
              key: 'docs-ui',
              label: 'Clerk integration docs',
              href: 'https://clerk.com/docs/guides/development/integrations/databases/convex',
              description: 'Clerk’s walkthrough for wiring the App Router to Convex.',
            },
            {
              key: 'docs-repo',
              label: 'Repository',
              href: 'https://github.com/vabole/registry',
              description: 'Browse source, smoke tests, and contribution guide.',
            },
            {
              key: 'docs-smoketest',
              label: 'Smoke test command',
              href: 'https://github.com/vabole/registry#development',
              description: 'Run `pnpm template:test` locally to validate the starter install end-to-end.',
            },
          ].map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border bg-muted/30 p-4 transition hover:border-primary hover:bg-muted"
            >
              <p className="text-sm font-semibold text-foreground group-hover:text-primary">{link.label}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{link.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
