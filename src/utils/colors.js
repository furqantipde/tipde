function toRgbObject(red, green, blue) {
  return { r: red, g: green, b: blue }
}

export function normalizeHex(input) {
  let hex = String(input ?? '').trim().replace(/^#/, '')

  if (/^[0-9a-f]{3}$/i.test(hex)) {
    hex = hex.split('').map((char) => char + char).join('')
  }

  if (!/^[0-9a-f]{6}$/i.test(hex)) {
    return { ok: false, error: 'Use a 3- or 6-digit hex color such as #1e40af.' }
  }

  return {
    ok: true,
    hex: `#${hex.toLowerCase()}`,
    rgb: toRgbObject(parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)),
  }
}

export function hexToRgb(input) {
  const parsed = normalizeHex(input)
  if (!parsed.ok) return parsed
  return {
    ok: true,
    value: `rgb(${parsed.rgb.r}, ${parsed.rgb.g}, ${parsed.rgb.b})`,
    hex: parsed.hex,
    rgb: parsed.rgb,
  }
}

export function rgbToHex(input) {
  const value = String(input ?? '').trim()
  const match = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)$/i.exec(value)

  if (!match) {
    return { ok: false, error: 'Use RGB format such as rgb(30, 64, 175).' }
  }

  const [r, g, b] = match.slice(1, 4).map(Number)
  if ([r, g, b].some((channel) => channel > 255)) {
    return { ok: false, error: 'RGB channels must be between 0 and 255.' }
  }

  const hex = `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
  return { ok: true, value: hex, hex, rgb: toRgbObject(r, g, b) }
}
