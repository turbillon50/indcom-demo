'use client'
import { COTIZACIONES } from '@/lib/data'
import Link from 'next/link'
import { motion } from 'framer-motion'

const EST: Record<string, { c: string; bg: string }> = {
  Pendiente:{c:'var(--gold)',bg:'rgba(251,191,36,.12)'},
  Aprobada:{c:'var(--green)',bg:'rgba(16,185,129,.12)'},
  Enviada:{c:'var(--cyan)',bg:'rgba(34,211,238,.12)'},
  Cancelada:{c:'var(--red)',bg:'rgba(248,113,113,.12)'},
}

export default function CotizacionesPage() {
  return (
    <div style={{ padding:16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <p style={{fontSize:13,color:'var(--txt3)'}}>{COTIZACIONES.length} cotizaciones</p>
        <Link href="/app/nueva-cotizacion" style={{ display:'flex', alignItems:'center', gap:6,
          background:'var(--violet)', color:'white', fontWeight:700, fontSize:13,
          padding:'8px 14px', borderRadius:12, textDecoration:'none' }}>
          <i className="ti ti-plus" style={{fontSize:14}} />Nueva
        </Link>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {COTIZACIONES.map((q,i) => {
          const e = EST[q.estado] ?? {c:'var(--txt3)',bg:'var(--surface)'}
          return (
            <motion.div key={q.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
              transition={{delay:i*.04}}
              style={{ background:'var(--card)', border:'1px solid var(--border)',
                borderRadius:16, padding:14 }}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <p style={{fontSize:13,fontWeight:700,color:'var(--txt)',fontFamily:'monospace'}}>{q.folio}</p>
                <span style={{fontSize:10,fontWeight:600,padding:'3px 10px',borderRadius:8,
                  color:e.c,background:e.bg}}>{q.estado}</span>
              </div>
              <p style={{fontSize:13,color:'var(--txt2)',marginBottom:4}}>{q.cliente}</p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <p style={{fontSize:11,color:'var(--txt3)'}}>{q.items} productos · {q.fecha}</p>
                <p style={{fontSize:17,fontWeight:900,color:'var(--txt)',
                  fontFeatureSettings:"'tnum'"}}>${q.total.toLocaleString('es-MX')}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
