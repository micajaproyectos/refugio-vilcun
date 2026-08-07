'use client';
import { useState, useEffect, useCallback, ReactNode } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// ─────────────────────────────────────────────────────────────────────────────
// Banda horizontal de altura contenida: texto a un lado, carrusel de fotos
// encuadrado al otro. Es el patrón que usan "Nuestra cocina" y "Sauna & Spa".
//
// Sobre el marco: las fotos van con object-contain, nunca cover, para que
// ninguna se recorte. Por eso `frameAspect` debe elegirse según el conjunto
// de fotos que recibe cada banda — es la proporción que menos aire deja
// alrededor. Hoy: platos ≈ 1/1 (98% ocupado), spa ≈ 2/3 (96%).
//
// Sobre el avance automático: NO condicionarlo a `prefers-reduced-motion`.
// Ese chequeo estuvo aquí y dejaba el carrusel congelado sin ningún aviso en
// equipos con los efectos de animación desactivados. La accesibilidad se
// cubre con el botón de pausa, que además es lo que pide el criterio WCAG
// 2.2.2 — pausar al pasar el cursor no sirve con teclado ni en el teléfono.
// ─────────────────────────────────────────────────────────────────────────────

export interface BandImage {
  src: string;
  alt: string;
  /** Rótulo sobre la foto. Omitir si la imagen ya trae texto incrustado. */
  caption?: string;
}

interface FeatureBandProps {
  id: string;
  overline: string;
  titleLead: string;
  titleAccent: string;
  body: ReactNode;
  signature?: string;
  cta?: { label: string; href: string };
  images: BandImage[];
  /** Proporción del marco, p.ej. '1 / 1' o '2 / 3'. Ver nota de arriba. */
  frameAspect: string;
  imageSide?: 'left' | 'right';
  intervalMs?: number;
}

export default function FeatureBand({
  id,
  overline,
  titleLead,
  titleAccent,
  body,
  signature,
  cta,
  images,
  frameAspect,
  imageSide = 'right',
  intervalMs = 2000,
}: FeatureBandProps) {
  useScrollReveal();

  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [stopped, setStopped] = useState(false);

  const paused = hovering || stopped;
  const single = images.length < 2;

  const goTo = useCallback(
    (i: number) => setActive(((i % images.length) + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (paused || single) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [paused, single, images.length, intervalMs]);

  const imageFirst = imageSide === 'left';

  return (
    <section id={id} className="bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Texto */}
          <div className={`lg:col-span-7 ${imageFirst ? 'lg:order-2' : ''}`}>
            <p className="reveal text-gold text-[10px] tracking-[0.45em] uppercase mb-4 font-light">
              {overline}
            </p>
            <div className="gold-line-short mb-5 reveal delay-100" />

            <h2 className="reveal delay-200 font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-cream font-semibold leading-tight mb-6">
              {titleLead} <span className="text-gold script-accent">{titleAccent}</span>
            </h2>

            <div className="reveal delay-300 text-cream/65 text-base md:text-lg font-light leading-relaxed mb-7 max-w-xl">
              {body}
            </div>

            {signature && (
              <div className="reveal delay-400 flex items-center gap-5 mb-8">
                <div className="w-12 h-px bg-gold/50 flex-shrink-0" />
                <p className="text-cream/50 text-[11px] tracking-[0.25em] uppercase font-light">
                  {signature}
                </p>
              </div>
            )}

            {cta && (
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal delay-500 inline-flex items-center gap-3 border border-gold/50 bg-gold/10 hover:bg-gold text-gold hover:text-ink text-[11px] tracking-[0.25em] uppercase font-medium px-7 py-3.5 transition-all duration-300"
              >
                {cta.label}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            )}
          </div>

          {/* Carrusel encuadrado */}
          <div className={`lg:col-span-5 reveal delay-200 ${imageFirst ? 'lg:order-1' : ''}`}>
            <div className="relative">
              {/* Marco dorado desplazado */}
              <div
                className={`absolute inset-0 border border-gold/45 pointer-events-none ${
                  imageFirst
                    ? '-translate-x-4 translate-y-4 md:-translate-x-5 md:translate-y-5'
                    : 'translate-x-4 translate-y-4 md:translate-x-5 md:translate-y-5'
                }`}
                aria-hidden="true"
              />

              <div
                className="relative overflow-hidden bg-bg-dark"
                style={{ aspectRatio: frameAspect }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                aria-roledescription={single ? undefined : 'carrusel'}
                aria-label={single ? undefined : `Fotos de ${overline}`}
              >
                {/* El paspartú hace que el aire alrededor de la foto se lea
                    como montaje y no como error de encuadre. */}
                {images.map((img, i) => (
                  <div
                    key={img.src}
                    className={`absolute inset-0 p-4 md:p-5 transition-opacity duration-700 ease-out ${
                      i === active ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={i !== active}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-contain"
                    />
                  </div>
                ))}

                {!single && (
                  <>
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(6,38,54,0.92) 0%, rgba(6,38,54,0.45) 45%, transparent 100%)',
                      }}
                    />

                    <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-4">
                      {images[active].caption ? (
                        <p
                          key={images[active].caption}
                          className="font-serif text-cream text-lg md:text-xl font-medium leading-snug animate-fade-in"
                        >
                          {images[active].caption}
                        </p>
                      ) : (
                        <span />
                      )}

                      <div className="flex items-center gap-3 flex-shrink-0 pb-1">
                        <div className="flex items-center gap-1.5">
                          {images.map((img, i) => (
                            <button
                              key={img.src}
                              onClick={() => goTo(i)}
                              aria-label={`Ver foto ${i + 1} de ${images.length}`}
                              aria-current={i === active}
                              className={`h-[3px] transition-all duration-500 ${
                                i === active ? 'w-6 bg-gold' : 'w-2.5 bg-cream/35 hover:bg-cream/60'
                              }`}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => setStopped((v) => !v)}
                          aria-label={stopped ? 'Reanudar el carrusel' : 'Pausar el carrusel'}
                          className="text-cream/50 hover:text-gold transition-colors duration-300 p-1 -m-1"
                        >
                          {stopped ? (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M7 4l13 8-13 8z" />
                            </svg>
                          ) : (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <rect x="6" y="4" width="4" height="16" />
                              <rect x="14" y="4" width="4" height="16" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
