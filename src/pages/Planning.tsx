import { CheckCircle2, ClipboardList, PlusCircle, Trash2 } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { cloudRegions } from '../data/CloudRegion';
import { serviceOptions } from '../data/AWSService';
import type { CloudProposal } from '../types/cloud';

const TIPOS_APP = ['Web Application', 'Mobile Backend', 'E-Commerce', 'Data Analytics', 'Microservices', 'Machine Learning', 'SaaS Platform', 'API Gateway'];

const REGIONES = cloudRegions.map(region => region.name);

const DISPONIBILIDAD = ['99.0% — Básico', '99.9% — Estándar', '99.95% — Alta disponibilidad', '99.99% — Crítico / Misión crítica'];

const OBJETIVOS = ['Reducción de costos operativos', 'Escalabilidad y elasticidad', 'Alta disponibilidad y resiliencia', 'Modernización de aplicaciones', 'Expansión geográfica global', 'Recuperación ante desastres', 'Cumplimiento normativo', 'Velocidad de desarrollo (DevOps)'];

const SERVICIOS = serviceOptions.map(service => service.nombre);

const FORM_VACIO = {
  solutionName: '',
  appType: '',
  description: '',
  region: '',
  estimatedUsers: '',
  availabilityLevel: '',
  selectedServices: [] as string[],
  migrationGoal: '',
};

export default function Planning({ proposals, setProposals }: { proposals: CloudProposal[]; setProposals: Dispatch<SetStateAction<CloudProposal[]>> }) {
  const [form, setForm] = useState(FORM_VACIO);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (svc: string) =>
    setForm(f => ({
      ...f,
      selectedServices: f.selectedServices.includes(svc)
        ? f.selectedServices.filter(s => s !== svc)
        : [...f.selectedServices, svc],
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!form.solutionName || !form.appType || !form.region) return;

    setProposals(p => [{
      id: crypto.randomUUID(),
      solutionName: form.solutionName,
      appType: form.appType,
      description: form.description,
      region: form.region,
      estimatedUsers: Number(form.estimatedUsers) || 0,
      availabilityLevel: form.availabilityLevel,
      selectedServices: form.selectedServices,
      migrationGoal: form.migrationGoal,
      createdAt: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }),
    }, ...p]);

    setForm(FORM_VACIO);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Formulario */}
      <div className="surface" style={{ padding: '28px' }}>

        {/* Cabecera */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div
            style={{ width: '42px', height: '42px', borderRadius: '11px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ClipboardList size={20} color="#2563EB" />
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Nueva Propuesta de Solución Cloud</h2>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Completa todos los campos para registrar tu propuesta</p>
          </div>
          {submitted && (
            <div
              style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', color: '#15803D', fontSize: '13px', fontWeight: 600 }}>
              <CheckCircle2 size={15} /> Propuesta registrada
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>

          {/* Nombre + Tipo */}
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label htmlFor="field-1" className="field-label">Nombre de la solución <span style={{ color: '#DC2626' }}>*</span></label>
              <input
                id="field-1"
                className="field-control"
                placeholder="Ej: Portal de ventas online"
                value={form.solutionName}
                onChange={e => setForm({ ...form, solutionName: e.target.value })}
                required />
            </div>
            <div>
              <label htmlFor="field-2" className="field-label">Tipo de aplicación <span style={{ color: '#DC2626' }}>*</span></label>
              <select
                id="field-2"
                className="field-control"
                style={{ cursor: 'pointer' }}
                value={form.appType}
                onChange={e => setForm({ ...form, appType: e.target.value })}
                required>
                <option value="">Seleccionar tipo...</option>
                {TIPOS_APP.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: '18px' }}>
            <label htmlFor="field-3" className="field-label">Descripción</label>
            <textarea
              id="field-3"
              className="field-control"
              style={{ minHeight: '80px', resize: 'vertical' }}
              placeholder="Describe brevemente la solución..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>

          {/* Región + Usuarios + Disponibilidad */}
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label htmlFor="field-4" className="field-label">Región seleccionada <span style={{ color: '#DC2626' }}>*</span></label>
              <select
                id="field-4"
                className="field-control"
                style={{ cursor: 'pointer' }}
                value={form.region}
                onChange={e => setForm({ ...form, region: e.target.value })}
                required>
                <option value="">Seleccionar región AWS...</option>
                {REGIONES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="field-5" className="field-label">Número estimado de usuarios</label>
              <input
                id="field-5"
                className="field-control"
                type="number"
                min="1"
                placeholder="Ej: 5000"
                value={form.estimatedUsers}
                onChange={e => setForm({ ...form, estimatedUsers: e.target.value })} />
            </div>
            <div>
              <label htmlFor="field-6" className="field-label">Nivel de disponibilidad</label>
              <select
                id="field-6"
                className="field-control"
                style={{ cursor: 'pointer' }}
                value={form.availabilityLevel}
                onChange={e => setForm({ ...form, availabilityLevel: e.target.value })}>
                <option value="">Seleccionar...</option>
                {DISPONIBILIDAD.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Objetivo de la migración */}
          <div style={{ marginBottom: '22px' }}>
            <label htmlFor="field-7" className="field-label">Objetivo de la migración</label>
            <select
              id="field-7"
              className="field-control"
              style={{ cursor: 'pointer' }}
              value={form.migrationGoal}
              onChange={e => setForm({ ...form, migrationGoal: e.target.value })}>
              <option value="">Seleccionar objetivo...</option>
              {OBJETIVOS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          {/* Servicios Cloud */}
          <div style={{ marginBottom: '28px' }}>
            <label className="field-label">
              Servicios Cloud seleccionados
              {form.selectedServices.length > 0 && (
                <span
                  style={{ marginLeft: '8px', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                  {form.selectedServices.length} seleccionados
                </span>
              )}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SERVICIOS.map(svc => {
                const activo = form.selectedServices.includes(svc);
                return (
                  <button
                    key={svc}
                    type="button"
                    aria-pressed={activo}
                    onClick={() => toggleService(svc)}
                    style={{ padding: '7px 16px', borderRadius: '8px', border: activo ? '2px solid #2563EB' : '2px solid #E2E8F0', backgroundColor: activo ? '#EFF6FF' : '#F8FAFC', color: activo ? '#2563EB' : '#64748B', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    {activo && '✓ '}{svc}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 26px', borderRadius: '10px', border: 'none', backgroundColor: '#2563EB', color: '#ffffff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            <PlusCircle size={16} /> Registrar Propuesta
          </button>
        </form>
      </div>

      <ProposalTable proposals={proposals} onRemove={id => setProposals(previous => previous.filter(proposal => proposal.id !== id))} />

    </div>
  );
}

interface ProposalTableProps {
  proposals: CloudProposal[];
  onRemove: (id: string) => void;
}

function ProposalTable({ proposals, onRemove }: ProposalTableProps) {
  return <>
    {/* Tabla de propuestas o estado vacío */}
    {proposals.length > 0 ? (
      <div className="surface" style={{ padding: 0, overflow: 'hidden' }}>
        <div
          style={{ padding: '18px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Propuestas Registradas</h2>
          <span
            style={{ padding: '4px 12px', borderRadius: '999px', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '12px', fontWeight: 600 }}>
            {proposals.length} propuesta{proposals.length > 1 ? 's' : ''}
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Nombre', 'Descripción', 'Tipo', 'Región', 'Usuarios', 'Disponibilidad', 'Servicios', 'Objetivo', 'Fecha', ''].map(h => (
                  <th
                    key={h}
                    style={{ padding: '10px 18px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #F1F5F9', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {proposals.map((p, idx) => (
                <tr key={p.id} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#FAFBFC' }}>
                  <td style={{ padding: '13px 18px', fontWeight: 600, color: '#1E293B', whiteSpace: 'nowrap' }}>{p.solutionName}</td><td style={{ padding: '13px 18px', minWidth: 200 }}>{p.description || '—'}</td>
                  <td style={{ padding: '13px 18px' }}>
                    <span style={{ padding: '3px 9px', borderRadius: '6px', backgroundColor: '#F1F5F9', color: '#475569', fontSize: '12px', fontWeight: 600 }}>{p.appType}</span>
                  </td>
                  <td style={{ padding: '13px 18px', color: '#64748B', fontSize: '12px' }}>{p.region}</td>
                  <td style={{ padding: '13px 18px', color: '#64748B', textAlign: 'right' }}>{p.estimatedUsers > 0 ? p.estimatedUsers.toLocaleString() : '—'}</td>
                  <td style={{ padding: '13px 18px', color: '#64748B', fontSize: '12px', whiteSpace: 'nowrap' }}>{p.availabilityLevel ? p.availabilityLevel.split('—')[0].trim() : '—'}</td>
                  <td style={{ padding: '13px 18px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {p.selectedServices.map(s => (
                        <span
                          key={s}
                          style={{ padding: '2px 7px', borderRadius: '5px', backgroundColor: '#EFF6FF', color: '#1D4ED8', fontSize: '11px', fontWeight: 600 }}>{s}</span>
                      ))}

                      {p.selectedServices.length === 0 && <span style={{ fontSize: '12px', color: '#94A3B8' }}>—</span>}
                    </div>
                  </td>
                  <td style={{ padding: '13px 18px', color: '#64748B', fontSize: '12px' }}>{p.migrationGoal || '—'}</td>
                  <td style={{ padding: '13px 18px', color: '#94A3B8', fontSize: '12px', whiteSpace: 'nowrap' }}>{p.createdAt}</td>
                  <td style={{ padding: '13px 18px' }}>
                    <button
                      aria-label={`Eliminar propuesta ${p.solutionName}`}
                      onClick={() => onRemove(p.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div className="surface" style={{ padding: '52px 24px', textAlign: 'center' }}>
        <div
          style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
          <ClipboardList size={26} color="#CBD5E1" />
        </div>
        <p style={{ fontSize: '15px', fontWeight: 600, color: '#94A3B8', margin: 0 }}>Aún no hay propuestas registradas</p>
        <p style={{ fontSize: '13px', color: '#CBD5E1', margin: '6px 0 0' }}>Completa el formulario de arriba para registrar tu primera propuesta Cloud</p>
      </div>
    )}
  </>;
}

