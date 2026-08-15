# -----------------------------------------------------------------------------
# Genera la tarjeta de previsualización que se ve al compartir el enlace
# (WhatsApp, Facebook, Instagram, LinkedIn) → public/og/og-refugio.jpg
#
# Por qué un archivo y no `ImageResponse` de next/og: esa API solo emite PNG, y
# una fotografía a 1200×630 en PNG pesa entre 1,5 y 2,5 MB. WhatsApp descarta
# la miniatura por encima de ~600 KB —hay clientes que cortan bastante antes—,
# así que el formato tiene que ser JPEG. Acá se apunta a menos de 250 KB.
#
# Medidas: 1200×630 (relación 1.91:1) es el formato de tarjeta ancha. Una
# imagen cuadrada —el logotipo suelto, por ejemplo— cae en la miniatura chica
# de WhatsApp en vez de la tarjeta grande.
#
# Para regenerarla:  python scripts/og-card.py
# -----------------------------------------------------------------------------
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / 'public' / 'og' / 'og-refugio.jpg'

ANCHO, ALTO = 1200, 630

# Paleta del logotipo — ver tailwind.config.ts
NAVY = (6, 38, 54)
CREMA = (245, 240, 232)
ORO = (245, 169, 79)

# Georgia es la tipografía de respaldo que ya declara la pila serif del sitio
# (tailwind.config.ts), así que la tarjeta no introduce una letra ajena.
FUENTES = Path('C:/Windows/Fonts')


def texto_espaciado(draw, xy, texto, fuente, fill, tracking):
    """Dibuja con interletrado y centrado horizontal en `xy[0]`.

    Pillow no tiene `letter-spacing`, así que el texto se compone signo a
    signo. Sin esto las líneas en versales quedan apretadas, que es justo lo
    que el resto del sitio evita.
    """
    anchos = [draw.textlength(c, font=fuente) for c in texto]
    total = sum(anchos) + tracking * (len(texto) - 1)
    x = xy[0] - total / 2
    for c, w in zip(texto, anchos):
        draw.text((x, xy[1]), c, font=fuente, fill=fill)
        x += w + tracking
    return total


def recorte_cubriendo(im, ancho, alto):
    """Equivalente a `object-fit: cover`: escala y recorta sin deformar."""
    escala = max(ancho / im.width, alto / im.height)
    im = im.resize((round(im.width * escala), round(im.height * escala)), Image.LANCZOS)
    izq = (im.width - ancho) // 2
    # El recorte vertical va por encima del centro: en la toma cenital la
    # mitad inferior es casi todo bosque, y el complejo queda arriba.
    arr = max(0, (im.height - alto) // 2 - round(im.height * 0.04))
    return im.crop((izq, arr, izq + ancho, arr + alto))


def main():
    fondo = Image.open(RAIZ / 'public' / 'images' / 'hero' / 'hero.webp').convert('RGB')
    lienzo = recorte_cubriendo(fondo, ANCHO, ALTO).convert('RGBA')

    # Velo navy parejo: la toma aérea es verde clarísima y el texto crema no
    # se sostiene encima sin bajarla.
    lienzo.alpha_composite(Image.new('RGBA', (ANCHO, ALTO), NAVY + (150,)))

    # Refuerzo vertical, más denso abajo, donde van las líneas de texto.
    velo = Image.new('RGBA', (ANCHO, ALTO), (0, 0, 0, 0))
    px = velo.load()
    for y in range(ALTO):
        t = y / (ALTO - 1)
        px[0, y] = NAVY + (int(40 + 150 * t ** 2),)
    velo = velo.resize((ANCHO, ALTO))
    lienzo.alpha_composite(velo)

    # ── Logotipo ──
    # Va el sello (logo-badge) y no el logotipo completo: la versión larga
    # rodea el círculo con "RESTAURANTE Y CABAÑAS" en navy, que sobre una foto
    # oscura no se lee. Además esos rubros ya salen en la línea de abajo. Es
    # el mismo archivo que usa la barra de navegación.
    logo = Image.open(RAIZ / 'public' / 'logo' / 'logo-badge.png').convert('RGBA')
    lado = 300
    y_logo = 98
    logo = logo.resize((lado, lado), Image.LANCZOS)
    lienzo.alpha_composite(logo, ((ANCHO - lado) // 2, y_logo))

    draw = ImageDraw.Draw(lienzo)
    centro_x = ANCHO / 2

    # ── Filete dorado ──
    y_filete = y_logo + lado + 30
    draw.line([(centro_x - 90, y_filete), (centro_x + 90, y_filete)], fill=ORO + (190,), width=2)

    # ── Rubros ──
    f_rubros = ImageFont.truetype(str(FUENTES / 'georgia.ttf'), 30)
    texto_espaciado(draw, (centro_x, y_filete + 34),
                    'RESTAURANTE · CAFETERÍA · CABAÑAS · EVENTOS',
                    f_rubros, CREMA + (255,), 3.2)

    # ── Ubicación ──
    f_lugar = ImageFont.truetype(str(FUENTES / 'georgia.ttf'), 22)
    texto_espaciado(draw, (centro_x, y_filete + 84),
                    'CHAITÉN · CARRETERA AUSTRAL · PATAGONIA CHILENA',
                    f_lugar, ORO + (255,), 4.0)

    SALIDA.parent.mkdir(parents=True, exist_ok=True)
    final = lienzo.convert('RGB')

    # Se baja la calidad hasta entrar en presupuesto. 250 KB deja margen
    # cómodo frente al corte de WhatsApp.
    for q in (88, 84, 80, 76, 72, 68):
        final.save(SALIDA, 'JPEG', quality=q, optimize=True, progressive=True)
        peso = SALIDA.stat().st_size
        if peso <= 250 * 1024:
            break
    print(f'{SALIDA.relative_to(RAIZ)} — {ANCHO}x{ALTO}, calidad {q}, {peso/1024:.0f} KB')


if __name__ == '__main__':
    main()
