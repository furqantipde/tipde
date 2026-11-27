import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  throw new Error('dist/index.html is missing. Run "npm run build:client" first.')
}

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
})

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
  const { getAllRoutes, getRouteMeta, renderMetaTags, buildSitemap } = await vite.ssrLoadModule('/src/utils/seo.js')

  const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
  const routes = getAllRoutes()

  for (const route of routes) {
    const appHtml = render(route)
    const meta = getRouteMeta(route)
    const tags = renderMetaTags(meta)

    let page = template
    if (page.includes('<!--app-head-->')) {
      page = page.replace('<!--app-head-->', tags)
    } else {
      page = page.replace('</head>', `    ${tags}\n  </head>`)
    }

    if (page.includes('<!--app-html-->')) {
      page = page.replace('<!--app-html-->', appHtml)
    } else {
      page = page.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    }

    const targetDir = route === '/' ? dist : path.join(dist, route)
    fs.mkdirSync(targetDir, { recursive: true })
    fs.writeFileSync(path.join(targetDir, 'index.html'), page)
    console.log(`prerendered ${route}`)
  }

  // GitHub Pages fallback for unknown routes.
  fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'))
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), buildSitemap())

  console.log(`\nPrerendered ${routes.length} routes into dist/`)
} finally {
  await vite.close()
}
