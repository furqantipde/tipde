function pad(value) {
  return String(value).padStart(2, '0')
}

function toLocalInput(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export function currentTimestamp(unit = 'seconds') {
  const ms = Date.now()
  return unit === 'milliseconds' ? ms : Math.floor(ms / 1000)
}

export function timestampToDate(input, unit = 'seconds') {
  const raw = Number(String(input || '').trim())
  if (!String(input || '').trim() || !Number.isFinite(raw)) {
    return { ok: false, error: 'Enter a numeric Unix timestamp.' }
  }
  const ms = unit === 'milliseconds' ? raw : raw * 1000
  const date = new Date(ms)
  if (Number.isNaN(date.getTime())) return { ok: false, error: 'That timestamp is outside the supported date range.' }
  return {
    ok: true,
    value: {
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      localInput: toLocalInput(date),
      milliseconds: date.getTime(),
      seconds: Math.floor(date.getTime() / 1000),
    },
  }
}

export function dateToTimestamp(input) {
  if (!input) return { ok: false, error: 'Choose a date and time.' }
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return { ok: false, error: 'That date could not be parsed.' }
  return { ok: true, value: { seconds: Math.floor(date.getTime() / 1000), milliseconds: date.getTime() } }
}
