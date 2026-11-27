export const categories = [
  {
    slug: 'json-tools',
    name: 'JSON Tools',
    description: 'Format, validate, beautify and minify JSON data with clear error messages.',
    icon: '{ }',
  },
  {
    slug: 'html-tools',
    name: 'HTML Tools',
    description: 'Clean and format HTML markup so it is easy to read and maintain.',
    icon: '</>',
  },
  {
    slug: 'css-tools',
    name: 'CSS Tools',
    description: 'Compress and optimize stylesheets without changing how they work.',
    icon: '#',
  },
  {
    slug: 'javascript-tools',
    name: 'JavaScript Tools',
    description: 'Minify and prepare JavaScript for production delivery.',
    icon: 'JS',
  },
  {
    slug: 'encoding-decoding',
    name: 'Encoding & Decoding',
    description: 'Encode and decode text and URL components safely in your browser.',
    icon: '⇄',
  },
  {
    slug: 'code-generators',
    name: 'Code Generators',
    description: 'Generate unique identifiers and strong random passwords locally.',
    icon: '✦',
  },
  {
    slug: 'testing-validation',
    name: 'Testing & Validation',
    description: 'Measure and inspect text and time values while you work.',
    icon: '✓',
  },
  {
    slug: 'seo-utilities',
    name: 'SEO Developer Utilities',
    description: 'Small utilities that support search-friendly development workflows.',
    icon: '↗',
  },
  {
    slug: 'document-tools',
    name: 'Document Tools',
    description: 'Convert, combine and compress PDFs and images directly in your browser.',
    icon: 'PDF',
  },
]

export function getCategory(slug) {
  return categories.find((category) => category.slug === slug)
}
