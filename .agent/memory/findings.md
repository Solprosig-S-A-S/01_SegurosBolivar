# Hallazgos y Decisiones Tecnicas

## Decisiones de Arquitectura - Juego 1 (juego1_sga.html)
- **Mecanica Tactil Drag and Drop Nivel Arcade**:
  - Implementado mediante la API nativa de Pointer Events ('pointerdown', 'pointermove', 'pointerup', 'pointercancel'), compatible universalmente con pantallas tactiles (movil) y raton (escritorio).
  - Umbral de deteccion de 6px que distingue de forma limpia entre un toque simple (Tap-to-Select) y un arrastre intencional.
  - Efecto de fisica dinamica: la tarjeta se inclina sutilmente segun la direccion del arrastre ('rotate' dinamico) y resalta las casillas de destino ('drop-target-active' y 'drop-target-hover').
  - Si el usuario suelta la tarjeta sobre el pictograma correcto, se produce la clasificacion inmediata. Si la suelta en un area vacia, regresa con una animacion de retorno elastico ('cubic-bezier').
  - 'pointer-events: none' temporal en la tarjeta en movimiento para permitir que 'document.elementFromPoint' detecte directamente el pictograma subyacente.
- **Doble Modo Operativo (Drag & Drop + Tap Fallback)**:
  - Quienes prefieran arrastrar tienen el feedback visual completo de arrastre y soltado.
  - Quienes prefieran tocar pueden simplemente tocar la tarjeta y luego tocar la casilla de destino, garantizando accesibilidad y cero friccion.

## Decisiones de Arquitectura - Juego 2 (juego2_bodega.html)
- **Perspectiva Isométrica 2.5D en CSS Puro (Preserve-3D + Billboarding)**:
  - Tablero montado sobre `.iso-viewport` (`perspective: 1100px; perspective-origin: 50% 32%`) y `.iso-board` con `transform: rotateX(60deg) rotateZ(-45deg); transform-style: preserve-3d`.
  - Sprites verticales contrarrotados (`transform: rotateZ(45deg) rotateX(-60deg) translateZ(12px)`): orientan las ilustraciones vectoriales SVG perpendicularmente a la cámara sin distorsión tipográfica ni pixelación, proyectando sombra direccional sobre el piso.
- **Red de Conexiones Dinámicas en Vivo (12 Vínculos Ortogonales)**:
  - Detección inmediata de vecinos ortogonales en la matriz 3x3 (`|r1 - r2| + |c1 - c2| === 1`).
  - Líneas de haz luminoso dinámico: verde esmeralda (`#10B981`) para compatibilidad y rojo peligro (`#EF4444`) con pulso estroboscópico y `Screen Shake` para reactividades prohibidas.
- **Segregación de Infracción Crítica (Art. 20 Res. 773/2021)**:
  - La botella de gaseosa con químico bloquea su colocación en el almacén regular emitiendo advertencia de infracción grave de SST.
  - Se implementó una **Zona de Rechazo & RESPEL** dedicada que convalida el descarte de residuos no conformes conforme al Decreto 4741 de 2005.
- **Motor de Audio Web API y Efectos Particulares**:
  - Retroalimentación auditiva sintetizada (tonos sinusoidales, triangulares y diente de sierra) y partículas canvas para retroalimentación visual en tiempo real.
- **Ergonomía Visual y Escalado Tipográfico Universal**:
  - Eliminación total de micro-fuentes (`text-[7px]` a `text-[10px]`).
  - Adopción de tokens estándar Tailwind (`text-xs sm:text-sm` a `text-base sm:text-lg`) con `leading-relaxed` y `break-words`.
  - Ampliación del ancho de cabina táctica (`max-w-xl md:max-w-2xl lg:max-w-3xl`) y del modal de matriz química (`max-w-2xl`) para máxima legibilidad sin distorsión en la perspectiva isométrica 2.5D.

## Decisiones de Arquitectura - Suite Completa (CSS Nativo & Eliminación de Tailwind)
- **Desacople 100% de Tailwind CSS**:
  - Se eliminó el CDN externo `cdn.tailwindcss.com` de los tres juegos (`juego1_sga.html`, `juego2_bodega.html`, `juego3_trasiego.html`).
  - Beneficios inmediatos: cero dependencias en tiempo de carga, inmunidad a caídas de CDN, código HTML y JS limpio y legible sin cadenas de 15 clases utilitarias concatenadas.
- **Tokens de Diseño Centralizados (:root)**:
  - Paleta institucional unificada: Verde Bolívar (`#006738`, `#008244`), Amarillo Bolívar (`#FFC72C`), Rojo Peligro (`#EF4444`).
  - Escala tipográfica ergonómica: `--font-xs: 0.8125rem` (13px), `--font-sm: 0.9375rem` (15px), `--font-base: 1.0625rem` (17px), `--font-lg: 1.25rem` (20px), `--font-xl: 1.5rem` (24px), `--font-2xl: 1.875rem` (30px). Resuelve la queja de fuentes diminutas en pantallas táctiles y móviles.
- **Componentes Semánticos Autocontenidos**:
  - `juego1_sga.html`: `.chem-card`, `.pictogram-tile`, `.exam-card`, `.btn-inspect-fds`, `.modal-dialog`, `.fds-section-card`, `.comic-bubble`.
  - `juego2_bodega.html`: `.iso-viewport`, `.iso-board`, `.iso-cell`, `.tray-card`, `.cell-hazard-badge`, `.finding-card`, `.matrix-table`.
  - `juego3_trasiego.html`: `.telemetry-grid`, `.stat-card`, `.switch-card`, `.consequence-banner`, `.audit-card`.

