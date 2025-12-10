'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  // Toujours 'light' côté serveur pour éviter hydration mismatch
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Charger la préférence depuis localStorage après montage
    const saved = localStorage.getItem('theme')
    if (saved && saved !== theme) {
      setTheme(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
