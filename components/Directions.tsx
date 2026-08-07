'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  GEO_LAT,
  GEO_LNG,
  GOOGLE_MAPS_URL,
  GOOGLE_MAPS_EMBED,
  GOOGLE_MAPS_DIRECTIONS,
  WAZE_DIRECTIONS,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
} from '@/lib/site';

function PinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function RouteIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M9 19h6a4 4 0 000-8H9a4 4 0 010-8h3" />
    </svg>
  );
}

// Datos de referencia de la sección. La distancia y el tiempo desde Chaitén son
// aproximados —salen de las coordenadas de la ficha, no de una medición en
// terreno— por eso van redactados como aproximación y no como dato exacto.
const referencias = [
  {
    label: 'Referencia en ruta',
    value: 'Ruta 7 — Carretera Austral, sector Playa Santa Bárbara, al norte de Chaitén.',
  },
  {
    label: 'Desde Chaitén',
    value: 'Unos 10 km hacia el norte por la Ruta 7 — cerca de 15 minutos en auto.',
  },
  {
    label: 'Coordenadas',
    value: `${GEO_LAT}, ${GEO_LNG}`,
  },
];

export default function Directions() {
  useScrollReveal();

  return (
    <section id="como-llegar" className="py-24 md:py-32 bg-bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14 md:mb-16">
          <p className="reveal text-gold text-[10px] tracking-[0.45em] uppercase mb-5 font-light">
            Cómo llegar
          </p>
          <div className="gold-line-short mb-7 reveal delay-100" />
          <h2
            className="reveal delay-200 font-serif text-ink font-semibold leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            Estamos en la <span className="text-gold script-accent">Carretera Austral</span>
          </h2>
          <p className="reveal delay-300 text-ink/50 text-base font-light max-w-xl leading-relaxed">
            {ADDRESS_LOCALITY}, {ADDRESS_REGION}. Abre el mapa y te llevamos hasta la
            puerta del refugio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          {/* Mapa — el iframe de Google trae su propio fondo blanco, por eso el
              marco dorado va por fuera y no como borde del propio mapa. */}
          <div className="reveal-left lg:col-span-3">
            <div className="border border-gold/25 p-1.5 bg-bg-light">
              <iframe
                src={GOOGLE_MAPS_EMBED}
                title="Mapa de ubicación de Refugio del Vilcún"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="w-full h-[280px] md:h-[360px] block border-0"
              />
            </div>
            <p className="text-ink/30 text-[10px] font-light mt-3 tracking-wide">
              Mapa de Google — arrastra para explorar la zona.
            </p>
          </div>

          {/* Referencias + acciones */}
          <div className="reveal-right lg:col-span-2">
            <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-8 font-light">
              Referencias del camino
            </p>

            <div className="space-y-6 mb-10">
              {referencias.map((item) => (
                <div key={item.label} className="border-t border-ink/[0.08] pt-5">
                  <p className="text-ink/35 text-[10px] tracking-widest uppercase mb-2 font-light">
                    {item.label}
                  </p>
                  <p className="text-ink/60 text-sm font-light leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={GOOGLE_MAPS_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-center"
              >
                {/* `.btn-gold` fija `display:inline-block` y gana por orden en
                    la hoja, así que el flex para alinear ícono y texto va en un
                    span interior en lugar de en el propio botón. */}
                <span className="inline-flex items-center justify-center gap-2">
                  <RouteIcon />
                  Cómo llegar en Google Maps
                </span>
              </a>
              <a
                href={WAZE_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-lake/25 hover:border-lake bg-lake/[0.03] hover:bg-lake/[0.06] text-ink/70 hover:text-ink transition-all duration-300 px-6 py-3 text-xs tracking-[0.2em] uppercase font-light"
              >
                <RouteIcon />
                Navegar con Waze
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-ink/40 hover:text-gold transition-colors duration-300 px-6 py-2 text-xs tracking-[0.2em] uppercase font-light"
              >
                <PinIcon />
                Ver ficha en Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
