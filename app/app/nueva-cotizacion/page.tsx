'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTOS, CAT_META } from '@/lib/data'
import { toast } from 'sonner'

export default function NuevaCotizacionPage() {
  const [q, setQ] = useState('')
  const [items, setItems] = useState<{id:string;nombre:string;precio:number;qty:number}[]>([])
  const [cliente, setCliente] = useState('')
  const [step, setStep] = useState<'productos'|'resumen'>('productos')
  const filtered = q
    ? PRODUCTOS.filter(p => p.nombre.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()))
    : PRODUCTOS.slice(0,12)
  const add = (p: typeof PRODUCTOS[0]) => setItems(prev => {
    const ex = prev.find(x=>x.id===p.id)
    return ex ? prev.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x) : [...prev,{id:p.id,nombre:p.nombre,precio:p.precio,qty:1}]
  })
  const total = items.reduce((a,c)=>a+c.precio*c.qty,0)

  return (
    <div style={{padding:16}}>
      {step==='productos' ? (
        <>
          <div style={{position:'relative',marginBottom:12}}>
            <i className="ti ti-search" style={{position:'absolute',left:12,top:'50%',
              transform:'translateY(-50%)',color:'var(--txt3)',fontSize:15}} />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar producto..."
              style={{width:'100%',background:'var(--card)',border:'1px solid var(--border)',
                borderRadius:12,paddingLeft:36,paddingRight:12,paddingTop:10,paddingBottom:10,
                fontSize:14,color:'var(--txt)',outline:'none'}} />
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:80}}>
            {filtered.map(p => {
              const m = CAT_META[p.categoria]??{color:'var(--violet)',icon:'ti-package'}
              const inCart = items.find(x=>x.id===p.id)
              return (
                <div key={p.id} style={{background:'var(--card)',border:'1px solid var(--border)',
                  borderRadius:14,padding:12,display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:42,height:42,borderRadius:12,background:m.color+'15',
                    display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:m.color}}>
                    <i className={m.icon} style={{fontSize:20}} />
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontSize:12,fontWeight:600,color:'var(--txt)',overflow:'hidden',
                      textOverflow:'ellipsis',whiteSpace:'nowrap',marginBottom:2}}>{p.nombre}</p>
                    <p style={{fontSize:11,color:'var(--txt3)',fontFeatureSettings:"'tnum'"}}>
                      {p.sku} · ${p.precio.toLocaleString('es-MX')}
                    </p>
                  </div>
                  <motion.button whileTap={{scale:.9}} onClick={()=>{add(p);toast.success('Agregado')}}
                    style={{width:36,height:36,borderRadius:10,
                      background:inCart?'var(--green)':'var(--violet)',
                      border:'none',color:'white',cursor:'pointer',
                      display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    {inCart
                      ? <span style={{fontSize:13,fontWeight:700}}>{inCart.qty}</span>
                      : <i className="ti ti-plus" style={{fontSize:16}} />}
                  </motion.button>
                </div>
              )
            })}
          </div>
          <AnimatePresence>
            {items.length>0 && (
              <motion.div initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} exit={{y:80,opacity:0}}
                style={{position:'fixed',bottom:'calc(var(--tab-h)+var(--safe-b))',left:0,right:0,
                  padding:'12px 16px',background:'rgba(10,8,20,.97)',backdropFilter:'blur(20px)',
                  borderTop:'1px solid var(--border)',zIndex:90}}>
                <motion.button whileTap={{scale:.97}} onClick={()=>setStep('resumen')}
                  style={{width:'100%',height:52,background:'var(--violet)',color:'white',
                    fontWeight:800,fontSize:15,borderRadius:16,border:'none',cursor:'pointer',
                    display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                  <i className="ti ti-send" style={{fontSize:16}} />
                  Revisar cotización · {items.length} items · ${total.toLocaleString('es-MX')}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <input value={cliente} onChange={e=>setCliente(e.target.value)}
            placeholder="Razón social del cliente"
            style={{background:'var(--card)',border:'1px solid var(--border)',
              borderRadius:13,padding:'13px 16px',fontSize:14,color:'var(--txt)',outline:'none'}} />
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden'}}>
            {items.map((it,i)=>(
              <div key={it.id} style={{padding:'12px 14px',
                borderBottom:i<items.length-1?'1px solid var(--border)':'none',
                display:'flex',alignItems:'center',gap:10}}>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontSize:12,color:'var(--txt)',fontWeight:600,
                    overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{it.nombre}</p>
                  <p style={{fontSize:11,color:'var(--txt3)'}}>x{it.qty} · ${it.precio.toLocaleString('es-MX')} c/u</p>
                </div>
                <span style={{fontSize:14,fontWeight:800,color:'var(--txt)',
                  fontFeatureSettings:"'tnum'"}}>${(it.precio*it.qty).toLocaleString('es-MX')}</span>
                <button onClick={()=>setItems(p=>p.filter(x=>x.id!==it.id))}
                  style={{background:'none',border:'none',color:'var(--txt3)',cursor:'pointer',display:'flex'}}>
                  <i className="ti ti-trash" style={{fontSize:15}} />
                </button>
              </div>
            ))}
          </div>
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:14}}>
            {[['Subtotal',total],['IVA 16%',total*.16]].map(([l,v])=>(
              <div key={String(l)} style={{display:'flex',justifyContent:'space-between',
                fontSize:13,color:'var(--txt2)',marginBottom:6}}>
                <span>{l}</span>
                <span style={{fontFeatureSettings:"'tnum'"}}>${Math.round(Number(v)).toLocaleString('es-MX')}</span>
              </div>
            ))}
            <div style={{display:'flex',justifyContent:'space-between',fontSize:20,fontWeight:900,
              color:'var(--txt)',paddingTop:8,borderTop:'1px solid var(--border)',
              fontFeatureSettings:"'tnum'"}}>
              <span>Total</span><span>${Math.round(total*1.16).toLocaleString('es-MX')}</span>
            </div>
          </div>
          <motion.button whileTap={{scale:.97}}
            onClick={()=>{toast.success('Cotización IND-2025-035 enviada');setItems([]);setCliente('');setStep('productos')}}
            style={{height:52,background:'var(--violet)',color:'white',fontWeight:800,fontSize:15,
              borderRadius:16,border:'none',cursor:'pointer',display:'flex',alignItems:'center',
              justifyContent:'center',gap:8}}>
            <i className="ti ti-send" style={{fontSize:17}} />Generar y enviar
          </motion.button>
          <button onClick={()=>setStep('productos')}
            style={{background:'none',border:'none',color:'var(--txt3)',fontSize:13,
              cursor:'pointer',padding:8}}>
            ← Agregar más productos
          </button>
        </div>
      )}
    </div>
  )
}
