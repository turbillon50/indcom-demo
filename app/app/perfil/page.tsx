export default function PerfilPage() {
  return (
    <div style={{padding:16}}>
      <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:24}}>
        <img src="https://pravatar.cc/150?img=32"
          style={{width:72,height:72,borderRadius:20,border:'2px solid rgba(124,58,237,.4)'}} alt="avatar" />
        <div>
          <p style={{fontSize:20,fontWeight:900,color:'var(--txt)'}}>Luis Herrera</p>
          <p style={{fontSize:13,color:'var(--txt2)'}}>Vendedor · INDCOM</p>
          <p style={{fontSize:11,color:'var(--txt3)',marginTop:2}}>Cancún, Q. Roo Norte</p>
        </div>
      </div>
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,overflow:'hidden'}}>
        {[{l:'Email',v:'lherrera@indcom.mx'},{l:'Teléfono',v:'+52 998 123 4567'},
          {l:'Cotizaciones totales',v:'67'},{l:'Activo desde',v:'Enero 2023'}
        ].map((f,i,arr)=>(
          <div key={f.l} style={{padding:'14px 16px',
            borderBottom:i<arr.length-1?'1px solid var(--border)':'none'}}>
            <p style={{fontSize:10,color:'var(--txt3)',textTransform:'uppercase',
              letterSpacing:'.1em',marginBottom:3}}>{f.l}</p>
            <p style={{fontSize:15,fontWeight:600,color:'var(--txt)'}}>{f.v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
