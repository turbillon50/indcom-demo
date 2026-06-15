'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Logo } from '@/components/logo'
import { SVG } from '@/components/svg'
import { useTheme } from '@/lib/theme'

export default function SignUpPage() {
  const [form, setForm] = useState({nombre:'',empresa:'',email:'',pass:''})
  const [loading, setLoading] = useState(false)
  const { theme, toggle } = useTheme()
  const router = useRouter()
  const set = (k:string) => (e:React.ChangeEvent<HTMLInputElement>) => setForm(f=>({...f,[k]:e.target.value}))

  const handleSignup = () => {
    if (!form.nombre||!form.email||form.pass.length<4) { toast.error('Completa todos los campos'); return }
    setLoading(true)
    setTimeout(()=>{ toast.success('¡Cuenta creada!'); router.push('/app') },1000)
  }

  return (
    <div className="page-bare" style={{ background:'var(--bg)', minHeight:'100dvh',
      display:'flex', flexDirection:'column' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
        padding:'20px 20px 0' }}>
        <Link href="/" style={{ color:'var(--txt3)', textDecoration:'none',
          display:'flex', alignItems:'center', gap:6, fontSize:13 }}>
          <span dangerouslySetInnerHTML={{ __html: SVG['back']??'' }} style={{ display:'flex' }} />
          Volver
        </Link>
        <button onClick={toggle} style={{ width:36, height:36, borderRadius:10,
          border:'1px solid var(--border)', background:'var(--surface)',
          color:'var(--txt2)', cursor:'pointer', display:'flex',
          alignItems:'center', justifyContent:'center' }}>
          <span dangerouslySetInnerHTML={{ __html: SVG[theme==='dark'?'sun':'moon']??'' }}
            style={{ display:'flex' }} />
        </button>
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column',
        justifyContent:'center', padding:'0 24px 40px' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:.5, ease:[.22,1,.36,1] }}>
          <Logo size={22} />
          <p style={{ fontSize:13, color:'var(--txt3)', marginTop:6, marginBottom:32 }}>
            Crea tu cuenta de distribuidor
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:20 }}>
            {[{k:'nombre',ph:'Nombre completo',t:'text'},{k:'empresa',ph:'Empresa (opcional)',t:'text'},
              {k:'email',ph:'Email',t:'email'},{k:'pass',ph:'Contraseña (mín. 4)',t:'password'}
            ].map(f=>(
              <input key={f.k} value={form[f.k as keyof typeof form]}
                onChange={set(f.k)} placeholder={f.ph} type={f.t}
                style={{ background:'var(--surface)', border:'1px solid var(--border)',
                  borderRadius:14, padding:'14px 16px', fontSize:15,
                  color:'var(--txt)', outline:'none' }} />
            ))}
          </div>
          <motion.button whileTap={{ scale:.97 }} onClick={handleSignup}
            disabled={loading}
            style={{ width:'100%', height:54, background:'var(--violet)', color:'white',
              fontWeight:800, fontSize:15, borderRadius:16, border:'none',
              cursor:'pointer', opacity:loading?.7:1 }}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </motion.button>
          <p style={{ textAlign:'center', fontSize:13, color:'var(--txt3)', marginTop:16 }}>
            ¿Ya tienes cuenta?{' '}
            <Link href="/sign-in" style={{ color:'var(--violet)', fontWeight:600,
              textDecoration:'none' }}>Ingresar</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
