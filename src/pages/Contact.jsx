import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { Alert, Container, Section } from '../components/ui.jsx'
import { site } from '../config/site.js'

export default function Contact() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Tipde</h1>
        <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">
          Feedback, bug reports and tool ideas are welcome. Tipde is a browser-based project, so the best way to reach us is by email.
        </p>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Email</h2>
          <p className="mt-2 text-lg font-medium text-brand-600 dark:text-brand-200">{site.email}</p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Please include the tool name and a short description of the problem or suggestion. Do not send private code or sensitive data.
          </p>
        </div>
        <div className="mt-6">
          <Alert tone="info">Tipde does not offer account-based support. Tool input is never collected by the site.</Alert>
        </div>
      </Container>
    </Section>
  )
}
