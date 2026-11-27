import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../config/site.js'
import { getRouteMeta } from '../utils/seo.js'

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
  return element
}

export default function SEO({ title, description, type }) {
  const location = useLocation()

  useEffect(() => {
    const routeMeta = getRouteMeta(location.pathname)
    const meta = {
      ...routeMeta,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(type ? { type } : {}),
    }
    const url = `${site.url}${meta.path === '/' ? '/' : meta.path}`
    document.title = meta.title

    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: meta.description })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: meta.type || 'website' })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: meta.description })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    document.documentElement.lang = 'en'
  }, [location.pathname, title, description, type])

  return null
}
