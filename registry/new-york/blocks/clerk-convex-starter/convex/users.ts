import { mutation } from './_generated/server'

export const ensure = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }

    const nameFromIdentity = identity.name?.trim()
    const composedName = [identity.givenName, identity.familyName]
      .filter((part): part is string => Boolean(part?.trim()))
      .join(' ')
      .trim()
    const fallbackName = identity.email ?? identity.subject
    const displayName = nameFromIdentity || composedName || fallbackName

    const userData = {
      clerkId: identity.subject,
      email: identity.email ?? undefined,
      name: displayName,
      imageUrl: identity.pictureUrl ?? undefined,
    }

    const existing = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()

    if (!existing) {
      await ctx.db.insert('users', userData)
      return
    }

    await ctx.db.patch(existing._id, userData)
  },
})
