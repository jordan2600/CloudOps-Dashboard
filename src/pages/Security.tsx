import SecurityCard from '../components/SecurityCard';
import { iamExamples, securityItems } from '../data/SecurityItem';
export default function Security() {
  return (
    <div className="space-y-6">
      <section className="panel space-y-4">
        <h2>Modelo de responsabilidad compartida</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-blue-50 p-5">
            <h3>AWS: seguridad de la nube</h3>
            <p>Protege centros de datos, hardware, redes físicas y la infraestructura que ejecuta los servicios.</p>
          </div>
          <div className="rounded-xl bg-green-50 p-5">
            <h3>Cliente: seguridad en la nube</h3>
            <p>Administra identidades, permisos, datos y configuración. En EC2 también administra el sistema operativo y sus actualizaciones; la responsabilidad varía según el servicio.</p>
          </div>
        </div>
      </section>
      <section className="panel space-y-4">
        <h2>IAM: identidades y permisos</h2>
        <p>Ejemplos simulados de usuarios, grupos, roles y políticas para aplicar el mínimo privilegio.</p>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Elemento</th>
                <th>Nombre</th>
                <th>Uso en la solución</th>
              </tr>
            </thead>
            <tbody>{iamExamples.map(item => <tr key={item.type}>
              <td>{item.type}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Controles de seguridad simulados</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{securityItems.map(item => <SecurityCard key={item.id} item={item} />)}</div>
      </section>
    </div>
  );
}

