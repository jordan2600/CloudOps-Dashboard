import { Server } from 'lucide-react';
import type { AWSService } from '../types/cloud';
import { StatusBadge } from './SecurityCard';
export default function ServiceCard({ service }: { service: AWSService }) {
  return (
    <article className="panel space-y-4">
      <div className="flex items-center gap-3">
        <Server className="text-blue-600" />
        <h2>{service.name}</h2>
      </div>
      <span className="tag">{service.category}</span>
      <p>{service.description}</p>
      <div>
        <h3>Función principal</h3>
        <p>{service.mainFunction}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span>Estado de utilización:</span>
        <StatusBadge status={service.status} />
      </div>
    </article>
  );
}

