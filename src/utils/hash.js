const SUPPORTED_ALGORITHMS = new Set(['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'])

export const hashAlgorithms = [...SUPPORTED_ALGORITHMS]

export async function hashText(text, algorithm = 'SHA-256') {
  const cryptoObject = globalThis.crypto
  if (!cryptoObject || !cryptoObject.subtle) {
    return { ok: false, error: 'Web Crypto is not available in this browser.' }
  }
  if (!SUPPORTED_ALGORITHMS.has(algorithm)) {
    return { ok: false, error: 'Choose a supported hash algorithm.' }
  }

  try {
    const bytes = new TextEncoder().encode(String(text ?? ''))
    const digest = await cryptoObject.subtle.digest(algorithm, bytes)
    const value = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
    return { ok: true, value }
  } catch (error) {
    return { ok: false, error: error.message || 'Hashing failed.' }
  }
}
