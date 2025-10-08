import { v } from 'convex/values'
import { query, mutation } from './_generated/server'

/**
 * Example query that requires authentication
 * Returns messages for the current user
 */
export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Not authenticated')
    }
    return await ctx.db
      .query('messages')
      .filter((q) => q.eq(q.field('author'), identity.email))
      .collect()
  },
})

/**
 * Example mutation to create a message
 */
export const send = mutation({
  args: { body: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Not authenticated')
    }
    await ctx.db.insert('messages', {
      body: args.body,
      author: identity.email ?? 'Anonymous',
      authorName: identity.name ?? 'Anonymous',
    })
  },
})

/**
 * Example query that doesn't require authentication
 * Returns all messages
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('messages').order('desc').take(100)
  },
})
