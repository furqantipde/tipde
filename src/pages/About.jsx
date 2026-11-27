import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { BoltIcon, ShieldIcon } from '../components/Icons.jsx'
import { Button, Card, Container, Section } from '../components/ui.jsx'
import { site } from '../config/site.js'

export default function About() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Tipde</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {site.description} Tipde was built around a simple idea: everyday developer tasks should not require installing software, creating an account or uploading private code.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Card className="p-6">
            <BoltIcon className="mb-4 text-brand-500" />
            <h2 className="font-semibold">Fast and focused</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Each tool does one job well. Pages are lightweight, and processing happens on your device.</p>
          </Card>
          <Card className="p-6">
            <ShieldIcon className="mb-4 text-brand-500" />
            <h2 className="font-semibold">Private by design</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Your input is not sent to a server or included in analytics. Preferences stay in your browser.</p>
          </Card>
        </div>

        <h2 className="mt-12 text-xl font-bold">What we are building</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          Tipde launched with ten working tools covering JSON, HTML, CSS, JavaScript, encoding, generators and text utilities. The long-term goal is a trusted collection of 50–100+ free developer utilities, each with its own documentation and search-friendly page.
        </p>
        <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
          The platform is free to use. Advertising may be introduced later to support hosting and development, but it will never block or interrupt the tools.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button as={Link} to="/tools/">Explore the tools</Button>
          <Button as={Link} to="/contact/" variant="secondary">Get in touch</Button>
        </div>
      </Container>
    </Section>
  )
}
