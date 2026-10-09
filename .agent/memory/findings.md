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

## Decisiones de Arquitectura - Juego 4 (juego4_taller.html)
- **Perspectiva Isométrica 2.5D Multiescenario por Separado y Espacio Ampliado (500x500 px)**:
  - En lugar de renderizar ambas zonas de forma simultánea y comprimida, se implementaron dos escenarios completos e independientes (`#stage-vestidor` y `#stage-workshop`) con conmutación dinámica (`switchZone`).
  - Se escaló el mundo de 400x400 a 500x500 px con viewport de 640px de altura, y la grilla de baldosas a 100px x 100px por celda (25 baldosas por cuarto), brindando amplitud y comodidad ergonómica.
  - Cada escenario cuenta con su propio `.iso-world` centrado con CSS 3D Transforms.
- **Solución al Problema de Oclusión Visual ("Esa pared tapa todo")**:
  - Diagnóstico: `.iso-wall-right` poseía `width: 170px` con `transform: rotateY(-90deg)`, levantándose como un muro monolítico de 170px a lo largo de la arista frontal-izquierda en perspectiva isométrica, ocultando totalmente los casilleros, el banco y el suelo.
  - Solución: Se redujo `.iso-wall-right` a un **zócalo perimetral arquitectónico bajo (`width: 32px`)** con `backface-visibility: hidden;` y franjas de advertencia industrial. Se reubicaron los letreros y elementos a la pared de fondo (`iso-wall-left`), garantizando visibilidad 100% limpia de todo el cuarto.
- **Sistema de Rotación 3D en 90° con Billboarding Dinámico**:
  - Se añadieron controles directos en la barra HUD: `[ ⟲ -90° ]`, lector de brújula (`0° Norte`, `90° Este`, `180° Sur`, `270° Oeste`) y `[ 🔄 +90° ]`.
  - Billboarding dinámico mediante variables CSS: `--counter-rot-z: ${-rotZ}deg` y `--counter-rot-x: ${-rotX}deg` en `.iso-prop` e `.iso-avatar`, de modo que al rotar el mundo en cualquiera de los 4 ángulos cardinales, los objetos y el operador encaran perpendicularmente al jugador sin deformación.
  - Paredes con `backface-visibility: hidden;` evitan que los muros traseros bloqueen la vista al girar 180°.
- **Calibración de Centrado y Ergonomía Visual**:
  - Coordenadas de reposo calibradas en `--pan-x: 0px; --pan-y: 35px;` para centrado matemático perfecto en el viewport de 640px.
  - Avatares posicionados inicialmente en el centro exacto de la habitación `(250, 250)`.
  - Props redistribuidos con holgura para evitar agrupaciones densas.
- **Transición Cinematográfica entre Escenarios**:
  - Al completar la verificación del 100% de EPP en el vestidor y validar en el checkpoint biométrico, se detona una animación de apertura de compuertas con sonido hidráulico y un overlay cinematográfico (`scene-transition-overlay`) que traslada al jugador al patio de mantenimiento.
- **Props Isométricos de Alta Definición**:
  - **Vestidor**: Batería de 3 casilleros metálicos (`#01` interactivo, `#02` y `#03` de ambientación), banco central de vestidor en roble/acero, pediluvio sanitario de calzado, perchero de dotación limpia y puerta blindada con escáner láser.
  - **Patio de Taller**: Banco pesado de desengrase con tornillo de banco y piñón animado, motor diesel sobre soporte hidráulico con **bandeja de goteo antiderrame profunda**, estación de acopio RESPEL con 3 contenedores (filtros, trapos/sólidos y tambor de aceite montado explícitamente sobre **estiba antiderrame de polietileno con rejilla de drenaje**), gabinete para kit de control de derrames y carro rodante de herramientas.
- **Simplificación Extrema de la Barra Superior (Anti-Clutter UX)**:
  - La presencia simultánea de 11 botones (flechas de traslación, zoom +/-, centrado, brújula y giros) generaba sobrecarga visual y ruido cognitivo innecesario sobre el viewport isométrico.
  - Siguiendo la retroalimentación del usuario, se eliminó toda la botonera superflua dejando **exclusivamente un único botón flotante: `[ 🔄 Rotar 90° ]`**, el cual itera fluidamente entre las 4 orientaciones cardinales.
  - La conmutación entre escenarios se delegó de manera natural a las pestañas de fase del HUD (`phase-pill-1` y `phase-pill-2`), liberando el espacio del viewport.
- **Contextualización de la Pantalla y Bandeja Inferior ("Que se sienta útil cada cosa")**:
  - Anteriormente, la bandeja inferior mostraba permanentemente las tareas de taller (desengrase, filtro, RESPEL) incluso cuando el jugador estaba en el vestidor, lo que causaba desconexión semántica.
  - Solución: Se dividió la bandeja en dos vistas autónomas y reactivas:
    - **Zona 1 (Vestidor)**: Muestra objetivos de dotación EPP (`1. Casillero EPP` con contador en vivo `0/4 EPP`, `2. Checkpoint Biométrico` con estado `🔒 Bloqueado` / `🔓 Autorizado`, y `3. Higiene & Pediluvio`). Al tocarlos, el operador se traslada y ejecuta la acción respectiva.
    - **Zona 2 (Patio)**: Muestra la secuencia de mantenimiento (`1. Desengrase`, `2. Filtro y Aceite`, `3. Segregación RESPEL`) con badges de estado (`🎯 Activo`, `⏳ Paso X`, `✓ Hecho`).
  - Se dotó de interactividad a todos los props secundarios (`propSanitizer`, `propGarmentRack`, `propSpillKit`, `propToolCart`), permitiendo que el avatar camine hacia ellos y reciba retroalimentación técnica y normativa (Res. 773/2021, Dec. 4741/2005 y Dec. 1072/2015).
- **Guía Interactiva Paso a Paso para el Escenario 2 (Patio de Mantenimiento)**:
  - Para erradicar la incertidumbre de qué hacer en el patio exterior, se implementaron 3 capas complementarias de guía visual:
    1. **Barra de Ruta Superior (`workshop-roadmap-guide`)**: Píldoras secuenciales conectadas por flechas (`1. Mesa Desengrase ➔ 2. Motor V8 ➔ 3. Punto RESPEL`) con estados activo, completado y bloqueado.
    2. **Balizas 3D Flotantes sobre los Props (`prop-guide-beacon`)**: Balizas con animación vertical bobbing y pulso radial dorado que señalan el objetivo activo y muestran check verde al finalizar.
    3. **Enrutamiento Progresivo & Safety Bot**: Los pasos 2 y 3 no permiten ejecución hasta que el paso anterior se haya completado, guiando al usuario con diálogos específicos emitidos por el Bolívar Safety Bot.
- **Erradicación de Solapamiento en Cuadrícula y Z-Fighting del Suelo**:
  - *Diagnóstico del solapamiento*: En CSS 3D (`rotateX(60deg) rotateZ(-45deg)`), aplicar bordes individuales (`border: 1px solid ...`) a cada elemento `.iso-tile` genera colisiones de redondeo subpixel en el rasterizador del navegador, produciendo líneas dobles asimétricas y solapamientos visibles.
  - *Diagnóstico de corte negro horizontal*: Los sprites de props tenían `transform-origin: 50% 90%` y bases flotantes, lo que proyectaba el 10% inferior del modelo 3D por debajo del plano Z=0, provocando una línea de intersección geométrica brusca que cortaba el piso.
  - *Solución*:
    - La cuadrícula del suelo se renderiza de forma continua en `.iso-room-zone` usando `linear-gradient(to right, ...)` y `linear-gradient(to bottom, ...)`, asegurando continuidad matemática perfecta sin uniones subpixel.
    - Las celdas individuales `.iso-tile` tienen `border: none` y resaltan interactividad mediante sombras internas (`box-shadow: inset ...`).
    - Todos los props e indicadores ahora usan `transform-origin: 50% 100%`, `bottom: 0` y `translateZ(0px)`, anclando la base exactamente sobre la superficie del piso sin penetrar hacia abajo.
- **Depuración Visual Radical (Anti-Clutter) y Espacios Comprensibles**:
  - Se eliminaron todos los props no vinculados a las tareas normativas: banco central, pediluvio y perchero en vestidor; cajonera rodante y gabinete de derrames en patio.
  - El Vestidor quedó enfocado exclusivamente en: (1) Casillero de Dotación EPP y (2) Checkpoint Biométrico con puerta blindada.
  - El Patio quedó distribuido en una disposición triangular despejada con sus 3 estaciones canónicas: (1) Mesa de Desengrase, (2) Soporte con Motor V8 y bandeja antiderrame integrada, y (3) Estación RESPEL (Filtros, Trapos y Tambor de Aceite con Estiba Antiderrame).
- **Calibración de Escala Isométrica y Ergonomía de Props ("Son demasiado grandes")**:
  - *Diagnóstico*: En perspectiva 2.5D, los props se comportaban visualmente como carteles publicitarios gigantes (estación RESPEL de 280px de ancho y motor de 145px en una cuadrícula de 500px), superando 5 veces el tamaño del avatar y provocando que las balizas superiores colisionaran entre sí en la proyección ortogonal.
  - *Solución*:
    - **Patio de Taller**: Mesa de desengrase escalada a 78x64px y Motor V8 a 78x68px (proporción humana real: altura a cintura/pecho del avatar). Estación RESPEL reducida a 145x66px (altura de los botes a muslos del operador), montada sobre estiba antiderrame compacta y ubicada en (175, 340) para despejar completamente el centro del patio.
    - **Vestidor**: Casilleros reducidos a 100x92px y Puerta Checkpoint a 78x102px (proporción que supera levemente la altura del avatar de 96px, simulando una puerta de acceso ergonómica).
    - **Balizas Flotantes 3D**: `top` reducido de -55px a -26px, padding y badges reducidos, y títulos condensados ("Desengrase", "Motor V8", "RESPEL") para evitar colisiones aéreas.
    - **Waypoints de Navegación**: Coordenadas de `moveAvatarTo` recalibradas a las nuevas caras frontales de los objetos para un posicionamiento natural del operador.
- **Detalle de Pulido: Demarcaciones de Seguridad en el Suelo e Interactividad de Pared**:
  - *Demarcaciones de Seguridad SST (`.floor-safety-zone`)*: Integración de rectángulos perimetrales en el plano Z=0 del piso (con bordes discontinuos y fondos tenues al 3.5% de opacidad) que demarcan normativamente las estaciones de trabajo (Res. 2400/1979) sin añadir volumen vertical, colisiones ni oclusión visual.
  - *Equipos de Emergencia de Pared*: Conexión de listeners táctiles en el lavaojos (ANSI Z358.1) y en el extintor de 20lb (NFPA 10) de la pared de fondo con feedback pedagógico emitido por el Bolívar Safety Bot y retroalimentación auditiva sintetizada.
- **Resolución de Desfase de Navegación en Escenario Rotado ("Se mueve a cualquier parte cuando presiono")**:
  - *Causa Raíz*: La caja del sprite `.iso-avatar` tiene dimensiones de 56x96px con `transform-origin: 50% 100%`. Al mover el avatar con `gsap.to(avatar, { left: targetX, top: targetY })`, la esquina superior izquierda se posicionaba en las coordenadas de destino, pero el centro de los pies quedaba desfasado en `(+28px, +96px)`. En la proyección isométrica, este vector local se proyectaba como una desviación en pantalla de **+87.7px hacia la derecha** (a rotación -45°), y en ángulos rotados (45°, 135°, 225°) proyectaba desvíos en direcciones opuestas y asimétricas, haciendo que el avatar pareciera caminar a lugares aleatorios.
  - *Solución*:
    - **Alineación de Anclaje Z=0**: Se agregaron `margin-left: -28px; margin-top: -96px;` a `.iso-avatar`, situando el origen `(50%, 100%)` exactamente en `(targetX, targetY)`. Ahora el punto de contacto de los pies y la sombra coinciden con precisión milimétrica ($\Delta = 0$) con el centro de la baldosa pulsada, en cualquiera de las 4 orientaciones cardinales.
    - **Filtrado de Cámara Anti-Arrastre**: Se añadió la bandera `_hasDraggedCamera` en `pointermove` (>8px) para evitar que un reencuadre o arrastre de la pantalla detone un movimiento involuntario de caminata.
    - **Interrupción Dinámica y Orientación Horizontal**: Al presionar una nueva baldosa mientras el avatar se desplaza, `gsap.killTweensOf(avatar)` cancela la trayectoria anterior y calcula la nueva ruta desde la posición real en curso, volteando el sprite horizontalmente (`scaleX: 1 / -1`) hacia la dirección del destino.
- **Resolución de Desfase de la Baliza de Brillo ("El brillo de a donde se mueve se va para otro lado")**:
  - *Causa Raíz*:
    1. Los elementos DOM `<div class="tap-destination-beacon" id="tap-beacon-vestidor">` y `id="tap-beacon-workshop">` estaban ubicados como hijos directos de `.iso-scene-stage` (el contenedor 2D plano exterior sin rotación) en lugar de estar dentro de `.iso-world` (el contenedor isométrico 3D transformado por `rotateX(60deg) rotateZ(rotZ)`). Al asignar `beacon.style.left = targetX` y `beacon.style.top = targetY`, se proyectaban coordenadas del espacio isométrico local en la pantalla plana 2D, resultando en un desfase espacial severo.
  - *Solución*:
    - **Reubicación DOM**: Se trasladaron ambos beacons al interior de su respectivo `#world-vestidor` y `#world-workshop`, compartiendo el mismo sistema de coordenadas ortogonal del plano del suelo.
    - **Centrado Robusto vía Márgenes**: Se asignó `margin-left: -17px; margin-top: -17px;` (para un círculo de 34x34px) y `transform: translateZ(2px); transform-style: preserve-3d;`, asegurando que `(targetX, targetY)` sea el centro exacto de la baldosa y que las animaciones de escala de GSAP pulsen concéntricamente sobre el suelo 3D sin colisiones de transformación.
    - **Cancelación de Tweens Previos**: En `moveAvatarTo`, se incorporó `gsap.killTweensOf(beacon)` para reiniciar limpiamente el pulso lumínico en caso de pulsaciones rápidas consecutivas.
- **Resolución de Puntos Muertos de Clic entre Baldosas ("Cuando presiono entre baldosas no se mueve a ningún lado")**:
  - *Causa Raíz*:
    1. Las baldosas individuales de 100x100px compartían aristas exactas en un contenedor `.iso-room-zone` con `border: 2px solid` y `box-sizing: border-box`. Los 4px de borde reducían el espacio interno a 496px, provocando desalineaciones en los límites. Además, el antialiasing subpixel de CSS 3D dejaba micro-rendijas infinitesimales en las costuras donde el hit-test del navegador impactaba a `.iso-room-zone` directamente en vez de a `.iso-tile`.
    2. El listener de clic estaba suscrito exclusivamente a `.iso-tile`, por lo que cualquier toque en la costura o borde no detonaba ninguna acción.
  - *Solución*:
    - **Solapamiento Milimétrico de Hitboxes**: Se configuró en `.iso-tile` `width: 100%; height: 100%; margin: -2px; padding: 2px; box-sizing: content-box;`, creando un solapamiento invisible de 4px en todas las aristas y esquinas entre baldosas vecinas, erradicando cualquier rendija física.
    - **Contenedor 500x500 sin Reducción**: Se reemplazó el `border` de `.iso-room-zone` por `box-shadow: 0 0 0 2px ...` y `box-sizing: content-box;`, garantizando una superficie matemática perfecta de 500x500px para la cuadrícula 5x5.
    - **Manejo Unificado y Respaldo por Zona**: Se añadió `handleFloorClick` tanto en las baldosas individuales como en `.zone-locker-room` y `.zone-workshop-yard`. Si un clic impacta el contenedor en un borde o costura, se calcula la celda matemática `(col, row)` mediante `Math.floor(offset / 100)` y se orienta el avatar de inmediato.
    - **Calibración Táctil**: Umbral de arrastre elevado de 8px a 16px.
- **Reestructuración de Jerarquía Visual y Despeje de Pantalla ("No se ve bien estructurado")**:
  - *Diagnóstico*:
    1. *Oclusión del Bot*: El toast de validación técnica (`.tech-feedback-toast`) estaba posicionado en `position: absolute; top: 110px; right: 18px;`, cayendo directamente sobre el texto de diálogo del Bolívar Safety Bot y tapando las explicaciones pedagógicas.
    2. *Congestión Vertical*: Se encontraban apiladas 4 filas consecutivas entre el bot y el escenario (Pestañas de zona + texto de guía de patio + barra flotante con botón rotar + barra flotante de 3 pasos), lo que reducía drásticamente el espacio vertical del escenario 3D.
    3. *Desbordamiento Horizontal*: La barra `workshop-roadmap-guide` incluía un título largo (`GUÍA DE PATIO:`) y pastillas anchas que superaban los 450px, saliéndose de la pantalla en dispositivos móviles y monitores compactos.
  - *Solución*:
    - **Reubicación Fija del Toast**: Se trasladó `.tech-feedback-toast` a `position: fixed; bottom: 24px; right: 20px; z-index: 1000; transform: translateY(140%);`, emergiendo limpiamente en la esquina inferior derecha sin tapar jamás el diálogo del bot ni el escenario.
    - **Barra de Control Unificada**: Se integraron las pestañas de zona (`Vestidor` y `Patio Taller`), el badge de estado y el botón de rotación `[ 🔄 Girar 90° ]` en una sola fila compacta (`.stage-indicator-bar`), eliminando el toolbar flotante que bloqueaba el cielo del viewport 3D.
- **Resolución de Inestabilidad de Tamaño, Desborde y Borrosidad en Tarjetas RESPEL ("Se les cambia el tamaño y traspasan donde están puestas, además se ve demasiado borroso")**:
  - *Diagnóstico*:
    1. *Desborde Horizontal y Salto de Tamaño*: Las tarjetas de residuo se organizaban con `display: flex; gap: 10px; justify-content: space-around;` y `flex: 1` sin ancho mínimo fijo ni cuadrícula rígida. Al depositar un residuo, se inyectaba vía JavaScript `itemElem.innerHTML += '<div style="...">CONFINADO ✓</div>'`, lo que reescribía todo el DOM interno, añadía altura dinámica de golpe y forzaba el recalculo del contenedor flex, provocando que la tercera tarjeta (`Aceite Usado`) se desbordara y traspasara el borde derecho del recuadro contenedor.
    2. *Desenfoque e Ilegibilidad Visual*: Al ser confinado, el script le aplicaba `itemElem.style.opacity = '0.35'`, derrumbando el contraste de los textos pequeños sobre el fondo azul oscuro (`#0f172a`) y provocando un aspecto de mancha ilegible y borrosa. Además, la animación elástica con overshoot de escala en `.modal-dialog` (`transform: scale(0.92)` con cubic-bezier `1.275`) causaba que la aceleración de GPU dejara el buffer de fuentes rasterizado en subpíxeles borrosos.
  - *Solución*:
    - **Cuadrícula CSS Grid 3x1 Exacta**: Se migró el contenedor `#respel-items-source` y `#respel-bins-destination` a `display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; width: 100%; box-sizing: border-box;`. Cada tarjeta tiene garantizado exactamente el 33.333% del ancho, siendo físicamente imposible que traspase el borde del contenedor.
    - **Estabilidad Dimensional**: Se integró el badge `.respel-confined-badge` de forma fija en la estructura HTML de cada tarjeta con `visibility: hidden;` por defecto y `visibility: visible;` bajo la clase `.is-confined`. La tarjeta reserva exactamente su espacio físico (`min-height: 155px;`), por lo que su tamaño permanece 100% inalterable antes y después del depósito.
    - **Nitidez Cristalina (Anti-Blur)**: Se eliminó `opacity: 0.35`. La tarjeta confinada se distingue mediante borde verde esmeralda y fondo tintado de alta legibilidad (`background: rgba(6, 78, 59, 0.5)`), manteniendo textos e iconos al 100% de nitidez. En `.modal-dialog`, se incorporaron `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;` y se reemplazó la deformación por escala por un desplazamiento vertical suave (`translateY(16px)` a `translateY(0)`).
- **Resolución Definitiva de Borrosidad y Desborde en Props del Patio de Taller ("Se ve demasiado borroso" / "A la de aceite se le cambia el tamaño y traspasa")**:
  - *Diagnóstico*:
    1. *Desborde y asimetría en tarjeta de Aceite*: En el prop `.prop-respel-station` del suelo, el elemento `<div class="bin-spill-pallet">` (estiba con rayas de cebra) estaba anidado dentro de la tarjeta `#bin-oil`. Esto le daba 3 hijos en lugar de 2, aumentaba su altura efectiva y empujaba el pallet fuera del contenedor hacia abajo, perforando la línea amarilla y el recuadro del suelo.
    2. *Borrosidad por 3D Preserve & Microfuentes*: Los props tenían `transform-style: preserve-3d;`, lo que obligaba a la GPU a proyectar cada etiqueta de texto individualmente en el espacio tridimensional sin antialiasing 2D DirectWrite (ClearType). Además, las fuentes eran microscópicas (0.32rem a 0.44rem = 5px a 7px), convirtiéndose en manchas grises ilegibles. Las balizas de guía en estado bloqueado tenían `opacity: 0.55`, perdiendo contraste contra el piso oscuro.
  - *Solución*:
    - **Aislamiento y Estiba Continua**: Se extrajo el pallet de adentro de `#bin-oil` y se transformó en `.respel-station-pallet`, una base colectora continua bajo las 3 canecas. Ahora Filtros, Trapos y Aceite tienen estructura e idéntica altura (48px) y no sufren saltos de tamaño. Se activó `overflow: hidden;` en la estación.
    - **Aplanamiento a Sprite 2D (Eliminación de preserve-3d)**: Se retiró `preserve-3d` de `.iso-prop` reemplazándolo por renderizado plano con `-webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; image-rendering: -webkit-optimize-contrast; backface-visibility: hidden; translateZ(0);`.
    - **Escalado Tipográfico Nítido y Proporcional**: Dimensiones ajustadas ergonómicamente (Mesa 96x86px, Motor 96x90px, RESPEL 172x92px), tipografías elevadas a 0.58rem-0.68rem (10px-11.5px) con `font-weight: 900`, y balizas bloqueadas con `opacity: 1` y fondos de contraste pizarra (`#1e293b`), logrando nitidez 100% nítida y legible.
- **Implementación de Navegación Táctil Móvil con Dos Dedos ("Mover escenario en teléfono con dos dedos")**:
  - *Diagnóstico*: En pantallas táctiles móviles, si el arrastre de cámara se gestiona con un solo dedo (single pointer), cualquier intento de caminar (Tap-to-Move) o tocar una estación que presente un deslizamiento involuntario de unos pocos píxeles es interpretado como arrastre de cámara, bloqueando el caminar del personaje y generando frustración.
  - *Solución*:
    - **Desacople Táctil Estricto (1 Dedo vs 2 Dedos)**:
      - **1 Dedo**: Dedicado 100% a la interacción y al movimiento del avatar (Tap-to-Move, selección de casilleros, estaciones y botones) sin activar arrastre de cámara.
      - **2 Dedos**: Escucha de eventos `touchstart`/`touchmove` con `e.touches.length === 2`, calculando el punto medio dinámico `(midX, midY)` y la distancia euclidiana entre ambos dedos. Aplica paneo libre del escenario (`panX`, `panY`) y zoom suave proporcional (`scale`) mediante pellizco (`pinch-to-zoom`).
    - **Protección contra Toques Fantasma**: Al levantar los dedos (`touchend`), se mantiene una bandera de supresión de toques de 120ms para impedir que el release del último dedo detone un clic involuntario en una baldosa.
    - **Soporte Preservado en Escritorio**: En PC se mantiene el arrastre mediante clic de ratón (`mousedown`/`mousemove`), garantizando ergonomía multiplataforma.
- **Arquitectura de Simulación 100% en Primera Persona (Juego 5: Brigada de Emergencia)**:
  - *Decisión de Diseño de Cámara (Zero 3rd-Person / Zero Isometric)*:
    - Para responder a la restricción crítica de representar fielmente los ojos del brigadista, se eliminaron avatares en pantalla y se diseñó un viewport panorámico 360° con proyección continua de rumbo cardinal (`translate3d` de 280% de ancho sobre viewport de 100vw/100vh).
    - El marco de la pantalla actúa como la visera de policarbonato del casco de seguridad (`.fps-helmet-visor`), integrando instrumentación de medición química en vivo (detector de gases PID en PPM, medidor de O2, reloj de crisis y avance de derrame hacia el drenaje).
  - *Capa de Manos en 1ª Persona (First-Person Hands Layer)*:
    - Brazos y manos SVG/CSS en el plano inferior de la cámara (`.fps-hands-layer`) que reaccionan con balanceo natural al girar la mirada y ejecutan animaciones directas (`.action-active`) de agarre de válvula, colocación de guantes de nitrilo, tendido de cordones y paños absorbentes, empuje de palanca de lavaojos y embolsado RESPEL.
  - *Reglas de Crisis Dinámicas y Audio Procedimental*:
    - Síntesis Web Audio de respiración rítmica al activar la máscara Full-Face, flujo de agua turbulenta en lavaojos y sirena de modulación de frecuencia.
    - Detección de proximidad al charco corrosivo que activa advertencia estroboscópica de asfixia en el visor y reducción de salud si el usuario no tiene la máscara equipada. Condición de derrota automática si el líquido alcanza el drenaje pluvial ambiental.
- **Alineación Cinemática de Cámara 3D y Rotación Normal en Primera Persona (Juego 5)**:
  - *Corrección de Pivote Ocular en CSS 3D*:
    - Al usar `perspective: 750px`, el ojo del observador se ubica en $Z = +750\text{px}$. Aplicar rotación sin desplazar el origen produce un balanceo de péndulo excéntrico. La transformación exacta para centrar la rotación en los ojos del brigadista es:
      `transform: translateZ(750px) rotateY(yaw deg) translate3d(-posX, 0, -posZ)`.
  - *Fijación Estricta de Verticalidad (Cero Mareo / Pitch Lock)*:
    - Se anuló el cabeceo vertical (`pitch = 0`, `posY = 0`), manteniendo el horizonte perfectamente nivelado para evitar desorientación espacial y cinetosis.
  - *Control de Mirada Normal con Ratón (Pointer Lock API)*:
    - Integración de `requestPointerLock()` al hacer clic en el viewport para control de mira FPS fluido (`e.movementX`) sin arrastre forzado, con retorno suave a arrastre cuando el puntero no está bloqueado.
  - *Consistencia Vectorial de Avance W/S y Strafe A/D*:
    - Alineación exacta de avance $\vec{F} = (\sin(\text{rad}), -\cos(\text{rad}))$ y strafe $\vec{R} = (\cos(\text{rad}), \sin(\text{rad}))$, garantizando que avanzar con W siempre reduzca la distancia euclidiana hacia el punto que se mira en la retícula central.
  - *Mapeo Ergonómico de Interacción a Tecla [E] en Computadores*:
    - Convención universal en simuladores 1ª persona: la tecla `KeyE` (o `e`/`E`) se asigna como botón de acción para interactuar al acercarse a estaciones. Se complementa con un prompt flotante en la mira central (`#fps-crosshair-prompt`) y un badge visible en el botón HUD para proporcionar affordance inmediato.
  - *Calibración Geométrica de Estación EPP y Click Directo*:
    - En la pared Oeste (`.cube-wall-west` rotada $90^\circ$ en $X=-700$), el casillero EPP se renderiza físicamente en $Z = +350\text{px}$ (lado sur) y RESPEL en $Z = -350\text{px}$ (lado norte). La desincronización anterior ($Z=-250$) impedía entrar en rango de detección euclidiana. Al sincronizar a $X=-550, Z=+350$ con radio de $360\text{px}$ y añadir listeners de clic directo en los modelos 3D, la interacción funciona de inmediato vía tecla [E], clic en pantalla o botón HUD.
  - *Spawn Frontal Seguro Frente al Charco*:
    - Posición inicial fijada en $(0, 360)$ con rumbo $yaw = 0^\circ$ (Norte) y cabeceo inicial $pitch = -12^\circ$. El usuario contempla el derrame corrosivo de frente a $290\text{px}$ (fuera del umbral de inhalación de $260\text{px}$), teniendo la Caseta EPP directamente a su izquierda y la Válvula al fondo.
  - *Rotación Vertical Euler (Mirar Arriba y Abajo)*:
    - Pitch acotado en $[-45^\circ, +40^\circ]$ con la transformación `rotateX(pitch deg)` aplicada directamente en el rig ocular (`translateZ(750px)`), permitiendo inspeccionar el charco en el suelo o las tuberías del techo con total estabilidad visual.
  - *Resolución de Conflicto de Foco y Captura del Charco Químico ("No está tomando el charco, y no permite seguir")*:
    - **Causa Raíz Identificada**:
      1. *Falta de Filtro Direccional (Field-of-View)*: Anteriormente, `checkProximity()` seleccionaba la estación activa únicamente con base en la distancia euclidiana mínima en el plano XZ. Al caminar hacia el charco ($Z = 70$) desde el sur de la habitación ($Z \approx 400$), la estación del Lavaojos en la pared Sur ($Z = 620$) se encontraba a $220\text{px}$, entrando en su rango de detección ($280\text{px}$) a espaldas del brigadista. Como el charco estaba a $330\text{px}$ y su rango anterior era de apenas $260\text{px}$, el sistema designaba erróneamente al Lavaojos como objetivo activo en el centro de la mira FPS. Al presionar `[E]`, se disparaba repetidamente la respuesta de "El lavaojos ya está en funcionamiento continuo" en vez de interactuar con el charco, imposibilitando el avance.
      2. *Rango Insuficiente del Charco*: La zona de derrame tiene dimensiones de $320\times 220\text{px}$. Un radio de $260\text{px}$ obligaba al jugador a pararse prácticamente dentro del líquido químico para interactuar, colisionando con el área de daño por vapores.
      3. *Clics con Pointer Lock Desconectados*: En modo Pointer Lock, el clic izquierdo sobre el viewport no disparaba la interacción.
    - **Solución Implementada**:
      1. *Filtrado Vectorial por Cono de Visión (Dot Product / FOV)*: Se implementó el cálculo del vector frontal de la cámara $\vec{F} = (\sin(\theta), -\cos(\theta))$ y el producto punto con el vector normalizado hacia cada estación $\vec{V}_{norm}$. Si $\text{dot} < 0.25$ (objeto a espaldas o fuera de $\approx 75^\circ$ del cono de visión), la estación es descartada de inmediato. Las estaciones válidas se puntúan priorizando alineación con el centro de la retícula: $\text{score} = (\text{dot} \cdot 1000) / (\text{dist} + 40)$. Esto garantiza que al mirar al norte hacia el charco, el lavaojos quede 100% descartado ($\text{dot} \approx -1.0$) y el charco sea seleccionado con precisión.
      2. *Calibración de Radios*: Se amplió el radio de interacción del charco a $420\text{px}$ (permitiendo cercar el derrame desde cualquier ángulo a una distancia operativa prudente) y se ajustó el radio del lavaojos a $230\text{px}$ (activo únicamente frente a la pared sur).
      3. *Prompts Dinámicos Contextuales*: El indicador en la retícula muestra en tiempo real la acción requerida (`DELIMITAR CON CORDÓN ABSORBENTE` ➔ `APLICAR PAÑOS ABSORBENTES` ➔ `CHARCO ABSORBIDO (IR A RESPEL)`), actualizándose de inmediato al completar cada fase.
      4. *Interacción con Clic Izquierdo en Pointer Lock*: El clic de ratón con Pointer Lock activo ahora ejecuta directamente `triggerActiveInteraction()`, además de la tecla `[E]`. Se añadió badge flotante y feedback luminoso (`box-shadow` dorado) al charco al ser enfocado.
- **Documentación Exclusiva Técnica y Normativa por Juego (Docs-as-Code Modular)**:
  - *Arquitectura Documental Desacoplada*: Para satisfacer la demanda de documentación técnica profunda de cada juego sin sobrecargar `docs/01_Requerimientos.md` y `docs/02_Arquitectura.md`, se estableció la subcarpeta `docs/juegos/` con 5 especificaciones independientes:
    1. `docs/juegos/01_juego1_sga.md`: FDS 16 secciones, catálogo de 6 pictogramas SVG, síntesis Web Audio y modo re-inspección correctiva.
    2. `docs/juegos/02_juego2_bodega.md`: Proyección 2.5D isométrica, matriz 3x3, evaluación de 12 enlaces ortogonales, catálogo de consecuencias violentas `CHEMICAL_CONSEQUENCES` e infracción de reenvase (Art. 20 Res. 773/2021).
    3. `docs/juegos/03_juego3_trasiego.md`: 4 vehículos secuenciales, 4 hotspots SVG, distractores trampa fatales y sustento normativo (Dec. 1079/2015, Ley 55/1993, Dec. 4741/2005).
    4. `docs/juegos/04_juego4_taller.md`: 2 escenarios independientes, rotación 90° con billboarding dinámico, Tap-to-Move sin puntos muertos, navegación táctil con 2 dedos (pan & pinch zoom) y modal RESPEL en CSS Grid 3x1.
    5. `docs/juegos/05_juego5_emergencias.md`: 100% FPS / Visor de casco, habitación cúbica 3D de 1400x1400px en CSS3, cinemática ocular Euler, filtrado por cono de visión FOV ($\vec{F} \cdot \vec{V}_{norm} \ge 0.25$), protocolo de 5 pasos y 4 hallazgos de auditoría.
  - *Sincronización Bidireccional*: Se enlazaron todos los documentos en `README.md`, `docs/01_Requerimientos.md` y `docs/02_Arquitectura.md`.
- **Diagnóstico y Corrección de Bloqueos en Juegos 1, 2 y 5**:
  - *Juego 1 (Desafío SGA - "No abre bien, no pasa del tutorial")*:
    1. `setupDragAndDrop` esperaba la clase `.tut-pictogram-tile`, pero los botones se creaban como `pictogram-tile`. Al corregir la clase, el soltado funciona de inmediato.
    2. En el paso 1, hacer clic en un pictograma disparaba un `alert()` bloqueante. Se sustituyó por apertura automática reactiva de la FDS con instrucción del asistente.
    3. Al completar el paso 3, el botón de inicio conservaba estilos inline de deshabilitado (`background: #1e293b`), pareciendo inactivo a pesar de tener `btn-primary`. Se limpiaron los estilos inline al activarse.
    4. Se incorporó botón de salto directo al examen y soporte para `document.readyState !== 'loading'`.
  - *Juego 2 (Bodega Segura - "Pantalla de advertencia cubre todo y no desaparece")*:
    1. `#hazard-toast` carecía de botón de cierre y de temporizador de auto-ocultado, permaneciendo en `z-index: 40` cubriendo permanentemente la cuadrícula 3x3 e impidiendo clics.
    2. Se añadieron botones de cierre `[×]` en el encabezado y botón de descarte en el pie, temporizador de 5 segundos con limpieza de memoria y restricción de altura (`max-height: 240px; overflow-y: auto;`).
  - *Juego 5 (Brigada de Emergencia - "Me dejó sin cursor" / "Reduce la velocidad")*:
    1. *Causa de Pérdida de Cursor*: La API de navegador `requestPointerLock()` se invocaba al hacer clic sobre el viewport, ocultando por completo el cursor del sistema. Para usuarios no familiarizados con salir mediante la tecla `ESC`, esto generaba sensación de bloqueo del equipo.
    2. *Solución*: Se eliminó la captura obligatoria de `requestPointerLock()`. El cursor permanece visible al 100% en todo momento (`cursor: grab` / `cursor: grabbing`), y la mirada se rota mediante arrastre natural con el ratón o pantalla táctil (`mousedown` + `mousemove`), permitiendo además hacer clic directo sobre estaciones o pulsar `[E]`.
    3. *Calibración de Velocidad*: La velocidad base se ajustó a 8.5px por ciclo (con sprint a 13px con Shift), eliminando la aceleración excesiva y evitando cinetosis o mareos al desplazarse.
    4. *Rendimiento GPU*: Se redujeron sombras pesadas de 150px en el techo 3D y se memoizaron consultas repetitivas de `document.querySelectorAll` en el targeting ocular.
- **Calibración de Dificultades, Tolerancia Pedagógica y Dinamismo en la Suite Arcade**:
  - *Juego 1 (Desafío SGA)*:
    1. **Margen de Error de 2 Intentos**: Un solo clic erróneo ya no quema la tarjeta. El primer error descuenta un intento (`1 intento restante`), Bolívar Bot emite una pista guiada para buscar peligros en la Sección 2 de la FDS y resalta el botón `[Inspeccionar FDS]` con destello dorado. Solo el segundo fallo consecutivo bloquea la tarjeta con 'X' roja.
    2. **Mini-Reto Rápido de Palabra SGA**: Al clasificar el pictograma, se abre un mini-desafío reactivo de 5s para seleccionar la Palabra de Advertencia oficial (`PELIGRO` vs `ATENCIÓN`), otorgando **+5 segundos de tiempo extra** y puntos bonus.
    3. **Racha Arcade**: Incorporación de multiplicador de combo visual en vivo (`x1`, `x2`, `x3`) en el HUD.
  - *Juego 4 (Taller Seguro)*:
    1. **Tolerancia en Casillero**: Tocar un EPP trampa en el casillero ya no resta -20 puntos de inmediato ni quiebra la racha. Despliega advertencia pedagógica de FDS y permite desequiparlo libremente antes de presentarse al Checkpoint.
    2. **Checkpoint Formativo**: El primer intento de escaneo con faltas no penaliza puntos; emite advertencia ámbar del Bolívar Bot para retornar al casillero y rectificar.
    3. **Mini-Retos Operacionales**: Tocar la Mesa de Desengrase y el Motor V8 activa desafíos técnicos interactivos de procedimiento seguro (aplicación con paño sin dispersión de aerosoles y contención ambiental con bandeja colectora según Dec. 4741/2005) antes de resolver la tarea, sustituyendo clics planos por decisiones formativas.
  - *Juego 2 (Bodega Segura)*:
    1. **SWAP Ágil de Piezas**: Habilitación de intercambio dinámico de posiciones entre celdas ocupadas del tablero 3x3 (tanto por arrastre directo como por selección Tap-to-Swap), permitiendo reorganizar la bodega con fluidez sin desmontar piezas a la bandeja.
    2. **Restricciones de Infraestructura de Bodega (Peligros Ambientales Fijos)**:
       - Celda A3 (`cell-0-2`): Tablero Eléctrico de Potencia 440V. Prohíbe almacenar combustible (`item_fuel`: ACPM) o gas inflamable (`item_gas`: Acetileno) bajo riesgo de ignición por arco eléctrico (NFPA 70).
       - Celda C1 (`cell-2-0`): Radiación Solar Térmica Directa. Prohíbe almacenar cilindros presurizados de gas o solventes volátiles por riesgo de sobrepresión térmica (NFPA 55).
    3. **Reacción Exotérmica Activa con Temporizador Crítico de Despegue (6 Segundos)**:
       - Incompatibilidades entre reactivos o violaciones ambientales detonan una alarma crítica con cuenta regresiva de 6 segundos en el HUD.
       - Si el jugador no segrega o separa los químicos a tiempo, se produce una deflagración en bodega con sacudida, chispas y penalización irreversible de **-150 puntos** en la auditoría.
    4. **Calibración de Tiempo Táctico**: Cronómetro arcade ajustado a **90 segundos**.
  - *Juego 3 (Inspector de Trasiego)*:
    1. **Secuencia Procedimental ATS Obligatoria (Decreto 1079 de 2015)**:
       - Paso 1 Obligatorio: Inmovilización Mecánica con Cuñas en Llantas (`targetId = 5`) antes de intervenir cualquier sistema eléctrico o de bombeo. Intentar saltárselo dispara **Violación Crítica de Secuencia ATS** (-4s / -30 pts).
       - Paso 2 Obligatorio: Apagar Motor/Celular (`1`) y Conectar Polo a Tierra (`2`) antes de manipular acoples, manguera o bandeja de goteo, erradicando riesgo de arco por estática (-4s / -30 pts).
       - Paso 3: Instalación de contención secundaria (bandeja al 110%) y extintor satélite ABC.
    2. **Penalización Rigurosa y Cero Pistas Gratuitas**:
       - Cada error de correspondencia penaliza directamente **-3 segundos y -30 puntos**, rompiendo la racha combo.
       - Caer en tarjetas trampa penaliza **-10 segundos y -100 puntos**.
    3. **Calibración de Cronómetro Táctico**: Tiempo base ajustado a **70 segundos** con bonificación de **+8 segundos** por frente certificado.
  - *Juego 1 (Desafío SGA - Calibración Rigurosa y Doble Criterio FDS)*:
    1. **Tolerancia Cero e Intento Único Táctico**: Eliminación de intentos permisivos. Clasificar erróneamente un pictograma penaliza inmediatamente con **-10 segundos** al cronómetro, rompe la racha a 0, bloquea la tarjeta y despliega feedback de infracción técnica normativa.
    2. **Mini-Reto Técnico FDS de Doble Criterio Obligatorio (5s)**: Al clasificar el pictograma, se exige responder dos criterios técnicos encadenados bajo temporizador estricto de 5 segundos:
       - Paso 1: Palabra de Advertencia oficial (`PELIGRO` vs `ATENCIÓN`).
       - Paso 2: Frase H técnica exacta (Código e Indicación de Peligro de FDS Sección 2) frente a 2 distractores plausibles.
       - Fallar cualquiera de los 2 pasos o agotar los 5 segundos descuenta directamente **-10 segundos**, rompe racha y activa retroalimentación de error. Superarlo con éxito premia con **+5 segundos** y puntos combo.
    3. **Calibración de Tiempo**: Cronómetro general fijado en **75 segundos**.
  - *Juego 4 (Taller Seguro - Calibración Rigurosa y Delito Ambiental)*:
    1. **Casillero Punitivo**: Equipar prendas trampa no certificadas resta inmediatamente **-15 segundos** y **-100 puntos**, rompe racha y emite advertencia técnica.
    2. **Checkpoint Biométrico Estricto (Sin Intentos Gratuitos)**: Presentarse al escáner con dotación incompleta o prendas no homologadas dispara alarma, descuenta **-15 segundos** y **-100 puntos**, y expulsa al avatar hacia atrás para reconfiguración obligatoria.
    3. **Riesgo Ambiental Crítico en Motor V8 (Ley 1333/2009 & Dec. 4741/2005)**: Seleccionar purgar aceite o desmontar filtro sin bandeja colectora dispara *¡DELITO AMBIENTAL!*, resta **-20 segundos**, descuenta **-150 puntos**, rompe racha y activa el derrame aceitoso en la base colectora (`.engine-spill-active`).
    4. **Calibración de Tiempo**: Cronómetro ajustado de 240s a **90 segundos**.
    5. **Barajado Dinámico e Intercalado de Tarjetas (Fisher-Yates)**: Las 8 tarjetas del casillero (EPP reglamentario vs EPP trampa) se intercalan en el markup inicial y se barajan aleatoriamente en el DOM cada vez que se accede al casillero, impidiendo atajos mecánicos o memorización espacial y exigiendo lectura atenta de especificaciones técnicas. Se aleatorizan de igual forma las opciones de los mini-retos operacionales y los contenedores de la estación RESPEL.
    6. **Erradicación de Pistas Cromáticas Delatoras (Neutralidad Visual Estricta)**:
       - *Casillero EPP*: Erradicación de iconos de peligro en rojo (`#ef4444`) o titulares delatores ("¡Peligro!") en tarjetas trampa; todas las 8 tarjetas poseen diseño técnico e iconografía idéntica y neutra.
       - *Retos de Taller (`openWorkshopChallenge`)*: Eliminación del tintado prematuro en verde (`rgba(16, 185, 129, 0.2)`) y borde verde que delataba la opción correcta al renderizar. Todas las opciones lucen fondo oscuro neutro (`rgba(30, 41, 59, 0.85)`) y borde sutil antes de la selección.
       - *Estación RESPEL*: Sustitución de colores de iconos de residuos en bandeja (`#f87171`, `#fca5a5`, `#fde047`) por tono acero neutro (`#94a3b8`), impidiendo que el operario empareje residuos por colorimetría obvia con la caneca roja y el tambor amarillo en lugar de aplicar criterios técnicos de clasificación.
- **Resolución de Bloqueo de Interacción y Puntero en Juego 1 ("No deja seleccionar nada, ni arrastrar, ni pulsar ningún botón")**:
  - *Causa Raíz*: Al migrar de Tailwind a CSS nativo, la clase de utilidad `.pointer-events-none` quedó omitida en el bloque `<style>`. El elemento `<canvas id="fx-canvas">` (que se redimensiona a 620x940px cubriendo toda la pantalla) y la capa flotante `<div id="comic-reaction-layer">` adoptaron por defecto `pointer-events: auto;`. Al ubicarse al final del contenedor `.app-viewport`, el canvas actuaba como un cristal invisible superpuesto a toda la pantalla, interceptando el 100% de clics, pulsaciones táctiles y eventos de puntero antes de llegar a las tarjetas químicas, botones de FDS y casillas de pictogramas.
  - *Solución*:
    1. **Primitivas CSS Nativas**: Incorporación en `:root` y clases de utilidad de `.pointer-events-none { pointer-events: none !important; }`, `.pointer-events-auto`, `.inset-0`, `.z-50`, `.h-full`, `.my-auto`, `.text-amber-400`, `.text-red-500` y `.animate-pulse`.
    2. **Inmunidad Explícita Inline**: Asignación de `style="pointer-events: none;"` de forma explícita inline a `#fx-canvas` y `#comic-reaction-layer`, garantizando que jamás bloqueen clics bajo ninguna circunstancia o recarga.
    3. **Robustecimiento de Drag & Drop (`setupDragAndDrop`)**: Delegación de `pointermove` y `pointerup` al objeto global `window` al iniciar el arrastre, evitando pérdidas de captura de puntero si el cursor sale del elemento o al aplicarse `.is-dragging`.
    4. **Feedback Táctil en Tutorial**: Integración de evento de clic a `tutChemCard` con sonido de toque y realce de selección `pulse-selected`.
- **Resolución de Desborde en Cuadrícula de Examen de Juego 1 ("en la cuadrícula se desborda")**:
  - *Causa Raíz*: La cuadrícula `.exam-cards-tray` utilizaba `grid-template-columns: repeat(2, 1fr)`. Según la especificación de CSS Grid, `1fr` equivale a `minmax(auto, 1fr)`. Al contener textos largos como `"1 Intento Táctico (-10s)"` y títulos sin `overflow: hidden`, y al carecer `.exam-card` de `min-width: 0;`, la columna derecha se expandía más allá del ancho disponible en pantallas compactas y dispositivos móviles, desbordando y cortándose contra el margen derecho del contenedor.
  - *Solución*:
    1. Se modificó `.exam-cards-tray` a `grid-template-columns: repeat(2, minmax(0, 1fr));`, `gap: 8px;`, `width: 100%;` y `box-sizing: border-box;`.
    2. Se asignaron `min-width: 0;`, `overflow: hidden;`, `box-sizing: border-box;` y padding calibrado (`8px 10px`) a `.exam-card`.
    3. Se compactó el icono a `34x34px`, se truncó con elipsis los textos de nombre/alias y se ajustó el badge táctico a `"1 Intento (-10s)"` con `max-width: 100%`, logrando contención matemática perfecta sin desborde.
- **Rediseño Ergonómico y Reducción de Saturación Cognitiva en Modal FDS ("Demasiada información, en tamaños diferentes, marea")**:
  - *Causa Raíz*: El modal visor técnico FDS desplegaba simultáneamente 5 tarjetas apiladas con múltiples bordes contrastantes, fondos degradados agresivos (rojo y verde neón), badges parpadeantes ("CRÍTICO", "OBLIGATORIO") y textos genéricos de relleno sin valor de decisión en juego (Sección 1, Secciones 3 a 7, Secciones 9 a 16). La disparidad tipográfica y lumínica saturaba la lectura del jugador bajo la presión del cronómetro de 75s.
  - *Solución*:
    1. **Eliminación de Cajas Redundantes**: Se suprimieron las 3 tarjetas de texto de relleno estático, concentrando la interfaz en las dos secciones con valor pedagógico y decisional: **Sección 2 (Peligros SGA)** y **Sección 8 (EPP y Controles)**.
    2. **Homogeneización Tipográfica y de Color**: Se unificaron los encabezados de tarjeta a `12px` (mayúsculas espaciadas `0.05em`, peso 800) y los textos de cuerpo a `13.5px` (`#e2e8f0`, `line-height: 1.5`), erradicando las fuentes dispares.
    3. **Diseño Visual Sobrio**: Se reemplazaron los gradientes incandescentes y sombras fluorescentes por tarjetas con fondo oscuro sobrio (`rgba(30, 41, 59, 0.5)`), borde sutil de 1px y acentos laterales elegantes de 4px (`border-left: 4px solid var(--hazard-red)` para Sección 2 y `border-left: 4px solid #10b981` para Sección 8).
    4. **Integridad Técnica**: Se preservaron todos los IDs requeridos por el controlador JavaScript (`modal-fds-chem-title`, `fds-sec2-text`, `fds-sec2-warning`, `fds-sec2-code`, `fds-sec8-text`, `fds-sec1`), manteniendo `#fds-sec1` en una nota al pie técnica y discreta sin impacto visual ni errores de consola.
- **Estandarización Integral de Interfaz y Sistema Visual en Juego 1 (Desafío SGA)**:
  - *Diagnóstico*: Saturación general por proliferación de `font-weight: 900` en casi todos los elementos, resplandores neón pesados (`0 0 30px`), bordes verdes en tarjetas de examen no clasificadas y cajas modales disonantes con múltiples fondos e intensidades luminosas.
  - *Solución*:
    1. **Estandarización de Tokens (`:root`)**: Jerarquía tipográfica equilibrada (`12px`, `14px`, `15px`, `18px`, `22px`), reducción de sombras a valores refinados (`0 4px 16px`) y relajación de pesos a `700` para títulos y `400/500` para cuerpos.
    2. **Desaturación de Cabina y HUD**: Fondo con gradiente discreto (`0.08`), barra superior con borde suave y botones de icono compactos (`34x34px`) con `font-size: 12px`.
    3. **Tarjetas de Examen en Tono Neutro**: Reemplazo del borde verde delator por borde pizarra suave (`rgba(148, 163, 184, 0.2)`), caja de icono compacta (`32x32px`), badge de intentos sobrio y botón FDS discreto.
    4. **Modales de Error y Reto Armonizados**: Reemplazo de los bordes 2px llamativos por contenedores oscuros con acento lateral de 4px (`border-left: 4px solid var(--hazard-red)` y `border-left: 4px solid var(--bolivar-yellow)`), unificando el lenguaje visual de toda la suite.
- **Erradicación de Bloqueo por Preguntas y Respuestas en Juego 1 ("Literalmente se queda ahí, quítale eso de pregunta y respuesta, simplemente reacción")**:
  - *Diagnóstico*:
    1. El flujo anterior invocaba `openWordChallenge()` cada vez que el operario clasificaba un reactivo, desplegando un modal emergente que exigía responder dos preguntas de selección múltiple (Palabra de advertencia y Frase H) en 5 segundos.
    2. Este modal cortaba abruptamente la partida arcade, creaba confusión en la interacción ("se queda paralizado ahí") y bloqueaba el tablero de clasificación, frustrando la experiencia de usuario.
  - *Solución*:
    1. **Eliminación Total de Modales Durante la Partida**: En `handleExamSelection()`, se erradicó la llamada a `openWordChallenge()` y `showErrorFeedback()`.
    2. **Reacción Arcade Inmediata y Fluida**: Al clasificar una tarjeta mediante toque o arrastre:
       - Si es correcta: Se disparan de inmediato los efectos audiovisuales (`sound.success()`, confeti, animación en la casilla), se incrementa el puntaje y la racha, se sella la tarjeta como resuelta con `✓` y se avanza sin pausa con `advanceExam()`.
       - Si es incorrecta: Se aplica la penalización directa de -10 segundos, sonido de error, sacudida de pantalla (*screen shake*), comic bubble de advertencia, se quema la tarjeta con `✗` y se avanza de inmediato.
    3. **Retroalimentación Formativa en Resultados (Fase 3)**: El análisis técnico y la re-inspección de FDS quedan disponibles al finalizar los 75s en el botón "Revisar FDS" de cada reactivo en la pantalla de resultados, preservando el valor pedagógico sin entorpecer el juego.
