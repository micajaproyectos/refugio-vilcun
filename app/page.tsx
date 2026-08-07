import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ActivitiesMarquee from '@/components/ActivitiesMarquee';
import Reviews from '@/components/Reviews';
import Panoramas from '@/components/Panoramas';
import Chef from '@/components/Chef';
import SaunaSpa from '@/components/SaunaSpa';
import Events from '@/components/Events';
import Gallery from '@/components/Gallery';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Directions from '@/components/Directions';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="bg-bg-primary">
      <Navbar />

      {/* Hero sticky — queda fijo; lo que sigue se desliza encima */}
      <Hero />

      {/*
       * relative z-10 → estas secciones apilan sobre el hero sticky.
       * Cada sección tiene fondo sólido, por eso "tapan" el hero al scrollear.
       * Panoramas va primero: los tres panoramas fuertes, apenas pasa el hero.
       */}
      <div className="relative z-10">
        <ActivitiesMarquee />
        <Reviews />
        <Panoramas />
        <Chef />
        <SaunaSpa />
        <Events />
        <Gallery />
        <Faq />
        <Contact />
        {/* Cierra la landing: una vez decidida la visita, cómo llegar. */}
        <Directions />
        <Footer />
      </div>

      <WhatsAppButton />
    </main>
  );
}
