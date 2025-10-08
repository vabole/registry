import { v } from 'convex/values'
import { query, mutation } from './_generated/server'

export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }

    return await ctx.db
      .query('messages')
      .withIndex('by_authorId', (q) => q.eq('authorId', identity.subject))
      .order('desc')
      .take(100)
  },
})

export const send = mutation({
  args: { body: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }

    const userRecord = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()

    await ctx.db.insert('messages', {
      body: args.body,
      authorId: identity.subject,
      authorName: userRecord?.name ?? identity.name ?? 'Anonymous',
    })
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('messages').order('desc').take(100)
  },
})
