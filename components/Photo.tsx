// Foto real del complejo. Contraparte de <Placeholder>: se usa en los mismos
// contenedores (position: relative + overflow-hidden), por eso va con `fill`.

import Image from 'next/image';

interface PhotoProps {
  src: string;
  alt: string;
  /** Ancho estimado que ocupa la foto en pantalla — ayuda a next/image a servir el tamaño justo. */
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export default function Photo({
  src,
  alt,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  className = '',
}: PhotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
