
export type Categoria = 'Seguridad CCTV' | 'Radiocomunicación' | 'Energía Solar' | 'Telecomunicaciones' | 'Networking' | 'Automatización'
export type EstadoCot = 'Pendiente' | 'Aprobada' | 'Enviada' | 'Cancelada'

export interface Producto {
  id: string; sku: string; nombre: string; categoria: Categoria; marca: string
  precio: number; stock: number; descripcion: string; specs: Record<string,string>
  img: string; activo: boolean; ventas30d: number
}

export interface Cliente {
  id: string; razonSocial: string; rfc: string; contacto: string
  email: string; ciudad: string; vendedor: string; totalCompras: number
  estado: 'Activo' | 'Inactivo' | 'Pendiente'; fechaAlta: string; cotizaciones: number
}

export interface Cotizacion {
  id: string; folio: string; cliente: string; vendedor: string
  total: number; estado: EstadoCot; fecha: string; items: number; nota: string
}

export interface Vendedor {
  id: string; nombre: string; email: string; zona: string
  cotizacionesMes: number; totalMes: number; avatar: number
}

const C = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_021241_7c3934e2-eb1e-41d0-afd7-2caa93a47371.png"
const R = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_021241_d34d2634-7d60-4efb-9acd-c368c75fbd2b.png"
const SW = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_021242_0d266877-dd4e-4854-8816-ea9f7dd81f3c.png"
const SO = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_021241_e28e198b-78a4-453f-8b40-bf5fa10d7081.png"
const NV = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_021320_7403a2bd-0ed4-4a8d-8de4-536bcf38770a.png"
const AC = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_021320_f53cc17c-e763-478c-9bc1-8d55367a3978.png"

export const PRODUCTOS: Producto[] = [
  {id:'p1',sku:'HKV-2143G2',nombre:'Cámara IP Domo 4K Hikvision DS-2CD2143G2',categoria:'Seguridad CCTV',marca:'Hikvision',precio:4850,stock:24,descripcion:'Cámara IP domo 4K AcuSense 2.0, detección de personas y vehículos, IR 40m, IP67.',specs:{'Resolución':'4MP 2560x1440','IR':'40m','Protección':'IP67 / IK10','Alimentación':'PoE 802.3af'},img:C,activo:true,ventas30d:18},
  {id:'p2',sku:'HKV-7608NXI',nombre:'NVR 8 Canales 4K Hikvision DS-7608NXI',categoria:'Seguridad CCTV',marca:'Hikvision',precio:8200,stock:12,descripcion:'Grabador 8 canales AcuSense, salida 4K HDMI, HDD hasta 8TB.',specs:{'Canales':'8 IP','Resolución Máx':'4K 8MP','HDD':'Hasta 8TB','Salida':'HDMI 4K + VGA'},img:NV,activo:true,ventas30d:9},
  {id:'p3',sku:'HKV-PTZ36',nombre:'Cámara PTZ 36x Hikvision DS-2DE4436IWG',categoria:'Seguridad CCTV',marca:'Hikvision',precio:18900,stock:6,descripcion:'PTZ 4MP zoom 36x, IR 100m, seguimiento automático.',specs:{'Zoom':'36x óptico','Resolución':'4MP','IR':'100m','Pan':'360°'},img:C,activo:true,ventas30d:4},
  {id:'p4',sku:'EPM-KIT8HD',nombre:'Kit CCTV 8 Cámaras Epcom TurboHD 1080p',categoria:'Seguridad CCTV',marca:'Epcom',precio:6400,stock:18,descripcion:'Kit 8 cámaras bala 1080p, DVR 8ch, cable 18m c/u.',specs:{'Cámaras':'8x Bala 1080p','DVR':'8 ch TurboHD','IR':'20m'},img:C,activo:true,ventas30d:14},
  {id:'p5',sku:'HKV-DS1WL',nombre:'Láser Disuasivo Hikvision DS-1WL',categoria:'Seguridad CCTV',marca:'Hikvision',precio:3200,stock:15,descripcion:'Láser rojo 650nm, sirena 110dB, compatible AcuSense.',specs:{'Láser':'Rojo 650nm','Sirena':'110 dB','Distancia':'100m'},img:C,activo:true,ventas30d:7},
  {id:'p6',sku:'MOT-RDU2020',nombre:'Radio Portátil Motorola RDU2020',categoria:'Radiocomunicación',marca:'Motorola',precio:3100,stock:35,descripcion:'Radio UHF 2W 2 canales, batería 12h, IP54.',specs:{'Frecuencia':'UHF 467 MHz','Potencia':'2W','Batería':'12h'},img:R,activo:true,ventas30d:22},
  {id:'p7',sku:'MOT-DP4400E',nombre:'Radio Digital Motorola DP4400e VHF',categoria:'Radiocomunicación',marca:'Motorola',precio:7200,stock:14,descripcion:'Radio DMR con GPS, AES 256, IP57.',specs:{'Frecuencia':'VHF 136-174 MHz','Potencia':'5W','GPS':'Integrado'},img:R,activo:true,ventas30d:11},
  {id:'p8',sku:'MOT-SLR5500',nombre:'Repetidor Digital Motorola SLR5500',categoria:'Radiocomunicación',marca:'Motorola',precio:24500,stock:4,descripcion:'Repetidor DMR 50W, cobertura hasta 50km.',specs:{'Potencia':'50W','Cobertura':'50 km'},img:R,activo:true,ventas30d:2},
  {id:'p9',sku:'SOL-400M-CS',nombre:'Panel Solar Monocristalino 400W Canadian Solar',categoria:'Energía Solar',marca:'Canadian Solar',precio:2900,stock:42,descripcion:'Panel PERC 400W, eficiencia 20.4%, garantía 25 años.',specs:{'Potencia':'400W','Eficiencia':'20.4%','Voc':'49.5V'},img:SO,activo:true,ventas30d:31},
  {id:'p10',sku:'SOL-INV3K-GW',nombre:'Inversor Solar Híbrido 3kW 48V Growatt',categoria:'Energía Solar',marca:'Growatt',precio:12500,stock:8,descripcion:'Inversor híbrido 3kW, MPPT 80A, WiFi.',specs:{'Potencia':'3000W','MPPT':'80A','Eficiencia':'93%'},img:SO,activo:true,ventas30d:6},
  {id:'p11',sku:'SOL-BAT200',nombre:'Batería LiFePO4 200Ah 48V SRNE',categoria:'Energía Solar',marca:'SRNE',precio:28000,stock:5,descripcion:'LiFePO4 9.6kWh, 6000 ciclos, BMS integrado.',specs:{'Capacidad':'200Ah 9.6kWh','Voltaje':'48V','Ciclos':'6000+'},img:SO,activo:true,ventas30d:3},
  {id:'p12',sku:'SOL-MPPT60',nombre:'Controlador MPPT 60A 48V Epever',categoria:'Energía Solar',marca:'Epever',precio:3800,stock:22,descripcion:'MPPT 60A 12/24/36/48V auto, LCD.',specs:{'Corriente':'60A','Eficiencia':'99%'},img:SO,activo:true,ventas30d:16},
  {id:'p13',sku:'UBQ-USW8P',nombre:'Switch PoE 8P Ubiquiti USW-8-POE',categoria:'Networking',marca:'Ubiquiti',precio:5650,stock:20,descripcion:'8 puertos GbE PoE+, 2 SFP, 52W, UniFi.',specs:{'Puertos':'8x GbE PoE+','PoE':'52W','Velocidad':'1 Gbps'},img:SW,activo:true,ventas30d:19},
  {id:'p14',sku:'UBQ-U6PRO',nombre:'Access Point WiFi 6 Ubiquiti U6-Pro',categoria:'Networking',marca:'Ubiquiti',precio:4200,stock:16,descripcion:'WiFi 6 5.3Gbps, cobertura 140m², 300 clientes.',specs:{'Estándar':'WiFi 6 802.11ax','Cobertura':'140 m²'},img:SW,activo:true,ventas30d:24},
  {id:'p15',sku:'MKT-RB4011',nombre:'Router MikroTik RB4011iGS+RM',categoria:'Networking',marca:'MikroTik',precio:6800,stock:9,descripcion:'10 puertos GbE, SFP+ 10G, 1GB RAM, RouterOS L5.',specs:{'Puertos':'10x GbE + 1x SFP+ 10G','RAM':'1GB'},img:SW,activo:true,ventas30d:8},
  {id:'p16',sku:'UBQ-UDM-PRO',nombre:'Ubiquiti Dream Machine Pro',categoria:'Networking',marca:'Ubiquiti',precio:18500,stock:5,descripcion:'Gateway all-in-one: router, IDS/IPS, UniFi, NVR.',specs:{'WAN':'2x GbE','IDS/IPS':'Integrado'},img:SW,activo:true,ventas30d:5},
  {id:'p17',sku:'EPM-CAT5E',nombre:'Cable UTP Cat5e 305m Epcom',categoria:'Networking',marca:'Epcom',precio:890,stock:80,descripcion:'305m Cat5e CMR 24AWG interior, certificado Fluke.',specs:{'Longitud':'305 metros','Conductor':'24 AWG'},img:SW,activo:true,ventas30d:45},
  {id:'p18',sku:'HUW-AR651',nombre:'Router CPE Huawei AR651 4G LTE',categoria:'Telecomunicaciones',marca:'Huawei',precio:9800,stock:7,descripcion:'Router 4G LTE, VPN, QoS, nube.',specs:{'WAN':'GbE + 4G LTE','LAN':'4x GbE'},img:SW,activo:true,ventas30d:6},
  {id:'p19',sku:'EPM-OLT8',nombre:'OLT GPON 8 Puertos Epcom',categoria:'Telecomunicaciones',marca:'Epcom',precio:15600,stock:3,descripcion:'OLT GPON 8 puertos, 128 ONUs, SNMP.',specs:{'Puertos':'8x SC/UPC','Capacidad':'128 ONUs'},img:SW,activo:true,ventas30d:2},
  {id:'p20',sku:'ZKT-CTL4D',nombre:'Controlador Acceso 4 Puertas ZKTeco',categoria:'Automatización',marca:'ZKTeco',precio:7400,stock:11,descripcion:'4 puertas, 100k usuarios, TCP/IP.',specs:{'Puertas':'4','Usuarios':'100,000'},img:AC,activo:true,ventas30d:9},
]

export const CLIENTES: Cliente[] = [
  {id:'c1',razonSocial:'Grupo Seguridad Industrial del Sur S.A.',rfc:'GSI180423HJ8',contacto:'Ing. Roberto Sánchez',email:'rsanchez@gsis.mx',ciudad:'Cancún, Q.Roo',vendedor:'Luis Herrera',totalCompras:284500,estado:'Activo',fechaAlta:'2023-01-15',cotizaciones:12},
  {id:'c2',razonSocial:'Telecomunicaciones Calakmul S.A.',rfc:'TCA200115KP2',contacto:'Lic. María Fuentes',email:'mfuentes@telekalak.mx',ciudad:'Mérida, Yucatán',vendedor:'Ana Torres',totalCompras:156800,estado:'Activo',fechaAlta:'2023-03-22',cotizaciones:8},
  {id:'c3',razonSocial:'Hotel Paraíso Maya S.A. de C.V.',rfc:'HPM190621RB4',contacto:'Lic. Sofía Ramírez',email:'sramirez@paraisomaya.mx',ciudad:'Tulum, Q.Roo',vendedor:'Pedro Castillo',totalCompras:445000,estado:'Activo',fechaAlta:'2022-11-05',cotizaciones:18},
  {id:'c4',razonSocial:'ISP FiberNet Caribe S.A. de C.V.',rfc:'IFC210904GH3',contacto:'Ing. Valentina Cruz',email:'vcruz@fibernetcaribe.mx',ciudad:'Chetumal, Q.Roo',vendedor:'Luis Herrera',totalCompras:587000,estado:'Activo',fechaAlta:'2022-08-14',cotizaciones:22},
  {id:'c5',razonSocial:'Municipio de Bacalar',rfc:'MBA150101GO8',contacto:'C.P. Sebastián Peña',email:'spena@bacalar.gob.mx',ciudad:'Bacalar, Q.Roo',vendedor:'Pedro Castillo',totalCompras:392000,estado:'Activo',fechaAlta:'2022-06-20',cotizaciones:16},
]

export const COTIZACIONES: Cotizacion[] = [
  {id:'q1',folio:'IND-2025-034',cliente:'Hotel Paraíso Maya',vendedor:'Pedro Castillo',total:186500,estado:'Aprobada',fecha:'2025-06-12',items:8,nota:'Sistema CCTV 4K + control acceso lobby'},
  {id:'q2',folio:'IND-2025-033',cliente:'ISP FiberNet Caribe',vendedor:'Luis Herrera',total:124000,estado:'Enviada',fecha:'2025-06-11',items:5,nota:'OLT GPON expansion zona norte'},
  {id:'q3',folio:'IND-2025-032',cliente:'Grupo Seguridad Industrial',vendedor:'Luis Herrera',total:67800,estado:'Pendiente',fecha:'2025-06-10',items:12,nota:'Radios DMR planta industrial'},
  {id:'q4',folio:'IND-2025-031',cliente:'Telecomunicaciones Calakmul',vendedor:'Ana Torres',total:45200,estado:'Aprobada',fecha:'2025-06-09',items:4,nota:'Repetidor + antenas cobertura rural'},
  {id:'q5',folio:'IND-2025-030',cliente:'Municipio de Bacalar',vendedor:'Pedro Castillo',total:215000,estado:'Enviada',fecha:'2025-06-08',items:11,nota:'Vigilancia parque ecológico'},
  {id:'q6',folio:'IND-2025-029',cliente:'Hotel Paraíso Maya',vendedor:'Pedro Castillo',total:38500,estado:'Cancelada',fecha:'2025-06-07',items:3,nota:'Cancelado por cliente'},
  {id:'q7',folio:'IND-2025-028',cliente:'Grupo Seguridad Industrial',vendedor:'Luis Herrera',total:92100,estado:'Aprobada',fecha:'2025-06-06',items:7,nota:'Redes estructuradas Cat6A + switches'},
  {id:'q8',folio:'IND-2025-027',cliente:'ISP FiberNet Caribe',vendedor:'Luis Herrera',total:156400,estado:'Enviada',fecha:'2025-06-05',items:9,nota:'Cámaras PTZ + NVRs sucursal Merida'},
]

export const VENDEDORES: Vendedor[] = [
  {id:'v1',nombre:'Luis Herrera',email:'lherrera@indcom.mx',zona:'Cancún / Q. Roo Norte',cotizacionesMes:12,totalMes:284500,avatar:32},
  {id:'v2',nombre:'Ana Torres',email:'atorres@indcom.mx',zona:'Mérida / Yucatán',cotizacionesMes:9,totalMes:198600,avatar:20},
  {id:'v3',nombre:'Pedro Castillo',email:'pcastillo@indcom.mx',zona:'Q. Roo Sur / Campeche',cotizacionesMes:13,totalMes:321400,avatar:15},
]

export const KPI = {
  totalProductos:847, cotizacionesMes:34, clientesActivos:156,
  valorMes:2340000, crecimientoMes:12.4,
}

export const CHART_MENSUAL = [
  {mes:'Ene',v:1420000},{mes:'Feb',v:1650000},{mes:'Mar',v:1380000},
  {mes:'Abr',v:1890000},{mes:'May',v:2100000},{mes:'Jun',v:2340000},
]

export const CATEGORIAS: Categoria[] = [
  'Seguridad CCTV','Radiocomunicación','Energía Solar',
  'Telecomunicaciones','Networking','Automatización'
]

export const MARCAS = ['Todas','Hikvision','Epcom','Motorola','Ubiquiti','MikroTik','Huawei','Canadian Solar','ZKTeco']

export const IMGS_HIGGSFIELD = {'camara': 'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_021241_7c3934e2-eb1e-41d0-afd7-2caa93a47371.png', 'radio': 'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_021241_d34d2634-7d60-4efb-9acd-c368c75fbd2b.png', 'switch': 'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_021242_0d266877-dd4e-4854-8816-ea9f7dd81f3c.png', 'solar': 'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_021241_e28e198b-78a4-453f-8b40-bf5fa10d7081.png', 'nvr': 'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_021320_7403a2bd-0ed4-4a8d-8de4-536bcf38770a.png', 'acceso': 'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_021320_f53cc17c-e763-478c-9bc1-8d55367a3978.png', 'hero': 'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_014120_e2b3449f-b562-4de2-b43c-cbd6f66360f6.png'}

export const CAT_META: Record<string, { color: string }> = {
  'Seguridad CCTV':    { color: '#7c3aed' },
  'Radiocomunicación': { color: '#22d3ee' },
  'Energía Solar':      { color: '#fbbf24' },
  'Telecomunicaciones':{ color: '#a78bfa' },
  'Networking':        { color: '#10b981' },
  'Automatización':    { color: '#f87171' },
}
