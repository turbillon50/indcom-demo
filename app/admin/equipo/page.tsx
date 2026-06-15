'use client'
import { VENDEDORES } from '@/lib/data'
import { toast } from 'sonner'
export default function EquipoPage() {
  return (
    <div style={{padding:16}}>
      <p style={{fontSize:12,color:'var(--txt3)',marginBottom:14}}>{VENDEDORES.length} vendedores activos</p>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {VENDEDORES.map(v=>(
          <div key={v.id} style={{background:'var(--card)',border:'1px solid var(--border)',
            borderRadius:18,padding:16,display:'flex',alignItems:'center',gap:14}}>
            <img src={'https://pravatar.cc/150?img='+v.avatar}
              style={{width:56,height:56,borderRadius:16,border:'1.5px solid var(--border)'}} alt={v.nombre} />
            <div style={{flex:1}}>
              <p style={{fontSize:15,fontWeight:800,color:'var(--txt)'}}>{v.nombre}</p>
              <p style={{fontSize:12,color:'var(--txt3)'}}>{v.zona}</p>
              <p style={{fontSize:11,color:'var(--txt3)'}}>{v.cotizacionesMes} cotizaciones · ${(v.totalMes/1000).toFixed(0)}k</p>
            </div>
            <button onClick={()=>toast.info('Editando '+v.nombre)}
              style={{background:'none',border:'1px solid var(--border)',borderRadius:10,
                color:'var(--txt3)',fontSize:12,padding:'8px 14px',cursor:'pointer'}}>
              <i className="ti ti-edit" style={{fontSize:14}} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
