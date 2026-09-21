import { ArrowDown, Database, Globe, Network as NetworkIcon, Radio, Server } from 'lucide-react';
import { StatusBadge } from '../components/SecurityCard';
export default function Network() {
  return (
    <div className="space-y-6">
      <section className="panel space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2>Arquitectura de la solución Cloud</h2>
          <StatusBadge status="active" />
        </div>
        <p>Esquema conceptual: Internet → Route 53 → CloudFront → VPC → EC2 / RDS.</p>
        <div className="network-flow">
          <div className="network-node">
            <Globe />
            <h3>INTERNET</h3>
            <p>Usuarios de la aplicación</p>
          </div>
          <ArrowDown aria-hidden="true" />
          <div className="network-node">
            <Radio />
            <h3>Amazon Route 53</h3>
            <p>Resuelve el dominio hacia CloudFront (DNS)</p>
          </div>
          <ArrowDown aria-hidden="true" />
          <div className="network-node">
            <Globe />
            <h3>Amazon CloudFront</h3>
            <p>Distribuye contenido y envía solicitudes HTTPS al origen</p>
          </div>
          <ArrowDown aria-hidden="true" />
          <div className="w-full rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50 p-4 sm:p-6">
            <h3 className="flex items-center gap-2">
              <NetworkIcon size={20} />Amazon VPC · 10.0.0.0/16</h3>
            <p className="mt-2 text-sm">Región: us-east-1 · Internet Gateway y tabla de rutas de la subred pública</p>
            <div className="my-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <h3>Subred pública · 10.0.1.0/24</h3>
                <div className="network-node mt-4">
                  <Server />
                  <h3>Amazon EC2</h3>
                  <p>Servidor de la aplicación</p>
                </div>
                <p className="mt-3 text-sm">Grupo de seguridad web: HTTPS (443) desde CloudFront.</p>
              </div>
              <div className="rounded-xl border border-green-200 bg-white p-5">
                <h3>Subred privada · 10.0.2.0/24</h3>
                <div className="network-node mt-4">
                  <Database />
                  <h3>Amazon RDS</h3>
                  <p>Base de datos de la aplicación</p>
                </div>
                <p className="mt-3 text-sm">Grupo de seguridad de datos: puerto 3306 únicamente desde el grupo de EC2. Sin acceso público.</p>
              </div>
            </div>
            <p className="rounded-lg bg-white p-3 text-center font-semibold text-blue-700">EC2 → conexión privada a RDS (3306)</p>
          </div>
        </div>
        <p>Route 53 participa en la resolución DNS; el tráfico web viaja del usuario a CloudFront y luego al origen EC2. El diagrama representa la propuesta, no recursos desplegados.</p>
      </section>
    </div>
  );
}

