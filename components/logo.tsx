export function Logo({ size = 24 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* Símbolo I con barra violet */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 4, height: size, background: 'var(--violet)', borderRadius: 2 }} />
        <span style={{ fontSize: size * 1.1, fontWeight: 900, color: 'var(--txt)',
          letterSpacing: '-0.04em', marginLeft: 2, lineHeight: 1 }}>NDCOM</span>
      </div>
    </div>
  )
}
