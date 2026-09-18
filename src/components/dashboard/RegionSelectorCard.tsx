import { Globe, ChevronDown } from 'lucide-react';
import { cloudRegions } from '../../data/awsServices';

interface RegionSelectorCardProps {
  region: string;
  onChange: (r: string) => void;
}

export default function RegionSelectorCard({ region, onChange }: RegionSelectorCardProps) {
  const CARD: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    padding: '20px',
  };

  return (
    <div style={CARD}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#ECFEFF', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0891B2' }}>
          <Globe size={22} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 6px', fontWeight: 500 }}>Región Seleccionada</p>
          <div style={{ position: 'relative' }}>
            <select
              value={region}
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
            {cloudRegions.find(r => r.name === region)?.id ?? ''}
          </p>
        </div>
      </div>
    </div>
  );
}
