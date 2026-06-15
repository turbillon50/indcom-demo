'use client'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PRODUCTOS, CAT_META } from '@/lib/data'
import { useStore } from '@/lib/store'
import { BottomTab } from '@/components/bottom-tab'
import { ProductCard } from '@/components/product-card'
import { toast } from 'sonner'
import { ThemeToggle } from '@/components/theme-toggle'

export default function ProductoPage() {
  const { id } = useParams<{ id: string }>()
  const p = PRODUCTOS.find(x => x.id === id)
  const add = useStore(s => s.addCarrito)
  if (!p) return <div style={{ minHeight: '100dvh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--txt3)' }}>No encontrado</div>
  const meta = CAT_META[p.categoria] ?? { color: 'var(--violet)', icon: 'ti-package' }
  const rel = PRODUCTOS.filter(x => x.categoria === p.categoria && x.id !== id).slice(0, 4)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      {/* Nav */}
      <header className="top-nav">
        <div style={{ height: 'var(--nav-h)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10 }}>
          <Link href="/catalogo" style={{ width: 40, height: 40, borderRadius: 12,
            border: '1px solid var(--border)', background: 'var(--surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--txt2)', textDecoration: 'none', flexShrink: 0 }}>
            <i className="ti ti-arrow-left" style={{ fontSize: 18 }} />
          </Link>
          <p style={{ flex: 1, fontSize: 14, fontWeight: 700, color: 'var(--txt)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.nombre}</p>
          <ThemeToggle size={16} />
        </div>
      </header>
      <main className="page-content">
        {/* Imagen categoría */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ height: 200, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 10,
            background: meta.color + '0f', borderBottom: '1px solid var(--border)' }}>
          <i className={meta.icon} style={{ fontSize: 72, color: meta.color }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: meta.color + '99',
            textTransform: 'uppercase', letterSpacing: '1px' }}>{p.marca}</span>
        </motion.div>
        <div style={{ padding: '20px 16px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: meta.color,
              background: meta.color + '15', padding: '3px 10px', borderRadius: 8 }}>
              {p.categoria}
            </span>
            <span style={{ fontSize: 10, color: 'var(--txt3)', fontFamily: 'monospace',
              display: 'flex', alignItems: 'center' }}>SKU: {p.sku}</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--txt)',
            lineHeight: 1.2, marginBottom: 10 }}>{p.nombre}</h1>
          <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: 16 }}>
            {p.descripcion}
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: 'var(--txt)',
              letterSpacing: '-1px', fontFeatureSettings: "'tnum'" }}>
              ${p.precio.toLocaleString('es-MX')}
            </span>
            <span style={{ fontSize: 12, color: 'var(--txt3)' }}>MXN + IVA</span>
          </div>
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20,
              color: p.stock > 10 ? 'var(--green)' : p.stock > 0 ? 'var(--gold)' : 'var(--red)',
              background: p.stock > 10 ? 'rgba(16,185,129,.12)' : p.stock > 0
                ? 'rgba(251,191,36,.12)' : 'rgba(248,113,113,.12)' }}>
              {p.stock > 0 ? p.stock + ' unidades disponibles' : 'Sin stock'}
            </span>
          </div>
          {/* Specs */}
          <div style={{ background: 'var(--card)', borderRadius: 16, overflow: 'hidden',
            border: '1px solid var(--border)', marginBottom: 80 }}>
            <p style={{ padding: '14px 16px 10px', fontSize: 13, fontWeight: 700,
              color: 'var(--txt)', borderBottom: '1px solid var(--border)' }}>Especificaciones</p>
            {Object.entries(p.specs).map(([k, v], i) => (
              <div key={k} style={{ padding: '10px 16px', display: 'flex',
                justifyContent: 'space-between', gap: 12,
                background: i % 2 === 0 ? 'rgba(255,255,255,.02)' : 'transparent' }}>
                <span style={{ fontSize: 12, color: 'var(--txt3)', fontWeight: 500 }}>{k}</span>
                <span style={{ fontSize: 12, color: 'var(--txt)', fontWeight: 600,
                  textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>
          {rel.length > 0 && (
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 12 }}>
                Productos relacionados
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                {rel.map(r => <ProductCard key={r.id} p={r} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      {/* CTA sticky */}
      <div style={{ position: 'fixed', bottom: 'calc(var(--tab-h) + var(--safe-b))',
        left: 0, right: 0, padding: '12px 16px',
        background: 'rgba(10,8,20,.97)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)', zIndex: 90 }}>
        <motion.button whileTap={{ scale: .97 }}
          onClick={() => { add({ id: p.id, nombre: p.nombre, precio: p.precio }); toast.success('Agregado a cotización', { description: p.nombre.slice(0,40) + '...' }) }}
          style={{ width: '100%', height: 52, background: meta.color, color: 'white',
            fontWeight: 800, fontSize: 15, borderRadius: 16, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <i className="ti ti-shopping-cart-plus" style={{ fontSize: 18 }} />
          Agregar a cotización · ${p.precio.toLocaleString('es-MX')}
        </motion.button>
      </div>
      <BottomTab mode="public" />
    </div>
  )
}
