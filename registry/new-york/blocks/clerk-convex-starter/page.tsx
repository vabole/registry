'use client'

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useConvexAuth, useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FormEvent, useEffect, useMemo, useState } from 'react'

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const ensureUser = useMutation(api.users.ensure)
  const sendMessage = useMutation(api.messages.send)

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
    <main className="max-w-4xl mx-auto flex flex-col min-h-svh px-4 py-12 gap-10">
      <section className="rounded-xl border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Clerk + Convex Starter
            </h1>
            <p className="text-muted-foreground">
              Authenticate with Clerk and create realtime data with Convex. This
              starter keeps the UI minimal so you can focus on wiring the two
              services together.
            </p>
          </header>

          <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Authentication
              </p>
              <SignedIn>
                <p className="text-sm">You are signed in with Clerk.</p>
              </SignedIn>
              <SignedOut>
                <p className="text-sm">
                  Use the button to create an account or sign in.
                </p>
              </SignedOut>
            </div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          <SignedIn>
            <ConvexConnectionState
              isLoading={isLoading}
              isAuthenticated={isAuthenticated}
            />
          </SignedIn>
        </div>
      </section>

      <SignedIn>
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
        <code className="rounded bg-muted px-1 py-0.5 text-xs">CLERK_FRONTEND_API_URL</code>{' '}
        and synced <code className="rounded bg-muted px-1 py-0.5 text-xs">convex/auth.config.js</code>{' '}
        with <code className="rounded bg-muted px-1 py-0.5 text-xs">pnpx convex dev</code>.
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
          <p className="text-sm">{message.body}</p>
          {message.authorName && (
            <p className="mt-2 text-xs text-muted-foreground">
              Posted by {message.authorName}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}
