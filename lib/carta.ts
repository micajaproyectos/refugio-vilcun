// ─────────────────────────────────────────────────────────────────────────────
// Carta del Restaurante Santa Bárbara.
//
// ÚNICA fuente de la carta: de acá salen tanto lo que se ve en pantalla como
// el JSON-LD `Menu` que lee Google. Si se edita un precio, se edita una sola
// vez y los dos quedan sincronizados. No duplicar estos datos en el componente.
//
// ORIGEN DE LOS DATOS — todo lo de abajo está transcrito de las piezas
// gráficas que entregó el cliente, que son material ya publicado:
//   · Tablas de sushi y precios → public/images/restaurante/menu_sushi.jpeg
//   · Bandeja mixta            → public/images/restaurante/bandeja_mixta_sushi.jpeg
//   · Ensalada César           → public/images/restaurante/ensalada_cesar.jpeg
//   · Quiche ave-choclo        → public/images/restaurante/quich_ave_choclo.jpeg
// No agregar platos, precios ni descripciones que no salgan de una pieza
// entregada por el cliente.
//
// Sobre la ortografía: los afiches traen "camaron", "atun", "sesamo" y "Quich"
// sin acentuar / mal escritos. Acá van corregidos porque este texto es el que
// indexa Google y el que lee un lector de pantalla; la imagen se muestra tal
// cual llegó. Si el cliente rehace las piezas, conviene corregirlas también.
//
// Sobre los precios: sólo el sushi los trae. El resto de la carta no tiene
// precio publicado, así que `precio` va omitido — NO inventar montos ni poner
// "consultar" en cada línea, que ensucia la lectura. El aviso de que los
// precios pueden variar vive en el componente, una sola vez.
// ─────────────────────────────────────────────────────────────────────────────

export interface ItemCarta {
  nombre: string;
  descripcion?: string;
  /** Detalle en viñetas — hoy sólo lo usan las tablas de sushi. */
  detalle?: string[];
  /** Precio en pesos chilenos. Omitir si el cliente no lo tiene publicado. */
  precio?: number;
  /** Bajada corta bajo el nombre, p. ej. "40 bocados". */
  formato?: string;
}

export interface GrupoCarta {
  id: string;
  titulo: string;
  descripcion?: string;
  items: ItemCarta[];
}

// ── Sushi ───────────────────────────────────────────────────────────────────
// Las cuatro tablas son de 40 bocados y se diferencian por el relleno y el
// envuelto. Precios de la pieza gráfica vigente.
export const TABLAS_SUSHI: GrupoCarta = {
  id: 'tablas',
  titulo: 'Tablas de sushi',
  descripcion: 'Cuatro tablas de 40 bocados. Todas disponibles para delivery.',
  items: [
    {
      nombre: 'Tabla Mixta',
      formato: '40 bocados',
      precio: 27000,
      detalle: [
        '10 bocados de salmón, queso y cebollín en palta',
        '10 bocados de pulpo, queso y cebollín en sésamo',
        '10 bocados de pollo, queso y cebollín en panko',
        '10 bocados de camarón, queso y cebollín en panko',
      ],
    },
    {
      nombre: 'Tabla Fría',
      formato: '40 bocados',
      precio: 27000,
      detalle: [
        '10 bocados de salmón, queso y cebollín en palta',
        '10 bocados de pulpo, palta y cebollín en queso',
        '10 bocados de palta, queso y cebollín en nori',
        '10 bocados de camarón, queso y cebollín en sésamo',
      ],
    },
    {
      nombre: 'Tabla Hot',
      formato: '40 bocados',
      precio: 24000,
      detalle: [
        '10 bocados de salmón, queso y cebollín en panko',
        '10 bocados de pulpo, queso y cebollín en panko',
        '10 bocados de pollo, queso y cebollín en panko',
        '10 bocados de camarón, queso y cebollín en panko',
      ],
    },
    {
      nombre: 'Tabla Premium',
      formato: '40 bocados',
      precio: 32000,
      detalle: [
        '10 bocados de jaiba, queso y cebollín en palta',
        '10 bocados de pulpo, queso y cebollín en masago',
        '10 bocados de atún, queso y cebollín en panko',
        '10 bocados de camarón frito, queso y cebollín en salmón ahumado',
      ],
    },
  ],
};

export const ACOMPANAMIENTOS: GrupoCarta = {
  id: 'acompanamientos',
  titulo: 'Handroll y para compartir',
  items: [
    { nombre: 'Handroll', precio: 6200 },
    { nombre: 'Empanadas de queso', formato: '12 unidades', precio: 8000 },
    { nombre: 'Arrollados primavera', formato: '12 unidades', precio: 8000 },
    {
      nombre: 'Bandeja Mixta',
      formato: '10 bocados',
      descripcion:
        '5 bocados de pollo, queso crema y cebollín envueltos en palta, más 5 de camarón, queso crema y cebollín envueltos en queso crema.',
    },
  ],
};

// ── Cocina ──────────────────────────────────────────────────────────────────
export const ENSALADAS: GrupoCarta = {
  id: 'ensaladas',
  titulo: 'Ensalada César',
  descripcion: 'La misma base —lechuga fresca, crutones, queso parmesano y aderezo César— en tres versiones.',
  items: [
    {
      nombre: 'César con pollo',
      descripcion: 'Tierno pollo a la plancha, lechuga fresca, crutones, queso parmesano y aderezo César.',
    },
    {
      nombre: 'César con camarón',
      descripcion: 'Jugosos camarones salteados, lechuga fresca, crutones, queso parmesano y aderezo César.',
    },
    {
      nombre: 'César con salmón ahumado',
      descripcion: 'Delicado salmón ahumado, lechuga fresca, crutones, queso parmesano y aderezo César.',
    },
  ],
};

// Los cuatro primeros son los platos del carrusel de "Nuestra cocina" en la
// home (components/Chef.tsx); el quiche viene de la pieza gráfica nueva.
export const COCINA: GrupoCarta = {
  id: 'cocina',
  titulo: 'De la cocina',
  items: [
    {
      nombre: 'Quiche de ave y choclo',
      descripcion: 'Trozos de pollo jugoso, choclo natural y queso fundido. Sabor casero, ideal para compartir.',
    },
    { nombre: 'Ceviche de salmón' },
    { nombre: 'Pastel de jaiba' },
    { nombre: 'Chupe de mariscos' },
    { nombre: 'Sushi de la casa' },
  ],
};

export const GRUPOS_CARTA: GrupoCarta[] = [
  TABLAS_SUSHI,
  ACOMPANAMIENTOS,
  ENSALADAS,
  COCINA,
];

// ── Piezas gráficas ─────────────────────────────────────────────────────────
// Los afiches del cliente, tal cual llegaron. Traen el texto incrustado en el
// pixel, así que NO reemplazan a la carta en HTML de arriba: la acompañan.
// Por eso cada una lleva un `alt` descriptivo — para el lector de pantalla y
// para Google, que no leen texto dentro de una imagen.
export interface PiezaGrafica {
  src: string;
  titulo: string;
  alt: string;
}

export const PIEZAS_RESTAURANTE: PiezaGrafica[] = [
  {
    src: '/images/restaurante/menu_sushi.jpeg',
    titulo: 'Carta de sushi',
    alt: 'Carta completa de Sushi del Vilcún con las cuatro tablas, sus precios y el teléfono de delivery',
  },
  {
    src: '/images/restaurante/ensalada_cesar.jpeg',
    titulo: 'Ensalada César',
    alt: 'Las tres ensaladas César del restaurante —con pollo, con camarón y con salmón ahumado— servidas en bowls blancos',
  },
  {
    src: '/images/restaurante/bandeja_mixta_sushi.jpeg',
    titulo: 'Bandeja Mixta',
    alt: 'Bandeja mixta de diez bocados de sushi, cinco envueltos en palta y cinco en queso crema, con salsa de soya',
  },
  {
    src: '/images/restaurante/quich_ave_choclo.jpeg',
    titulo: 'Quiche de ave y choclo',
    alt: 'Quiche de ave y choclo dorado en un plato blanco, con una porción cortada',
  },
];

/** Formatea un monto en pesos chilenos: 27000 → "$27.000". */
export function formatearPrecio(valor: number): string {
  return `$${valor.toLocaleString('es-CL')}`;
}

// ── Platos del carrusel ─────────────────────────────────────────────────────
// Las cuatro fotos que rota "Nuestra cocina". Viven acá y no dentro de
// components/Chef.tsx porque las usan DOS lugares —la home y la página del
// restaurante— y tenerlas duplicadas garantizaba que un día quedaran
// distintas. La forma coincide con `BandImage` de components/FeatureBand.tsx;
// se declara estructuralmente para no hacer que lib/ dependa de components/.
//
// Las cuatro son casi cuadradas (0.967 a 1.000), por eso el marco que las
// muestra va en 1/1: con object-contain ocupan el 98% de la ventana y ninguna
// se recorta. Si se reemplaza alguna, verificar que siga esa proporción.
export const PLATOS_CARRUSEL: { src: string; caption: string; alt: string }[] = [
  {
    src: '/images/restaurante/plato1.png',
    caption: 'Ceviche de salmón',
    alt: 'Dos bowls de ceviche de salmón con pimentones sobre una tabla de madera',
  },
  {
    src: '/images/restaurante/plato2.png',
    caption: 'Pastel de jaiba',
    alt: 'Pastel de jaiba gratinado en paila de greda, con pinzas de jaiba y tostadas',
  },
  {
    src: '/images/restaurante/plato3.png',
    caption: 'Sushi de la casa',
    alt: 'Tabla de sushi variado sobre un tronco, con el bosque nevado de fondo',
  },
  {
    src: '/images/restaurante/plato7.png',
    caption: 'Chupe de mariscos',
    alt: 'Chupe de mariscos en bowl de greda, con limón y pan tostado',
  },
];
