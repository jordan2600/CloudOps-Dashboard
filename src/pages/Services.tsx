import ServiceCard from '../components/ServiceCard';
import { awsServicesCatalog } from '../data/AWSService';
export default function Services() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">Servicios utilizados en la propuesta simulada de CloudOps.</p>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{awsServicesCatalog.map(service => <ServiceCard key={service.id} service={service} />)}</div>
    </div>
  );
}

