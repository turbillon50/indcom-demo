'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIAS, PRODUCTOS, MARCAS } from '@/lib/data'
import { ProductCard } from '@/components/product-card'
import { Logo } from '@/components/logo'
import { BottomTab } from '@/components/bottom-tab'
import { useStore } from '@/lib/store'
import { useTheme } from '@/lib/theme'
import { SVG } from '@/components/svg'
import { toast } from 'sonner'

const HERO = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_014120_e2b3449f-b562-4de2-b43c-cbd6f66360f6.png"

const CAT_COLOR: Record<string,string> = {
  'Seguridad CCTV':'#7c3aed','Radiocomunicación':'#22d3ee',
  'Energía Solar':'#fbbf24','Telecomunicaciones':'#a78bfa',
  'Networking':'#10b981','Automatización':'#f87171',
}

function Counter({end,suffix=''}: {end:number;suffix?:string}) {
  const [v,setV]=useState(0);const ref=useRef<HTMLSpanElement>(null)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting) return
      let cur=0;const step=end/60
      const t=setInterval(()=>{cur=Math.min(cur+step,end);setV(Math.round(cur));if(cur>=end)clearInterval(t)},16)
      obs.disconnect()
    },{threshold:.3})
    if(ref.current) obs.observe(ref.current)
    return ()=>obs.disconnect()
  },[end])
  return <span ref={ref}>{v.toLocaleString('es-MX')}{suffix}</span>
}

export default function LandingPage() {
  const [q,setQ]=useState('')
  const carrito=useStore(s=>s.carrito)
  const totalItems=carrito.reduce((a,c)=>a+c.qty,0)
  const {theme,toggle}=useTheme()
  const router=useRouter()
  const [tabProd,setTabProd]=useState<'PRODUCTOS'|'MARCAS'|'CATEGORÍAS'>('PRODUCTOS')

  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>

      {/* ── HEADER LANDING — 2 filas como Syscom ── */}
      <header style={{
        position:'fixed',top:0,left:0,right:0,zIndex:100,
        paddingTop:'env(safe-area-inset-top,0px)',
        background:'rgba(10,8,20,.97)',
        backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
        borderBottom:'1px solid var(--border)',
      }}>
        {/* Fila 1 */}
        <div style={{height:52,display:'flex',alignItems:'center',padding:'0 14px',gap:10}}>
          <Logo size={18} />
          <div style={{flex:1}} />
          <button onClick={toggle} style={{width:38,height:38,borderRadius:10,
            border:'1px solid var(--border)',background:'var(--surface)',
            color:'var(--txt2)',cursor:'pointer',display:'flex',
            alignItems:'center',justifyContent:'center'}}>
            <span dangerouslySetInnerHTML={{__html:SVG[theme==='dark'?'sun':'moon']??''}}
              style={{display:'flex',alignItems:'center'}} />
          </button>
          <Link href="/cotizador" style={{position:'relative',width:38,height:38,borderRadius:10,
            border:'1px solid var(--border)',background:'var(--surface)',
            display:'flex',alignItems:'center',justifyContent:'center',
            textDecoration:'none',color:'var(--txt2)'}}>
            <span dangerouslySetInnerHTML={{__html:SVG['cart']??''}}
              style={{display:'flex',alignItems:'center'}} />
            {totalItems>0&&<span style={{position:'absolute',top:4,right:4,
              background:'var(--violet)',color:'white',fontSize:9,fontWeight:700,
              width:15,height:15,borderRadius:8,display:'flex',alignItems:'center',
              justifyContent:'center'}}>{totalItems}</span>}
          </Link>
          <Link href="/sign-in" style={{background:'var(--violet)',color:'white',
            fontWeight:700,fontSize:13,padding:'8px 14px',borderRadius:10,textDecoration:'none'}}>
            Ingresar
          </Link>
        </div>
        {/* Fila 2 — buscador */}
        <div style={{padding:'0 14px 10px'}}>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',
              display:'flex',alignItems:'center',color:'var(--txt3)' }}
              dangerouslySetInnerHTML={{__html:SVG['search']??''}} />
            <input value={q} onChange={e=>setQ(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&router.push('/catalogo?q='+q)}
              placeholder="Buscar producto, SKU o marca..."
              style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',
                borderRadius:12,paddingLeft:36,paddingRight:14,paddingTop:9,paddingBottom:9,
                fontSize:14,color:'var(--txt)',outline:'none'}} />
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{paddingTop:'calc(100px + env(safe-area-inset-top,0px))',
        position:'relative',height:'65vw',minHeight:280,maxHeight:360,overflow:'hidden'}}>
        <img src={HERO} alt="INDCOM"
          style={{width:'100%',height:'100%',objectFit:'cover',
            filter:'brightness(.4) saturate(1.3)'}} />
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(to bottom,rgba(3,2,10,.2) 0%,rgba(3,2,10,.85) 75%,var(--bg) 100%)' }} />
        <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',
          justifyContent:'flex-end',padding:'0 20px 28px'}}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            transition={{duration:.5,ease:[.22,1,.36,1]}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,
              background:'rgba(124,58,237,.2)',border:'1px solid rgba(124,58,237,.35)',
              borderRadius:20,padding:'4px 12px',marginBottom:10}}>
              <span style={{width:6,height:6,borderRadius:3,background:'var(--violet)',
                animation:'pulse 2s infinite'}} />
              <span style={{fontSize:11,fontWeight:600,color:'#c4b5fd'}}>
                Distribuidor autorizado · Cancún, Q.Roo
              </span>
            </div>
            <h1 style={{fontSize:'clamp(24px,6.5vw,38px)',fontWeight:900,color:'var(--txt)',
              lineHeight:1.15,letterSpacing:'-0.5px',marginBottom:8}}>
              Tecnología que<br/>
              <span style={{color:'var(--violet)'}}>protege</span>,
              <span style={{color:'var(--txt)'}}> conecta</span><br/>
              y <span style={{color:'var(--cyan)'}}>transforma</span>
            </h1>
            <div style={{display:'flex',gap:8,marginTop:14}}>
              <Link href="/catalogo" style={{background:'var(--violet)',color:'white',
                fontWeight:700,fontSize:13,padding:'10px 18px',borderRadius:12,
                textDecoration:'none',display:'flex',alignItems:'center',gap:6,
                animation:'glowPulse 2s infinite'}}>
                Ver catálogo
              </Link>
              <Link href="/sign-up" style={{background:'var(--surface)',color:'var(--txt)',
                fontWeight:600,fontSize:13,padding:'10px 18px',borderRadius:12,
                textDecoration:'none',border:'1px solid var(--border)',
                display:'flex',alignItems:'center',gap:6}}>
                Crear cuenta
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{background:'var(--surface)',borderTop:'1px solid var(--border)',
        borderBottom:'1px solid var(--border)',padding:'16px 20px',
        display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,textAlign:'center'}}>
        {[{l:'Productos',v:847,s:'+'},[{l:'Clientes',v:156,s:''},{l:'Años',v:15,s:''}]]
          .flat().map((s:any)=>(
          <div key={s.l}>
            <p style={{fontSize:24,fontWeight:900,color:'var(--txt)',letterSpacing:'-0.5px',
              fontFeatureSettings:"'tnum'"}}>
              <Counter end={s.v} suffix={s.s} />
            </p>
            <p style={{fontSize:10,color:'var(--txt3)',textTransform:'uppercase',
              letterSpacing:'.1em',marginTop:2}}>{s.l}</p>
          </div>
        ))}
      </section>

      {/* ── TABS tipo Syscom ── */}
      <section style={{background:'var(--surface)',borderBottom:'1px solid var(--border)',
        padding:'0 14px',display:'flex',gap:0}}>
        {(['PRODUCTOS','MARCAS','CATEGORÍAS'] as const).map(t=>(
          <button key={t} onClick={()=>setTabProd(t)} style={{
            padding:'11px 14px',fontSize:12,fontWeight:600,cursor:'pointer',
            background:'none',border:'none',borderBottom:tabProd===t?'2px solid var(--violet)':'2px solid transparent',
            color:tabProd===t?'var(--violet)':'var(--txt3)',transition:'all .15s',
          }}>{t}</button>
        ))}
      </section>

      {/* ── CONTENIDO SEGÚN TAB ── */}
      {tabProd==='PRODUCTOS'&&(
        <section style={{padding:'14px 14px'}}>
          {/* Chips de marca */}
          <div style={{display:'flex',gap:8,overflowX:'auto',marginBottom:14,
            paddingBottom:4,scrollbarWidth:'none'}}>
            {['Todas','Hikvision','Motorola','Ubiquiti','MikroTik','Epcom'].map(m=>(
              <button key={m} style={{flexShrink:0,padding:'5px 12px',borderRadius:20,
                border:'1px solid var(--border)',background:'var(--surface)',
                color:'var(--txt3)',fontSize:11,fontWeight:600,cursor:'pointer'}}>{m}</button>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
            {PRODUCTOS.slice(0,8).map(p=><ProductCard key={p.id} p={p} />)}
          </div>
          <Link href="/catalogo" style={{display:'flex',alignItems:'center',justifyContent:'center',
            gap:8,marginTop:16,background:'var(--surface)',border:'1px solid var(--border)',
            borderRadius:14,padding:'12px',color:'var(--txt2)',fontWeight:600,fontSize:13,
            textDecoration:'none'}}>
            Ver todos los productos (+800) →
          </Link>
        </section>
      )}

      {tabProd==='CATEGORÍAS'&&(
        <section style={{padding:'14px 14px'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
            {CATEGORIAS.map(cat=>{
              const color=CAT_COLOR[cat]??'var(--violet)'
              return (
                <Link key={cat} href={'/catalogo?cat='+encodeURIComponent(cat)}
                  style={{background:color+'10',border:'1px solid '+color+'25',
                    borderRadius:14,padding:'18px 14px',textDecoration:'none',
                    display:'flex',flexDirection:'column',gap:6}}>
                  <span style={{fontSize:13,fontWeight:700,color,lineHeight:1.3}}>{cat}</span>
                  <span style={{fontSize:10,color:'var(--txt3)'}}>Ver productos →</span>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {tabProd==='MARCAS'&&(
        <section style={{padding:'14px 14px'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
            {['Hikvision','Motorola','Ubiquiti','MikroTik','Huawei','Epcom','Canadian Solar','ZKTeco'].map(m=>(
              <Link key={m} href={'/catalogo?marca='+m}
                style={{background:'var(--card)',border:'1px solid var(--border)',
                  borderRadius:14,padding:'16px',textDecoration:'none',
                  display:'flex',flexDirection:'column',gap:4}}>
                <span style={{fontSize:15,fontWeight:700,color:'var(--txt)'}}>{m}</span>
                <span style={{fontSize:10,color:'var(--txt3)'}}>Ver productos →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <BottomTab mode="public" />
    </div>
  )
}
