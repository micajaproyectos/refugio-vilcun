'use client';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { WA_LINKS } from '@/lib/site';
import Condor from './Condor';

// ─────────────────────────────────────────────────────────────────────────────
// Centro de eventos, en clave informativa: cada fila responde POR QUÉ celebrar
// acá, en vez de enumerar tipos de evento. Los tipos viven en la franja de
// ocasiones del cierre.
//
// Tres filas, todas a pantalla completa:
//   01  fondo completo con el texto encima
//   02  foto a sangre por la IZQUIERDA + texto a la derecha
//   03  fondo completo con el texto encima
//
// 01 y 03 comparten el mismo componente (FullBleedRow) y por eso se ven igual:
// si se toca el velo o el degradado, cambian las dos a la vez. Son las fotos de
// plano abierto —el salón lleno, la bahía—, que partidas a media pantalla se
// recortaban a una franja central y perdían justo lo que el texto describe.
//
// El degradado de la fila partida termina en #062636 opaco, que es el fondo
// de la sección: por eso la foto se disuelve en el texto sin borde visible.
// ─────────────────────────────────────────────────────────────────────────────

interface EventReason {
  num: string;
  tag: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
}

const salon: EventReason = {
  num: '01',
  tag: 'El lugar',
  title: 'Un salón para grupos grandes',
  description:
    'El mismo salón del restaurante Santa Bárbara se prepara para tu celebración, con la cocina del complejo a cargo del servicio. Sin proveedores externos ni coordinaciones entre terceros.',
  image: {
    src: '/images/restaurante/restaurante_horizontal.png',
    alt: 'Salón del restaurante Santa Bárbara lleno de comensales, con ventanales hacia el lago',
  },
};

const entorno: EventReason = {
  num: '03',
  tag: 'El entorno',
  title: 'A pasos de la Playa Santa Bárbara',
  description:
    'Arena oscura, bosque nativo que llega hasta la orilla y el cerro cerrando la bahía. Un lugar para la sesión de fotos, para la caminata de la mañana siguiente o simplemente para cortar el día.',
  image: {
    src: '/images/entorno/playa_santa_barbara.jpeg',
    alt: 'Playa Santa Bárbara al atardecer, con arena oscura, rocas en primer plano y un cerro boscoso cerrando la bahía',
  },
};

const splits: (EventReason & { imageSide: 'left' | 'right' })[] = [
  {
    num: '02',
    tag: 'A fuego lento',
    title: 'Asado Patagónico',
    description:
      'Cordero al palo abierto en cruz frente al fogón, a la vista de los invitados. No es un plato más de la carta: es el centro de la celebración y la espera es parte del rito.',
    image: {
      src: '/images/restaurante/asado_patagonico.png',
      alt: 'Corderos al palo abiertos en cruz frente al fogón de ladrillo, con el asador de boina y faja',
    },
    imageSide: 'left',
  },
];

// Las ocasiones (matrimonios, catering, licenciaturas…) ya no se listan aquí:
// viven en la marquesina que va bajo el hero (components/ActivitiesMarquee).
// Tenerlas en ambos lugares repetía la misma información en una sola página.

// El lado de la foto se resuelve con CSS Grid de dos columnas y `order`, NO
// con posicionamiento absoluto e izquierda/derecha. La versión anterior usaba
// `lg:absolute` + `lg:left-0`/`lg:right-0` y, aunque el CSS y el HTML salían
// correctos, el espejo no se veía en el navegador. Con grid, el lado depende
// del orden de las celdas —algo que no puede quedar a medias— y además cada
// mitad mide exactamente 50%.
function SplitRow({ r }: { r: EventReason & { imageSide: 'left' | 'right' } }) {
  const left = r.imageSide === 'left';

  return (
    <article className="relative w-full overflow-hidden lg:grid lg:grid-cols-2 lg:h-[100dvh] lg:min-h-[620px]">
      {/* Foto: en móvil arriba a lo ancho; en lg ocupa su media pantalla */}
      <div
        className={`relative h-[58vh] min-h-[380px] lg:h-full lg:min-h-0 ${
          left ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <Image
          src={r.image.src}
          alt={r.image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        {/* Degradado vertical en móvil (la foto queda encima del texto) */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(6,38,54,0.18) 0%, rgba(6,38,54,0.35) 55%, rgba(6,38,54,0.9) 88%, #062636 100%)',
          }}
        />
        {/* Degradado horizontal en lg, hacia el lado donde está el texto */}
        <div
          className="hidden lg:block absolute inset-0"
          style={{
            background: `linear-gradient(to ${left ? 'right' : 'left'}, rgba(6,38,54,0.10) 0%, rgba(6,38,54,0.20) 48%, rgba(6,38,54,0.80) 82%, #062636 100%)`,
          }}
        />
      </div>

      {/* Texto sobre el navy de la sección */}
      <div
        className={`relative flex items-center ${left ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <div className="px-6 md:px-14 lg:px-12 xl:px-20 pt-10 pb-14 lg:py-0">
          <div className="reveal flex items-center gap-4 mb-5">
            <span className="text-gold font-mono text-[11px] tracking-[0.3em]">{r.num}</span>
            <div className="h-px w-8 bg-gold/30 flex-shrink-0" />
            <span className="text-cream/70 text-[9px] tracking-[0.35em] uppercase font-light">
              {r.tag}
            </span>
          </div>

          <h3 className="reveal delay-100 font-serif text-cream text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
            {r.title}
          </h3>

          <div className="reveal delay-200 w-16 h-px bg-gold/50 mb-7" />

          <p className="reveal delay-300 text-cream/70 text-base md:text-lg font-light leading-relaxed">
            {r.description}
          </p>
        </div>
      </div>
    </article>
  );
}

// Fila a sangre: la foto ocupa la pantalla completa y el texto va encima,
// abajo a la izquierda. La usan la 01 y la 03 — que se vean idénticas es el
// punto, así que cualquier ajuste de velo, degradado o tipografía se hace acá
// una sola vez y no duplicando el bloque.
function FullBleedRow({ r }: { r: EventReason }) {
  return (
    <article
      className="relative w-full overflow-hidden"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      <Image src={r.image.src} alt={r.image.alt} fill sizes="100vw" className="object-cover" />
      {/* Velo plano que baja el contraste general de la foto */}
      <div className="absolute inset-0" style={{ background: 'rgba(6,38,54,0.34)' }} />
      {/* Degradado desde abajo: es lo que sostiene el texto, por eso el tercio
          superior queda transparente y la foto se ve limpia. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(6,38,54,0.94) 0%, rgba(6,38,54,0.5) 38%, transparent 72%)',
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-14 lg:px-20 pb-16 md:pb-20">
        <div className="max-w-2xl">
          <div className="reveal flex items-center gap-4 mb-6">
            <span className="text-gold font-mono text-[11px] tracking-[0.3em]">{r.num}</span>
            <div className="h-px w-8 bg-gold/30 flex-shrink-0" />
            <span className="text-cream/70 text-[9px] tracking-[0.35em] uppercase font-light">
              {r.tag}
            </span>
          </div>

          <h3 className="reveal delay-100 font-serif text-cream text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight text-shadow-dark">
            {r.title}
          </h3>

          <div className="reveal delay-200 w-16 h-px bg-gold/50 mb-7" />

          <p className="reveal delay-300 text-cream/80 text-base md:text-lg font-light leading-relaxed text-shadow-md">
            {r.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Events() {
  useScrollReveal();

  return (
    <section id="eventos" className="relative bg-bg-dark">
      {/* Cóndor del logo, planeando sobre el encabezado */}
      <div className="condor-drift pointer-events-none absolute top-20 right-[10%] hidden md:block z-[1]">
        <Condor className="w-8 lg:w-10 text-gold/20" flip />
      </div>

      {/* Header */}
      <div className="relative z-[2] max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="reveal text-gold text-[10px] tracking-[0.45em] uppercase mb-5 font-light">
              Centro de eventos
            </p>
            <div className="gold-line-short mb-6 reveal delay-100" />
            <h2 className="reveal delay-200 font-serif text-4xl md:text-5xl lg:text-6xl text-cream font-semibold leading-tight">
              Tu evento en{' '}
              <span className="text-gold script-accent">Refugio del Vilcún</span>
            </h2>
          </div>
          <p className="reveal delay-300 text-cream/65 text-sm font-light max-w-xs leading-relaxed md:text-right">
            Todo en un mismo lugar — comida, alojamiento y entorno
          </p>
        </div>
      </div>

      {/* 01 — fondo a pantalla completa con el texto encima */}
      <FullBleedRow r={salon} />

      {/* 02 — fila partida */}
      {splits.map((r) => (
        <SplitRow key={r.num} r={r} />
      ))}

      {/* 03 — misma fila a sangre que la 01 */}
      <FullBleedRow r={entorno} />

      {/* CTA de cierre — es la única vía de contacto de toda la sección.
          El padding inferior va corto a propósito: la Galería que sigue tiene
          el mismo fondo navy, así que ambos espacios se suman en un solo
          vacío. Si se cambia uno, revisar el otro. */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16 text-center">
        <a
          href={WA_LINKS.eventos}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-gold/50 bg-gold/10 hover:bg-gold text-gold hover:text-ink text-[11px] tracking-[0.25em] uppercase font-medium px-8 py-4 transition-all duration-300"
        >
          Consultar disponibilidad
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
