# Tipde — Developer Tools Platform

**Developer tools. Made simple.**

Tipde is a free, browser-based developer utilities platform. This repository contains the complete React + Vite + Tailwind CSS implementation, including 15 working tools, individually prerendered SEO pages, legal pages, analytics consent handling and GitHub Pages deployment.

## Features

- **15 working tools:** JSON Formatter, HTML Formatter, CSS Minifier, JavaScript Minifier, Base64 Encoder/Decoder, URL Encoder/Decoder, UUID Generator, Password Generator, Word Counter, Unix Timestamp Converter, PDF to Word, JPG to PDF, Compress PDF, Merge PDF and PDF to JPG.
- **Document tools run locally:** PDF parsing, DOCX creation, image conversion, merging and compression rely on client-side libraries loaded only when needed. No file is uploaded.
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
│   ├── tools/              # Tool implementations
│   ├── utils/              # Formatters, encoders, generators, file helpers, SEO helpers
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
| `VITE_BASE_PATH` | `/tipde/` for the github.io project URL; `/` once `tipde.online` is active |

Analytics is loaded **only after the visitor accepts non-essential cookies** and never receives tool input.

## Publishing to GitHub

The public repository is **https://github.com/furqantipde/tipde** and GitHub Pages is enabled with **GitHub Actions** as the build source. The site is live at **https://tipde.online/** (custom domain connected via Cloudflare).

The workflow in `.github/workflows/deploy.yml` builds and publishes `dist/` automatically on every push to `main`. To reproduce a fresh publication:

```bash
git init
git add .
git commit -m "Initial Tipde release"
git branch -M main
git remote add origin https://github.com/<your-username>/tipde.git
git push -u origin main

# Create the Pages site once (POST creates it; PUT only updates an existing site):
gh api -X POST repos/<your-username>/tipde/pages -f build_type=workflow
```

Add repository secrets `VITE_GA_MEASUREMENT_ID` and `VITE_GSC_VERIFICATION` if you use GA4 or Search Console.

## Cloudflare + custom domain (`tipde.online`)

1. In Cloudflare DNS, add a `CNAME` record named `tipde` pointing to `furqantipde.github.io` (proxy off/"DNS only" is simplest initially). Alternatively use `A` records to the GitHub Pages IPs for the apex domain.
2. In GitHub repository **Settings → Pages → Custom domain**, enter `tipde.online` and save. The included `public/CNAME` file is copied into `dist/` automatically.
3. The repository variable `VITE_BASE_PATH` is already set to `/` for the custom domain (Repository settings → Secrets and variables → Actions → Variables). If you revert to the github.io project URL, remove the variable so the workflow falls back to `/tipde/`.
   - Locally: `$env:VITE_BASE_PATH='/' ; npm run build` on PowerShell, or `VITE_BASE_PATH=/ npm run build` on bash.
4. Enable **Enforce HTTPS** in GitHub Pages once DNS has propagated.
5. Submit `https://tipde.online/sitemap.xml` in Google Search Console.

## Advertising readiness

Ad containers are present but render nothing until `VITE_ENABLE_ADS=true`. When applying for AdSense or another network:

- keep ads out of tool controls,
- update the Privacy Policy and Cookie Policy with the network you chose,
- keep the consent banner active for regions that require it.

No AdSense approval is claimed in this repository.

## License

Source code is provided for the Tipde project. Review and adapt before commercial use.
