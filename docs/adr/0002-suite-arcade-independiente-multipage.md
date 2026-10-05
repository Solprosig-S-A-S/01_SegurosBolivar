# ADR 0002: Suite de Videojuegos Desacoplada Multi-Página con Persistencia Local

## Estado
Aceptado

## Contexto
Originalmente se contempló empaquetar toda la suite de 5 videojuegos educativos en un único archivo monolítico `index.html`. Sin embargo, cada juego cuenta con mecánicas físicas complejas diferenciadas (físicas de fluidos en Canvas, balística parabólica, matrices de compatibilidad tipo tetris, arrastre táctil y animaciones slapstick SVG), lo cual incrementaría la complejidad ciclomática y el peso del DOM en una sola página móvil.

## Decisión
1. Desacoplar la suite en 5 archivos HTML autónomos (`game1_sga_hazard.html` a `game5_slime_invasor.html`) y 1 Hub central de navegación (`index.html`).
2. Mantener un contrato unificado de persistencia reactiva en `localStorage` bajo la clave `'sb_solprosig_arcade_state'` (con soporte de retrocompatibilidad para `'sb_kma_arcade_state'`).
3. Diseñar cada juego para ser completamente jugable tanto de manera individual (aislado) como enlazado desde el Hub.
4. Implementar enlaces bidireccionales con botones "Volver al Hub" y "Siguiente Nivel" para garantizar continuidad formativa.

## Consecuencias
- **Positivas:**
  - Cero colisión de bucles de animación Canvas (`requestAnimationFrame`).
  - Carga ultrarrápida e independiente de cada módulo en smartphones de obra.
  - Facilidad de mantenimiento, depuración y adición de nuevos niveles.
- **Negativas:**
  - Requiere que la persistencia en `localStorage` comparta estrictamente el mismo origen/dominio en el navegador.
