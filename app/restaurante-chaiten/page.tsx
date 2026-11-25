import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import SubpageHero from '@/components/SubpageHero';
import FeatureBand from '@/components/FeatureBand';
import Carta from '@/components/Carta';
import CartaGaleria from '@/components/CartaGaleria';
import CierreCta from '@/components/CierreCta';
import Directions from '@/components/Directions';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  GRUPOS_CARTA,
  PIEZAS_RESTAURANTE,
  PLATOS_CARRUSEL,
} from '@/lib/carta';
// La dirección, las coordenadas y el mapa NO se importan acá a propósito: ya
// van en el JSON-LD de negocio de app/layout.tsx, que se emite también en esta
// página. Ver la nota sobre el nodo aditivo, más abajo.
import { SITE_URL, SITE_NAME, ROUTES, WA_LINKS, WHATSAPP_RESTAURANTE } from '@/lib/site';

// ─────────────────────────────────────────────────────────────────────────────
// Restaurante Santa Bárbara — /restaurante-chaiten
//
// Primera subpágina del sitio, que hasta acá era una landing de una sola ruta.
// Existe por dos razones concretas:
//
//  1. La carta no cabe en la home. Son cuatro tablas de sushi con precios más
//     ensaladas y platos: metido en el scroll único lo vuelve inmanejable.
//  2. La home no puede rankear por "restaurante Chaitén". Tiene que hablar de
//     restaurante, cafetería, cabañas y eventos a la vez, y esa dispersión le
//     impide competir por ninguna consulta. Esta página apunta a una sola.
//
// El slug lleva la localidad y no lleva tilde — ver la nota de ROUTES en
// lib/site.ts antes de cambiarlo. Cambiar una URL publicada obliga a montar
// redirecciones y rompe los enlaces ya compartidos.
// ─────────────────────────────────────────────────────────────────────────────

const TITULO = 'Restaurante en Chaitén — Carta, sushi y delivery | Refugio del Vilcún';

const DESCRIPCION =
  'Carta del Restaurante Santa Bárbara, en Chaitén sobre la Carretera Austral: tablas de sushi de 40 bocados desde $24.000 con delivery, ensalada César en tres versiones, quiche de ave y choclo, asados al palo y tenedor libre. Reserva directo por WhatsApp.';

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  keywords: [
    'restaurante Chaitén',
    'sushi Chaitén',
    'delivery sushi Chaitén',
    'dónde comer en Chaitén',
    'restaurante Carretera Austral',
    'tenedor libre Chaitén',
    'asados al palo Patagonia',
    'restaurante de grupos Chaitén',
  ],
  alternates: {
    canonical: ROUTES.restaurante,
  },
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    type: 'website',
    locale: 'es_CL',
    url: `${SITE_URL}${ROUTES.restaurante}`,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og/og-refugio.jpg',
        width: 1200,
        height: 630,
        alt: 'Restaurante Santa Bárbara del Refugio del Vilcún, en Chaitén',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITULO,
    description: DESCRIPCION,
    images: ['/og/og-refugio.jpg'],
  },
};

// ── Datos estructurados ─────────────────────────────────────────────────────
// El `Menu` se arma DESDE lib/carta.ts, no a mano: así un cambio de precio se
// refleja a la vez en pantalla y en lo que lee Google, sin riesgo de que
// queden diciendo cosas distintas.
//
// Sólo se declara `offers` en los items que tienen precio publicado. Un
// `MenuItem` con precio inventado o en cero es peor que uno sin precio: Google
// lo muestra y el visitante llega con una expectativa equivocada.
const menuJsonLd = {
  '@type': 'Menu',
  name: 'Carta del Restaurante Santa Bárbara',
  inLanguage: 'es-CL',
  hasMenuSection: GRUPOS_CARTA.map((grupo) => ({
    '@type': 'MenuSection',
    name: grupo.titulo,
    ...(grupo.descripcion ? { description: grupo.descripcion } : {}),
    hasMenuItem: grupo.items.map((item) => ({
      '@type': 'MenuItem',
      name: item.nombre,
      ...(item.descripcion || item.detalle
        ? { description: item.descripcion ?? item.detalle!.join('. ') }
        : {}),
      ...(item.precio !== undefined
        ? {
            offers: {
              '@type': 'Offer',
              price: item.precio,
              priceCurrency: 'CLP',
            },
          }
        : {}),
    })),
  })),
};

// El JSON-LD de negocio de app/layout.tsx se emite en TODAS las páginas, esta
// incluida. Así que acá no se vuelve a declarar el negocio: se declara un nodo
// ADITIVO con el mismo `@id`, que Google fusiona con aquel, y que sólo aporta
// lo que la home no tiene — la carta.
//
// Deliberadamente NO se repiten `url`, `name`, `address`, `geo` ni `telephone`.
// Al fusionar dos nodos con el mismo `@id`, declarar `url` acá crearía dos
// direcciones distintas para una misma entidad (la home y esta página) y esa
// contradicción es justamente lo que impide que Google resuelva la ficha.
// Si alguna vez hace falta un nodo con datos propios, hay que darle un `@id`
// distinto, no cambiarle el valor a éste.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Restaurant',
      '@id': `${SITE_URL}/#negocio`,
      servesCuisine: ['Patagónica', 'Internacional', 'Sushi'],
      acceptsReservations: true,
      hasMenu: menuJsonLd,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Restaurante',
          item: `${SITE_URL}${ROUTES.restaurante}`,
        },
      ],
    },
  ],
};

export default function RestaurantePage() {
  return (
    <main className="bg-bg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <SubpageHero
        breadcrumb="Restaurante"
        overline="Restaurante Santa Bárbara"
        titleLead="Cocina patagónica en el corazón de"
        titleAccent="Chaitén"
        description="El salón grande del complejo, sobre la Carretera Austral y a pasos de la Playa Santa Bárbara. Asados al palo, chicha en bota, tenedor libre y una carta de sushi con delivery a tu puerta."
        image={{
          src: '/images/restaurante/restaurante_horizontal.png',
          alt: 'Salón del restaurante Santa Bárbara lleno de comensales, con ventanales hacia el lago',
        }}
        imagePosition="center 55%"
        cta={{ label: 'Reservar mesa', href: WA_LINKS.restaurante }}
        secondaryCta={{ label: 'Ver la carta', href: '#carta' }}
      />

      <FeatureBand
        id="cocina"
        overline="Nuestra cocina"
        titleLead="Cocina internacional con"
        titleAccent="acento patagónico"
        body={
          <p>
            La cocina la lidera la chef{' '}
            <strong className="font-medium text-cream">Karen Medrano</strong>, que combina la
            técnica y las referencias de la cocina internacional con el sabor de la Patagonia.
            Esa mezcla es la que define la carta, del tenedor libre a la coctelería de la casa.
          </p>
        }
        signature="Karen Medrano · Chef"
        images={PLATOS_CARRUSEL}
        frameAspect="1 / 1"
        imageSide="right"
      />

      <Carta
        grupos={GRUPOS_CARTA}
        nota="Precios referenciales en pesos chilenos, informados por el restaurante y sujetos a cambio sin aviso. Los platos sin precio publicado se consultan al reservar. Disponibilidad según temporada."
      />

      <CartaGaleria
        piezas={PIEZAS_RESTAURANTE}
        titulo="Nuestras piezas de temporada"
        descripcion="Las mismas preparaciones de la carta, en las piezas que publicamos en redes. Ábrelas para verlas completas y compartirlas por WhatsApp."
      />

      <CierreCta
        overline="Haz tu pedido"
        titleLead="Reserva tu mesa o pide"
        titleAccent="delivery"
        descripcion="Atendemos todos los días. Las tablas de sushi salen a domicilio y el salón recibe grupos grandes con reserva previa."
        puntos={[
          {
            titulo: 'Delivery',
            detalle: 'Las cuatro tablas de sushi, el handroll, las empanadas y los arrollados salen a tu puerta.',
          },
          {
            titulo: 'Grupos',
            detalle: 'El salón se prepara para grupos grandes con la cocina del complejo a cargo del servicio.',
          },
          {
            titulo: 'Sin intermediarios',
            detalle: 'La reserva se coordina directo por WhatsApp con el restaurante, sin plataformas de por medio.',
          },
        ]}
        cta={{ label: 'Pedir por WhatsApp', href: WA_LINKS.restaurante }}
        telefono={{ label: `Llamar +${WHATSAPP_RESTAURANTE}`, href: `tel:+${WHATSAPP_RESTAURANTE}` }}
      />

      <Directions />
      <Footer />

      <WhatsAppButton />
    </main>
  );
}
