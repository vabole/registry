import { mutation } from './_generated/server'

export const ensure = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }

    const userData = {
      clerkId: identity.subject,
      email: identity.email ?? undefined,
      name: identity.name ?? undefined,
      imageUrl: identity.pictureUrl ?? undefined,
    }

    const existing = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .unique()

    if (!existing) {
      await ctx.db.insert('users', userData)
      return
    }

    await ctx.db.patch(existing._id, userData)
  },
})
