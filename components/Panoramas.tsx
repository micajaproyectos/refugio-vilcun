'use client';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { WA_LINKS } from '@/lib/site';
import Condor from './Condor';

// ─────────────────────────────────────────────────────────────────────────────
// Los tres panoramas fuertes, inmediatamente después del hero.
//
// Tarjetas verticales a tres columnas con la foto de fondo ocupando el
// contenedor completo y el contenido encima. Van apareciendo escalonadas al
// scrollear (.reveal + .delay-*).
//
// Sobre el texto: al ir sobre la foto, el contenido tiene que ser breve o se
// come la imagen. Por eso las descripciones son de una línea y los tres
// atributos van en una sola fila separados por puntos, en vez de la lista
// vertical que había cuando el texto vivía debajo de la foto.
//
// Sobre el alto — NO fijar altura en vh ni poner min-height. El contenedor
// usa `aspect-[3/4]`, que es el ratio nativo exacto de las tres fotos
// (1086×1448 = 0.75). Al coincidir contenedor e imagen, object-cover no
// recorta nada y las fotos se ven completas en toda su extensión vertical.
// Cualquier alto fijo rompe esa coincidencia y vuelve a recortar por los
// lados. Si se reemplaza alguna foto, debe ser también 3:4.
//
// Los tres atributos del Restaurante son los que antes vivían en el componente
// Highlights: eran rasgos del restaurante, no del complejo.
// ─────────────────────────────────────────────────────────────────────────────

interface Panorama {
  num: string;
  tag: string;
  name: string;
  description: string;
  features: string[];
  cta: string;
  wa: string;
  image: { src: string; alt: string };
}

const panoramas: Panorama[] = [
  {
    num: '01',
    tag: 'Restaurante de grupos',
    name: 'Restaurante Santa Bárbara',
    description: 'El corazón del complejo: cocina patagónica para disfrutar en grupo.',
    features: ['Asados al palo', 'Chicha en bota', 'Tenedor libre'],
    cta: 'Reservar mesa',
    wa: WA_LINKS.restaurante,
    image: {
      src: '/images/restaurante/plato5.png',
      alt: 'Tabla de picoteo con sushi, quesos, empanaditas y un cóctel de la casa, frente a la chimenea encendida',
    },
  },
  {
    num: '02',
    tag: 'Cafetería',
    name: 'Waflería Chaitén',
    description: 'Un espacio íntimo para el café, la once o una pausa junto a la naturaleza.',
    features: ['Café y repostería', 'Ambiente tranquilo', 'Parejas y familias'],
    cta: 'Consultar cafetería',
    wa: WA_LINKS.cafeteria,
    image: {
      src: '/images/cafeteria/cafeteria_2plano.png',
      alt: 'Barra de la cafetería Chaitén con el letrero COFFEE y la vitrina de repostería',
    },
  },
  {
    num: '03',
    tag: 'Alojamiento',
    name: 'Cabañas con Tinaja',
    description: 'Tinaja privada y terraza propia, a pasos del restaurante.',
    features: ['Tinaja privada', 'Para 2 o 4 personas', 'Totalmente equipadas'],
    cta: 'Ver disponibilidad',
    wa: WA_LINKS.cabanas,
    image: {
      src: '/images/cabanas-tinajas/cabana2personas/5.png',
      alt: 'Terraza de la cabaña con tinaja de madera, reposeras y mesa con quitasol, frente al bosque',
    },
  },
];

export default function Panoramas() {
  useScrollReveal();

  return (
    <section id="restaurante" className="relative bg-bg-dark overflow-hidden">
      {/* Cóndores del logo, planeando sobre el encabezado */}
      <div className="condor-drift pointer-events-none absolute top-10 right-[8%] hidden md:block">
        <Condor className="w-7 lg:w-9 text-gold/25" />
      </div>
      <div className="condor-drift-slow pointer-events-none absolute top-24 right-[18%] hidden lg:block">
        <Condor className="w-5 text-gold/15" flip />
      </div>

      {/* Único bloque con márgenes: el texto del encabezado no puede tocar el
          borde del viewport. La banda de tarjetas de abajo sí va a sangre. */}
      <div className="relative px-6 md:px-14 lg:px-20 pt-14 md:pt-20 pb-7 md:pb-9">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="reveal text-gold text-[10px] tracking-[0.45em] uppercase mb-3.5 font-light">
              Lo que te espera
            </p>
            <div className="gold-line-short mb-4 reveal delay-100" />
            <h2 className="reveal delay-200 font-serif text-3xl md:text-4xl lg:text-5xl text-cream font-semibold leading-tight">
              Tres formas de <span className="text-gold script-accent">disfrutarlo</span>
            </h2>
          </div>
          <p className="reveal delay-300 text-cream/55 text-sm font-light max-w-xs leading-relaxed md:text-right pb-1">
            Reserva directo por WhatsApp — sin intermediarios
          </p>
        </div>
      </div>

      {/* Banda a sangre: sin contenedor que la acote, sin padding lateral y
          sin separación entre tarjetas. Las tres fotos se tocan entre sí y
          llegan hasta ambos bordes del viewport y hasta la sección siguiente.
          Sin escalón de 2 columnas: con tres tarjetas ese corte deja la
          tercera sola en una fila. */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
          {panoramas.map((p, i) => (
            <article
              key={p.num}
              className={`reveal delay-${i * 150 + 100} group relative overflow-hidden aspect-[3/4]`}
            >
              {/* Foto de fondo, a sangre en todo el contenedor */}
              <Image
                src={p.image.src}
                alt={p.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.08]"
              />

              {/* Velo base: sostiene la legibilidad sin apagar la foto.
                  Arranca en navy opaco (no 0.95) para que el borde inferior
                  de las tres tarjetas funda en el mismo tono y la banda se
                  lea como una pieza continua. */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, #062636 0%, rgba(6,38,54,0.78) 28%, rgba(6,38,54,0.24) 58%, rgba(6,38,54,0.04) 100%)',
                }}
              />

              {/* Degradado del borde superior: disuelve el filo de la foto
                  contra el fondo navy de la sección, arriba y abajo, para que
                  las tres tarjetas no se lean como tres bloques pegados. */}
              <div
                className="absolute inset-x-0 top-0 h-[26%]"
                style={{
                  background:
                    'linear-gradient(to bottom, #062636 0%, rgba(6,38,54,0.65) 32%, rgba(6,38,54,0.2) 65%, transparent 100%)',
                }}
              />
              {/* Segunda capa que sólo entra en hover: la tarjeta se asienta */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    'linear-gradient(to top, rgba(6,38,54,0.96) 10%, rgba(6,38,54,0.55) 55%, transparent 100%)',
                }}
              />

              {/* Filo dorado que crece desde el borde inferior */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gold group-hover:w-full transition-all duration-700 ease-out z-[3]" />

              {/* ── Canal divisorio entre tarjetas ──
                  Los contenedores NO cambian de tamaño: el aire se PINTA
                  dentro de la foto. Cada tarjeta aporta 8px de navy en su
                  borde interno, así el canal completo mide 16px, y el filete
                  dorado va en la costura — es decir, justo al centro.
                  Solo en bordes internos: la primera no lleva canal izquierdo
                  ni la última canal derecho, para que la banda siga llegando
                  limpia a ambos extremos del viewport. */}
              {i < panoramas.length - 1 && (
                <>
                  <div
                    className="hidden lg:block absolute inset-y-0 right-0 w-2 bg-bg-dark z-[4] pointer-events-none"
                    aria-hidden="true"
                  />
                  {/* Filete opaco y de borde a borde. NO devolverle opacidad
                      parcial ni desvanecido en los extremos: así estuvo, y
                      sobre el navy de las tarjetas resultaba invisible. Las
                      tarjetas ya vienen veladas en navy en el 84% de su
                      altura, de modo que sólo un trazo sólido se lee. */}
                  <div
                    className="hidden lg:block absolute inset-y-0 right-0 w-px bg-gold z-[5] pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="lg:hidden absolute inset-x-0 bottom-0 h-2 bg-bg-dark z-[4] pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="lg:hidden absolute inset-x-0 bottom-0 h-px bg-gold z-[5] pointer-events-none"
                    aria-hidden="true"
                  />
                </>
              )}

              {/* Contraparte del canal: la mitad que aporta la tarjeta siguiente */}
              {i > 0 && (
                <>
                  <div
                    className="hidden lg:block absolute inset-y-0 left-0 w-2 bg-bg-dark z-[4] pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="lg:hidden absolute inset-x-0 top-0 h-2 bg-bg-dark z-[4] pointer-events-none"
                    aria-hidden="true"
                  />
                </>
              )}

              <span
                aria-hidden="true"
                className="panorama-number absolute top-4 right-7 md:right-9 lg:right-8 xl:right-10 z-[2] transition-opacity duration-700 group-hover:opacity-60"
              >
                {p.num}
              </span>

              {/* Contenido encima de la foto */}
              <div className="absolute inset-x-0 bottom-0 z-[2] p-7 md:p-9 lg:p-8 xl:p-10 transition-transform duration-700 ease-out group-hover:-translate-y-1.5">
                <span className="inline-block text-gold text-[10px] tracking-[0.2em] uppercase font-medium border border-gold/40 bg-ink/40 backdrop-blur-sm px-3 py-1.5 mb-4">
                  {p.tag}
                </span>

                <h3 className="font-serif text-cream text-2xl lg:text-[1.75rem] font-semibold leading-snug mb-4 text-shadow-md group-hover:text-gold transition-colors duration-500">
                  {p.name}
                </h3>

                <div className="w-10 h-px bg-gold/50 mb-4 group-hover:w-20 transition-all duration-700" />

                <p className="text-cream/75 text-sm font-light leading-relaxed mb-4">
                  {p.description}
                </p>

                {/* Atributos en una sola fila: la lista vertical no cabe
                    sin tapar la foto entera. */}
                <p className="text-cream/55 text-[11px] font-light tracking-wide leading-relaxed mb-6">
                  {p.features.join(' · ')}
                </p>

                <a
                  href={p.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 border border-gold/50 bg-ink/30 backdrop-blur-sm group-hover:bg-gold group-hover:border-gold text-gold group-hover:text-ink text-[11px] tracking-[0.25em] uppercase font-medium px-5 py-3.5 transition-all duration-500"
                >
                  {p.cta}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
