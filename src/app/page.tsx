import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <nav className="flex justify-end items-center mb-8">
          <ThemeToggle />
        </nav>

        <header className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Блог
          </h1>
          <p className="text-muted-foreground text-lg">
            Статьи о веб-разработке и современных технологиях
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="mb-8 transition-all duration-200 hover:shadow-lg cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.readingTime} мин. чтения</span>
                  </div>
                  <CardDescription className="text-base line-clamp-3">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Пока нет опубликованных статей
            </p>
          </div>
        )}
      </div>
    </div>
  )
}