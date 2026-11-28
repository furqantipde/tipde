import { site } from '../config/site.js'
import { tools, getTool } from '../config/tools.js'
import { categories, getCategory } from '../config/categories.js'
import { posts, getPost } from '../config/blog.js'
import { legalPages } from '../config/legal.js'

const staticPages = {
  '/': {
    title: 'Tipde Tool Hub Free | Developer Tools',
    description: site.description,
  },
  '/tools/': {
    title: 'All Developer Tools | Tipde',
    description: 'Browse every free Tipde tool: JSON, HTML, CSS, JavaScript, PDF conversion, image tools, encoding and generators.',
  },
  '/categories/': {
    title: 'Tool Categories | Tipde',
    description: 'Explore Tipde tools by category, from JSON formatting and code generators to PDF and image conversion.',
  },
  '/blog/': {
    title: 'Developer Tutorials & Guides | Tipde',
    description: 'Practical guides for developers: JSON, CSS minification, Base64, UUIDs and more.',
  },
  '/about/': {
    title: 'About Tipde | Free Developer Tools',
    description: 'Learn why Tipde makes fast, private and free browser-based developer tools.',
  },
  '/contact/': {
    title: 'Contact Tipde',
    description: 'Get in touch with the Tipde team about feedback, ideas or partnerships.',
  },
  '/favorites/': {
    title: 'Your Favorites | Tipde',
    description: 'View the Tipde tools you saved with the star button. Favorites stay privately in your browser and never leave your device.',
  },
  'privacy-policy': legalPages['privacy-policy'],
  terms: legalPages.terms,
  'cookie-policy': legalPages['cookie-policy'],
  disclaimer: legalPages.disclaimer,
}

export function normalizePath(pathname = '/') {
  if (!pathname || pathname === '/') return '/'
  return `${pathname.replace(/\/+$/, '')}/`
}

export function getRouteMeta(pathname = '/') {
  const path = normalizePath(pathname)

  if (staticPages[path]) {
    const page = staticPages[path]
    return {
      title: page.title,
      description: page.description,
      path,
      type: 'website',
      ld: path === '/' ? {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Tipde Tool Hub Free',
        alternateName: site.name,
        url: site.url,
        description: site.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${site.url}/tools/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      } : undefined,
    }
  }

  const legalMatch = /^\/(privacy-policy|terms|cookie-policy|disclaimer)\/$/.exec(path)
  if (legalMatch) {
    const page = legalPages[legalMatch[1]]
    return { title: `${page.title} | Tipde`, description: page.description, path, type: 'website' }
  }

  const toolMatch = /^\/tools\/([a-z0-9-]+)\/$/.exec(path)
  if (toolMatch) {
    const tool = getTool(toolMatch[1])
    if (tool) {
      return {
        title: `${tool.name} | Tipde`,
        description: `${tool.short} Free, private and browser-based.`,
        path,
        type: 'website',
        keywords: tool.keywords.join(', '),
        ld: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: tool.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        },
      }
    }
  }

  const categoryMatch = /^\/categories\/([a-z0-9-]+)\/$/.exec(path)
  if (categoryMatch) {
    const category = getCategory(categoryMatch[1])
    if (category) {
      return { title: `${category.name} | Tipde`, description: category.description, path, type: 'website' }
    }
  }

  const postMatch = /^\/blog\/([a-z0-9-]+)\/$/.exec(path)
  if (postMatch) {
    const post = getPost(postMatch[1])
    if (post) {
      return { title: `${post.title} | Tipde Blog`, description: post.description, path, type: 'article' }
    }
  }

  return {
    title: 'Page Not Found | Tipde',
    description: 'The page you were looking for could not be found.',
    path,
    type: 'website',
  }
}

export function getAllRoutes() {
  return [
    '/',
    '/tools/',
    '/categories/',
    '/blog/',
    '/about/',
    '/contact/',
    '/favorites/',
    '/privacy-policy/',
    '/terms/',
    '/cookie-policy/',
    '/disclaimer/',
    ...tools.map((tool) => `/tools/${tool.slug}/`),
    ...categories.map((category) => `/categories/${category.slug}/`),
    ...posts.map((post) => `/blog/${post.slug}/`),
  ]
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function renderMetaTags(meta) {
  const url = `${site.url}${meta.path === '/' ? '/' : meta.path}`
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="${meta.type === 'article' ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="Tipde" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
  ]
  if (meta.keywords) tags.push(`<meta name="keywords" content="${escapeHtml(meta.keywords)}" />`)
  if (site.gscVerification) tags.push(`<meta name="google-site-verification" content="${escapeHtml(site.gscVerification)}" />`)
  if (site.monetagId) tags.push(`<meta name="monetag" content="${escapeHtml(site.monetagId)}" />`)

  const gaId = site.gaMeasurementId || 'G-ES7PV81P28'
  if (gaId) {
    tags.push(
      `<script>\n` +
        `  window.dataLayer = window.dataLayer || [];\n` +
        `  function gtag(){dataLayer.push(arguments);}\n` +
        `  gtag('consent', 'default', {\n` +
        `    analytics_storage: 'denied',\n` +
        `    ad_storage: 'denied',\n` +
        `    ad_user_data: 'denied',\n` +
        `    ad_personalization: 'denied'\n` +
        `  });\n` +
        `  gtag('js', new Date());\n` +
        `</script>`,
    )
    tags.push(`<script async src="https://www.googletagmanager.com/gtm.js?id=${escapeHtml(gaId)}"></script>`)
  }
  if (meta.ld) tags.push(`<script type="application/ld+json">${JSON.stringify(meta.ld).replace(/</g, '\\u003c')}</script>`)
  return tags.join('\n    ')
}

export function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = getAllRoutes().map((route) => {
    const meta = getRouteMeta(route)
    const priority = route === '/' ? '1.0' : route.startsWith('/tools/') ? '0.8' : '0.6'
    return `  <url>\n    <loc>${escapeHtml(`${site.url}${route}`)}</loc>\n    <lastmod>${meta.path === '/' ? today : '2026-11-27'}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}
