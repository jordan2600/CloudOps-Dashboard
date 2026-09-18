import { useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard':      { title: 'Dashboard',              subtitle: 'Resumen general de la solución Cloud' },
  '/planning':       { title: 'Planificación Cloud',    subtitle: 'Registra y gestiona propuestas de solución' },
  '/costs':          { title: 'Costos y Economía Cloud', subtitle: 'Estimación simulada de costos' },
  '/infrastructure': { title: 'Infraestructura Global', subtitle: 'Visualización de regiones y recursos AWS' },
  '/security':       { title: 'Seguridad',              subtitle: 'Responsabilidad compartida e IAM' },
  '/network':        { title: 'Arquitectura de Red',    subtitle: 'Topología de red y componentes VPC' },
  '/services':       { title: 'Servicios AWS',          subtitle: 'Catálogo de servicios disponibles' },
};

export default function Header() {
  const { pathname } = useLocation();
  const page = pageTitles[pathname] ?? { title: 'CloudOps Dashboard', subtitle: '' };

  return (
    <header style={{
      height: '64px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      flexShrink: 0,
    }}>
      {/* Título */}
      <div>
        <h1 style={{
          fontSize: '19px',
          fontWeight: 700,
          color: '#1E293B',
          margin: 0,
          lineHeight: '1.2',
        }}>
          {page.title}
        </h1>
        {page.subtitle && (
          <p style={{ fontSize: '12px', color: '#64748B', margin: 0, marginTop: '1px' }}>
            {page.subtitle}
          </p>
        )}
      </div>

      {/* Acciones derecha */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

        {/* Notificaciones */}
        <div style={{ position: 'relative' }}>
          <button style={{
            width: '38px', height: '38px',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#64748B',
          }}>
            <Bell size={17} />
          </button>
          {/* Punto rojo */}
          <span style={{
            position: 'absolute', top: '9px', right: '9px',
            width: '7px', height: '7px',
            borderRadius: '50%',
            backgroundColor: '#DC2626',
            border: '1.5px solid #ffffff',
          }} />
        </div>

        {/* Separador */}
        <div style={{ width: '1px', height: '28px', backgroundColor: '#E2E8F0' }} />

        {/* Usuario */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px', height: '38px',
            borderRadius: '10px',
            backgroundColor: '#2563EB',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <User size={17} color="#ffffff" />
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', margin: 0, lineHeight: '1.2' }}>
              Admin
            </p>
            <p style={{ fontSize: '11px', color: '#64748B', margin: 0 }}>
              CloudOps Team
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
