'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { PRODUCTOS, CAT_META } from '@/lib/data'
import { SVG } from '@/components/svg'
import { toast } from 'sonner'

export default function AdminProductosPage() {
  const [q, setQ] = useState('')
  const filtered = PRODUCTOS.filter(p => !q || p.nombre.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()))
  return (
    <div style={{padding:16}}>
      <div style={{display:'flex',gap:10,marginBottom:14}}>
        <div style={{flex:1,position:'relative'}}>
          <span style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',
            display:'flex',alignItems:'center',color:'var(--txt3)'}}
            dangerouslySetInnerHTML={{__html:SVG['search']??''}} />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar producto o SKU..."
            style={{width:'100%',background:'var(--card)',border:'1px solid var(--border)',
              borderRadius:12,paddingLeft:34,paddingRight:12,paddingTop:10,paddingBottom:10,
              fontSize:14,color:'var(--txt)',outline:'none'}} />
        </div>
        <button onClick={()=>toast.info('Nuevo producto')}
          style={{flexShrink:0,background:'var(--violet)',border:'none',borderRadius:12,
            color:'white',fontWeight:700,fontSize:13,padding:'0 14px',cursor:'pointer',
            display:'flex',alignItems:'center',gap:6}}>
          <span dangerouslySetInnerHTML={{__html:SVG['plus']??''}} style={{display:'flex'}} />
          Nuevo
        </button>
      </div>
      <p style={{fontSize:12,color:'var(--txt3)',marginBottom:10}}>{filtered.length} productos</p>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {filtered.map((p,i)=>{
          const color = CAT_META[p.categoria]?.color ?? 'var(--violet)'
          return (
            <motion.div key={p.id} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
              transition={{delay:i*.025}}
              style={{background:'var(--card)',border:'1px solid var(--border)',
                borderRadius:14,padding:12,display:'flex',alignItems:'center',gap:12}}>
              {/* Foto real Higgsfield */}
              <div style={{width:52,height:52,borderRadius:12,overflow:'hidden',flexShrink:0,
                border:'1px solid var(--border)'}}>
                <img src={p.img} alt={p.nombre}
                  style={{width:'100%',height:'100%',objectFit:'cover'}} />
              </div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:12,fontWeight:600,color:'var(--txt)',overflow:'hidden',
                  textOverflow:'ellipsis',whiteSpace:'nowrap',marginBottom:2}}>{p.nombre}</p>
                <p style={{fontSize:10,color:'var(--txt3)',fontFamily:'monospace'}}>
                  {p.sku} · {p.marca}
                </p>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <p style={{fontSize:15,fontWeight:900,color:'var(--txt)',
                  fontFeatureSettings:"'tnum'"}}>${p.precio.toLocaleString('es-MX')}</p>
                <p style={{fontSize:10,fontWeight:600,
                  color:p.stock>10?'var(--green)':p.stock>0?'var(--gold)':'var(--red)'}}>
                  {p.stock} uds
                </p>
              </div>
              <button onClick={()=>toast.info('Editando '+p.sku)}
                style={{background:'none',border:'1px solid var(--border)',borderRadius:9,
                  color:'var(--txt3)',fontSize:11,fontWeight:600,padding:'6px 10px',
                  cursor:'pointer',flexShrink:0}}>
                Editar
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
