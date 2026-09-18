import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  DollarSign,
  Globe,
  Shield,
  Network,
  Server,
  Cloud,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard',      label: 'Dashboard',           icon: LayoutDashboard },
  { to: '/planning',       label: 'Planificación Cloud',  icon: ClipboardList },
  { to: '/costs',          label: 'Costos',               icon: DollarSign },
  { to: '/infrastructure', label: 'Infraestructura Global', icon: Globe },
  { to: '/security',       label: 'Seguridad',            icon: Shield },
  { to: '/network',        label: 'Arquitectura de Red',  icon: Network },
  { to: '/services',       label: 'Servicios AWS',        icon: Server },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: '260px',
      minWidth: '260px',
      height: '100vh',
      backgroundColor: '#0F172A',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '20px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{
          width: '40px', height: '40px',
          borderRadius: '12px',
          backgroundColor: '#2563EB',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Cloud size={20} color="#ffffff" />
        </div>
        <div>
          <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '15px', margin: 0, lineHeight: '1.2' }}>
            CloudOps
          </p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', margin: 0 }}>
            Dashboard
          </p>
        </div>
      </div>

      {/* Etiqueta sección */}
      <div style={{ padding: '20px 20px 8px' }}>
        <p style={{
          color: 'rgba(255,255,255,0.25)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          Menú principal
        </p>
      </div>

      {/* Navegación */}
      <nav style={{ flex: 1, padding: '0 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '10px',
              fontSize: '13.5px',
              fontWeight: 500,
              textDecoration: 'none',
              color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
              backgroundColor: isActive ? '#2563EB' : 'transparent',
              transition: 'all 0.15s ease',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={17} color={isActive ? '#ffffff' : 'rgba(255,255,255,0.5)'} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', margin: 0 }}>
          Cloud Foundations © 2026
        </p>
      </div>
    </aside>
  );
}
