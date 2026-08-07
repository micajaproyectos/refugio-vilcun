# Refugio del Vilcún

Sitio web de **Refugio del Vilcún**: complejo turístico en Vilcún, Región de La
Araucanía. Restaurante de grupos Santa Bárbara, cafetería Chaitén, sauna y
sala de masajes, kiosko Santa Bárbara, cabañas con tinaja y centro de eventos.

## Tecnologías

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

Estructura y sistema de diseño replicados desde el proyecto de referencia
`rioespolon-cabanas` (misma paleta: crema + verde bosque + dorado).

## Requisitos

- Node.js 18.18 o superior
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila la versión de producción |
| `npm run start` | Sirve la versión de producción compilada |
| `npm run lint` | Ejecuta el linter |

## Estructura del proyecto

```
app/            Rutas y páginas (App Router), sitemap, robots y manifest
components/     Componentes de UI (Hero, RestaurantCafeteria, Services, Events, etc.)
hooks/          Custom hooks de React
lib/site.ts     Configuración central: dominio, WhatsApp, contacto, redes
public/         Imágenes y logo — carpetas creadas, pendientes de material real
```

## Configuración

Todo lo editable sin tocar componentes vive en [`lib/site.ts`](lib/site.ts):
dominio (`SITE_URL`), números de WhatsApp, correo, dirección y redes sociales.

### Pendientes (según reunión 17/7/2026)

- [ ] **Dominio real** — hoy `lib/site.ts` usa un placeholder
      (`refugiodelvilcun.cl`); actualizar `SITE_URL` cuando exista.
- [ ] **Dirección exacta y coordenadas** — `ADDRESS_STREET` está vacío en
      `lib/site.ts`; sin esto no se puede embeber un mapa real en Contacto.
- [ ] **Perfiles de Instagram, Facebook y Google Business** — `SOCIAL_*` en
      `lib/site.ts` apuntan a `#`.
- [ ] **Logo corporativo** — colocar en `public/logo/` (ver `LEEME.txt` ahí).
- [ ] **Fotografías reales** — cada subcarpeta de `public/images/` tiene un
      `LEEME.txt` con lo que se espera. Mientras tanto, todas las imágenes se
      muestran con el componente `<Placeholder>` (`components/Placeholder.tsx`).
- [ ] **Correo de contacto** — `EMAIL_CONTACTO` es un placeholder
      (`contacto@refugiodelvilcun.cl`); confirmar el real.

## Despliegue

Preparado para [Vercel](https://vercel.com/), que detecta Next.js sin
configuración adicional. No se utilizan variables de entorno.
