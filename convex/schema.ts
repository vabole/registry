import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }).index('by_clerkId', ['clerkId']),
  messages: defineTable({
    body: v.string(),
    authorId: v.string(),
    authorName: v.optional(v.string()),
  })
    .index('by_authorId', ['authorId'])
    .index('by_creationTime', ['_creationTime']),
})
