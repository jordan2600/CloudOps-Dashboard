import type { ReactNode } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CHART_COLORS } from '../data/AWSService';
import type { CostDistribution } from '../types/cloud';
export default function CostCard({ label, value, sub, icon, bg }: { label: string; value: string | number; sub: string; icon: ReactNode; bg: string }) {
  return (
    <article className="panel flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: bg }}>{icon}</div>
      <div className="min-w-0">
        <p>{label}</p>
        <strong className="text-2xl text-slate-800">{value}</strong>
        <p className="text-xs">{sub}</p>
      </div>
    </article>
  );
}

interface CostBarChartProps {
  distribution: CostDistribution;
  compact?: boolean;
}

export function CostBarChart({ distribution, compact = false }: CostBarChartProps) {
  const fontSize = compact ? 10 : 11;
  return (
    <ResponsiveContainer width="100%" height={compact ? 180 : 220}>
      <BarChart data={distribution} margin={{ top: 4, right: 4, left: compact ? -18 : -12, bottom: 0 }} barSize={compact ? 22 : 32}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={value => `$${value}`} />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: fontSize + 1 }}
          formatter={value => [`$${Number(value).toFixed(2)}`, 'Mensual']}
          cursor={{ fill: '#F8FAFC' }} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {distribution.map((item, index) => <Cell key={item.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

