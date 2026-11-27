import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set VITE_BASE_PATH=/tipde/ when deploying to a GitHub Pages project URL
// without the custom domain. With tipde.online configured, keep the default '/'.
const base = process.env.VITE_BASE_PATH || '/'
const esm = (pkg, file = 'dist/index.mjs') => fileURLToPath(new URL(`./node_modules/${pkg}/${file}`, import.meta.url))

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^react-router-dom$/, replacement: esm('react-router-dom') },
      { find: /^react-router$/, replacement: esm('react-router', 'dist/development/index.mjs') },
    ],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
  },
})
