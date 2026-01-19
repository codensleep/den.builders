import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { getAllPostSlugs, getPostBySlug, markdownToHtml } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'

const siteUrl = 'https://codensleep.github.io/den.builders'
const ogImageUrl = `${siteUrl}/projects/silver-lake-residence.jpg`

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const url = `${siteUrl}/blog/${slug}`
  
  if (!post) {
    return {
      title: 'Post not found'
    }
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: 'Den Builders',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: ogImageUrl,
          alt: 'Den Builders residential project',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  
  try {
    const post = getPostBySlug(slug)
    const htmlContent = await markdownToHtml(post.content)
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Den Builders',
        url: siteUrl,
      },
      mainEntityOfPage: `${siteUrl}/blog/${slug}`,
    }

    return (
      <div className="min-h-screen bg-background">
        <Script
          id={`article-schema-${slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <div className="mx-auto max-w-4xl px-6 py-10 md:py-14">
          <nav className="mb-12 flex items-center justify-between border-b border-border/60 pb-6">
            <Link
              href="/"
              className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground transition-colors hover:text-foreground"
            >
              den.builders
            </Link>
            <ThemeToggle />
          </nav>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to all articles
          </Link>

          <article className="mt-10 rounded-3xl border border-border/60 bg-card/70 p-8 shadow-sm transition-colors dark:bg-card/60 md:p-12">
            <header className="mb-10 space-y-6">
              <div className="space-y-3">
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {post.title}
                </h1>
                <p className="text-balance text-lg text-muted-foreground">
                  {post.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:inline-flex" aria-hidden />
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:inline-flex" aria-hidden />
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-full border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            <div
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:bg-muted prose-code:text-foreground prose-pre:bg-muted-foreground prose-pre:text-background dark:prose-pre:bg-muted dark:prose-pre:text-foreground"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>

          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All articles
            </Link>
          </div>
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}
