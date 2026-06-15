'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { TopNav } from '@/components/top-nav'
import { BottomTab } from '@/components/bottom-tab'

const STEPS = [
  { n:'01', icon:'ti-apps', color:'var(--violet)', title:'Explora el catálogo', desc:'Navega +800 productos con specs completas, precios actualizados y disponibilidad en tiempo real. Filtra por categoría y marca.' },
  { n:'02', icon:'ti-file-text', color:'var(--cyan)', title:'Crea tu cotización', desc:'Agrega los productos, ajusta cantidades y envía tu cotización en segundos. Un asesor la confirma en menos de 2 horas.' },
  { n:'03', icon:'ti-truck-delivery', color:'var(--green)', title:'Recibe tu pedido', desc:'Entrega en 24-48h en Cancún y la península. Garantía de fábrica en todos los productos.' },
]

export default function ComoFuncionaPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      <TopNav />
      <main className="page-content">
        <div style={{ padding: '24px 16px' }}>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: 'var(--txt)', marginBottom: 6 }}>
            Cómo funciona
          </h1>
          <p style={{ fontSize: 14, color: 'var(--txt2)', marginBottom: 28 }}>
            Proceso simple, entrega rápida
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {STEPS.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i*.1, duration: .4, ease: [.22,1,.36,1] }}
                style={{ background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 18, padding: 20, display: 'flex', gap: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                  background: s.color + '15', display: 'flex', alignItems: 'center',
                  justifyContent: 'center' }}>
                  <i className={s.icon} style={{ fontSize: 26, color: s.color }} />
                </div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: s.color,
                    textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>
                    Paso {s.n}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--txt)',
                    marginBottom: 6 }}>{s.title}</p>
                  <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
            <Link href="/catalogo" style={{ flex: 1, background: 'var(--violet)', color: 'white',
              fontWeight: 700, fontSize: 14, padding: '13px 0', borderRadius: 14,
              textDecoration: 'none', textAlign: 'center', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <i className="ti ti-apps" style={{ fontSize: 16 }} />Ver catálogo
            </Link>
            <Link href="/sign-up" style={{ flex: 1, background: 'var(--surface)', color: 'var(--txt)',
              fontWeight: 600, fontSize: 14, padding: '13px 0', borderRadius: 14,
              textDecoration: 'none', textAlign: 'center', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <i className="ti ti-user-plus" style={{ fontSize: 16, color: 'var(--cyan)' }} />
              Crear cuenta
            </Link>
          </div>
        </div>
      </main>
      <BottomTab mode="public" />
    </div>
  )
}
