import type { AWSService } from '../types/cloud';
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
    description: 'Red de entrega de contenido (CDN) que distribuye contenido mediante ubicaciones de borde.',
    mainFunction: 'Distribuir contenido estático y dinámico con baja latencia desde la ubicación más cercana al usuario.',
    status: 'active',
  },
];

export const serviceOptions = [
  { nombre: 'EC2', precioHr: 0.0416 },
  { nombre: 'S3', precioHr: 0.016 },
  { nombre: 'RDS', precioHr: 0.017 },
  { nombre: 'IAM', precioHr: 0 },
  { nombre: 'VPC', precioHr: 0 },
  { nombre: 'Route 53', precioHr: 0.001 },
  { nombre: 'CloudFront', precioHr: 0.012 },
];



export const CHART_COLORS = ['#2563EB', '#7C3AED', '#0891B2', '#059669', '#D97706', '#DC2626', '#6366F1', '#EC4899'];

