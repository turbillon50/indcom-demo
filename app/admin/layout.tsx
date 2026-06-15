'use client'
import { AdminTopNav } from '@/components/admin-top-nav'
import { BottomTab } from '@/components/bottom-tab'
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background:'var(--bg)', minHeight:'100dvh' }}>
      <AdminTopNav />
      <main className="page-app">{children}</main>
      <BottomTab mode="admin" />
    </div>
  )
}
