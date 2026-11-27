import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import ToolCard from '../components/ToolCard.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { categories } from '../config/categories.js'
import { searchTools } from '../config/tools.js'
import { Container, Section } from '../components/ui.jsx'

export default function Tools() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const category = params.get('category') || 'all'
  const sort = params.get('sort') || 'popular'

  const update = (next) => {
    const updated = new URLSearchParams(params)
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === 'all' || (key === 'sort' && value === 'popular')) updated.delete(key)
      else updated.set(key, value)
    })
    setParams(updated, { replace: true })
  }

  let results = searchTools(query, category)
  if (sort === 'newest') results = [...results].sort((a, b) => b.added.localeCompare(a.added))

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'All Tools' }]} />
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All Developer Tools</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Search by name or keyword, then filter by category. Every tool runs in your browser.</p>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto]">
          <SearchBar value={query} onChange={(value) => update({ q: value })} onSubmit={(value) => update({ q: value })} />
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm text-slate-500 dark:text-slate-300" htmlFor="sort">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => update({ sort: event.target.value })}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="popular">Popular</option>
              <option value="newest">Recently added</option>
            </select>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button
            type="button"
            onClick={() => update({ category: 'all' })}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === 'all' ? 'bg-brand-600 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'}`}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => update({ category: item.slug })}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === item.slug ? 'bg-brand-600 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <p className="mb-5 text-sm text-slate-500 dark:text-slate-300" aria-live="polite">
          {results.length} {results.length === 1 ? 'tool' : 'tools'} found
          {query && <> for “{query}”</>}
        </p>

        {results.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-semibold">No tools found</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Try a different keyword or clear the category filter.</p>
            <button type="button" onClick={() => setParams(new URLSearchParams())} className="mt-4 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-200">Reset filters</button>
          </div>
        )}
      </Container>
    </Section>
  )
}
