import type { SecurityItem } from '../types/cloud';
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

export const iamExamples = [
  { type: 'Usuario', name: 'operador-cloud', description: 'Identidad del operador con MFA y acceso de lectura.' },
  { type: 'Grupo', name: 'EquipoOperaciones', description: 'Agrupa usuarios que consultan el estado de los recursos.' },
  { type: 'Rol', name: 'RolAplicacionEC2', description: 'La aplicación asume el rol para obtener credenciales temporales.' },
  { type: 'Política', name: 'LecturaObjetosApp', description: 'Permite s3:GetObject únicamente en el bucket de la aplicación.' },
];

// Datos simulados para la práctica CloudOps.

