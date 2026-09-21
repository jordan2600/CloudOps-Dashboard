# CloudOps Dashboard

Aplicación React + TypeScript para la práctica de Cloud Foundations, semanas 5 y 6.
Simula planificación, costos, regiones, seguridad, arquitectura de red y servicios AWS.

## Ejecutar

```sh
npm install
npm run dev
```

Usa siempre la misma dirección y navegador para conservar tus datos locales.
Los costos, propuestas registradas y región seleccionada se guardan automáticamente
con localStorage. Las tarifas son simuladas; no se conecta con AWS.

## Verificar

```sh
npm run lint
npm run build
```

## Organización

- `src/pages`: pantallas y coordinación de datos.
- `src/components`: tarjetas, formularios, tablas, gráficos y navegación.
- `src/data`: datos simulados separados en `CloudRegion.tsx`, `CostItem.tsx`, `SecurityItem.tsx` y `AWSService.tsx`.
- `src/App.tsx`: navegación y estado con guardado local.
- `src/types`: modelos TypeScript.
- `src/index.css`: estilos comunes y adaptación móvil.

Los archivos de configuración de Vite, TypeScript, Tailwind, ESLint y Vercel
son necesarios para desarrollar, verificar o publicar la aplicación.
