'use client';
import { useEffect, useCallback, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useDragScroll } from '@/hooks/useDragScroll';
import VideoBackground from './VideoBackground';

// ─────────────────────────────────────────────────────────────────────────────
// Reseñas reales de Google, en fila horizontal compacta.
//
// OJO CON `estrellas` — vienen CONFIRMADAS seis: Renato Casas, Lorena Mariel
// Perez, Federico Neuman, Lisette Lepe, silvana gomez y Nabih Sade. Todas ellas
// declaran 5/5 en comida, servicio y ambiente dentro de su propio texto.
// Las tres restantes —Jacqueline Pineda, Andrea Carolina Rivera y maira
// aguayo— están en 5 A LA ESPERA DE CONFIRMACIÓN: el material que entregó el
// cliente no incluía su puntuación (el widget de estrellas de Google no se
// copia como texto). Son opiniones de personas reales: si alguna puso 4,
// corregirla acá.
//
// Nada de `aggregateRating` en el JSON-LD mientras no se tenga el promedio y el
// total reales de la ficha. Además Google no admite que un negocio marque con
// datos estructurados las reseñas sobre sí mismo.
//
// Los textos son citas RECORTADAS para que la sección ocupe poco alto: cada
// una ronda los 120 caracteres y el corte va marcado con […] o con puntos
// suspensivos. Sólo se corrigieron tildes faltantes, nunca palabras. De la
// reseña de Renato se omitieron además los precios que detallaba: tienen seis
// meses y en el sitio se leerían como tarifas vigentes. Por el mismo motivo no
// se muestra el rango de gasto que Google adjunta a la de Lorena.
//
// Se excluyó una reseña negativa (José Miguel Ayala Riquelme, crítica a la
// comida) por indicación del cliente de mostrar las mejores. Es una selección
// deliberada, no el total de las opiniones.
// ─────────────────────────────────────────────────────────────────────────────

// Sin fecha: por decisión del cliente no se muestra hace cuánto se escribió
// cada reseña. Si se quiere reponer, el dato original era —en orden— hace 6
// meses, 6 meses, un año, 5 meses y 5 meses.
interface Review {
  autor: string;
  credencial: string;
  texto: string;
  estrellas: number;
  localGuide?: boolean;
  /** Puntuaciones por categoría, sólo si el autor las declara. */
  puntuaciones?: string;
  /** Tarjeta más ancha, para las reseñas largas. */
  destacada?: boolean;
}

const reviews: Review[] = [
  {
    autor: 'Renato Casas',
    credencial: '98 opiniones · 350 fotos',
    localGuide: true,
    estrellas: 5, // confirmada: su reseña declara 5/5
    // Texto COMPLETO, por indicación del cliente. Incluye las tarifas que el
    // autor detalla. OJO: son precios de hace seis meses citados por un
    // visitante, no la lista vigente del complejo — si cambian, esta reseña
    // queda mostrando valores desactualizados en portada.
    // Sólo se añadió una coma tras "2 cabañas" y el punto tras "Lo recomiendo",
    // donde el original traía un salto de línea. Ninguna palabra cambió.
    texto:
      'Excelente lugar. Cuenta con un restaurante de primer nivel. Posee 2 cabañas, 1 para dos personas y otra para cuatro personas. Precios cabaña para dos $60000 diarios sin tinaja y $90000 con tinaja. Cabaña para cuatro personas $90000 sin tinaja y $135000 con tinaja. Carta del restaurante variada y de precios razonables. Lo recomiendo. Deben realizar su reserva con anticipación.',
    puntuaciones: 'Comida 5/5 · Servicio 5/5 · Ambiente 5/5',
    destacada: true,
  },
  {
    autor: 'Lorena Mariel Perez',
    credencial: '18 opiniones',
    localGuide: true,
    estrellas: 5, // confirmada: declara 5/5 en comida, servicio y ambiente
    // Va completa, sin recorte: entra justo en el largo de las demás.
    texto:
      'Fuimos 6 personas todos con distintos platos y riquísimos todos. Buena cerveza. Atención hermosa de las chicas. Volvería!!!!',
  },
  {
    autor: 'Federico Neuman',
    credencial: '119 opiniones · 151 fotos',
    localGuide: true,
    estrellas: 5, // confirmada: declara 5/5 en comida, servicio y ambiente
    texto: 'Excelente sushi y tragos deliciosos.',
    puntuaciones: 'Comida 5/5 · Servicio 5/5 · Ambiente 5/5',
  },
  {
    autor: 'Lisette Lepe',
    credencial: '3 opiniones · 2 fotos',
    estrellas: 5, // confirmada: declara 5/5 en comida, servicio y ambiente
    // Completa. Nombra a Jani y Ricardo, los anfitriones: si por alguna razón
    // no quieren figurar, se recorta esa última frase.
    texto:
      'Nos quedamos en una cabaña y fue muy grato, desde la vista, las instalaciones, el paisaje y la atención. Anfitriones muy dedicados a entregar un servicio excelente, además el restaurante tiene buena comida y tragos bien preparados. ¡Muchas gracias Jani y Ricardo!',
    puntuaciones: 'Comida 5/5 · Servicio 5/5 · Ambiente 5/5',
  },
  {
    autor: 'silvana gomez',
    credencial: '3 opiniones · 21 fotos',
    estrellas: 5, // confirmada: declara 5/5 en comida, servicio y ambiente
    // Completa, sin recorte. No se muestra el rango de gasto que Google
    // adjunta ($15.000–20.000), por el mismo criterio que con las demás.
    texto:
      'Grato ambiente, la comida exquisita, el lugar muy tranquilo, acogedor y con una vista increíble.',
    puntuaciones: 'Comida 5/5 · Servicio 5/5 · Ambiente 5/5',
  },
  {
    autor: 'Jacqueline Pineda',
    credencial: '9 opiniones',
    localGuide: true,
    estrellas: 5, // por confirmar
    texto:
      'Excelente atención, sushi, tablas las más exquisitas, tragos, cabañas. Con una chef chaitenina, la mejor…',
  },
  {
    autor: 'Nabih Sade',
    credencial: '2 opiniones',
    estrellas: 5, // confirmada: declara 5/5 en comida, servicio y ambiente
    // Su original trae erratas: "exelente", "i todo", "los cocineros son
    // simpático". Se corrigieron a "excelente", "y todo" y "simpáticos" —
    // ortografía y concordancia, sin cambiar ni una palabra ni el sentido.
    texto:
      'La comida estaba muy rica, además el ambiente es agradable y los cocineros son simpáticos. Excelente atención, buena vista y todo artesanal.',
    puntuaciones: 'Comida 5/5 · Servicio 5/5 · Ambiente 5/5',
  },
  {
    autor: 'Andrea Carolina Rivera',
    credencial: '4 opiniones',
    estrellas: 5, // por confirmar
    texto:
      '¡Las cabañas maravillosas y tienen tinajas! Realmente hermoso: la vista, la hospitalidad, la comodidad. Un lugar para volver…',
  },
  {
    autor: 'maira aguayo',
    credencial: '1 opinión',
    estrellas: 5, // por confirmar
    texto:
      'Muy buen lugar la verdad. Es tranquilo, bonito y se pasa súper bien. La comida estaba rica y se sentía casera…',
  },
];

// Logotipo oficial de Google, con sus cuatro colores de marca. No alterarle
// los colores ni la opacidad: es una marca registrada y aquí cumple la función
// de atribuir la fuente de las reseñas.
function GoogleG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-[2px]" role="img" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className={`w-3 h-3 ${i < n ? 'text-gold' : 'text-cream/20'}`}
        >
          <path d="M12 2.2l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.26l-5.91 3.1 1.13-6.57L2.45 9.14l6.6-.96L12 2.2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  useScrollReveal();
  const { ref, handlers } = useDragScroll<HTMLDivElement>();

  // ── Bucle infinito ──
  // La lista va renderizada DOS veces, cada una dentro de su propio contenedor.
  // Al avanzar el equivalente a una copia completa, el scroll retrocede
  // exactamente esa distancia; al llegar al inicio, avanza lo mismo. Como las
  // dos copias son idénticas, el salto cae sobre contenido igual y no se nota.
  //
  // El salto NO puede calcularse como scrollWidth/2: el track lleva relleno
  // lateral, así que esa mitad no coincide con el ancho de una copia y la
  // costura quedaría corrida. Por eso se mide el contenedor de la primera y se
  // le suma el espacio que la separa de la segunda (gap-3 = 12px).
  const primeraCopia = useRef<HTMLDivElement>(null);
  const GAP = 12;

  const periodo = () => {
    const c = primeraCopia.current;
    return c ? c.offsetWidth + GAP : 0;
  };

  // Se arranca en 1px y no en 0 para que el primer arrastre hacia la izquierda
  // ya tenga margen y también dé la vuelta.
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollLeft = 1;
  }, [ref]);

  const onScroll = useCallback(() => {
    const el = ref.current;
    const p = periodo();
    if (!el || p <= 0) return;
    if (el.scrollLeft >= p) el.scrollLeft -= p;
    else if (el.scrollLeft <= 0) el.scrollLeft += p;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <section id="resenas" className="relative bg-bg-dark pt-8 md:pt-12 pb-8 md:pb-12 overflow-hidden">
      {/* Mismo video que el pie. El velo va más cargado acá: las tarjetas son
          de vidrio (crema al 5 %) y el texto es crema al 75 % en 13px, así que
          el movimiento de fondo se les nota mucho más que al pie. */}
      <VideoBackground
        src="/footer.mp4"
        overlay="linear-gradient(to bottom, rgba(6,38,54,0.92) 0%, rgba(6,38,54,0.82) 50%, rgba(6,38,54,0.92) 100%)"
      />

      {/* Encabezado compacto: en una franja tan baja, el overline y la línea
          dorada que usan las demás secciones sumaban altura sin aportar. El
          contenedor va con flex-wrap porque el título ya no cabe junto al aviso
          de arrastre en pantallas angostas. */}
      <div className="relative z-[1] max-w-7xl mx-auto px-6 md:px-12 mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <h2 className="reveal flex items-center gap-2.5 font-serif text-cream text-base md:text-lg font-semibold tracking-wide">
          <GoogleG className="w-[17px] h-[17px] md:w-5 md:h-5 flex-shrink-0" />
          <span>
            Reseñas de quienes ya vivieron{' '}
            <span className="text-gold script-accent">la experiencia</span>.
          </span>
        </h2>
        <p className="reveal delay-100 text-cream/40 text-[10px] tracking-[0.2em] uppercase font-light">
          ← Arrastra para leer más →
        </p>
      </div>

      <div
        ref={ref}
        {...handlers}
        // items-start: cada tarjeta toma su alto natural. Sin esto, la reseña
        // completa de Renato —cuatro veces más larga que el resto— estiraba las
        // otras cinco a su altura y dejaba un hueco enorme dentro de cada una.
        onScroll={onScroll}
        // z-[1]: sobre el video, pero por debajo de los difuminados laterales
        // (z-[2]), que tienen que seguir tapando las tarjetas en los bordes.
        //
        // overflow-y-hidden NO es decorativo: cuando un eje queda en `visible`
        // y el otro no, CSS obliga al primero a computar `auto`. Con sólo
        // `overflow-x-auto` esta franja era además un contenedor de scroll
        // VERTICAL, y la rueda del mouse se consumía adentro antes de mover la
        // página — el enganche al pasar por las reseñas.
        //
        // overscroll-x-contain corta el encadenamiento del arrastre horizontal
        // hacia la página y hacia el gesto de "atrás" del navegador.
        //
        // pt-1 da los 4px que necesita el `hover:-translate-y-1` de las
        // tarjetas para no quedar recortado ahora que el eje vertical clipea.
        className="gallery-track relative z-[1] flex items-start gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-6 md:px-12 pt-1 pb-3"
        // scrollBehavior en auto: si heredara el `smooth` global, cada salto de
        // costura se animaría y el bucle se notaría.
        style={{ cursor: 'grab', scrollBehavior: 'auto' }}
      >
        {[0, 1].map((copia) => (
          <div
            key={copia}
            ref={copia === 0 ? primeraCopia : undefined}
            className="flex items-start gap-3 flex-shrink-0"
            // La segunda pasada es una copia visual para cerrar el bucle: se
            // oculta a lectores de pantalla para no leer las reseñas dos veces.
            aria-hidden={copia === 1 ? true : undefined}
          >
            {reviews.map((r) => (
          <figure
            key={r.autor}
            // reveal-fade y no reveal: el `translateY(40px)` de la entrada
            // normal se suma al área desplazable del carril y era la otra mitad
            // del enganche al scrollear. Acá la entrada es sólo opacidad, que
            // no ocupa espacio.
            className={`reveal-fade group relative flex-shrink-0 ${
              r.destacada
                ? 'w-[82vw] sm:w-[420px] lg:w-[470px]'
                : 'w-[78vw] sm:w-[330px] lg:w-[355px]'
            } min-h-[180px] border border-cream/10 hover:border-gold/45 bg-cream/[0.05] backdrop-blur-sm px-5 py-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:bg-cream/[0.08]`}
          >
            {/* Filo superior claro: el truco de vidrio que separa la tarjeta
                del fondo sin recurrir a una sombra. */}
            <div
              className="absolute inset-x-0 top-0 h-px pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(245,240,232,0.22), transparent)',
              }}
              aria-hidden="true"
            />

            <blockquote className="text-cream/75 text-[13px] font-light leading-[1.6] mb-3.5 flex-1">
              {r.texto}
            </blockquote>

            <figcaption className="border-t border-cream/10 pt-3">
              <div className="mb-1.5">
                <Stars n={r.estrellas} />
              </div>
              {r.puntuaciones && (
                <p className="text-gold/70 text-[9px] tracking-[0.1em] uppercase font-light mb-1.5">
                  {r.puntuaciones}
                </p>
              )}
              <p className="font-serif text-cream text-[13px] font-medium leading-tight">{r.autor}</p>
              <p className="text-cream/40 text-[10px] font-light leading-tight mt-0.5">
                {r.localGuide && <span className="text-gold/70">Local Guide</span>}
                {r.localGuide && ' · '}
                {r.credencial}
              </p>
            </figcaption>
          </figure>
            ))}
          </div>
        ))}
      </div>

      {/* Difuminado en los bordes: las tarjetas se disuelven en el fondo en vez
          de cortarse en seco contra el filo del viewport. */}
      <div
        className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-16 z-[2]"
        style={{ background: 'linear-gradient(to right, #062636, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-16 z-[2]"
        style={{ background: 'linear-gradient(to left, #062636, transparent)' }}
        aria-hidden="true"
      />
    </section>
  );
}
