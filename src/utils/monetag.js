import { site } from '../config/site.js'

function singleQuoted(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

export function buildVignetteScript() {
  return (
    `(function(s){s.dataset.zone=${singleQuoted(site.monetagVignetteZone)},s.src=${singleQuoted(site.monetagVignetteScriptSrc)}})` +
    `([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
  )
}
