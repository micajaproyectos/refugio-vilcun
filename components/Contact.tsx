'use client';
import { useState, FormEvent } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  WA_LINKS,
  WHATSAPP_RESTAURANTE,
  WHATSAPP_EVENTOS,
  EMAIL_CONTACTO,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
} from '@/lib/site';

function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Contact() {
  useScrollReveal();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const { nombre, email, mensaje } = form;
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nCorreo: ${email}\n\nMensaje:\n${mensaje}`
    );
    const subject = encodeURIComponent(`Consulta de ${nombre} — Refugio del Vilcún`);
    window.location.href = `mailto:${EMAIL_CONTACTO}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setStatus('sent');
      setForm({ nombre: '', email: '', mensaje: '' });
    }, 500);
  };

  return (
    <section id="contacto" className="py-24 md:py-36 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p className="reveal text-gold text-[10px] tracking-[0.45em] uppercase mb-5 font-light">
            Reservas & contacto
          </p>
          <div className="gold-line-short mb-7 reveal delay-100" />
          <h2
            className="reveal delay-200 font-serif text-ink font-semibold leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            Reserva tu <br className="hidden md:block" />
            <span className="text-gold script-accent">experiencia patagónica</span>
          </h2>
          <p className="reveal delay-300 text-ink/50 text-base font-light max-w-md">
            Todas las reservas y consultas se coordinan directo por WhatsApp.
          </p>
        </div>

        {/* WhatsApp — dos líneas según lo definido en la reunión */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          <a
            href={WA_LINKS.restaurante}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 border border-lake/25 hover:border-lake bg-lake/[0.03] hover:bg-lake/[0.06] transition-all duration-300 px-6 py-5"
          >
            <div className="w-11 h-11 rounded-full bg-[#25D366]/15 text-[#1f9e52] flex items-center justify-center flex-shrink-0">
              <WhatsAppIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-ink/40 text-[10px] tracking-widest uppercase font-light mb-1">
                Restaurante & Cafetería
              </p>
              <p className="text-ink font-serif text-lg">+{WHATSAPP_RESTAURANTE.replace(/^56/, '56 9 ').replace(/(\d{4})(\d{4})$/, '$1 $2')}</p>
            </div>
          </a>
          <a
            href={WA_LINKS.eventos}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 border border-lake/25 hover:border-lake bg-lake/[0.03] hover:bg-lake/[0.06] transition-all duration-300 px-6 py-5"
          >
            <div className="w-11 h-11 rounded-full bg-[#25D366]/15 text-[#1f9e52] flex items-center justify-center flex-shrink-0">
              <WhatsAppIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-ink/40 text-[10px] tracking-widest uppercase font-light mb-1">
                Eventos, Cabañas & Servicios
              </p>
              <p className="text-ink font-serif text-lg">+{WHATSAPP_EVENTOS.replace(/^56/, '56 9 ').replace(/(\d{4})(\d{4})$/, '$1 $2')}</p>
            </div>
          </a>
        </div>

        {/* 2 Columns — Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start mb-16">
          {/* Col 1 — Info */}
          <div className="reveal-left">
            <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-8 font-light">
              Información de contacto
            </p>

            <div className="space-y-8">
              <div className="border-t border-ink/[0.08] pt-6">
                <p className="text-ink/35 text-[10px] tracking-widest uppercase mb-2 font-light">Correo</p>
                <a href={`mailto:${EMAIL_CONTACTO}`} className="text-ink text-xl font-serif font-light hover:text-gold transition-colors duration-300">
                  {EMAIL_CONTACTO}
                </a>
              </div>

              <div className="border-t border-ink/[0.08] pt-6">
                <p className="text-ink/35 text-[10px] tracking-widest uppercase mb-2 font-light">Ubicación</p>
                <p className="text-ink/55 text-base font-light leading-relaxed">
                  {ADDRESS_LOCALITY}, {ADDRESS_REGION}<br />
                  Chile
                </p>
                <a
                  href="#como-llegar"
                  className="inline-block text-gold/80 hover:text-gold text-xs font-light mt-2 tracking-wide transition-colors duration-300"
                >
                  Ver mapa y cómo llegar ↓
                </a>
              </div>
            </div>
          </div>

          {/* Col 2 — Form */}
          <div className="reveal-right">
            <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-4 font-light">
              Enviar consulta
            </p>
            <div className="gold-line-short mb-6" />

            {status === 'sent' ? (
              <div className="text-center py-12 border border-gold/25 bg-gold/[0.03] px-8">
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CE7D24" strokeWidth="1.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-serif text-gold text-lg mb-2">¡Consulta enviada!</h3>
                <p className="text-ink/50 text-sm font-light leading-relaxed">
                  Se abrió su cliente de correo. Responderemos a la brevedad.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-ink/30 text-xs tracking-widest uppercase hover:text-gold transition-colors duration-300"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-ink/45 text-[10px] tracking-widest uppercase block mb-2 font-light">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Su nombre"
                    className="lake-input"
                  />
                </div>
                <div>
                  <label className="text-ink/45 text-[10px] tracking-widest uppercase block mb-2 font-light">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="su@correo.com"
                    className="lake-input"
                  />
                </div>
                <div>
                  <label className="text-ink/45 text-[10px] tracking-widest uppercase block mb-2 font-light">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Consulte por disponibilidad, fechas, grupos..."
                    className="lake-input resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-gold w-full text-center text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar consulta'}
                </button>
                <p className="text-ink/30 text-[10px] text-center font-light">
                  Para reservas urgentes, escríbenos directamente por WhatsApp arriba
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
