'use client'
import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { PRODUCTOS, CATEGORIAS, MARCAS } from '@/lib/data'
import { ProductCard } from '@/components/product-card'
import { TopNav } from '@/components/top-nav'
import { BottomTab } from '@/components/bottom-tab'
import { SVG } from '@/components/svg'

function Content() {
  const params = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [cat, setCat] = useState(params.get('cat') || '')
  const [marca, setMarca] = useState(params.get('marca') || '')
  const [tab, setTab] = useState<'PRODUCTOS'|'VIDEOS'|'ARTÍCULOS'>('PRODUCTOS')

  const filtered = useMemo(() => PRODUCTOS.filter(p => {
    const mQ = !q || p.nombre.toLowerCase().includes(q.toLowerCase())
      || p.sku.toLowerCase().includes(q.toLowerCase())
      || p.marca.toLowerCase().includes(q.toLowerCase())
    const mC = !cat || p.categoria === cat
    const mM = !marca || p.marca === marca || marca === 'Todas'
    return mQ && mC && mM
  }), [q, cat, marca])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      <TopNav />
      <main className="page-main">
        {/* Chips de categoría scrolleable */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '10px 14px 0',
          scrollbarWidth: 'none' }}>
          <button onClick={() => setCat('')} style={{
            flexShrink: 0, padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 600,
            cursor: 'pointer', border: `1px solid ${!cat ? 'var(--violet)' : 'var(--border)'}`,
            background: !cat ? 'rgba(124,58,237,.15)' : 'var(--surface)',
            color: !cat ? 'var(--violet)' : 'var(--txt3)',
          }}>Todas</button>
          {CATEGORIAS.map(c => (
            <button key={c} onClick={() => setCat(cat === c ? '' : c)} style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 600,
              cursor: 'pointer', border: `1px solid ${cat===c?'var(--violet)':'var(--border)'}`,
              background: cat===c?'rgba(124,58,237,.15)':'var(--surface)',
              color: cat===c?'var(--violet)':'var(--txt3)',
              whiteSpace: 'nowrap',
            }}>{c.split(' ')[0]}</button>
          ))}
        </div>

        {/* Chips de marca */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '8px 14px 0',
          scrollbarWidth: 'none' }}>
          {MARCAS.map(m => (
            <button key={m} onClick={() => setMarca(m === marca ? '' : m)} style={{
              flexShrink: 0, padding: '4px 12px', borderRadius: 20, fontSize: 10, fontWeight: 600,
              cursor: 'pointer', border: `1px solid ${marca===m?'var(--cyan)':'var(--border)'}`,
              background: marca===m?'rgba(34,211,238,.12)':'transparent',
              color: marca===m?'var(--cyan)':'var(--txt3)',
            }}>{m}</button>
          ))}
        </div>

        {/* Tabs tipo Syscom */}
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          padding: '0 14px', display: 'flex', gap: 0, marginTop: 10 }}>
          {(['PRODUCTOS','VIDEOS','ARTÍCULOS'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '10px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
              background: 'none', border: 'none',
              borderBottom: tab===t?'2px solid var(--violet)':'2px solid transparent',
              color: tab===t?'var(--violet)':'var(--txt3)', transition: 'all .15s',
            }}>{t}</button>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ display: 'flex', alignItems: 'center', fontSize: 11,
            color: 'var(--txt3)', paddingRight: 4 }}>
            {filtered.length} resultados
          </span>
        </div>

        {/* Grid de productos */}
        {tab === 'PRODUCTOS' && (
          <div style={{ padding: '12px 14px' }}>
            {(cat || marca || q) && (
              <button onClick={() => { setCat(''); setMarca(''); setQ('') }}
                style={{ display: 'flex', alignItems: 'center', gap: 6,
                  background: 'none', border: 'none', color: 'var(--red)',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', marginBottom: 10 }}>
                <span dangerouslySetInnerHTML={{ __html: SVG['check']??'' }}
                  style={{ display:'flex', transform:'scale(.7)' }} />
                Limpiar filtros
              </button>
            )}
            {filtered.length === 0
              ? <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--txt3)' }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt2)' }}>
                    Sin resultados para "{q}"
                  </p>
                </div>
              : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
                  {filtered.map((p, i) => (
                    <motion.div key={p.id}
                      initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                      transition={{ delay: i < 12 ? i*.03 : 0, duration:.25 }}>
                      <ProductCard p={p} />
                    </motion.div>
                  ))}
                </div>
            }
          </div>
        )}
        {tab !== 'PRODUCTOS' && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--txt3)' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt2)', marginBottom: 6 }}>
              Próximamente
            </p>
            <p style={{ fontSize: 12 }}>{tab} estarán disponibles pronto</p>
          </div>
        )}
      </main>
      <BottomTab mode="public" />
    </div>
  )
}
export default function CatalogoPage() { return <Suspense><Content /></Suspense> }
