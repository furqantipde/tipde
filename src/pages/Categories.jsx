import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { ArrowIcon } from '../components/Icons.jsx'
import { Container, Section } from '../components/ui.jsx'
import { categories } from '../config/categories.js'
import { toolsForCategory } from '../config/tools.js'

export default function Categories() {
  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Categories' }]} />
        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Tool Categories</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Browse the Tipde toolbox by what you need to get done.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.slug} to={`/categories/${category.slug}/`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 font-mono font-bold text-brand-800 dark:bg-brand-600/15 dark:text-brand-200">{category.icon}</span>
              <h2 className="text-lg font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{category.name}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{category.description}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 dark:text-brand-200">
                {toolsForCategory(category.slug).length} tools <ArrowIcon width={16} height={16} />
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}
