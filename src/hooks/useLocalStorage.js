import { useCallback, useEffect, useState } from 'react'

export function readStoredValue(key, initialValue) {
  if (typeof window === 'undefined') return initialValue
  try {
    const stored = window.localStorage.getItem(key)
    return stored === null ? initialValue : JSON.parse(stored)
  } catch {
    // Ignore unavailable or malformed storage.
    return initialValue
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStoredValue(key, initialValue))

  useEffect(() => {
    const sync = (event) => {
      if (event.key !== key) return
      try {
        setValue(event.newValue === null ? initialValue : JSON.parse(event.newValue))
      } catch {
        setValue(initialValue)
      }
    }

    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [key])

  const update = useCallback(
    (next) => {
      setValue((previous) => {
        const resolved = typeof next === 'function' ? next(previous) : next
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved))
        } catch {
          // Storage may be disabled; state still updates.
        }
        return resolved
      })
    },
    [key],
  )

  return [value, update]
}
