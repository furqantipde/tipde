export const tools = [
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'json-tools',
    icon: '{ }',
    short: 'Format, beautify, minify and validate JSON instantly.',
    description:
      'Paste JSON into the editor and format it with the indentation you prefer. The tool validates your input as you type, shows the exact position of syntax errors and can minify valid JSON for compact storage. Everything runs locally in your browser, so your data never leaves your device.',
    keywords: ['json formatter', 'json beautifier', 'json validator', 'minify json', 'pretty print json'],
    example: '{"name":"Tipde","tools":10,"active":true,"tags":["json","free"]}',
    instructions: [
      'Paste or type your JSON into the input box, or load the example.',
      'Choose an indentation size and press Format to beautify the data.',
      'Use Minify to remove unnecessary whitespace, or Validate to check syntax.',
      'Copy or download the result when it looks right.',
    ],
    faqs: [
      {
        q: 'Is my JSON uploaded to a server?',
        a: 'No. Formatting and validation happen entirely in your browser using JavaScript. Nothing is uploaded.',
      },
      {
        q: 'Why does the tool report an error?',
        a: 'JSON is strict: property names and strings need double quotes, trailing commas are not allowed, and comments are not supported. The error message shows the position to check.',
      },
      {
        q: 'Can I format very large JSON files?',
        a: 'Yes for typical files. Extremely large documents may depend on your device memory, but no server limit is applied.',
      },
    ],
    related: ['html-formatter', 'base64-encoder-decoder', 'url-encoder-decoder'],
    featured: true,
    added: '2026-11-20',
  },
  {
    slug: 'html-formatter',
    name: 'HTML Formatter',
    category: 'html-tools',
    icon: '</>',
    short: 'Beautify messy HTML with consistent, readable indentation.',
    description:
      'Turn compressed or badly indented HTML into clean, readable markup. The formatter understands nested elements, inline text, comments and void tags, and lets you choose two, four or tab indentation. It works offline in your browser and keeps your markup intact.',
    keywords: ['html formatter', 'html beautifier', 'format html online', 'html prettifier'],
    example: '<div class="card"><h2>Hello</h2><p>Welcome to Tipde.</p></div>',
    instructions: [
      'Paste HTML into the input field or insert the example.',
      'Select your preferred indentation and press Format HTML.',
      'Review the output, then copy or download it.',
    ],
    faqs: [
      {
        q: 'Does the formatter change my HTML?',
        a: 'It only changes whitespace between tags. Attributes, text and element order are preserved.',
      },
      {
        q: 'Does it support HTML comments?',
        a: 'Yes. Comments are kept and indented along with the surrounding markup.',
      },
      {
        q: 'Is the HTML sent anywhere?',
        a: 'No. All work is done locally in the browser.',
      },
    ],
    related: ['css-minifier', 'json-formatter', 'url-encoder-decoder'],
    featured: true,
    added: '2026-11-21',
  },
  {
    slug: 'css-minifier',
    name: 'CSS Minifier',
    category: 'css-tools',
    icon: '#',
    short: 'Compress CSS by removing comments and unnecessary whitespace.',
    description:
      'Reduce stylesheet size by safely stripping comments and redundant whitespace while leaving strings, URLs and values untouched. Ideal for preparing CSS before deployment. Processing is completely client-side.',
    keywords: ['css minifier', 'minify css', 'compress css', 'css optimizer'],
    example: '/* Card styles */\n.card {\n  color: #fff;\n  padding: 16px;\n}',
    instructions: [
      'Paste your CSS into the input editor.',
      'Press Minify CSS to produce a compact stylesheet.',
      'Copy or download the optimized output.',
    ],
    faqs: [
      {
        q: 'Will minification break my CSS?',
        a: 'The tool preserves strings, URLs and numbers, and only removes comments and whitespace that are safe to remove.',
      },
      {
        q: 'Can I keep important comments?',
        a: 'Keep the "keep important comments" option enabled to preserve comments starting with /*! such as license headers.',
      },
      {
        q: 'Does it process CSS locally?',
        a: 'Yes, the code never leaves your browser.',
      },
    ],
    related: ['javascript-minifier', 'html-formatter', 'word-counter'],
    featured: true,
    added: '2026-11-22',
  },
  {
    slug: 'javascript-minifier',
    name: 'JavaScript Minifier',
    category: 'javascript-tools',
    icon: 'JS',
    short: 'Minify JavaScript safely with useful error reporting.',
    description:
      'Shrink JavaScript source using the battle-tested Terser engine. The library is loaded only when you run the tool, and mangling and compression options let you choose how aggressive the output should be. Errors are reported clearly instead of silently producing broken code.',
    keywords: ['javascript minifier', 'js minifier', 'minify javascript', 'compress js'],
    example: 'function greet(name) {\n  // Say hello\n  return "Hello, " + name;\n}\nconsole.log(greet("Tipde"));',
    instructions: [
      'Paste JavaScript into the input editor.',
      'Choose whether to mangle variable names and compress code.',
      'Press Minify JavaScript and review the result.',
    ],
    faqs: [
      {
        q: 'Which engine powers this tool?',
        a: 'It uses Terser, a widely used JavaScript minifier, loaded on demand in your browser.',
      },
      {
        q: 'Why did minification fail?',
        a: 'The source likely contains a syntax error. Fix the reported problem and try again.',
      },
      {
        q: 'Can minified code change behaviour?',
        a: 'Aggressive mangling can affect code that relies on Function.prototype.toString or eval. Disable mangling if your code depends on those features.',
      },
    ],
    related: ['css-minifier', 'json-formatter', 'word-counter'],
    featured: false,
    added: '2026-11-23',
  },
  {
    slug: 'base64-encoder-decoder',
    name: 'Base64 Encoder / Decoder',
    category: 'encoding-decoding',
    icon: '⇄',
    short: 'Encode and decode UTF-8 text with Base64, locally and instantly.',
    description:
      'Convert text to Base64 and back again with full UTF-8 support for emojis and non-Latin scripts. Both directions are handled in the browser, and invalid Base64 input produces a clear error instead of garbled output.',
    keywords: ['base64 encoder', 'base64 decoder', 'encode base64 utf-8', 'decode base64 online'],
    example: 'Hello, Tipde! 👋',
    instructions: [
      'Enter text or Base64 in the input area.',
      'Choose Encode or Decode and run the tool.',
      'Copy the output for use in your project.',
    ],
    faqs: [
      {
        q: 'Does it support Unicode and emoji?',
        a: 'Yes. Text is converted with UTF-8 before encoding, so characters outside ASCII work correctly.',
      },
      {
        q: 'What if decoding fails?',
        a: 'The tool checks the input and reports malformed Base64 or invalid UTF-8 instead of showing broken text.',
      },
      {
        q: 'Can I decode image data?',
        a: 'This tool is designed for text. Binary files should be handled with a dedicated file encoder.',
      },
    ],
    related: ['url-encoder-decoder', 'json-formatter', 'uuid-generator'],
    featured: true,
    added: '2026-11-24',
  },
  {
    slug: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    category: 'encoding-decoding',
    icon: '%',
    short: 'Safely encode and decode URL components and query strings.',
    description:
      'Escape special characters in URL components or decode percent-encoded strings back to readable text. Useful for query parameters, slugs and API values. Everything happens locally with standard JavaScript APIs.',
    keywords: ['url encoder', 'url decoder', 'encode uri component', 'percent encoding'],
    example: 'https://tipde.online/tools/?q=hello world&lang=en',
    instructions: [
      'Paste a URL, query string or encoded value.',
      'Select Encode or Decode and run the tool.',
      'Copy the result into your code or browser.',
    ],
    faqs: [
      {
        q: 'Should I encode a whole URL?',
        a: 'Use encodeURI for full URLs and encodeURIComponent for individual parameters. This tool uses encodeURIComponent, which is usually what query values need.',
      },
      {
        q: 'Why do spaces become %20?',
        a: 'Percent encoding replaces unsafe characters with a percent sign followed by a hexadecimal code. Space becomes %20.',
      },
      {
        q: 'What happens with invalid percent sequences?',
        a: 'Decoding reports an error so you can correct the input.',
      },
    ],
    related: ['base64-encoder-decoder', 'json-formatter', 'html-formatter'],
    featured: true,
    added: '2026-11-25',
  },
  {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    category: 'code-generators',
    icon: '✦',
    short: 'Generate random UUID v4 values, one at a time or in bulk.',
    description:
      'Create standards-compliant version 4 UUIDs using the browser cryptographic random number generator. Generate up to 100 identifiers at once, copy the whole list with one click, or download it as a text file.',
    keywords: ['uuid generator', 'guid generator', 'uuid v4', 'random uuid'],
    example: '',
    instructions: [
      'Choose how many UUIDs you need (1 to 100).',
      'Press Generate to create them.',
      'Copy an individual value or download all of them.',
    ],
    faqs: [
      {
        q: 'Are these UUIDs secure?',
        a: 'They are generated with crypto.randomUUID when available, otherwise with crypto.getRandomValues. Both use your browser cryptographic source.',
      },
      {
        q: 'Which version are they?',
        a: 'Version 4, meaning the identifiers are randomly generated.',
      },
      {
        q: 'Can I generate thousands at once?',
        a: 'This tool is capped at 100 per batch to keep the interface responsive.',
      },
    ],
    related: ['password-generator', 'base64-encoder-decoder', 'timestamp-converter'],
    featured: false,
    added: '2026-11-26',
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'code-generators',
    icon: '🔒',
    short: 'Create strong random passwords with configurable character sets.',
    description:
      'Generate passwords with a cryptographically secure random source. Set the length, include uppercase, lowercase, digits and symbols, and exclude look-alike characters. A live strength estimate helps you pick a suitable password.',
    keywords: ['password generator', 'strong password', 'random password', 'secure password'],
    example: '',
    instructions: [
      'Set your preferred password length and character options.',
      'Press Generate password.',
      'Use the strength indicator, then copy the result.',
    ],
    faqs: [
      {
        q: 'Is the password stored anywhere?',
        a: 'No. It exists only in your browser memory until you clear or replace it.',
      },
      {
        q: 'What makes a password strong?',
        a: 'Length and randomness matter most. This tool uses crypto.getRandomValues rather than Math.random.',
      },
      {
        q: 'Should I reuse generated passwords?',
        a: 'No. Use a unique password for every account, ideally with a password manager.',
      },
    ],
    related: ['uuid-generator', 'word-counter', 'base64-encoder-decoder'],
    featured: true,
    added: '2026-11-27',
  },
  {
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'testing-validation',
    icon: '≡',
    short: 'Count words, characters, sentences and paragraphs as you type.',
    description:
      'A live text analyzer for writers and developers. See words, characters with and without spaces, sentences, paragraphs and an estimated reading time. Nothing is stored or transmitted.',
    keywords: ['word counter', 'character counter', 'sentence counter', 'reading time calculator'],
    example: 'Developer tools. Made simple.\nTipde is free and works in your browser.',
    instructions: [
      'Type or paste text into the editor.',
      'The counts update instantly as you type.',
      'Use Clear to start again.',
    ],
    faqs: [
      {
        q: 'How are words counted?',
        a: 'Words are sequences of characters separated by whitespace, matching the common expectation for prose.',
      },
      {
        q: 'Is my text saved?',
        a: 'No. The counter runs entirely in your browser and does not store your text.',
      },
      {
        q: 'How is reading time calculated?',
        a: 'It uses a typical reading speed of 200 words per minute as a rough estimate.',
      },
    ],
    related: ['timestamp-converter', 'json-formatter', 'css-minifier'],
    featured: false,
    added: '2026-11-28',
  },
  {
    slug: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    category: 'testing-validation',
    icon: '◷',
    short: 'Convert Unix timestamps to dates and dates back to timestamps.',
    description:
      'Convert between Unix timestamps in seconds or milliseconds and human-readable dates. See local and UTC representations, inspect the current timestamp, and work with ISO 8601 values without sending data anywhere.',
    keywords: ['unix timestamp converter', 'epoch converter', 'timestamp to date', 'date to timestamp'],
    example: '1700000000',
    instructions: [
      'Enter a Unix timestamp or choose a date.',
      'Select whether the timestamp is in seconds or milliseconds.',
      'Read the converted local and UTC values below.',
    ],
    faqs: [
      {
        q: 'What is a Unix timestamp?',
        a: 'It is the number of seconds that have passed since 1 January 1970 00:00:00 UTC, excluding leap seconds.',
      },
      {
        q: 'Seconds or milliseconds?',
        a: 'Unix timestamps are usually in seconds; JavaScript uses milliseconds. Switch the unit if your value has 13 digits.',
      },
      {
        q: 'Why do local and UTC times differ?',
        a: 'A timestamp is a single moment in time, but the clock display depends on the viewer time zone. Both are shown for clarity.',
      },
    ],
    related: ['word-counter', 'uuid-generator', 'json-formatter'],
    featured: false,
    added: '2026-11-29',
  },
]

export const featuredTools = tools.filter((tool) => tool.featured)
export const newestTools = [...tools].sort((a, b) => b.added.localeCompare(a.added)).slice(0, 6)

export function getTool(slug) {
  return tools.find((tool) => tool.slug === slug)
}

export function toolsForCategory(slug) {
  return tools.filter((tool) => tool.category === slug)
}

export function searchTools(query, category = 'all') {
  const needle = String(query || '').trim().toLowerCase()
  return tools.filter((tool) => {
    const inCategory = category === 'all' || tool.category === category
    if (!inCategory) return false
    if (!needle) return true
    const haystack = [tool.name, tool.short, tool.description, ...tool.keywords].join(' ').toLowerCase()
    return haystack.includes(needle)
  })
}
