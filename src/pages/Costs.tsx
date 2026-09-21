import { Calculator, DollarSign, PlusCircle, Trash2, TrendingUp } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import CostCard, { CostBarChart } from '../components/CostCard';
import { serviceOptions as CATALOGO } from '../data/AWSService';
import { CHART_COLORS } from '../data/AWSService';
import { calculateCost, isValidCostInput, summarizeCosts } from '../data/CostItem';
import type { CostDistribution, CostField, CostItem } from '../types/cloud';

interface CostsProps {
  items: CostItem[];
  setItems: Dispatch<SetStateAction<CostItem[]>>;
}

export default function Costs({ items, setItems }: CostsProps) {
  const { monthlyCost: totalMensual, annualCost: totalAnual, totalServices, distribution } = summarizeCosts(items);

  const editItem = (id: string, field: CostField, value: number) => {
    setItems(previous => previous.map(item => {
      if(item.id !== id) return item;
      const updated = { ...item, [field]: value };
      if(!isValidCostInput(updated.quantity, updated.estimatedHours, updated.unitCost)) return item;
      return { ...updated, ...calculateCost(updated.quantity, updated.estimatedHours, updated.unitCost) };
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tarjetas de resumen */}
      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { label: 'Costo Mensual Total', value: `$${totalMensual.toFixed(2)}`, sub: 'USD estimado', icon: <DollarSign size={22} color="#D97706" />, bg: '#FFFBEB' },
          { label: 'Costo Anual Total', value: `$${totalAnual.toFixed(2)}`, sub: 'USD proyectado', icon: <TrendingUp size={22} color="#2563EB" />, bg: '#EFF6FF' },
          { label: 'Servicios en Cálculo', value: totalServices, sub: 'servicios distintos', icon: <Calculator size={22} color="#7C3AED" />, bg: '#F5F3FF' },
        ].map(({ label, value, sub, icon, bg }) => (
          <CostCard key={label} label={label} value={value} sub={sub} icon={icon} bg={bg} />
        ))}
      </div>

      <CostForm onAdd={item => setItems(previous => [...previous, item])} />
      <CostCharts distribution={distribution} />
      <CostTable
        items={items}
        totalMensual={totalMensual}
        totalAnual={totalAnual}
        onEdit={editItem}
        onRemove={id => setItems(previous => previous.filter(item => item.id !== id))}
      />
    </div>
  );
}

const FORM_VACIO = { servicio: '', cantidad: '', horas: '', costoUnitario: '' };

function CostForm({ onAdd }: { onAdd: (item: CostItem) => void }) {
  const [form, setForm] = useState(FORM_VACIO);

  const handleServicioChange = (nombre: string) => {
    const cat = CATALOGO.find(c => c.nombre === nombre);
    setForm(f => ({ ...f, servicio: nombre, costoUnitario: cat ? String(cat.precioHr) : f.costoUnitario }));
  };

  const handleAgregar = (e: React.FormEvent) => {
    e.preventDefault();
    if(!form.servicio || !form.cantidad || !form.horas || !form.costoUnitario) return;

    const qty = Number(form.cantidad);
    const hrs = Number(form.horas);
    const unitCost = Number(form.costoUnitario);
    if(!isValidCostInput(qty, hrs, unitCost)) return;

    onAdd({
      id: crypto.randomUUID(),
      service: form.servicio,
      quantity: qty,
      estimatedHours: hrs,
      unitCost,
      ...calculateCost(qty, hrs, unitCost),
    });
    setForm(FORM_VACIO);
  };

  const preview = form.cantidad && form.horas && form.costoUnitario
    ? Number(form.cantidad) * Number(form.horas) * Number(form.costoUnitario)
    : null;

  return (

    <div className="surface" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div
          style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Calculator size={18} color="#2563EB" />
        </div>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Estimador de Costos</h2>
          <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Tarifas ficticias por recurso/hora. Mensual = cantidad × horas × tarifa; anual = mensual × 12.</p>
        </div>
      </div>

      <form onSubmit={handleAgregar}>
        <div
          className="responsive-grid"
          style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr auto', gap: '14px', alignItems: 'flex-end' }}>
          <div>
            <label htmlFor="field-1" className="field-label">Selección del servicio</label>
            <select
              id="field-1"
              className="field-control"
              style={{ cursor: 'pointer' }}
              value={form.servicio}
              onChange={e => handleServicioChange(e.target.value)}
              required>
              <option value="">Seleccionar servicio AWS...</option>
              {CATALOGO.map(c => <option key={c.nombre} value={c.nombre}>{c.nombre}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="field-2" className="field-label">Cantidad</label>
            <input
              id="field-2"
              className="field-control"
              type="number"
              min="1"
              placeholder="1"
              value={form.cantidad}
              onChange={e => setForm({ ...form, cantidad: e.target.value })}
              required />
          </div>
          <div>
            <label htmlFor="field-3" className="field-label">Horas estimadas</label>
            <input
              id="field-3"
              className="field-control"
              type="number"
              min="1"
              placeholder="720"
              value={form.horas}
              onChange={e => setForm({ ...form, horas: e.target.value })}
              required />
          </div>
          <div>
            <label htmlFor="field-4" className="field-label">Costo/hr (USD)</label>
            <input
              id="field-4"
              className="field-control"
              type="number"
              step="any"
              min="0"
              placeholder="0.0416"
              value={form.costoUnitario}
              onChange={e => setForm({ ...form, costoUnitario: e.target.value })}
              required />
          </div>
          <button
            type="submit"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '9px', border: 'none', backgroundColor: '#2563EB', color: '#ffffff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <PlusCircle size={15} /> Agregar
          </button>
        </div>

        {/* Vista previa del cálculo */}
        {preview !== null && (
          <div
            style={{ marginTop: '14px', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#0369A1' }}><strong>Costo estimado:</strong> ${preview.toFixed(4)}</span>
            <span style={{ fontSize: '12px', color: '#0369A1' }}><strong>Costo mensual:</strong> ${preview.toFixed(2)}</span>
            <span style={{ fontSize: '12px', color: '#0369A1' }}><strong>Costo anual:</strong> ${(Number(preview.toFixed(2)) * 12).toFixed(2)}</span>
          </div>
        )}
      </form>
    </div>

  );
}

function CostCharts({ distribution }: { distribution: CostDistribution }) {
  return (

    <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
      <div className="surface" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: '0 0 6px' }}>Distribución de Costos Mensuales</h2>
        <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 20px' }}>Costo mensual estimado por servicio (USD)</p>
        <CostBarChart distribution={distribution} />
      </div>

      <div className="surface" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: '0 0 6px' }}>Proporción por Servicio</h2>
        <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 20px' }}>Distribución porcentual del costo mensual</p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={distribution} cx="50%" cy="45%" innerRadius={52} outerRadius={80} paddingAngle={3} dataKey="value">
              {distribution.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '12px' }}
              formatter={v => [`$${Number(v).toFixed(2)}`, '']} />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

  );
}

const editableFields: { field: CostField; label: string; min: number; step: string; width: number }[] = [
  { field: 'quantity', label: 'Cantidad', min: 1, step: '1', width: 80 },
  { field: 'estimatedHours', label: 'Horas', min: 1, step: '1', width: 90 },
  { field: 'unitCost', label: 'Tarifa', min: 0, step: 'any', width: 110 },
];

interface CostTableProps {
  items: CostItem[];
  totalMensual: number;
  totalAnual: number;
  onEdit: (id: string, field: CostField, value: number) => void;
  onRemove: (id: string) => void;
}

function CostTable({ items, totalMensual, totalAnual, onEdit, onRemove }: CostTableProps) {
  return <>
    {/* Tabla detallada */}
    <p className="text-sm text-slate-500">Edita cantidad, horas o tarifa en la tabla: los totales y gráficos de Costos y Dashboard se actualizan automáticamente.</p>
    <div className="surface" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        style={{ padding: '18px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Detalle de Costos</h2>
        <span style={{ fontSize: '12px', color: '#64748B' }}>{items.length} registro{items.length !== 1 ? 's' : ''}</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              {['Servicio', 'Cantidad', 'Horas estimadas', 'Costo/hr', 'Costo estimado', 'Costo mensual', 'Costo anual', ''].map(h => (
                <th
                  key={h}
                  style={{ padding: '10px 18px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #F1F5F9', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#FAFBFC' }}>
                <td style={{ padding: '13px 18px', fontWeight: 600, color: '#1E293B' }}>{item.service}</td>
                {editableFields.map(({ field, label, min, step, width }) => (
                  <td key={field} style={{ padding: '13px 18px', color: '#64748B' }}>
                    <input
                      aria-label={`${label} de ${item.service}, registro ${idx + 1}`}
                      className="field-control"
                      style={{ minWidth: width }}
                      type="number"
                      min={min}
                      step={step}
                      required
                      value={item[field]}
                      onChange={event => {
                        const input = event.currentTarget;
                        if(input.validity.valid) onEdit(item.id, field, input.valueAsNumber);
                      }}
                    />
                  </td>
                ))}
                <td style={{ padding: '13px 18px', color: '#64748B' }}>${(item.quantity * item.estimatedHours * item.unitCost).toFixed(2)}</td>
                <td style={{ padding: '13px 18px' }}><span style={{ fontWeight: 700, color: '#D97706', fontSize: '14px' }}>${item.monthlyCost.toFixed(2)}</span></td>
                <td style={{ padding: '13px 18px' }}><span style={{ fontWeight: 700, color: '#2563EB', fontSize: '14px' }}>${item.annualCost.toFixed(2)}</span></td>
                <td style={{ padding: '13px 18px' }}>
                  <button
                    aria-label={`Eliminar ${item.service}`}
                    onClick={() => onRemove(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
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

  </>;
}

