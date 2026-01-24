import { MetadataRoute } from 'next'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://den.builders'
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
