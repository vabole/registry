import * as React from "react"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Clerk + Convex Registry</h1>
        <p className="text-muted-foreground">
          A custom registry providing Clerk authentication and Convex backend templates for Next.js
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg p-6">
          <h2 className="text-2xl font-semibold">Clerk + Convex Starter</h2>
          <p className="text-muted-foreground">
            A complete Next.js starter template with Clerk authentication and Convex backend.
            Includes authentication UI, real-time database, and example queries/mutations.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <h3 className="font-semibold">Installation</h3>
            <code className="text-sm bg-muted p-3 rounded-md">
              npx shadcn add https://registry.vabole.com clerk-convex-starter
            </code>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <h3 className="font-semibold">What's Included</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Clerk authentication with sign-in/sign-up</li>
              <li>Convex backend integration</li>
              <li>ConvexProvider wrapper component</li>
              <li>Example database schema and queries</li>
              <li>Middleware for route protection</li>
              <li>Example dashboard with real-time updates</li>
            </ul>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <h3 className="font-semibold">Required Setup</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Create a Clerk account and application</li>
              <li>Create a Convex deployment</li>
              <li>Configure environment variables</li>
              <li>Run <code className="bg-muted px-1">npx convex dev</code> to deploy functions</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>
            For detailed setup instructions, see the{" "}
            <a
              href="https://github.com/vabole/registry"
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  )
}
