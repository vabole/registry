'use client'

import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { useConvexAuth, useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FormEvent, useEffect, useMemo, useState } from 'react'

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const ensureUser = useMutation(api.users.ensure)
  const sendMessage = useMutation(api.messages.send)
  const { user } = useUser()
  const signedInName =
    user?.fullName ??
    user?.username ??
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    'your Clerk user'

  useEffect(() => {
    if (isAuthenticated) {
      void ensureUser({})
    }
  }, [ensureUser, isAuthenticated])

  const myMessages = useQuery(
    api.messages.getForCurrentUser,
    isAuthenticated ? {} : 'skip'
  )
  const recentMessages = useQuery(api.messages.list)

  const [messageText, setMessageText] = useState('')
  const canSend = useMemo(
    () => Boolean(messageText.trim()) && isAuthenticated,
    [messageText, isAuthenticated]
  )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSend) return
    await sendMessage({ body: messageText.trim() })
    setMessageText('')
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-12">
      <section className="rounded-3xl border bg-card px-6 py-12 shadow-sm sm:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <header className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Starter Template
            </p>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Launch faster with Clerk auth & Convex realtime data
              </h1>
              <p className="text-base text-muted-foreground">
                A minimal example that keeps you on the landing page until you choose
                to sign in. Connect Clerk and Convex, then build the rest of your app
                on top of a working authentication + backend loop.
              </p>
            </div>
          </header>

          <div className="flex flex-col gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90">
                  Sign in to try it
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex flex-col items-start gap-3">
                <p className="text-sm text-muted-foreground">
                  Signed in as{' '}
                  <span className="font-medium text-foreground">{signedInName}</span>
                </p>
                <div className="flex items-center gap-3">
                  <UserButton afterSignOutUrl="/" appearance={{ variables: { borderRadius: '0.75rem' } }} />
                  <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                    <button className="rounded-md border border-input px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted">
                      Sign out
                    </button>
                  </SignOutButton>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Keep users in context',
              body: 'Show a marketing-friendly landing page until they choose to authenticate with Clerk.',
            },
            {
              title: 'Realtime Convex data',
              body: 'Use authenticated queries and mutations out of the box, including a user record sync.',
            },
            {
              title: 'Clear next steps',
              body: 'Environment variable hints and links to both Clerk and Convex docs keep setup predictable.',
            },
          ].map((feature) => (
            <div key={feature.title} className="rounded-2xl border bg-muted/30 p-5">
              <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <SignedIn>
        <section className="rounded-3xl border bg-card p-6 shadow-sm">
          <ConvexConnectionState
            isLoading={isLoading}
            isAuthenticated={isAuthenticated}
          />
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border bg-card p-6 shadow-sm">
            <header className="mb-4 space-y-1">
              <h2 className="text-xl font-semibold">Create a message</h2>
              <p className="text-sm text-muted-foreground">
                This mutation writes to Convex using your authenticated user
                record.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="message">
                Message
              </label>
              <input
                id="message"
                type="text"
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                placeholder="Type a short note…"
                className="rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!canSend}
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Save to Convex
                </button>
              </div>
            </form>
          </article>

          <article className="rounded-xl border bg-card p-6 shadow-sm">
            <header className="mb-4 space-y-1">
              <h2 className="text-xl font-semibold">Your messages</h2>
              <p className="text-sm text-muted-foreground">
                These results come from the authenticated query{' '}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  messages.getForCurrentUser
                </code>
                .
              </p>
            </header>
            <MessageList
              emptyLabel="No personal messages yet. Create one above."
              messages={myMessages ?? []}
            />
          </article>

          <article className="rounded-xl border bg-card p-6 shadow-sm md:col-span-2">
            <header className="mb-4 space-y-1">
              <h2 className="text-xl font-semibold">Latest messages</h2>
              <p className="text-sm text-muted-foreground">
                Everyone signed in through Clerk can see this list update in
                realtime through Convex.
              </p>
            </header>
            <MessageList
              emptyLabel="No messages have been created yet."
              messages={recentMessages ?? []}
            />
          </article>
        </section>
      </SignedIn>
    </main>
  )
}

type ConvexAuthStateProps = {
  isAuthenticated: boolean
  isLoading: boolean
}

function ConvexConnectionState({ isAuthenticated, isLoading }: ConvexAuthStateProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
        Checking Convex session…
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
        Convex is waiting for a verified Clerk JWT. Confirm you have set{' '}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">CLERK_JWT_ISSUER_DOMAIN</code>{' '}
        and synced <code className="rounded bg-muted px-1 py-0.5 text-xs">convex/auth.config.js</code>{' '}
        with <code className="rounded bg-muted px-1 py-0.5 text-xs">pnpx convex dev</code>, and that your Clerk JWT template includes{' '}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">{`"aud": "convex"`}</code>.
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-emerald-500/10 p-4 text-sm font-medium text-emerald-900 dark:text-emerald-200">
      Convex is authenticated. Your Clerk account can now call queries and mutations.
    </div>
  )
}

type MessageListProps = {
  messages: Array<{
    _id: string
    body: string
    authorName?: string | null
  }>
  emptyLabel: string
}

function MessageList({ messages, emptyLabel }: MessageListProps) {
  if (messages.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>
  }

  return (
    <ul className="space-y-3">
      {messages.map((message) => (
        <li key={message._id} className="rounded-lg border bg-background p-3 shadow-sm">
          <p className="text-sm text-foreground">{message.body}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Posted by {message.authorName ?? 'Unknown user'}
          </p>
        </li>
      ))}
    </ul>
  )
}
