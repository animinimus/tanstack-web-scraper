import type { ComponentType } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { Navbar } from '@/components/web/navbar'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Bookmark, Import, Library } from 'lucide-react'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-medium tracking-wide uppercase">
            Personal knowledge base
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Save the web. Read it later.
          </h1>
          <p className="text-muted-foreground mt-6 text-lg">
            Recall imports URLs you care about, extracts clean markdown and
            metadata with Firecrawl, and keeps everything in your own library.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/signup" className={buttonVariants({ size: 'lg' })}>
              Create an account
            </Link>
            <Link
              to="/login"
              className={buttonVariants({ size: 'lg', variant: 'secondary' })}
            >
              Sign in
            </Link>
          </div>
        </div>

        <section className="mt-20 grid gap-8 sm:grid-cols-3">
          <FeatureCard
            icon={Import}
            title="Import"
            description="Add a single page or map a site and bulk-import selected links."
          />
          <FeatureCard
            icon={Bookmark}
            title="Scrape and store"
            description="Firecrawl pulls markdown, title, author, dates, and preview images into PostgreSQL."
          />
          <FeatureCard
            icon={Library}
            title="Your library"
            description="Search and filter saved items by status from the dashboard."
          />
        </section>
      </main>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <Icon className="text-primary size-8" />
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}