interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

export default function StatCard({ title, value, subtitle, icon, iconBg, iconColor }: StatCardProps) {

  return (
    <div className="surface" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div
          style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: iconBg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor }}>
          {icon}
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0, fontWeight: 500 }}>{title}</p>
          <p style={{ fontSize: '26px', fontWeight: 700, color: '#1E293B', margin: '3px 0 0', lineHeight: 1.1 }}>{value}</p>
          <p style={{ fontSize: '12px', color: '#94A3B8', margin: '3px 0 0' }}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

