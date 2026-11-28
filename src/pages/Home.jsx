import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FAQ from '../components/FAQ.jsx'
import SearchBar from '../components/SearchBar.jsx'
import ToolCard from '../components/ToolCard.jsx'
import { BoltIcon, DeviceIcon, ArrowIcon, ShieldIcon, SparkIcon } from '../components/Icons.jsx'
import { Badge, Button, Card, Container, Section, SectionHeading } from '../components/ui.jsx'
import { categories } from '../config/categories.js'
import { posts } from '../config/blog.js'
import { featuredTools, newestTools, tools, toolsForCategory } from '../config/tools.js'
import { useFavorites, useRecentlyUsed } from '../hooks/useToolStorage.js'
import { getTool } from '../config/tools.js'

const homeFaqs = [
  {
    q: 'Are Tipde tools really free?',
    a: 'Yes. Every tool on Tipde is free to use without an account or registration.',
  },
  {
    q: 'Is my code uploaded anywhere?',
    a: 'No. Tools run in your browser, so your input stays on your device. Some pages load fonts, optional analytics and ads, but tool input is never transmitted.',
  },
  {
    q: 'Can I use Tipde on mobile?',
    a: 'Yes. The interface is responsive and works on desktop, tablet and mobile screens.',
  },
  {
    q: 'How many tools are available?',
    a: `Tipde includes ${tools.length} fully working tools and will keep growing. You can see everything on the All Tools page.`,
  },
]

const features = [
  { icon: BoltIcon, title: 'Fast by default', text: 'No installs, no sign-ups and no waiting for a server. Tools respond immediately.' },
  { icon: ShieldIcon, title: 'Private processing', text: 'Your code is handled locally in the browser and is never stored by Tipde.' },
  { icon: DeviceIcon, title: 'Works everywhere', text: 'A responsive interface for desktop, tablet and mobile, with light and dark modes.' },
  { icon: SparkIcon, title: 'Built to grow', text: 'A modular tool system makes it easy to add more useful utilities over time.' },
]

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { favorites } = useFavorites()
  const { recent } = useRecentlyUsed()
  const favoriteTools = favorites.map((slug) => getTool(slug)).filter(Boolean)
  const recentToolList = recent.map((slug) => getTool(slug)).filter(Boolean)

  const submit = (value) => navigate(value.trim() ? `/tools/?q=${encodeURIComponent(value.trim())}` : '/tools/')

  return (
    <>
      <Section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-50/70 via-white to-white py-16 sm:py-24 dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <Container className="relative max-w-4xl text-center">
          <Badge className="mb-6">{tools.length} free tools · No sign-up required</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Developer Tools. <span className="text-brand-500">Made Simple.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Free online tools to format, convert, validate and generate code. Fast, simple and accessible everywhere.
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <SearchBar value={query} onChange={setQuery} onSubmit={submit} autoFocusId="hero-search" />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-300">
            <span>Popular:</span>
            {['json formatter', 'pdf to word', 'base64', 'uuid', 'password'].map((term) => (
              <button key={term} type="button" onClick={() => submit(term)} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-700">
                {term}
              </button>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-600 dark:text-slate-300">
            <span><strong className="text-xl text-slate-900 dark:text-white">{tools.length}</strong> working tools</span>
            <span><strong className="text-xl text-slate-900 dark:text-white">{categories.length}</strong> categories</span>
            <span><strong className="text-xl text-slate-900 dark:text-white">100%</strong> browser-based</span>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Popular" title="Tools developers use every day" description="Open a tool, paste your data and get a clean result in seconds." />
            <Link to="/tools/" className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2 dark:text-brand-200">View all tools <ArrowIcon width={16} height={16} /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.slice(0, 6).map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </Container>
      </Section>

      <Section className="bg-white dark:bg-slate-900/50">
        <Container>
          <SectionHeading eyebrow="Browse" title="Find the right tool by category" description="From data formatting to generators, everything is organized so you can get back to work." center />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.slug} to={`/categories/${category.slug}/`} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 font-mono text-sm font-bold text-accent-600 dark:bg-accent-500/15 dark:text-accent-300">{category.icon}</span>
                <h3 className="font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{category.name}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{toolsForCategory(category.slug).length} tools</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Fresh" title="Recently added tools" description="The newest additions to the Tipde toolbox." />
              <div className="grid gap-4 sm:grid-cols-2">
                {newestTools.map((tool) => (
                  <Link key={tool.slug} to={`/tools/${tool.slug}/`} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
                    <div className="mb-2 font-mono text-xs text-brand-600 dark:text-brand-200">{tool.icon}</div>
                    <h3 className="font-semibold">{tool.name}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{tool.short}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="Your workspace" title="Favorites & recently used" description="Saved privately in your browser for quick access." />
              <Card className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">Favorites</h3>
                  <Link to="/favorites/" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:gap-2 dark:text-brand-200">
                    View all <ArrowIcon width={14} height={14} />
                  </Link>
                </div>
                {favoriteTools.length ? (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {favoriteTools.map((tool) => <Link key={tool.slug} to={`/tools/${tool.slug}/`} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">{tool.name}</Link>)}
                  </div>
                ) : (
                  <p className="mb-6 text-sm text-slate-500 dark:text-slate-300">Click the star on any tool card to save it here.</p>
                )}
                <h3 className="mb-3 text-sm font-semibold">Recently used</h3>
                {recentToolList.length ? (
                  <div className="flex flex-wrap gap-2">
                    {recentToolList.map((tool) => <Link key={tool.slug} to={`/tools/${tool.slug}/`} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-600/10 dark:text-brand-200">{tool.name}</Link>)}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-300">Tools you open will appear here.</p>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white dark:bg-slate-900/50">
        <Container>
          <SectionHeading eyebrow="Why Tipde" title="A better way to handle everyday tasks" center />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6">
                <feature.icon className="mb-4 text-brand-500" />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{feature.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Learn" title="Developer tutorials" description="Short, practical guides written for real work." />
            <Link to="/blog/" className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2 dark:text-brand-200">Read the blog <ArrowIcon width={16} height={16} /></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}/`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-200">{post.category} · {post.readTime}</span>
                <h3 className="mt-3 text-lg font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white dark:bg-slate-900/50">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" center />
          <FAQ items={homeFaqs} />
        </Container>
      </Section>

      <Section className="bg-brand-600 text-white">
        <Container className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-bold">Ready to simplify your workflow?</h2>
            <p className="mt-2 text-brand-50">Pick a tool and start working — no setup needed.</p>
          </div>
          <Button as={Link} to="/tools/" variant="secondary" className="border-white bg-white text-brand-600 hover:bg-brand-50">Explore all tools</Button>
        </Container>
      </Section>
    </>
  )
}
