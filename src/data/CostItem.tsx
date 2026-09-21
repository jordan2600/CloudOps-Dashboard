import type { CostItem } from '../types/cloud';
export const costItems: CostItem[] = [
  { id: '1', service: 'EC2', quantity: 3, estimatedHours: 720, unitCost: 0.0416 },
  { id: '2', service: 'S3', quantity: 1, estimatedHours: 720, unitCost: 0.016 },
  { id: '3', service: 'RDS', quantity: 1, estimatedHours: 720, unitCost: 0.017 },
  { id: '4', service: 'CloudFront', quantity: 1, estimatedHours: 720, unitCost: 0.012 },
  { id: '5', service: 'Route 53', quantity: 1, estimatedHours: 720, unitCost: 0.001 },
].map(item => ({ ...item, ...calculateCost(item.quantity, item.estimatedHours, item.unitCost) }));

// Datos simulados para la práctica CloudOps.



export type CostField = 'quantity' | 'estimatedHours' | 'unitCost';
export type CostDistribution = { name: string; value: number }[];
export function isValidCostInput(quantity: number, hours: number, unitCost: number) { return [quantity, hours, unitCost].every(Number.isFinite) && Number.isInteger(quantity) && quantity >= 1 && Number.isInteger(hours) && hours >= 1 && unitCost >= 0 && Number.isFinite(quantity * hours * unitCost * 12); }
export function calculateCost(quantity: number, estimatedHours: number, unitCost: number) { const monthlyCost = Number((quantity * estimatedHours * unitCost).toFixed(2)); return { monthlyCost, annualCost: Number((monthlyCost * 12).toFixed(2)) }; }
export function summarizeCosts(items: CostItem[]) { const byService = new Map<string, number>(); let monthlyCents = 0; let annualCents = 0; let totalResources = 0; for (const item of items) { const monthly = Math.round(item.monthlyCost * 100); monthlyCents += monthly; annualCents += Math.round(item.annualCost * 100); totalResources += item.quantity; byService.set(item.service, (byService.get(item.service) ?? 0) + monthly); } return { monthlyCost: monthlyCents / 100, annualCost: annualCents / 100, totalResources, totalServices: byService.size, distribution: [...byService].map(([name, cents]) => ({ name, value: cents / 100 })) }; }

