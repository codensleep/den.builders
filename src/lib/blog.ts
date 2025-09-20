import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import { BlogPost, BlogPostMetadata } from '@/types/blog'
import type { Root, Element, Properties, Parent, Node as HastNode } from 'hast'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const metadata = data as BlogPostMetadata
  
  return {
    slug,
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    author: metadata.author,
    tags: metadata.tags || [],
    content,
    readingTime: calculateReadingTime(content)
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs()
  const posts = slugs.map((slug) => getPostBySlug(slug))
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function markdownToHtml(markdown: string): Promise<string> {
  // Prefix root-relative links/images in Markdown with the GitHub Pages base path
  // so that internal links work when the site is hosted under /den.builders
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  // Minimal typed rehype plugin to prefix root-relative href/src with basePath
  function rehypePrefixLinks() {
    return (tree: Root) => {
      const walk = (node: HastNode): void => {
        if (node.type === 'element') {
          const el = node as Element
          const props = (el.properties ?? {}) as Properties

          const href = props['href']
          if (
            typeof href === 'string' &&
            href.startsWith('/') &&
            basePath &&
            !href.startsWith(basePath + '/')
          ) {
            props['href'] = (basePath + href) as unknown as Properties[string]
            el.properties = props
          }

          const src = props['src']
          if (
            typeof src === 'string' &&
            src.startsWith('/') &&
            basePath &&
            !src.startsWith(basePath + '/')
          ) {
            props['src'] = (basePath + src) as unknown as Properties[string]
            el.properties = props
          }
        }

        if ('children' in node && Array.isArray((node as Parent).children)) {
          for (const child of (node as Parent).children) walk(child as HastNode)
        }
      }

      walk(tree as unknown as HastNode)
    }
  }

  const result = await remark()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrefixLinks)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown)
  
  return result.toString()
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = allPosts.flatMap(post => post.tags)
  return [...new Set(tags)].sort()
}
