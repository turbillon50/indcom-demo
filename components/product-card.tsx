'use client'
import { useStore } from '@/lib/store'
import { CAT_META } from '@/lib/data'
import type { Producto } from '@/lib/data'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Ripple helper
function ripple(e: React.MouseEvent, color: string) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const span = document.createElement('span')
  span.style.cssText = `position:absolute;width:6px;height:6px;border-radius:50%;
    background:${color};opacity:.4;left:${e.clientX-rect.left-3}px;
    top:${e.clientY-rect.top-3}px;pointer-events:none;animation:ripple .5s ease-out forwards;`
  el.appendChild(span)
  setTimeout(() => span.remove(), 550)
}

export function ProductCard({ p }: { p: Producto }) {
  const add = useStore(s => s.addCarrito)
  const meta = CAT_META[p.categoria] ?? { color: 'var(--violet)', icon: 'ti-package' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: .35, ease: [.22,1,.36,1] }}
      style={{ background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
      <Link href={'/producto/' + p.id} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{ height: 110, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 6,
          background: meta.color + '10' }}>
          <i className={meta.icon} style={{ fontSize: 38, color: meta.color }} />
          <span style={{ fontSize: 9, fontWeight: 600, color: meta.color + 'bb',
            textTransform: 'uppercase', letterSpacing: '.8px' }}>{p.marca}</span>
        </div>
      </Link>
      <div style={{ padding: '12px 12px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: meta.color,
            background: meta.color + '15', padding: '2px 7px', borderRadius: 6 }}>
            {p.categoria.split(' ')[0]}
          </span>
          <span style={{ fontSize: 9, color: 'var(--txt3)', fontFamily: 'monospace' }}>{p.sku}</span>
        </div>
        <Link href={'/producto/' + p.id} style={{ textDecoration: 'none' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt)', lineHeight: 1.4,
            marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.nombre}</p>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)',
            letterSpacing: '-0.5px', fontFeatureSettings: "'tnum'" }}>
            ${p.precio.toLocaleString('es-MX')}
          </span>
          <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 6,
            color: p.stock > 10 ? 'var(--green)' : p.stock > 0 ? 'var(--gold)' : 'var(--red)',
            background: p.stock > 10 ? 'rgba(16,185,129,.12)' : p.stock > 0
              ? 'rgba(251,191,36,.12)' : 'rgba(248,113,113,.12)' }}>
            {p.stock > 0 ? p.stock + ' uds' : 'Agotado'}
          </span>
        </div>
        <motion.button
          whileTap={{ scale: .96 }}
          onClick={e => {
            ripple(e, meta.color)
            add({ id: p.id, nombre: p.nombre, precio: p.precio })
            // toast via global sonner
          }}
          style={{ width: '100%', height: 38, background: meta.color, color: 'white',
            fontWeight: 700, fontSize: 12, borderRadius: 11, border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 6, position: 'relative', overflow: 'hidden' }}>
          <i className="ti ti-plus" style={{ fontSize: 14 }} />
          Cotizar
        </motion.button>
      </div>
    </motion.div>
  )
}
