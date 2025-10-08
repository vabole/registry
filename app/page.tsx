'use client'

import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useState } from 'react'

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Clerk + Convex Starter</h1>
        <p className="text-muted-foreground">
          A Next.js template with Clerk authentication and Convex backend
        </p>
      </header>

      <AuthLoading>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </AuthLoading>

      <Unauthenticated>
        <main className="flex flex-col flex-1 items-center justify-center gap-4">
          <h2 className="text-2xl font-semibold">Welcome!</h2>
          <p className="text-muted-foreground">Sign in to get started</p>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Sign In
            </button>
          </SignInButton>
        </main>
      </Unauthenticated>

      <Authenticated>
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <UserButton />
        </div>
        <Content />
      </Authenticated>
    </div>
  )
}

function Content() {
  const messages = useQuery(api.messages.list)
  const userMessages = useQuery(api.messages.getForCurrentUser)
  const sendMessage = useMutation(api.messages.send)
  const [messageText, setMessageText] = useState('')

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim()) return
    await sendMessage({ body: messageText })
    setMessageText('')
  }

  return (
    <main className="flex flex-col flex-1 gap-8">
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Your Messages ({userMessages?.length ?? 0})</h3>
        <form onSubmit={handleSend} className="flex gap-2 mb-4">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Send
          </button>
        </form>
        <div className="space-y-2">
          {userMessages?.map((msg: any) => (
            <div key={msg._id} className="p-3 bg-muted rounded-md">
              <p className="text-sm">{msg.body}</p>
              <p className="text-xs text-muted-foreground mt-1">By: {msg.authorName}</p>
            </div>
          ))}
          {userMessages?.length === 0 && (
            <p className="text-sm text-muted-foreground">No messages yet. Send one above!</p>
          )}
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">All Messages ({messages?.length ?? 0})</h3>
        <div className="space-y-2">
          {messages?.map((msg: any) => (
            <div key={msg._id} className="p-3 bg-muted rounded-md">
              <p className="text-sm">{msg.body}</p>
              <p className="text-xs text-muted-foreground mt-1">By: {msg.authorName}</p>
            </div>
          ))}
          {messages?.length === 0 && (
            <p className="text-sm text-muted-foreground">No messages yet.</p>
          )}
        </div>
      </div>
    </main>
  )
}
