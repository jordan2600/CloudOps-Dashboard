import { useState } from 'react';
import { Server, DollarSign, Shield, CheckCircle, AlertTriangle, XCircle, Layers, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { dashboardStats, costItems, securityItems, cloudRegions } from '../data/awsServices';
import IndicatorCard from '../components/dashboard/IndicatorCard';
import RegionSelectorCard from '../components/dashboard/RegionSelectorCard';
import StatusBadge from '../components/dashboard/StatusBadge';

// ─── Constantes ───────────────────────────────────────────────────────────────

const CARD: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  padding: '20px',
};

const BAR_COLORS = ['#2563EB', '#7C3AED', '#0891B2', '#059669', '#D97706'];

// ─── Página principal ─────────────────────────────────────────────────────────

export default function Dashboard() {
  const { totalServices, monthlyCost, annualCost, totalResources, architectureStatus } = dashboardStats;

  const [regionSeleccionada, setRegionSeleccionada] = useState(cloudRegions[0].name);
  const regionActual = cloudRegions.find(r => r.name === regionSeleccionada) ?? cloudRegions[0];

  const segOk      = securityItems.filter(s => s.status === 'active').length;
  const segWarning = securityItems.filter(s => s.status === 'warning').length;
  const segError   = securityItems.filter(s => s.status === 'error').length;
  const segScore   = Math.round((segOk / securityItems.length) * 100);

  const chartData = costItems.map(item => ({
    name:  item.service.replace('Amazon ', '').replace(' (t3.medium)', '').replace(' (db.t3.micro)', ''),
    costo: Number(item.monthlyCost.toFixed(2)),
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── Indicadores principales ── */}
      <section>
        <p style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 14px' }}>
          Indicadores principales
        </p>

        {/* Fila 1: 4 columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <IndicatorCard title="Servicios Utilizados"   value={totalServices}                subtitle="servicios activos en AWS"              icon={<Server size={22} />}     iconBg="#EFF6FF" iconColor="#2563EB" />
          <RegionSelectorCard region={regionSeleccionada} onChange={setRegionSeleccionada} />
          <IndicatorCard title="Costo Mensual Estimado" value={`$${monthlyCost.toFixed(2)}`} subtitle="USD / mes"                             icon={<DollarSign size={22} />}  iconBg="#FFFBEB" iconColor="#D97706" />
          <IndicatorCard title="Costo Anual Estimado"   value={`$${annualCost.toFixed(2)}`}  subtitle="USD / año"                             icon={<DollarSign size={22} />}  iconBg="#EFF6FF" iconColor="#2563EB" />
        </div>

        {/* Fila 2: 3 columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
          <IndicatorCard title="Estado de Seguridad"       value={`${segScore}%`}   subtitle={`${segOk} correctos · ${segWarning} en revisión · ${segError} críticos`} icon={<Shield size={22} />}   iconBg="#F0FDF4" iconColor="#16A34A" />
          <IndicatorCard title="Recursos Cloud"            value={totalResources}   subtitle="instancias, buckets y bases de datos"                                    icon={<Layers size={22} />}   iconBg="#F5F3FF" iconColor="#7C3AED" />
          <IndicatorCard title="Estado de la Arquitectura" value={architectureStatus} subtitle="todos los servicios en línea"                                          icon={<Activity size={22} />} iconBg="#F0FDF4" iconColor="#16A34A" />
        </div>
      </section>

      {/* ── Gráfico + Seguridad + Regiones ── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>

        {/* Columna 1: Distribución de costos */}
        <div style={{ ...CARD, display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', margin: '0 0 2px' }}>Distribución de Costos</h2>
          <p style={{ fontSize: '11px', color: '#64748B', margin: '0 0 14px' }}>Costo mensual por servicio (USD)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '11px' }} formatter={v => [`$${Number(v).toFixed(2)}`, 'Mensual']} cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="costo" radius={[5, 5, 0, 0]}>
                {chartData.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Columna 2: Estado de seguridad */}
        <div style={{ ...CARD, display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', margin: '0 0 14px' }}>Estado de Seguridad</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            {[
              { icon: <CheckCircle size={15} color="#16A34A" />,   label: 'Correctos',        count: segOk,      bg: '#F0FDF4', border: '#BBF7D0', color: '#16A34A' },
              { icon: <AlertTriangle size={15} color="#D97706" />, label: 'Requiere revisión', count: segWarning, bg: '#FFFBEB', border: '#FDE68A', color: '#D97706' },
              { icon: <XCircle size={15} color="#DC2626" />,       label: 'Problema',          count: segError,   bg: '#FFF1F2', border: '#FECDD3', color: '#DC2626' },
            ].map(({ icon, label, count, bg, border, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '10px', backgroundColor: bg, border: `1px solid ${border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  {icon}
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#1E293B' }}>{label}</span>
                </div>
                <span style={{ fontSize: '20px', fontWeight: 700, color }}>{count}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Puntuación general</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>{segScore}%</span>
            </div>
            <div style={{ width: '100%', height: '7px', borderRadius: '999px', backgroundColor: '#E2E8F0' }}>
              <div style={{ height: '7px', borderRadius: '999px', backgroundColor: segScore >= 75 ? '#16A34A' : segScore >= 50 ? '#D97706' : '#DC2626', width: `${segScore}%` }} />
            </div>
            <p style={{ fontSize: '11px', color: '#94A3B8', margin: '5px 0 0' }}>{segOk} de {securityItems.length} controles correctos</p>
          </div>
        </div>

        {/* Columna 3: Regiones en uso */}
        <div style={{ ...CARD, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Regiones en Uso</h2>
            <span style={{ fontSize: '11px', color: '#64748B' }}>{cloudRegions.length} regiones</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            {cloudRegions.map(r => {
              const activa = r.name === regionSeleccionada;
              return (
                <div key={r.id} onClick={() => setRegionSeleccionada(r.name)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '9px', cursor: 'pointer', backgroundColor: activa ? '#EFF6FF' : '#F8FAFC', border: activa ? '1.5px solid #2563EB' : '1px solid #F1F5F9' }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ fontSize: '12px', fontWeight: activa ? 700 : 600, color: activa ? '#2563EB' : '#1E293B', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</p>
                    <p style={{ fontSize: '11px', color: '#94A3B8', margin: '1px 0 0' }}>{r.location} · {r.latency}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
            <p style={{ fontSize: '11px', color: '#64748B', margin: '0 0 6px', fontWeight: 600 }}>Servicios en región activa</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {regionActual.services.map(s => (
                <span key={s} style={{ padding: '2px 8px', borderRadius: '5px', backgroundColor: '#EFF6FF', color: '#1D4ED8', fontSize: '11px', fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
