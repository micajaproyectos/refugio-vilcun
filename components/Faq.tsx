'use client';
import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// Solo preguntas respaldadas por la información confirmada en la reunión.
// Precios, horarios y capacidad exacta se dejan fuera hasta confirmarlos,
// para no publicar datos inventados — se remite a WhatsApp en esos casos.
const faqs = [
  {
    question: '¿Puedo reservar para grupos grandes?',
    answer:
      'Sí. El restaurante Santa Bárbara está pensado especialmente para grupos, con tenedor libre, asados al palo y chicha en bota. Te recomendamos coordinar con anticipación por WhatsApp.',
  },
  {
    question: '¿Puedo celebrar mi matrimonio en Refugio del Vilcún?',
    answer:
      'Sí, contamos con centro de eventos para matrimonios, celebraciones de institución, catering, coffee break institucional y licenciaturas estudiantiles, sujeto a disponibilidad.',
  },
  {
    question: '¿Cómo reservo o consulto disponibilidad?',
    answer:
      'El sistema de reservas es directo por WhatsApp: un número para consultas de restaurante y cafetería, y otro para eventos, cabañas y servicios. Los encuentras en la sección de contacto.',
  },
  {
    question: '¿Tienen alojamiento?',
    answer:
      'Sí, contamos con cabañas con tinaja dentro del complejo, disponibles previa consulta por WhatsApp.',
  },
  {
    question: '¿Qué otros servicios tiene el complejo?',
    answer:
      'Además del restaurante y la cafetería, Refugio del Vilcún cuenta con sauna y sala de masajes, cabañas con tinaja y centro de eventos.',
  },
];

export default function Faq() {
  useScrollReveal();
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section id="preguntas-frecuentes" className="py-24 md:py-32 bg-bg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <p className="reveal text-gold/70 text-[10px] tracking-[0.45em] uppercase mb-5 font-light">
            Antes de tu visita
          </p>
          <div className="gold-line-short mx-auto mb-6 reveal delay-100" />
          <h2 className="reveal delay-200 font-serif text-4xl md:text-5xl text-ink font-semibold mb-4">
            Preguntas{' '}
            <span className="text-gold script-accent">frecuentes</span>
          </h2>
        </div>

        <div className="reveal delay-200 divide-y divide-ink/10 border-t border-b border-ink/10">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                >
                  <h3 className="font-serif text-ink text-lg md:text-xl font-medium group-hover:text-gold transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <span
                    className={`flex-shrink-0 text-gold text-2xl font-light leading-none transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-400 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-ink/60 text-sm md:text-base font-light leading-relaxed pb-6 pr-10">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
