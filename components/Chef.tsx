'use client';
import { ROUTES } from '@/lib/site';
import { PLATOS_CARRUSEL } from '@/lib/carta';
import FeatureBand from './FeatureBand';

// NOTA DE CONTENIDO: Karen Medrano es una persona real. El texto se limita a
// lo que el cliente confirmó (que lidera la cocina, gastronomía internacional
// con acento patagónico). No agregar trayectoria, premios, años de experiencia
// ni lugar de formación sin que el cliente los confirme por escrito.
//
// Las fotos del carrusel viven en lib/carta.ts: las comparte con la página
// del restaurante, y duplicadas terminaban desincronizadas.

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
      // Antes este botón decía "Ver la carta" y abría WhatsApp, porque no
      // existía ninguna carta que mostrar. Ahora sí existe y lleva ahí: pedir
      // por chat algo que la web ya publica es un rodeo para el visitante.
      cta={{ label: 'Ver la carta', href: ROUTES.restaurante, external: false }}
      images={PLATOS_CARRUSEL}
      frameAspect="1 / 1"
      imageSide="right"
    />
  );
}
