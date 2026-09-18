import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Planning from './pages/Planning';
import Costs from './pages/Costs';
import Infrastructure from './pages/Infrastructure';
import Security from './pages/Security';
import Network from './pages/Network';
import Services from './pages/Services';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#F8FAFC',
      }}>
        {/* Sidebar fijo a la izquierda */}
        <Sidebar />

        {/* Área de contenido */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden',
        }}>
          <Header />

          <main style={{
            flex: 1,
            overflowY: 'auto',
            padding: '28px',
            backgroundColor: '#F8FAFC',
          }}>
            <Routes>
              <Route path="/"               element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard"      element={<Dashboard />} />
              <Route path="/planning"       element={<Planning />} />
              <Route path="/costs"          element={<Costs />} />
              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/security"       element={<Security />} />
              <Route path="/network"        element={<Network />} />
              <Route path="/services"       element={<Services />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
