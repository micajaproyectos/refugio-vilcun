'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useDragScroll } from '@/hooks/useDragScroll';
import Photo from './Photo';
import Condor from './Condor';

// Sólo fotografías HORIZONTALES de restaurante, cafetería y cabañas.
// Fuera quedan los platos, las verticales y los marcadores de posición.
//
// Al ser todas 1448x1086 (4:3 exacto), el carrusel usa una única proporción y
// ninguna se recorta. Si se agrega una foto, verificar que sea horizontal 4:3
// o habrá que reponer el manejo de proporciones que este componente tenía.
//
// Ojo con las cabañas: cabanas4personas/3.png es un duplicado byte a byte de
// cabana2personas/1.png, por eso sólo aparece una de las dos.
interface GalleryItem {
  label: string;
  src: string;
  alt: string;
}

const items: GalleryItem[] = [
  {
    label: 'Barra del restaurante',
    src: '/images/restaurante/barra_restaurante.png',
    alt: 'Barra del restaurante montada sobre barricas de vino, con copas colgadas del techo',
  },
  {
    label: 'Cafetería Chaitén',
    src: '/images/cafeteria/salon_cafeteria.png',
    alt: 'Salón de la cafetería Chaitén con mesas de madera y mural de café en la pared',
  },
  {
    label: 'Cabañas con tinaja',
    src: '/images/cabanas-tinajas/cabanas4personas/4.png',
    alt: 'Exterior de la cabaña de dos pisos con terraza, rodeada de vegetación',
  },
  {
    label: 'Terraza con tinaja',
    src: '/images/cabanas-tinajas/cabana2personas/1.png',
    alt: 'Terraza de la cabaña con tinaja de madera y quitasol, rodeada de vegetación',
  },
  {
    label: 'Terraza con vista',
    src: '/images/cabanas-tinajas/cabana2personas/3.png',
    alt: 'Terraza de la cabaña con quitasol, mesa de madera y vista a la bahía',
  },
  {
    label: 'Living — cabaña 2 personas',
    src: '/images/cabanas-tinajas/cabana2personas/2.png',
    alt: 'Interior de la cabaña para dos personas, con sofá, barra de madera y cocina',
  },
  {
    label: 'Living — cabaña 4 personas',
    src: '/images/cabanas-tinajas/cabanas4personas/1.png',
    alt: 'Living de la cabaña para cuatro personas, con estufa a leña y muro de piedra',
  },
  {
    label: 'Cocina — cabaña 4 personas',
    src: '/images/cabanas-tinajas/cabanas4personas/2.png',
    alt: 'Cocina equipada y escalera al segundo piso en la cabaña para cuatro personas',
  },
];

export default function Gallery() {
  useScrollReveal();

  const { ref: trackRef, handlers } = useDragScroll<HTMLDivElement>();

  return (
    <section id="galeria" className="relative pt-12 md:pt-16 pb-24 md:pb-36 bg-bg-dark overflow-hidden">
      {/* Cóndor del logo */}
      <div className="condor-drift-slow pointer-events-none absolute top-16 left-[9%] hidden md:block">
        <Condor className="w-7 lg:w-9 text-cream/[0.13]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <p className="reveal text-gold text-[10px] tracking-[0.45em] uppercase mb-5 font-light">
            Conoce el complejo
          </p>
          <div className="gold-line-short mx-auto mb-6 reveal delay-100" />
          <h2 className="reveal delay-200 font-serif text-4xl md:text-5xl lg:text-6xl text-cream font-semibold mb-6">
            Galería de{' '}
            <span className="text-gold script-accent">fotografías</span>
          </h2>
          <p className="reveal delay-300 text-cream/70 text-base font-light max-w-xl mx-auto leading-relaxed">
            Restaurante Santa Bárbara, cafetería Chaitén y las cabañas con tinaja
          </p>
        </div>
      </div>

      <p className="text-center text-cream/55 text-[10px] tracking-[0.3em] uppercase mb-5 reveal delay-400 select-none">
        <span className="md:hidden">← Desliza para explorar →</span>
        <span className="hidden md:inline">← Arrastra para explorar →</span>
      </p>

      <div
        ref={trackRef}
        className="gallery-track flex gap-3 md:gap-4 overflow-x-auto px-6 md:px-12 pb-6"
        style={{ cursor: 'grab' }}
        {...handlers}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="group flex-shrink-0 relative overflow-hidden h-[220px] sm:h-[300px] md:h-[clamp(260px,50vh,520px)]"
            style={{ aspectRatio: '4 / 3' }}
          >
            <Photo
              src={item.src}
              alt={item.alt}
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
              className="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(6,38,54,0.85) 0%, rgba(6,38,54,0.25) 32%, transparent 60%)',
              }}
            />
            <p className="absolute bottom-4 left-4 right-4 text-cream/85 text-[11px] tracking-[0.2em] uppercase font-light select-none">
              {item.label}
            </p>
            <div className="absolute top-4 left-4 text-gold/40 text-[10px] tracking-widest font-light select-none z-[2]">
              {String(i + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-6 md:w-12" />
      </div>
    </section>
  );
}
