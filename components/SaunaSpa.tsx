'use client';
import { WA_LINKS } from '@/lib/site';
import FeatureBand, { BandImage } from './FeatureBand';

// Reemplaza a la antigua sección "Sabores de la casa", que repetía casi las
// mismas fotos de platos que el carrusel de "Nuestra cocina" justo encima.
//
// Va con la foto a la izquierda —espejo de "Nuestra cocina"— para que dos
// bandas seguidas con el mismo patrón no se lean como la misma sección
// repetida.
//
// Sin rótulos sobre las fotos: tres de las cuatro traen texto incrustado
// ("Spa y Sauna", "Disfruta de momentos de paz y tranquilidad"...) y
// sobreponerles otro título encima duplicaría la tipografía.
//
// Las cuatro son muy verticales (0.608 a 0.666), por eso el marco va en 2/3:
// con object-contain ocupan el 96% de la ventana y ninguna se recorta.
const spa: BandImage[] = [
  {
    src: '/images/sauna-masajes/spa_vilcun4.png',
    alt: 'Mujer en bata descansando en el sauna de madera del complejo',
  },
  {
    src: '/images/sauna-masajes/spa_vilcun3.png',
    alt: 'Sala de masajes con camilla junto al ventanal y vista al bosque',
  },
  {
    src: '/images/sauna-masajes/spa_vilcun.png',
    alt: 'Rincón de spa con lámparas de sal, velas encendidas y aceites',
  },
  {
    src: '/images/sauna-masajes/spa_vilcun2.png',
    alt: 'Detalle del sector de spa del complejo, con velas y madera',
  },
];

export default function SaunaSpa() {
  return (
    <FeatureBand
      id="spa"
      overline="Sauna & Spa"
      titleLead="Tiempo para"
      titleAccent="desconectar"
      body={
        <p>
          Sauna y sala de masajes con masajista profesional, dentro del mismo complejo.
          Entre el almuerzo y la tinaja no hay que salir a ninguna parte: la idea es que
          el día completo pase acá.
        </p>
      }
      signature="Masajista profesional · Previa coordinación"
      cta={{ label: 'Reservar hora', href: WA_LINKS.spa }}
      images={spa}
      frameAspect="2 / 3"
      imageSide="left"
    />
  );
}
