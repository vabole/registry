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
          Clerk + Convex templates you can compose like Lego
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Start with a minimal Convex + Clerk integration, then layer on the Tailwind/shadcn UI when you&apos;re ready.
          Each block installs through the shadcn CLI, so you can mix, match, and automate without leaving your terminal.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="flex flex-col gap-4 rounded-3xl border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Clerk + Convex Core</h2>
            <p className="text-sm text-muted-foreground">
              Everything you need to wire Clerk authentication to a Convex backend. Inline styling keeps it framework-agnostic.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Install</h3>
            <CodeBlock>pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-core.json</CodeBlock>
            <CodeBlock>pnpx shadcn add @vabole/clerk-convex-core</CodeBlock>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">What&apos;s included</h3>
            <List
              items={[
                { key: 'core-landing', content: 'Minimal landing page that keeps users in place until sign-in' },
                { key: 'core-convex', content: 'Convex schema, queries, mutations, and middleware' },
                { key: 'core-provider', content: 'Convex + Clerk provider wrapper' },
                { key: 'core-globals', content: 'Neutral base styles in `app/globals.css`' },
                { key: 'core-env', content: 'Environment variable hints for Clerk + Convex' },
              ]}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Next steps</h3>
            <List
              items={[
                {
                  key: 'core-accounts',
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
                { key: 'core-env-vars', content: 'Configure `CLERK_JWT_ISSUER_DOMAIN` & `NEXT_PUBLIC_CONVEX_URL`' },
                { key: 'core-audience', content: 'Ensure your Clerk JWT template includes `{ "aud": "convex" }`' },
                { key: 'core-sync', content: <code className="bg-muted px-1 py-0.5">pnpx convex dev</code> },
                { key: 'core-dev', content: <code className="bg-muted px-1 py-0.5">pnpm dev</code> },
              ]}
            />
          </div>
        </article>

        <article className="flex flex-col gap-4 rounded-3xl border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Starter UI Layer</h2>
            <p className="text-sm text-muted-foreground">
              Adds Tailwind 4 tokens, shadcn-inspired components, and a landing + dashboard experience on top of the core block.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Install (after core)</h3>
            <CodeBlock>pnpx shadcn add https://registry-pi-black.vercel.app/r/clerk-convex-starter.json</CodeBlock>
            <CodeBlock>pnpx shadcn add @vabole/clerk-convex-starter</CodeBlock>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">What this layer replaces</h3>
            <List
              items={[
                { key: 'ui-layout', content: '`app/layout.tsx` to apply Geist fonts + Tailwind classes' },
                { key: 'ui-page', content: '`app/page.tsx` with the marketing hero and dashboard UI' },
                { key: 'ui-globals', content: '`app/globals.css` (Tailwind theme tokens + animations)' },
                { key: 'ui-postcss', content: '`postcss.config.mjs` for Tailwind processing' },
              ]}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Non-interactive install</h3>
            <CodeBlock>pnpm dlx shadcn@latest add --yes --overwrite public/r/clerk-convex-core.json</CodeBlock>
            <CodeBlock>pnpm dlx shadcn@latest add --yes --overwrite public/r/clerk-convex-starter.json</CodeBlock>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Docs & Resources</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              key: 'docs-core',
              label: 'Clerk + Convex core docs',
              href: 'https://docs.convex.dev/auth/clerk',
              description: 'Official Convex guide for configuring Clerk issuers and JWT claims.',
            },
            {
              key: 'docs-ui',
              label: 'Clerk + Convex starter UI docs',
              href: 'https://clerk.com/docs/guides/development/integrations/databases/convex',
              description: 'Clerk’s walkthrough for wiring the App Router + Convex.',
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
              description: 'Run `pnpm template:test` locally to validate both blocks end-to-end.',
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
