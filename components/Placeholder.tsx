// Marcador visual mientras no existen fotos reales.
// Indica en pantalla la ruta de carpeta esperada (ver public/images/) para que
// sea evidente dónde reemplazar por <Image src="..."> cuando llegue el material.

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" className="w-6 h-6 md:w-8 md:h-8">
      <path d="M4 8h3l2-2h6l2 2h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" />
      <circle cx="12" cy="14" r="3.5" />
    </svg>
  );
}

interface PlaceholderProps {
  label: string;
  folder?: string;
  className?: string;
}

export default function Placeholder({ label, folder, className = '' }: PlaceholderProps) {
  return (
    <div
      className={`placeholder-img absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-center px-4 border border-gold/[0.08] ${className}`}
    >
      <div className="text-gold/25">
        <CameraIcon />
      </div>
      <p className="text-cream/45 text-[10px] md:text-xs tracking-[0.2em] uppercase font-light leading-relaxed">
        {label}
      </p>
      {folder && (
        <p className="text-gold/30 text-[9px] font-mono tracking-wide">{folder}</p>
      )}
    </div>
  );
}
