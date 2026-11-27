import { Link } from 'react-router-dom'
import { Button, Container, Section } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">The page you were looking for does not exist or has moved.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button as={Link} to="/">Back to homepage</Button>
          <Button as={Link} to="/tools/" variant="secondary">Browse tools</Button>
        </div>
      </Container>
    </Section>
  )
}
