'use client'
import { useState } from 'react'
import { COTIZACIONES } from '@/lib/data'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

const EST: Record<string, {c:string;bg:string}> = {
  Pendiente:{c:'var(--gold)',bg:'rgba(251,191,36,.12)'},
  Aprobada:{c:'var(--green)',bg:'rgba(16,185,129,.12)'},
  Enviada:{c:'var(--cyan)',bg:'rgba(34,211,238,.12)'},
  Cancelada:{c:'var(--red)',bg:'rgba(248,113,113,.12)'},
}

export default function AdminCotizacionesPage() {
  const [f, setF] = useState('')
  const filtered = COTIZACIONES.filter(q => !f || q.estado === f)
  const total = filtered.reduce((a,c)=>a+c.total,0)
  return (
    <div style={{padding:16}}>
      <p style={{fontSize:12,color:'var(--txt3)',marginBottom:12}}>
        {filtered.length} cotizaciones · ${total.toLocaleString('es-MX')} MXN
      </p>
      <div style={{display:'flex',gap:8,overflowX:'auto',marginBottom:14,paddingBottom:4}}>
        {['','Pendiente','Aprobada','Enviada','Cancelada'].map(e=>{
          const colors:Record<string,string>={Pendiente:'var(--gold)',Aprobada:'var(--green)',
            Enviada:'var(--cyan)',Cancelada:'var(--red)'}
          const color = colors[e] ?? 'var(--violet)'
          return (
            <button key={e} onClick={()=>setF(e)}
              style={{flexShrink:0,padding:'6px 14px',borderRadius:20,
                border:`1px solid ${f===e?color:'var(--border)'}`,
                background:f===e?color+'20':'var(--surface)',
                color:f===e?color:'var(--txt3)',
                fontSize:12,fontWeight:600,cursor:'pointer'}}>
              {e||'Todas'}
            </button>
          )
        })}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {filtered.map((q,i)=>{
          const e=EST[q.estado]??{c:'var(--txt3)',bg:'var(--surface)'}
          return (
            <motion.div key={q.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
              transition={{delay:i*.03}} onClick={()=>toast.info(q.nota)}
              style={{background:'var(--card)',border:'1px solid var(--border)',
                borderRadius:16,padding:14,cursor:'pointer'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <p style={{fontSize:13,fontWeight:700,color:'var(--txt)',fontFamily:'monospace'}}>{q.folio}</p>
                <span style={{fontSize:10,fontWeight:600,padding:'3px 10px',borderRadius:8,color:e.c,background:e.bg}}>{q.estado}</span>
              </div>
              <p style={{fontSize:13,color:'var(--txt2)',marginBottom:4}}>{q.cliente}</p>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <p style={{fontSize:11,color:'var(--txt3)'}}>{q.vendedor} · {q.items} items · {q.fecha}</p>
                <p style={{fontSize:17,fontWeight:900,color:'var(--txt)',fontFeatureSettings:"'tnum'"}}>${q.total.toLocaleString('es-MX')}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
