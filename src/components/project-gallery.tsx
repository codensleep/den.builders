"use client"

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Project {
  title: string
  description: string
  category: string
  image: string
  imageAlt: string
  featured?: boolean
}

const projects: Project[] = [
  {
    title: 'Los Angeles',
    description:
      'Structural framing and site coordination for a fast-track commercial build.',
    category: 'Construction management',
    image: '/projects/optimized/construction-1.jpg',
    imageAlt: 'Structural framing at a Los Angeles construction site',
    featured: true,
  },
  {
    title: 'Kitchen Remodel',
    description:
      'A full kitchen and living refresh focused on light, storage, and durable finishes.',
    category: 'Interior remodeling',
    image: '/projects/optimized/kitchen.jpg',
    imageAlt: 'Completed modern kitchen remodel',
  },
  {
    title: 'Altadena ADU',
    description:
      'A compact backyard unit designed for privacy, daylight, and an efficient layout.',
    category: 'Accessory dwelling unit',
    image: '/projects/optimized/adu.jpg',
    imageAlt: 'Completed accessory dwelling unit in Altadena',
  },
  {
    title: 'Custom Fabrication',
    description:
      'Purpose-built details shaped around the project, its materials, and the people using it.',
    category: 'Custom work',
    image: '/projects/optimized/custom-fabrication.jpg',
    imageAlt: 'Custom fabrication work by Den Builders',
  },
  {
    title: 'Hotels',
    description:
      'Commercial projects delivered with precise coordination and close attention to code.',
    category: 'Commercial build-out',
    image: '/projects/optimized/commercial.jpg',
    imageAlt: 'Commercial hospitality construction project',
  },
  {
    title: 'Hospitals and Clinics',
    description:
      'Healthcare interiors planned around patient comfort, durable finishes, and efficient care.',
    category: 'Healthcare construction',
    image: '/projects/optimized/clinic.jpg',
    imageAlt: 'Bright modern clinic treatment room',
  },
]

export function ProjectGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selectedProject = selectedIndex === null ? null : projects[selectedIndex]

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === null ? null : (current - 1 + projects.length) % projects.length,
    )
  }

  const showNext = () => {
    setSelectedIndex((current) =>
      current === null ? null : (current + 1) % projects.length,
    )
  }

  useEffect(() => {
    if (selectedIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null)
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex])

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24" aria-labelledby="project-gallery-title">
      <div className="mb-10 grid gap-5 md:grid-cols-[0.75fr_1.25fr] md:items-start">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Our Previous Projects
          </p>
          <h2
            id="project-gallery-title"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Work shaped by purpose, place, and precise execution.
          </h2>
        </div>
        <p className="max-w-xl text-base text-muted-foreground md:mt-8 md:justify-self-end">
          Explore a selection of residential, commercial, and custom projects completed by Den Builders. Select any image for a closer look.
        </p>
      </div>

      <div className="grid auto-rows-[15rem] gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[17rem]">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`group relative isolate overflow-hidden rounded-3xl border border-border/60 bg-card text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              project.featured ? 'sm:row-span-2 lg:col-span-2' : ''
            }`}
            aria-label={`View ${project.title} project`}
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              sizes={
                project.featured
                  ? '(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw'
                  : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
              }
              priority={index === 0}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-colors group-hover:from-black/90" />
            <span className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/70">
                {project.category}
              </span>
              <span className="mt-2 block text-xl font-semibold tracking-tight sm:text-2xl">
                {project.title}
              </span>
            </span>
          </button>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} project image`}
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-colors hover:bg-white hover:text-black sm:right-8 sm:top-8"
            aria-label="Close gallery"
            autoFocus
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showPrevious()
            }}
            className="absolute left-3 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-colors hover:bg-white hover:text-black sm:left-8"
            aria-label="Show previous project"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <figure
            className="relative flex h-full w-full max-w-6xl flex-col justify-end overflow-hidden rounded-3xl border border-white/15 bg-black"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={selectedProject.image}
              src={selectedProject.image}
              alt={selectedProject.imageAlt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <figcaption className="relative z-10 mt-auto bg-gradient-to-t from-black via-black/75 to-transparent px-6 pb-6 pt-24 text-white sm:px-10 sm:pb-10">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/65">
                {selectedProject.category}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {selectedProject.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-white/75 sm:text-base">
                {selectedProject.description}
              </p>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showNext()
            }}
            className="absolute right-3 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-colors hover:bg-white hover:text-black sm:right-8"
            aria-label="Show next project"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <p className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-xs font-medium tracking-[0.25em] text-white/60 sm:bottom-8">
            {(selectedIndex ?? 0) + 1} / {projects.length}
          </p>
        </div>
      )}
    </section>
  )
}
