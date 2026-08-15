import type { Metadata } from 'next';
import { Cinzel, Lora, Yellowtail } from 'next/font/google';
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  SOCIAL_INSTAGRAM,
  SOCIAL_FACEBOOK,
  WHATSAPP_RESTAURANTE,
  GEO_LAT,
  GEO_LNG,
  GOOGLE_MAPS_URL,
} from '@/lib/site';
import './globals.css';

// Cinzel — tipografía de títulos, alineada con el logotipo corporativo.
// Regular (400) es el peso base; se cargan además 500/600/700 porque la
// jerarquía existente usa font-medium/semibold y sin esos cortes el navegador
// los sintetizaría (falso negrita). Cinzel no tiene cursiva: los acentos van
// en .script-accent (itálica de Lora) y la manuscrita del hero en .claim-script.
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Yellowtail — la manuscrita del titular del hero (.claim-script), en el mismo
// estilo de pincel que el "Vilcún" del logotipo. Ocupa el lugar que Bromello
// nunca llegó a ocupar: el archivo comercial no está en public/fonts/ y,
// mientras faltara, cualquier trazo manuscrito caía en la itálica de Lora, que
// es una cursiva de libro y no un pincel. Yellowtail es lo más cercano al
// logotipo dentro de Google Fonts, y al servirse por next/font no depende de
// que nadie copie un archivo a mano.
const yellowtail = Yellowtail({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-script',
  display: 'swap',
  weight: '400',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    'restaurante Chaitén',
    'waflería Chaitén',
    'restaurante de grupos Chaitén',
    'centro de eventos Chaitén',
    'matrimonios Chaitén',
    'cabañas con tinaja Carretera Austral',
    'asados al palo Patagonia',
    'tenedor libre Chaitén',
    'dónde comer en la Carretera Austral',
    'Playa Santa Bárbara Chaitén',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo/logo-badge.png',
    apple: '/logo/logo-badge.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: SITE_NAME,
    // Tarjeta compuesta —foto aérea + sello + rubros— en public/og/, generada
    // por scripts/og-card.py. Antes acá iba restaurante_horizontal.png tal
    // cual, y traía dos problemas: 1448×1086 es 4:3 y la tarjeta ancha pide
    // 1.91:1, así que Facebook la recortaba arriba y abajo; y pesaba 2,4 MB,
    // muy por encima del corte de WhatsApp, que descarta la miniatura y deja
    // el enlace sin imagen. La tarjeta actual pesa ~150 KB. Si se cambia,
    // mantenerla en JPEG y bajo 250 KB.
    images: [
      {
        url: '/og/og-refugio.jpg',
        width: 1200,
        height: 630,
        alt: 'Vista aérea del complejo Refugio del Vilcún, en Chaitén, con el sello del logotipo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og/og-refugio.jpg'],
  },
};

// Schema.org — combina Restaurant (prioridad del negocio) con EventVenue y
// LodgingBusiness porque el complejo cubre las tres actividades.
// NOTA: `geo` y `hasMap` salen de la ficha real del negocio en Google Maps
// (ver lib/site.ts). Siguen fuera streetAddress y aggregateRating/review
// porque esos datos aún no están confirmados — agregarlos cuando existan,
// para no publicar información falsa o inventada.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'EventVenue', 'LodgingBusiness'],
  '@id': `${SITE_URL}/#negocio`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  // sameAs es lo que le dice a Google que estos perfiles son del mismo
  // negocio. Sin esto, los enlaces del pie de página son sólo enlaces.
  sameAs: [SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, GOOGLE_MAPS_URL],
  telephone: `+${WHATSAPP_RESTAURANTE}`,
  priceRange: '$$',
  currenciesAccepted: 'CLP',
  slogan: 'Ven a disfrutar de una experiencia patagónica única',
  address: {
    '@type': 'PostalAddress',
    addressLocality: ADDRESS_LOCALITY,
    addressRegion: ADDRESS_REGION,
    addressCountry: 'CL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO_LAT,
    longitude: GEO_LNG,
  },
  hasMap: GOOGLE_MAPS_URL,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Restaurante de grupos', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Cafetería', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Asados al palo', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Tenedor libre', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Chicha en bota', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Sauna y sala de masajes', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Cabañas con tinaja', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Centro de eventos', value: true },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cinzel.variable} ${lora.variable} ${yellowtail.variable}`}>
      <head>
        {/* El favicon lo declara `metadata.icons` con el logo corporativo. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
