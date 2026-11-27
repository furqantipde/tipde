function utf8ToBinary(text) {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return binary
}

function binaryToUtf8(binary) {
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
}

export function base64Encode(text) {
  try {
    return { ok: true, value: btoa(utf8ToBinary(text)) }
  } catch (error) {
    return { ok: false, value: '', error: error.message }
  }
}

export function base64Decode(input) {
  const value = String(input || '').trim()
  if (!value) return { ok: true, value: '' }
  if (value.length % 4 !== 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(value)) {
    return { ok: false, value: '', error: 'Invalid Base64 input. Check characters and padding.' }
  }
  try {
    return { ok: true, value: binaryToUtf8(atob(value)) }
  } catch {
    return { ok: false, value: '', error: 'Unable to decode Base64 as UTF-8 text.' }
  }
}

export function urlEncode(text) {
  try {
    return { ok: true, value: encodeURIComponent(text) }
  } catch (error) {
    return { ok: false, value: '', error: error.message }
  }
}

export function urlDecode(text) {
  try {
    return { ok: true, value: decodeURIComponent(text) }
  } catch {
    return { ok: false, value: '', error: 'Invalid percent-encoded sequence.' }
  }
}
