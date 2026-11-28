import { useEffect } from 'react'
import { site } from '../config/site.js'
import { buildVignetteScript } from '../utils/monetag.js'

const CONSENT_KEY = 'tipde:consent'

function readConsent() {
  try {
    return JSON.parse(window.localStorage.getItem(CONSENT_KEY) || 'null')
  } catch {
    return null
  }
}

function loadMonetag() {
  if (!site.monetagZone || !site.monetagScriptSrc) return
  if (window.__tipdeMonetagLoaded || document.querySelector('script[data-tipde-monetag]')) return

  window.__tipdeMonetagLoaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = site.monetagScriptSrc
  script.setAttribute('data-zone', site.monetagZone)
  script.setAttribute('data-cfasync', 'false')
  script.setAttribute('data-tipde-monetag', '')
  script.onerror = () => {
    window.__tipdeMonetagLoaded = false
    script.remove()
  }
  document.head.appendChild(script)
}

function loadMonetagVignette() {
  if (!site.monetagVignetteZone || !site.monetagVignetteScriptSrc) return
  if (window.__tipdeMonetagVignetteLoaded || document.querySelector('script[data-tipde-monetag-vignette]')) return

  window.__tipdeMonetagVignetteLoaded = true

  const script = document.createElement('script')
  script.textContent = buildVignetteScript()
  script.setAttribute('data-tipde-monetag-vignette', '')

  try {
    document.head.appendChild(script)
  } catch {
    window.__tipdeMonetagVignetteLoaded = false
    script.remove()
  }
}

function syncConsent(value) {
  if (value !== 'all') return
  loadMonetag()
  loadMonetagVignette()
}

export default function MonetagAds() {
  useEffect(() => {
    syncConsent(readConsent())

    const onConsent = (event) => syncConsent(event.detail)
    const onStorage = (event) => {
      if (event.key === CONSENT_KEY) syncConsent(readConsent())
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
