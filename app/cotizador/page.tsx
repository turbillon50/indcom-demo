'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import { TopNav } from '@/components/top-nav'
import { BottomTab } from '@/components/bottom-tab'
import Link from 'next/link'
import { toast } from 'sonner'

export default function CotizadorPage() {
  const { carrito, removeCarrito, updateQty, clearCarrito } = useStore()
  const subtotal = carrito.reduce((a, c) => a + c.precio * c.qty, 0)
  const iva = subtotal * 0.16
  const total = subtotal + iva

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      <TopNav />
      <main className="page-content">
        <div style={{ padding: '16px' }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--txt)', marginBottom: 16 }}>
            <i className="ti ti-file-invoice" style={{ color: 'var(--violet)', marginRight: 8 }} />
            Cotizador
          </h1>
          {carrito.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <i className="ti ti-shopping-cart-off" style={{ fontSize: 52, color: 'var(--txt3)',
                display: 'block', marginBottom: 16, opacity: .3 }} />
              <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--txt2)', marginBottom: 6 }}>
                Tu cotizador está vacío
              </p>
              <p style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 20 }}>
                Agrega productos desde el catálogo
              </p>
              <Link href="/catalogo" style={{ background: 'var(--violet)', color: 'white',
                fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 13,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <i className="ti ti-apps" style={{ fontSize: 15 }} />
                Ver catálogo
              </Link>
            </div>
          ) : (
            <>
              <AnimatePresence>
                {carrito.map(item => (
                  <motion.div key={item.id}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }} layout
                    style={{ background: 'var(--card)', border: '1px solid var(--border)',
                      borderRadius: 14, padding: '14px', display: 'flex',
                      alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        marginBottom: 2 }}>{item.nombre}</p>
                      <p style={{ fontSize: 11, color: 'var(--txt3)',
                        fontFeatureSettings: "'tnum'" }}>
                        ${item.precio.toLocaleString('es-MX')} c/u
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <button onClick={() => item.qty > 1 ? updateQty(item.id, item.qty-1) : removeCarrito(item.id)}
                        style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--surface)',
                          border: '1px solid var(--border)', color: 'var(--txt)',
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="ti ti-minus" style={{ fontSize: 13 }} />
                      </button>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)',
                        width: 24, textAlign: 'center', fontFeatureSettings: "'tnum'" }}>
                        {item.qty}
                      </span>
                      <button onClick={() => updateQty(item.id, item.qty+1)}
                        style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--surface)',
                          border: '1px solid var(--border)', color: 'var(--txt)',
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="ti ti-plus" style={{ fontSize: 13 }} />
                      </button>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--txt)',
                      minWidth: 80, textAlign: 'right', fontFeatureSettings: "'tnum'" }}>
                      ${(item.precio*item.qty).toLocaleString('es-MX')}
                    </span>
                    <button onClick={() => removeCarrito(item.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--txt3)',
                        cursor: 'pointer', display: 'flex', padding: 4 }}>
                      <i className="ti ti-trash" style={{ fontSize: 15 }} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 16, padding: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10,
                  marginBottom: 14 }}>
                  <input placeholder="Nombre / Empresa" style={{ background: 'var(--surface)',
                    border: '1px solid var(--border)', borderRadius: 11, padding: '11px 14px',
                    fontSize: 14, color: 'var(--txt)', outline: 'none' }} />
                  <input placeholder="Teléfono o Email" style={{ background: 'var(--surface)',
                    border: '1px solid var(--border)', borderRadius: 11, padding: '11px 14px',
                    fontSize: 14, color: 'var(--txt)', outline: 'none' }} />
                  <textarea placeholder="Notas adicionales..." rows={2} style={{ background: 'var(--surface)',
                    border: '1px solid var(--border)', borderRadius: 11, padding: '11px 14px',
                    fontSize: 14, color: 'var(--txt)', outline: 'none', resize: 'none' }} />
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12,
                  display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                  {[['Subtotal', subtotal], ['IVA 16%', iva]].map(([l,v]) => (
                    <div key={String(l)} style={{ display: 'flex', justifyContent: 'space-between',
                      fontSize: 13, color: 'var(--txt2)' }}>
                      <span>{l}</span>
                      <span style={{ fontFeatureSettings: "'tnum'" }}>
                        ${Math.round(Number(v)).toLocaleString('es-MX')}
                      </span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between',
                    fontSize: 18, fontWeight: 900, color: 'var(--txt)',
                    paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                    <span>Total</span>
                    <span style={{ fontFeatureSettings: "'tnum'" }}>
                      ${Math.round(total).toLocaleString('es-MX')}
                    </span>
                  </div>
                </div>
                <motion.button whileTap={{ scale: .97 }}
                  onClick={() => { toast.success('¡Cotización enviada!', { description: 'Un asesor te contactará en breve.' }); clearCarrito() }}
                  style={{ width: '100%', height: 52, background: 'var(--violet)', color: 'white',
                    fontWeight: 800, fontSize: 15, borderRadius: 14, border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    animation: 'glowPulse 2s ease-in-out infinite' }}>
                  <i className="ti ti-send" style={{ fontSize: 18 }} />
                  Enviar cotización
                </motion.button>
              </div>
            </>
          )}
        </div>
      </main>
      <BottomTab mode="public" />
    </div>
  )
}
