import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Restaurante, Cafetería y Complejo Turístico`,
    short_name: 'Refugio del Vilcún',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#062636',
    theme_color: '#062636',
    lang: 'es-CL',
    icons: [
      {
        src: '/logo/logo-badge.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
