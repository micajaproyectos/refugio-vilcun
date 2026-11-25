'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Condor from './Condor';
import VideoBackground from './VideoBackground';
import {
  WA_LINKS,
  WHATSAPP_RESTAURANTE,
  WHATSAPP_EVENTOS,
  EMAIL_CONTACTO,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  LOCATION_TAGLINE,
  SOCIAL_INSTAGRAM,
  SOCIAL_FACEBOOK,
  GOOGLE_MAPS_URL,
  ROUTES,
} from '@/lib/site';

// El pie aparece en todas las páginas, así que sus enlaces tienen el mismo
// problema que los de la barra superior: fuera de la home las anclas no
// existen en el documento y `scrollIntoView` no hacía nada. Ver la nota
// larga en components/Navbar.tsx — acá se aplica el mismo criterio.
interface FooterLink {
  label: string;
  href: string;
  tipo: 'ancla' | 'ruta';
}

const navLinks: FooterLink[] = [
  { label: 'Inicio', href: '#inicio', tipo: 'ancla' },
  { label: 'Restaurante', href: ROUTES.restaurante, tipo: 'ruta' },
  { label: 'Spa', href: '#spa', tipo: 'ancla' },
  { label: 'Eventos', href: '#eventos', tipo: 'ancla' },
  { label: 'Galería', href: '#galeria', tipo: 'ancla' },
  { label: 'Contacto', href: '#contacto', tipo: 'ancla' },
  { label: 'Cómo llegar', href: '#como-llegar', tipo: 'ancla' },
];

const scrollTo = (href: string) => {
  if (href === '#inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const enHome = pathname === ROUTES.home;

  const hrefFueraDeHome = (href: string) =>
    href === '#inicio' ? ROUTES.home : `${ROUTES.home}${href}`;

  const claseLink =
    'text-cream/60 hover:text-gold transition-colors duration-300 text-sm font-light text-left tracking-wide w-fit';

  return (
    <footer className="relative bg-bg-dark border-t border-cream/[0.06] overflow-hidden">
      {/* Velo cargado: el texto del pie es crema al 55–60 % sobre cuerpo
          pequeño, necesita bastante más contraste que una foto de sección. */}
      <VideoBackground
        src="/footer.mp4"
        overlay="linear-gradient(to bottom, rgba(6,38,54,0.88) 0%, rgba(6,38,54,0.76) 45%, rgba(6,38,54,0.9) 100%)"
      />

      {/* Cóndor del logo — cierra el recorrido donde empezó, junto al sello */}
      <div className="condor-drift pointer-events-none absolute top-14 right-[12%] z-10 hidden md:block">
        <Condor className="w-6 lg:w-8 text-gold/20" flip />
      </div>

      {/* Top section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand — logo corporativo (public/logo/) */}
          <div>
            {/* Fuera de la home el sello lleva a la home; dentro, sube al inicio. */}
            {(() => {
              const marca = (
                <>
                  <Image
                    src="/logo/logo-badge.png"
                    alt="Refugio del Vilcún"
                    width={512}
                    height={512}
                    sizes="64px"
                    className="w-16 h-16 flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="block">
                    <span className="block font-serif text-gold text-2xl font-semibold leading-none mb-1.5">
                      Refugio del Vilcún
                    </span>
                    <span className="block text-cream/60 text-[10px] tracking-[0.35em] uppercase font-light">
                      Complejo Turístico
                    </span>
                  </span>
                </>
              );
              const clase = 'text-left mb-5 flex items-center gap-4 group';
              return enHome ? (
                <button onClick={() => scrollTo('#inicio')} className={clase}>{marca}</button>
              ) : (
                <Link href={ROUTES.home} className={clase}>{marca}</Link>
              );
            })()}
            <p className="text-cream/60 text-sm font-light leading-relaxed max-w-xs">
              Restaurante, cafetería, sauna, cabañas con tinaja y centro de eventos
              a pasos de la Playa Santa Bárbara.
            </p>
            <p className="text-gold/70 text-[10px] tracking-[0.25em] uppercase font-light mt-3">
              {LOCATION_TAGLINE}
            </p>
            {/* Instagram y Facebook apuntan a los perfiles reales; WhatsApp al
                número del restaurante. La ficha de Google Maps se enlaza desde
                la dirección y desde la sección "Cómo llegar", no como ícono. */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href={SOCIAL_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={SOCIAL_FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={WA_LINKS.general}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-5 font-light">
              Navegación
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) =>
                link.tipo === 'ruta' || !enHome ? (
                  <Link
                    key={link.href}
                    href={link.tipo === 'ruta' ? link.href : hrefFueraDeHome(link.href)}
                    aria-current={link.tipo === 'ruta' && pathname === link.href ? 'page' : undefined}
                    className={claseLink}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button key={link.href} onClick={() => scrollTo(link.href)} className={claseLink}>
                    {link.label}
                  </button>
                )
              )}
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-5 font-light">
              Contacto
            </p>
            <div className="space-y-3">
              <a
                href={`tel:+${WHATSAPP_RESTAURANTE}`}
                className="block text-cream/60 hover:text-gold transition-colors duration-300 text-sm font-light"
              >
                Restaurante · +{WHATSAPP_RESTAURANTE}
              </a>
              <a
                href={`tel:+${WHATSAPP_EVENTOS}`}
                className="block text-cream/60 hover:text-gold transition-colors duration-300 text-sm font-light"
              >
                Eventos · +{WHATSAPP_EVENTOS}
              </a>
              <a
                href={`mailto:${EMAIL_CONTACTO}`}
                className="block text-cream/60 hover:text-gold transition-colors duration-300 text-sm font-light"
              >
                {EMAIL_CONTACTO}
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-cream/55 hover:text-gold transition-colors duration-300 text-sm font-light leading-relaxed"
              >
                {ADDRESS_LOCALITY}, {ADDRESS_REGION}<br />
                Chile — ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="gold-line relative z-10 mx-6 md:mx-12" />

      {/* Bottom section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-cream/55 text-xs font-light tracking-wide">
          © 2026 Refugio del Vilcún — Complejo Turístico. Todos los derechos reservados.
        </p>
        <a
          href="https://amtecnologia.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-light tracking-wide group"
          style={{ fontFamily: 'Helvetica, Arial, system-ui, sans-serif' }}
        >
          <span className="text-cream/70 group-hover:text-cream transition-colors duration-300">
            Creado por{' '}
          </span>
          <span
            className="font-semibold transition-opacity duration-300 group-hover:opacity-80"
            style={{ color: '#60A5FA' }}
          >
            AM
          </span>
          <span className="text-cream/70 group-hover:text-cream transition-colors duration-300">
            {' '}Tecnología
          </span>
        </a>
      </div>
    </footer>
  );
}
