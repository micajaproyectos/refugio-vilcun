// Silueta del cóndor tomada del logo corporativo.
//
// No es un dibujo aproximado: el path se vectorizó desde el propio archivo
// del logo (public/logo/logo_refugiovilcun.png), aislando el ave que vuela
// sobre el cielo naranja y trazando su contorno. Por eso conserva las plumas
// digitadas de las puntas de las alas, que es lo que la hace reconocible.
//
// Se pinta con `currentColor`, así que el color y la opacidad se controlan
// desde las clases del elemento que la usa (text-gold/20, text-cream/15…).
// Está pensada como elemento decorativo: siempre aria-hidden.

interface CondorProps {
  className?: string;
  /** Voltea la silueta en horizontal, para variar la dirección de vuelo. */
  flip?: boolean;
}

export default function Condor({ className = '', flip = false }: CondorProps) {
  return (
    <svg
      viewBox="0 0 68.9 100"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
    >
      <path d="M10.5 0.0 L14.4 3.9 L17.0 2.0 L20.3 7.2 L23.0 5.6 L25.2 8.2 L39.3 44.6 L43.6 48.9 L48.2 49.2 L53.1 51.8 L49.2 61.0 L61.0 81.3 L68.5 90.8 L68.2 93.4 L64.3 90.2 L63.0 90.8 L64.9 97.7 L63.3 97.4 L60.0 92.1 L57.0 95.1 L58.0 99.3 L56.4 99.7 L53.1 97.0 L50.8 90.5 L45.9 94.4 L45.2 90.2 L43.0 87.2 L40.3 90.2 L28.5 77.4 L24.6 79.3 L25.6 73.1 L21.0 64.6 L18.7 64.3 L12.1 68.2 L5.2 66.2 L2.3 62.0 L3.3 58.7 L9.8 58.4 L10.2 51.5 L6.2 41.3 L5.9 34.1 L2.0 28.2 L3.9 24.3 L0.0 20.3 L1.3 19.3 L3.0 21.3 L8.2 22.0 L10.2 20.3 L0.7 13.1 L0.3 10.8 L5.6 11.8 L10.2 15.7 L12.1 15.1 L7.9 8.2 L3.9 5.2 L5.2 2.3 L6.9 5.2 L11.1 7.2 L10.2 0.3Z" />
    </svg>
  );
}
