import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ToolCard from '../components/ToolCard.jsx'
import { Container, Section } from '../components/ui.jsx'
import { getCategory } from '../config/categories.js'
import { toolsForCategory } from '../config/tools.js'
import NotFound from './NotFound.jsx'

export default function CategoryPage() {
  const { slug } = useParams()
  const category = getCategory(slug)
  if (!category) return <NotFound />

  const categoryTools = toolsForCategory(slug)

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Categories', to: '/categories/' }, { label: category.name }]} />
        <div className="mb-10 max-w-2xl">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 font-mono font-bold text-brand-800 dark:bg-brand-600/15 dark:text-brand-200">{category.icon}</span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{category.name}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{category.description}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
        {!categoryTools.length && (
          <p className="text-slate-600 dark:text-slate-300">
            No tools in this category yet. <Link className="text-brand-600 hover:underline dark:text-brand-200" to="/tools/">Browse all tools</Link>.
          </p>
        )}
      </Container>
    </Section>
  )
}
