import { describe, expect, it } from 'vitest'
import { formatHtml, formatJson, minifyCss, minifyJson } from '../src/utils/formatters.js'
import { base64Decode, base64Encode, urlDecode, urlEncode } from '../src/utils/encoders.js'
import { generatePassword, generateUuids, uuidv4 } from '../src/utils/generators.js'
import { countText } from '../src/utils/counters.js'
import { dateToTimestamp, timestampToDate } from '../src/utils/datetime.js'
import { getAllRoutes, getRouteMeta } from '../src/utils/seo.js'

describe('JSON tools', () => {
  it('formats valid JSON with indentation', () => {
    const result = formatJson('{"a":1,"b":[2,3]}', 2)
    expect(result.ok).toBe(true)
    expect(result.value).toContain('\n  "a": 1')
  })

  it('reports invalid JSON with an error message', () => {
    const result = formatJson('{"a":}')
    expect(result.ok).toBe(false)
    expect(result.error.length).toBeGreaterThan(0)
  })

  it('minifies JSON without changing its value', () => {
    const result = minifyJson('{ "a" : 1 }')
    expect(result.value).toBe('{"a":1}')
    expect(minifyJson('{').ok).toBe(false)
  })
})

describe('HTML and CSS tools', () => {
  it('indents nested HTML', () => {
    const result = formatHtml('<div><h1>Hi</h1></div>', 2)
    expect(result.ok).toBe(true)
    expect(result.value).toBe('<div>\n  <h1>Hi</h1>\n</div>')
  })

  it('keeps inline content together', () => {
    const result = formatHtml('<p>Hello <strong>world</strong></p>')
    expect(result.value).toContain('Hello <strong>world</strong>')
  })

  it('minifies CSS and preserves strings', () => {
    const result = minifyCss('.a { content: "a  b"; color: red; }')
    expect(result.ok).toBe(true)
    expect(result.value).toContain('"a  b"')
    expect(result.value).not.toContain('\n')
  })

  it('reports unclosed CSS comments', () => {
    const result = minifyCss('.a { color: red; /* oops')
    expect(result.ok).toBe(false)
  })
})

describe('encoding tools', () => {
  it('round-trips UTF-8 text through Base64', () => {
    const text = 'Hello, Tipde! 👋 é'
    const encoded = base64Encode(text)
    expect(encoded.ok).toBe(true)
    expect(base64Decode(encoded.value).value).toBe(text)
  })

  it('rejects invalid Base64', () => {
    expect(base64Decode('not base64').ok).toBe(false)
  })

  it('round-trips URL components', () => {
    const text = 'hello world & café?'
    expect(urlDecode(urlEncode(text).value).value).toBe(text)
    expect(urlDecode('%ZZ').ok).toBe(false)
  })
})

describe('generators', () => {
  it('creates valid v4 UUIDs', () => {
    const uuid = uuidv4()
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    expect(generateUuids(10)).toHaveLength(10)
  })

  it('generates passwords within the requested character sets', () => {
    const password = generatePassword({ length: 20, lower: true, upper: true, digits: true, symbols: false })
    expect(password).toHaveLength(20)
    expect(password).toMatch(/^[a-zA-Z0-9]+$/)
    expect(() => generatePassword({ lower: false, upper: false, digits: false, symbols: false })).toThrow()
  })
})

describe('counters and time', () => {
  it('counts text correctly', () => {
    const counts = countText('One two.\n\nThree four five.')
    expect(counts.words).toBe(5)
    expect(counts.paragraphs).toBe(2)
    expect(counts.sentences).toBe(2)
    expect(counts.charactersNoSpaces).toBeLessThan(counts.characters)
  })

  it('converts timestamps in both directions', () => {
    const result = timestampToDate('1700000000', 'seconds')
    expect(result.ok).toBe(true)
    expect(result.value.iso).toBe('2023-11-14T22:13:20.000Z')
    const back = dateToTimestamp('2023-11-14T22:13:20Z')
    expect(back.value.seconds).toBe(1700000000)
    expect(timestampToDate('abc').ok).toBe(false)
  })
})

describe('SEO routes', () => {
  it('provides unique metadata for every route', () => {
    const routes = getAllRoutes()
    expect(routes.length).toBeGreaterThanOrEqual(30)
    const titles = routes.map((route) => getRouteMeta(route).title)
    expect(new Set(titles).size).toBe(titles.length)
  })
})
