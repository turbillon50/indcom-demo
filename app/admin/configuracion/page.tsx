'use client'
import { useState } from 'react'
import { toast } from 'sonner'

const TABS = ['Empresa','Vendedores','Notificaciones','Branding']

export default function ConfigPage() {
  const [tab, setTab] = useState('Empresa')
  return (
    <div style={{padding:16}}>
      <div style={{display:'flex',gap:8,overflowX:'auto',marginBottom:20}}>
        {TABS.map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{flexShrink:0,padding:'7px 16px',borderRadius:20,
              border:`1px solid ${tab===t?'var(--violet)':'var(--border)'}`,
              background:tab===t?'rgba(124,58,237,.2)':'var(--surface)',
              color:tab===t?'var(--violet)':'var(--txt3)',
              fontSize:13,fontWeight:600,cursor:'pointer'}}>
            {t}
          </button>
        ))}
      </div>
      {tab==='Empresa'&&<div style={{display:'flex',flexDirection:'column',gap:12}}>
        {[{l:'Nombre',v:'INDCOM'},{l:'RFC',v:'IND200101AA1'},
          {l:'Email',v:'ventas@indcom.mx'},{l:'Teléfono',v:'+52 998 800 0000'},
          {l:'Ciudad',v:'Cancún, Q. Roo'}
        ].map(f=>(
          <div key={f.l}>
            <label style={{fontSize:10,color:'var(--txt3)',textTransform:'uppercase',
              letterSpacing:'.1em',display:'block',marginBottom:6}}>{f.l}</label>
            <input defaultValue={f.v}
              style={{width:'100%',background:'var(--card)',border:'1px solid var(--border)',
                borderRadius:12,padding:'12px 14px',fontSize:14,color:'var(--txt)',outline:'none'}} />
          </div>
        ))}
        <button onClick={()=>toast.success('Cambios guardados')}
          style={{background:'var(--violet)',color:'white',fontWeight:700,fontSize:14,
            height:48,borderRadius:14,border:'none',cursor:'pointer',
            display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginTop:4}}>
          <i className="ti ti-device-floppy" style={{fontSize:16}} />
          Guardar cambios
        </button>
      </div>}
      {tab==='Vendedores'&&<div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,overflow:'hidden'}}>
        {['Luis Herrera','Ana Torres','Pedro Castillo'].map((v,i,arr)=>(
          <div key={v} style={{padding:'14px 16px',
            borderBottom:i<arr.length-1?'1px solid var(--border)':'none',
            display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:38,height:38,borderRadius:12,background:'rgba(124,58,237,.2)',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:13,fontWeight:800,color:'var(--violet)'}}>
              {v.split(' ').map(x=>x[0]).join('')}
            </div>
            <div style={{flex:1}}>
              <p style={{fontSize:14,fontWeight:600,color:'var(--txt)'}}>{v}</p>
              <p style={{fontSize:11,color:'var(--txt3)'}}>Activo</p>
            </div>
            <button onClick={()=>toast.info('Editando '+v)}
              style={{background:'none',border:'1px solid var(--border)',borderRadius:9,
                color:'var(--txt3)',fontSize:12,padding:'6px 12px',cursor:'pointer'}}>
              <i className="ti ti-edit" style={{fontSize:13}} />
            </button>
          </div>
        ))}
      </div>}
      {tab==='Notificaciones'&&<div style={{display:'flex',flexDirection:'column',gap:12}}>
        {['Notificar nueva cotización','Alerta de stock bajo (< 5 uds)','Resumen semanal de ventas'].map(n=>(
          <div key={n} style={{background:'var(--card)',border:'1px solid var(--border)',
            borderRadius:14,padding:'14px 16px',display:'flex',alignItems:'center',
            justifyContent:'space-between'}}>
            <span style={{fontSize:14,color:'var(--txt)'}}>{n}</span>
            <div style={{width:44,height:26,background:'var(--violet)',borderRadius:13,
              position:'relative',cursor:'pointer'}}>
              <div style={{position:'absolute',right:3,top:3,width:20,height:20,
                background:'white',borderRadius:10}} />
            </div>
          </div>
        ))}
      </div>}
      {tab==='Branding'&&<div style={{display:'flex',flexDirection:'column',gap:14}}>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',
          borderRadius:18,padding:24,textAlign:'center'}}>
          <p style={{fontSize:36,fontWeight:900,color:'var(--txt)',letterSpacing:'-1px'}}>
            <span style={{borderRight:'4px solid var(--violet)',paddingRight:4,marginRight:4}}>I</span>
            NDCOM
          </p>
          <p style={{fontSize:11,color:'var(--txt3)',marginTop:6}}>Logo actual</p>
        </div>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,padding:16}}>
          <p style={{fontSize:13,fontWeight:600,color:'var(--txt2)',marginBottom:12}}>Paleta de colores</p>
          {[{n:'Violet',c:'var(--violet)',h:'#7c3aed'},{n:'Cyan',c:'var(--cyan)',h:'#22d3ee'},{n:'Gold',c:'var(--gold)',h:'#fbbf24'}].map(col=>(
            <div key={col.n} style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
              <div style={{width:32,height:32,borderRadius:10,background:col.c,border:'1px solid var(--border)'}} />
              <div>
                <p style={{fontSize:13,fontWeight:600,color:'var(--txt)'}}>{col.n}</p>
                <p style={{fontSize:11,fontFamily:'monospace',color:'var(--txt3)'}}>{col.h}</p>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  )
}
