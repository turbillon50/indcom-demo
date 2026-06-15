'use client'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/lib/theme'
import { SVG } from './svg'

const LABELS: Record<string,string> = {
  '/app':'Mi Panel','/app/cotizaciones':'Mis Cotizaciones',
  '/app/nueva-cotizacion':'Nueva Cotización','/app/perfil':'Perfil',
}

export function VendorTopNav() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const label = Object.entries(LABELS).find(([k])=>pathname===k)?.[1]??'Panel'
  return (
    <header style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,
      paddingTop:'env(safe-area-inset-top,0px)',
      background:'rgba(10,8,20,.97)',backdropFilter:'blur(20px)',
      WebkitBackdropFilter:'blur(20px)',borderBottom:'1px solid var(--border)' }}>
      <div style={{ height:52,display:'flex',alignItems:'center',padding:'0 16px',gap:10 }}>
        <div style={{ flex:1 }}>
          <p style={{ fontSize:11,color:'var(--txt3)',fontWeight:500 }}>Luis Herrera</p>
          <p style={{ fontSize:16,fontWeight:800,color:'var(--txt)' }}>{label}</p>
        </div>
        <button onClick={toggle} style={{ width:36,height:36,borderRadius:10,
          border:'1px solid var(--border)',background:'var(--surface)',
          color:'var(--txt2)',cursor:'pointer',display:'flex',
          alignItems:'center',justifyContent:'center' }}>
          <span dangerouslySetInnerHTML={{ __html:SVG[theme==='dark'?'sun':'moon']??'' }}
            style={{ display:'flex' }} />
        </button>
        <img src="https://pravatar.cc/150?img=32"
          style={{ width:34,height:34,borderRadius:11,
            border:'1.5px solid rgba(124,58,237,.4)' }} alt="avatar" />
      </div>
    </header>
  )
}
