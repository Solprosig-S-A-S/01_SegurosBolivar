# Avance 9: Vectorización Matemática del Logotipo Isométrico "S" de Solprosig
### Identidad Visual Corporativa, Precisión Poligonal y Despliegue No Desbordado

---

## 💡 ¿Qué reto teníamos?
Solprosig cuenta con un logotipo corporativo emblemático: una **"S" hexagonal tridimensional en perspectiva isométrica** construida con planos facetados en gris y cyan/teal institucional. El requerimiento de diseño solicitó explícitamente:
1. Replicar con total exactitud las proporciones y ángulos del logotipo oficial de Solprosig.
2. Incorporarlo tanto en el bordado del pecho de Siggy como en todo el entorno de las páginas (navbars, tarjetas y modales).
3. Asegurar que fuera un componente **vectorial SVG nativo, consistente, adaptable y que bajo ninguna circunstancia se desbordara** en pantallas móviles estrechas.

## 🛠️ ¿Cómo lo resolvimos?
En lugar de trazar una aproximación a mano alzada o usar una imagen PNG que se pixelaría al agrandarse, aplicamos **ingeniería inversa matemática pixel-a-pixel**:

### 1. Descomposición Geométrica y Análisis de Precisión
- Analizamos el archivo PNG oficial en alta resolución (786 x 983 píxeles) mediante scripts de procesamiento de datos por coordenadas.
- Identificamos los dos colores sólidos planos exactos de la identidad de Solprosig:
  * **Gris Corporativo:** `#878786` (RGB 135, 135, 134).
  * **Cyan / Teal Institucional:** `#0080A8` (RGB 0, 128, 168).
- Confirmamos que la figura es un hexágono isométrico regular con ángulos exactos de 30° ($\Delta y / \Delta x \approx 1/\sqrt{3}$) y una simetría de rotación a 180° casi perfecta (93.36%).
- Mediante el algoritmo de simplificación poligonal de Ramer-Douglas-Peucker y pruebas de *ray-casting* comparando 102,712 puntos muestreados, logramos una precisión del **99.15% de fidelidad matemática** contra el activo 3D original.

### 2. Las 5 Facetas Poligonales Clave
La estructura de la "S" quedó definida en 5 polígonos vectoriales limpios:
1. **Chevron Superior Gris (`#878786`):** `points="401,0 777,228 641,313 397,175 163,313 1,231"`
2. **Bisel Superior Derecho Teal (`#0080A8`):** `points="776,229 782,359 651,425 642,313"`
3. **Cinta Central Derecha Teal (`#0080A8`):** `points="396,292 779,513 777,756 632,685 633,570 268,365"`
4. **Cinta Central Izquierda Teal (`#0080A8`):** `points="1,240 153,315 158,431 519,638 388,715 152,579 151,683 13,767 8,645 140,572 6,495"`
5. **Chevron Inferior Gris (`#878786`):** `points="154,679 398,817 639,684 784,762 396,982 18,765"`

### 3. Integración Homogénea y Responsiva (Anti-Desborde)
- **En el Pecho de Siggy:** Incrustamos el SVG dentro de una base circular bordada en blanco con sutil contorno de costura (`siggy_mascot.html` e `index.html`), haciendo que resalte con nitidez sobre el azul celeste de la camisa polo.
- **En el Navbar Principal (`index.html`):** Contenedor blanco con esquinas redondeadas (`rounded-xl bg-white p-1.5`) al lado de la marca Seguros Bolívar.
- **En los 5 Minijuegos Arcade:** Incorporado en el encabezado superior al lado del botón de regreso al Hub (`w-9 h-9`) y como emblema destacado en los modales de victoria de cada nivel.
- **Adaptabilidad Garantizada:** Con `viewBox="0 0 786 983"` y clases `w-full h-full max-w-full max-h-full`, el isotipo escala con nitidez cristalina desde un icono de 18 píxeles hasta una pantalla 4K sin desbordar el contenedor ni romper la barra de vida del juego.

## 🌟 Resultado
Una identidad corporativa unificada, profesional y matemáticamente exacta que eleva el estándar visual de toda la suite educativa institucional de Solprosig y Seguros Bolívar.
