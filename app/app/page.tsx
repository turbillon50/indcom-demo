'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { COTIZACIONES } from '@/lib/data'

const EST: Record<string, { c: string; bg: string }> = {
  Pendiente:  { c:'var(--gold)', bg:'rgba(251,191,36,.12)' },
  Aprobada:   { c:'var(--green)', bg:'rgba(16,185,129,.12)' },
  Enviada:    { c:'var(--cyan)', bg:'rgba(34,211,238,.12)' },
  Cancelada:  { c:'var(--red)', bg:'rgba(248,113,113,.12)' },
}

export default function AppDashboard() {
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Hero card vendedor */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }}
        style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 60%, #7c3aed 100%)',
          borderRadius: 20, padding: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute', top:-30, right:-30, width:100, height:100,
          borderRadius:50, background:'rgba(255,255,255,.08)' }} />
        <p style={{ fontSize:12, color:'rgba(255,255,255,.7)', marginBottom:2 }}>
          <i className="ti ti-map-pin" style={{ marginRight:4 }} />
          Cancún / Q. Roo Norte
        </p>
        <p style={{ fontSize:20, fontWeight:800, color:'white', marginBottom:14 }}>
          Buenos días, Luis <span style={{fontSize:18}}>👋</span>
        </p>
        <Link href="/app/nueva-cotizacion" style={{ display:'inline-flex', alignItems:'center',
          gap:8, background:'white', color:'#6d28d9', fontWeight:700, fontSize:13,
          padding:'9px 18px', borderRadius:12, textDecoration:'none' }}>
          <i className="ti ti-plus" style={{fontSize:15}} />
          Nueva cotización
        </Link>
      </motion.div>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
        {[
          { l:'Cotizaciones', v:'12', i:'ti-file-text', c:'var(--violet)' },
          { l:'Aprobadas', v:'7', i:'ti-check', c:'var(--green)' },
          { l:'Pendientes', v:'3', i:'ti-clock', c:'var(--gold)' },
          { l:'Total MXN', v:'$284k', i:'ti-trending-up', c:'var(--cyan)' },
        ].map((k,i) => (
          <motion.div key={k.l} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            transition={{delay:i*.05}}
            style={{ background:'var(--card)', border:'1px solid var(--border)',
              borderRadius:16, padding:16 }}>
            <i className={k.i} style={{fontSize:20,color:k.c,marginBottom:8,display:'block'}} />
            <p style={{fontSize:22,fontWeight:900,color:'var(--txt)',
              letterSpacing:'-0.5px',fontFeatureSettings:"'tnum'"}}>{k.v}</p>
            <p style={{fontSize:11,color:'var(--txt3)',marginTop:2}}>{k.l}</p>
          </motion.div>
        ))}
      </div>

      {/* Cotizaciones recientes */}
      <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:18, overflow:'hidden' }}>
        <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--border)',
          display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <p style={{fontSize:14,fontWeight:700,color:'var(--txt)'}}>Cotizaciones recientes</p>
          <Link href="/app/cotizaciones" style={{fontSize:12,color:'var(--violet)',
            textDecoration:'none',fontWeight:600}}>Ver todas</Link>
        </div>
        {COTIZACIONES.slice(0,5).map((q,i) => {
          const e = EST[q.estado] ?? {c:'var(--txt3)',bg:'var(--surface)'}
          return (
            <div key={q.id} style={{ padding:'12px 16px',
              borderBottom: i<4?'1px solid var(--border)':'none',
              display:'flex', alignItems:'center', gap:10 }}>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:12,fontWeight:700,color:'var(--txt)',
                  fontFamily:'monospace'}}>{q.folio}</p>
                <p style={{fontSize:11,color:'var(--txt3)',overflow:'hidden',
                  textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{q.cliente}</p>
              </div>
              <span style={{fontSize:14,fontWeight:800,color:'var(--txt)',
                fontFeatureSettings:"'tnum'"}}>${(q.total/1000).toFixed(0)}k</span>
              <span style={{fontSize:10,fontWeight:600,padding:'3px 8px',borderRadius:8,
                color:e.c,background:e.bg}}>{q.estado}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
