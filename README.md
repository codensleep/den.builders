# Den Builders

**Architecture. Construction. Custom Fabrications**

A modern blog website built with Next.js, showcasing construction and architecture expertise in Los Angeles.

## Features

- 🏗️ **Markdown Blog System** - Dynamic blog posts generated from markdown files
- 🎨 **shadcn/ui Design System** - Beautiful, accessible components
- 🌙 **Dark/Light Theme** - Toggle between themes with system preference support
- 📱 **Responsive Design** - Optimized for all devices
- ⚡ **Next.js 15** - Latest React framework with App Router
- 🎯 **TypeScript** - Full type safety
- 🎨 **Tailwind CSS** - Utility-first CSS framework

## Blog Topics

- AI in Architecture & Construction
- Los Angeles Building Codes & Regulations  
- Construction Materials & Techniques
- Home Improvement & Remodeling

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Base path (GitHub Pages)

When deploying under a subpath (e.g. GitHub Pages at `/den.builders`) set:

```bash
NEXT_PUBLIC_BASE_PATH=/den.builders npm run build
```

Locally, leave `NEXT_PUBLIC_BASE_PATH` unset so the app runs at `/` and avoids 404s.

## Project Structure

```
├── content/blog/          # Markdown blog posts
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable components
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript type definitions
├── components.json       # shadcn/ui configuration
└── tailwind.config.ts   # Tailwind CSS configuration
```

## Adding Blog Posts

1. Create a new `.md` file in `content/blog/`
2. Add front-matter metadata:

```yaml
---
title: "Your Blog Post Title"
description: "Brief description of the post"
date: "2024-02-12"
author: "Author Name"
tags: ["construction", "los-angeles", "architecture"]
---
```

3. Write your content in Markdown
4. The post will automatically appear on the homepage

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **next-themes** - Theme switching
- **remark/rehype** - Markdown processing
- **gray-matter** - Front-matter parsing

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
