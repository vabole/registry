# Custom Registry Guide

## ✅ Your Registry is Ready!

You've successfully created a custom shadcn registry with your Clerk quickstart template.

## 📁 What You Have

### Source Files Structure
```
registry/new-york/blocks/clerk-quickstart/
├── components/
│   ├── clerk-provider.tsx
│   ├── header.tsx
│   └── theme-provider.tsx
├── layouts/
│   └── layout-with-header.tsx
├── pages/
│   ├── sign-in-page.tsx
│   └── sign-up-page.tsx
└── files/
    └── middleware.ts
```

### Built Registry Files
```
public/r/
├── clerk-quickstart.json  ← Your custom component!
├── hello-world.json
├── example-form.json
├── complex-component.json
├── example-with-css.json
└── registry.json         ← Registry index
```

---

## 🧪 Testing Your Registry Locally

### Method 1: Using the Development Server

1. **Start the Next.js dev server:**
```bash
npm run dev
# or
pnpm dev
```

2. **Access your registry:**
- Index: http://localhost:3000/r/registry.json
- Your component: http://localhost:3000/r/clerk-quickstart.json

3. **Test with shadcn CLI:**
```bash
# In another directory/project
npx shadcn add http://localhost:3000/r/clerk-quickstart.json
```

### Method 2: Using Static Files Directly

```bash
# Test your component JSON
cat public/r/clerk-quickstart.json | jq '.'

# Test it with the preview tool (from parent directory)
node ../preview.mjs clerk-quickstart
```

---

## 🚀 Deploying Your Registry

### Option 1: Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Add custom Clerk quickstart registry"
git push origin main
```

2. **Deploy to Vercel:**
- Go to https://vercel.com
- Import your GitHub repository
- Deploy!
- Your registry will be at: `https://your-project.vercel.app/r/{name}.json`

3. **Use your deployed registry:**
```bash
npx shadcn add https://your-project.vercel.app/r/clerk-quickstart.json
```

### Option 2: Netlify

1. **Build for production:**
```bash
npm run build
```

2. **Deploy to Netlify:**
- Drag and drop the `.next` folder or connect your Git repo
- Your registry: `https://your-site.netlify.app/r/{name}.json`

### Option 3: GitHub Pages (Static only)

```bash
# Copy static files
cp -r public/r docs/

# Push to GitHub and enable Pages on the /docs folder
```

---

## 📦 Using Your Custom Registry

### Method 1: Direct URL (Quick testing)

```bash
npx shadcn add https://your-registry-url/r/clerk-quickstart.json
```

### Method 2: Add to components.json (Preferred)

In any project, add your registry to `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "registries": {
    "@vabole": "https://your-registry-url/r/{name}.json"
  },
  // ... rest of config
}
```

Then use it:
```bash
npx shadcn add @vabole/clerk-quickstart
```

### Method 3: Local Testing with File URLs

```bash
# Use file:// protocol for local testing
npx shadcn add file:///Users/vabole/code/shadcn-ui/myregistry/registry-template/public/r/clerk-quickstart.json
```

---

## 🎨 Adding More Components

### 1. Create component files

```bash
mkdir -p registry/new-york/blocks/your-component
```

### 2. Add your component code

Example: `registry/new-york/blocks/your-component/your-file.tsx`

### 3. Register in registry.json

```json
{
  "name": "your-component",
  "type": "registry:block",
  "title": "Your Component",
  "description": "What it does",
  "dependencies": ["package-name"],
  "files": [
    {
      "path": "registry/new-york/blocks/your-component/your-file.tsx",
      "type": "registry:component"
    }
  ]
}
```

### 4. Rebuild

```bash
npx shadcn build
```

---

## 📝 Component Types

| Type | Use For | Example |
|------|---------|---------|
| `registry:ui` | Reusable UI components | Button, Input |
| `registry:component` | Components without target | Utility components |
| `registry:block` | Complex components/features | Login block, Dashboard |
| `registry:page` | Full pages with targets | app/login/page.tsx |
| `registry:hook` | Custom React hooks | useAuth, useToast |
| `registry:lib` | Utility functions | API client, helpers |
| `registry:file` | Any file type | Middleware, config |

---

## 🔧 Advanced Configuration

### Adding Dependencies

```json
{
  "name": "my-component",
  "dependencies": ["@clerk/nextjs", "zod"],
  "devDependencies": ["@types/node"],
  "registryDependencies": ["button", "dialog"]
}
```

### Adding Environment Variables

```json
{
  "envVars": {
    "NEXT_PUBLIC_API_URL": "https://api.example.com",
    "SECRET_KEY": "your-secret-here"
  }
}
```

### Adding CSS

```json
{
  "css": {
    "@import \"@clerk/themes/shadcn.css\"": {},
    "@import \"custom-styles.css\"": {}
  }
}
```

### Adding Tailwind Config

```json
{
  "tailwind": {
    "config": {
      "theme": {
        "extend": {
          "colors": {
            "custom": "#ff0000"
          }
        }
      },
      "plugins": ["@tailwindcss/forms"]
    }
  }
}
```

---

## 🧪 Testing Checklist

- [ ] Built registry with `npx shadcn build`
- [ ] Verified JSON files in `public/r/`
- [ ] Started dev server and accessed component JSON
- [ ] Tested installation in a separate project
- [ ] Verified all dependencies are installed
- [ ] Checked that target paths are correct
- [ ] Environment variables are documented
- [ ] Component works as expected

---

## 📚 Next Steps

1. **Add more templates:**
   - Backend API setup (tRPC, REST)
   - Database schemas (Prisma, Drizzle)
   - Authentication variations
   - Payment integrations

2. **Customize the registry:**
   - Update name and homepage in `registry.json`
   - Add your branding to components
   - Create your own component library

3. **Share with others:**
   - Add to the official registries list
   - Create documentation
   - Write blog posts about your templates

---

## 🎉 Example Usage

```bash
# In a new Next.js project
npx create-next-app my-app
cd my-app

# Initialize shadcn
npx shadcn init

# Add your custom Clerk quickstart
npx shadcn add @vabole/clerk-quickstart

# Add environment variables
echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_..." >> .env.local
echo "CLERK_SECRET_KEY=sk_test_..." >> .env.local

# Run the app
npm run dev
```

---

## 🐛 Troubleshooting

### Build fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules/.cache
pnpm install
npx shadcn build
```

### Component not found

- Check file paths in `registry.json` match actual files
- Ensure `type` fields are correct
- Verify JSON syntax is valid

### Dependencies not installing

- Add to `dependencies` array in component config
- Make sure package names are correct
- Check that versions are compatible

---

## 📖 Resources

- [shadcn Registry Docs](https://ui.shadcn.com/docs/registry)
- [Registry Template Repo](https://github.com/shadcn-ui/registry-template)
- [Clerk Documentation](https://clerk.com/docs)

---

## 🤝 Contributing

Want to add more components? Follow these steps:

1. Create component files in `registry/new-york/blocks/`
2. Add entry to `registry.json`
3. Run `npx shadcn build`
4. Test locally
5. Commit and push
6. Deploy

Happy coding! 🚀
