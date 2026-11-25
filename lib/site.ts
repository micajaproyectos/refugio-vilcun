// ─────────────────────────────────────────────────────────────────────────────
// Configuración central del sitio.
//
// Si cambia el dominio de producción, cambia SOLO la constante SITE_URL de
// abajo. De ella dependen layout (metadataBase, canonical, OpenGraph),
// sitemap.ts, robots.ts, manifest.ts y el JSON-LD.
//
// TODO (pendiente de la reunión 17/7/2026):
//  - ADDRESS_STREET sigue vacío — falta el nombre/kilómetro exacto del camino.
//    Las coordenadas (GEO_LAT / GEO_LNG) sí están confirmadas, ver más abajo.
//  - Instagram y Facebook ya apuntan a los perfiles reales. La ficha de Google
//    Maps ya está enlazada en GOOGLE_MAPS_URL y sumada al `sameAs` del JSON-LD
//    en app/layout.tsx.
// ─────────────────────────────────────────────────────────────────────────────

// De acá salen `metadataBase` (y con él las URL absolutas de las imágenes de
// previsualización), la canónica, el sitemap, robots.txt y el JSON-LD.
//
// Estuvo fijo en 'https://www.refugiodelvilcun.cl' mientras ese dominio todavía
// no existía, y eso rompía la previsualización al compartir: el sitio publicado
// en Vercel declaraba su `og:image` en refugiodelvilcun.cl, un dominio que no
// resuelve, así que WhatsApp no podía descargar ninguna imagen y mostraba el
// enlace pelado. La imagen estaba bien; la dirección apuntaba al vacío.
//
// `VERCEL_PROJECT_PRODUCTION_URL` la da Vercel en build y en runtime, y es la
// pensada justamente para esto: entrega el dominio de producción del proyecto
// —hoy refugio-vilcun.vercel.app— y pasa sola al dominio propio en cuanto se
// conecte, sin tocar este archivo. Viene sin el esquema, de ahí el https://.
// `NEXT_PUBLIC_SITE_URL` queda por delante para poder forzar un valor a mano.
const dominioVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (dominioVercel ? `https://${dominioVercel}` : 'https://www.refugiodelvilcun.cl')
).replace(/\/+$/, '');

export const SITE_NAME = 'Refugio del Vilcún';

export const SITE_TITLE =
  'Refugio del Vilcún — Restaurante, Cafetería y Complejo Turístico';

export const SITE_DESCRIPTION =
  'Complejo turístico en Chaitén, Carretera Austral: restaurante de grupos Santa Bárbara, waflería Chaitén, sauna y masajes, cabañas con tinajas y centro de eventos. Asados al palo, chicha en bota y tenedor libre, a pasos de la Playa Santa Bárbara.';

export const SLOGAN_RESTAURANTE = 'Ven a disfrutar de una experiencia patagónica única';

// ── Contacto ────────────────────────────────────────────────────────────────
// Dos líneas de WhatsApp según lo definido en la reunión: una para consultas
// de mesa/cafetería, otra para eventos, cabañas y sauna & spa.
export const WHATSAPP_RESTAURANTE = '56931388495';
export const WHATSAPP_EVENTOS = '56987534653';

export const EMAIL_CONTACTO = 'contacto@refugiodelvilcun.cl'; // TODO: confirmar correo real

// ── Ubicación ───────────────────────────────────────────────────────────────
// El complejo está en Chaitén, sobre la Carretera Austral. "Vilcún" es parte
// del NOMBRE del negocio (Refugio del Vilcún), no de su ubicación: hasta el
// 3/8/2026 el sitio declaraba por error estar en Vilcún, Región de la
// Araucanía —una comuna del interior, a unos 600 km— lo que apuntaba el SEO y
// el mapa de Google a la región equivocada. No volver a mezclar ambas cosas.
//
// TODO: completar la dirección postal exacta (nombre de camino / kilómetro).
export const ADDRESS_STREET = ''; // ej. "Ruta 7, sector Santa Bárbara"
export const ADDRESS_LOCALITY = 'Chaitén';

// Región administrativa, para el JSON-LD y la dirección postal: Chaitén es
// capital de la Provincia de Palena, en la Región de Los Lagos. Va aparte del
// texto de marca porque "Carretera Austral" y "Patagonia Chilena" describen la
// zona, pero no son unidades administrativas y Google no las reconoce como tal.
export const ADDRESS_REGION = 'Región de Los Lagos';

// Cómo se nombra la ubicación en pantalla (hero, pie de página, contacto).
export const LOCATION_TAGLINE = 'Chaitén · Carretera Austral · Patagonia Chilena';

// ── Mapa ────────────────────────────────────────────────────────────────────
// Coordenadas tomadas de la ficha real del negocio en Google Maps
// ("Restaurante y Cabañas Refugio del Vilcún"), al norte de Chaitén sobre la
// Ruta 7. De aquí salen: el mapa embebido de la sección "Cómo llegar", los
// botones de navegación y el `geo` / `hasMap` del JSON-LD.
export const GEO_LAT = -42.855983;
export const GEO_LNG = -72.7963414;

// Ficha pública en Google Maps — es también el enlace de "Ver en Google Maps".
export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Restaurante+y+Caba%C3%B1as+Refugio+del+Vilc%C3%BAn/@-42.855983,-72.7963414,17z';

// Iframe del mapa. Se usa la forma clásica `output=embed`, que no requiere
// clave de la Maps Embed API; si más adelante se contrata una, conviene migrar
// a https://www.google.com/maps/embed/v1/place para mostrar la ficha completa.
export const GOOGLE_MAPS_EMBED = `https://maps.google.com/maps?q=${GEO_LAT},${GEO_LNG}&z=14&hl=es&output=embed`;

// Navegación puerta a puerta: Google Maps abre la app en móvil y la web en
// escritorio; Waze es habitual entre quienes recorren la Carretera Austral.
export const GOOGLE_MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${GEO_LAT},${GEO_LNG}`;
export const WAZE_DIRECTIONS = `https://waze.com/ul?ll=${GEO_LAT},${GEO_LNG}&navigate=yes`;

// TODO: reemplazar por los perfiles reales.
export const SOCIAL_INSTAGRAM = 'https://www.instagram.com/refugiodelvilcun/';
export const SOCIAL_FACEBOOK = 'https://www.facebook.com/paginarefugiodelvilcun/?locale=es_LA';

function waLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const WA_LINKS = {
  restaurante: waLink(
    WHATSAPP_RESTAURANTE,
    'Hola, me gustaría reservar mesa / consultar disponibilidad en el restaurante.'
  ),
  cafeteria: waLink(
    WHATSAPP_RESTAURANTE,
    'Hola, quisiera consultar por la cafetería.'
  ),
  eventos: waLink(
    WHATSAPP_EVENTOS,
    'Hola, me gustaría consultar disponibilidad para el centro de eventos.'
  ),
  cabanas: waLink(
    WHATSAPP_EVENTOS,
    'Hola, me gustaría consultar disponibilidad de cabañas con tinaja.'
  ),
  spa: waLink(
    WHATSAPP_EVENTOS,
    'Hola, quisiera consultar por el sauna y la sala de masajes.'
  ),
  general: waLink(
    WHATSAPP_RESTAURANTE,
    'Hola, me gustaría consultar por Refugio del Vilcún.'
  ),
};

// ── Rutas del sitio ─────────────────────────────────────────────────────────
// Los slugs llevan la localidad ("-chaiten", sin tilde) porque estas páginas
// son la puerta de entrada desde Google para búsqueda local: quien va bajando
// la Carretera Austral escribe "restaurante Chaitén", no el nombre del local.
// La home no puede competir por esa consulta —tiene que hablar de restaurante,
// cafetería, cabañas y eventos a la vez— y esa dispersión le impide rankear
// por ninguna. Cada subpágina, en cambio, apunta a una sola.
//
// NUNCA poner la tilde en la URL: `chaitén` se serializa como `chait%C3%A9n`
// al copiarse y se ve roto en cualquier lugar donde se pegue.
//
// El patrón es rubro-localidad y aplica a las tres. Las dos comentadas todavía
// no existen como página: al crearlas se descomentan acá y se suman al
// sitemap, y recién entonces se puede enlazar hacia ellas.
export const ROUTES = {
  home: '/',
  restaurante: '/restaurante-chaiten',
  // cafeteria: '/cafeteria-chaiten',
  // cabanas:   '/cabanas-chaiten',
} as const;
