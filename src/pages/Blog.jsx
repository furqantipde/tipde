import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { ArrowIcon } from '../components/Icons.jsx'
import { Container, Section } from '../components/ui.jsx'
import { posts } from '../config/blog.js'

export default function Blog() {
  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />
        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Developer Tutorials & Guides</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Clear, practical explanations for the tools and ideas developers use every day.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}/`} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-200">{post.category} · {post.readTime}</span>
              <h2 className="mt-3 text-lg font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">{post.description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 dark:text-brand-200">Read article <ArrowIcon width={16} height={16} /></span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}
