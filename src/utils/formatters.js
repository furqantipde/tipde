const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr',
])

const BLOCK_TAGS = new Set([
  'html', 'head', 'body', 'address', 'article', 'aside', 'blockquote', 'details', 'dialog', 'div', 'dl', 'dt',
  'dd', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header',
  'hr', 'li', 'main', 'nav', 'ol', 'p', 'pre', 'script', 'section', 'style', 'summary', 'table', 'tbody',
  'td', 'tfoot', 'th', 'thead', 'tr', 'ul',
])

const RAW_TEXT_TAGS = new Set(['script', 'style', 'pre', 'textarea'])

/** Parse, validate and beautify JSON. Returns { ok, value, error }. */
export function formatJson(input, indent = 2) {
  try {
    const parsed = JSON.parse(input)
    return { ok: true, value: JSON.stringify(parsed, null, indent === 'tab' ? '\t' : Number(indent) || 2) }
  } catch (error) {
    return { ok: false, value: '', error: error.message }
  }
}

/** Validate and compact JSON. Returns { ok, value, error }. */
export function minifyJson(input) {
  try {
    const parsed = JSON.parse(input)
    return { ok: true, value: JSON.stringify(parsed) }
  } catch (error) {
    return { ok: false, value: '', error: error.message }
  }
}

function findMatchingClose(tokens, start, name) {
  let depth = 1
  for (let i = start + 1; i < tokens.length; i += 1) {
    const token = tokens[i]
    if (!token.startsWith('<') || token.startsWith('<!--')) continue
    const opening = /^<([A-Za-z][\w-]*)/.exec(token)
    const closing = /^<\/([A-Za-z][\w-]*)/.exec(token)
    if (opening && opening[1].toLowerCase() === name) depth += 1
    if (closing && closing[1].toLowerCase() === name) {
      depth -= 1
      if (depth === 0) return i
    }
  }
  return -1
}

/** Lightweight, dependency-free HTML beautifier. Returns { ok, value, error }. */
export function formatHtml(input, indent = 2) {
  if (!input || !input.trim()) return { ok: true, value: '' }

  const unit = indent === 'tab' ? '\t' : ' '.repeat(Number(indent) || 2)
  const tokens = input.match(/<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/?[A-Za-z][^>]*>|[^<]+/g) || []
  const lines = []
  let level = 0
  let buffer = ''
  let raw = false

  const pushLine = (content, atLevel = level) => {
    if (content.trim()) lines.push(unit.repeat(Math.max(0, atLevel)) + content.trim())
  }
  const flush = () => {
    if (buffer.trim()) pushLine(raw ? buffer.trim() : buffer.replace(/\s+/g, ' ').trim())
    buffer = ''
    raw = false
  }

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i]

    if (/^<!--|^<!DOCTYPE/i.test(token)) {
      flush()
      pushLine(token)
      continue
    }

    const opening = /^<([A-Za-z][\w-]*)/.exec(token)
    const closing = /^<\/([A-Za-z][\w-]*)/.exec(token)

    if (opening) {
      const name = opening[1].toLowerCase()
      const isVoid = VOID_TAGS.has(name) || /\/\s*>$/.test(token)

      if (BLOCK_TAGS.has(name) && !isVoid) {
        flush()
        const closeIndex = findMatchingClose(tokens, i, name)
        const between = closeIndex === -1 ? [] : tokens.slice(i + 1, closeIndex)
        if (closeIndex !== -1 && between.every((part) => !part.startsWith('<') && !part.startsWith('<!--'))) {
          const text = between.join('').replace(/\s+/g, ' ').trim()
          pushLine(token + (text ? text : '') + tokens[closeIndex])
          i = closeIndex
          continue
        }
        pushLine(token)
        level += 1
        if (RAW_TEXT_TAGS.has(name)) raw = true
      } else {
        buffer += token
      }
      continue
    }

    if (closing) {
      const name = closing[1].toLowerCase()
      if (BLOCK_TAGS.has(name)) {
        flush()
        level = Math.max(0, level - 1)
        pushLine(token)
      } else {
        buffer += token
      }
      continue
    }

    buffer += token
  }
  flush()

  return { ok: true, value: lines.join('\n') }
}

/** Compress CSS while preserving strings, URLs and meaningful whitespace. Returns { ok, value, error }. */
export function minifyCss(input, { keepImportantComments = true } = {}) {
  if (!input || !input.trim()) return { ok: true, value: '' }

  let output = ''
  let i = 0
  let quote = null

  try {
    while (i < input.length) {
      const char = input[i]

      if (quote) {
        output += char
        if (char === '\\' && i + 1 < input.length) {
          output += input[i + 1]
          i += 2
          continue
        }
        if (char === quote) quote = null
        i += 1
        continue
      }

      if (char === '"' || char === "'") {
        quote = char
        output += char
        i += 1
        continue
      }

      if (char === '/' && input[i + 1] === '*') {
        const end = input.indexOf('*/', i + 2)
        if (end === -1) throw new Error('Unclosed CSS comment')
        const comment = input.slice(i, end + 2)
        if (keepImportantComments && comment.startsWith('/*!')) {
          output += comment
        }
        i = end + 2
        continue
      }

      if (/\s/.test(char)) {
        let j = i
        while (j < input.length && /\s/.test(input[j])) j += 1
        const prev = output.slice(-1)
        const next = input[j] || ''
        const safeToDrop = '{:;,}'.includes(prev) || '{:;,}'.includes(next) || (prev === '}' && next === '{')
        if (!safeToDrop && prev && next) output += ' '
        i = j
        continue
      }

      output += char
      i += 1
    }

    output = output.replace(/;}/g, '}').replace(/\{;/g, '{').trim()
    return { ok: true, value: output }
  } catch (error) {
    return { ok: false, value: '', error: error.message }
  }
}

/** Minify JavaScript with Terser, loaded on demand. Returns { ok, value, error }. */
export async function minifyJavaScript(input, { compress = true, mangle = true } = {}) {
  if (!input || !input.trim()) return { ok: true, value: '' }
  try {
    const { minify } = await import('terser')
    const result = await minify(input, {
      compress,
      mangle,
      format: { comments: false },
    })
    if (typeof result.code !== 'string') throw new Error('No output was produced')
    return { ok: true, value: result.code }
  } catch (error) {
    return { ok: false, value: '', error: error.message || 'Minification failed' }
  }
}
