'use client'
import { useTheme } from '@/lib/theme'

export function ThemeToggle({ size = 20 }: { size?: number }) {
  const { theme, toggle } = useTheme()
  return (
    <button onClick={toggle}
      style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--border)',
        background: 'var(--surface)', color: 'var(--txt2)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>
      <i className={theme === 'dark' ? 'ti ti-sun' : 'ti ti-moon'} style={{ fontSize: size }} />
    </button>
  )
}
