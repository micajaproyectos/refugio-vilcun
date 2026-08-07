'use client';
import Condor from './Condor';

// Marquesina delgada bajo el hero: las ocasiones que se celebran en el
// complejo, desfilando en bucle, separadas por el cóndor del logo.
//
// Sobre el número de copias: el desplazamiento va de 0 a -50%, así que la
// mitad del track tiene que ser MÁS ANCHA que el viewport o aparece un hueco
// al reiniciar el ciclo. Una pasada mide ~1470px, de modo que con 4 copias la
// mitad son ~2940px y cubre hasta monitores ultrapanorámicos. Si se agregan o
// quitan actividades, conviene revisar esta cuenta.
const REPETICIONES = 4;

const actividades = [
  'Matrimonios',
  'Celebraciones de institución',
  'Catering',
  'Coffee break institucional',
  'Licenciaturas estudiantiles',
];

export default function ActivitiesMarquee() {
  return (
    <div className="bg-bg-dark border-y border-gold/15 overflow-hidden py-3 md:py-3.5">
      <div className="activities-track">
        {Array.from({ length: REPETICIONES }).map((_, copia) => (
          <div
            key={copia}
            // Sólo la primera pasada la leen los lectores de pantalla; el resto
            // son copias visuales para cerrar el bucle.
            aria-hidden={copia > 0 ? true : undefined}
            className="flex items-center flex-shrink-0"
          >
            {actividades.map((a) => (
              <span key={a} className="flex items-center flex-shrink-0">
                <span className="text-gold text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light whitespace-nowrap px-5 md:px-7">
                  {a}
                </span>
                <Condor className="w-3 md:w-3.5 text-gold/40 flex-shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
