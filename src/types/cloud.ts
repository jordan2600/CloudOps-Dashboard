// ─────────────────────────────────────────────────────────────
// Tipos del sistema CloudOps Dashboard
// Orden según fases implementadas
// ─────────────────────────────────────────────────────────────

// Estado genérico de recursos
export type StatusType = 'active' | 'warning' | 'error' | 'inactive';

// ── Fase 5: Dashboard ────────────────────────────────────────

export interface CloudRegion {
  id: string;
  name: string;
  location: string;
  services: string[];
  status: StatusType;
  latency: string;
}

// ── Fase 6: Planificación Cloud ──────────────────────────────

export interface CloudProposal {
  id: string;
  solutionName: string;
  appType: string;
  description: string;
  region: string;
  estimatedUsers: number;
  availabilityLevel: string;
  selectedServices: string[];
  migrationGoal: string;
  createdAt: string;
}

// ── Fase 7: Costos ───────────────────────────────────────────

export interface CostItem {
  id: string;
  service: string;
  quantity: number;
  estimatedHours: number;
  unitCost: number;
  monthlyCost: number;
  annualCost: number;
}

// ── Fase 9: Seguridad ────────────────────────────

export interface SecurityItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: StatusType;
}

// ── Fase 11: Servicios AWS ───────────────────────

export interface AWSService {
  id: string;
  name: string;
  category: string;
  description: string;
  mainFunction: string;
  status: StatusType;
}

export type CostField = 'quantity' | 'estimatedHours' | 'unitCost';
export type CostDistribution = { name: string; value: number }[];
