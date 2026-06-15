'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIAS, PRODUCTOS, MARCAS, CAT_META } from '@/lib/data'
import { ProductCard } from '@/components/product-card'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { BottomTab } from '@/components/bottom-tab'
import { useStore } from '@/lib/store'
import { toast } from 'sonner'

const HERO = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_014120_e2b3449f-b562-4de2-b43c-cbd6f66360f6.png"
const SHOWROOM = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_014046_bb56c541-2de0-460b-ad55-b5f0451df7bc.png"
const SOLAR = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_014157_08ecc603-f273-4412-aef1-095ea8e4f233.png"

function Counter({ end, prefix='', suffix='' }: { end: number; prefix?: string; suffix?: string }) {
  const [v, setV] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      let cur = 0; const step = end / 60
      const t = setInterval(() => { cur = Math.min(cur+step,end); setV(Math.round(cur)); if(cur>=end) clearInterval(t) }, 16)
      obs.disconnect()
    }, { threshold: .3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{prefix}{v.toLocaleString('es-MX')}{suffix}</span>
}

export default function LandingPage() {
  const [q, setQ] = useState('')
  const carrito = useStore(s => s.carrito)
  const totalItems = carrito.reduce((a,c) => a+c.qty, 0)
  const router = useRouter()

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>

      {/* ── LANDING HEADER ── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,8,20,.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)' }}>
        <div style={{ height: 60, display: 'flex', alignItems: 'center',
          padding: '0 20px', gap: 12 }}>
          <Logo size={20} />
          <div style={{ flex: 1 }} />
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/catalogo" style={{ fontSize: 13, color: 'var(--txt2)',
              textDecoration: 'none', padding: '8px 12px', borderRadius: 10,
              fontWeight: 500 }}>Catálogo</Link>
            <ThemeToggle size={16} />
            <Link href="/cotizador" style={{ position: 'relative', display: 'flex',
              alignItems: 'center', justifyContent: 'center', width: 40, height: 40,
              borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)',
              color: 'var(--txt2)', textDecoration: 'none' }}>
              <i className="ti ti-shopping-cart" style={{ fontSize: 18 }} />
              {totalItems > 0 && <span style={{ position: 'absolute', top: 4, right: 4,
                background: 'var(--violet)', color: 'white', fontSize: 9, fontWeight: 700,
                width: 15, height: 15, borderRadius: 8, display: 'flex', alignItems: 'center',
                justifyContent: 'center' }}>{totalItems}</span>}
            </Link>
            <Link href="/sign-in" style={{ background: 'var(--violet)', color: 'white',
              fontWeight: 700, fontSize: 13, padding: '8px 16px', borderRadius: 12,
              textDecoration: 'none', border: 'none' }}>Ingresar</Link>
          </nav>
        </div>
      </header>

      {/* ── HERO — Imagen Higgsfield ── */}
      <section style={{ position: 'relative', height: '80dvh', minHeight: 480,
        overflow: 'hidden', marginTop: 60 }}>
        <img src={HERO} alt="INDCOM Technology"
          style={{ width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(.45) saturate(1.2)' }} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(3,2,10,.2) 0%, rgba(3,2,10,.85) 75%, var(--bg) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', justifyContent: 'flex-end', padding: '0 24px 48px' }}>
          <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }}
            transition={{ duration:.6, ease:[.22,1,.36,1] }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6,
              background:'rgba(124,58,237,.2)', border:'1px solid rgba(124,58,237,.35)',
              borderRadius:20, padding:'4px 14px', marginBottom:14 }}>
              <span style={{ width:6, height:6, borderRadius:3, background:'var(--violet)',
                animation:'pulse 2s infinite' }} />
              <span style={{ fontSize:11, fontWeight:600, color:'#c4b5fd' }}>
                Distribuidor autorizado · Cancún, Q.Roo
              </span>
            </div>
            <h1 style={{ fontSize:'clamp(30px,7vw,52px)', fontWeight:900, color:'var(--txt)',
              lineHeight:1.1, letterSpacing:'-1px', marginBottom:12 }}>
              Tecnología que<br />
              <span style={{ color:'var(--violet)' }}>protege</span>, conecta<br />
              y <span style={{ color:'var(--cyan)' }}>transforma</span>
            </h1>
            <p style={{ fontSize:15, color:'var(--txt2)', maxWidth:340, lineHeight:1.6,
              marginBottom:24 }}>
              +800 productos de las mejores marcas. Precios de distribuidor. Soporte técnico real.
            </p>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <motion.div whileTap={{ scale:.97 }}>
                <Link href="/catalogo" style={{ background:'var(--violet)', color:'white',
                  fontWeight:700, fontSize:14, padding:'13px 24px', borderRadius:14,
                  textDecoration:'none', display:'flex', alignItems:'center', gap:8,
                  animation:'glowPulse 2s ease-in-out infinite' }}>
                  <i className="ti ti-apps" style={{ fontSize:16 }} />
                  Ver catálogo
                </Link>
              </motion.div>
              <Link href="/sign-up" style={{ background:'var(--surface)', color:'var(--txt)',
                fontWeight:600, fontSize:14, padding:'13px 24px', borderRadius:14,
                textDecoration:'none', border:'1px solid var(--border)',
                display:'flex', alignItems:'center', gap:8 }}>
                <i className="ti ti-user-plus" style={{ fontSize:16, color:'var(--cyan)' }} />
                Crear cuenta
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background:'var(--surface)', borderTop:'1px solid var(--border)',
        borderBottom:'1px solid var(--border)', padding:'20px 24px',
        display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, textAlign:'center' }}>
        {[{ l:'Productos', v:847, s:'+' }, { l:'Clientes', v:156, s:'' }, { l:'Años', v:15, s:'' }].map(s => (
          <div key={s.l}>
            <motion.p initial={{ opacity:0,y:8 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true }} transition={{ duration:.5 }}
              style={{ fontSize:28, fontWeight:900, color:'var(--txt)',
                letterSpacing:'-1px', fontFeatureSettings:"'tnum'" }}>
              <Counter end={s.v} suffix={s.s} />
            </motion.p>
            <p style={{ fontSize:10, color:'var(--txt3)', textTransform:'uppercase',
              letterSpacing:'.1em', marginTop:2 }}>{s.l}</p>
          </div>
        ))}
      </section>

      {/* ── CATEGORÍAS ── */}
      <section style={{ padding:'32px 16px 0' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <h2 style={{ fontSize:20, fontWeight:800, color:'var(--txt)' }}>Categorías</h2>
          <Link href="/catalogo" style={{ fontSize:12, color:'var(--violet)', textDecoration:'none', fontWeight:600 }}>Ver todo</Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
          {CATEGORIAS.map((cat,i) => {
            const m = CAT_META[cat]
            return (
              <motion.div key={cat}
                initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*.06, duration:.4, ease:[.22,1,.36,1] }}>
                <Link href={'/catalogo?cat='+encodeURIComponent(cat)}
                  style={{ background:m.color+'10', border:'1px solid '+m.color+'25',
                    borderRadius:16, padding:'16px 8px', display:'flex', flexDirection:'column',
                    alignItems:'center', gap:8, textDecoration:'none',
                    transition:'transform .2s' }}>
                  <i className={m.icon} style={{ fontSize:28, color:m.color }} />
                  <span style={{ fontSize:10, fontWeight:600, color:m.color,
                    textAlign:'center', lineHeight:1.3 }}>{cat}</span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS ── */}
      <section style={{ padding:'28px 16px 0' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <h2 style={{ fontSize:20, fontWeight:800, color:'var(--txt)' }}>Destacados</h2>
          <Link href="/catalogo" style={{ fontSize:12, color:'var(--violet)', textDecoration:'none', fontWeight:600 }}>Ver todo</Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
          {PRODUCTOS.slice(0,6).map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* ── IMAGEN SHOWROOM — Higgsfield ── */}
      <section style={{ margin:'32px 16px 0', borderRadius:20, overflow:'hidden',
        position:'relative', height:200 }}>
        <img src={SHOWROOM} alt="INDCOM Showroom"
          style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.6)' }} />
        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(135deg, rgba(124,58,237,.5) 0%, rgba(3,2,10,.3) 100%)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
          justifyContent:'flex-end', padding:20 }}>
          <p style={{ fontSize:18, fontWeight:900, color:'white', marginBottom:4 }}>
            Distribuidores certificados
          </p>
          <p style={{ fontSize:12, color:'rgba(255,255,255,.8)', marginBottom:14 }}>
            Hikvision · Motorola · Ubiquiti · MikroTik
          </p>
          <Link href="/como-funciona" style={{ display:'inline-flex', alignItems:'center', gap:6,
            background:'white', color:'#6d28d9', fontWeight:700, fontSize:13,
            padding:'9px 16px', borderRadius:12, textDecoration:'none', width:'fit-content' }}>
            <i className="ti ti-info-circle" style={{ fontSize:15 }} />
            Cómo funciona
          </Link>
        </div>
      </section>

      {/* ── SOLAR BANNER — Higgsfield ── */}
      <section style={{ margin:'16px 16px 0', borderRadius:20, overflow:'hidden',
        position:'relative', height:160 }}>
        <img src={SOLAR} alt="Energía Solar"
          style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.55)' }} />
        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(to right, rgba(3,2,10,.7) 0%, transparent 100%)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
          padding:'0 20px', gap:12 }}>
          <i className="ti ti-sun" style={{ fontSize:36, color:'var(--gold)' }} />
          <div>
            <p style={{ fontSize:16, fontWeight:800, color:'white' }}>Energía Solar</p>
            <p style={{ fontSize:11, color:'rgba(255,255,255,.7)', marginBottom:8 }}>Paneles, inversores y baterías</p>
            <Link href="/catalogo?cat=Energ%C3%ADa+Solar"
              style={{ fontSize:11, color:'var(--gold)', fontWeight:700, textDecoration:'none' }}>
              Ver productos →
            </Link>
          </div>
        </div>
      </section>

      {/* ── MARCAS ── */}
      <section style={{ padding:'28px 16px 0' }}>
        <p style={{ fontSize:10, fontWeight:600, color:'var(--txt3)',
          textTransform:'uppercase', letterSpacing:'.12em', textAlign:'center', marginBottom:14 }}>
          Distribuidores autorizados
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
          {MARCAS.map(m => (
            <span key={m} style={{ fontSize:11, fontWeight:600, color:'var(--txt2)',
              background:'var(--surface)', border:'1px solid var(--border)',
              padding:'5px 12px', borderRadius:20 }}>{m}</span>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ margin:'32px 16px 0', background:'var(--card)',
        border:'1px solid var(--border)', borderRadius:20, padding:24,
        position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-40, right:-40, width:120, height:120,
          borderRadius:60, background:'var(--violet)', filter:'blur(40px)', opacity:.25 }} />
        <i className="ti ti-shield-check" style={{ fontSize:28, color:'var(--violet)',
          marginBottom:10, display:'block' }} />
        <p style={{ fontSize:18, fontWeight:800, color:'var(--txt)', marginBottom:6 }}>
          Listo para cotizar
        </p>
        <p style={{ fontSize:13, color:'var(--txt2)', lineHeight:1.5, marginBottom:18 }}>
          Crea tu cuenta de distribuidor y accede a precios especiales, historial de cotizaciones y soporte prioritario.
        </p>
        <div style={{ display:'flex', gap:10 }}>
          <Link href="/sign-up" style={{ flex:1, background:'var(--violet)', color:'white',
            fontWeight:700, fontSize:14, padding:'12px 0', borderRadius:13,
            textDecoration:'none', textAlign:'center', display:'flex',
            alignItems:'center', justifyContent:'center', gap:6 }}>
            <i className="ti ti-user-plus" style={{ fontSize:15 }} />
            Registrarse
          </Link>
          <Link href="/sign-in" style={{ flex:1, background:'var(--surface)', color:'var(--txt)',
            fontWeight:600, fontSize:14, padding:'12px 0', borderRadius:13,
            textDecoration:'none', textAlign:'center', border:'1px solid var(--border)',
            display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
            <i className="ti ti-login" style={{ fontSize:15, color:'var(--cyan)' }} />
            Ingresar
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:'32px 16px 24px', marginTop:32,
        borderTop:'1px solid var(--border)' }}>
        <Logo size={16} />
        <p style={{ fontSize:11, color:'var(--txt3)', marginTop:8, marginBottom:16, lineHeight:1.6 }}>
          Distribuidor de tecnología premium para empresas<br />en el sureste mexicano desde 2009.
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'6px 16px', marginBottom:16 }}>
          {['Catálogo','Cómo funciona','Registro','Soporte'].map(l => (
            <Link key={l} href="#" style={{ fontSize:11, color:'var(--txt3)',
              textDecoration:'none' }}>{l}</Link>
          ))}
        </div>
        <p style={{ fontSize:10, color:'var(--txt3)', opacity:.5 }}>
          © 2025 INDCOM · All Global Holding LLC
        </p>
      </footer>

      <BottomTab mode="public" />
    </div>
  )
}
