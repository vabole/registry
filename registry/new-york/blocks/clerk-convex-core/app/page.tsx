'use client'

import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FormEvent, useEffect, useMemo, useState, type CSSProperties } from 'react'

const containerStyle: CSSProperties = {
  maxWidth: '720px',
  margin: '0 auto',
  padding: '3rem 1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
}

const cardStyle: CSSProperties = {
  borderRadius: '18px',
  border: '1px solid rgba(17, 17, 17, 0.08)',
  backgroundColor: '#fff',
  padding: '1.75rem',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
}

const headingStyle: CSSProperties = {
  margin: 0,
  fontSize: '1.75rem',
  fontWeight: 700,
  lineHeight: 1.25,
}

const mutedStyle: CSSProperties = {
  margin: '0.75rem 0 0',
  color: '#555',
  lineHeight: 1.6,
}

const buttonStyle: CSSProperties = {
  borderRadius: '9999px',
  border: 'none',
  backgroundColor: '#111',
  color: '#fff',
  padding: '0.6rem 1.25rem',
  fontSize: '0.95rem',
  fontWeight: 600,
  cursor: 'pointer',
}

const secondaryButtonStyle: CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#fff',
  color: '#111',
  border: '1px solid rgba(17, 17, 17, 0.1)',
}

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const ensureUser = useMutation(api.users.ensure)
  const sendMessage = useMutation(api.messages.send)
  const { user } = useUser()

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

  const signedInName =
    user?.fullName ??
    user?.primaryEmailAddress?.emailAddress ??
    user?.username ??
    user?.emailAddresses?.[0]?.emailAddress ??
    'your Clerk user'

  return (
    <main style={containerStyle}>
      <section style={cardStyle}>
        <h1 style={headingStyle}>Clerk + Convex Core</h1>
        <p style={mutedStyle}>
          This minimal setup keeps a friendly landing experience while wiring Clerk
          authentication to a Convex backend. Sign in to create and view realtime
          messages. Add your own UI framework later — the authentication and data
          plumbing is already ready.
        </p>

        <SignedOut>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <SignInButton mode="modal">
              <button type="button" style={buttonStyle}>
                Sign in
              </button>
            </SignInButton>
            <span style={{ color: '#555', fontSize: '0.9rem' }}>
              We&apos;ll keep you on this page until you decide to authenticate.
            </span>
          </div>
        </SignedOut>

        <SignedIn>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              Signed in as <strong>{signedInName}</strong>
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <UserButton afterSignOutUrl="/" />
              <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                <button type="button" style={secondaryButtonStyle}>
                  Sign out
                </button>
              </SignOutButton>
            </div>
          </div>
        </SignedIn>
      </section>

      <SignedIn>
        <ConvexConnectionState
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />

        <section style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <header>
            <h2 style={{ ...headingStyle, fontSize: '1.35rem' }}>Create a message</h2>
            <p style={mutedStyle}>
              This mutation writes to Convex using your authenticated Clerk identity.
            </p>
          </header>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label htmlFor="message" style={{ fontWeight: 600 }}>
              Message
            </label>
            <input
              id="message"
              type="text"
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              placeholder="Type something..."
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '1px solid rgba(17, 17, 17, 0.12)',
                fontSize: '0.95rem',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={!canSend}
                style={{
                  ...buttonStyle,
                  opacity: canSend ? 1 : 0.5,
                  cursor: canSend ? 'pointer' : 'not-allowed',
                }}
              >
                Save to Convex
              </button>
            </div>
          </form>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <article style={cardStyle}>
            <header>
              <h2 style={{ ...headingStyle, fontSize: '1.35rem' }}>Your messages</h2>
              <p style={mutedStyle}>
                These results come from the authenticated query{' '}
                <code>messages.getForCurrentUser</code>.
              </p>
            </header>
            <MessageList
              emptyLabel="No personal messages yet. Create one above."
              messages={myMessages ?? []}
            />
          </article>

          <article style={cardStyle}>
            <header>
              <h2 style={{ ...headingStyle, fontSize: '1.35rem' }}>Latest messages</h2>
              <p style={mutedStyle}>
                Everyone signed in through Clerk can see this list update in realtime.
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
      <section style={{ ...cardStyle, backgroundColor: '#111', color: '#fff' }}>
        <p style={{ margin: 0 }}>Checking Convex session…</p>
      </section>
    )
  }

  if (!isAuthenticated) {
    return (
      <section style={cardStyle}>
        <p style={{ ...mutedStyle, margin: 0 }}>
          Convex is waiting for a verified Clerk JWT. Confirm you have set{' '}
          <code>CLERK_JWT_ISSUER_DOMAIN</code>, synced <code>convex/auth.config.js</code> with{' '}
          <code>pnpx convex dev</code>, and configured your Clerk JWT template with{' '}
          <code>{`"aud": "convex"`}</code>.
        </p>
      </section>
    )
  }

  return (
    <section style={{ ...cardStyle, borderColor: 'rgba(12, 131, 91, 0.2)', backgroundColor: '#d3f9e2' }}>
      <p style={{ margin: 0, color: '#0c835b', fontWeight: 600 }}>
        Convex is authenticated. Your Clerk account can now call queries and mutations.
      </p>
    </section>
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
    return <p style={mutedStyle}>{emptyLabel}</p>
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {messages.map((message) => (
        <li
          key={message._id}
          style={{
            padding: '0.9rem 1rem',
            borderRadius: '14px',
            border: '1px solid rgba(17, 17, 17, 0.08)',
            backgroundColor: '#faf9f8',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.95rem' }}>{message.body}</p>
          <p style={{ margin: '0.45rem 0 0', color: '#666', fontSize: '0.75rem' }}>
            Posted by {message.authorName ?? 'Unknown user'}
          </p>
        </li>
      ))}
    </ul>
  )
}
