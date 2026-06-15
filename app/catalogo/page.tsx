'use client'
import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { PRODUCTOS, CATEGORIAS, MARCAS, CAT_META } from '@/lib/data'
import { ProductCard } from '@/components/product-card'
import { TopNav } from '@/components/top-nav'
import { BottomTab } from '@/components/bottom-tab'

function Content() {
  const params = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [cat, setCat] = useState(params.get('cat') || '')
  const [marca, setMarca] = useState('')

  const filtered = useMemo(() => PRODUCTOS.filter(p => {
    const mQ = !q || p.nombre.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()) || p.marca.toLowerCase().includes(q.toLowerCase())
    const mC = !cat || p.categoria === cat
    const mM = !marca || p.marca === marca
    return mQ && mC && mM
  }), [q, cat, marca])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      <TopNav />
      <main className="page-content">
        {/* Chips de categoría */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 16px 0',
          scrollbarWidth: 'none' }}>
          {[{ id: '', label: 'Todas', color: 'var(--violet)' },
            ...CATEGORIAS.map(c => ({ id: c, label: c.split(' ')[0], color: CAT_META[c]?.color ?? 'var(--violet)' }))
          ].map(c => {
            const active = cat === c.id
            return (
              <button key={c.id} onClick={() => setCat(c.id)} style={{
                flexShrink: 0, padding: '7px 14px', borderRadius: 20,
                border: `1px solid ${active ? c.color : 'var(--border)'}`,
                background: active ? c.color + '20' : 'var(--surface)',
                color: active ? c.color : 'var(--txt3)',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>{c.label}</button>
            )
          })}
        </div>
        {/* Count + limpiar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '10px 16px' }}>
          <span style={{ fontSize: 12, color: 'var(--txt3)' }}>{filtered.length} productos</span>
          {(cat || marca || q) && (
            <button onClick={() => { setCat(''); setMarca(''); setQ('') }}
              style={{ fontSize: 12, color: 'var(--red)', background: 'none', border: 'none',
                cursor: 'pointer', fontWeight: 600 }}>
              <i className="ti ti-x" /> Limpiar
            </button>
          )}
        </div>
        {/* Grid */}
        <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          {filtered.length === 0
            ? <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: 'var(--txt3)' }}>
                <i className="ti ti-search-off" style={{ fontSize: 44, display: 'block', marginBottom: 12, opacity: .4 }} />
                <p>Sin resultados</p>
              </div>
            : filtered.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i < 8 ? i * .04 : 0, duration: .3 }}>
                  <ProductCard p={p} />
                </motion.div>
              ))}
        </div>
      </main>
      <BottomTab mode="public" />
    </div>
  )
}
export default function CatalogoPage() { return <Suspense><Content /></Suspense> }
