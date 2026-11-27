function randomInt(max) {
  const cryptoObject = globalThis.crypto
  if (!cryptoObject || !cryptoObject.getRandomValues) {
    throw new Error('Cryptographic randomness is not available in this browser.')
  }
  const limit = Math.floor(0x100000000 / max) * max
  const buffer = new Uint32Array(1)
  let value
  do {
    cryptoObject.getRandomValues(buffer)
    value = buffer[0]
  } while (value >= limit)
  return value % max
}

export function uuidv4() {
  const cryptoObject = globalThis.crypto
  if (cryptoObject && typeof cryptoObject.randomUUID === 'function') return cryptoObject.randomUUID()
  const bytes = new Uint8Array(16)
  cryptoObject.getRandomValues(bytes)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export function generateUuids(count) {
  const total = Math.min(100, Math.max(1, Number(count) || 1))
  return Array.from({ length: total }, () => uuidv4())
}

export function generatePassword({
  length = 16,
  lower = true,
  upper = true,
  digits = true,
  symbols = true,
  excludeSimilar = false,
} = {}) {
  const sets = []
  if (lower) sets.push('abcdefghijkmnopqrstuvwxyz')
  if (upper) sets.push('ABCDEFGHJKLMNPQRSTUVWXYZ')
  if (digits) sets.push('23456789')
  if (symbols) sets.push('!@#$%^&*()-_=+[]{}?')

  let charset = sets.join('')
  if (!charset) throw new Error('Select at least one character type.')
  if (excludeSimilar) charset = charset.replace(/[lIO0o1]/g, '')

  const size = Math.min(128, Math.max(4, Number(length) || 16))
  let password = ''

  for (let attempt = 0; attempt < 12; attempt += 1) {
    let candidate = ''
    for (let i = 0; i < size; i += 1) candidate += charset[randomInt(charset.length)]
    const hasAll = sets.every((set) => !set || [...set].some((char) => candidate.includes(char)))
    password = candidate
    if (hasAll) break
  }

  return password
}

export function passwordStrength(password, charsetSize = 70) {
  if (!password) return { score: 0, label: 'Empty', bits: 0 }
  const bits = Math.round(password.length * Math.log2(Math.max(2, charsetSize)))
  if (bits < 40) return { score: 1, label: 'Weak', bits }
  if (bits < 65) return { score: 2, label: 'Fair', bits }
  if (bits < 90) return { score: 3, label: 'Strong', bits }
  return { score: 4, label: 'Very strong', bits }
}
