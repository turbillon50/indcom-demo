import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

export const viewport: Viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}
export const metadata: Metadata = {
  title: { default: 'INDCOM', template: '%s | INDCOM' },
  description: 'Distribuidor premium: seguridad, radio, solar, telecomunicaciones, networking',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'INDCOM' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="dark" style={{ colorScheme:'dark', background:'#0a0814' }}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body style={{ background:'#0a0814', color:'#f0f4ff' }}>
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-center" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  )
}
