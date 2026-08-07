'use client';
import { useEffect, useRef, useState } from 'react';

// Fondo en video para una sección. Se usa en el pie y en la franja de reseñas,
// ambas con el mismo archivo (/footer.mp4): la segunda vez sale de la caché del
// navegador, así que no se descarga de nuevo.
//
// La sección que lo reciba tiene que ser `relative` y llevar su color de fondo
// sólido: este componente se apoya en él como respaldo. Si el video no carga
// —datos ahorrados, códec no soportado, autoplay bloqueado— la sección se ve
// exactamente como antes de agregarlo.

type Props = {
  src: string;
  /** Velo que va encima del video: color o degradado CSS. */
  overlay: string;
};

export default function VideoBackground({ src, overlay }: Props) {
  const holderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [montado, setMontado] = useState(false);
  const [listo, setListo] = useState(false);

  // Un solo observador para dos trabajos: montar el <video> recién cuando la
  // sección se acerca —son 2,3 MB que no vale la pena bajar en cada visita— y
  // pausarlo al salir de pantalla, para no dejar dos videos decodificando a la
  // vez en una página que ya tiene marquesinas y carruseles corriendo.
  useEffect(() => {
    const node = holderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMontado(true);

        const v = videoRef.current;
        if (!v) return; // primera pasada: el <video> aún no existe
        if (entry.isIntersecting) {
          // Puede rechazar si el navegador bloquea la reproducción; en ese caso
          // queda el primer fotograma fijo, que es una imagen válida.
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: '400px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={holderRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {montado && (
        <video
          ref={videoRef}
          className={`bg-video ${listo ? 'is-ready' : ''}`}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setListo(true)}
        />
      )}
      <div className="absolute inset-0" style={{ background: overlay }} />
    </div>
  );
}
