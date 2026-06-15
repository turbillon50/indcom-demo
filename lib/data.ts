
export type Categoria = 'Seguridad CCTV' | 'Radiocomunicación' | 'Energía Solar' | 'Telecomunicaciones' | 'Networking' | 'Automatización'
export type EstadoCot = 'Pendiente' | 'Aprobada' | 'Enviada' | 'Cancelada'

export interface Producto {
  id: string; sku: string; nombre: string; categoria: Categoria; marca: string
  precio: number; stock: number; descripcion: string; specs: Record<string,string>
  activo: boolean; ventas30d: number
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

export const PRODUCTOS: Producto[] = [
  {id:'p1',sku:'HKV-2143G2',nombre:'Cámara IP Domo 4K Hikvision DS-2CD2143G2',categoria:'Seguridad CCTV',marca:'Hikvision',precio:4850,stock:24,descripcion:'Cámara IP domo 4K AcuSense 2.0, detección de personas y vehículos, IR 40m, IP67, IK10.',specs:{'Resolución':'4MP 2560x1440','IR':'40 metros','Protección':'IP67 / IK10','Alimentación':'PoE IEEE 802.3af','Lente':'2.8mm fijo'},activo:true,ventas30d:18},
  {id:'p2',sku:'HKV-7608NXI',nombre:'NVR 8 Canales 4K Hikvision DS-7608NXI',categoria:'Seguridad CCTV',marca:'Hikvision',precio:8200,stock:12,descripcion:'Grabador 8 canales AcuSense, salida 4K HDMI, HDD hasta 8TB, reconocimiento facial.',specs:{'Canales':'8 IP','Resolución Máx':'4K 8MP','HDD':'Hasta 8TB','Salida':'HDMI 4K + VGA','Red':'1x RJ45 Gigabit'},activo:true,ventas30d:9},
  {id:'p3',sku:'HKV-PTZ36',nombre:'Cámara PTZ 36x Hikvision DS-2DE4436IWG',categoria:'Seguridad CCTV',marca:'Hikvision',precio:18900,stock:6,descripcion:'PTZ 4MP zoom 36x, IR 100m, seguimiento automático inteligente, Deep Learning.',specs:{'Zoom':'36x óptico','Resolución':'4MP','IR':'100 metros','Pan':'360° continuo'},activo:true,ventas30d:4},
  {id:'p4',sku:'EPM-KIT8HD',nombre:'Kit CCTV 8 Cámaras Epcom TurboHD 1080p',categoria:'Seguridad CCTV',marca:'Epcom',precio:6400,stock:18,descripcion:'Kit 8 cámaras bala 1080p TurboHD, DVR 8ch, cable coaxial 18m c/u.',specs:{'Cámaras':'8x Bala 1080p','DVR':'8 canales TurboHD','Cable':'18m c/u','IR':'20 metros'},activo:true,ventas30d:14},
  {id:'p5',sku:'MOT-RDU2020',nombre:'Radio Portátil Motorola RDU2020',categoria:'Radiocomunicación',marca:'Motorola',precio:3100,stock:35,descripcion:'Radio UHF 2W 2 canales, batería 12h, IP54.',specs:{'Frecuencia':'UHF 467 MHz','Potencia':'2W','Canales':'2','Batería':'12 horas'},activo:true,ventas30d:22},
  {id:'p6',sku:'MOT-DP4400E',nombre:'Radio Digital Motorola DP4400e VHF',categoria:'Radiocomunicación',marca:'Motorola',precio:7200,stock:14,descripcion:'Radio DMR con GPS, cancelación de ruido, AES 256, IP57.',specs:{'Frecuencia':'VHF 136-174 MHz','Potencia':'5W','GPS':'Integrado','Encriptación':'AES 256'},activo:true,ventas30d:11},
  {id:'p7',sku:'MOT-SLR5500',nombre:'Repetidor Digital Motorola SLR5500',categoria:'Radiocomunicación',marca:'Motorola',precio:24500,stock:4,descripcion:'Repetidor DMR 50W, cobertura hasta 50km.',specs:{'Potencia':'50W','Cobertura':'50 km','Protocolo':'DMR Tier II/III'},activo:true,ventas30d:2},
  {id:'p8',sku:'SOL-400M-CS',nombre:'Panel Solar Monocristalino 400W Canadian Solar',categoria:'Energía Solar',marca:'Canadian Solar',precio:2900,stock:42,descripcion:'Panel PERC 400W, eficiencia 20.4%, garantía 25 años.',specs:{'Potencia':'400W','Eficiencia':'20.4%','Voc':'49.5V','Isc':'10.24A'},activo:true,ventas30d:31},
  {id:'p9',sku:'SOL-INV3K-GW',nombre:'Inversor Solar Híbrido 3kW 48V Growatt',categoria:'Energía Solar',marca:'Growatt',precio:12500,stock:8,descripcion:'Inversor híbrido 3kW, MPPT 80A, WiFi, pantalla LCD.',specs:{'Potencia':'3000W','V. Bat':'48V','MPPT':'80A','Eficiencia':'93%'},activo:true,ventas30d:6},
  {id:'p10',sku:'SOL-BAT200',nombre:'Batería LiFePO4 200Ah 48V SRNE',categoria:'Energía Solar',marca:'SRNE',precio:28000,stock:5,descripcion:'LiFePO4 9.6kWh, 6000 ciclos, BMS integrado.',specs:{'Capacidad':'200Ah 9.6kWh','Voltaje':'48V','Ciclos':'6000+'},activo:true,ventas30d:3},
  {id:'p11',sku:'UBQ-USW8P',nombre:'Switch PoE 8P Ubiquiti USW-8-POE',categoria:'Networking',marca:'Ubiquiti',precio:5650,stock:20,descripcion:'8 puertos GbE PoE+, 2 SFP, 52W, UniFi.',specs:{'Puertos':'8x GbE PoE+ 2x SFP','PoE':'52W total','Velocidad':'1 Gbps'},activo:true,ventas30d:19},
  {id:'p12',sku:'UBQ-U6PRO',nombre:'Access Point WiFi 6 Ubiquiti U6-Pro',categoria:'Networking',marca:'Ubiquiti',precio:4200,stock:16,descripcion:'WiFi 6 5.3Gbps, 4x4 MU-MIMO, cobertura 140m².',specs:{'Estándar':'WiFi 6 802.11ax','Bandas':'2.4+5GHz','Cobertura':'140 m²'},activo:true,ventas30d:24},
  {id:'p13',sku:'MKT-RB4011',nombre:'Router MikroTik RB4011iGS+RM',categoria:'Networking',marca:'MikroTik',precio:6800,stock:9,descripcion:'10 puertos GbE, SFP+ 10G, 1GB RAM, RouterOS L5.',specs:{'Puertos':'10x GbE + 1x SFP+ 10G','RAM':'1GB','RouterOS':'L5'},activo:true,ventas30d:8},
  {id:'p14',sku:'HUW-AR651',nombre:'Router CPE Huawei AR651 4G LTE',categoria:'Telecomunicaciones',marca:'Huawei',precio:9800,stock:7,descripcion:'Router 4G LTE, VPN, QoS, administrado en nube.',specs:{'WAN':'GbE + 4G LTE','LAN':'4x GbE','VPN':'IPSec/SSL/L2TP'},activo:true,ventas30d:6},
  {id:'p15',sku:'EPM-OLT8',nombre:'OLT GPON 8 Puertos Epcom',categoria:'Telecomunicaciones',marca:'Epcom',precio:15600,stock:3,descripcion:'OLT GPON 8 puertos SC/UPC, 128 ONUs, SNMP.',specs:{'Puertos':'8x SC/UPC','Capacidad':'128 ONUs','Velocidad':'2.5Gbps/1.25Gbps'},activo:true,ventas30d:2},
  {id:'p16',sku:'ZKT-CTL4D',nombre:'Controlador Acceso 4 Puertas ZKTeco',categoria:'Automatización',marca:'ZKTeco',precio:7400,stock:11,descripcion:'4 puertas, 100k usuarios, tiempo real, ZKBioSecurity.',specs:{'Puertas':'4','Usuarios':'100,000','Comunicación':'TCP/IP + RS485'},activo:true,ventas30d:9},
  {id:'p17',sku:'EPM-CAT5E',nombre:'Cable UTP Cat5e 305m Epcom',categoria:'Networking',marca:'Epcom',precio:890,stock:80,descripcion:'305m Cat5e CMR 24AWG interior, certificado Fluke.',specs:{'Categoría':'Cat5e','Longitud':'305 metros','Conductor':'24 AWG'},activo:true,ventas30d:45},
  {id:'p18',sku:'SOL-MPPT60',nombre:'Controlador MPPT 60A 48V Epever',categoria:'Energía Solar',marca:'Epever',precio:3800,stock:22,descripcion:'MPPT 60A 12/24/36/48V auto, LCD, eficiencia 99%.',specs:{'Corriente':'60A','Sistema':'12/24/36/48V auto','Eficiencia':'99%'},activo:true,ventas30d:16},
  {id:'p19',sku:'UBQ-UDM-PRO',nombre:'Ubiquiti Dream Machine Pro',categoria:'Networking',marca:'Ubiquiti',precio:18500,stock:5,descripcion:'Gateway all-in-one: router, firewall IDS/IPS, UniFi, NVR.',specs:{'WAN':'2x GbE','LAN':'8x GbE','IDS/IPS':'Integrado'},activo:true,ventas30d:5},
  {id:'p20',sku:'HKV-DS1WL',nombre:'Láser Disuasivo Hikvision DS-1WL',categoria:'Seguridad CCTV',marca:'Hikvision',precio:3200,stock:15,descripcion:'Láser rojo 650nm, sirena 110dB, compatible AcuSense.',specs:{'Láser':'Rojo 650nm','Sirena':'110 dB','Distancia':'100m'},activo:true,ventas30d:7},
]

export const CLIENTES: Cliente[] = [
  {id:'c1',razonSocial:'Grupo Seguridad Industrial del Sur S.A.',rfc:'GSI180423HJ8',contacto:'Ing. Roberto Sánchez',email:'rsanchez@gsis.mx',ciudad:'Cancún, Q.Roo',vendedor:'Luis Herrera',totalCompras:284500,estado:'Activo',fechaAlta:'2023-01-15',cotizaciones:12},
  {id:'c2',razonSocial:'Telecomunicaciones Calakmul S.A.',rfc:'TCA200115KP2',contacto:'Lic. María Fuentes',email:'mfuentes@telekalak.mx',ciudad:'Mérida, Yucatán',vendedor:'Ana Torres',totalCompras:156800,estado:'Activo',fechaAlta:'2023-03-22',cotizaciones:8},
  {id:'c3',razonSocial:'Instalaciones Eléctricas del Caribe S.A.',rfc:'IEC170830MM5',contacto:'Arq. Carlos Méndez',email:'cmendez@iec.mx',ciudad:'Playa del Carmen',vendedor:'Luis Herrera',totalCompras:98200,estado:'Activo',fechaAlta:'2023-05-10',cotizaciones:5},
  {id:'c4',razonSocial:'Hotel Paraíso Maya S.A. de C.V.',rfc:'HPM190621RB4',contacto:'Lic. Sofía Ramírez',email:'sramirez@paraisomaya.mx',ciudad:'Tulum, Q.Roo',vendedor:'Pedro Castillo',totalCompras:445000,estado:'Activo',fechaAlta:'2022-11-05',cotizaciones:18},
  {id:'c5',razonSocial:'Constructora Peninsular del Sureste S.A.',rfc:'CPS150318VN7',contacto:'Ing. Diego Morales',email:'dmorales@construpen.mx',ciudad:'Campeche, Camp.',vendedor:'Ana Torres',totalCompras:321000,estado:'Activo',fechaAlta:'2023-02-28',cotizaciones:14},
  {id:'c6',razonSocial:'ISP FiberNet Caribe S.A. de C.V.',rfc:'IFC210904GH3',contacto:'Ing. Valentina Cruz',email:'vcruz@fibernetcaribe.mx',ciudad:'Chetumal, Q.Roo',vendedor:'Luis Herrera',totalCompras:587000,estado:'Activo',fechaAlta:'2022-08-14',cotizaciones:22},
  {id:'c7',razonSocial:'Municipio de Bacalar',rfc:'MBA150101GO8',contacto:'C.P. Sebastián Peña',email:'spena@bacalar.gob.mx',ciudad:'Bacalar, Q.Roo',vendedor:'Pedro Castillo',totalCompras:392000,estado:'Activo',fechaAlta:'2022-06-20',cotizaciones:16},
]

export const COTIZACIONES: Cotizacion[] = [
  {id:'q1',folio:'IND-2025-034',cliente:'Hotel Paraíso Maya',vendedor:'Pedro Castillo',total:186500,estado:'Aprobada',fecha:'2025-06-12',items:8,nota:'Sistema CCTV 4K + control acceso lobby'},
  {id:'q2',folio:'IND-2025-033',cliente:'ISP FiberNet Caribe',vendedor:'Luis Herrera',total:124000,estado:'Enviada',fecha:'2025-06-11',items:5,nota:'OLT GPON expansion zona norte'},
  {id:'q3',folio:'IND-2025-032',cliente:'Grupo Seguridad Industrial',vendedor:'Luis Herrera',total:67800,estado:'Pendiente',fecha:'2025-06-10',items:12,nota:'Radios DMR planta industrial'},
  {id:'q4',folio:'IND-2025-031',cliente:'Telecomunicaciones Calakmul',vendedor:'Ana Torres',total:45200,estado:'Aprobada',fecha:'2025-06-09',items:4,nota:'Repetidor + antenas cobertura rural'},
  {id:'q5',folio:'IND-2025-030',cliente:'Constructora Peninsular',vendedor:'Ana Torres',total:289000,estado:'Enviada',fecha:'2025-06-08',items:15,nota:'Sistema solar 20kW edificio oficinas'},
  {id:'q6',folio:'IND-2025-029',cliente:'Hotel Paraíso Maya',vendedor:'Pedro Castillo',total:38500,estado:'Cancelada',fecha:'2025-06-07',items:3,nota:'Cancelado por cliente'},
  {id:'q7',folio:'IND-2025-028',cliente:'Municipio de Bacalar',vendedor:'Pedro Castillo',total:215000,estado:'Aprobada',fecha:'2025-06-06',items:11,nota:'Vigilancia parque ecológico'},
  {id:'q8',folio:'IND-2025-027',cliente:'Instalaciones Eléctricas Caribe',vendedor:'Luis Herrera',total:92100,estado:'Enviada',fecha:'2025-06-05',items:7,nota:'Redes estructuradas Cat6A + switches'},
]

export const VENDEDORES: Vendedor[] = [
  {id:'v1',nombre:'Luis Herrera',email:'lherrera@indcom.mx',zona:'Cancún / Q. Roo Norte',cotizacionesMes:12,totalMes:284500,avatar:32},
  {id:'v2',nombre:'Ana Torres',email:'atorres@indcom.mx',zona:'Mérida / Yucatán',cotizacionesMes:9,totalMes:198600,avatar:20},
  {id:'v3',nombre:'Pedro Castillo',email:'pcastillo@indcom.mx',zona:'Q. Roo Sur / Campeche',cotizacionesMes:13,totalMes:321400,avatar:15},
]

export const KPI = {
  totalProductos: 847, cotizacionesMes: 34, clientesActivos: 156,
  valorMes: 2340000, crecimientoMes: 12.4, ticketPromedio: 68824,
}

export const CHART_MENSUAL = [
  {mes:'Ene',v:1420000},{mes:'Feb',v:1650000},{mes:'Mar',v:1380000},
  {mes:'Abr',v:1890000},{mes:'May',v:2100000},{mes:'Jun',v:2340000},
]

export const CATEGORIAS: Categoria[] = [
  'Seguridad CCTV','Radiocomunicación','Energía Solar',
  'Telecomunicaciones','Networking','Automatización'
]

export const MARCAS = ['Hikvision','Epcom','Motorola','Ubiquiti','MikroTik','Huawei','Canadian Solar','ZKTeco','SRNE','Epever']

// Colores y Tabler icons por categoría — SIN Lucide
export const CAT_META: Record<string, { color: string; icon: string }> = {
  'Seguridad CCTV':     { color: '#7c3aed', icon: 'ti-shield-check' },
  'Radiocomunicación':  { color: '#22d3ee', icon: 'ti-broadcast' },
  'Energía Solar':       { color: '#fbbf24', icon: 'ti-sun' },
  'Telecomunicaciones': { color: '#a78bfa', icon: 'ti-antenna' },
  'Networking':         { color: '#10b981', icon: 'ti-network' },
  'Automatización':     { color: '#f87171', icon: 'ti-cpu' },
}
