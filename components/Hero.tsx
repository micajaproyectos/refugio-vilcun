'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { WA_LINKS } from '@/lib/site';

// Fondo: toma cenital de dron del complejo (public/images/hero/hero.webp),
// con el paneo suave .hero-kb ya definido en globals.css. Cuando lleguen más
// fotos de portada, esto puede pasar a un slider usando las clases .kb-1…kb-6
// y .slider-dot, que también están listas en globals.css.

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setTimeout(() => setLoaded(true), 150));
  }, []);

  const scrollToRestaurante = () =>
    document.querySelector('#restaurante')?.scrollIntoView({ behavior: 'smooth' });

  // `hero-shell` fija la altura. El min-height va en CSS y no acá porque solo
  // debe aplicar desde tablet: en un teléfono corto —o cualquiera en
  // horizontal— un mínimo de 640px deja la sección más alta que la pantalla y,
  // como el contenido va anclado abajo, los CTA caen fuera de cuadro.
  return (
    <section id="inicio" className="hero-shell sticky top-0 z-0">
      {/* ── Fondo ── */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero/hero.webp"
          alt="Vista aérea del complejo Refugio del Vilcún, con el restaurante, las cabañas y el entorno boscoso"
          fill
          priority
          sizes="100vw"
          className="hero-kb hero-img object-cover"
        />
        {/* Tinte parejo — la toma aérea tiene mucho verde claro y sin él
            el texto crema del hero pierde contraste. */}
        <div className="absolute inset-0 z-10" style={{ background: 'rgba(6, 38, 54, 0.32)' }} />
        {/* Refuerzo inferior: el titular y los CTA van anclados abajo. */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to top, rgba(6,38,54,0.88) 0%, rgba(6,38,54,0.45) 38%, transparent 68%)',
          }}
        />
      </div>

      {/* ── Lateral details (desktop) ── */}
      <div
        className={`absolute left-6 top-1/2 hidden xl:flex items-center gap-3 transition-all duration-1000 delay-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ writingMode: 'vertical-lr', transform: 'translateY(-50%) rotate(180deg)' }}
      >
        <span className="text-cream/20 text-[9px] tracking-[0.4em] uppercase font-light">
          Restaurante · Cafetería · Cabañas · Eventos
        </span>
        <div className="w-px h-10 bg-gold/15" />
      </div>

      <div
        className={`absolute right-6 top-1/2 hidden xl:flex items-center gap-3 transition-all duration-1000 delay-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ writingMode: 'vertical-lr' }}
      >
        <div className="w-px h-10 bg-gold/15" />
        <span className="text-cream/20 text-[9px] tracking-[0.4em] font-mono">Chaitén · Chile</span>
      </div>

      {/* ── Main content — anchored bottom-left ── */}
      <div className="hero-content absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-14 lg:px-20 pb-16 md:pb-20">

        {/* Overline */}
        <p
          className={`hero-overline text-gold text-[9px] sm:text-[11px] tracking-[0.5em] uppercase font-medium text-shadow-dark mb-4 sm:mb-5 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          Chaitén &nbsp;·&nbsp; Carretera Austral &nbsp;·&nbsp; Patagonia Chilena
        </p>

        {/* Title */}
        <h1 className="font-serif leading-[0.88] mb-6 md:mb-8 text-shadow-dark">
          <span
            className={`hero-title-a block text-cream font-semibold tracking-tight transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ fontSize: 'clamp(3.2rem, 10vw, 10.5rem)', transitionDelay: '350ms' }}
          >
            Refugio
          </span>
          <span
            className={`hero-title-b block tracking-tight transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ fontSize: 'clamp(2.8rem, 8.5vw, 9rem)', transitionDelay: '500ms' }}
          >
            {/* "del" va en versalitas por CSS y no escrito "DEL": así el
                lector de pantalla lo lee como palabra y no deletrea D-E-L.
                Hereda Cinzel del <h1>, igual que "Refugio". */}
            <span className="text-cream font-semibold uppercase">del</span>{' '}
            <span className="text-gold script-accent">Vilcún</span>
          </span>
        </h1>

        {/* Rule + Subtitle */}
        <div
          className={`hero-sub flex items-start gap-3 sm:gap-5 mb-6 sm:mb-7 md:mb-9 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '650ms' }}
        >
          {/* El filete se acorta en teléfonos: a 56px + gap de 20px se comía
              casi un cuarto del ancho útil y dejaba el subtítulo muy angosto. */}
          <div className="w-8 sm:w-14 h-px bg-gold/60 mt-[0.7rem] sm:mt-[0.85rem] flex-shrink-0" />
          <div className="min-w-0">
            <p className="script-accent text-cream text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] leading-snug text-shadow-dark">
              Ven a disfrutar de una experiencia patagónica única,
            </p>
            <p className="hero-badge inline-block mt-3 bg-ink/50 backdrop-blur-sm border-l-[2px] border-gold/70 text-gold text-[9px] md:text-[11px] tracking-[0.35em] uppercase font-light px-2.5 sm:px-3 py-1.5">
              Restaurante · Cafetería · Cabañas · Eventos
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <button
            onClick={scrollToRestaurante}
            className="hero-cta sweep-cta text-xs md:text-sm px-6 sm:px-8 md:px-14 py-5"
            style={{ letterSpacing: '0.18em' }}
          >
            {/* La etiqueta va duplicada: una copia sale hacia arriba y la otra
                entra desde abajo. La segunda es puro efecto visual, así que va
                oculta al lector de pantalla para que no la anuncie dos veces. */}
            <span className="sweep-cta-label">
              <span>Conocer el restaurante</span>
              <span aria-hidden="true">Conocer el restaurante</span>
            </span>
          </button>
          <a
            href={WA_LINKS.restaurante}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta corner-cta gap-2.5 sm:gap-3 text-cream hover:text-gold-light px-6 sm:px-8 md:px-12 py-5 text-xs md:text-sm"
            style={{ letterSpacing: '0.18em' }}
          >
            {/* Monocromo a propósito: el verde de marca de WhatsApp es el único
                color ajeno a la paleta del logo y desentonaba en el hero. */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Reservar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
