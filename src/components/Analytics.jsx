import { useEffect } from 'react'

const CONSENT_KEY = 'tipde:consent'

function readConsent() {
  try {
    return JSON.parse(window.localStorage.getItem(CONSENT_KEY) || 'null')
  } catch {
    return null
  }
}

function applyConsent(value) {
  if (typeof window.gtag !== 'function') return

  const granted = value === 'all'
  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

export default function Analytics() {
  useEffect(() => {
    applyConsent(readConsent())

    const onConsent = (event) => applyConsent(event.detail)
    const onStorage = (event) => {
      if (event.key === CONSENT_KEY) applyConsent(readConsent())
    }

    window.addEventListener('tipde:consent', onConsent)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('tipde:consent', onConsent)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return null
}
