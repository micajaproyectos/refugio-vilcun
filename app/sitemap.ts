import type { MetadataRoute } from 'next';
import { SITE_URL, ROUTES } from '@/lib/site';

// Cada página propia debe estar acá o Google no la va a descubrir sola: el
// sitio no tiene enlaces entrantes que la señalen. Al crear /cafeteria-chaiten
// y /cabanas-chaiten, sumarlas a esta lista junto con su entrada en ROUTES.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      // Prioridad alta pero por debajo de la home: es la página que persigue
      // "restaurante Chaitén", la consulta local de mayor intención.
      url: `${SITE_URL}${ROUTES.restaurante}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
