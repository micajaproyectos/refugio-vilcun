'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Condor from './Condor';

// Cierre de subpágina: la última oportunidad de convertir antes del pie.
// Va sobre crema y no sobre navy a propósito — después de dos secciones
// oscuras seguidas (carta + piezas), otra más las funde en un solo bloque
// y el cierre deja de leerse como cierre.

interface Punto {
  titulo: string;
  detalle: string;
}

interface CierreCtaProps {
  overline: string;
  titleLead: string;
  titleAccent: string;
  descripcion: string;
  puntos?: Punto[];
  cta: { label: string; href: string };
  telefono?: { label: string; href: string };
}

export default function CierreCta({
  overline,
  titleLead,
  titleAccent,
  descripcion,
  puntos,
  cta,
  telefono,
}: CierreCtaProps) {
  useScrollReveal();

  return (
    <section className="relative bg-bg-card overflow-hidden">
      <div className="condor-drift pointer-events-none absolute top-12 right-[9%] hidden md:block">
        <Condor className="w-7 lg:w-9 text-lake/15" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
        <p className="reveal text-lake text-[10px] tracking-[0.45em] uppercase mb-4 font-light">
          {overline}
        </p>
        <div className="lake-line-short mx-auto mb-6 reveal delay-100" />

        <h2 className="reveal delay-200 font-serif text-3xl md:text-4xl lg:text-5xl text-ink font-semibold leading-tight mb-6">
          {titleLead} <span className="text-lake script-accent">{titleAccent}</span>
        </h2>

        <p className="reveal delay-300 text-ink/65 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          {descripcion}
        </p>

        {puntos && (
          <div className="reveal delay-400 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 text-left">
            {/* El borde va en /10 y no en /12: el modificador de opacidad de
                Tailwind sólo genera regla para los valores de su escala
                —múltiplos de 5—. Con /12 no se emitía ninguna y el borde caía
                al gris por defecto de preflight, que no es el de la paleta. */}
            {puntos.map((p) => (
              <div key={p.titulo} className="border-t border-ink/10 pt-5">
                <p className="text-lake text-[10px] tracking-[0.25em] uppercase font-medium mb-2.5">
                  {p.titulo}
                </p>
                <p className="text-ink/60 text-sm font-light leading-relaxed">{p.detalle}</p>
              </div>
            ))}
          </div>
        )}

        <div className="reveal delay-500 mt-12 flex flex-wrap items-center justify-center gap-4">
          {/* La flecha va dentro de un <span> con el flex, NO en el <a>.
              `.btn-lake-filled` se define en globals.css FUERA de toda @layer,
              así que gana en la cascada a cualquier utilidad de Tailwind:
              ponerle `inline-flex` al ancla no sobrescribe su `inline-block`
              y la flecha caía a una segunda línea. Envolviendo el contenido,
              el ancla conserva su clase y el span resuelve la alineación. */}
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lake-filled"
          >
            <span className="inline-flex items-center gap-3">
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>

          {telefono && (
            <a href={telefono.href} className="btn-lake">
              {telefono.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
