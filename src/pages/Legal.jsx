import { useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { Container, Section } from '../components/ui.jsx'
import { legalPages } from '../config/legal.js'
import NotFound from './NotFound.jsx'

function Block({ block }) {
  if (block.type === 'h2') return <h2 className="mt-9 text-xl font-bold tracking-tight">{block.text}</h2>
  if (block.type === 'ul') return <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-300">{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
  return <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{block.text}</p>
}

export default function Legal({ slug: propSlug }) {
  const { slug: routeSlug } = useParams()
  const slug = propSlug || routeSlug
  const page = legalPages[slug]
  if (!page) return <NotFound />

  return (
    <Section>
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: page.title }]} />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{page.title}</h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">Last updated: {page.updated}</p>
        <div className="mt-8">
          {page.body.map((block, index) => <Block key={index} block={block} />)}
        </div>
      </Container>
    </Section>
  )
}
