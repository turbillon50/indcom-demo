'use client'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'

const LABELS: Record<string, string> = {
  '/admin': 'Dashboard', '/admin/cotizaciones': 'Cotizaciones',
  '/admin/productos': 'Catálogo', '/admin/clientes': 'Clientes',
  '/admin/equipo': 'Equipo', '/admin/configuracion': 'Configuración',
}

export function AdminTopNav() {
  const pathname = usePathname()
  const label = Object.entries(LABELS).find(([k]) => pathname === k || pathname.startsWith(k + '/'))?.[1] ?? 'Admin'
  return (
    <header className="top-nav">
      <div style={{ height: 'var(--nav-h)', display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 10 }}>
        <Logo size={14} />
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--cyan)',
          background: 'rgba(34,211,238,.1)', border: '1px solid rgba(34,211,238,.2)',
          borderRadius: 8, padding: '2px 8px' }}>Admin</span>
        <span style={{ flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 700,
          color: 'var(--txt)' }}>{label}</span>
        <ThemeToggle size={16} />
        <img src="https://pravatar.cc/150?img=50"
          style={{ width: 32, height: 32, borderRadius: 10,
            border: '1.5px solid rgba(34,211,238,.3)' }} alt="admin" />
      </div>
    </header>
  )
}
