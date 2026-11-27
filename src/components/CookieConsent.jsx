import { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { Button, Container } from './ui.jsx'

export default function CookieConsent() {
  const [consent, setConsent] = useLocalStorage('tipde:consent', null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (consent === null) setVisible(true)
    const reopen = () => setVisible(true)
    window.addEventListener('tipde:open-consent', reopen)
    return () => window.removeEventListener('tipde:open-consent', reopen)
  }, [consent])

  if (!visible) return null

  const choose = (value) => {
    setConsent(value)
    window.dispatchEvent(new CustomEvent('tipde:consent', { detail: value }))
    setVisible(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/95" role="dialog" aria-label="Cookie preferences">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          We use essential local storage for your preferences. With your permission, we also load privacy-friendly analytics. Tool input is never collected. See our{' '}
          <a className="font-medium text-brand-600 underline" href="/cookie-policy/">Cookie Policy</a>.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="secondary" onClick={() => choose('essential')}>Essential only</Button>
          <Button onClick={() => choose('all')}>Accept all</Button>
        </div>
      </Container>
    </div>
  )
}
