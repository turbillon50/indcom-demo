'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { KPI, COTIZACIONES, CHART_MENSUAL, VENDEDORES } from '@/lib/data'

const EST: Record<string, {c:string;bg:string}> = {
  Pendiente:{c:'var(--gold)',bg:'rgba(251,191,36,.12)'},
  Aprobada:{c:'var(--green)',bg:'rgba(16,185,129,.12)'},
  Enviada:{c:'var(--cyan)',bg:'rgba(34,211,238,.12)'},
  Cancelada:{c:'var(--red)',bg:'rgba(248,113,113,.12)'},
}

export default function AdminDashboard() {
  const maxChart = Math.max(...CHART_MENSUAL.map(c=>c.v))
  return (
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:14}}>
      {/* KPIs */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
        {[
          {l:'Productos',v:KPI.totalProductos.toLocaleString(),i:'ti-package',c:'var(--violet)',href:'/admin/productos'},
          {l:'Cotizaciones mes',v:String(KPI.cotizacionesMes),i:'ti-file-text',c:'var(--cyan)',href:'/admin/cotizaciones'},
          {l:'Clientes activos',v:String(KPI.clientesActivos),i:'ti-users',c:'#a78bfa',href:'/admin/clientes'},
          {l:'$'+( KPI.valorMes/1000000).toFixed(1)+'M MXN',v:'+'+KPI.crecimientoMes+'%',i:'ti-trending-up',c:'var(--green)',href:'/admin/cotizaciones'},
        ].map((k,i)=>(
          <motion.div key={k.l} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            transition={{delay:i*.05}}
            whileHover={{y:-2}}
            style={{display:'block'}}>
            <Link href={k.href} style={{textDecoration:'none',display:'block',
              background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,padding:16}}>
              <i className={k.i} style={{fontSize:22,color:k.c,marginBottom:10,display:'block'}} />
              <p style={{fontSize:24,fontWeight:900,color:'var(--txt)',
                letterSpacing:'-0.5px',fontFeatureSettings:"'tnum'"}}>{k.v}</p>
              <p style={{fontSize:11,color:'var(--txt3)',marginTop:2}}>{k.l}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Gráfica mensual */}
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,padding:16}}>
        <p style={{fontSize:13,fontWeight:700,color:'var(--txt)',marginBottom:14}}>
          Valor de cotizaciones 2025
        </p>
        <div style={{display:'flex',alignItems:'flex-end',gap:8,height:80,marginBottom:8}}>
          {CHART_MENSUAL.map(c=>(
            <div key={c.mes} style={{flex:1,display:'flex',flexDirection:'column',
              alignItems:'center',gap:3}}>
              <span style={{fontSize:8,color:'var(--txt3)',fontFeatureSettings:"'tnum'"}}>
                ${(c.v/1000000).toFixed(1)}M
              </span>
              <motion.div initial={{height:0}} animate={{height:(c.v/maxChart*72)+'px'}}
                transition={{duration:.6,delay:.1}}
                style={{width:'100%',background:'linear-gradient(to top,var(--violet),var(--cyan))',
                  borderRadius:'4px 4px 0 0',minHeight:8}} />
              <span style={{fontSize:8,color:'var(--txt3)'}}>{c.mes}</span>
            </div>
          ))}
        </div>
        <p style={{fontSize:11,color:'var(--green)',fontWeight:600}}>
          <i className="ti ti-arrow-up-right" /> +{KPI.crecimientoMes}% vs mes anterior
        </p>
      </div>

      {/* Top vendedores */}
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,overflow:'hidden'}}>
        <p style={{padding:'14px 16px',fontSize:14,fontWeight:700,color:'var(--txt)',
          borderBottom:'1px solid var(--border)'}}>Top Vendedores</p>
        {VENDEDORES.map((v,i)=>(
          <div key={v.id} style={{padding:'12px 16px',
            borderBottom:i<VENDEDORES.length-1?'1px solid var(--border)':'none',
            display:'flex',alignItems:'center',gap:12}}>
            <img src={'https://pravatar.cc/150?img='+v.avatar}
              style={{width:36,height:36,borderRadius:12,border:'1.5px solid var(--border)'}} alt={v.nombre} />
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:600,color:'var(--txt)'}}>{v.nombre}</p>
              <p style={{fontSize:11,color:'var(--txt3)'}}>{v.cotizacionesMes} cotizaciones</p>
            </div>
            <p style={{fontSize:16,fontWeight:900,color:'var(--txt)',
              fontFeatureSettings:"'tnum'"}}>${(v.totalMes/1000).toFixed(0)}k</p>
          </div>
        ))}
      </div>

      {/* Últimas cotizaciones */}
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,overflow:'hidden'}}>
        <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border)',
          display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <p style={{fontSize:14,fontWeight:700,color:'var(--txt)'}}>Cotizaciones recientes</p>
          <Link href="/admin/cotizaciones" style={{fontSize:12,color:'var(--cyan)',
            textDecoration:'none',fontWeight:600}}>Ver todas</Link>
        </div>
        {COTIZACIONES.slice(0,5).map((q,i)=>{
          const e=EST[q.estado]??{c:'var(--txt3)',bg:'var(--surface)'}
          return (
            <div key={q.id} style={{padding:'12px 16px',
              borderBottom:i<4?'1px solid var(--border)':'none',
              display:'flex',alignItems:'center',gap:10}}>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:12,fontWeight:700,color:'var(--txt)',
                  fontFamily:'monospace'}}>{q.folio}</p>
                <p style={{fontSize:11,color:'var(--txt3)',overflow:'hidden',
                  textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{q.cliente}</p>
              </div>
              <span style={{fontSize:14,fontWeight:900,color:'var(--txt)',
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
