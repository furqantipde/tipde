import { useCallback, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage.js'

const FAVORITES_KEY = 'tipde:favorites'
const RECENT_KEY = 'tipde:recent'
const EVENT = 'tipde:tool-storage'

function notify(key, value) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { key, value } }))
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage(FAVORITES_KEY, [])

  useEffect(() => {
    const sync = (event) => {
      if (event.detail.key === FAVORITES_KEY) setFavorites(event.detail.value)
    }
    window.addEventListener(EVENT, sync)
    return () => window.removeEventListener(EVENT, sync)
  }, [setFavorites])

  const toggleFavorite = useCallback(
    (slug) => {
      setFavorites((current) => {
        const list = Array.isArray(current) ? current : []
        const next = list.includes(slug) ? list.filter((item) => item !== slug) : [...list, slug]
        notify(FAVORITES_KEY, next)
        return next
      })
    },
    [setFavorites],
  )

  return { favorites: Array.isArray(favorites) ? favorites : [], toggleFavorite }
}

export function useRecentlyUsed() {
  const [recent, setRecent] = useLocalStorage(RECENT_KEY, [])

  useEffect(() => {
    const sync = (event) => {
      if (event.detail.key === RECENT_KEY) setRecent(event.detail.value)
    }
    window.addEventListener(EVENT, sync)
    return () => window.removeEventListener(EVENT, sync)
  }, [setRecent])

  const recordTool = useCallback(
    (slug) => {
      setRecent((current) => {
        const list = Array.isArray(current) ? current : []
        const next = [slug, ...list.filter((item) => item !== slug)].slice(0, 6)
        notify(RECENT_KEY, next)
        return next
      })
    },
    [setRecent],
  )

  return { recent: Array.isArray(recent) ? recent : [], recordTool }
}
