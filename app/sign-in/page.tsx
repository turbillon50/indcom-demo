'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    if (!email || pass.length < 4) { toast.error('Ingresa datos válidos'); return }
    setLoading(true)
    setTimeout(() => {
      if (email.includes('admin')) router.push('/admin')
      else router.push('/app')
    }, 900)
  }

  return (
    <div className="page-bare" style={{ background: 'var(--bg)', minHeight: '100dvh',
      display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 20px 0' }}>
        <Link href="/" style={{ color: 'var(--txt3)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <i className="ti ti-arrow-left" style={{ fontSize: 16 }} />
          Volver
        </Link>
        <ThemeToggle size={16} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '0 24px 40px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, ease: [.22,1,.36,1] }}>
          <Logo size={22} />
          <p style={{ fontSize: 13, color: 'var(--txt3)', marginTop: 6, marginBottom: 36 }}>
            Acceso para distribuidores y vendedores
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
              type="email"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '14px 16px', fontSize: 15, color: 'var(--txt)',
                outline: 'none', transition: 'border-color .2s' }} />
            <div style={{ position: 'relative' }}>
              <input value={pass} onChange={e => setPass(e.target.value)}
                placeholder="Contraseña" type={show ? 'text' : 'password'}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{ width: '100%', background: 'var(--surface)',
                  border: '1px solid var(--border)', borderRadius: 14,
                  padding: '14px 48px 14px 16px', fontSize: 15, color: 'var(--txt)',
                  outline: 'none' }} />
              <button onClick={() => setShow(!show)}
                style={{ position: 'absolute', right: 14, top: '50%',
                  transform: 'translateY(-50%)', background: 'none', border: 'none',
                  color: 'var(--txt3)', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', minHeight: 'unset' }}>
                <i className={show ? 'ti ti-eye-off' : 'ti ti-eye'} style={{ fontSize: 18 }} />
              </button>
            </div>
          </div>
          <motion.button whileTap={{ scale: .97 }} onClick={handleLogin}
            disabled={loading}
            style={{ width: '100%', height: 54, background: loading ? 'var(--surface)' : 'var(--violet)',
              color: loading ? 'var(--txt3)' : 'white', fontWeight: 800, fontSize: 15,
              borderRadius: 16, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all .2s' }}>
            {loading
              ? <><i className="ti ti-loader-2" style={{ fontSize: 20,
                  animation: 'spin 1s linear infinite' }} />Verificando...</>
              : <><i className="ti ti-login" style={{ fontSize: 18 }} />Ingresar</>
            }
          </motion.button>
          <div style={{ marginTop: 20, padding: 14, background: 'var(--surface)',
            border: '1px solid var(--border)', borderRadius: 12,
            fontSize: 11, color: 'var(--txt3)', lineHeight: 1.8 }}>
            <strong style={{ color: 'var(--txt2)' }}>Demo:</strong><br />
            admin@indcom.mx → Panel Admin<br />
            cualquier email → Panel Vendedor
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--txt3)', marginTop: 20 }}>
            ¿No tienes cuenta?{' '}
            <Link href="/sign-up" style={{ color: 'var(--violet)', fontWeight: 600,
              textDecoration: 'none' }}>Registrarse</Link>
          </p>
        </motion.div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
