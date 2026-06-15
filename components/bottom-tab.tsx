'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SVG } from './svg'

type Mode = 'public' | 'vendedor' | 'admin'

const TABS = {
  public: [
    { href:'/', icon:'home', label:'Inicio', exact:true },
    { href:'/catalogo', icon:'grid', label:'Catálogo' },
    { href:'/cotizador', icon:'file', label:'Cotizador' },
    { href:'/sign-in', icon:'user', label:'Cuenta' },
  ],
  vendedor: [
    { href:'/app', icon:'home', label:'Inicio', exact:true },
    { href:'/catalogo', icon:'grid', label:'Catálogo' },
    { href:'/app/cotizaciones', icon:'file', label:'Mis Cots.' },
    { href:'/app/perfil', icon:'user', label:'Perfil' },
  ],
  admin: [
    { href:'/admin', icon:'chart', label:'Dashboard', exact:true },
    { href:'/admin/cotizaciones', icon:'file', label:'Cotizaciones' },
    { href:'/admin/productos', icon:'box', label:'Catálogo' },
    { href:'/admin/configuracion', icon:'gear', label:'Config' },
  ],
}

export function BottomTab({ mode }: { mode: Mode }) {
  const pathname = usePathname()
  const tabs = TABS[mode]
  const accent = mode === 'admin' ? '#22d3ee' : '#7c3aed'

  return (
    <nav style={{
      position:'fixed', bottom:0, left:0, right:0, zIndex:100,
      height:'calc(56px + env(safe-area-inset-bottom, 0px))',
      paddingBottom:'env(safe-area-inset-bottom, 0px)',
      background:'rgba(10,8,20,.97)',
      backdropFilter:'blur(20px)',
      WebkitBackdropFilter:'blur(20px)',
      borderTop:'1px solid var(--border)',
    }}>
      <div style={{ height:56, display:'flex', alignItems:'stretch' }}>
        {tabs.map(tab => {
          const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href)
          return (
            <Link key={tab.href} href={tab.href} style={{
              flex:1, display:'flex', flexDirection:'column', alignItems:'center',
              justifyContent:'center', gap:3, textDecoration:'none',
              color: active ? accent : '#4a4465',
              transition:'color .15s', position:'relative',
            }}>
              {active && <div style={{
                position:'absolute', top:0, width:28, height:2,
                background:accent, borderRadius:'0 0 2px 2px',
              }}/>}
              <span dangerouslySetInnerHTML={{ __html: SVG[tab.icon] ?? '' }}
                style={{ display:'flex', alignItems:'center', justifyContent:'center' }} />
              <span style={{ fontSize:10, fontWeight:active?600:400, letterSpacing:'.01em' }}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
