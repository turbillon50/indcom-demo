'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Mode = 'public' | 'vendedor' | 'admin'

const TABS = {
  public: [
    { href: '/',         icon: 'ti-home',       label: 'Inicio',    exact: true },
    { href: '/catalogo', icon: 'ti-apps',        label: 'Catálogo' },
    { href: '/cotizador',icon: 'ti-file-text',   label: 'Cotizador' },
    { href: '/sign-in',  icon: 'ti-user-circle', label: 'Cuenta' },
  ],
  vendedor: [
    { href: '/app',                    icon: 'ti-home',     label: 'Inicio',     exact: true },
    { href: '/catalogo',               icon: 'ti-apps',     label: 'Catálogo' },
    { href: '/app/cotizaciones',       icon: 'ti-file-text',label: 'Mis cots.' },
    { href: '/app/perfil',             icon: 'ti-user',     label: 'Perfil' },
  ],
  admin: [
    { href: '/admin',                  icon: 'ti-chart-bar',label: 'Dashboard',  exact: true },
    { href: '/admin/cotizaciones',     icon: 'ti-file-text',label: 'Cotizaciones' },
    { href: '/admin/productos',        icon: 'ti-package',  label: 'Catálogo' },
    { href: '/admin/configuracion',    icon: 'ti-settings', label: 'Config' },
  ],
}

export function BottomTab({ mode }: { mode: Mode }) {
  const pathname = usePathname()
  const tabs = TABS[mode]
  const accent = mode === 'admin' ? 'var(--cyan)' : 'var(--violet)'

  return (
    <nav className="bottom-tab">
      <div style={{ height: 'var(--tab-h)', display: 'flex', alignItems: 'stretch' }}>
        {tabs.map(tab => {
          const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href)
          return (
            <Link key={tab.href} href={tab.href} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 3, textDecoration: 'none',
              color: active ? accent : 'var(--txt3)', transition: 'color .2s',
              position: 'relative',
            }}>
              {active && (
                <div style={{ position: 'absolute', top: 0, width: 28, height: 2,
                  background: accent, borderRadius: '0 0 2px 2px' }} />
              )}
              <i className={tab.icon} style={{ fontSize: active ? 22 : 20,
                fontWeight: active ? 600 : 400 }} />
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 400,
                letterSpacing: '.01em' }}>{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
