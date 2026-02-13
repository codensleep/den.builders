"use client"

import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

interface ProjectItem {
  title: string
  description: string
  sector: string
  palette: string
  image?: string
  imageAlt?: string
}

const projects: ProjectItem[] = [
  {
    title: 'Los Angeles',
    description:
      'Structural framing and site coordination for a fast-track commercial build.',
    sector: 'Construction management',
    palette: 'from-slate-300/90 via-orange-500/40 to-stone-900/20',
    image: '/projects/construction-1.jpg',
    imageAlt: 'construction company',
  },
  {
    title: 'Kitchen Remodel',
    description:
      'A full kitchen and living refresh focused on light, storage, and durable finishes.',
    sector: 'Interior remodeling',
    palette: 'from-sky-300/90 via-indigo-500/40 to-indigo-900/20',
    image: '/projects/kitchen.jpg',
    imageAlt: 'kitchen remodel',
  },
  {
    title: 'Altadena ADU',
    description:
      'A compact backyard unit designed for privacy, daylight, and efficient layout.',
    sector: 'Accessory dwelling unit',
    palette: 'from-amber-300/90 via-orange-500/40 to-orange-900/20',
    image: '/projects/adu.jpg',
  },
  {
    title: 'Silver Lake Residence',
    description:
      'A hillside renovation balancing indoor calm with layered terraces and native landscaping.',
    sector: 'Residential architecture',
    palette: 'from-rose-300/90 via-rose-500/40 to-rose-900/20',
    image: undefined,
  },
  {
    title: 'Pasadena Workspace',
    description:
      'We focus on commercial projects that demand precision, coordination, and code compliance.',
    sector: 'Commercial build-out',
    palette: 'from-teal-300/90 via-cyan-500/40 to-cyan-900/20',
    image: '/projects/commercial.jpg',
  },
]

const AUTOPLAY_INTERVAL = 9000

export function OurWorkCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const items = useMemo(() => projects, [])
  const lastIndex = items.length - 1

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index === lastIndex ? 0 : index + 1))
    }, AUTOPLAY_INTERVAL)

    return () => window.clearInterval(timer)
  }, [lastIndex])

  const goTo = (index: number) => {
    if (index === activeIndex) return
    setActiveIndex(index)
  }

  const previous = () => {
    setActiveIndex((index) => (index === 0 ? lastIndex : index - 1))
  }

  const next = () => {
    setActiveIndex((index) => (index === lastIndex ? 0 : index + 1))
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Our Previous Projects
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Some of our latest builds where vision and craft met precision.
          </h2>
          <p className="text-base text-muted-foreground">
            Each project pairs thoughtful planning with confident execution. The result: spaces that feel considered and teams that move faster because of it.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={previous}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              aria-label="Show previous project"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              aria-label="Show next project"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative isolate flex-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 bg-card/70 shadow-lg">
            {items.map((project, index) => {
              const isActive = index === activeIndex
              const showImage = Boolean(project.image)
              return (
                <article
                  key={project.title}
                  className={`absolute inset-0 flex flex-col justify-between gap-8 p-8 transition-all duration-700 ease-out ${
                    isActive
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-6 opacity-0'
                  }`}
                  aria-hidden={!isActive}
                >
                  <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.palette}`}
                    />
                    {showImage && (
                      <Image
                        src={project.image as string}
                        alt={project.imageAlt ?? project.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 640px, (min-width: 768px) 50vw, 100vw"
                        priority={index === 0}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/40" />
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-white/70 backdrop-blur">
                      {project.sector}
                    </span>
                    <h3 className="mt-6 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base text-white/80">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Design / Construction / Project management</span>
                    <span className="font-medium">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_45%)]" />
                </article>
              )
            })}
          </div>

          <div className="mt-6 flex justify-center gap-3">
            {items.map((project, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-8 bg-foreground'
                      : 'w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60'
                  }`}
                  aria-label={`Show project ${index + 1}`}
                  aria-pressed={isActive}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
