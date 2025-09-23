import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { OurWorkCarousel } from '@/components/our-work-carousel'

const services = [
  {
    title: 'Architecture',
    description:
      'We specialize in designing and building functional, modern, and minimalistic spaces. Our architectural approach combines creativity with practicality, ensuring every project reflects quality craftsmanship, efficient design, and lasting value.',
    focusAreas: [],
  },
  {
    title: 'Construction',
    description:
      'Our expertise covers residential, commercial, and custom builds, with a focus on quality workmanship, efficient project management, and on-time delivery. We handle everything from site preparation and concrete work to framing, finishing, and final inspections, ensuring each project meets the highest standards of safety, durability, and craftsmanship.',
    focusAreas: [],
  },
  {
    title: 'Remodeling',
    description:
      'We offer complete home remodeling services, including kitchen and bathroom upgrades, room additions, and whole-house renovations. Our team focuses on quality craftsmanship, modern design, and seamless project management to transform your home into a space that fits your lifestyle and needs.',
    focusAreas: [],
  },
]

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <nav className="flex items-center justify-between border-b border-border/60 pb-6">
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground transition-colors hover:text-foreground"
          >
            den.builders
          </Link>
          <ThemeToggle />
        </nav>

        <header className="mx-auto max-w-3xl py-12 text-center md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Modern homes
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Constructing Dreams with Integrity.
          </h1>
          <p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl">
            Essays, experiments, and notes on design systems, engineering practice, and the tools that keep teams moving fast without the noise.
          </p>
        </header>

        <section className="mx-auto max-w-5xl space-y-12 px-6 py-12 md:py-16">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
              Our Services
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Collaborations built around partnership, pace, and measurable impact.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
              A team of strong builders and architects based in Los Angeles helps our customers achieve excellence through outstanding service. We focus on neat, ergonomic, and impressive design. We offer complete interior design projects, basic remodeling, and construction for any residential space.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="flex h-full flex-col justify-between rounded-3xl border border-border/60 bg-card/70 p-6 text-left transition-colors hover:border-foreground/20 hover:bg-card dark:bg-card/60"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                {service.focusAreas.length > 0 && (
                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                    {service.focusAreas.map((area) => (
                      <li key={area} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-foreground/40" aria-hidden />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        <OurWorkCarousel />

        <section className="space-y-12">
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="flex h-full flex-col justify-between rounded-3xl border border-border/60 bg-card/70 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-foreground/15 hover:bg-card hover:shadow-lg dark:bg-card/60">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground/80">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40" aria-hidden />
                      <span>{post.readingTime} min read</span>
                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground">
                      {post.title}
                    </h2>
                    <p className="text-base text-muted-foreground/90 line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:inline-flex" aria-hidden />
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="rounded-full border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:border-foreground/30 group-hover:text-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-card/40 py-24 text-center">
              <p className="text-lg text-muted-foreground">
                No published articles yet
              </p>
            </div>
          )}
        </section>

        <section className="mx-auto mt-24 max-w-4xl rounded-3xl border border-border/60 bg-card/70 px-8 py-16 text-center shadow-sm dark:bg-card/60">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Contact Us
          </p>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ready for the next project that deserves this level of care?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Share a few details about your product, timeline, or the challenge in front of you. We will respond within two business days with next steps and available collaboration windows.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:denbuildersinc@gmail.com"
              className="inline-flex items-center justify-center rounded-full border border-border/60 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/90 hover:text-background"
            >
              denbuildersinc@gmail.com
            </a>
            <a
              href="tel:+14242004072"
              className="inline-flex items-center justify-center rounded-full border border-border/40 px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              Schedule a call
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
