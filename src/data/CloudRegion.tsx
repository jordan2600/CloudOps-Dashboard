import type { CloudRegion } from '../types/cloud';
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

// Datos simulados para la práctica CloudOps.

