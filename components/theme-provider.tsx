'use client'
import { useEffect } from 'react'
import { useTheme } from '@/lib/theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    document.body.style.background = theme === 'dark' ? '#0a0814' : '#ffffff'
    document.body.style.color = theme === 'dark' ? '#f0f4ff' : '#0a0c1a'
  }, [theme])
  return <>{children}</>
}
