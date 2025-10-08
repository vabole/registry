# Clerk + Convex Starter Template

A production-ready Next.js template with Clerk authentication and Convex backend. This template provides a complete setup for building modern web applications with user authentication, real-time data synchronization, and a scalable backend.

## Features

- ✅ **Clerk Authentication** - Complete user authentication with sign-in, sign-up, and user management
- ✅ **Convex Backend** - Real-time database, file storage, and serverless functions
- ✅ **Next.js 15** - Latest Next.js with App Router
- ✅ **TypeScript** - Full TypeScript support
- ✅ **Tailwind CSS v4** - Modern styling with Tailwind CSS
- ✅ **Example Components** - Pre-built components demonstrating auth and data fetching

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- A [Clerk](https://clerk.com) account
- A [Convex](https://convex.dev) account

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd registry-template
pnpm install
```

### 2. Set Up Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy your **Publishable Key** and **Secret Key**
4. Navigate to **JWT Templates** in the sidebar
5. Click **New template** → Select **Convex**
6. Copy the **Issuer** URL (your Frontend API URL)

### 3. Set Up Convex

1. Go to [Convex Dashboard](https://dashboard.convex.dev)
2. Create a new project
3. Copy your **Deployment URL**
4. Copy your **Deploy Key** from Settings

### 4. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_FRONTEND_API_URL=https://your-app.clerk.accounts.dev

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOY_KEY=your-deploy-key
```

### 5. Deploy Convex Schema

Run Convex in development mode to sync your schema and functions:

```bash
npx convex dev
```

This will:
- Deploy your Convex functions
- Create your database tables
- Set up authentication with Clerk

### 6. Run the Development Server

In a new terminal, start the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Home page with auth UI
├── components/
│   └── convex-client-provider.tsx  # Convex provider wrapper
├── convex/
│   ├── auth.config.js      # Clerk integration config
│   ├── schema.ts           # Database schema
│   └── messages.ts         # Example queries and mutations
├── middleware.ts           # Clerk middleware for route protection
└── .env.example            # Environment variables template
```

## How It Works

### Authentication Flow

1. **ClerkProvider** wraps the app and provides authentication context
2. **ConvexProviderWithClerk** connects Convex with Clerk's auth state
3. **middleware.ts** protects routes that require authentication
4. Components use Convex's `<Authenticated>` and `<Unauthenticated>` components

### Database Queries

```typescript
// In your components
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

// Fetch data
const messages = useQuery(api.messages.list)

// Create data
const sendMessage = useMutation(api.messages.send)
await sendMessage({ body: 'Hello!' })
```

### Server Functions

```typescript
// convex/messages.ts
import { query, mutation } from './_generated/server'

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Get authenticated user
    const identity = await ctx.auth.getUserIdentity()

    // Query database
    return await ctx.db.query('messages').collect()
  },
})
```

## Deployment

### Prerequisites for Deployment

Before deploying to Vercel, you need production credentials:

1. **Clerk Production Keys:**
   - Go to your Clerk Dashboard
   - Switch to Production mode
   - Copy your production Publishable Key and Secret Key
   - Copy your production Frontend API URL (issuer domain)

2. **Convex Production Deployment:**
   - In your Convex Dashboard, create a production deployment
   - Copy your production Deployment URL
   - Copy your Deploy Key from Settings → Deploy Keys

### Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables:**

   Add these environment variables in Vercel (Project Settings → Environment Variables):

   ```env
   # Clerk (Production)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   CLERK_FRONTEND_API_URL=https://clerk.your-domain.com

   # Convex (Production)
   NEXT_PUBLIC_CONVEX_URL=https://your-production.convex.cloud
   CONVEX_DEPLOY_KEY=prod:...
   ```

   **Important:** Make sure to set these for **Production** environment in Vercel.

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically run `pnpm build` which:
     - Deploys your Convex functions
     - Generates Convex types
     - Builds your Next.js app

5. **Verify:**
   - Visit your deployed URL
   - Test sign-in/sign-up functionality
   - Verify Convex real-time updates work

### Redeploy After Changes

After making changes to your code:

```bash
# Commit your changes
git add .
git commit -m "Your changes"
git push

# Vercel will automatically redeploy
```

For Convex-only changes (functions, schema):
```bash
npx convex deploy
```

## Documentation

- [Clerk Documentation](https://clerk.com/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk + Convex Integration Guide](https://clerk.com/docs/guides/development/integrations/databases/convex)

## Support

For issues and questions:
- [Clerk Support](https://clerk.com/support)
- [Convex Discord](https://convex.dev/community)
- [GitHub Issues](https://github.com/your-repo/issues)
