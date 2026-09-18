import type { StatusType } from '../../types/cloud';

export default function StatusBadge({ status }: { status: StatusType }) {
  const map: Record<StatusType, { label: string; bg: string; color: string; dot: string }> = {
    active:   { label: 'Activo',    bg: '#DCFCE7', color: '#15803D', dot: '#16A34A' },
    warning:  { label: 'Revisión', bg: '#FEF9C3', color: '#A16207', dot: '#CA8A04' },
    error:    { label: 'Error',     bg: '#FEE2E2', color: '#B91C1C', dot: '#DC2626' },
    inactive: { label: 'Inactivo', bg: '#F1F5F9', color: '#64748B', dot: '#94A3B8' },
  };
  const s = map[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '999px', backgroundColor: s.bg, color: s.color, fontSize: '11px', fontWeight: 600 }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: s.dot }} />
      {s.label}
    </span>
  );
}
