// ─────────────────────────────────────────────────────────────
// Datos simulados (mock) — CloudOps Dashboard
// Orden según fases implementadas
// ─────────────────────────────────────────────────────────────

import type { CloudRegion, CostItem, SecurityItem, AWSService } from '../types/cloud';

// ── Fase 5: Dashboard — regiones y estadísticas generales ────

export const cloudRegions: CloudRegion[] = [
  {
    id: 'us-east-1',
    name: 'Este de EE.UU. (N. Virginia)',
    location: 'Norte América',
    services: ['EC2', 'S3', 'RDS', 'CloudFront', 'Lambda'],
    status: 'active',
    latency: '12ms',
  },
  {
    id: 'us-west-2',
    name: 'Oeste de EE.UU. (Oregón)',
    location: 'Norte América',
    services: ['EC2', 'S3', 'RDS'],
    status: 'active',
    latency: '28ms',
  },
  {
    id: 'eu-west-1',
    name: 'Europa (Irlanda)',
    location: 'Europa',
    services: ['EC2', 'S3', 'CloudFront'],
    status: 'warning',
    latency: '95ms',
  },
  {
    id: 'ap-southeast-1',
    name: 'Asia Pacífico (Singapur)',
    location: 'Asia',
    services: ['EC2', 'S3'],
    status: 'active',
    latency: '210ms',
  },
  {
    id: 'sa-east-1',
    name: 'América del Sur (São Paulo)',
    location: 'América del Sur',
    services: ['EC2', 'S3', 'RDS'],
    status: 'active',
    latency: '140ms',
  },
  {
    id: 'ap-northeast-1',
    name: 'Asia Pacífico (Tokio)',
    location: 'Asia',
    services: ['EC2', 'S3', 'CloudFront'],
    status: 'error',
    latency: '185ms',
  },
];

// Estadísticas calculadas para las tarjetas del Dashboard
// (monthlyCost y annualCost se derivan de costItems en tiempo de compilación)
export const dashboardStats = {
  totalServices:      8,
  selectedRegion:     'Este de EE.UU. (N. Virginia)',
  monthlyCost:        122.60,
  annualCost:         1471.22,
  securityScore:      63,
  totalResources:     24,
  architectureStatus: 'Operativo',
};

// ── Fase 7: Costos — ítems iniciales de estimación ───────────

export const costItems: CostItem[] = [
  {
    id: '1',
    service: 'Amazon EC2 (t3.medium)',
    quantity: 3,
    estimatedHours: 720,
    unitCost: 0.0416,
    monthlyCost: 89.86,
    annualCost: 1078.34,
  },
  {
    id: '2',
    service: 'Amazon S3',
    quantity: 500,
    estimatedHours: 720,
    unitCost: 0.023,
    monthlyCost: 11.50,
    annualCost: 138.00,
  },
  {
    id: '3',
    service: 'Amazon RDS (db.t3.micro)',
    quantity: 1,
    estimatedHours: 720,
    unitCost: 0.017,
    monthlyCost: 12.24,
    annualCost: 146.88,
  },
  {
    id: '4',
    service: 'Amazon CloudFront',
    quantity: 100,
    estimatedHours: 720,
    unitCost: 0.0085,
    monthlyCost: 8.50,
    annualCost: 102.00,
  },
  {
    id: '5',
    service: 'Amazon Route 53',
    quantity: 1,
    estimatedHours: 720,
    unitCost: 0.50,
    monthlyCost: 0.50,
    annualCost: 6.00,
  },
];

// ── Fase 11: Servicios AWS — catálogo mínimo requerido por el documento ──────

export const awsServicesCatalog: AWSService[] = [
  {
    id: 'ec2',
    name: 'Amazon EC2',
    category: 'Cómputo',
    description: 'Servidores virtuales escalables en la nube. Permite ejecutar aplicaciones sin necesidad de invertir en hardware físico.',
    mainFunction: 'Ejecutar aplicaciones en instancias virtuales con capacidad configurable de CPU, memoria y almacenamiento.',
    status: 'active',
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Almacenamiento',
    description: 'Servicio de almacenamiento de objetos con alta durabilidad (99.999999999%) y disponibilidad global.',
    mainFunction: 'Almacenar y recuperar cualquier cantidad de datos desde cualquier lugar mediante una API REST.',
    status: 'active',
  },
  {
    id: 'rds',
    name: 'Amazon RDS',
    category: 'Base de Datos',
    description: 'Servicio de bases de datos relacionales completamente administrado. Soporta MySQL, PostgreSQL, Oracle y SQL Server.',
    mainFunction: 'Gestionar bases de datos relacionales sin necesidad de administrar el servidor subyacente.',
    status: 'active',
  },
  {
    id: 'iam',
    name: 'AWS IAM',
    category: 'Seguridad',
    description: 'Servicio de gestión de identidades y accesos. Controla quién puede acceder a los recursos de AWS y qué acciones puede realizar.',
    mainFunction: 'Crear y administrar usuarios, grupos, roles y políticas de permisos para los recursos AWS.',
    status: 'active',
  },
  {
    id: 'vpc',
    name: 'Amazon VPC',
    category: 'Redes',
    description: 'Red privada virtual aislada dentro de la infraestructura de AWS. Permite definir subredes, tablas de rutas y grupos de seguridad.',
    mainFunction: 'Crear y controlar una red virtual con subredes públicas y privadas, firewalls y conectividad segura.',
    status: 'active',
  },
  {
    id: 'route53',
    name: 'Amazon Route 53',
    category: 'Redes',
    description: 'Servicio de DNS escalable y de alta disponibilidad. Permite registrar dominios y enrutar tráfico hacia recursos AWS.',
    mainFunction: 'Gestionar el enrutamiento de tráfico de Internet hacia aplicaciones alojadas en AWS o en servidores externos.',
    status: 'active',
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    category: 'Redes',
    description: 'Red de entrega de contenido (CDN) global con más de 400 puntos de presencia en todo el mundo.',
    mainFunction: 'Distribuir contenido estático y dinámico con baja latencia desde la ubicación más cercana al usuario.',
    status: 'active',
  },
];

export const securityItems: SecurityItem[] = [
  {
    id: '1',
    category: 'Responsabilidad Compartida',
    title: 'Seguridad de la Infraestructura',
    description: 'AWS gestiona la seguridad de la infraestructura física.',
    status: 'active',
  },
  {
    id: '2',
    category: 'Responsabilidad Compartida',
    title: 'Seguridad del Cliente',
    description: 'Gestión de datos, aplicaciones y configuración de accesos.',
    status: 'warning',
  },
  {
    id: '3',
    category: 'IAM',
    title: 'Autenticación Multi-Factor',
    description: 'MFA habilitado en cuentas críticas.',
    status: 'active',
  },
  {
    id: '4',
    category: 'IAM',
    title: 'Principio de Mínimo Privilegio',
    description: 'Revisión de permisos excesivos en roles IAM.',
    status: 'warning',
  },
  {
    id: '5',
    category: 'Protección de Datos',
    title: 'Cifrado en Reposo',
    description: 'S3 y RDS con cifrado AES-256 activado.',
    status: 'active',
  },
  {
    id: '6',
    category: 'Protección de Datos',
    title: 'Cifrado en Tránsito',
    description: 'TLS 1.3 en todas las comunicaciones.',
    status: 'active',
  },
  {
    id: '7',
    category: 'Protección de Cuentas',
    title: 'Cuenta Root',
    description: 'Uso de la cuenta root detectado recientemente.',
    status: 'error',
  },
  {
    id: '8',
    category: 'Cumplimiento',
    title: 'Registro de Auditoría',
    description: 'CloudTrail habilitado en todas las regiones.',
    status: 'active',
  },
];
