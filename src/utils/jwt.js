function base64UrlToUtf8(part) {
  const normalized = String(part).replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
}

export function decodeJwt(token) {
  const value = String(token ?? '').trim()
  const parts = value.split('.')

  if (parts.length !== 3 || parts.slice(0, 2).some((part) => !part)) {
    return { ok: false, error: 'A JWT must have three non-empty, dot-separated parts.' }
  }

  try {
    const header = JSON.parse(base64UrlToUtf8(parts[0]))
    const payload = JSON.parse(base64UrlToUtf8(parts[1]))
    return { ok: true, header, payload, signature: parts[2] }
  } catch {
    return { ok: false, error: 'Unable to decode the header or payload. Check that this is a valid JWT.' }
  }
}

export function prettyJson(value) {
  return JSON.stringify(value, null, 2)
}
