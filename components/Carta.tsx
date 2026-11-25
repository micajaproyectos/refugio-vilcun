'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { GrupoCarta, ItemCarta, formatearPrecio } from '@/lib/carta';
import Condor from './Condor';

// ─────────────────────────────────────────────────────────────────────────────
// La carta, en texto real.
//
// POR QUÉ NO ES UNA IMAGEN: el cliente entregó la carta como afiche
// (public/images/restaurante/menu_sushi.jpeg) con los precios incrustados en
// el pixel. Servida así sería ilegible en un teléfono —hay que hacer zoom y
// desplazarse—, invisible para Google, muda para un lector de pantalla, y
// cambiar un precio obligaría a rehacer el diseño. Acá va en HTML; el afiche
// se conserva aparte, en <CartaGaleria>, como pieza para compartir.
//
// El grupo se dibuja de dos formas según la FORMA del dato, no según un
// interruptor extra:
//   · items con `detalle` (las tablas de sushi) → tarjeta, porque cada una
//     lleva cuatro líneas de contenido que en una fila no se leerían.
//   · items sin `detalle` → fila con guía de puntos hasta el precio, que es
//     como se lee una carta impresa.
// ─────────────────────────────────────────────────────────────────────────────

interface CartaProps {
  grupos: GrupoCarta[];
  /** Se muestra una sola vez bajo el último grupo. */
  nota?: string;
}

export default function Carta({ grupos, nota }: CartaProps) {
  useScrollReveal();

  return (
    <section id="carta" className="relative bg-bg-dark overflow-hidden">
      <div className="condor-drift-slow pointer-events-none absolute top-20 left-[7%] hidden lg:block">
        <Condor className="w-7 text-cream/[0.12]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="mb-14 md:mb-16">
          <p className="reveal text-gold text-[10px] tracking-[0.45em] uppercase mb-4 font-light">
            Nuestra carta
          </p>
          <div className="gold-line-short mb-6 reveal delay-100" />
          <h2 className="reveal delay-200 font-serif text-3xl md:text-4xl lg:text-5xl text-cream font-semibold leading-tight">
            Lo que servimos en{' '}
            <span className="text-gold script-accent">Santa Bárbara</span>
          </h2>
        </div>

        <div className="space-y-16 md:space-y-20">
          {grupos.map((grupo, gi) => (
            <div key={grupo.id} id={grupo.id} className="scroll-mt-28">
              <div className="flex items-baseline gap-5 mb-3">
                <h3 className="reveal font-serif text-2xl md:text-3xl text-cream font-semibold">
                  {grupo.titulo}
                </h3>
                {/* Filete que acompaña al título hasta el borde del bloque */}
                <div className="reveal delay-100 flex-1 h-px bg-gold/25" />
                <span
                  aria-hidden="true"
                  className="reveal delay-100 text-gold/35 font-serif text-sm tracking-widest select-none"
                >
                  {String(gi + 1).padStart(2, '0')}
                </span>
              </div>

              {grupo.descripcion && (
                <p className="reveal delay-200 text-cream/55 text-sm font-light leading-relaxed max-w-2xl mb-8">
                  {grupo.descripcion}
                </p>
              )}

              <GrupoItems items={grupo.items} />
            </div>
          ))}
        </div>

        {nota && (
          <p className="reveal mt-14 border-t border-cream/10 pt-6 text-cream/40 text-xs font-light leading-relaxed">
            {nota}
          </p>
        )}
      </div>
    </section>
  );
}

/** Elige la disposición según si los items traen detalle en viñetas o no. */
function GrupoItems({ items }: { items: ItemCarta[] }) {
  const conDetalle = items.some((i) => i.detalle?.length);

  if (conDetalle) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {items.map((item, i) => (
          <TarjetaItem key={item.nombre} item={item} indice={i} />
        ))}
      </div>
    );
  }

  return (
    <ul className="divide-y divide-cream/[0.07] border-t border-cream/[0.07]">
      {items.map((item, i) => (
        <FilaItem key={item.nombre} item={item} indice={i} />
      ))}
    </ul>
  );
}

/** Tabla de sushi: nombre + precio arriba, contenido en viñetas debajo. */
function TarjetaItem({ item, indice }: { item: ItemCarta; indice: number }) {
  return (
    <article
      className={`reveal delay-${Math.min(indice * 100 + 100, 800)} group relative border border-cream/10 hover:border-gold/40 bg-cream/[0.02] hover:bg-cream/[0.04] transition-all duration-500 p-6 md:p-7`}
    >
      <div className="flex items-start justify-between gap-4 mb-1">
        <h4 className="font-serif text-cream text-xl md:text-[1.35rem] font-semibold leading-snug group-hover:text-gold transition-colors duration-400">
          {item.nombre}
        </h4>
        {item.precio !== undefined && (
          <span className="flex-shrink-0 font-serif text-gold text-lg md:text-xl font-semibold tabular-nums">
            {formatearPrecio(item.precio)}
          </span>
        )}
      </div>

      {item.formato && (
        <p className="text-cream/45 text-[10px] tracking-[0.25em] uppercase font-light mb-5">
          {item.formato}
        </p>
      )}

      {item.descripcion && (
        <p className="text-cream/65 text-sm font-light leading-relaxed">{item.descripcion}</p>
      )}

      {item.detalle && (
        <ul className="space-y-2.5">
          {item.detalle.map((linea) => (
            <li key={linea} className="flex gap-3 text-cream/65 text-sm font-light leading-relaxed">
              <span aria-hidden="true" className="text-gold/50 flex-shrink-0 mt-[0.35em] w-3 h-px bg-gold/40" />
              {linea}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/** Fila de carta impresa: nombre a la izquierda, precio a la derecha. */
function FilaItem({ item, indice }: { item: ItemCarta; indice: number }) {
  return (
    <li className={`reveal delay-${Math.min(indice * 100 + 100, 800)} group py-5`}>
      <div className="flex items-baseline gap-4">
        <h4 className="font-serif text-cream text-lg md:text-xl font-medium group-hover:text-gold transition-colors duration-400">
          {item.nombre}
        </h4>

        {/* Guía punteada hasta el precio. Decorativa: si el item no tiene
            precio publicado igual separa el nombre del formato. */}
        <span
          aria-hidden="true"
          className="flex-1 border-b border-dotted border-cream/20 translate-y-[-0.2em]"
        />

        {item.formato && (
          <span className="flex-shrink-0 text-cream/40 text-[10px] tracking-[0.2em] uppercase font-light">
            {item.formato}
          </span>
        )}

        {item.precio !== undefined && (
          <span className="flex-shrink-0 font-serif text-gold text-lg font-semibold tabular-nums">
            {formatearPrecio(item.precio)}
          </span>
        )}
      </div>

      {item.descripcion && (
        <p className="mt-2 text-cream/60 text-sm font-light leading-relaxed max-w-2xl">
          {item.descripcion}
        </p>
      )}
    </li>
  );
}
