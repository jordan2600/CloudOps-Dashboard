import { Globe } from 'lucide-react';
import RegionCard from '../components/RegionCard';
import { cloudRegions } from '../data/CloudRegion';
export default function Infrastructure() {
  const locations = [...new Set(cloudRegions.map(region => region.location))];
  return (
    <div className="space-y-6">
      <section className="panel space-y-4">
        <h2 className="flex items-center gap-3">
          <Globe className="text-blue-600" />Distribución global de la solución</h2>
        <p>Regiones de esta simulación agrupadas por ubicación.</p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{locations.map(location => <div key={location} className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <h3>{location}</h3>
          <ul className="mt-3 space-y-2">{cloudRegions.filter(region => region.location === location).map(region => <li key={region.id} className="border-l-2 border-blue-500 pl-3">
            <span className="block text-sm font-semibold">{region.name}</span>
            <code className="text-xs text-slate-500">{region.id}</code>
          </li>)}</ul>
        </div>)}</div>
      </section>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{cloudRegions.map(region => <RegionCard key={region.id} region={region} />)}</div>
    </div>
  );
}

