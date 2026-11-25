/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    // Fotos estables: usar un nombre nuevo cuando se reemplace una imagen.
    minimumCacheTTL: 2678400, // 31 días
  },
};

module.exports = nextConfig;
