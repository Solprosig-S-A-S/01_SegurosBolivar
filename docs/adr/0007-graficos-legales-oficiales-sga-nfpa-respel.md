# ADR 0007: Implementación de Activos Vectoriales Legales Idénticos a la Normatividad (SGA, NFPA 704 y RESPEL)

## Estado
Aceptado

## Fecha
2026-10-05

## Contexto y Planteamiento del Problema
En el desarrollo de la Suite Arcade de Seguridad Química para Seguros Bolívar y Solprosig, los minijuegos contaban inicialmente con iconos tipográficos y marcadores visuales aproximados (ej. FontAwesome). Sin embargo, en el marco de la capacitación obligatoria de salud y seguridad en el trabajo (SG-SST) en obras civiles e infraestructura vial, las regulaciones colombianas e internacionales exigen el reconocimiento inequívoco de la señalización real.

Las normativas aplicables incluyen:
1. **Decreto 1496 de 2018 y Resolución 773 de 2021 (Ministerio del Trabajo):** Adopción del Sistema Globalmente Armonizado (SGA / GHS de Naciones Unidas - UNECE) para clasificación y etiquetado de productos químicos en lugares de trabajo, así como la prohibición expresa del reenvase en recipientes destinados a alimentos o bebidas (Art. 12).
2. **Decreto 1079 de 2015 (Ministerio de Transporte):** Reglamentación del transporte terrestre de mercancías peligrosas, exigiendo el uso de la Placa Naranja de Naciones Unidas con número de identificación de peligro y número UN de sustancia.
3. **Norma NFPA 704:** Diamante de materiales peligrosos para respuesta ante emergencias de bomberos e instalaciones industriales (Salud, Inflamabilidad, Inestabilidad y Especial).
4. **Decreto 4741 de 2005 (Ministerio de Ambiente):** Gestión y etiquetado obligatorio de Residuos Peligrosos (RESPEL) generados en actividades de mantenimiento y taller.

El objetivo fue crear activos visuales 100% idénticos a los estándares legales de campo sin recurrir a imágenes de mapa de bits (PNG, JPG) que comprometerían el rendimiento móvil, la resolución responsiva y la capacidad de operación sin conexión a internet.

---

## Decisión Arquitectónica
Se adopta una arquitectura de activos puramente procedimentales y vectoriales (SVG Inline y Canvas 2D Path blitting):

1. **Los 9 Rombos Oficiales del SGA (UNECE GHS Rev. 9):**
   - Geometría estandarizada: Rombo a 45° con marco rojo UNECE (`#DA291C`, ancho relativo 7px), fondo blanco (`#FFFFFF`) y trazados vectoriales oficiales en negro (`#000000`).
   - Disponibles como generador funcional `getGhsSvg(id, size)` y pre-cacheados como bitmaps en memoria (`GHS_CANVAS_IMAGES`) para renderizado a 60 FPS dentro de Canvas 2D en `game1_sga_hazard.html`.
   - Incorporados en cabeceras de cuadrantes y tarjetas en `game2_bodega_peligro.html`.

2. **Etiqueta Legal de 6 Bloques (Res. 773/2021 Art. 6):**
   - Renderizado dinámico en cada caneca de 55 galones: identificador del producto, franja con palabra de advertencia reglamentaria (*PELIGRO* / *ATENCIÓN*), rombo oficial SGA blitteado, código de peligro (*H225*, *H314*, etc.) y punto de acceso al visor FDS de 16 secciones.

3. **Placa Naranja UN 1202 y Diamante NFPA 704 (Dec. 1079/2015):**
   - Renderizado vectorial en `game3_combustible_nitro.html` sobre el camión cisterna: placa naranja `#FF7900` con marco negro y divisor central mostrando el código de riesgo `30` y el número UN `1202` (ACPM / Diésel), junto al diamante NFPA 704 cuatripartito (Azul 2, Rojo 2, Amarillo 0, Blanco vacío) y rombo GHS de líquidos inflamables.

4. **Etiquetado Oficial RESPEL (Dec. 4741/2005):**
   - Implementado en las canecas de taller de `game4_meca_dress_respel.html` y en la bolsa de recolección de derrames de `game5_slime_invasor.html`: rótulo reglamentario con cabecera de peligro amarilla (*⚠ RESIDUOS PELIGROSOS*), rombo de peligro químico, datos del generador (*SOLPROSIG S.A.S.*) y leyenda de disposición final.
   - Envase trampa en `game2_bodega_peligro.html`: modelado como botella plástica de refresco con cinta de embalaje y franja perimetral de advertencia legal que cita la infracción de la Resolución 773/2021.

---

## Consecuencias y Beneficios

### Positivas
- **Transferencia Pedagógica Real:** Los trabajadores entrenados identifican de forma idéntica los rótulos y pictogramas reales en campo sin discrepancias visuales.
- **Cero Dependencias de Red:** 0 descargas de imágenes externas; el peso total de los archivos HTML se mantiene ultraligero y el juego opera 100% offline.
- **Rendimiento a 60 FPS:** El precacheo de SVGs vectoriales mediante Data URIs decodificadas directamente en memoria Canvas previene caídas de framerate en dispositivos móviles de gama baja.
- **Resolución Infinita:** Escalabilidad vectorial nítida en pantallas táctiles de cualquier densidad de píxeles (DPI).

### Negativas / Mitigaciones
- **Mayor volumen de líneas de trazado en código fuente:** Mitigado centralizando el diccionario de vectores en funciones generadoras compactas (`getGhsSvg`) y métodos de dibujo Canvas reutilizables.
