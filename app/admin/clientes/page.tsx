'use client'
import { CLIENTES } from '@/lib/data'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
export default function AdminClientesPage() {
  const total = CLIENTES.reduce((a,c)=>a+c.totalCompras,0)
  return (
    <div style={{padding:16}}>
      <p style={{fontSize:12,color:'var(--txt3)',marginBottom:14}}>
        {CLIENTES.length} clientes · ${total.toLocaleString('es-MX')} MXN facturado
      </p>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {CLIENTES.map((c,i)=>(
          <motion.div key={c.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            transition={{delay:i*.04}} onClick={()=>toast.info(c.email)}
            style={{background:'var(--card)',border:'1px solid var(--border)',
              borderRadius:16,padding:14,cursor:'pointer'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
              <p style={{fontSize:13,fontWeight:700,color:'var(--txt)',overflow:'hidden',
                textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:220}}>{c.razonSocial}</p>
              <span style={{fontSize:10,fontWeight:600,padding:'3px 8px',borderRadius:8,
                color:'var(--green)',background:'rgba(16,185,129,.12)',flexShrink:0}}>{c.estado}</span>
            </div>
            <p style={{fontSize:11,color:'var(--txt3)',marginBottom:8}}>
              {c.contacto} · {c.ciudad}
            </p>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <p style={{fontSize:11,color:'var(--txt3)'}}>Vendedor: {c.vendedor}</p>
              <p style={{fontSize:15,fontWeight:900,color:'var(--txt)',
                fontFeatureSettings:"'tnum'"}}>${c.totalCompras.toLocaleString('es-MX')}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
