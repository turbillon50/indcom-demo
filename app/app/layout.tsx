'use client'
import { VendorTopNav } from '@/components/vendor-top-nav'
import { BottomTab } from '@/components/bottom-tab'
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background:'var(--bg)', minHeight:'100dvh' }}>
      <VendorTopNav />
      <main className="page-app">{children}</main>
      <BottomTab mode="vendedor" />
    </div>
  )
}
