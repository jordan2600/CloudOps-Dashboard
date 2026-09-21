import { ChevronDown, Globe, MapPin } from 'lucide-react';
import { cloudRegions } from '../data/CloudRegion';
import type { CloudRegion } from '../types/cloud';
import { StatusBadge } from './SecurityCard';
export default function RegionCard({ region }: { region: CloudRegion }) {
  return (
    <article className="panel space-y-3">
      <div className="flex items-center justify-between gap-2">
        <MapPin className="text-blue-600" />
        <StatusBadge status={region.status} />
      </div>
      <h2>{region.name}</h2>
      <code className="text-sm text-blue-700">{region.id}</code>
      <p>Ubicación: {region.location}</p>
      <h3>Servicios desplegados</h3>
      <div className="flex flex-wrap gap-2">{region.services.map(service => <span key={service} className="tag">{service}</span>)}</div>
    </article>
  );
}

interface RegionSelectorCardProps {
  region: CloudRegion;
  onChange: (r: string) => void;
}

export function RegionSelectorCard({ region, onChange }: RegionSelectorCardProps) {

  return (
    <div className="surface" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div
          style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#ECFEFF', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0891B2' }}>
          <Globe size={22} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 6px', fontWeight: 500 }}>Región Seleccionada</p>
          <div style={{ position: 'relative' }}>
            <select
              aria-label="Región seleccionada"
              value={region.name}
              onChange={e => onChange(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 32px 6px 10px',
                borderRadius: '9px',
                border: '1.5px solid #2563EB',
                backgroundColor: '#EFF6FF',
                color: '#1E293B',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                fontFamily: 'inherit',
              }}
            >
              {cloudRegions.map(r => (
                <option key={r.id} value={r.name}>{r.name}</option>
              ))}
            </select>
            <ChevronDown
              size={15}
              color="#2563EB"
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
          </div>
          <p style={{ fontSize: '11px', color: '#94A3B8', margin: '5px 0 0' }}>
            {region.id}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
            <span className="tag">{region.location}</span>
            <span className="tag">{region.latency}</span>
          </div>
          <p style={{ fontSize: '11px', color: '#64748B', margin: '8px 0 0' }}>
            Servicios: {region.services.join(' · ')}
          </p>
        </div>
      </div>
    </div>
  );
}

