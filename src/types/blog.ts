export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  content: string
  readingTime: number
}

export interface BlogPostMetadata {
  title: string
  description: string
  date: string
  author: string
  tags: string[]
}