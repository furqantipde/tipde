import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { formatHtml, formatJson, minifyCss, minifyJson } from '../src/utils/formatters.js'
import { base64Decode, base64Encode, urlDecode, urlEncode } from '../src/utils/encoders.js'
import { generatePassword, generateUuids, uuidv4 } from '../src/utils/generators.js'
import { countText } from '../src/utils/counters.js'
import { dateToTimestamp, timestampToDate } from '../src/utils/datetime.js'
import { convertCase } from '../src/utils/textCase.js'
import { hashText } from '../src/utils/hash.js'
import { hexToRgb, rgbToHex } from '../src/utils/colors.js'
import { decodeJwt } from '../src/utils/jwt.js'
import { readStoredValue } from '../src/hooks/useLocalStorage.js'
import { toolComponents } from '../src/tools/index.js'
import { getAllRoutes, getRouteMeta, renderMetaTags } from '../src/utils/seo.js'
import { tools, getTool } from '../src/config/tools.js'
import { categories } from '../src/config/categories.js'
import { footerLinks, navigation, site } from '../src/config/site.js'
import { legalPages } from '../src/config/legal.js'
import { buildVignetteScript } from '../src/utils/monetag.js'
import {
  formatBytes,
  isImageFile,
  isPdfFile,
  normalizeTextItems,
  rowsToParagraphs,
  safeBaseName,
} from '../src/utils/fileTools.js'

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

describe('additional developer utilities', () => {
  it('converts text between common naming conventions', () => {
    expect(convertCase('hello world', 'camel')).toBe('helloWorld')
    expect(convertCase('Hello, Tipde!', 'snake')).toBe('hello_tipde')
    expect(convertCase('XMLHttpRequest test', 'kebab')).toBe('xml-http-request-test')
    expect(convertCase('hello world', 'constant')).toBe('HELLO_WORLD')
    expect(convertCase('hello WORLD', 'title')).toBe('Hello World')
  })

  it('hashes text with the browser crypto API', async () => {
    const result = await hashText('abc', 'SHA-256')
    expect(result.ok).toBe(true)
    expect(result.value).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
    expect((await hashText('abc', 'MD5')).ok).toBe(false)
  })

  it('converts between hex and RGB colors', () => {
    expect(hexToRgb('#fff').value).toBe('rgb(255, 255, 255)')
    expect(hexToRgb('1e40af').hex).toBe('#1e40af')
    expect(rgbToHex('rgb(30, 64, 175)').value).toBe('#1e40af')
    expect(rgbToHex('rgb(300, 0, 0)').ok).toBe(false)
    expect(hexToRgb('nope').ok).toBe(false)
  })

  it('decodes a JWT header and payload without verifying the signature', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRpcGRlIn0.signature'
    const result = decodeJwt(token)
    expect(result.ok).toBe(true)
    expect(result.header.alg).toBe('HS256')
    expect(result.payload.name).toBe('Tipde')
    expect(result.signature).toBe('signature')
    expect(decodeJwt('not-a-jwt').ok).toBe(false)
  })
})

describe('document tools', () => {
  it('formats file sizes safely', () => {
    expect(formatBytes(1536)).toBe('1.5 KB')
    expect(formatBytes(0)).toBe('0 B')
  })

  it('creates safe download names', () => {
    expect(safeBaseName('My Report (final).PDF')).toBe('My-Report-final')
    expect(safeBaseName('')).toBe('document')
  })

  it('recognizes supported file types', () => {
    expect(isPdfFile({ name: 'report.PDF', type: '' })).toBe(true)
    expect(isImageFile({ name: 'scan.jpeg', type: '' })).toBe(true)
    expect(isPdfFile({ name: 'image.jpg', type: 'image/jpeg' })).toBe(false)
  })

  it('groups text items into readable rows and paragraphs', () => {
    const rows = normalizeTextItems([
      { str: 'Hello', transform: [1, 0, 0, 1, 10, 100], height: 10 },
      { str: ' world', transform: [1, 0, 0, 1, 50, 100], height: 10 },
      { str: 'Second line', transform: [1, 0, 0, 1, 10, 80], height: 10 },
    ])
    expect(rows.map((row) => row.text)).toEqual(['Hello world', 'Second line'])
    expect(rowsToParagraphs(rows)).toEqual(['Hello world', 'Second line'])
  })

  it('registers every document tool with complete SEO metadata', () => {
    const slugs = ['pdf-to-word', 'jpg-to-pdf', 'compress-pdf', 'merge-pdf', 'pdf-to-jpg']
    expect(categories.some((category) => category.slug === 'document-tools')).toBe(true)
    slugs.forEach((slug) => {
      const tool = getTool(slug)
      expect(tool).toBeDefined()
      expect(tool.category).toBe('document-tools')
      expect(tool.instructions.length).toBeGreaterThanOrEqual(3)
      expect(tool.faqs.length).toBeGreaterThanOrEqual(3)
      expect(tool.related.length).toBeGreaterThan(0)
      expect(getRouteMeta(`/tools/${slug}/`).title).toBe(`${tool.name} | Tipde`)
    })
  })
})

describe('SEO routes', () => {
  it('uses the Tipde Tool Hub Free title and description on the homepage', () => {
    const home = getRouteMeta('/')
    expect(home.title).toBe('Tipde Tool Hub Free | Developer Tools')
    expect(home.description).toContain('Tipde Tool Hub is a free collection of 19 browser-based developer tools')
  })

  it('provides unique metadata for every route', () => {
    const routes = getAllRoutes()
    expect(routes.length).toBeGreaterThanOrEqual(46)
    expect(tools.length).toBeGreaterThanOrEqual(19)
    const titles = routes.map((route) => getRouteMeta(route).title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('adds the favorites page to routes and metadata', () => {
    expect(getAllRoutes()).toContain('/favorites/')
    expect(getRouteMeta('/favorites/').title).toBe('Your Favorites | Tipde')
  })

  it('registers every new utility with a working component', () => {
    const slugs = ['text-case-converter', 'hex-rgb-converter', 'hash-generator', 'jwt-decoder']
    slugs.forEach((slug) => {
      const tool = getTool(slug)
      expect(tool).toBeDefined()
      expect(toolComponents[slug]).toBeDefined()
      expect(getRouteMeta(`/tools/${slug}/`).title).toBe(`${tool.name} | Tipde`)
    })
  })
})

describe('Navigation', () => {
  it('does not enable global smooth scrolling', () => {
    const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8')
    expect(html).not.toContain('scroll-smooth')
  })

  it('links to favorites in the header and footer', () => {
    expect(navigation.some((item) => item.to === '/favorites/')).toBe(true)
    expect(footerLinks.some((group) => group.links.some((link) => link.to === '/favorites/'))).toBe(true)
  })

  it('uses the requested contact email', () => {
    expect(site.email).toBe('fchattha206@gmail.com')
  })
})

describe('preferences persistence', () => {
  it('reads stored consent on the first render so the banner does not reappear', () => {
    const previous = globalThis.window
    globalThis.window = {
      localStorage: {
        getItem: (key) => (key === 'tipde:consent' ? '"all"' : null),
      },
    }
    try {
      expect(readStoredValue('tipde:consent', null)).toBe('all')
    } finally {
      if (previous === undefined) delete globalThis.window
      else globalThis.window = previous
    }
  })
})

describe('Head scripts', () => {
  it('adds the Google tag with analytics denied until consent', () => {
    const head = renderMetaTags(getRouteMeta('/'))
    expect(head).toContain('https://www.googletagmanager.com/gtm.js?id=G-ES7PV81P28')
    expect(head).toContain("gtag('consent', 'default'")
    expect(head).toContain("analytics_storage: 'denied'")
    expect(head).toContain("gtag('js', new Date())")
  })

  it('adds the monetag verification meta', () => {
    const head = renderMetaTags(getRouteMeta('/'))
    expect(head).toContain('<meta name="monetag" content="c779a9462a921abf9636fcd4e1e40fad" />')
  })
})

describe('Advertising', () => {
  it('configures the Monetag zones and scripts', () => {
    expect(site.monetagZone).toBe('316799')
    expect(site.monetagScriptSrc).toBe('https://quge5.com/88/tag.min.js')
    expect(site.monetagVignetteZone).toBe('12373469')
    expect(site.monetagVignetteScriptSrc).toBe('https://n6wxm.com/vignette.min.js')
  })

  it('builds the exact Monetag vignette script', () => {
    expect(buildVignetteScript()).toBe(
      "(function(s){s.dataset.zone='12373469',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))",
    )
  })

  it('documents consent-gated advertising in the legal pages', () => {
    const privacy = legalPages['privacy-policy'].body.map((block) => block.text).join(' ')
    const cookies = legalPages['cookie-policy'].body.map((block) => block.text).join(' ')
    expect(privacy).toContain('Monetag scripts are loaded only after you accept non-essential cookies')
    expect(cookies).toContain('Choosing Essential only prevents the Monetag script from loading')
  })
})
