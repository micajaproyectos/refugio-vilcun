'use client';
import { WA_LINKS } from '@/lib/site';
import FeatureBand, { BandImage } from './FeatureBand';

// NOTA DE CONTENIDO: Karen Medrano es una persona real. El texto se limita a
// lo que el cliente confirmó (que lidera la cocina, gastronomía internacional
// con acento patagónico). No agregar trayectoria, premios, años de experiencia
// ni lugar de formación sin que el cliente los confirme por escrito.

// Los cuatro platos que rota el carrusel, definidos por el cliente.
// Las cuatro son casi cuadradas (0.967 a 1.000), por eso el marco va en 1/1:
// con object-contain ocupan el 98% de la ventana y ninguna se recorta.
const dishes: BandImage[] = [
  {
    src: '/images/restaurante/plato1.png',
    caption: 'Ceviche de salmón',
    alt: 'Dos bowls de ceviche de salmón con pimentones sobre una tabla de madera',
  },
  {
    src: '/images/restaurante/plato2.png',
    caption: 'Pastel de jaiba',
    alt: 'Pastel de jaiba gratinado en paila de greda, con pinzas de jaiba y tostadas',
  },
  {
    src: '/images/restaurante/plato3.png',
    caption: 'Sushi de la casa',
    alt: 'Tabla de sushi variado sobre un tronco, con el bosque nevado de fondo',
  },
  {
    src: '/images/restaurante/plato7.png',
    caption: 'Chupe de mariscos',
    alt: 'Chupe de mariscos en bowl de greda, con limón y pan tostado',
  },
];

export default function Chef() {
  return (
    <FeatureBand
      id="cocina"
      overline="Nuestra cocina"
      titleLead="Cocina internacional con"
      titleAccent="acento patagónico"
      body={
        <p>
          El restaurante lo lidera la chef{' '}
          <strong className="font-medium text-cream">Karen Medrano</strong>, que combina la
          técnica y las referencias de la cocina internacional con el sabor de la Patagonia.
          Esa mezcla es la que define nuestra carta, del tenedor libre a la coctelería de la casa.
        </p>
      }
      signature="Karen Medrano · Chef"
      cta={{ label: 'Ver la carta', href: WA_LINKS.restaurante }}
      images={dishes}
      frameAspect="1 / 1"
      imageSide="right"
    />
  );
}
