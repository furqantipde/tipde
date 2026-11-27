import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import { ThemeProvider } from './hooks/useTheme.jsx'

const base = import.meta.env.BASE_URL || '/'
const basename = base === '/' ? undefined : base.replace(/\/$/, '')

export function render(url) {
  return renderToString(
    <StaticRouter location={url} basename={basename}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StaticRouter>,
  )
}
