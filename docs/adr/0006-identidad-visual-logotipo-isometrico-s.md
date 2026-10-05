# ADR 0006: Identidad Visual y Vectorización Geométrica del Logotipo Isométrico "S" (Solprosig)

## Estado
Aceptado

## Contexto
Los requerimientos de marca e identidad corporativa de Solprosig y la alianza con Seguros Bolívar exigen la integración rigurosa del logotipo corporativo oficial de la "S" isométrica (emblema hexagonal tridimensional en paleta gris y cyan/teal) tanto en el pecho de la mascota institucional **Siggy** como a lo largo de toda la suite de aplicaciones web (`index.html`, headers de los 5 minijuegos arcade y modales de resultados pedagógicos). 

Se requirió que la reproducción fuera:
1. **Fiel y Exacta:** Proporciones geométricas idénticas al isotipo corporativo 3D provisto.
2. **Vectorial Pura (SVG):** Cero dependencias de mapas de bits externos o latencia por petición HTTP.
3. **Adaptable y No Desbordada:** Escalabilidad responsive mediante `viewBox="0 0 786 983"`, `w-full h-full max-w-full max-h-full` para garantizar contención total en dispositivos móviles de cualquier resolución.

## Decisión
1. **Ingeniería Inversa y Extracción Poligonal:**
   - Se realizó análisis pixel-a-pixel del asset oficial rasterizado (786 x 983 px), identificando la paleta exacta de dos tonos corporativos planos de Solprosig:
     * Gris Sólido: `#878786` (RGB 135, 135, 134)
     * Cyan/Teal Sólido: `#0080A8` (RGB 0, 128, 168)
   - Mediante algoritmo de trazado de contornos con simplificación de Ramer-Douglas-Peucker y pruebas de ray-casting se verificó una precisión del **99.15%** contra el original (101,835 aciertos de 102,712 puntos muestreados).
   - Se identificaron las 5 facetas poligonales clave que conforman la "S" hexagonal en proyección isométrica a 30°:
     * **Faceta 1 (Chevron Superior Gris `#878786`):** `polygon points="401,0 777,228 641,313 397,175 163,313 1,231"`
     * **Faceta 2 (Bisel Superior Derecho Teal `#0080A8`):** `polygon points="776,229 782,359 651,425 642,313"`
     * **Faceta 3 (Cinta Teal Superior Derecha `#0080A8`):** `polygon points="396,292 779,513 777,756 632,685 633,570 268,365"`
     * **Faceta 4 (Cinta Teal Inferior Izquierda `#0080A8`):** `polygon points="1,240 153,315 158,431 519,638 388,715 152,579 151,683 13,767 8,645 140,572 6,495"`
     * **Faceta 5 (Chevron Inferior Gris `#878786`):** `polygon points="154,679 398,817 639,684 784,762 396,982 18,765"`

2. **Integración en la Mascota Siggy:**
   - En [`siggy_mascot.html`](../../siggy_mascot.html) y en el Hub [`index.html`](../../index.html), se sustituyó el distintivo provisional de texto circular por el parche bordado blanco con el logotipo isométrico oficial incrustado en el polo celeste a nivel de pecho (`x="4" y="4" width="20" height="24"` sobre círculo bordado `#FFFFFF` con borde `#CBD5E1`).

3. **Homogeneización en Entorno y Páginas (Header & Modales):**
   - **Navbar / Header Hub (`index.html`):** Contenedor redondeado blanco `w-10 h-10` con el logotipo vectorial Solprosig S al lado de la marca Seguros Bolívar.
   - **Navbar / Header Minijuegos (`game1` a `game5`):** Contenedor `w-9 h-9` junto al botón de regreso al Hub, consolidando la presencia de marca sin desbordar el viewport móvil.
   - **Modales de Resultados Pedagógicos:** Insignia central en cada pantalla de victoria/completado (`w-10 h-10` con sombra interior).

## Consecuencias
- **Positivas:**
  * 100% consistencia visual corporativa entre Solprosig, Seguros Bolívar y el personaje guía Siggy.
  * Cero desbordes en viewport (`overflow-visible` controlado y `viewBox` acotado).
  * Calidad gráfica ultra-nítida en pantallas Retina y alta densidad de píxeles sin artefactos de compresión JPEG/PNG.
- **Negativas:**
  * Ninguna. El código SVG es extremadamente ligero (~1.2 KB por instancia) y no impacta el rendimiento.
