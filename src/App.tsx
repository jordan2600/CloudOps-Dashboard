import type { SetStateAction } from 'react';
import { useCallback, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { cloudRegions } from './data/CloudRegion';
import { costItems, isValidCostInput } from './data/CostItem';
import { serviceOptions } from './data/AWSService';
import Costs from './pages/Costs';
import Dashboard from './pages/Dashboard';
import Infrastructure from './pages/Infrastructure';
import Network from './pages/Network';
import Planning from './pages/Planning';
import Security from './pages/Security';
import Services from './pages/Services';
import type { CloudProposal, CostItem } from './types/cloud';

export default function App() {
  const [items, setItems, costsError] = usePersistentState<CostItem[]>('cloudops.costs.v1', costItems, isCostList);
  const [regionSeleccionada, setRegionSeleccionada, regionError] = usePersistentState('cloudops.region.v1', cloudRegions[0].name, isRegionName);
  const [proposals, setProposals, proposalsError] = usePersistentState<CloudProposal[]>('cloudops.proposals.v1', [], isProposalList);
  const storageError = costsError || regionError || proposalsError;

  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* Sidebar fijo a la izquierda */}
        <Sidebar />

        {/* Área de contenido */}
        <div className="app-content">
          <Header />

          <main className="app-main">
            {storageError && (
              <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {storageError}
              </p>
            )}
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={<Dashboard items={items} regionSeleccionada={regionSeleccionada} onRegionChange={setRegionSeleccionada} />} />
              <Route path="/planning" element={<Planning proposals={proposals} setProposals={setProposals} />} />
              <Route path="/costs" element={<Costs items={items} setItems={setItems} />} />
              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/security" element={<Security />} />
              <Route path="/network" element={<Network />} />
              <Route path="/services" element={<Services />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

// Guarda antes de terminar cada cambio; no depende de un temporizador ni del desmontaje.
function usePersistentState<T>(key: string, initialValue: T, validate: (value: unknown) => value is T) {
  const [initial] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if(saved === null) return { value: initialValue, error: '' };
      const parsed: unknown = JSON.parse(saved);
      if(validate(parsed)) return { value: parsed, error: '' };
      return { value: initialValue, error: 'Los datos guardados no tienen un formato válido. Se muestran los datos iniciales.' };
    } catch {
      return { value: initialValue, error: 'No se pudieron leer los datos guardados en este navegador.' };
    }
  });
  const [value, setValue] = useState<T>(initial.value);
  const [error, setError] = useState(initial.error);
  const current = useRef(value);

  const updateValue = useCallback((action: SetStateAction<T>) => {
    const next = typeof action === 'function'
      ? (action as (previous: T) => T)(current.current)
      : action;
    current.current = next;
    setValue(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
      setError('');
    } catch {
      setError('No se pudieron guardar los últimos cambios. Comprueba que el navegador permita almacenamiento local antes de recargar.');
    }
  }, [key]);

  return [value, updateValue, error] as const;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;
const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

function isCostList(value: unknown): value is CostItem[] {
  return Array.isArray(value) && value.every(item => isRecord(item)
    && typeof item.id === 'string'
    && serviceOptions.some(service => service.nombre === item.service)
    && isFiniteNumber(item.quantity)
    && isFiniteNumber(item.estimatedHours)
    && isFiniteNumber(item.unitCost)
    && isValidCostInput(item.quantity, item.estimatedHours, item.unitCost)
    && isFiniteNumber(item.monthlyCost) && item.monthlyCost >= 0
    && isFiniteNumber(item.annualCost) && item.annualCost >= 0);
}

function isProposalList(value: unknown): value is CloudProposal[] {
  return Array.isArray(value) && value.every(item => isRecord(item)
    && ['id', 'solutionName', 'appType', 'description', 'region', 'availabilityLevel', 'migrationGoal', 'createdAt']
      .every(key => typeof item[key] === 'string')
    && isFiniteNumber(item.estimatedUsers) && item.estimatedUsers >= 0
    && Array.isArray(item.selectedServices)
    && item.selectedServices.every(service => typeof service === 'string'));
}

function isRegionName(value: unknown): value is string {
  return typeof value === 'string' && cloudRegions.some(region => region.name === value);
}

