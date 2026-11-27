import { useEffect } from 'react'
import { site } from '../config/site.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function Analytics() {
  const [consent] = useLocalStorage('tipde:consent', null)

  useEffect(() => {
    if (!site.gaMeasurementId || consent !== 'all') return
    if (window.__tipdeAnalyticsLoaded) return
    window.__tipdeAnalyticsLoaded = true

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', site.gaMeasurementId, { anonymize_ip: true })

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(site.gaMeasurementId)}`
    document.head.appendChild(script)
  }, [consent])

  return null
}
