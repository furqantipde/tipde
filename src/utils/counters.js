export function countText(input) {
  const text = String(input || '')
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter((part) => part.trim()).length : 0
  const paragraphs = text.trim() ? text.split(/\n\s*\n+/).filter((part) => part.trim()).length : 0
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const readingMinutes = words ? Math.max(1, Math.ceil(words / 200)) : 0

  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingMinutes }
}
