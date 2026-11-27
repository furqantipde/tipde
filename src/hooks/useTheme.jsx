import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from './useLocalStorage.js'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

export function ThemeProvider({ children }) {
  const [storedTheme, setStoredTheme] = useLocalStorage('tipde:theme', 'light')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const preferred = storedTheme === 'dark' ? 'dark' : 'light'
    setTheme(preferred)
    document.documentElement.classList.toggle('dark', preferred === 'dark')
  }, [storedTheme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setStoredTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [theme, setStoredTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
