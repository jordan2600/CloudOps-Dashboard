# CloudOps Dashboard
CloudOps Dashboard es una aplicación web desarrollada para la práctica de Cloud Foundations de las semanas 5 y 6. Permite planificar una solución en la nube, calcular costos estimados y consultar información sobre regiones, seguridad y servicios de AWS.
El sistema utiliza datos simulados con fines educativos. No se conecta a una cuenta de AWS ni crea recursos reales.

## Tecnologías
- React y TypeScript para construir la aplicación.
- Vite para ejecutar y preparar el proyecto.
- Tailwind CSS y CSS para los estilos y el diseño responsive.
- React Router para navegar entre páginas.
- Recharts para los gráficos y Lucide React para los iconos.

## Instalación y ejecución

Con Node.js y npm instalados, abre una terminal en la carpeta del proyecto y ejecuta:
```bash
npm install
npm run dev
```
## Funcionalidades

- **Dashboard:** muestra el resumen de costos, recursos, seguridad y región seleccionada.
- **Planificación Cloud:** permite registrar propuestas con sus servicios, región, usuarios y objetivo de migración.
- **Costos:** permite agregar, modificar y eliminar estimaciones. Calcula el costo mensual y anual y actualiza los gráficos y el Dashboard.
- **Infraestructura Global:** muestra las regiones y sus servicios simulados.
- **Seguridad:** explica la responsabilidad compartida, los permisos IAM y los controles de seguridad.
- **Arquitectura de Red:** presenta un esquema de la solución con VPC, subredes, EC2, RDS, Route 53 y CloudFront.
- **Servicios AWS:** describe EC2, S3, RDS, IAM, VPC, Route 53 y CloudFront.

El diseño se adapta a pantallas de computadora y celular.

## Funcionamiento

El costo mensual se calcula multiplicando la cantidad de recursos por las horas estimadas y la tarifa por hora. El costo anual es el costo mensual multiplicado por 12. Las tarifas son ficticias para la práctica.
Al cambiar de región en el Dashboard, se actualizan sus datos y el estado simulado de la arquitectura. Los costos corresponden a la estimación general registrada.
Las propuestas, los costos y la región seleccionada se guardan en el almacenamiento local del navegador para conservar los cambios al recargar. Para recuperarlos, se debe usar el mismo navegador y la misma dirección; si se borran los datos del navegador, también se pierde esa información.

## Organización del proyecto

La carpeta `src` contiene los componentes reutilizables en `components`, las pantallas en `pages`, los tipos de TypeScript en `types` y los datos simulados en `data` y se dividen en: `CloudRegion.tsx`, `CostItem.tsx`, `SecurityItem.tsx` y `AWSService.tsx`.

`App.tsx` organiza la navegación y los datos compartidos, mientras que `main.tsx` inicia la aplicación.
