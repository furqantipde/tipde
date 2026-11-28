import { site } from '../config/site.js'

function singleQuoted(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

export function buildVignetteScript(zone = site.monetagVignetteZone) {
  return (
    `(function(s){s.dataset.zone=${singleQuoted(zone)},s.src=${singleQuoted(site.monetagVignetteScriptSrc)}})` +
    `([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
  )
}
