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
  {
    slug: 'pdf-to-word',
    name: 'PDF to Word',
    category: 'document-tools',
    icon: 'PDF',
    short: 'Convert PDF pages into an editable DOCX document.',
    description:
      'Extract selectable text from a PDF and build an editable Word document entirely in your browser. The tool groups text into lines and paragraphs, keeps page breaks, and produces a standard DOCX file you can download immediately. Nothing is uploaded, and complex layouts are simplified into clean editable text.',
    keywords: ['pdf to word', 'pdf to docx', 'convert pdf to word', 'pdf to editable document'],
    example: '',
    instructions: [
      'Choose a PDF file with selectable text.',
      'Press Convert to Word and wait while each page is read locally.',
      'Download the generated DOCX file and edit it in your word processor.',
    ],
    faqs: [
      {
        q: 'Will the Word document look exactly like the PDF?',
        a: 'No. The converter extracts text and rebuilds it as simple paragraphs with page breaks. Complex layouts, columns and decorative graphics are simplified.',
      },
      {
        q: 'Can it convert scanned PDFs?',
        a: 'Not directly. Scanned pages contain images rather than selectable text, so they need OCR first. The tool reports when no selectable text is found.',
      },
      {
        q: 'Is my PDF uploaded?',
        a: 'No. PDF parsing and DOCX creation both run in your browser. The file never leaves your device.',
      },
    ],
    related: ['pdf-to-jpg', 'compress-pdf', 'merge-pdf'],
    featured: true,
    added: '2026-11-30',
  },
  {
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    category: 'document-tools',
    icon: 'PDF',
    short: 'Combine JPG and PNG images into one PDF document.',
    description:
      'Turn photos, screenshots and scanned pages into a single PDF without uploading them. Add images in any order, choose A4 or US Letter, set the margin, and let the tool fit each image on its own page. Landscape images automatically get landscape pages.',
    keywords: ['jpg to pdf', 'image to pdf', 'convert jpg to pdf', 'png to pdf', 'photos to pdf'],
    example: '',
    instructions: [
      'Add one or more JPG or PNG images, or drag them into the upload area.',
      'Use the arrows to arrange the page order.',
      'Choose a page size and margin, then press Create PDF.',
      'Download the finished PDF.',
    ],
    faqs: [
      {
        q: 'Which image formats are supported?',
        a: 'JPG and PNG files are supported. Both formats are embedded directly, so quality is preserved.',
      },
      {
        q: 'Can I control the page order?',
        a: 'Yes. Use the up and down arrows beside each image to reorder it before creating the PDF.',
      },
      {
        q: 'Are my images uploaded anywhere?',
        a: 'No. Images are read locally and the PDF is built in your browser.',
      },
    ],
    related: ['merge-pdf', 'pdf-to-jpg', 'compress-pdf'],
    featured: true,
    added: '2026-12-01',
  },
  {
    slug: 'compress-pdf',
    name: 'Compress PDF',
    category: 'document-tools',
    icon: 'PDF',
    short: 'Reduce PDF file size without uploading it.',
    description:
      'Shrink PDF files with two browser-side modes. Structure mode rebuilds PDF objects while keeping text and vector content. Strong mode renders each page as a JPEG for a much smaller file. Tipde compares the result with the original and keeps whichever is smaller.',
    keywords: ['compress pdf', 'reduce pdf size', 'pdf compressor', 'shrink pdf', 'optimize pdf'],
    example: '',
    instructions: [
      'Choose a PDF file.',
      'Select Structure only to preserve text, or Strong for the smallest file.',
      'For Strong mode, adjust render scale and JPEG quality.',
      'Press Compress PDF and download the result.',
    ],
    faqs: [
      {
        q: 'Which compression mode should I use?',
        a: 'Use Structure only when you need selectable text and vectors. Use Strong when file size matters most and image-based pages are acceptable.',
      },
      {
        q: 'Will compression always make the file smaller?',
        a: 'Not always. Some PDFs are already optimized. If the result is larger, Tipde keeps the original file instead.',
      },
      {
        q: 'Does Strong mode keep text selectable?',
        a: 'No. Strong mode rasterizes pages into JPEG images, so text becomes part of the image. Structure mode keeps selectable text.',
      },
    ],
    related: ['merge-pdf', 'pdf-to-word', 'pdf-to-jpg'],
    featured: true,
    added: '2026-12-02',
  },
  {
    slug: 'merge-pdf',
    name: 'Merge PDF',
    category: 'document-tools',
    icon: 'PDF',
    short: 'Combine multiple PDF files into one document.',
    description:
      'Join two or more PDFs into a single file, in the order you choose. Add files, rearrange them with the arrow controls, and download the merged document. All pages are copied locally in your browser with no upload and no file size limit imposed by Tipde.',
    keywords: ['merge pdf', 'combine pdf', 'join pdf files', 'pdf merger'],
    example: '',
    instructions: [
      'Add two or more PDF files.',
      'Use the arrows to arrange them in the order you want.',
      'Press Merge PDFs.',
      'Download the combined document.',
    ],
    faqs: [
      {
        q: 'Can I merge many PDFs at once?',
        a: 'Yes. Add as many files as you need, as long as your device has enough memory to process them.',
      },
      {
        q: 'Are bookmarks and form fields preserved?',
        a: 'Pages and their visible content are preserved. Bookmarks, form data and document-level scripts are not merged.',
      },
      {
        q: 'What if a PDF is encrypted?',
        a: 'Encrypted files usually cannot be read by the browser PDF library. Remove the protection first, then try again.',
      },
    ],
    related: ['jpg-to-pdf', 'compress-pdf', 'pdf-to-jpg'],
    featured: false,
    added: '2026-12-03',
  },
  {
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG',
    category: 'document-tools',
    icon: 'PDF',
    short: 'Export PDF pages as downloadable JPG images.',
    description:
      'Render PDF pages into high-quality JPG images with the size and quality you choose. Download every page at once in a ZIP archive, or grab individual pages one by one. Rendering happens locally in your browser, so your documents stay private.',
    keywords: ['pdf to jpg', 'pdf to image', 'convert pdf to jpg', 'pdf pages to jpeg', 'pdf to pictures'],
    example: '',
    instructions: [
      'Choose a PDF file.',
      'Select an image size and JPEG quality.',
      'Press Convert to JPG.',
      'Download the ZIP archive or individual page images.',
    ],
    faqs: [
      {
        q: 'What image size will I get?',
        a: 'Standard is 1× the PDF page size, High is 1.5× and Very high is 2×. Higher sizes produce sharper images and larger files.',
      },
      {
        q: 'Can I download a single page?',
        a: 'Yes. After conversion, each rendered page has its own download button below the ZIP download.',
      },
      {
        q: 'Is the PDF uploaded?',
        a: 'No. Pages are rendered with a local PDF engine and exported as images in your browser.',
      },
    ],
    related: ['jpg-to-pdf', 'compress-pdf', 'pdf-to-word'],
    featured: false,
    added: '2026-12-04',
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
