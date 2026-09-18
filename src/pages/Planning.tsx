import { useState } from 'react';
import { ClipboardList, PlusCircle, Trash2, CheckCircle2 } from 'lucide-react';
import type { CloudProposal } from '../types/cloud';

// ─── Opciones de los selectores ───────────────────────────────────────────────

const TIPOS_APP = ['Web Application', 'Mobile Backend', 'E-Commerce', 'Data Analytics', 'Microservices', 'Machine Learning', 'SaaS Platform', 'API Gateway'];

const REGIONES = [
  'Este de EE.UU. (N. Virginia)',
  'Oeste de EE.UU. (Oregón)',
  'Europa (Irlanda)',
  'Asia Pacífico (Singapur)',
  'Asia Pacífico (Tokio)',
  'América del Sur (São Paulo)',
];

const DISPONIBILIDAD = ['99.0% — Básico', '99.9% — Estándar', '99.95% — Alta disponibilidad', '99.99% — Crítico / Misión crítica'];

const OBJETIVOS = ['Reducción de costos operativos', 'Escalabilidad y elasticidad', 'Alta disponibilidad y resiliencia', 'Modernización de aplicaciones', 'Expansión geográfica global', 'Recuperación ante desastres', 'Cumplimiento normativo', 'Velocidad de desarrollo (DevOps)'];

const SERVICIOS = ['EC2', 'S3', 'RDS', 'IAM', 'VPC', 'Route 53', 'CloudFront'];

// ─── Estilos compartidos ──────────────────────────────────────────────────────

const CARD: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
};

const LABEL: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#374151',
  marginBottom: '6px',
};

const INPUT: React.CSSProperties = {
  width: '100%',
  padding: '10px 13px',
  borderRadius: '10px',
  border: '1px solid #E2E8F0',
  fontSize: '13px',
  color: '#1E293B',
  backgroundColor: '#F8FAFC',
  outline: 'none',
  fontFamily: 'inherit',
};

// ─── Estado inicial del formulario ────────────────────────────────────────────

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

// ─── Página principal ─────────────────────────────────────────────────────────

export default function Planning() {
  const [form, setForm]           = useState(FORM_VACIO);
  const [proposals, setProposals] = useState<CloudProposal[]>([]);
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
    if (!form.solutionName || !form.appType || !form.region) return;

    setProposals(p => [{
      id:                Date.now().toString(),
      solutionName:      form.solutionName,
      appType:           form.appType,
      description:       form.description,
      region:            form.region,
      estimatedUsers:    Number(form.estimatedUsers) || 0,
      availabilityLevel: form.availabilityLevel,
      selectedServices:  form.selectedServices,
      migrationGoal:     form.migrationGoal,
      createdAt:         new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }),
    }, ...p]);

    setForm(FORM_VACIO);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Formulario */}
      <div style={{ ...CARD, padding: '28px' }}>

        {/* Cabecera */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '11px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ClipboardList size={20} color="#2563EB" />
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Nueva Propuesta de Solución Cloud</h2>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Completa todos los campos para registrar tu propuesta</p>
          </div>
          {submitted && (
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', color: '#15803D', fontSize: '13px', fontWeight: 600 }}>
              <CheckCircle2 size={15} /> Propuesta registrada
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>

          {/* Nombre + Tipo */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label style={LABEL}>Nombre de la solución <span style={{ color: '#DC2626' }}>*</span></label>
              <input style={INPUT} placeholder="Ej: Portal de ventas online" value={form.solutionName} onChange={e => setForm({ ...form, solutionName: e.target.value })} required />
            </div>
            <div>
              <label style={LABEL}>Tipo de aplicación <span style={{ color: '#DC2626' }}>*</span></label>
              <select style={{ ...INPUT, cursor: 'pointer' }} value={form.appType} onChange={e => setForm({ ...form, appType: e.target.value })} required>
                <option value="">Seleccionar tipo...</option>
                {TIPOS_APP.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: '18px' }}>
            <label style={LABEL}>Descripción</label>
            <textarea style={{ ...INPUT, minHeight: '80px', resize: 'vertical' }} placeholder="Describe brevemente la solución..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>

          {/* Región + Usuarios + Disponibilidad */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label style={LABEL}>Región seleccionada <span style={{ color: '#DC2626' }}>*</span></label>
              <select style={{ ...INPUT, cursor: 'pointer' }} value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} required>
                <option value="">Seleccionar región AWS...</option>
                {REGIONES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={LABEL}>Número estimado de usuarios</label>
              <input style={INPUT} type="number" min="1" placeholder="Ej: 5000" value={form.estimatedUsers} onChange={e => setForm({ ...form, estimatedUsers: e.target.value })} />
            </div>
            <div>
              <label style={LABEL}>Nivel de disponibilidad</label>
              <select style={{ ...INPUT, cursor: 'pointer' }} value={form.availabilityLevel} onChange={e => setForm({ ...form, availabilityLevel: e.target.value })}>
                <option value="">Seleccionar...</option>
                {DISPONIBILIDAD.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Objetivo de la migración */}
          <div style={{ marginBottom: '22px' }}>
            <label style={LABEL}>Objetivo de la migración</label>
            <select style={{ ...INPUT, cursor: 'pointer' }} value={form.migrationGoal} onChange={e => setForm({ ...form, migrationGoal: e.target.value })}>
              <option value="">Seleccionar objetivo...</option>
              {OBJETIVOS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          {/* Servicios Cloud */}
          <div style={{ marginBottom: '28px' }}>
            <label style={LABEL}>
              Servicios Cloud seleccionados
              {form.selectedServices.length > 0 && (
                <span style={{ marginLeft: '8px', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                  {form.selectedServices.length} seleccionados
                </span>
              )}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SERVICIOS.map(svc => {
                const activo = form.selectedServices.includes(svc);
                return (
                  <button key={svc} type="button" onClick={() => toggleService(svc)} style={{ padding: '7px 16px', borderRadius: '8px', border: activo ? '2px solid #2563EB' : '2px solid #E2E8F0', backgroundColor: activo ? '#EFF6FF' : '#F8FAFC', color: activo ? '#2563EB' : '#64748B', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    {activo && '✓ '}{svc}
                  </button>
                );
              })}
            </div>
          </div>

          <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 26px', borderRadius: '10px', border: 'none', backgroundColor: '#2563EB', color: '#ffffff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            <PlusCircle size={16} /> Registrar Propuesta
          </button>
        </form>
      </div>

      {/* Tabla de propuestas o estado vacío */}
      {proposals.length > 0 ? (
        <div style={{ ...CARD, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Propuestas Registradas</h2>
            <span style={{ padding: '4px 12px', borderRadius: '999px', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '12px', fontWeight: 600 }}>
              {proposals.length} propuesta{proposals.length > 1 ? 's' : ''}
            </span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  {['Nombre', 'Tipo', 'Región', 'Usuarios', 'Disponibilidad', 'Servicios', 'Objetivo', 'Fecha', ''].map(h => (
                    <th key={h} style={{ padding: '10px 18px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #F1F5F9', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {proposals.map((p, idx) => (
                  <tr key={p.id} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#FAFBFC' }}>
                    <td style={{ padding: '13px 18px', fontWeight: 600, color: '#1E293B', whiteSpace: 'nowrap' }}>{p.solutionName}</td>
                    <td style={{ padding: '13px 18px' }}>
                      <span style={{ padding: '3px 9px', borderRadius: '6px', backgroundColor: '#F1F5F9', color: '#475569', fontSize: '12px', fontWeight: 600 }}>{p.appType}</span>
                    </td>
                    <td style={{ padding: '13px 18px', color: '#64748B', fontSize: '12px' }}>{p.region}</td>
                    <td style={{ padding: '13px 18px', color: '#64748B', textAlign: 'right' }}>{p.estimatedUsers > 0 ? p.estimatedUsers.toLocaleString() : '—'}</td>
                    <td style={{ padding: '13px 18px', color: '#64748B', fontSize: '12px', whiteSpace: 'nowrap' }}>{p.availabilityLevel ? p.availabilityLevel.split('—')[0].trim() : '—'}</td>
                    <td style={{ padding: '13px 18px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {p.selectedServices.slice(0, 3).map(s => (
                          <span key={s} style={{ padding: '2px 7px', borderRadius: '5px', backgroundColor: '#EFF6FF', color: '#1D4ED8', fontSize: '11px', fontWeight: 600 }}>{s}</span>
                        ))}
                        {p.selectedServices.length > 3 && <span style={{ fontSize: '11px', color: '#94A3B8' }}>+{p.selectedServices.length - 3}</span>}
                        {p.selectedServices.length === 0 && <span style={{ fontSize: '12px', color: '#94A3B8' }}>—</span>}
                      </div>
                    </td>
                    <td style={{ padding: '13px 18px', color: '#64748B', fontSize: '12px' }}>{p.migrationGoal || '—'}</td>
                    <td style={{ padding: '13px 18px', color: '#94A3B8', fontSize: '12px', whiteSpace: 'nowrap' }}>{p.createdAt}</td>
                    <td style={{ padding: '13px 18px' }}>
                      <button onClick={() => setProposals(prev => prev.filter(x => x.id !== p.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
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
        <div style={{ ...CARD, padding: '52px 24px', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <ClipboardList size={26} color="#CBD5E1" />
          </div>
          <p style={{ fontSize: '15px', fontWeight: 600, color: '#94A3B8', margin: 0 }}>Aún no hay propuestas registradas</p>
          <p style={{ fontSize: '13px', color: '#CBD5E1', margin: '6px 0 0' }}>Completa el formulario de arriba para registrar tu primera propuesta Cloud</p>
        </div>
      )}
    </div>
  );
}
