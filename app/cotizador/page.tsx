'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import { TopNav } from '@/components/top-nav'
import { BottomTab } from '@/components/bottom-tab'
import { SVG } from '@/components/svg'
import Link from 'next/link'
import { toast } from 'sonner'

export default function CotizadorPage() {
  const { carrito, removeCarrito, updateQty, clearCarrito } = useStore()
  const subtotal = carrito.reduce((a,c) => a+c.precio*c.qty, 0)
  const total = Math.round(subtotal * 1.16)

  return (
    <div style={{ background:'var(--bg)', minHeight:'100dvh' }}>
      <TopNav />
      <main className="page-main">
        <div style={{ padding:'14px' }}>
          <h1 style={{ fontSize:20, fontWeight:900, color:'var(--txt)', marginBottom:14,
            display:'flex', alignItems:'center', gap:8 }}>
            <span dangerouslySetInnerHTML={{ __html: SVG['file']??'' }}
              style={{ display:'flex', color:'var(--violet)' }} />
            Mi Cotizador
          </h1>
          {carrito.length===0?(
            <div style={{ textAlign:'center', padding:'60px 0' }}>
              <span dangerouslySetInnerHTML={{ __html: SVG['cart']??'' }}
                style={{ display:'flex', justifyContent:'center', color:'var(--txt3)',
                  marginBottom:14, transform:'scale(2)', opacity:.3 }} />
              <p style={{ fontSize:15, fontWeight:600, color:'var(--txt2)', marginBottom:6 }}>
                Cotizador vacío
              </p>
              <p style={{ fontSize:12, color:'var(--txt3)', marginBottom:20 }}>
                Agrega productos desde el catálogo
              </p>
              <Link href="/catalogo" style={{ background:'var(--violet)', color:'white',
                fontWeight:700, fontSize:14, padding:'12px 24px', borderRadius:12,
                textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8 }}>
                Ver catálogo
              </Link>
            </div>
          ):(
            <>
              <AnimatePresence>
                {carrito.map(item=>(
                  <motion.div key={item.id} initial={{opacity:0,x:-10}}
                    animate={{opacity:1,x:0}} exit={{opacity:0,x:10}} layout
                    style={{ background:'var(--card)', border:'1px solid var(--border)',
                      borderRadius:12, padding:12, display:'flex', alignItems:'center',
                      gap:10, marginBottom:10 }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontSize:12, fontWeight:600, color:'var(--txt)',
                        overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                        marginBottom:2 }}>{item.nombre}</p>
                      <p style={{ fontSize:11, color:'var(--txt3)',
                        fontFeatureSettings:"'tnum'" }}>
                        ${item.precio.toLocaleString('es-MX')} c/u
                      </p>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <button onClick={()=>item.qty>1?updateQty(item.id,item.qty-1):removeCarrito(item.id)}
                        style={{ width:28, height:28, borderRadius:8,
                          background:'var(--surface)', border:'1px solid var(--border)',
                          color:'var(--txt)', cursor:'pointer', display:'flex',
                          alignItems:'center', justifyContent:'center' }}>
                        <span dangerouslySetInnerHTML={{ __html: SVG['minus']??'' }}
                          style={{ display:'flex', transform:'scale(.8)' }} />
                      </button>
                      <span style={{ fontSize:14, fontWeight:700, color:'var(--txt)',
                        width:20, textAlign:'center', fontFeatureSettings:"'tnum'" }}>
                        {item.qty}
                      </span>
                      <button onClick={()=>updateQty(item.id,item.qty+1)}
                        style={{ width:28, height:28, borderRadius:8,
                          background:'var(--surface)', border:'1px solid var(--border)',
                          color:'var(--txt)', cursor:'pointer', display:'flex',
                          alignItems:'center', justifyContent:'center' }}>
                        <span dangerouslySetInnerHTML={{ __html: SVG['plus']??'' }}
                          style={{ display:'flex', transform:'scale(.8)' }} />
                      </button>
                    </div>
                    <span style={{ fontSize:13, fontWeight:800, color:'var(--txt)',
                      minWidth:70, textAlign:'right', fontFeatureSettings:"'tnum'" }}>
                      ${(item.precio*item.qty).toLocaleString('es-MX')}
                    </span>
                    <button onClick={()=>removeCarrito(item.id)}
                      style={{ background:'none', border:'none', color:'var(--txt3)',
                        cursor:'pointer', display:'flex', padding:4 }}>
                      <span dangerouslySetInnerHTML={{ __html: SVG['trash']??'' }}
                        style={{ display:'flex' }} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div style={{ background:'var(--card)', border:'1px solid var(--border)',
                borderRadius:14, padding:14, marginTop:4 }}>
                <input placeholder="Nombre / Empresa" style={{ width:'100%',
                  background:'var(--surface)', border:'1px solid var(--border)',
                  borderRadius:10, padding:'11px 14px', fontSize:14,
                  color:'var(--txt)', outline:'none', marginBottom:10 }} />
                <input placeholder="Teléfono o Email" style={{ width:'100%',
                  background:'var(--surface)', border:'1px solid var(--border)',
                  borderRadius:10, padding:'11px 14px', fontSize:14,
                  color:'var(--txt)', outline:'none', marginBottom:10 }} />
                <textarea placeholder="Notas..." rows={2} style={{ width:'100%',
                  background:'var(--surface)', border:'1px solid var(--border)',
                  borderRadius:10, padding:'11px 14px', fontSize:14,
                  color:'var(--txt)', outline:'none', resize:'none', marginBottom:14 }} />
                <div style={{ borderTop:'1px solid var(--border)', paddingTop:12,
                  display:'flex', flexDirection:'column', gap:6, marginBottom:14 }}>
                  <div style={{ display:'flex', justifyContent:'space-between',
                    fontSize:13, color:'var(--txt2)' }}>
                    <span>Subtotal</span>
                    <span style={{ fontFeatureSettings:"'tnum'" }}>${subtotal.toLocaleString('es-MX')}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between',
                    fontSize:13, color:'var(--txt2)' }}>
                    <span>IVA 16%</span>
                    <span style={{ fontFeatureSettings:"'tnum'" }}>${Math.round(subtotal*.16).toLocaleString('es-MX')}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between',
                    fontSize:18, fontWeight:900, color:'var(--txt)',
                    paddingTop:8, borderTop:'1px solid var(--border)' }}>
                    <span>Total</span>
                    <span style={{ fontFeatureSettings:"'tnum'" }}>${total.toLocaleString('es-MX')}</span>
                  </div>
                </div>
                <motion.button whileTap={{ scale:.97 }}
                  onClick={()=>{ toast.success('¡Cotización enviada!',{description:'Un asesor te contactará en breve.'}); clearCarrito() }}
                  style={{ width:'100%', height:52, background:'var(--violet)', color:'white',
                    fontWeight:800, fontSize:15, borderRadius:14, border:'none', cursor:'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                    animation:'glowPulse 2s infinite' }}>
                  <span dangerouslySetInnerHTML={{ __html: SVG['send']??'' }}
                    style={{ display:'flex' }} />
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
