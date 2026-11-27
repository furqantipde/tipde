# Tipde — Developer Tools Platform

**Developer tools. Made simple.**

Tipde is a free, browser-based developer utilities platform. This repository contains the complete React + Vite + Tailwind CSS implementation, including 10 working tools, individually prerendered SEO pages, legal pages, analytics consent handling and GitHub Pages deployment.

## Features

- **10 working tools:** JSON Formatter, HTML Formatter, CSS Minifier, JavaScript Minifier, Base64 Encoder/Decoder, URL Encoder/Decoder, UUID Generator, Password Generator, Word Counter and Unix Timestamp Converter.
- **Private by default:** all tool input is processed locally in the browser. No account, no uploads.
- **SEO-ready:** a dedicated route, unique metadata, canonical URL, FAQ schema and static HTML for every tool, category and article.
- **Responsive:** desktop, tablet and mobile layouts.
- **Light and dark themes:** preference saved in `localStorage`.
- **Extras:** tool search, category filters, favorites, recently used tools, copy feedback, downloads, keyboard shortcuts, sitemap, robots.txt, cookie consent and optional GA4.

## Folder structure

```text
tipde/
├── public/                 # Static assets (robots.txt, CNAME, favicon, .nojekyll)
├── scripts/prerender.js    # Generates static HTML for every route into dist/
├── src/
│   ├── components/         # Shared UI, layout, SEO, consent, tool workspace
│   ├── config/             # Site, tools, categories, blog and legal content
│   ├── hooks/              # Theme, localStorage, copy, favorites, recents
│   ├── pages/              # Home, tools, categories, blog, legal, tool pages
│   ├── tools/              # The 10 tool implementations
│   ├── utils/              # Formatters, encoders, generators, SEO helpers
│   ├── App.jsx             # Route definitions
│   ├── entry-server.jsx    # SSR render entry used by the prerender script
│   └── main.jsx            # Browser entry
├── tests/                  # Vitest coverage for tool utilities and SEO routes
└── .github/workflows/      # GitHub Pages deployment workflow
```

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Tests

```bash
npm test
```

## Production build

```bash
npm run build
```

This runs `vite build` (client bundle) and then `scripts/prerender.js`, which writes a fully static site into `dist/`:

- `dist/index.html` plus one `index.html` per route
- `dist/404.html` fallback
- `dist/sitemap.xml`
- `dist/robots.txt`, `dist/CNAME`, `dist/favicon.svg`

Preview locally with:

```bash
npm run preview
```

### Environment variables

Copy `.env.example` to `.env` and adjust as needed:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Canonical base URL (default `https://tipde.online`) |
| `VITE_GA_MEASUREMENT_ID` | GA4 measurement ID; empty disables analytics |
| `VITE_GSC_VERIFICATION` | Search Console verification code |
| `VITE_ENABLE_ADS` | Set `true` only when real ad code is ready |
| `VITE_CONTACT_EMAIL` | Contact email address |
| `VITE_BASE_PATH` | Use `/tipde/` for a github.io project URL without a custom domain |

Analytics is loaded **only after the visitor accepts non-essential cookies** and never receives tool input.

## Publishing to GitHub

1. Create a new **public** repository named `tipde` on GitHub (or use `gh repo create tipde --public`).
2. In this folder, run:

   ```bash
   git init
   git add .
   git commit -m "Initial Tipde release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/tipde.git
   git push -u origin main
   ```

3. In the repository settings, open **Pages → Build and deployment** and select **GitHub Actions** as the source.
4. The workflow in `.github/workflows/deploy.yml` builds and publishes `dist/` automatically on every push to `main`.
5. Add repository secrets `VITE_GA_MEASUREMENT_ID` and `VITE_GSC_VERIFICATION` if you use GA4 or Search Console.

## Cloudflare + custom domain (`tipde.online`)

1. In Cloudflare DNS, add a `CNAME` record named `tipde` pointing to `<your-username>.github.io` (proxy off/"DNS only" is simplest initially). Alternatively use an `A` record to GitHub Pages IPs if you use the apex domain.
2. In GitHub repository **Settings → Pages → Custom domain**, enter `tipde.online` and save. The included `public/CNAME` file is copied into `dist/` automatically.
3. Enable **Enforce HTTPS** in GitHub Pages once DNS has propagated.
4. Submit `https://tipde.online/sitemap.xml` in Google Search Console.

If you deploy to `https://<username>.github.io/tipde/` before the custom domain is active, rebuild with `VITE_BASE_PATH=/tipde/` so asset URLs resolve correctly.

## Advertising readiness

Ad containers are present but render nothing until `VITE_ENABLE_ADS=true`. When applying for AdSense or another network:

- keep ads out of tool controls,
- update the Privacy Policy and Cookie Policy with the network you chose,
- keep the consent banner active for regions that require it.

No AdSense approval is claimed in this repository.

## License

Source code is provided for the Tipde project. Review and adapt before commercial use.
