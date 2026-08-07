'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Restaurante', href: '#restaurante' },
  { label: 'Spa', href: '#spa' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      // El Hero (#inicio) es sticky top-0: siempre está en el tope del viewport,
      // por lo que scrollIntoView no lo alcanza. Para volver al inicio llevamos
      // la ventana directamente arriba.
      if (href === '#inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, menuOpen ? 300 : 0);
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-lg border-b border-ink/[0.07] shadow-sm shadow-ink/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo corporativo (public/logo/) — se usa el sello circular, que se lee
              igual sobre el hero oscuro y sobre la barra crema al hacer scroll. */}
          <button onClick={() => scrollTo('#inicio')} className="text-left group flex items-center gap-3">
            <Image
              src="/logo/logo-badge.png"
              alt="Refugio del Vilcún"
              width={512}
              height={512}
              priority
              className="w-11 h-11 md:w-14 md:h-14 flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
            />
            <span className="block">
              <span className="block font-serif text-gold text-xl md:text-2xl font-semibold tracking-wide leading-none group-hover:text-gold-light transition-colors duration-300">
                Refugio del Vilcún
              </span>
              {/* El interletrado baja en pantallas chicas: con cuatro rubros
                  esta línea mide ~43 caracteres y con 0.3em fijo se parte en
                  dos incluso en notebooks, donde compite por ancho con el menú
                  y el botón de reserva. */}
              <span className={`block text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.22em] xl:tracking-[0.3em] uppercase mt-1 font-light leading-tight transition-colors duration-500 ${scrolled ? 'text-ink/40' : 'text-cream/50'}`}>
                Restaurante · Cafetería · Cabañas · Eventos
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`transition-colors duration-300 text-xs tracking-[0.2em] uppercase font-light relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full hover:text-gold ${scrolled ? 'text-ink/60' : 'text-cream/70'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollTo('#contacto')}
              className="btn-gold text-xs"
            >
              Reservar
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center gap-1.5 p-2 w-10 h-10"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span
              className={`block w-6 h-px bg-gold origin-center transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-gold transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-gold origin-center transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-ink/70 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-bg-dark border-l border-gold/10 flex flex-col pt-24 pb-10 px-8 transition-transform duration-500 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="gold-line-short mb-8" />
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-cream/70 hover:text-gold transition-colors duration-300 text-xs tracking-[0.25em] uppercase text-left"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="mt-auto">
            <button
              onClick={() => scrollTo('#contacto')}
              className="btn-gold w-full text-center text-xs"
            >
              Reservar mesa
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
