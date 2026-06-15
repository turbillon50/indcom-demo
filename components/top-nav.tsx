'use client'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'

export function TopNav() {
  const carrito = useStore(s => s.carrito)
  const total = carrito.reduce((a, c) => a + c.qty, 0)
  const [q, setQ] = useState('')
  const router = useRouter()

  return (
    <header className="top-nav">
      <div style={{ height: 'var(--nav-h)', display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <Logo size={18} />
        </Link>
        <div style={{ flex: 1, position: 'relative' }}>
          <i className="ti ti-search" style={{ position: 'absolute', left: 10,
            top: '50%', transform: 'translateY(-50%)', color: 'var(--txt3)', fontSize: 15 }} />
          <input value={q} onChange={e => setQ(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && router.push('/catalogo?q=' + q)}
            placeholder="Buscar producto, SKU..."
            style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
              fontSize: 14, color: 'var(--txt)', outline: 'none' }} />
        </div>
        <ThemeToggle size={18} />
        <Link href="/cotizador" style={{ position: 'relative', color: 'var(--txt2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 40, height: 40, borderRadius: 12, border: '1px solid var(--border)',
          background: 'var(--surface)', textDecoration: 'none' }}>
          <i className="ti ti-shopping-cart" style={{ fontSize: 18 }} />
          {total > 0 && (
            <span style={{ position: 'absolute', top: 4, right: 4, background: 'var(--violet)',
              color: 'white', fontSize: 9, fontWeight: 700, width: 16, height: 16,
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {total}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
