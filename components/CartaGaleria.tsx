'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { PiezaGrafica } from '@/lib/carta';

// ─────────────────────────────────────────────────────────────────────────────
// Las piezas gráficas del cliente, con visor a pantalla completa.
//
// Existe porque estos afiches traen el texto y los precios incrustados en la
// imagen: en la grilla se ven como fotos de producto, y quien quiera LEER la
// carta de sushi necesita ampliarla. Ese es todo el trabajo del visor.
//
// No reemplazan a <Carta>, que es la misma información en texto real. Acá el
// valor es que son piezas listas para compartir por WhatsApp o Instagram.
//
// Sobre las proporciones: cada pieza declara la suya (`ratio`) porque el
// conjunto es disparejo —la César es cuadrada, la carta de sushi es 1076×1600
// y el resto ronda 3:4—. En la grilla van con object-cover a proporción
// uniforme para que las tarjetas no queden de alturas distintas; en el visor,
// con object-contain, para que ninguna se recorte y el texto se lea completo.
// ─────────────────────────────────────────────────────────────────────────────

interface CartaGaleriaProps {
  piezas: PiezaGrafica[];
  titulo: string;
  descripcion: string;
}

export default function CartaGaleria({ piezas, titulo, descripcion }: CartaGaleriaProps) {
  useScrollReveal();

  const [abierta, setAbierta] = useState<number | null>(null);
  const hayVisor = abierta !== null;

  const cerrar = useCallback(() => setAbierta(null), []);
  const mover = useCallback(
    (paso: number) =>
      setAbierta((i) => (i === null ? i : (i + paso + piezas.length) % piezas.length)),
    [piezas.length]
  );

  // Teclado: Esc cierra, flechas recorren. Sin esto el visor sería una trampa
  // para quien navega sin mouse.
  useEffect(() => {
    if (!hayVisor) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar();
      if (e.key === 'ArrowRight') mover(1);
      if (e.key === 'ArrowLeft') mover(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hayVisor, cerrar, mover]);

  // Bloquea el scroll del fondo mientras el visor está abierto.
  useEffect(() => {
    if (!hayVisor) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previo; };
  }, [hayVisor]);

  const pieza = abierta === null ? null : piezas[abierta];

  return (
    <section id="piezas" className="relative bg-bg-dark border-t border-cream/[0.06]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="mb-12">
          <p className="reveal text-gold text-[10px] tracking-[0.45em] uppercase mb-4 font-light">
            Para mirar y compartir
          </p>
          <div className="gold-line-short mb-6 reveal delay-100" />
          <h2 className="reveal delay-200 font-serif text-3xl md:text-4xl text-cream font-semibold leading-tight mb-4">
            {titulo}
          </h2>
          <p className="reveal delay-300 text-cream/60 text-sm md:text-base font-light leading-relaxed max-w-2xl">
            {descripcion}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {piezas.map((p, i) => (
            <button
              key={p.src}
              onClick={() => setAbierta(i)}
              aria-label={`Ampliar: ${p.titulo}`}
              className={`reveal delay-${Math.min(i * 100 + 100, 800)} group relative overflow-hidden aspect-[3/4] border border-cream/10 hover:border-gold/45 transition-colors duration-500`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1152px) 252px, (min-width: 1024px) calc((100vw - 144px) / 4), (min-width: 768px) calc((100vw - 112px) / 2), calc((100vw - 60px) / 2)"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />

              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-90"
                style={{
                  background:
                    'linear-gradient(to top, rgba(6,38,54,0.92) 0%, rgba(6,38,54,0.3) 40%, transparent 70%)',
                }}
              />

              <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                <p className="text-cream/90 text-[11px] md:text-xs tracking-[0.15em] uppercase font-light leading-snug">
                  {p.titulo}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-gold/0 group-hover:text-gold text-[10px] tracking-[0.2em] uppercase transition-colors duration-400">
                  Ampliar
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Visor ── */}
      {pieza && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={pieza.titulo}
          className="fixed inset-0 z-[60] flex flex-col animate-fade-in"
          // El fondo va EN LÍNEA y no como utilidad de Tailwind. `bg-ink/92`
          // no llegaba a generarse —el modificador de opacidad sobre un color
          // del config no produjo regla alguna— y el visor quedaba
          // transparente: la carta flotaba sobre la página, ilegible. El resto
          // del sitio pinta todos sus velos así, en línea, por lo mismo.
          //
          // z-[60] queda por encima de la barra superior, que es z-50.
          style={{
            backgroundColor: 'rgba(11, 36, 48, 0.94)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          onClick={cerrar}
        >
          <div className="flex items-center justify-between gap-4 px-5 md:px-8 py-4 flex-shrink-0">
            <p className="text-cream/85 font-serif text-base md:text-lg">{pieza.titulo}</p>
            <div className="flex items-center gap-4">
              <span className="text-cream/40 text-[10px] tracking-[0.25em] uppercase tabular-nums">
                {(abierta ?? 0) + 1} / {piezas.length}
              </span>
              <button
                onClick={cerrar}
                aria-label="Cerrar"
                className="text-cream/60 hover:text-gold transition-colors duration-300 p-1 -m-1"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* El clic en la imagen no debe cerrar: se puede querer arrastrarla
              para leer, y en móvil un toque involuntario cerraría el visor. */}
          <div className="relative flex-1 min-h-0 px-4 pb-4 md:px-8 md:pb-8">
            <Image
              key={pieza.src}
              src={pieza.src}
              alt={pieza.alt}
              fill
              sizes="100vw"
              className="object-contain animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {piezas.length > 1 && (
            <>
              <BotonVisor lado="left" onClick={() => mover(-1)} etiqueta="Anterior" />
              <BotonVisor lado="right" onClick={() => mover(1)} etiqueta="Siguiente" />
            </>
          )}
        </div>
      )}
    </section>
  );
}

function BotonVisor({
  lado,
  onClick,
  etiqueta,
}: {
  lado: 'left' | 'right';
  onClick: () => void;
  etiqueta: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={etiqueta}
      className={`absolute top-1/2 -translate-y-1/2 ${
        lado === 'left' ? 'left-2 md:left-5' : 'right-2 md:right-5'
      } w-11 h-11 flex items-center justify-center border border-cream/20 bg-ink/50 text-cream/70 hover:text-ink hover:bg-gold hover:border-gold transition-all duration-300`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d={lado === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
      </svg>
    </button>
  );
}
