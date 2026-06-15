'use client'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PRODUCTOS } from '@/lib/data'
import { useStore } from '@/lib/store'
import { BottomTab } from '@/components/bottom-tab'
import { ProductCard } from '@/components/product-card'
import { Logo } from '@/components/logo'
import { SVG } from '@/components/svg'
import { useTheme } from '@/lib/theme'
import { toast } from 'sonner'

const CAT_COLOR: Record<string,string> = {
  'Seguridad CCTV':'#7c3aed','Radiocomunicación':'#22d3ee',
  'Energía Solar':'#fbbf24','Telecomunicaciones':'#a78bfa',
  'Networking':'#10b981','Automatización':'#f87171',
}

export default function ProductoPage() {
  const { id } = useParams<{ id: string }>()
  const p = PRODUCTOS.find(x => x.id === id)
  const add = useStore(s => s.addCarrito)
  const { theme, toggle } = useTheme()
  if (!p) return <div style={{ minHeight:'100dvh', background:'var(--bg)', display:'flex',
    alignItems:'center', justifyContent:'center', color:'var(--txt3)' }}>No encontrado</div>

  const color = CAT_COLOR[p.categoria] ?? 'var(--violet)'
  const rel = PRODUCTOS.filter(x => x.categoria === p.categoria && x.id !== id).slice(0,4)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      {/* Nav simple */}
      <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:100,
        paddingTop:'env(safe-area-inset-top,0px)',
        background:'rgba(10,8,20,.97)',backdropFilter:'blur(20px)',
        WebkitBackdropFilter:'blur(20px)',borderBottom:'1px solid var(--border)' }}>
        <div style={{ height:52, display:'flex', alignItems:'center',
          padding:'0 14px', gap:10 }}>
          <Link href="/catalogo" style={{ width:38, height:38, borderRadius:10,
            border:'1px solid var(--border)', background:'var(--surface)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'var(--txt2)', textDecoration:'none', flexShrink:0 }}>
            <span dangerouslySetInnerHTML={{ __html: SVG['back']??'' }}
              style={{ display:'flex', alignItems:'center' }} />
          </Link>
          <p style={{ flex:1, fontSize:13, fontWeight:700, color:'var(--txt)',
            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.nombre}</p>
          <button onClick={toggle} style={{ width:38, height:38, borderRadius:10,
            border:'1px solid var(--border)', background:'var(--surface)',
            color:'var(--txt2)', cursor:'pointer', display:'flex',
            alignItems:'center', justifyContent:'center' }}>
            <span dangerouslySetInnerHTML={{ __html: SVG[theme==='dark'?'sun':'moon']??'' }}
              style={{ display:'flex', alignItems:'center' }} />
          </button>
        </div>
      </header>

      <main style={{
        paddingTop:'calc(52px + env(safe-area-inset-top,0px))',
        paddingBottom:'calc(80px + var(--tab-h) + env(safe-area-inset-bottom,0px))',
      }}>
        {/* IMAGEN REAL Higgsfield — grande */}
        <div style={{ position:'relative', width:'100%', paddingTop:'65%',
          background:'var(--surface)', overflow:'hidden' }}>
          <motion.img src={p.img} alt={p.nombre}
            initial={{ scale:1.05, opacity:.8 }} animate={{ scale:1, opacity:1 }}
            transition={{ duration:.4 }}
            style={{ position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover' }} />
          {/* Badge stock */}
          <div style={{ position:'absolute', top:12, right:12,
            background:p.stock>10?'rgba(16,185,129,.95)':p.stock>0?'rgba(251,191,36,.95)':'rgba(248,113,113,.95)',
            color:'white', fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:20,
            backdropFilter:'blur(4px)' }}>
            {p.stock>0?p.stock+' unidades':'Sin stock'}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding:'16px 16px 0' }}>
          <div style={{ display:'flex', gap:8, marginBottom:10 }}>
            <span style={{ fontSize:10, fontWeight:700, color,
              background:color+'15', padding:'3px 10px', borderRadius:8 }}>
              {p.categoria}
            </span>
            <span style={{ fontSize:10, color:'var(--txt3)', fontFamily:'monospace',
              display:'flex', alignItems:'center' }}>SKU: {p.sku}</span>
          </div>
          <h1 style={{ fontSize:20, fontWeight:900, color:'var(--txt)',
            lineHeight:1.2, marginBottom:12 }}>{p.nombre}</h1>
          <p style={{ fontSize:13, color:'var(--txt2)', lineHeight:1.6,
            marginBottom:14 }}>{p.descripcion}</p>

          {/* Precio grande */}
          <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:20,
            background:'var(--card)', border:'1px solid var(--border)', borderRadius:16,
            padding:'14px 16px' }}>
            <span style={{ fontSize:10, color:'var(--txt3)', textTransform:'uppercase',
              letterSpacing:'.1em' }}>Precio</span>
            <span style={{ flex:1, textAlign:'right', fontSize:28, fontWeight:800,
              color:'var(--txt)', letterSpacing:'-1px', fontFeatureSettings:"'tnum'" }}>
              ${p.precio.toLocaleString('es-MX')}
            </span>
            <span style={{ fontSize:12, color:'var(--txt3)' }}>MXN + IVA</span>
          </div>

          {/* Specs tabla */}
          <div style={{ background:'var(--card)', border:'1px solid var(--border)',
            borderRadius:14, overflow:'hidden', marginBottom:20 }}>
            <p style={{ padding:'12px 14px 8px', fontSize:12, fontWeight:700,
              color:'var(--txt)', borderBottom:'1px solid var(--border)',
              textTransform:'uppercase', letterSpacing:'.08em' }}>Especificaciones</p>
            {Object.entries(p.specs).map(([k,v],i) => (
              <div key={k} style={{ padding:'9px 14px', display:'flex',
                justifyContent:'space-between', gap:12,
                background:i%2===0?'rgba(255,255,255,.02)':'transparent' }}>
                <span style={{ fontSize:12, color:'var(--txt3)', fontWeight:500 }}>{k}</span>
                <span style={{ fontSize:12, color:'var(--txt)', fontWeight:600,
                  textAlign:'right' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Relacionados */}
          {rel.length>0&&<div>
            <p style={{ fontSize:14, fontWeight:700, color:'var(--txt)', marginBottom:12 }}>
              Productos relacionados
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
              {rel.map(r=><ProductCard key={r.id} p={r} />)}
            </div>
          </div>}
        </div>
      </main>

      {/* CTA sticky ARRIBA del tab */}
      <div style={{ position:'fixed',
        bottom:'calc(var(--tab-h) + env(safe-area-inset-bottom,0px))',
        left:0, right:0, padding:'10px 14px',
        background:'rgba(10,8,20,.97)', backdropFilter:'blur(20px)',
        borderTop:'1px solid var(--border)', zIndex:90 }}>
        <motion.button whileTap={{ scale:.97 }}
          onClick={()=>{ add({id:p.id,nombre:p.nombre,precio:p.precio}); toast.success('Agregado a cotización') }}
          style={{ width:'100%', height:52, background:color, color:'white',
            fontWeight:800, fontSize:15, borderRadius:16, border:'none', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          <span dangerouslySetInnerHTML={{ __html: SVG['plus']??'' }}
            style={{ display:'flex', transform:'scale(1.1)' }} />
          Agregar a cotización · ${p.precio.toLocaleString('es-MX')}
        </motion.button>
      </div>
      <BottomTab mode="public" />
    </div>
  )
}
