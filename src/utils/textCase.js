function toWords(input) {
  return String(input ?? '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
}

export function convertCase(text, style = 'camel') {
  const value = String(text ?? '')

  if (style === 'lowercase') return value.toLowerCase()
  if (style === 'uppercase') return value.toUpperCase()
  if (style === 'title') return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())

  const words = toWords(value)
  const lower = words.map((word) => word.toLowerCase())
  const upper = words.map((word) => word.toUpperCase())
  const capitalized = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

  switch (style) {
    case 'camel':
      return lower.map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))).join('')
    case 'pascal':
      return capitalized.join('')
    case 'snake':
      return lower.join('_')
    case 'kebab':
      return lower.join('-')
    case 'constant':
      return upper.join('_')
    default:
      return value
  }
}
