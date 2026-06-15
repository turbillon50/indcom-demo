'use client'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

const LABELS: Record<string, string> = {
  '/app': 'Mi Panel', '/app/cotizaciones': 'Mis Cotizaciones',
  '/app/nueva-cotizacion': 'Nueva Cotización', '/app/perfil': 'Perfil',
}

export function VendorTopNav() {
  const pathname = usePathname()
  const label = Object.entries(LABELS).find(([k]) => pathname === k)?.[1] ?? 'Panel'
  return (
    <header className="top-nav">
      <div style={{ height: 'var(--nav-h)', display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, color: 'var(--txt3)', fontWeight: 500 }}>Luis Herrera</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--txt)' }}>{label}</p>
        </div>
        <ThemeToggle size={16} />
        <img src="https://pravatar.cc/150?img=32"
          style={{ width: 34, height: 34, borderRadius: 11,
            border: '1.5px solid rgba(124,58,237,.4)' }} alt="vendor" />
      </div>
    </header>
  )
}
