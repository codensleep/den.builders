import { MetadataRoute } from 'next'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'

const siteUrl = 'https://codensleep.github.io/den.builders'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllPostSlugs()
  const posts = slugs.map((slug) => {
    const post = getPostBySlug(slug)

    return {
      url: `${siteUrl}/blog/${slug}`,
      lastModified: post?.date ?? new Date().toISOString(),
    }
  })

  return [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
    },
    ...posts,
  ]
}
