'use client'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from './logo'
import { SVG, Svg } from './svg'
import { useTheme } from '@/lib/theme'

export function TopNav() {
  const carrito = useStore(s => s.carrito)
  const total = carrito.reduce((a,c) => a+c.qty, 0)
  const [q, setQ] = useState('')
  const router = useRouter()
  const { theme, toggle } = useTheme()

  return (
    <header style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      paddingTop:'env(safe-area-inset-top, 0px)',
      background:'rgba(10,8,20,.97)',
      backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
      borderBottom:'1px solid var(--border)',
    }}>
      {/* Row 1: Logo + acciones */}
      <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 14px', gap:10 }}>
        <Link href="/" style={{ textDecoration:'none', flexShrink:0 }}>
          <Logo size={18} />
        </Link>
        <div style={{ flex:1 }} />
        <button onClick={toggle} style={{
          width:38, height:38, borderRadius:10, border:'1px solid var(--border)',
          background:'var(--surface)', color:'var(--txt2)', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <span dangerouslySetInnerHTML={{ __html: SVG[theme==='dark'?'sun':'moon'] ?? '' }}
            style={{ display:'flex', alignItems:'center' }} />
        </button>
        <Link href="/cotizador" style={{
          position:'relative', width:38, height:38, borderRadius:10,
          border:'1px solid var(--border)', background:'var(--surface)',
          display:'flex', alignItems:'center', justifyContent:'center',
          textDecoration:'none', color:'var(--txt2)',
        }}>
          <span dangerouslySetInnerHTML={{ __html: SVG['cart'] ?? '' }}
            style={{ display:'flex', alignItems:'center' }} />
          {total>0 && <span style={{
            position:'absolute', top:4, right:4, background:'var(--violet)',
            color:'white', fontSize:9, fontWeight:700, width:16, height:16,
            borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center',
          }}>{total}</span>}
        </Link>
        <Link href="/sign-in" style={{
          background:'var(--violet)', color:'white', fontWeight:700,
          fontSize:13, padding:'8px 14px', borderRadius:10, textDecoration:'none',
        }}>Ingresar</Link>
      </div>
      {/* Row 2: Buscador */}
      <div style={{ padding:'0 14px 10px' }}>
        <div style={{ position:'relative' }}>
          <span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)',
            display:'flex', alignItems:'center', color:'var(--txt3)' }}
            dangerouslySetInnerHTML={{ __html: SVG['search'] ?? '' }} />
          <input value={q} onChange={e=>setQ(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&router.push('/catalogo?q='+q)}
            placeholder="Buscar producto, SKU o marca..."
            style={{
              width:'100%', background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:12, paddingLeft:36, paddingRight:14, paddingTop:9, paddingBottom:9,
              fontSize:14, color:'var(--txt)', outline:'none',
            }} />
        </div>
      </div>
    </header>
  )
}
