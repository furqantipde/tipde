import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { Container, Section } from '../components/ui.jsx'
import { getPost, posts } from '../config/blog.js'
import NotFound from './NotFound.jsx'

function Block({ block }) {
  if (block.type === 'h2') return <h2 className="mt-10 text-xl font-bold tracking-tight sm:text-2xl">{block.text}</h2>
  if (block.type === 'code') return <pre className="mt-5 overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-sm text-slate-100"><code>{block.text}</code></pre>
  if (block.type === 'ul') return <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-300">{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
  return <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{block.text}</p>
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFound />

  const more = posts.filter((item) => item.slug !== post.slug).slice(0, 3)

  return (
    <Section>
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog/' }, { label: post.title }]} />
        <article>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-200">{post.category} · {post.readTime}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{post.description}</p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">Published {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <AdSlot id="article-top" className="my-8" />
          <div className="mt-8 text-base">
            {post.body.map((block, index) => <Block key={index} block={block} />)}
          </div>
          <AdSlot id="article-bottom" className="my-8" />

          <div className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-5 text-sm dark:border-brand-900 dark:bg-brand-600/10">
            Try it yourself: <Link className="font-semibold text-brand-700 underline dark:text-brand-200" to="/tools/">open the Tipde tools</Link> and apply what you just read.
          </div>
        </article>

        <section className="mt-14">
          <h2 className="mb-5 text-xl font-bold">More guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {more.map((item) => (
              <Link key={item.slug} to={`/blog/${item.slug}/`} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </Section>
  )
}
