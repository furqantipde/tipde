import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdSlot from '../components/AdSlot.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import FAQ from '../components/FAQ.jsx'
import { ArrowIcon, ShieldIcon, StarIcon } from '../components/Icons.jsx'
import ToolCard from '../components/ToolCard.jsx'
import { Badge, Card, Container, Section } from '../components/ui.jsx'
import { getCategory } from '../config/categories.js'
import { getTool, toolsForCategory } from '../config/tools.js'
import { useFavorites, useRecentlyUsed } from '../hooks/useToolStorage.js'
import { toolComponents } from '../tools/index.js'
import NotFound from './NotFound.jsx'

export default function ToolPage() {
  const { slug } = useParams()
  const tool = getTool(slug)
  const { favorites, toggleFavorite } = useFavorites()
  const { recordTool } = useRecentlyUsed()

  useEffect(() => {
    if (tool) recordTool(tool.slug)
  }, [tool, recordTool])

  if (!tool) return <NotFound />

  const ToolComponent = toolComponents[tool.slug]
  const category = getCategory(tool.category)
  const isFavorite = favorites.includes(tool.slug)
  const related = tool.related.map((item) => getTool(item)).filter(Boolean)
  const moreTools = toolsForCategory(tool.category).filter((item) => item.slug !== tool.slug).slice(0, 3)

  return (
    <>
      <Section className="pb-8">
        <Container>
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools/' }, { label: category?.name || 'Tool', to: `/categories/${tool.category}/` }, { label: tool.name }]} />
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 font-mono text-lg font-bold text-brand-800 dark:bg-brand-600/15 dark:text-brand-200">{tool.icon}</span>
                <Badge>{category?.name || 'Tool'}</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{tool.name}</h1>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{tool.short}</p>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{tool.description}</p>
            </div>
            <button
              type="button"
              onClick={() => toggleFavorite(tool.slug)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                isFavorite
                  ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-amber-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
              }`}
              aria-pressed={isFavorite}
            >
              <StarIcon filled={isFavorite} width={18} height={18} />
              {isFavorite ? 'Favorited' : 'Add to favorites'}
            </button>
          </div>

          <Card className="mt-8 p-5 sm:p-6">
            {ToolComponent ? <ToolComponent tool={tool} /> : <p>This tool is not available.</p>}
          </Card>

          <div className="mt-5 flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400">
            <ShieldIcon width={18} height={18} />
            Private by design — your input is processed in your browser and is never uploaded.
          </div>

          <AdSlot id={`tool-${tool.slug}`} className="my-8" />
        </Container>
      </Section>

      <Section className="bg-white py-12 dark:bg-slate-900/50">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-bold">How to use {tool.name}</h2>
            <ol className="space-y-3">
              {tool.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-600 dark:bg-brand-600/15 dark:text-brand-200">{index + 1}</span>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">About this tool</h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{tool.description}</p>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              Looking for more utilities? <Link className="font-semibold text-brand-600 hover:underline dark:text-brand-200" to="/tools/">Browse all tools</Link> or explore <Link className="font-semibold text-brand-600 hover:underline dark:text-brand-200" to={`/categories/${tool.category}/`}>{category?.name}</Link>.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <FAQ items={tool.faqs} />
          <div>
            <h2 className="mb-5 text-xl font-bold">Related tools</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} to={`/tools/${item.slug}/`} className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-brand-600 dark:text-brand-200">{item.icon}</span>
                    <ArrowIcon width={16} height={16} className="text-slate-300 group-hover:text-brand-500" />
                  </div>
                  <h3 className="mt-2 font-semibold">{item.name}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.short}</p>
                </Link>
              ))}
            </div>
            <p className="mt-5 text-xs text-slate-500 dark:text-slate-300">You may also like: <Link to="/tools/" className="underline">all free Tipde tools</Link>.</p>
          </div>
        </Container>
      </Section>

      {moreTools.length > 0 && (
        <Section className="bg-white py-10 dark:bg-slate-900/50">
          <Container>
            <h2 className="mb-5 text-xl font-bold">More {category?.name || 'tools'}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {moreTools.map((item) => <ToolCard key={item.slug} tool={item} />)}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
