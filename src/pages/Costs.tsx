import { useState } from 'react';
import { DollarSign, PlusCircle, Trash2, TrendingUp, Calculator } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, PieChart, Pie, Legend } from 'recharts';
import { costItems as datosIniciales } from '../data/awsServices';
import type { CostItem } from '../types/cloud';

// ─── Catálogo de servicios con precio sugerido ────────────────────────────────

const CATALOGO: { nombre: string; precioHr: number }[] = [
  { nombre: 'Amazon EC2 — t3.micro',      precioHr: 0.0104 },
  { nombre: 'Amazon EC2 — t3.small',      precioHr: 0.0208 },
  { nombre: 'Amazon EC2 — t3.medium',     precioHr: 0.0416 },
  { nombre: 'Amazon EC2 — t3.large',      precioHr: 0.0832 },
  { nombre: 'Amazon S3 — Almacenamiento', precioHr: 0.0230 },
  { nombre: 'Amazon RDS — db.t3.micro',   precioHr: 0.0170 },
  { nombre: 'Amazon RDS — db.t3.medium',  precioHr: 0.0680 },
  { nombre: 'Amazon CloudFront',          precioHr: 0.0085 },
  { nombre: 'Amazon Route 53',            precioHr: 0.5000 },
  { nombre: 'AWS Lambda',                 precioHr: 0.0000002 },
  { nombre: 'Amazon ElastiCache',         precioHr: 0.0680 },
  { nombre: 'Amazon SNS',                 precioHr: 0.0005 },
];

const COLORES = ['#2563EB', '#7C3AED', '#0891B2', '#059669', '#D97706', '#DC2626', '#6366F1', '#EC4899'];

// ─── Estilos compartidos ──────────────────────────────────────────────────────

const CARD: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
};

const LABEL: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  color: '#374151',
  marginBottom: '5px',
};

const INPUT: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: '9px',
  border: '1px solid #E2E8F0',
  fontSize: '13px',
  color: '#1E293B',
  backgroundColor: '#F8FAFC',
  outline: 'none',
  fontFamily: 'inherit',
};

const FORM_VACIO = { servicio: '', cantidad: '', horas: '', costoUnitario: '' };

// ─── Helpers ──────────────────────────────────────────────────────────────────

const nombreCorto = (s: string) =>
  s.replace('Amazon ', '').replace('AWS ', '').split('—')[0].trim().split(' ')[0];

// ─── Página principal ─────────────────────────────────────────────────────────

export default function Costs() {
  const [items, setItems] = useState<CostItem[]>(datosIniciales);
  const [form, setForm]   = useState(FORM_VACIO);

  const totalMensual = items.reduce((a, i) => a + i.monthlyCost, 0);
  const totalAnual   = items.reduce((a, i) => a + i.annualCost, 0);

  const handleServicioChange = (nombre: string) => {
    const cat = CATALOGO.find(c => c.nombre === nombre);
    setForm(f => ({ ...f, servicio: nombre, costoUnitario: cat ? String(cat.precioHr) : f.costoUnitario }));
  };

  const handleAgregar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.servicio || !form.cantidad || !form.horas || !form.costoUnitario) return;

    const qty      = Number(form.cantidad);
    const hrs      = Number(form.horas);
    const unitCost = Number(form.costoUnitario);
    const mensual  = Number((qty * hrs * unitCost).toFixed(2));

    setItems(prev => [...prev, {
      id:             Date.now().toString(),
      service:        form.servicio,
      quantity:       qty,
      estimatedHours: hrs,
      unitCost,
      monthlyCost:    mensual,
      annualCost:     Number((mensual * 12).toFixed(2)),
    }]);
    setForm(FORM_VACIO);
  };

  const datosGrafico = items.map(i => ({ nombre: nombreCorto(i.service), mensual: i.monthlyCost }));
  const datosTorta   = items.map(i => ({ name: nombreCorto(i.service), value: i.monthlyCost }));

  const preview = form.cantidad && form.horas && form.costoUnitario
    ? Number(form.cantidad) * Number(form.horas) * Number(form.costoUnitario)
    : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Tarjetas de resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { label: 'Costo Mensual Total',  value: `$${totalMensual.toFixed(2)}`, sub: 'USD estimado',   icon: <DollarSign size={22} color="#D97706" />, bg: '#FFFBEB' },
          { label: 'Costo Anual Total',    value: `$${totalAnual.toFixed(2)}`,   sub: 'USD proyectado', icon: <TrendingUp size={22} color="#2563EB" />, bg: '#EFF6FF' },
          { label: 'Servicios en Cálculo', value: items.length,                  sub: 'ítems activos',  icon: <Calculator size={22} color="#7C3AED" />, bg: '#F5F3FF' },
        ].map(({ label, value, sub, icon, bg }) => (
          <div key={label} style={{ ...CARD, padding: '20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
            <div>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>{label}</p>
              <p style={{ fontSize: '26px', fontWeight: 700, color: '#1E293B', margin: '2px 0 0', lineHeight: 1.1 }}>{value}</p>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0' }}>{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario estimador */}
      <div style={{ ...CARD, padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calculator size={18} color="#2563EB" />
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Estimador de Costos</h2>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Agrega servicios para calcular el costo simulado</p>
          </div>
        </div>

        <form onSubmit={handleAgregar}>
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr auto', gap: '14px', alignItems: 'flex-end' }}>
            <div>
              <label style={LABEL}>Selección del servicio</label>
              <select style={{ ...INPUT, cursor: 'pointer' }} value={form.servicio} onChange={e => handleServicioChange(e.target.value)} required>
                <option value="">Seleccionar servicio AWS...</option>
                {CATALOGO.map(c => <option key={c.nombre} value={c.nombre}>{c.nombre}</option>)}
              </select>
            </div>
            <div>
              <label style={LABEL}>Cantidad</label>
              <input style={INPUT} type="number" min="1" placeholder="1" value={form.cantidad} onChange={e => setForm({ ...form, cantidad: e.target.value })} required />
            </div>
            <div>
              <label style={LABEL}>Horas estimadas</label>
              <input style={INPUT} type="number" min="1" placeholder="720" value={form.horas} onChange={e => setForm({ ...form, horas: e.target.value })} required />
            </div>
            <div>
              <label style={LABEL}>Costo/hr (USD)</label>
              <input style={INPUT} type="number" step="0.000001" min="0" placeholder="0.0416" value={form.costoUnitario} onChange={e => setForm({ ...form, costoUnitario: e.target.value })} required />
            </div>
            <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '9px', border: 'none', backgroundColor: '#2563EB', color: '#ffffff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <PlusCircle size={15} /> Agregar
            </button>
          </div>

          {/* Vista previa del cálculo */}
          {preview !== null && (
            <div style={{ marginTop: '14px', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#0369A1' }}><strong>Costo estimado:</strong> ${preview.toFixed(4)}</span>
              <span style={{ fontSize: '12px', color: '#0369A1' }}><strong>Costo mensual:</strong> ${preview.toFixed(2)}</span>
              <span style={{ fontSize: '12px', color: '#0369A1' }}><strong>Costo anual:</strong> ${(preview * 12).toFixed(2)}</span>
            </div>
          )}
        </form>
      </div>

      {/* Gráficos */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        <div style={{ ...CARD, padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: '0 0 6px' }}>Distribución de Costos Mensuales</h2>
          <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 20px' }}>Costo mensual estimado por servicio (USD)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={datosGrafico} margin={{ top: 4, right: 4, left: -12, bottom: 0 }} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="nombre" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '12px' }} formatter={v => [`$${Number(v).toFixed(2)}`, 'Mensual']} cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="mensual" radius={[6, 6, 0, 0]}>
                {datosGrafico.map((_, i) => <Cell key={i} fill={COLORES[i % COLORES.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...CARD, padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: '0 0 6px' }}>Proporción por Servicio</h2>
          <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 20px' }}>Distribución porcentual del costo mensual</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={datosTorta} cx="50%" cy="45%" innerRadius={52} outerRadius={80} paddingAngle={3} dataKey="value">
                {datosTorta.map((_, i) => <Cell key={i} fill={COLORES[i % COLORES.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '12px' }} formatter={v => [`$${Number(v).toFixed(2)}`, '']} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla detallada */}
      <div style={{ ...CARD, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Detalle de Costos</h2>
          <span style={{ fontSize: '12px', color: '#64748B' }}>{items.length} servicio{items.length !== 1 ? 's' : ''}</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Servicio', 'Cantidad', 'Horas estimadas', 'Costo/hr', 'Costo estimado', 'Costo mensual', 'Costo anual', ''].map(h => (
                  <th key={h} style={{ padding: '10px 18px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #F1F5F9', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#FAFBFC' }}>
                  <td style={{ padding: '13px 18px', fontWeight: 600, color: '#1E293B' }}>{item.service}</td>
                  <td style={{ padding: '13px 18px', color: '#64748B', textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ padding: '13px 18px', color: '#64748B', textAlign: 'center' }}>{item.estimatedHours}h</td>
                  <td style={{ padding: '13px 18px', color: '#64748B' }}>${item.unitCost}</td>
                  <td style={{ padding: '13px 18px', color: '#64748B' }}>${(item.quantity * item.estimatedHours * item.unitCost).toFixed(2)}</td>
                  <td style={{ padding: '13px 18px' }}><span style={{ fontWeight: 700, color: '#D97706', fontSize: '14px' }}>${item.monthlyCost.toFixed(2)}</span></td>
                  <td style={{ padding: '13px 18px' }}><span style={{ fontWeight: 700, color: '#2563EB', fontSize: '14px' }}>${item.annualCost.toFixed(2)}</span></td>
                  <td style={{ padding: '13px 18px' }}>
                    <button onClick={() => setItems(prev => prev.filter(x => x.id !== item.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr style={{ backgroundColor: '#F8FAFC', borderTop: '2px solid #E2E8F0' }}>
                <td colSpan={5} style={{ padding: '14px 18px', fontWeight: 700, color: '#1E293B', fontSize: '14px' }}>TOTAL</td>
                <td style={{ padding: '14px 18px' }}><span style={{ fontWeight: 700, color: '#D97706', fontSize: '16px' }}>${totalMensual.toFixed(2)}</span></td>
                <td style={{ padding: '14px 18px' }}><span style={{ fontWeight: 700, color: '#2563EB', fontSize: '16px' }}>${totalAnual.toFixed(2)}</span></td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
