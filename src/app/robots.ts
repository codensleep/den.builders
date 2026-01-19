import { MetadataRoute } from 'next'

const siteUrl = 'https://codensleep.github.io/den.builders'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
