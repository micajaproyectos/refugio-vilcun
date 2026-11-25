'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/lib/site';
import Condor from './Condor';

// ─────────────────────────────────────────────────────────────────────────────
// Encabezado de subpágina. Deliberadamente NO es el <Hero> de la home:
//
//  · No es sticky. El hero de la home lo es, y todo lo que viene después se
//    desliza encima con `relative z-10`. Ese apilamiento es frágil y no aporta
//    nada acá, donde el visitante viene a leer una carta, no a ser recibido.
//  · No ocupa 100dvh. Quien llega desde Google buscando "restaurante Chaitén"
//    quiere ver la carta, y una portada a pantalla completa lo obliga a
//    scrollear antes de encontrar nada. 70vh deja el primer bloque de
//    contenido asomando bajo el pliegue, que es lo que invita a seguir.
//
// La miga de pan no es decorativa: orienta a quien entró directo desde un
// buscador —que no pasó por la home y no sabe dónde está parado— y alimenta
// el JSON-LD `BreadcrumbList` que arma cada página.
// ─────────────────────────────────────────────────────────────────────────────

interface SubpageHeroProps {
  overline: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  /** Rótulo de la página actual en la miga de pan. */
  breadcrumb: string;
  image: { src: string; alt: string };
  /** Encuadre de la foto, p. ej. 'center 40%'. */
  imagePosition?: string;
  cta?: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string };
}

export default function SubpageHero({
  overline,
  titleLead,
  titleAccent,
  description,
  breadcrumb,
  image,
  imagePosition = 'center',
  cta,
  secondaryCta,
}: SubpageHeroProps) {
  // La entrada corre al montar y no por IntersectionObserver: el bloque ya
  // está en pantalla cuando carga la página, así que un observador lo daría
  // por visible de inmediato y la animación se vería como un salto.
  const [entrado, setEntrado] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntrado(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Base común de la entrada. El escalonado lo pone cada elemento con su
  // propia clase `delay-*`, igual que en el resto del sitio.
  const paso = `transition-all duration-[900ms] ease-out ${
    entrado ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
  }`;

  return (
    <header className="relative bg-bg-dark overflow-hidden">
      <div className="relative min-h-[70vh] md:min-h-[78vh] flex items-end">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />

        {/* Velo: más cargado abajo, donde vive el texto, y con una capa plana
            arriba que sostiene la legibilidad de la barra superior mientras
            todavía es transparente. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #062636 4%, rgba(6,38,54,0.9) 32%, rgba(6,38,54,0.55) 62%, rgba(6,38,54,0.62) 100%)',
          }}
        />

        <div className="condor-drift pointer-events-none absolute top-28 right-[10%] hidden md:block z-[2]">
          <Condor className="w-8 lg:w-10 text-gold/25" />
        </div>
        <div className="condor-drift-slow pointer-events-none absolute top-44 right-[20%] hidden lg:block z-[2]">
          <Condor className="w-5 text-gold/15" flip />
        </div>

        {/* pt generoso: la barra fija mide ~88px y el sello sobresale. */}
        <div className="relative z-[3] w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-14 md:pt-40 md:pb-20">
          {/* Miga de pan */}
          <nav aria-label="Ruta de navegación" className={`${paso} mb-7`}>
            <ol className="flex items-center gap-2.5 text-[10px] tracking-[0.25em] uppercase font-light">
              <li>
                <Link href={ROUTES.home} className="text-cream/50 hover:text-gold transition-colors duration-300">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true" className="text-cream/25">/</li>
              <li className="text-gold/85">{breadcrumb}</li>
            </ol>
          </nav>

          <p className={`${paso} delay-100 text-gold text-[10px] tracking-[0.45em] uppercase mb-4 font-light`}>
            {overline}
          </p>
          <div className={`${paso} delay-150 gold-line-short mb-6`} />

          <h1
            className={`${paso} delay-200 font-serif text-4xl md:text-5xl lg:text-6xl text-cream font-semibold leading-tight max-w-3xl text-shadow-crisp`}
          >
            {titleLead} <span className="text-gold script-accent">{titleAccent}</span>
          </h1>

          <p
            className={`${paso} delay-300 mt-6 text-cream/75 text-base md:text-lg font-light leading-relaxed max-w-2xl`}
          >
            {description}
          </p>

          {(cta || secondaryCta) && (
            <div className={`${paso} delay-500 mt-9 flex flex-wrap items-center gap-4`}>
              {cta && (
                <a
                  href={cta.href}
                  {...(cta.external !== false
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-ink text-[11px] tracking-[0.25em] uppercase font-medium px-7 py-4 transition-colors duration-300"
                >
                  {cta.label}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-3 border border-gold/50 bg-ink/30 backdrop-blur-sm hover:bg-gold hover:text-ink text-gold text-[11px] tracking-[0.25em] uppercase font-medium px-7 py-4 transition-all duration-300"
                >
                  {secondaryCta.label}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M12 5v14M6 13l6 6 6-6" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
