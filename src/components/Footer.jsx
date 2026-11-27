import { Link } from 'react-router-dom'
import { footerLinks, site } from '../config/site.js'
import { Container } from './ui.jsx'

export default function Footer() {
  const openConsent = () => window.dispatchEvent(new CustomEvent('tipde:open-consent'))

  return (
    <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2 font-extrabold text-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 font-mono text-sm text-white">&lt;/&gt;</span>
              Tipde
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-600 dark:text-slate-300">{site.description}</p>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">Developer tools. Made simple.</p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <p>© {new Date().getFullYear()} Tipde. All rights reserved.</p>
          <button type="button" onClick={openConsent} className="hover:text-brand-600 dark:hover:text-brand-200">
            Cookie settings
          </button>
        </div>
      </Container>
    </footer>
  )
}
