'use client'
import { useStore } from '@/lib/store'
import type { Producto } from '@/lib/data'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SVG } from './svg'
import { toast } from 'sonner'

export function ProductCard({ p }: { p: Producto }) {
  const add = useStore(s => s.addCarrito)

  return (
    <motion.div
      initial={{ opacity:0, y:8 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:.25, ease:[.22,1,.36,1] }}
      style={{
        background:'var(--card)', border:'1px solid var(--border)',
        borderRadius:12, overflow:'hidden',
      }}>
      {/* IMAGEN REAL Higgsfield — ocupa 55% de la card */}
      <Link href={'/producto/'+p.id} style={{ display:'block', textDecoration:'none' }}>
        <div style={{ position:'relative', paddingTop:'72%', background:'var(--surface)',
          overflow:'hidden' }}>
          <img src={p.img} alt={p.nombre}
            style={{ position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover', transition:'transform .3s' }}
            onMouseEnter={e=>(e.currentTarget as HTMLImageElement).style.transform='scale(1.04)'}
            onMouseLeave={e=>(e.currentTarget as HTMLImageElement).style.transform='scale(1)'}
          />
          {/* Badge stock */}
          <div style={{ position:'absolute', top:6, right:6,
            background: p.stock>10?'rgba(16,185,129,.9)':p.stock>0?'rgba(251,191,36,.9)':'rgba(248,113,113,.9)',
            color:'white', fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:20,
            backdropFilter:'blur(4px)',
          }}>
            {p.stock>0?p.stock+' uds':'Agotado'}
          </div>
          {/* Badge marca */}
          <div style={{ position:'absolute', bottom:6, left:6,
            background:'rgba(10,8,20,.8)', color:'var(--txt3)',
            fontSize:8, fontWeight:600, padding:'2px 7px', borderRadius:20,
            backdropFilter:'blur(4px)', textTransform:'uppercase', letterSpacing:'.5px',
          }}>
            {p.marca}
          </div>
        </div>
      </Link>
      {/* Info */}
      <div style={{ padding:'10px 10px 12px' }}>
        <p style={{ fontSize:9, fontFamily:'monospace', color:'var(--txt3)',
          marginBottom:3 }}>{p.sku}</p>
        <Link href={'/producto/'+p.id} style={{ textDecoration:'none' }}>
          <p style={{
            fontSize:11, fontWeight:600, color:'var(--txt)', lineHeight:1.35,
            marginBottom:8, height:'2.7em',
            display:'-webkit-box', WebkitLineClamp:2,
            WebkitBoxOrient:'vertical', overflow:'hidden',
          }}>{p.nombre}</p>
        </Link>
        <div style={{ display:'flex', alignItems:'center',
          justifyContent:'space-between', marginBottom:8 }}>
          <span style={{ fontSize:16, fontWeight:800, color:'var(--txt)',
            letterSpacing:'-0.5px', fontFeatureSettings:"'tnum'" }}>
            ${p.precio.toLocaleString('es-MX')}
          </span>
        </div>
        {/* Botones: Ver + Cotizar */}
        <div style={{ display:'flex', gap:6 }}>
          <Link href={'/producto/'+p.id} style={{
            flex:1, height:34, background:'var(--surface)', color:'var(--txt2)',
            fontWeight:600, fontSize:11, borderRadius:9, border:'1px solid var(--border)',
            textDecoration:'none', display:'flex', alignItems:'center',
            justifyContent:'center', gap:4,
          }}>
            <span dangerouslySetInnerHTML={{ __html: SVG['eye'] ?? '' }}
              style={{ display:'flex', transform:'scale(.8)' }} />
            Ver
          </Link>
          <motion.button whileTap={{ scale:.94 }}
            onClick={()=>{ add({id:p.id,nombre:p.nombre,precio:p.precio}); toast.success('Agregado',{description:p.nombre.slice(0,30)+'...'}) }}
            style={{
              flex:1, height:34, background:'var(--violet)', color:'white',
              fontWeight:700, fontSize:11, borderRadius:9, border:'none',
              cursor:'pointer', display:'flex', alignItems:'center',
              justifyContent:'center', gap:4,
            }}>
            <span dangerouslySetInnerHTML={{ __html: SVG['plus'] ?? '' }}
              style={{ display:'flex', transform:'scale(.9)' }} />
            Cotizar
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
