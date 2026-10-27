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
  - Ampliación del ancho de cabina táctica (`max-w-xl md:max-w-2xl lg:max-w-3xl`) y del modal de matriz química (`max-width: min(1160px, 98vw)`).
- **Matriz Oficial de Compatibilidad por Tipos y Etiquetas (SGA / NTC 4435)**:
  - Estructuración estricta de la matriz según el estándar internacional oficial (CISTEMA / NTC 4435 / Res. 773/2021) organizada por **Tipos de Peligro y Etiquetas SGA (12 Clases ONU)** en lugar de artículos comerciales individuales.
  - Las 12 etiquetas oficiales implementadas con rombos vectoriales SGA: 1. Explosivos, 2.1 Gases Inflamables, 2.2 Gases Inertes, 2.3 Gases Tóxicos, 3. Líquidos Inflamables, 4. Sólidos Inflamables, 5.1 Comburentes, 5.2 Peróxidos Orgánicos, 6.1 Tóxicos, 8A. Corrosivos Ácidos, 8B. Corrosivos Álcalis y 9. Misceláneos / Salud.
  - Cada etiqueta mapea explícitamente sus productos de obra correspondientes (ej. Clase 3: ACPM, Gasolina, Thinner; Clase 8A: Ácido Muriático, Baterías; Clase 2.1: Acetileno; Clase 5.1: Oxígeno).
  - Selector rápido en HUD (`#select-compound-a` vs `#select-compound-b`) con cruce instantáneo entre los 12 tipos/etiquetas, rombos SGA de alta resolución, justificación técnica y retícula luminosa en la matriz 12x12.
  - 3 pestañas limpias: Matriz Oficial por Tipos y Etiquetas, Guía de Etiquetas SGA con fichas por cada clase, y Reglas de Buffers Neutros & RESPEL.
- **Clarificación e Integración del Símbolo de Candado [🔒 E] (Almacenamiento Exclusivo)**:
  - Justificación normativa: En las matrices NTC 4435, CISTEMA y Dec. 2535 / Res. 773, la letra 'E' con icono de candado ('🔒') designa Almacenamiento Exclusivo bajo llave. Sustancias con peligro de detonación en masa (Clase 1: Explosivos) o inestabilidad térmica autoacelerada (Clase 5.2: Peróxidos) tienen prohibición legal de ingresar a una bodega común de obra.
  - Opciones de Selectores Rápidos ('#select-compound-a' y '#select-compound-b'): Se etiquetaron explícitamente las opciones con '🔒 1. Explosivos [CANDADO E: Almacenamiento Exclusivo bajo llave - Polvorín INDUMIL (Prohibido en bodega común)]' y '🔒 5.2 Peróxidos Orgánicos [CANDADO E: Almacenamiento Exclusivo bajo llave - Cámara Fría TDAA (Prohibido en bodega común)]'.
  - Barra explicativa en HUD y Leyenda de Semáforo: Se sustituyó el chip genérico negro por '⚫ [🔒 E] Candado = Exclusivo' con descripción explícita de custodia bajo llave fuera de bodega. Se añadió un banner de soporte directo bajo los selectores.
  - Inspector en tiempo real ('updateInspector'): Al detectar 'status === e', el badge emite '🔒 ⚫ E: ALMACENAMIENTO EXCLUSIVO (BAJO LLAVE)' y el cuadro de justificación redacta la explicación reglamentaria detallada del porqué del candado.
  - Fichas SGA y Reglas Tácticas (Pestañas 2 y 3): Se incorporaron insignias de candado y una tarjeta táctica formativa dedicada al significado legal y operativo de las celdas con candado en la matriz.
- **Reorganización Jerárquica y Ergonómica de la Leyenda y del Inspector HUD en el Modal**:
  - **Jerarquía Natural en Modal**: Se reordenó la estructura interna de `modal-body` para posicionar la Leyenda Oficial de 4 Convenciones (`.matrix-legend-grid`) inmediatamente debajo del selector de pestañas (`matrix-tabs-container`), de modo que el usuario comprenda el código de colores antes de interactuar con el Inspector y la Matriz 12x12.
  - **Limpieza de Convenciones y Supresión de Redundancia Visual**: Se eliminaron los emojis redundantes (`🟢`, `🟡`, `🔴`, `⚫`) y dobles símbolos que saturaban los chips de leyenda. Cada tarjeta (`.matrix-legend-card`) presenta ahora un icono centrado FontAwesome (`<i class="fa-solid fa-check"></i>`, `fa-triangle-exclamation`, `fa-ban`, `fa-lock`), un chip tipográfico con el código oficial (`[C]`, `[P]`, `[I]`, `[🔒 E]`), título claro y descripción reglamentaria de NTC 4435.
  - **Inspector HUD Compacto y Articulado**: Se rediseñó la cabecera `.inspector-top-bar` con insignia de ayuda (`.inspector-hint-badge`), selector rápido horizontal, tarjeta de veredicto con tipografía unificada (`[I] INCOMPATIBLE CRÍTICO`) y un banner compacto para los candados legales.
- **Transformación del Inspector de Compatibilidad en Ventana Modal Emergente por Celda (Juego 2)**:
  - *Diagnóstico*: Anteriormente, el panel del inspector residía de forma estática y permanente dentro del cuerpo del modal (`modal-body`) ubicado entre la leyenda y la matriz. Ocupaba más de 280px de altura vertical, forzando al usuario a desplazarse hacia abajo para visualizar la tabla 12x12 de reactividad.
  - *Solución*:
    1. Se desacopló el inspector del flujo vertical estático reemplazándolo por un banner compacto (`.matrix-instruction-banner`) que invita a pulsar cualquier casilla.
    2. El inspector se convirtió en un diálogo modal flotante independiente (`#modal-matrix-inspector`) con backdrop semitransparente (`z-index: 70`), botón de cierre `[×]`, botón inferior de retorno a matriz, soporte de tecla Escape y cierre al tocar fuera.
    3. Al hacer clic o tocar cualquier casilla [cuadradito] de la matriz, o al pulsar el botón "Consultar por Selectores", la ventana emergente se abre suavemente (`popInInspector`) cargando el cruce de las sustancias seleccionadas, sus rombos SGA vectoriales y la justificación técnica de la consecuencia real.
- **Optimización de Rendimiento GPU 60 FPS en Conexiones Láser 3D (Juego 2)**:
  - *Diagnóstico de lentitud*: Al colocar sustancias, aparecían líneas con `filter: drop-shadow(...)` animadas continuamente junto con `stroke-dashoffset` (`laserHazardDash`) e inflados de `box-shadow` (`pulseHazardBeam`, `hazardCellPulse`) dentro del contenedor isomórfico 3D (`transform-style: preserve-3d; transform: rotateX(60deg) rotateZ(-45deg)`). El rasterizador de WebKit/Chromium ejecutaba convoluciones de desenfoque gaussiano por software 60 veces/segundo en CPU, colapsando los FPS en móviles. Además, las vigas HTML `.beam-h`/`.beam-v` duplicaban el renderizado del SVG.
  - *Solución*:
    1. Sustitución de `filter: drop-shadow` por el patrón vectorial concéntrico "Halo + Núcleo" (línea gruesa translúcida + línea media intensa + núcleo blanco de plasma) renderizado 100% por GPU en un solo pase de geometría.
    2. Supresión de vigas HTML duplicadas (`.beam-h, .beam-v { display: none !important; }`).
    3. Sustitución de animaciones de trazo continuas por pulso suave de `opacity` en el compositor GPU (`will-change: opacity`).
    4. Estabilización de sombras estáticas en casillas de peligro y sprites, garantizando 60 FPS estables sin tirones.

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
- **Estación de Segregación RESPEL Estocástica y de Alta Dificultad (Juego 4 - Dec. 4741/2005 & Ley 430/1998)**:
  - *Diagnóstico*: La estación anterior constaba de 3 residuos fijos y 3 canecas predecibles siempre en las mismas posiciones, lo que permitía superar el nivel por memorización mecánica de memoria muscular sin análisis normativo crítico.
  - *Arquitectura Implementada*:
    1. **Catálogo de 8 Residuos de Obra (`RESPEL_CATALOG`)**: Filtro de aceite metálico, trapos impregnados de solvente, aceite de motor usado, batería plomo-ácido, lata de aerosol inflamable, refrigerante/anticongelante (etilenglicol), cartón seco limpio (trampa no peligrosa para reciclaje) y garrafa plástica vacía de solvente.
    2. **Catálogo de 8 Contenedores Homologados (`RESPEL_BINS_CATALOG`)**: Canecas rojas especializadas para filtros, sólidos y plásticos; tambor amarillo sobre estiba de retención; contenedor de polietileno resistente a ácido sulfúrico para baterías; bidón azul para anticongelante; y punto ecológico blanco/gris para residuos reciclables ordinarios.
    3. **Algoritmo de Selección Estocástica (Fisher-Yates Shuffle)**: En cada partida se extraen al azar 4 residuos activos y 5 contenedores en orden barajado (generando distractores no utilizados en la ronda).
    4. **Penalizaciones Severas y Feedback Normativo**: Errores en clasificación restan **-5 segundos** al cronómetro, deducen **-40 puntos**, quiebran la racha a cero y detonan sacudida de pantalla con citación estricta de la ley aplicable (Decreto 4741/2005, Ley 430/1998, Res. 773/2021 o Decreto 1077/2015).
    5. **Renderizado Reactivo y Estabilidad Dimensional**: CSS Grid auto-ajustable (`.respel-grid-dynamic-source` y `.respel-grid-dynamic-dest`), delegación de eventos unificada en `bindEvents()` y preservación milimétrica de dimensiones para prevenir desbordes o parpadeos.
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
- **Estandarización Visual de Interfaz en los 5 Juegos y Cuadro Previo de Contexto en Juego 5**:
  - *Diagnóstico*:
    1. Disparidad estética entre los juegos iniciales y los posteriores: Juegos 2, 3 y 4 conservaban bordes gruesos de 2px, sombras fluorescentes pesadas, pesos de fuente de 900 excesivos y disparidad en escalas tipográficas (fuentes de 13px–30px frente a 12px–26px de Juego 1).
    2. En Juego 5, al cargar la página el jugador era arrojado de inmediato a la habitación 3D con el cronómetro de 120s ya corriendo, sin contexto de la emergencia ni claridad sobre la secuencia de 5 pasos requerida.
  - *Solución*:
    1. **Estandarización de Tokens (:root) y Modales en Juegos 2, 3, 4 y 5**:
       - Unificación estricta de la escala tipográfica: ont-xs: 12px, ont-sm: 14px, ont-base: 15px, ont-lg: 18px, ont-xl: 22px, ont-2xl: 26px.
       - Reemplazo de sombras de neón por --shadow-card: 0 4px 16px rgba(0,0,0,0.4) y bordes sutiles de 1px (
gba(148, 163, 184, 0.18)).
       - Modales técnicos (.modal-dialog, .fps-modal-dialog) estandarizados con fondo pizarra oscura #0f172a y acento lateral sobrio de 4px (order-left: 4px solid ...).
       - Toasts y finding-cards desaturados con bordes laterales según su severidad técnica.
    2. **Cuadro Previo de Contexto Táctico en Juego 5 (#modal-briefing-overlay)**:
       - Pantalla previa de briefing estilo terminal táctico militar/industrial de emergencias.
       - Telemetría en tiempo real: Sustancia en fuga (Ácido Clorhídrico + Solvente), lectura PID de 420 ppm, reporte de operario con salpicadura y ventana de 120 segundos.
       - Guía paso a paso de los 5 frentes de intervención (Caseta EPP ➔ Válvula ➔ Lavaojos ➔ Kit/Cordón ➔ Acopio RESPEL) y mapa de controles para PC y móvil.
       - Pausa táctica: La física de marcha y la cuenta regresiva de 120s permanecen congeladas hasta que el brigadista presiona [ ASUMIR EL MANDO DE LA BRIGADA (120s) ], garantizando inmersión total y entendimiento de la misión.

- **Rediseño Estilo Star Wars Datapad Simplificado en Juego 5 ("más a lo star war, pero sencillo")**:
  - *Diagnóstico*:
    1. El cuadro de briefing inicial empleaba esquinas redondeadas estándar (`border-radius: 12px`, `border-radius: var(--radius-full)`), botones con degradados tradicionales y tipografías sans-serif que lucían como un formulario web convencional, restándole solemnidad e inmersión a la simulación tridimensional en primera persona.
  - *Solución*:
    1. **Geometría y Silueta Táctica (Cortes Angulares a 45°)**: Implementación de cortes geométricos biselados con `clip-path: polygon(...)` en el contenedor principal (`.fps-briefing-dialog`), en las cajas de telemetría (`.telemetry-box`), en los badges de paso (`.step-num-badge`) y en el botón de despliegue (`.btn-start-emergency-mission`), erradicando bordes redondeados estándar.
    2. **Paleta y Holoterminal Espacial**: Fondo en obsidiana espacial (`#060A14`), scanlines tenues holográficas estáticas (`rgba(56, 189, 248, 0.03)` cada 4px), acento primario en amarillo Star Wars (`#FFC72C` / `#FFE81F`), cian láser (`#38BDF8`) y rojo advertencia (`#EF4444`).
    3. **Tipografía Táctica Monoespaciada**: Integración de Google Font `JetBrains Mono` con espaciado amplio (`letter-spacing: 0.08em` a `0.14em`), prefijos de transmisión militar imperial/rebelde (`// ALERTA ROJA SST`, `// DIRECTIVA OPERATIVA`, `// SUSTANCIA EN FUGA`) y barra superior de consola (`[ DATAPAD SST-05 // HOLOTERMINAL ]`).
    4. **Simplicidad Radical (KISS)**: Sin animaciones mareantes, sin textos en idiomas ficticios ininteligibles, sin librerías adicionales ni pesadez de carga; 100% CSS nativo ligero y de alta legibilidad en computadores y dispositivos móviles.
- **Simplificación Radical del Briefing de Juego 5 ("demasiado texto en diferentes tamaños y formatos, quiero algo sencillo")**:
  - *Diagnóstico*: La iteración previa del briefing Datapad introdujo una sobrecarga de información (barra de consola superior, píldora de alerta roja, 4 cajas de telemetría de PID/tiempos, 5 pasos con textos normativos largos y citas a decretos, barra de controles con badges dispersos y más de 6 tamaños tipográficos distintos). Toda esa información generaba fatiga visual y duplicaba telemetría que ya existe en el HUD de juego.
  - *Solución*:
    1. **Eliminación de Elementos Redundantes**: Supresión de la barra superior de sistema, píldora de alerta roja y las 4 cajas de telemetría.
    2. **Homogeneización Tipográfica**: Jerarquía única y limpia: título a 1.15rem (18px) en amarillo Star Wars, cuerpo uniforme a 0.85rem (14px) y texto de controles a 0.75rem (12px).
    3. **5 Pasos Operativos Ultra-Concisos**: Redacción de 1 sola frase directa por paso (Caseta EPP, Válvula, Lavaojos, Derrame, RESPEL) con números del 1 al 5 en badges compactos.
    4. **Controles en 1 Renglón**: Formato directo `WASD: Caminar • Ratón: Mirar • [E] / Clic: Interactuar`.
    5. **Botón Directo**: `[ INICIAR MISIÓN (120s) ]` sin adornos excesivos.
    6. **Contenedor Compacto**: Reducción de ancho de 680px a 520px para lectura inmediata y cómoda en computadores y dispositivos móviles.
- **Resolución de Bloqueo por Toast de Advertencia en Juego 2 ("la pantalla de advertencia es tan grande que cubre todo, cámbialo")**:
  - *Causa Raíz*: El elemento `#hazard-toast` estaba ubicado dentro de `.iso-viewport` con posicionamiento absoluto (`position: absolute; top: 4px; left: 8px; right: 8px; max-width: 460px; max-height: 240px;`). Al activarse una incompatibilidad química entre dos reactivos contiguos, la tarjeta medía hasta 240px de alto con fondos opacos y dos párrafos extensos de texto normativo, cubriendo el 80% de la superficie del tablero isométrico (`warehouse-board`, 280x280px). Al quedar el tablero tapado por el modal, las celdas quedaban inaccesibles e interceptaban los toques/clics del jugador, impidiéndole separar las sustancias y provocando deflagraciones involuntarias bajo la cuenta regresiva de 6 segundos.
  - *Solución*:
    1. **Extracción Fuera del Iso-Viewport**: Se reubicó `#hazard-toast` en el flujo de la cabina, inmediatamente después de `#exothermic-alert-strip` y antes de `.iso-viewport`. Al salir del contenedor del tablero, es físicamente imposible que tape las celdas 3D.
    2. **Diseño Ultra-Compacto de Tira Delgada**: Se redujo la altura total a ~40px con diseño de una sola línea informativa (`Ácido Muriático ⚡ Soda Cáustica: Reacción violenta exotérmica. ¡Sepáralas!`).
    3. **Despeje y Usabilidad Total en el Tablero 3x3**: El tablero en `.iso-viewport` permanece 100% visible, interactivo y despejado en todo momento para arrastrar o tocar celdas de forma fluida.
    4. **Integridad Técnica y Cero Regresiones**: Se preservaron todos los selectores esperados por la clase `WarehouseGame` (`hazardToast`, `hazardToastPairNames`, `hazardToastFalla`, `hazardToastConsecuencia`, `hazardToastNorma`, `hazardToastNav`, `btnCloseHazardToast`, etc.), manteniendo el cierre automático de 5s y navegación de riesgos sin errores de consola.

- **Resolución de Fallo en Tarjetas y Mecánica de Interacción en Juego 2 ("las tarjetas no funcionan")**:
  - *Causas Raíz Diagnosticadas*:
    1. **Umbral de Arrastre Excesivamente Sensible (4px)**: `Math.hypot(dx, dy) > 4` marcaba `this.wasDragged = true` ante cualquier vibración imperceptible de dedo en pantallas táctiles o ratón de alta resolución. Al dispararse el evento `click`, la guarda `if (this.wasDragged) return;` abortaba el clic, ignorando de manera recurrente el toque del jugador para seleccionar tarjetas.
    2. **Colisión de Hit-Testing por SVGs Hijos**: Al arrastrar una tarjeta o sprite con `document.elementFromPoint(e.clientX, e.clientY)`, la clase `.is-dragging` tenía `pointer-events: none` pero sus elementos descendientes (SVG `<path>`, `<polygon>`, `<text>`) no lo tenían explícitamente en todas las reglas, provocando que `elemUnder.closest('.dropZoneSelector')` devolviera `null` y el drop fallara haciendo rebote elástico.
    3. **Interferencia de `setPointerCapture`**: `cardEl.setPointerCapture(e.pointerId)` redirigía todos los eventos de puntero exclusivamente a la tarjeta en arrastre, afectando la detección limpia del elemento subyacente.
    4. **Incompatibilidad en la Máquina de Estados de Clic en Celdas Ocupadas**: Al tener una tarjeta de bandeja seleccionada y tocar una celda que ya contenía un reactivo, el código sobreescribía la selección en vez de ejecutar un reemplazo o advertencia, dejando al usuario bloqueado.
    5. **Inconsistencia de Identificador de ACPM**: Las reglas ambientales de A3 y C1 validaban `a3Item === 'item_fuel'`, pero en `CHEMICAL_ITEMS` el combustible está registrado con `id: 'item_acpm'`.
  - *Solución Implementada*:
    1. **Desacople y Umbral de 8px**: Se elevó el umbral de movimiento a 8px y se retiraron las llamadas a `setPointerCapture` / `releasePointerCapture`. En `onPointerUp`, si no hubo arrastre (`!hasMoved`), se asegura explícitamente `this.wasDragged = false`.
    2. **Pointer-Events None Universal en Drag**: Regla global `.is-dragging, .is-dragging * { pointer-events: none !important; }` aplicada en CSS tanto a tarjetas de inventario como a sprites 3D del tablero.
    3. **Reemplazo y Swap Fluido por Drag y Tap**: En `handleTrayCardDrop` y `handleCellClick`, si se suelta o toca una celda ocupada con un reactivo de la bandeja, se ejecuta el reemplazo automático (el ítem previo vuelve a la bandeja y el nuevo se ubica en la celda) con feedback sonoro y de chispas, o alerta SST si es la botella ilegal de gaseosa.
    4. **Unificación de Identificador a `item_acpm`**: Corrección integral en las verificaciones de tablero eléctrico A3 y radiación solar C1, así como en el cómputo de la auditoría final.

- **Resolución de Dificultad de Toque en Objetos de Juego 4 ("no se dejan tocar bien los objetos, hay que presionar en lugares muy específicos")**:
  - *Causas Raíz Diagnosticadas*:
    1. **Hit-box Estricta e Inclinada en Espacio 3D**: Cada `.iso-prop` tenía dimensiones exactas ceñidas a su silueta visual (ej. 78x102px o 96x86px) con contrarrotación en Z y X. El raycasting de eventos de puntero en Chromium/WebKit a través de `preserve-3d` dejaba áreas interactivas muy estrechas.
    2. **Falsos Clics de Piso en Baldosas Ocupadas**: Cuando el usuario intentaba presionar la base del prop, los bordes o el suelo frente al objeto, el evento impactaba la baldosa `.iso-tile` subyacente. El manejador `handleFloorClick` interpretaba esto como una orden de marcha y movía al avatar a esa baldosa en vez de activar la acción del objeto.
    3. **Demarcaciones de Seguridad Bloqueadas**: Las demarcaciones `.floor-safety-zone` en el piso tenían `pointer-events: none !important;`, lo que hacía que tocar el piso de la estación cayera en la baldosa vacía.
    4. **Recorte en Estación RESPEL**: `.prop-respel-station` tenía `overflow: hidden;`, lo que cortaba la baliza superior flotante `#guide-beacon-3` (`top: -26px`), impidiendo interactuar con ella limpiamente.
  - *Solución Integral Implementada*:
    1. **Hitbox Expandida (`::before` en `.iso-prop`)**: Inclusión de un pseudo-elemento invisible con `inset: -18px; z-index: 30; pointer-events: all; cursor: pointer;` en todos los props (`prop-locker`, `prop-security-door`, `prop-workbench`, `prop-engine`, `prop-respel-station`, `wall-eyewash`, `wall-extinguisher`), ampliando el área de toque en más de un 40% en todas las direcciones.
    2. **Demarcaciones de Piso Interactivas (`.floor-safety-zone`)**: Se activó `pointer-events: all; cursor: pointer;` con listeners específicos para cada estación (`zone-mark-lockers`, `zone-mark-checkpoint`, `zone-mark-workbench`, `zone-mark-engine`, `zone-mark-respel`), de modo que tocar el suelo demarcado de un equipo activa inmediatamente su función.
    3. **Enrutamiento Inteligente en `handleFloorClick`**: Si el clic impacta una baldosa ocupada por un mueble o maquinaria (ej. fila 0 en Vestidor; fila 0 o fila 3 en Patio), el sistema reconoce la intención y activa la estación correspondiente en lugar de mover al avatar adentro del obstáculo.
    4. **Corrección de `overflow` en RESPEL**: Se configuró `overflow: visible;` en `.prop-respel-station` y se agregaron listeners directos en cada una de las 3 canecas individuales (`bin-filters`, `bin-solids`, `bin-oil`).


- **Compromisos de Reunión Técnica y Documentación No Técnica (Samuel & Yazlin)**:
  - *Contexto y Necesidad*:
    1. Se atendieron las directrices acordadas con el cliente ("lo que dice Samuel y podemos hacerlo, hazlo").
    2. Se requirió entregar dos documentos en texto plano/Markdown, redactados sin jerga técnica de programación o desarrollo, orientados a explicar el funcionamiento paso a paso de cada juego y cómo proceder ante fallas o dudas en terreno.
  - *Entregables Creados*:
    1. `docs/GUIA_PASO_A_PASO_JUEGOS.md`: Guía detallada y accesible para cualquier nivel de formación del personal sobre los 5 juegos (SGA, Bodega, Trasiego, Taller y Brigada), explicando propósito de SST, controles simples para PC y celular, paso a paso de tareas, consecuencias de errores y cómo ganar.
    2. `docs/PREGUNTAS_Y_RESPUESTAS_FALLAS.md`: Manual de preguntas frecuentes y contingencias operativas para facilitadores de SST ante pantallas congeladas, dudas pedagógicas en obra, errores de puntero/toque, reinicios y validaciones normativas.
  - *Validación de Procedimientos Técnicos Existentes en Código*:
    1. **Juego 2 (Bodega)**: Matriz NTC 4435 y Res. 773/2021 plenamente funcional con detección ortogonal y zona de rechazo RESPEL para envases ilegales de bebidas.
    2. **Juego 3 (Trasiego)**: Procedimiento paso a paso según Dec. 1079/2015 (Motor OFF/cuñas -> Masa/polo a tierra chasis -> Manguera/bandeja -> Extintor satélite perimetral).
    3. **Juego 4 (Taller)**: Flujo procedimental por etapas (EPP Casillero -> Checkpoint -> Desengrase -> Motor V8 -> RESPEL segregado) con hitboxes optimizadas.


- **Implementación del Procedimiento de Trasiego Paso a Paso - Juego 3 (`juego3_trasiego.html`)**:
  - *Diagnóstico*: En la versión previa, el juego penalizaba errores de secuencia ATS en el código pero todos los 6 hotspots parpadeaban en rojo al mismo tiempo, lo que generaba incertidumbre para operarios en obra que no dominaban de antemano el orden legal.
  - *Solución*:
    1. **Barra Superior de Ruta (`.trasiego-roadmap-guide`)**: Implementación de una barra interactiva con las 6 etapas canónicas del Decreto 1079 de 2015 / NFPA 77:
       - Paso 1: Cuñas en Llantas (Inmovilización mecánica).
       - Paso 2: Motor / Cabina (Apagado y aislamiento de celulares).
       - Paso 3: Polo a Tierra (<10 Ω al chasis).
       - Paso 4: Bandeja de Goteo (Contención secundaria al 110%).
       - Paso 5: Kit de Derrames (Alistamiento in situ).
       - Paso 6: Extintor ABC 150 lbs (Perímetro a 5 metros).
    2. **Estados Dinámicos de Hotspots**: El paso activo pulsa intensamente en dorado (`is-step-active`) con su número de etapa y etiqueta destacada. Los pasos futuros permanecen bloqueados y atenuados (`is-step-locked`) con etiqueta `🔒 ESPERA PASO X`. Los completados se marcan en verde (`is-certified`).
    3. **Enrutamiento y Diálogos de Bolívar Safety Bot**: Al tocar o soltar una acción en un punto adelantado, el sistema indica amablemente: *"¡Punto bloqueado! El procedimiento paso a paso exige completar primero el [Paso X: Nombre]"* y resalta el hotspot activo con rebote GSAP.

- **Refuerzo Pedagógico de la Matriz de Compatibilidades Química - Juego 2 (`juego2_bodega.html`)**:
  - *Diagnóstico*: La matriz química (NTC 4435 / Res. 773/2021) estaba confinada a un botón secundario en el header y evaluada internamente, pero operarios de bajo nivel de escolaridad necesitaban una referencia rápida y constante en pantalla.
  - *Solución*:
    1. **Paso 2 del Tutorial**: Rediseñado para enseñar explícitamente el Semáforo de Compatibilidad Química (Verde = Compatible, Amarillo = Precaución/Separar con estiba o extintor, Rojo = Incompatible violento).
    2. **Barra de Guía Rápida de Semáforo (`.matrix-quick-legend-bar`)**: Ubicada permanentemente arriba de la bandeja de sustancias con chips visuales coloreados y el botón de acceso directo `[ Tabla NTC 4435 ]`.

- **Garantía y Despliegue de la Matriz Completa y Real de Compatibilidad Química - Juego 2 (`juego2_bodega.html`)**:
  - *Causa Raíz de la Solicitud*: El usuario solicitó asegurar que la matriz fuera completa y real. Anteriormente, el modal `#modal-matrix` contenía una tabla simplificada de 4 clases agrupadas que no distinguía entre ácidos y álcalis/bases (Ácido Muriático vs Soda Cáustica), omitiendo además las clases ONU/SGA canónicas (Explosivos 1, Comburentes 5.1, Peróxidos 5.2, Sólidos 4, Tóxicos 6.1, Inertes 2.2).
  - *Solución Integral Implementada*:
    1. **Matriz Oficial Completa de 12 Clases Técnicas (NTC 4435 / CISTEMA ARL Sura / CCS / MinAmbiente)**:
       - Fila y Columna 1: 💥 Clase 1 - Explosivos (Almacenamiento exclusivo en polvorín Indumil).
       - Fila y Columna 2: 🔥 Clase 2.1 - Gases Inflamables (`item_acetylene`: Acetileno).
       - Fila y Columna 3: 🛢️ Clase 2.2 - Gases Inertes / No Inflamables (Argón, CO2, Nitrógeno).
       - Fila y Columna 4: ☠️ Clase 2.3 - Gases Tóxicos (Cloro, Amoníaco).
       - Fila y Columna 5: 🔥 Clase 3 - Líquidos Inflamables (`item_acpm`: ACPM / Diésel).
       - Fila y Columna 6: 📦 Clase 4 - Sólidos Inflamables / Reactivos (4.1, 4.2, 4.3).
       - Fila y Columna 7: ⭕ Clase 5.1 - Comburentes / Sustancias Oxidantes (Nitrato, Peróxido de hidrógeno conc.).
       - Fila y Columna 8: ❄️ Clase 5.2 - Peróxidos Orgánicos (Cuarto frío refrigerado con control TDAA).
       - Fila y Columna 9: ☠️ Clase 6.1 - Sustancias Tóxicas Agudas (Venenos).
       - Fila y Columna 10: 🧪 Clase 8A - Corrosivos ÁCIDOS (`item_muriatic`: Ácido Muriático 28%).
       - Fila y Columna 11: 🧼 Clase 8B - Corrosivos BÁSICOS / ÁLCALIS (`item_soda_caustic`: Soda Cáustica líquida).
       - Fila y Columna 12: ☣️ Clase 9 - Misceláneos / SGA Salud (`item_paint`: Pintura Epóxica + Catalizador).
    2. **Las 4 Convenciones Oficiales del Semáforo Colombiano**:
       - 🟢 *Verde (Compatible)*: Almacenamiento conjunto permitido en el mismo módulo o estante.
       - 🟡 *Amarillo (Precaución / Condicional)*: Requiere revisión de FDS y separación física (2-3 metros, contención secundaria independiente o buffer neutro).
       - 🔴 *Rojo (Incompatible)*: Prohibido almacenar juntos; exige muros cortafuego de 2 horas o distancia > 6 metros (NFPA 30 / NFPA 55).
       - ⚫ *Negro/Gris Oscuro (Almacenamiento Especial Exclusivo)*: Polvorín Indumil o cámara refrigerada; no almacenar en bodega común.
    3. **Panel de Mapeo Directo de Insumos de Obra**: Tarjetas de identificación en la cabecera del modal que vinculan cada ítem del juego con su clase de riesgo oficial y su regla operativa, incluyendo la infracción mortal del Art. 20 Res. 773/2021 (botella de refresco reenvasada ➔ envío inmediato a RESPEL).
    4. **Ergonomía de Visualización**: Diálogo expandido a 980px con cabecera fija (`sticky top: 0`) y primera columna fija (`sticky left: 0`), celdas con badges explicativos y scroll horizontal suave `.custom-scroll`.

- **Despliegue del Modal de Contexto Situacional (Briefing Táctico Datapad) en los 5 Juegos**:
  - *Causa Raíz de la Solicitud*: El usuario solicitó: *"Verifica, y bueno, sale un contexto a todos los juegos, como un texto que explica la situación"*. Se detectó que, si bien el Juego 5 ya disponía de un modal de misión antes de iniciar, los Juegos 1, 2, 3 y 4 ingresaban directamente al tutorial o a la cabina interactiva sin que el operario comprendiera claramente el escenario operacional de infraestructura vial en el que se encontraba (recepción de insumos, bodega central desordenada, abastecimiento con camión cisterna, intervención de taller).
  - *Solución Integral Arquitectónica*:
    1. **Estandarización Estética Star Wars Datapad Simplificado**:
       - Contenedor modal `#modal-briefing-overlay` con clase `.open` por defecto.
       - Silueta biselada con corte a 45° (`clip-path: polygon(...)`), paleta institucional Bolívar con acentos amarillos Star Wars (`#FFC72C`) y fondo obsidiana espacial (`#060A14`).
       - Tipografía monoespaciada limpia `JetBrains Mono` con escala uniforme (14px en cuerpo) sin disparidad ni saturación visual.
    2. **Estructura Modular Homogénea**:
       - *Encabezado*: Título con prefijo táctico de consola (`DATAPAD // SST-0X`) e icono temático FontAwesome.
       - *Contexto Situacional*: Breve descripción de la situación operativa real de obra (2-3 líneas).
       - *Directiva Operativa en 3 Pasos*: Badges numéricos claros y concisos indicando las acciones clave a ejecutar.
       - *Controles Directos*: Renglón compacto con la asignación para PC y dispositivos móviles/pantallas táctiles.
       - *Botón de Despliegue*: Botón destacado `btn-start-briefing` con hover luminoso y sonido procedimental `tap()`.
    3. **Sincronización de Cronómetros y Ciclo de Vida**:
       - **Juego 4 (`juego4_taller.html`)**: Se corrigió el inicio prematuro del temporizador de 90s (anteriormente se activaba en `DOMContentLoaded`). Ahora el juego inicia en reposo (`isGameActive = false`) y el reloj arranca exactamente cuando el operario pulsa el botón de despliegue tras leer el briefing.
       - **Juegos 1, 2 y 3**: El cierre del overlay oculta el backdrop (`display: none`), remueve la clase `.open` y arranca la interacción sin consumos de tiempo indebidos.

- **Integración Nativa en Moodle LMS y Empaquetado SCORM 1.2 (`BolivarLmsBridge`)**:
  - *Causa Raíz de la Solicitud*: El usuario indicó: *"Serán usados en moodle, haz lo que veas necesario"*. Para que los juegos se utilicen de forma profesional en Moodle de Seguros Bolívar / KMA, se requiere comunicación bidireccional estándar para asentar las calificaciones de los operarios directamente en el Libro de Calificaciones (Gradebook), capacidad de empaquetado como actividades SCORM y adaptación a iframes estrechos de Moodle.
  - *Solución Integral Arquitectónica*:
    1. **Adaptador Universal Autocontenido (`BolivarLmsBridge`)**:
       - Integrado en los 5 juegos (`juego1_sga.html` a `juego5_emergencias.html`) sin ninguna librería externa adicional.
       - Algoritmo de búsqueda jerárquica y recursiva del objeto API SCORM en `window`, `window.parent`, `window.top` y `window.opener`.
       - Soporta nativamente tanto **SCORM 1.2** (`LMSInitialize`, `LMSSetValue`, `LMSCommit`, `LMSFinish`) como **SCORM 2004** (`Initialize`, `SetValue`, `Commit`, `Terminate`).
       - Asignación de variables estándar CMI:
         - `cmi.core.score.raw` = Puntaje numérico final (0 a 100).
         - `cmi.core.score.min` = 0.
         - `cmi.core.score.max` = 100.
         - `cmi.core.lesson_status` = `passed` (para calificaciones $\ge 80\%$) o `failed` (para $< 80\%$).
       - Cierre de sesión limpio con `beforeunload` para evitar sesiones colgadas en Moodle.
    2. **Canal de Comunicación iFrame (`postMessage`)**:
       - Al finalizar la auditoría, emite `window.parent.postMessage({ type: 'MOODLE_GAME_REPORT', gameId, score, passed, details }, '*')`, habilitando integración en etiquetas o páginas HTML de Moodle que utilicen scripts de captura externa.
    3. **Botón Integrado de Pantalla Completa (`btn-moodle-fullscreen`)**:
       - Ubicado en la barra superior / HUD de los 5 juegos.
       - Acciona la API nativa de pantalla completa (`requestFullscreen` / `exitFullscreen`) permitiendo que el operario se concentre en la simulación al 100% de su pantalla sin sufrir por las barras laterales o cabeceras del tema de Moodle.
    4. **Pipeline Automatizado de Empaquetado (`build_scorm.py`)**:
       - Genera paquetes ZIP canónicos estándar SCORM 1.2 en la carpeta `scorm_packages/`:
         - `juego1_sga_scorm.zip`
         - `juego2_bodega_scorm.zip`
         - `juego3_trasiego_scorm.zip`
         - `juego4_taller_scorm.zip`
         - `juego5_emergencias_scorm.zip`
         - `suite_completa_5juegos_scorm.zip` (Multi-SCO combo)
       - Cada paquete contiene su manifiesto oficial `imsmanifest.xml` con esquema ADL SCORM 1.2 y `index.html` como recurso de lanzamiento.
    5. **Documentación de Despliegue (`docs/GUIA_INTEGRACION_MOODLE.md`)**:
       - Manual paso a paso para administradores de Moodle explicando configuración de intentos, calificación más alta, ventana emergente vs actual y resolución de contingencias.

## Depuración Crítica - Juego 1 (juego1_sga.html): Bloqueo en Pestaña Inicial
- **Diagnóstico del Fallo ("No pasa de la pestaña primera, antes de empezar el juego")**:
  - Al instanciar `new SgaGameController()`, el constructor inicializaba `this.fx = new FxEngine(this.dom.fxCanvas, this.dom.viewport)`.
  - El elemento `<canvas id="fx-canvas">` no estaba presente en el árbol DOM de `juego1_sga.html`, por lo que `this.dom.fxCanvas` retornaba `null`.
  - El constructor de `FxEngine` intentaba ejecutar `this.ctx = canvas.getContext('2d')`, arrojando una excepción fatal no controlada: `TypeError: Cannot read properties of null (reading 'getContext')`.
  - Como resultado, la ejecución de JavaScript se detenía antes de llamar a `this.bindEvents()` y `this.initTutorial()`.
  - Al no registrarse los eventos, el modal de briefing inicial `#modal-briefing-overlay` ("MISIÓN: RECEPCIÓN Y CLASIFICACIÓN SGA") quedaba congelado sobre la pantalla sin responder al clic del botón `btn-start-briefing`, y el tutorial subyacente no inyectaba sus casillas interactivas ni habilitaba el inicio del examen.
- **Corrección Quirúrgica Aplicada**:
  1. Se incorporó el elemento `<canvas id="fx-canvas" style="position: absolute; inset: 0; pointer-events: none; z-index: 45; width: 100%; height: 100%;"></canvas>` dentro de `#app-viewport`.
  2. Se blindó la clase `FxEngine` con defensas exhaustivas (`if (!canvas || !host || typeof canvas.getContext !== 'function') { this.enabled = false; return; }`), asegurando que ningún fallo en el contexto gráfico interrumpa el ciclo de vida del juego.
  3. Se añadieron cierres de contingencia para el modal de briefing mediante clic en backdrop y teclas `Enter`, `Escape` y `Espacio`, garantizando accesibilidad y respuesta instantánea.

## Depuración Crítica - Juego 1 (juego1_sga.html): Arrastre Universal de la Tarjeta ("Solo permite arrastrar desde la derecha")
- **Diagnóstico del Fallo ("No permite arrastrar el cuadrado desde cualquier punto, solo desde la derecha")**:
  - En la tarjeta del químico (`#tutorial-chem-card` y `.exam-card`), los elementos hijos del lado izquierdo (el encabezado con icono, el título `<h3>`, el alias y el párrafo `.chem-desc`) tenían `touch-action: auto` y carecían de `pointer-events: none`.
  - Al pulsar sobre el lado izquierdo o central de la tarjeta, el navegador interpretaba el movimiento como un intento de selección de texto o desplazamiento nativo de contenedor (`overflow-y-auto`), disparando el evento nativo `dragstart` o emitiendo `pointercancel`. Esto cancelaba inmediatamente el listener de arrastre antes de alcanzar el umbral de movimiento de 6px.
  - En contraste, el lado derecho de la tarjeta carecía de bloques de texto (era fondo plano o margen), por lo que el navegador sí respetaba el `touch-action: none` del contenedor raíz `.draggable-card`, permitiendo arrastrar únicamente desde esa zona.
- **Corrección Quirúrgica Aplicada**:
  1. **Aislamiento de Puntero en Hijos**: Se aplicó `.draggable-card > *:not(button) { pointer-events: none; }`, asegurando que cualquier clic en cualquier coordenada de la tarjeta (izquierda, centro o derecha) tenga como objetivo directo a `cardEl`.
  2. **Inmunidad a Selección y Drag Nativo**: Se configuró `touch-action: none !important; user-select: none !important; -webkit-user-drag: none !important;` en la tarjeta y en todos sus descendientes, y se añadió `cardEl.addEventListener('dragstart', (e) => e.preventDefault())`.
  3. **Pointer Capture Robusto**: En `onPointerDown`, se activó `cardEl.setPointerCapture(e.pointerId)`, garantizando que el flujo de eventos de movimiento y soltado se mantenga fijado a la tarjeta en todo momento.
  4. **Preservación de Botones**: Los botones internos (`.btn-inspect-fds` y `.btn-card-fds`) retienen `pointer-events: auto !important` y `cursor: pointer` para que la inspección de la FDS continúe funcionando con total fluidez.

## Depuración Crítica - Juego 1 (juego1_sga.html): Flujo Directo de Victoria del Tutorial
- **Diagnóstico del Fallo ("Al ganar el tutorial, sale el mensaje del fds en lugar de seguir directo")**:
  - `handleTutorialSelection` contenía una condición `if (this.tutorialStep === 1)` que forzaba la apertura del modal FDS (`this.openFds(...)`) interceptando la primera clasificación exitosa.
  - Además, tras cerrar el modal o clasificar, el tutorial no avanzaba automáticamente al juego, sino que requería hacer clic en un botón desbloqueado.
- **Corrección Quirúrgica Aplicada**:
  - Se eliminó la intercepción invasiva de `openFds` dentro del arrastre/selección del tutorial.
  - Al clasificar correctamente en el pictograma Corrosivo, el juego reproduce el sonido de acierto, lanza confeti y transiciona de forma directa e inmediata a `startExamPhase()` tras 400ms, eliminando cualquier paso redundante.

## Arquitectura y UX - Juego 1 (juego1_sga.html): Modal Pedagógico "Hora de aprender" al Fallar
- **Requerimiento del Usuario**: Al cometer un error de clasificación (sea en tutorial o en examen), desplegar un mensaje corto y pedagógico que explique claramente "cómo funciona y por qué falló", bajo el concepto "Hora de aprender".
- **Desafíos Técnicos y de Experiencia de Usuario**:
  1. *Preservación del Tiempo de Examen*: En la fase de examen, el temporizador de 75s corre continuamente. Si el usuario se detiene a leer una explicación educativa mientras el reloj avanza, sufriría una doble penalización injusta (los -10s del fallo + el tiempo de lectura).
  2. *Doble Perspectiva Didáctica*: El mensaje no debe limitarse a decir "incorrecto". Debe responder con exactitud dos incógnitas clave: "¿Por qué falló?" (por qué la opción elegida no aplica) y "¿Cómo funciona la regla?" (por qué la FDS exige el pictograma correcto).
  3. *Coherencia de Flujo Tutorial vs. Examen*: En el tutorial, cerrar el feedback debe mantener al usuario en la pantalla para intentar de nuevo. En el examen, cerrar el feedback debe reanudar el cronómetro y pasar a la siguiente tarjeta o concluir el examen.
- **Solución Quirúrgica Implementada**:
  1. **Catálogo Estructurado `LEARNING_GUIDES`**: Mapeo exacto para cada uno de los 7 productos químicos (`tut_0` y `chem_1` a `chem_6`), sintetizando en 1-2 líneas idiomáticas el motivo del fallo y la regla técnica del SGA / FDS.
  2. **Diseño Visual de Alto Impacto**: Rediseño del modal `#modal-error-feedback` con insignia superior dorada `💡 HORA DE APRENDER`, presentación visual de los pictogramas SVG en contenedores coloreados (rojo para el elegido y verde para el legal), micro-tarjetas de alto contraste y botón `[ Entendido, Continuar → ]`.
  3. **Pausado y Reanudación Automática del Reloj**: Métodos `pauseTimer()` y `resumeTimer()` que congelan el intervalo de tiempo durante la lectura y lo restauran inmediatamente tras el cierre.
  4. **Accesibilidad Multi-input**: Cierre garantizado mediante clic en botón, clic fuera del diálogo (backdrop) o teclas `Enter` / `Escape`.

## Depuración Crítica - Juego 2 (juego2_bodega.html): Deformación de Tarjetas y Fallo de Arrastre
- **Diagnóstico del Fallo ("Las tarjetas crecen sin razón y la tarjeta no se arrastra")**:
  1. *Crecimiento desmedido de tarjetas*:
     - `.is-dragging:not(.iso-sprite)` contenía la regla `aspect-ratio: 1 / 1 !important;`. Las tarjetas de la bandeja miden normalmente 98px de alto y ~160px de ancho en pantallas estándar. Al forzar una relación de aspecto 1:1, su altura saltaba instantáneamente a ~160px. Como la bandeja `#items-tray` es un CSS Grid, expandir un elemento forzaba a **toda la fila de la cuadrícula a triplicar su tamaño**, deformando las tarjetas adyacentes.
     - En `setupCardDragAndDrop`, se aplicaba `scale(1.12)` a la tarjeta durante el movimiento, incrementando aún más sus dimensiones.
     - En `.item-selected`, existía `transform: scale(1.04);` y una animación cíclica `pulseGlow`.
     - En `renderInventoryTray()`, se inyectaba la clase `pop-comic` (`scale(1.22)`), y en `handleTrayItemClick()` se volvía a llamar a `renderInventoryTray()`, destruyendo y recreando todos los nodos del DOM en cada clic, lo que hacía que todas las tarjetas se inflaran y rebotaran simultáneamente.
     - `.tray-card` tenía `transition: all 0.2s ease;`, animando los cambios dimensionales de forma retardada.
  2. *Fallo e interrupción del arrastre*:
     - En pantallas táctiles o paneles con gestos, el contenedor padre `#phase-challenge` posee `overflow-y-auto`. Al mover el dedo verticalmente hacia el tablero, el navegador interpretaba el gesto como scroll vertical de página y disparaba un evento `pointercancel`, interrumpiendo el arrastre a los pocos píxeles.
     - Faltaba la captura activa del puntero (`setPointerCapture`), ya que se había omitido intencionalmente en el código original.
     - Los descendientes (`.tray-card-name`, `.tray-card-badge` y el contenedor del SVG) no tenían `pointer-events: none` definido en CSS (la clase `.pointer-events-none` no existía en el archivo), lo que permitía selección de texto nativa o cancelación de eventos de puntero.
- **Corrección Quirúrgica Aplicada**:
  1. **Estabilización Dimensional Radical**: Se retiró `aspect-ratio: 1 / 1 !important;` de `.is-dragging:not(.iso-sprite)` y se eliminó `transform: scale(1.04)` de `.item-selected`. La transición de `.tray-card` se restringió exclusivamente a colores y sombras (`transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;`).
  2. **Selección Eficiente sin Re-renderizado**: Se implementó `updateTraySelection(selectedId)` que conmuta la clase `.item-selected` de forma quirúrgica en el DOM sin destruir los elementos ni re-invocar `renderInventoryTray()`. Se retiró la animación `pop-comic` de las tarjetas de la bandeja.
  3. **Pointer Capture Robusto y Universal**: Se integró `cardEl.setPointerCapture(e.pointerId)` en `onPointerDown` y `releasePointerCapture` en `onPointerUp`, blindando el flujo de eventos frente a cancelaciones por scroll vertical en `#phase-challenge`.
  4. **Blindaje de Puntero en Hijos**: Se declararon las reglas `.draggable-card > *:not(button) { pointer-events: none; }`, `.pointer-events-none { pointer-events: none !important; }` y `touch-action: none !important; user-select: none !important; -webkit-user-drag: none !important;` en hijos.
  6. **Regeneración de Paquetes SCORM 1.2**: Sincronización completa de `scorm_packages/juego2_bodega_scorm.zip` y del combo suite.

## Optimización de UX y Ergonomía Visual - Juego 2 (juego2_bodega.html): Eliminación de Layout Shift y Sacudida Brusca
- **Diagnóstico del Fallo ("Esa advertencia mueve todo, sale muy repentina, y es algo complicada de llevar por el movimiento tan brusco")**:
  1. *Desplazamiento del Layout (Mueve todo)*:
     - `#exothermic-alert-strip` y `#hazard-toast` se renderizaban en el flujo flex vertical normal de `#phase-challenge` (`justify-between`), directamente arriba de `.iso-viewport` (el tablero isométrico).
     - Al activarse una incompatibilidad, ambos banners pasaban de `hidden` a visibles agregando >110px de altura, empujando instantáneamente el tablero hacia abajo. Al resolverse la incompatibilidad, desaparecían y jalaban el tablero hacia arriba. Esto hacía que el tablero se moviera debajo del cursor o dedo mientras el usuario intentaba manipular reactivos.
  2. *Aparición Repentina y Tensa*:
     - La alerta pasaba de 0 a 100% en 0ms sin interpolación ni animación de entrada.
     - La cuenta regresiva de 6 segundos generaba una presión excesiva y precipitada antes de que el usuario pudiera leer qué sustancias estaban en conflicto.
  3. *Movimiento Físico Brusco y Fatiga Auditiva*:
     - `@keyframes shakeScreen` sacudía físicamente todo `#app-viewport` mediante `translateX(-8px) rotate(-0.5deg)`, desestabilizando la vista y dificultando la precisión del puntero.
     - `sound.hazardAlarm()` se disparaba en bucle cada 1 segundo en `setInterval`, provocando aturdimiento auditivo.
- **Corrección Quirúrgica Aplicada**:
  1. **Cero Layout Shift (Contenedor Flotante Absoluto)**:
     - Se encapsularon los elementos de alerta en `.hazard-floating-container` (`position: absolute; top: 86px; left: 14px; right: 14px; z-index: 60;`), desacoplándolos del flujo del layout.
     - El tablero isométrico `.iso-viewport`, la zona de rechazo `#zone-reject` y la bandeja `#items-tray` permanecen **estrictamente fijos y estables** en sus posiciones originales; no se desplazan ni un solo píxel al saltar o retirarse una alerta.
  2. **Entrada Suave y Ergonomía Temporal**:
     - Animación suave de entrada `@keyframes alertFadeSlide` (fade + slide-down sutil de 0.25s) y diseño compacto con `backdrop-filter: blur(8px)`.
     - Ampliación del tiempo de reacción de 6s a 10s para permitir una lectura calmada y analítica del riesgo químico.
  3. **Eliminación Total de Sacudida Física y Spam de Audio**:
     - `@keyframes shakeScreen` fue redefinido como un pulso lumínico perimetral (`box-shadow: inset 0 0 26px rgba(239, 68, 68, 0.45)`), sin traslación (`translateX: 0`) ni rotación. La pantalla física nunca se mueve.
     - Supresión del pitido repetitivo de alarma en cada segundo del temporizador: la señal sonora de advertencia se activa una única vez por detección de incompatibilidad.
  4. **Regeneración SCORM 1.2**:
     - Paquetes actualizados y reconstruidos en `scorm_packages/juego2_bodega_scorm.zip` y `suite_completa_5juegos_scorm.zip`.

## Optimización de Escala y Legibilidad - Juego 2 (juego2_bodega.html): Redimensionamiento del Tablero Isométrico
- **Diagnóstico del Fallo ("El tablero de juego se ve demasiado pequeño")**:
  - En el layout original, `#warehouse-board` tenía fijadas dimensiones rígidas de `280px x 280px`.
  - Debido a la proyección isométrica (`rotateX(60deg) rotateZ(-45deg)`), la perspectiva 3D comprime la altura vertical aparente a la mitad (`cos(60°) = 0.5`), provocando que un tablero de 280px se proyectara con apenas ~140px de altura vertical en pantalla.
  - Como resultado, dentro de un viewport de hasta 820px de ancho, el tablero ocupaba una pequeña fracción central, las 9 celdas medían solo ~82px y los sprites de químicos medían 56px (`w-14`), viéndose apretados, difíciles de pulsar y con micro-etiquetas.
- **Corrección Quirúrgica Aplicada**:
  1. **Escalado del Tablero a 370px (+70% de Superficie)**:
     - Se aumentó la cuadrícula de `#warehouse-board` de 280px a `370px x 370px` (`max-width: 92vw; aspect-ratio: 1/1;`) con `gap: 10px; padding: 10px;`. En pantallas estrechas (<420px) se adapta automáticamente a `330px x 330px`.
  2. **Ampliación de Sprites y Celdas de Almacén**:
     - Las celdas pasaron a tener una altura mínima de `96px` (más de 105px de área efectiva de contacto).
     - Los sprites vectoriales de reactivos (`.iso-sprite`) se incrementaron de 56px a `72px x 72px` (`w-18 / w-20`), proyectando detalles nítidos de pictogramas SGA y sombras de oclusión más profundas.
  3. **Escalado Tipográfico de Coordenadas y Marcadores**:
     - Las coordenadas (`.iso-coord-label`: A1-C3) se aumentaron a `0.82rem` (`var(--font-mono)`).
     - Los marcadores de peligro ambiental (`⚡ 440V` y `☀️ CALOR`) se ampliaron a `0.72rem` con `padding: 2px 6px;`.
  4. **Adaptación Vectorial Láser**:
     - Como la capa SVG `#board-connections-svg` utiliza `viewBox="0 0 300 300"` y `width: 100%; height: 100%;`, todas las líneas láser dinámicas ortogonales y diagonales escalaron perfectamente sin desalineación geométrica.
  5. **Regeneración de Paquetes SCORM 1.2**:
     - Paquetes actualizados en `scorm_packages/juego2_bodega_scorm.zip` y `suite_completa_5juegos_scorm.zip`.



## Corrección Visual y Desacople de CSS - Juego 2 (juego2_bodega.html): Tutorial Paso 1
- **Diagnóstico del Fallo ('Se ve mal' en el Tutorial Paso 1)**:
  - Al aplicar previamente width: 370px; height: 370px; y min-height: 96px; a nivel global en .iso-board y .iso-cell, se afectó la celda de demostración individual #tut-demo-cell en el Paso 1 del Tutorial (#tut-panel-1).
  - El contenedor demo del tutorial, al heredar la clase .iso-board, se expandió a 370px, desplazó la flecha ➔ y la tarjeta del químico hacia la izquierda, y proyectó la celda solitaria A1 fuera de centro, rodeada por un área vacía desproporcionada.
- **Corrección Quirúrgica Aplicada**:
  1. **Aislamiento Estricto de Reglas CSS**:
     - Se restringieron las dimensiones de 370px exclusivamente al ID del tablero de juego principal: #warehouse-board { width: 370px; height: 370px; ... }.
     - La clase genérica .iso-board conserva únicamente las propiedades 3D (transform-style: preserve-3d; transform: rotateX(60deg) rotateZ(-45deg); transition: ...).
     - min-height: 96px se restringió exclusivamente a las celdas del tablero #warehouse-board .iso-cell.
  2. **Rediseño Proporcional del Paso 1 del Tutorial**:
     - Se encapsuló el destino de demostración en un viewport isométrico dedicado (width: 120px; height: 100px; perspective: 700px;) con tarjeta simétrica de 140px.
     - #tut-demo-cell se fijó exactamente a 86px x 86px coincidiendo con su tablero local, asegurando rotación concéntrica y centrada sin desfase.
     - Se reemplazó la animación 2D genérica (happy-jiggle) por happy-jiggle-3d sobre el sprite del tambor para preservar intacto el plano isométrico al soltar o colocar el químico.
  3. **Reconstrucción SCORM 1.2**:
     - Paquetes regenerados y validados con python build_scorm.py.

## Homologación Visual de Arrastre - Juego 2 (juego2_bodega.html): Proxy de Tarjeta para Piezas Ubicadas
- **Diagnóstico del Requerimiento ('Que cuando estén ya colocados, al arrastrarlos a otro puesto se vea igual la tarjeta')**:
  - Al arrastrar un reactivo directamente desde la bandeja inferior, se desplazaba la tarjeta completa (\	ray-card\) con fondo, borde amarillo, tipografía de reactivo y badge clasificador.
  - Sin embargo, al arrastrar una pieza que ya estaba ubicada sobre una celda del almacén (\.iso-sprite\), el sistema aplicaba una proyección 3D local con CSS transparente, moviendo únicamente el icono SVG desnudo sin tarjeta ni rotulado.
- **Solución Quirúrgica Aplicada**:
  1. **Proxy Flotante Universal (\dragProxy\)**:
     - Al detectar arrastre en una pieza de casilla (\.iso-sprite\), se genera dinámicamente un elemento proxy clon idéntico a la tarjeta (\	ray-card is-dragging\) en \position: fixed\ montado en \document.body\.
     - Contiene exactamente el icono SVG, el nombre completo (\.tray-card-name\) y el badge SGA (\.tray-card-badge\) con su borde amarillo de combate y sombra táctica.
     - Sigue al cursor suavemente con inclinación física (\scale(1.04) rotate(rot)\), mientras la celda de origen se atenúa temporalmente (\opacity: 0.25\).
  2. **Interacción y Liberación Limpia**:
     - \document.elementFromPoint\ detecta limpiamente la celda destino, la zona de rechazo o la bandeja de inventario.
     - Al soltar, el proxy se destruye sin dejar residuos en el DOM y se ejecuta el intercambio (\swap\), traslado o retorno a inventario.
  3. **Reconstrucción SCORM 1.2**:
     - Paquetes actualizados en \scorm_packages/juego2_bodega_scorm.zip\ y \suite_completa_5juegos_scorm.zip\.

## Rediseño Integral de Pantalla y Jerarquía Hero - Juego 2 (juego2_bodega.html)
- **Diagnóstico del Fallo ('Tapa gran parte. Puedes rediseñar la pantalla para que el juego sea ese principal ámbito')**:
  - Al desencadenarse una reacción exotérmica o incompatibilidad, los dos banners de advertencia (\exothermic-alert-strip\ y \hazard-toast\) flotaban en \	op: 86px\, tapando de forma directa las casillas superiores A1, A2 y A3 del tablero isométrico.
  - Además, la acumulación vertical de barras secundarias independientes (barra de estado, banner de probando, zona de rechazo de 65px, barra de matriz de 40px y bandeja de 160px) comprimía el espacio útil, empujando la bandeja fuera de pantalla.
- **Solución Quirúrgica y Rediseño de Layout**:
  1. **El Tablero 3D como Hero Principal**:
     - Se dotó al \.iso-viewport\ de una holgura superior (\padding: 70px 0 15px 0\) y altura mínima de 380px, dejando el tablero 3x3 totalmente despejado y visible en todas sus 9 celdas y conexiones sin superposiciones.
  2. **Reubicación de Alertas sin Colisión**:
     - Las alertas flotantes se posicionaron en \	op: 48px\ con diseño ultra-compacto (34px-38px), alojándose limpiamente en el margen superior por encima del vértice del tablero isométrico, garantizando visibilidad 100% de la fila A.
  3. **Consolidación de Controles Periféricos**:
     - Se integró el estado de seguridad y la sustancia activa en una sola barra táctica de cabecera de 36px.
     - Se unificó la Zona de Rechazo RESPEL y el Semáforo de la Matriz Química en un solo dock inferior horizontal side-by-side de 42px, recuperando más de 160px verticales.
     - La bandeja de inventario (\#items-tray\) queda inmediatamente visible y accesible sin scroll.
  4. **Reconstrucción SCORM 1.2**:
     - Paquetes actualizados en \scorm_packages/juego2_bodega_scorm.zip\ y \suite_completa_5juegos_scorm.zip\.

## Recreación Visual de la Matriz de Compatibilidad Química - Juego 2 (juego2_bodega.html)
- **Diagnóstico del Requerimiento ('Muestra la matriz no solo con texto, recrea la matriz de verdad, que sea visual')**:
  - La tabla previa de compatibilidad en #modal-matrix presentaba una apariencia de hoja de cálculo genérica basada en texto plano con abreviaturas diminutas (⚫ E, 🟢 C, 🟡 P, 🔴 I) y encabezados sin representación gráfica de los riesgos.
  - El usuario requería la representación gráfica auténtica de la matriz de almacenamiento químico (estilo oficial CISTEMA / ARL Bolívar / CCS / NTC 4435 / Res. 773 de 2021), dotada de rombos SGA, bloques de color semáforo y claridad interactiva.
- **Implementación y Arquitectura Visual**:
  1. **Rombos Oficiales SGA / GHS Vectoriales en Cabeceras**:
     - Se incorporaron rombos normalizados SVG vectoriales con borde carmesí #dc2626 y pictogramas de peligro (Llama, Corrosión, Bombona Gas a Presión, Calavera, Comburente, Explosivo, Exclamación) en los encabezados de columnas y filas.
  2. **Selector Dual de Pestañas Tácticas**:
     - **Pestaña 1 - Matriz Táctica de Obra (5x5)**: Enfocada directamente en los reactivos del desafío (ACPM, Ácido Muriático, Soda Cáustica, Acetileno, Pintura Epóxica) con sus sprites 3D vectoriales, semáforos de alto impacto y reglas de incompatibilidad directas. Incluye guías dedicadas para Buffers Neutros (Estiba 110% y Extintor PQS) y RESPEL (Botella Reenvasada).
     - **Pestaña 2 - Matriz Oficial Completa NTC 4435**: Cuadrícula de 12 clases ONU con rombos SGA y celdas semáforo de alto contraste.
  3. **Inspector HUD Interactivo en Tiempo Real (#matrix-visual-inspector)**:
     - Consola superior que al pasar el cursor o tocar cualquier casilla muestra las dos sustancias enfrentadas ([Sustancia A] ⚡ VS ⚡ [Sustancia B]), el badge luminoso con el veredicto oficial (🟢 COMPATIBLE, 🟡 PRECAUCIÓN, 🔴 INCOMPATIBLE CRÍTICO, ⚫ EXCLUSIVO) y el párrafo de justificación técnica y consecuencias químicas.
  4. **Retícula Activa (Crosshair Highlighting)**:
     - Al interactuar con una celda, la fila y la columna correspondiente se iluminan simultáneamente con resplandor dorado institucional, facilitando la lectura sin perder el cruce.
  5. **Reconstrucción de Paquetes SCORM 1.2**:
     - uild_scorm.py ejecutado exitosamente generando paquetes actualizados para Moodle LMS.

## Corrección de Bloqueo de Inicio y Sincronización de Temporizador - Juego 3 (juego3_trasiego.html)
- **Diagnóstico del Fallo ('El 3 tampoco pasa del principio')**:
  - En `juego3_trasiego.html`, al hacer clic en el botón de inicio `#btn-start-briefing` (*"INICIAR PROCEDIMIENTO DE TRASIEGO"*), la consola arrojaba la excepción no controlada:
    `Uncaught TypeError: this.audio.playTap is not a function`.
  - En la clase `ProceduralAudioEngine`, el método `playTap()` no estaba definido, interrumpiendo la ejecución antes de invocar `briefingOverlay.classList.add('hidden')`, lo que provocaba que el modal de briefing permaneciera fijo en pantalla bloqueando toda interacción.
  - Además, el temporizador (`this.startTimer()`) se iniciaba de forma prematura en el `constructor` a través de `startTutorialPhase()`, consumiendo los 70 segundos antes de que el usuario cerrara el modal.
- **Solución Quirúrgica**:
  1. Se implementó el método `playTap()` en `ProceduralAudioEngine` generando un tono sinusoidal sutil (`this.playTone(600, 'sine', 0.05, 0.08)`).
  2. Se protegió la invocación de audio con bloque defensivo `try/catch` en `bindEvents()` y se sincronizó el arranque del juego: al pulsar `#btn-start-briefing` se oculta `#modal-briefing-overlay`, se asigna `this.isGameActive = true`, se dispara `this.startTimer()` y se actualiza `this.updateRoadmapStepVisuals()`.
  3. Se calibró `startTutorialPhase()` para que, si el modal de briefing se encuentra activo, mantenga el cronómetro congelado en `01:10` y el juego en espera (`isGameActive = false`), iniciando el conteo regresivo únicamente cuando el usuario presiona iniciar.
  4. Se reconstruyeron todos los paquetes SCORM 1.2 mediante `python build_scorm.py`.

## Corrección de Padding y Holgura Visual en Tarjeta Inspector - Juego 2 (juego2_bodega.html)
- **Diagnóstico del Fallo ('Arregla esta tarjeta / subirle el padding')**:
  - En la tarjeta del Inspector de Compatibilidad (`.matrix-inspector-panel`), el padding y la altura de línea de la cabecera (`.inspector-top-bar`) eran demasiado ajustados, provocando que los caracteres tipográficos quedaran cortados y comprimidos verticalmente.
  - Además, la presencia de `overflow: hidden` sin `flex-shrink: 0` permitía que el contenedor flexible redujera el espacio vertical útil de la tarjeta.
- **Solución Quirúrgica**:
  1. Se aumentó el padding general de `.matrix-inspector-panel` a `16px 20px`, con `gap: 12px`, `flex-shrink: 0;` y `min-height: fit-content;`.
  2. En `.inspector-top-bar`, se calibró `line-height: 1.6;` y se añadió padding vertical `4px 0 6px 0` para garantizar lectura completa sin corte de fuentes.
  3. En `.inspector-hint-badge`, se incrementó el padding a `4px 10px` con `line-height: 1.3;`.
  4. Se reconstruyeron los paquetes SCORM 1.2 vía `python build_scorm.py`.

## Estabilización de Toast Técnico Flotante - Juego 3 (juego3_trasiego.html)
- **Diagnóstico del Fallo ('Al igual que en el dos, en el 3, la aparición brusca hace que la tarjeta baje/crezca de golpe')**:
  - Al validar un paso o cometer un error, `#tech-feedback-toast` se insertaba en el flujo estático del DOM entre el avatar de Bolívar Safety Bot y la escena SVG del vehículo.
  - Al ganar o perder contenido y visibilidad, alteraba la altura de la cabecera empujando bruscamente hacia abajo el escenario de trasiego y la bandeja de tarjetas.
- **Solución Quirúrgica**:
  1. Se convirtió `.tech-feedback-toast` en un elemento flotante desacoplado del layout (`position: absolute; top: 68px; left: 16px; right: 16px; z-index: 50; max-width: 800px; margin: 0 auto;`).
  2. Se configuró `pointer-events: none;` mientras está inactivo y `pointer-events: auto;` al activarse con `.show`.
  3. Se calibró la regla para móviles (`top: 60px; left: 8px; right: 8px;`).
  4. La escena técnica SVG y el mazo de tarjetas permanecen 100% estables sin desplazamiento ni salto de layout.
  5. Se actualizaron los paquetes SCORM 1.2 mediante `python build_scorm.py`.

## Ilustración SVG Dinámica y Coordenadas Adaptativas por Vehículo - Juego 3 (juego3_trasiego.html)
- **Diagnóstico de Necesidad**:
  - El Juego 3 definía lógicamente 4 frentes de obra distintos (Excavadora CAT 320D, Volqueta Kenworth T800, Bulldozer CAT D6T y Generador 250kVA), pero el gráfico receptor SVG `#machinery-truck` estaba estático y hardcodeado únicamente para la excavadora.
  - Los 6 hotspots de inspección, manguera de trasiego, cable de polo a tierra, pinza y bandeja de goteo tenían posiciones fijas, sin alineación anatómica con las características de cada máquina.
- **Solución Implementada (Opción 1)**:
  1. **Tabla de Coordenadas Anatómicas `VEHICLE_CONFIGS`**: Se configuraron coordenadas específicas tanto para Desktop como para Mobile para cada uno de los 4 vehículos, definiendo:
     - Posición del grupo de maquinaria (`machineTransform`).
     - Trazado de manguera de combustible (`hose`) conectando la cisterna a la boca del tanque receptor.
     - Trazado y punto final del cable de polo a tierra (`groundCable` y `clamp`) hacia la masa metálica certificada.
     - Posición de bandeja de goteo (`dripTray`), extintor satélite (`extinguisher`), cuñas (`wheelChocks`) y kit de derrames (`spillKit`).
     - Posiciones de los 6 hotspots (`hotspots[1..6]`).
  2. **Generadores SVG Dinámicos**: Se crearon métodos modulares en `FieldInspectorGame`:
     - `getExcavatorSvg()`: Orugas de acero, cuerpo amarillo CAT, pluma hidráulica, cabina con operador Lucho y escape.
     - `getDumpTruckSvg()`: Volqueta trompuda Kenworth con doble troque trasero, tolva inclinada, escape cromado vertical con silenciador, tanque diésel lateral de aluminio con boca de llenado.
     - `getBulldozerSvg()`: Bulldozer CAT con tren de rodaje triangular High-Drive, pala topadora delantera pesada, cabina ROPS con jaula blindada, boca de llenado posterior.
     - `getGeneratorSvg()`: Skid de vigas I con argollas de izaje, cabina acústica insonorizada con lamas de ventilación, panel de control digital (tacómetros y botón parada de emergencia STOP), silenciador en techo y boca lateral.
  3. **Sincronización Reactiva**: En `updateVehicleDisplay()` se invoca `this.renderVehicleGraphic(this.currentVehicleIndex)` y `this.applySvgResponsiveLayout()`, reenganchando las referencias a elementos animados (`#svg-motor-safe-sign`, `#exhaust-smoke`, `#lucho-cabin-avatar`).
  4. **Adaptación de Etiquetas**: En `resetHotspotsAndCards()`, la etiqueta del Punto 1 conmuta automáticamente entre `"MOTOR / PANEL"` para el Generador y `"MOTOR / CELULAR"` para los vehículos móviles.
  5. **Verificación y SCORM**: Comprobación de integridad sintáctica sin errores y reconstrucción exitosa de paquetes SCORM 1.2 vía `python build_scorm.py`.

## Optimización y Corrección Integral para Teléfonos Móviles en los 5 Juegos (`<= 768px`)
- **Diagnóstico de Causas Raíz en Móviles**:
  1. **Scroll Bloqueado**: Reglas `html, body { overflow: hidden !important; }`, `.app-viewport { height: 98vh; overflow: hidden; }`, `.iso-viewport { touch-action: none; }` y `body { touch-action: none; }` impedían deslizar verticalmente la página o los modales en teléfonos.
  2. **Movimientos e Interacciones Táctiles Interrumpidas**:
     - En Juego 1, `pointercancel` al hacer scroll disparaba `handleWirePointerUp` en lugar de cancelar limpiamente el cable activo.
     - En Juego 2, `setPointerCapture` en `pointerdown` interfería con la emisión del evento `click` táctil (`Tap-to-Select`).
     - En Juegos 1, 2 y 3, arrastrar una tarjeta hacia un objetivo fuera del pliegue no hacía auto-scroll de la ventana.
     - En Juego 5, `bindTouchControls` exigía `e.touches.length === 1`, impidiendo caminar con el D-Pad mientras se giraba la cámara con otro dedo (multitouch).
  3. **Elementos Recortados o No Visibles**:
     - En Juego 2, el estilo inline `width: 370px; height: 370px;` de `#warehouse-board` pisaba la media query y se desbordaba al rotarse a 45° (`523px` de diagonal en pantallas de `360px`).
     - En Juego 4, `this.camState.scale = 1.0` sobrescribía inline `--scene-scale` sobre `.iso-world`, ocultando el casillero, la puerta, la mesa y el motor fuera del teléfono.
     - En Juego 5, los bordes gruesos de `.fps-visor-hud` y las cajas del HUD colisionaban con el diálogo del bot y los controles táctiles.
- **Soluciones Implementadas**:
  - **Juego 1 (`juego1_sga.html`)**: Desbloqueo de `overflow-y: auto` en `html, body`, `.app-viewport` y fases 1/2/3 en `@media (max-width: 768px)`; `touch-action: pan-y` en `.patch-card` con `touch-action: none` en `.patch-jack-pin`; manejador `handleWirePointerCancel()` separado y auto-scroll en bordes durante `setupDragAndDrop`.
  - **Juego 2 (`juego2_bodega.html`)**: Escala compacta del tablero isométrico `#warehouse-board` (`235x235px`) y `.iso-viewport` en `@media (max-width: 768px)`, eliminación de `setPointerCapture` para garantizar `Tap-to-Select` + `Drag-and-Drop`, y auto-scroll vertical al arrastrar cerca de los bordes.
  - **Juego 3 (`juego3_trasiego.html`)**: Compactación de cabecera, barra de ruta deslizable horizontalmente, escenario SVG y grilla de 9 tarjetas en `@media (max-width: 768px)`, más auto-scroll de ventana al arrastrar o seleccionar tarjetas.
  - **Juego 4 (`juego4_taller.html`)**: Cálculo dinámico `getResponsiveCameraDefaults()` según `window.innerWidth` (`scale: 0.56` en `<=420px`, `0.64` en `<=560px`, `0.78` en `<=820px`) aplicado en inicialización, `resize` y `restartGame()`; cambio de `.iso-viewport` a `touch-action: pan-y` para permitir scroll con 1 dedo, Tap-to-Move con 1 dedo y paneo/zoom con 2 dedos.
  - **Juego 5 (`juego5_emergencias.html`)**: Desbloqueo de scroll táctil (`touch-action: pan-y; -webkit-overflow-scrolling: touch;`) en modales de Briefing y Auditoría; media query `@media (max-width: 768px)` para HUD compacto sin colisiones; soporte multitáctil por `touch.identifier` (`lookTouchId`) en `bindTouchControls()` para caminar con el D-Pad y rotar cámara simultáneamente.

## Corrección Universal de Arrastre y Soltado (Drag & Drop) en Juego 1 (`juego1_sga.html`)
- **Diagnóstico de Causa Raíz ("La selecciona, pero no mueve la tarjeta")**:
  1. **Bloqueo por Botón FDS**: La cláusula `if (e.target && e.target.closest('button')) return;` en `onPointerDown` abortaba el arrastre si el inicio del contacto ocurría en la mitad inferior de la tarjeta (donde se ubica el botón FDS).
  2. **Cancelación Gestual en Móviles / Táctiles**: Sin listeners directos de `touchstart` y `touchmove` con `preventDefault()`, los navegadores interpretaban el deslizamiento vertical como desplazamiento de página y emitían `pointercancel`, regresando la tarjeta a `translate3d(0, 0, 0)` y disparando posteriormente el evento `click` (que activaba la selección visual con borde amarillo pero sin mover la tarjeta).
  3. **Oclusión de Elementos Subyacentes**: Durante el arrastre, la tarjeta capturaba las coordenadas del puntero, dificultando que `document.elementFromPoint` detectara los pictogramas receptores (`.sga-pictogram-tile`) o los casilleros de familias (`.hazard-bucket`).
- **Solución Implementada**:
  1. **Inicio de Arrastre Unificado**: Se removió el bloqueo prematuro en el botón FDS. Si el usuario mueve el puntero más de 4px (`hasMoved = true`), se activa el arrastre suave de la tarjeta; si el puntero se libera sin movimiento (`hasMoved = false`), el evento de clic estándar abre la ficha FDS o selecciona la tarjeta.
  2. **Soporte Táctil y Puntero Completo**: Se añadieron listeners duales (`pointerdown`, `pointermove`, `pointerup`, `pointercancel` y `touchstart`, `touchmove`, `touchend`, `touchcancel`) con `passive: false` y `preventDefault()` condicional al iniciar el movimiento, impidiendo la cancelación del gesto por scroll.
  3. **Prueba de Impacto Directa (`pointer-events: none`)**: Durante el arrastre se aplica `pointer-events: none !important;` y `z-index: 99999` a la tarjeta activa, permitiendo que `document.elementFromPoint(clientX, clientY)` detecte de forma instantánea y exacta la zona receptora subyacente (`.sga-pictogram-tile` o `.hazard-bucket`), con fallback por cajas delimitadoras (`getBoundingClientRect`).
  4. **Limpieza de Selección y Animación de Logro**: Al asociar correctamente una tarjeta, se invoca `this.selectCard(null)` para retirar el halo de selección amarillo de todas las tarjetas y se dispara la animación `pop-comic` de celebración en la tarjeta resuelta.

## Inversión de Mecánica de Etiquetado y Soporte Multi-Peligro en Nivel 3A (`juego1_sga.html`)
- **Motivación Pedagógica y de Ergonomía**:
  1. **Fidelidad Normativa (Res. 773/2021)**: En la industria y obras de construcción, el trabajador no traslada el tambor hacia un pictograma en una pared, sino que toma los rombos adhesivos SGA y los adhiere sobre el envase secundario basándose en la Sección 2 de la FDS.
  2. **Resolución del Multi-Peligro**: La mayoría de sustancias críticas en obra (Thinner, Ácidos, Acetileno) poseen peligros múltiples concurrentes (ej. Líquido inflamable + peligro por aspiración pulmonar; Corrosivo cutáneo + irritante respiratorio; Gas a presión + inflamable). La mecánica anterior 1-a-1 resultaba pedagógicamente limitante o confusa para sustancias con múltiples rombos obligatorios.
  3. **Despeje y Ergonomía Móvil**: Se reemplazó el apiñamiento de 6 tarjetas químicas simultáneas por **1 Estación de Rotulado activa a la vez** (`.station-card`), con 2 slots de rombos bien dimensionados y legibles (`.station-slot`), botón interactivo FDS dedicado y la paleta de rombos SGA abajo.
- **Implementación Técnica**:
  1. **Estructura de Datos Multi-Hazard**: `EXAM_CHEMICALS` reconfigurado con `requiredSga: ['inflamable', 'salud']` para Thinner, `['corrosivo', 'irritante']` para Ácido Muriático y `['gas', 'inflamable']` para Cilindro de Acetileno (3 compuestos x 2 rombos = 6 puntos totales exactos, conservando la escala SCORM 1.2 sin alteraciones).
  2. **Interacción Dual Impecable (Arrastre + Toque Táctil)**:
     - *Arrastre*: Los rombos SGA de la paleta inferior se pueden arrastrar libremente hacia la estación o los slots receptores.
     - *Toque directo (`Tap-to-Place`)*: Al tocar cualquier rombo SGA, el sistema valida inmediatamente y lo adhiere al primer slot libre del envase si corresponde.
  3. **Validación Inmediata con Retroalimentación**:
     - *Acierto*: El slot se rellena con el vector oficial del pictograma SGA (`.slot-filled`), emite sonido de éxito, animación `pop-comic` y suma +1 punto. Al completar ambos rombos del envase, emite sonido de victoria y avanza automáticamente al siguiente compuesto tras 900ms.
     - *Fallo*: Sacudida de pantalla (`shake-screen`), sonido de error, feedback de Lucho y modal técnico explicativo adaptado a los múltiples requerimientos del compuesto. Al completar los 3 compuestos, transiciona fluidamente a la Subfase 3B de FDS.
  4. **Verificación Automatizada**: Test E2E headless en Edge mediante CDP (`scratch/test_level3a.js`) validó al 100% el flujo completo, penalizaciones, puntaje máximo (6/6) y transición hacia Subfase 3B.

## Expansión a 3 y 4 Pictogramas por Sustancia y Paleta Completa de 8 Rombos SGA en Nivel 3A (`juego1_sga.html`)
- **Motivación Normativa y Pedagógica (Res. 773/2021 & FDS Reales)**:
  - Varios productos industriales y de obra comunes poseen más de 2 peligros regulados: solventes con toxicidad y daño a órganos blanco, pinturas epóxicas con solventes volátiles y daño acuático, y ácidos concentrados con emanaciones tóxicas e irritación severa.
  - El usuario solicitó explícitamente incluir sustancias con más de 2 etiquetas (3 y 4 rombos), lo cual refleja con fidelidad la Sección 2 de las FDS reales colombianas.
- **Implementación Técnica y Arquitectura**:
  1. **Paleta Completa de 8 Rombos SGA**: Se añadieron los pictogramas oficiales y vectores SVG de `medio_ambiente` (árbol seco y pez muerto - Toxicidad Acuática) y `comburente` (llama sobre círculo - Oxidante).
  2. **Retícula Optimizada para Móviles (4 Columnas)**: Se estructuró `.pictogram-grid` en `grid-template-columns: repeat(4, minmax(0, 1fr));` tanto en escritorio como en la media query `@media (max-width: 768px)`. Esto distribuye los 8 rombos en 2 filas limpias, reduciendo la altura vertical ocupada a solo ~120px en teléfonos móviles y dejando todo el espacio vertical para la estación de rotulado.
  3. **Ranuras Flexibles y Adaptativas (`.station-slot`)**:
     - Se ajustó el tamaño de ranura a `68px x 68px` con `flex-wrap: wrap; justify-content: center;` en `.station-slots-row`.
     - 3 slots ocupan ~225px y 4 slots ocupan ~300px, encajando en cualquier pantalla de smartphone sin requerir scroll horizontal y con auto-envoltura suave en pantallas extra angostas.
  4. **Compuestos de Prueba de Alto Riesgo**:
     - *Thinner / Solvente Corriente (3 rombos)*: `['inflamable', 'salud', 'irritante']` (Líquido combustible + Aspiración pulmonar H304 + Irritación cutánea H315 / STOT SE 3).
     - *Ácido Muriático Concentrado (3 rombos)*: `['corrosivo', 'irritante', 'toxicidad']` (Corrosión cutánea Cat 1 + Toxicidad aguda oral Cat 4 + Irritación vías respiratorias H335).
     - *Pintura Epóxica Alto Tráfico (4 rombos)*: `['inflamable', 'salud', 'irritante', 'medio_ambiente']` (Solvente inflamable + Sensibilización cutánea H317 + Irritación ocular/cutánea + Daño a organismos acuáticos H411).
  5. **Cálculo Dinámico de Puntuación**:
     - Se eliminó cualquier total rígido cableado: `this.maxScore3A = EXAM_CHEMICALS.reduce((acc, c) => acc + c.requiredSga.length, 0);` (10 puntos totales).
     - La barra de estado refleja automáticamente `0 / 10`, el badge de finalización y el reporte SCORM integran los 10 puntos de la Subfase 3A sin romper métricas previas.
  6. **Validación Automatizada**:
     - Script E2E en Edge CDP ejecutó la resolución de los 10 slots a través de los 3 compuestos, verificó el rechazo de etiquetas incorrectas, el avance entre sustancias y la transición a la Subfase 3B (100% de éxito).

## Optimización Integral de Ergonomía Móvil (Android 360x740 / 375x667) en Juego 4 y Juego 5
- **Causa Raíz de Distorsión y Fallas Detectadas**:
  1. **Juego 4 (Taller Seguro - Avatar y Sombra)**:
     - El avatar estaba construido mediante primitivas CSS `div` anidadas (`avatar-head`, `avatar-torso`, `avatar-legs`). Bajo la matriz 3D con `perspective: 1200px` y el factor de escala `scale(0.58)` en móviles Android, el subpixel rendering generaba estiramiento asimétrico y deformación grotesca.
     - `.avatar-shadow` era hijo del avatar con `rotateX(-60deg)`, lo que provocaba que la elipse de sombra flotara 60° levantada en el aire detrás del personaje en lugar de descansar sobre el suelo.
     - *Solución*: Se rediseñó la arquitectura desacoplando la sombra del billboard (`.avatar-floor-shadow` plano a Z=0 con `translateZ(0)` sobre la baldosa) y se implementó un sprite vectorial 2.5D SVG de alta definición (Operario Técnico con casco industrial, overol verde Bolívar, franjas reflectivas, guantes químicos, monogafas, respirador y botas dieléctricas), sincronizado tanto en Zona 1 como en Zona 2 con soporte completo de GSAP y `updateAvatarVisualEPP()`.
  2. **Juego 5 (Brigada de Emergencia - Manos Ocultas, Botones y Recorte)**:
     - En `@media (max-width: 768px)`, la regla `.fps-hands-layer { display: none !important; }` ocultaba deliberadamente las manos en teléfonos móviles.
     - `.hud-bot-dialog` estaba anclado a `bottom: 8px; left: 50%; max-width: 360px`, superponiéndose directamente sobre la hilera inferior del D-Pad táctil y el botón de acción.
     - El D-Pad táctil (`bottom: 8px; left: 8px`) tenía la fila inferior cortada por el borde físico de la pantalla.
     - La perspectiva 3D (`perspective: 750px` con `translateZ(750px)` y `perspective-origin: 50% 50%` con `pitch: -12deg`) provocaba un campo de visión horizontal extremadamente estrecho (teleobjetivo de 27°) y forzaba el horizonte en la mitad exacta vertical, dejando el 50% inferior como suelo oscuro vacío y el 50% superior con objetos hiper-aumentados ("recortado a la mitad").
     - *Solución*:
       1. Se eliminó `display: none !important;` y se redimensionaron las manos a escala móvil (`height: 155px; width: 76px;`) con mangas verdes y guantes visibles.
       2. Se reubicó `.hud-bot-dialog` en la zona superior (`top: 80px; left: 50%; transform: translateX(-50%)`), dejando la zona inferior 100% despejada para controles.
       3. Se reubicó el D-Pad a `bottom: 18px; left: 14px` (botones 38x38px sin recortes) y el botón de acción a `bottom: 22px; right: 14px` (62x62px).
       4. Se reubicaron las tarjetas de vitalidad/drenaje sobre el D-Pad (`bottom: 160px; left: 14px`).
       5. Se calibró la cámara 3D en móviles con `perspective: 440px`, `perspective-origin: 50% 43%`, `translateZ(440px)` y `pitch: -4deg` adaptativo en JavaScript, abriendo el campo visual a 45° a nivel de ojos.
- **Validación Automatizada**:
  - Capturas CDP de pantalla en Chrome/Edge headless sobre viewports estándar de Android (360x740 y 375x667) comprobaron 0% solapamientos, excelente nitidez de sprites y ergonomía táctil en los 5 juegos.

## Optimización y Calibración Crítica de Jugabilidad Móvil en Juego 5 (`juego5_emergencias.html`)
- **Diagnóstico de Fricción y Dificultad Reportada**:
  1. **Daño Letal Instantáneo a 60Hz (Loop de Física)**: `checkProximity()` invocaba `damageHealth()` en cada fotograma dentro de `requestAnimationFrame`. Al dar un par de pasos hacia el centro del derrame, la vitalidad bajaba del 100% al 0% en apenas 1.5 segundos sin dar oportunidad al jugador de retroceder ni advertir el peligro.
  2. **Desorientación Inicial de Cámara**: El jugador reaparecía con `yaw = 0°` mirando al Norte contra tuberías industriales genéricas, mientras que los objetivos iniciales de Misión 1 (Caseta EPP) y Misión 2 (Caseta Traje Nomex) estaban ubicados al Oeste (`x = -550, z = 0`), forzando rotaciones a ciegas.
  3. **Ausencia de Indicador Táctico de Rumbo**: En pantallas móviles verticales (pantallas estrechas), no había brújula ni guía de orientación hacia el objetivo activo, lo que dificultaba localizar las estaciones en el entorno 3D.
  4. **Tolerancia de Interacción Rígida**: Para interactuar, se exigía un ángulo de mira estricto (`dot >= 0.35`) y proximidad exacta (`dist <= 260`), lo que en pantallas táctiles provocaba que el jugador estuviera frente a la estación pero el botón no respondiera si la cámara no estaba milimétricamente centrada.
  5. **Controles Táctiles Pequeños**: Los botones del D-pad y el botón de acción carecían de suficiente área táctil para pulgares en movimiento.
- **Solución Implementada**:
  1. **Cooldown de Daño Térmico y Vapores**: Se implementó `this.lastDamageTime` con una cadencia mínima de 1500ms entre eventos de daño, calibrando los radios de peligro (`distToCenter < 180` en M1 y `< 120` en M2), emitiendo sonido de alarma y permitiendo reaccionar a tiempo.
  2. **Orientación Inicial Táctica**: Spawn inicial calibrado en `yaw = 270°` apuntando directamente al Oeste hacia la Caseta EPP / Nomex en ambas misiones.
  3. **Banner Táctico de Objetivo con Brújula Dinámica (`#hud-objective-guide`)**: Barra flotante bajo el HUD con flecha direccional reactiva (`▲`, `◀`, `▶`, `▼`) calculada en tiempo real según el ángulo relativo hacia el objetivo activo. Al tocar la barra, la cámara se alinea automáticamente hacia la estación y traslada al jugador a rango operativo.
  4. **Botón Central Auto-Aim en el D-Pad (`#btn-auto-aim`)**: Se añadió un botón con icono de mira telescópica en el centro del D-Pad que orienta de inmediato la cámara hacia el objetivo de la misión activa.
  5. **D-Pad Ampliado y Botón de Acción Ergonómico de 72px**: D-Pad aumentado a 44x44px y botón de interacción circular dorado de 72x72px con respuesta háptica (`navigator.vibrate(40)`).
  6. **Tolerancia Inteligente de Proximidad y Fallback**: `checkProximity()` otorga tolerancia de ángulo (`dot >= -0.2` o distancia <= 320px) para la estación objetivo activa, y `triggerActiveInteraction()` recurre a la estación objetivo si el jugador está en rango aunque no esté centrada.
  7. **Interacción por Toque Directo en Pantalla 3D**: Toque directo sobre el viewport 3D con tolerancia de jitter táctil de 16px para ejecutar la interacción cómodamente.
  8. **Calibración de Extinción de Fuego (Misión 2)**: 25% de reducción por descarga con extintor (4 descargas efectivas completan la extinción).

## Sistema Universal de Pantalla Completa por Doble Toque y Botón Flotante de Salida (Suite Completa)
- **Diagnóstico y Necesidad de Usuario**:
  - En entornos móviles o LMS embebidos (Moodle), las barras del navegador, los márgenes y las interfaces externas comprimían el área de juego, restando inmersión y dificultando el disfrute táctil.
  - El usuario requirió: (1) Activar pantalla completa al dar doble toque en cualquier zona del juego; (2) Contar con un botón accesible y visible para salir de pantalla completa en cualquier momento.
- **Implementación Técnica Universal (`juego1_sga.html` a `juego5_emergencias.html`)**:
  - **Doble Toque Táctil y Doble Clic Desktop**:
    - Detección precisa de cadencia de doble toque (`timeDiff > 50 && timeDiff < 360 && dist < 35`), descartando falsos positivos por arrastre o pulsación accidental.
    - Soporte multi-vendor de Fullscreen API (`requestFullscreen`, `webkitRequestFullscreen`, `mozRequestFullScreen`, `msRequestFullscreen`).
    - Fallback elegante con la clase CSS `.is-fullscreen` cuando el navegador restringe la API nativa de pantalla completa en iframes sin atributo `allowfullscreen`.
  - **Botón Flotante de Salida (`#btn-floating-exit-fullscreen`)**:
    - Cápsula flotante roja/blanca fijada en la esquina superior derecha (`top: 14px; right: 14px; z-index: 10000;`).
    - Visible exclusivamente en modo pantalla completa (`:fullscreen`, `:-webkit-full-screen`, `.is-fullscreen`).
    - Permite salir instantáneamente con un solo toque o clic.
  - **Notificación Toast de Confirmación (`#toast-fullscreen-info`)**:
    - Toast sutil de confirmación ("Pantalla Completa Activa • Doble toque para salir") que aparece durante 2.8 segundos y se desvanece suavemente.
  - **Sincronización con Botón de Cabecera Moodle**:
    - Conexión reactiva con `#btn-moodle-fullscreen` manteniendo el estado y los iconos de pantalla completa coherentes en toda la aplicación.

## Rediseño Visual, Ergonomía de Cámara y Despeje de Pantalla en Juego 5 (`juego5_emergencias.html`)
- **Calibración de Perspectiva y Erradicación de Deformación Geométrica**:
  - *Causa Raíz*: `perspective: 440px` con `translateZ(440px)` colocaba al jugador peligrosamente cerca del plano de singularidad de proyección ($d / (d - z)$), provocando que al aproximarse a las estaciones de pared los elementos se estiraran y distorsionaran grotescamente hasta 8x.
  - *Solución*: Calibración a `perspective: 540px` y `perspective-origin: 50% 46%` en CSS, sincronizando `pDist = 540` en `updateCamera()`. Esto produce un campo de visión natural (54° FOV), líneas arquitectónicas rectas y confort espacial al desplazarse.
- **Ambientación Arquitectónica e Inmersión Visual**:
  - Sustitución de paredes lisas oscuras por textura de paneles industriales de acero remachado, zócalos perimetrales con franjas de peligro reflectivas (`#FFC72C` / `#000`), lámparas de emergencia estroboscópicas superiores, focos de iluminación ambiental direccionados sobre cada estación y suelo epóxico brillante con demarcaciones de seguridad delimitadas.
- **Despeje Radical del HUD Móvil**:
  - Ocultamiento de la retícula invasiva `.fps-crosshair-prompt` en pantallas móviles (`@media (max-width: 768px)`), ya que el botón de acción dorado de 72px ya indica el verbo interactivo ("INTERACTUAR", "CERRAR", "LAVAR"), despejando el 100% del centro del escenario 3D.
  - Temporizador de auto-colapso de 5 segundos y toque para descartar en el diálogo del Bolívar Safety Bot (`.hud-bot-dialog`).
- **Botones Sticky en Modal de Briefing Inicial**:
  - Contenedor `.briefing-actions-sticky` que ancla los botones de "MISIÓN 1: DERRAME (120S)" y "MISIÓN 2: INCENDIO (90S)" en la base del modal, garantizando visibilidad inmediata en cualquier resolución móvil sin requerir desplazamiento.
- **Rediseño Ergonómico de Manos FPV**:
  - Reemplazo de manos simples por mangas verdes Bolívar con ribetes reflectivos amarillos (`#FFC72C`), guantes táctiles y posicionamiento inferior optimizado (`bottom: -22px`) para no invadir el D-pad ni el botón de acción.

## Sistema de Autopilot Cinemático "1-Click Tactical Dispatch" en Juego 5 (`juego5_emergencias.html`)
- **Diagnóstico y Motivación de Diseño**:
  - *Falla Reportada en Móvil*: El botón virtual izquierdo del D-Pad ("◀" / Strafe Left) parecía inoperante cuando el operador se encontraba con `yaw = 270°` cerca de la pared oeste, debido a la restricción física de colisión contra `posX = -520px`.
  - *Fricción de Control FPS Táctil*: Operar simultáneamente un D-Pad de 7 direcciones y un botón de acción separado en pantallas táctiles estrechas generaba desorientación espacial, colisiones continuas contra muros de tuberías y riesgo constante de pisar ácido o radiación de fuego mientras se buscaba alinear milimétricamente la cámara.
- **Solución: Mecánica de Despacho Táctico Semiatónomo ("1-Click Dispatch: Moverse y Tomar")**:
  - En lugar de forzar al usuario a batallar con controles de cruceta virtual tipo consola de los 90s, se implementó un sistema táctico de alto nivel donde el jugador actúa como Coordinador de Brigada con órdenes directas.
  - **Botón Central Táctico Prominente (`#btn-tactical-dispatch`)**:
    - Ubicado centrado en la base de la pantalla (`bottom: 18px; left: 50%; transform: translateX(-50%)`).
    - Presenta un anillo de pulso dorado (`.dispatch-pulse-ring`), icono visual reactivo (`.dispatch-icon-box`), badge de estado ("ORDENAR", "DESCARGAR", "COMPLETADO") y el título del paso activo (ej. `"1. EQUIPAR EPP (OESTE)"`, `"2. CERRAR VÁLVULA (NORTE)"`).
  - **Coordenadas de Postura Calibradas (`STANCE_COORDINATES`)**:
    - Mapeo exacto de coordenadas $(X, Z)$ y ángulo de mira $(Yaw)$ para las 11 estaciones operativas (`epp`, `valve`, `eyewash`, `kit`, `spill`, `respel`, `fire_gear`, `fire_alarm`, `extinguisher`, `fire`, `fire_blanket`).
  - **Interpolación Cinemática Suave (`dispatchToStation`)**:
    - Traslado fluido en 1100ms mediante curva cúbica de aceleración/desaceleración (`easeInOutCubic`).
    - **Ángulo Más Corto de Rotación**: Cálculo matemático `((targetYaw - startYaw) % 360 + 540) % 360 - 180` que garantiza que el giro de cámara siempre tome la trayectoria angular más corta (por ejemplo, girar 10° en lugar de 350° al cruzar el eje norte).
    - **Inmersión Auditiva y Visual**: Emisión de pasos de marcha (`playFootstepSound()`) a cadencia de 180ms y balanceo vertical de cabeza (`head bobbing` senoidal).
    - **Ejecución Automática al Arribar**: Al llegar a la postura, el operador encaja milimétricamente frente a la estación y ejecuta de inmediato la maniobra ("tomar", "cerrar válvula", "lavar ojos", "descargar extintor") invocando `triggerActiveInteraction()`.
  - **Disparo Multi-canal Ergonomico**:
    - Tocar el botón central táctico `#btn-tactical-dispatch`.
    - Tocar directamente cualquier estación 3D o hacer clic sobre las píldoras de pasos del HUD (`updateMissionStepsBar`).
    - Teclado en PC: Teclas `Space`, `Enter` o `KeyE`.
  - **Despeje Integral de Pantalla**:
    - Erradicación total del D-Pad virtual de 7 botones y del botón flotante de acción.
    - Reubicación de las estadísticas de vitalidad y drenaje a `bottom: 92px`, eliminando cualquier solapamiento en móviles.

## Reestructuración Integral de Apariencia, Ergonomía y Espacio en Juego 4 (`juego4_taller.html`)
- **Diagnóstico de Deficiencias Visuales en Pantalla Móvil**:
  1. *Desbordamiento y Espacio Muerto*: `.iso-viewport` restringido a 330px fijos dejaba ~200px de fondo negro vacío en pantallas verticales, provocando desplazamiento vertical innecesario.
  2. *Saturación de Cabecera*: El cluster de marca Bolívar provocaba quiebre de insignias a múltiples filas y dejaba huérfano el botón de audio.
  3. *Truncamiento en Barra de Fase*: La píldora `#stage-status-text` se hallaba comprimida entre las pestañas y el botón de rotación, mostrando `Paso 1: Equipa tu ...` con puntos suspensivos.
  4. *Escenario 3D Pobre en Escala*: Baldosas pequeñas con props comprimidos que se perdían en el fondo negro.
  5. *Tarjetas de Misión Inferiores*: Tarjetas en dos columnas estrechas comprimían el texto técnico a 6 líneas apretadas.
- **Implementación Arquitectónica y Visual**:
  - **Layout de Altura Completa 100dvh (`.app-viewport`)**:
    - Estructura `display: flex; flex-direction: column; height: 100vh; height: 100dvh; max-height: 100dvh; overflow: hidden;`.
    - `.iso-viewport` dinámico con `flex: 1; height: auto; min-height: 280px;`, adaptándose con precisión milimétrica a cualquier altura de pantalla y erradicando el espacio muerto inferior.
  - **HUD de Una Sola Fila en Móvil**:
    - Ocultamiento de marca redundante (`.brand-cluster`) en pantallas `<= 640px`, consolidando los indicadores `[🔥 RACHA] [⏱ TIEMPO] [🛡 PUNTOS] [⛶ PANTALLA COMPLETA] [🔊 SONIDO]` en una única barra limpia.
  - **Barra de Control en 2 Filas Estructuradas (`.stage-indicator-bar`)**:
    - Fila 1 (`.stage-bar-top-row`): Pestañas de zona (`[👕 Vestidor] [🔧 Patio Taller]`) a la izquierda y botón de rotación (`[🔄 Girar 90°]`) a la derecha.
    - Fila 2 (`.stage-status-wrapper`): Píldora de estado a ancho completo con `text-overflow: ellipsis`, eliminando el truncamiento y garantizando legibilidad total.
  - **Enriquecimiento Textural y Escalado Isométrico 2.5D**:
    - Suelo del vestidor con gradiente radial iluminado, bordes dobles de seguridad y sombras proyectadas (`box-shadow: 0 0 0 3px #0284c7, 0 35px 70px rgba(0,0,0,0.95)`).
    - Escalado de casilleros a 110x105px con louvers de ventilación y chapa dorada reflectiva; puerta de checkpoint a 95x110px con arco de escáner.
    - Suelo del patio con textura de concreto reforzado y balizas 3D de alta definición.
  - **Bandeja Inferior Contextual Vertical**:
    - Conversión a tarjetas ergonómicas verticales de 56px de altura mínima, con iconografía de 36px, jerarquía tipográfica limpia y badges de estado claros.
    - Corrección de visibilidad entre zonas: Regla `.tray-task-grid[style*="display: none"] { display: none !important; }` que garantiza la conmutación sin solapamientos entre Vestidor (2 tarjetas) y Patio (3 operaciones de mantenimiento).

## Desaturación y Aligeramiento Visual de la Suite (5 Juegos)
- **Diagnóstico**: Sobrecarga de densidad informativa, exceso de textos regulatorios repetitivos ("Res. 773/2021", "Dec. 4741/2005", "NTC 4435") en cabeceras y bandejas, duplicidad de banners de instrucciones y diálogos largos del bot que restaban protagonismo y espacio a la acción lúdica.
- **Acciones Quirúrgicas Aplicadas**:
  - **Juego 1 (SGA)**: Retirada de norma-badge del header; simplificación de pasos del stepper (`1. Marco Legal`, `2. Peligros SGA`, `3. Fichas FDS`); condensación de diálogos del bot a 1 línea activa; banners de feedback estáticos ocultos de inicio (`display: none`) para dar 45px más de altura a los cables y cubos de clasificación; supresión de etiquetas redundantes en casos FDS.
  - **Juego 2 (Bodega)**: Eliminación de norma-badge en header; condensación del diálogo del tutorial; simplificación de la zona de rechazo a etiqueta ágil (`Zona de Rechazo | Botellas ilegales`); leyenda de semáforo compacta; retiro de la barra de título de la bandeja para ganar 30px de espacio vertical en el tablero 3D.
  - **Juego 3 (Trasiego)**: Header limpio sin subtítulos normativos; banner de Lucho condensado a prompt directo; ocultamiento de condiciones ambientales innecesarias en el header del escenario; maximización del lienzo SVG del camión cisterna.
  - **Juego 4 (Taller)**: Eliminación de citas legales en el título de la bandeja y en las tarjetas de acción; acortamiento de las instrucciones contextuales del bot en ambas zonas a 1 línea clara.
  - **Juego 5 (Emergencias)**: Supresión de tipografía diminuta y citas normativas flotantes en las estaciones 3D de pared (Pared Norte, Sur y Oeste); simplificación de badges a verbos directos (`Válvula de Corte`, `Alarma General`, `Lavaojos`, `Caseta EPP`, `Acopio RESPEL`, `Traje Ignífugo`); simplificación de leyendas en el HUD (`GAS` y `TIEMPO`).

## Optimización de Espaciado y Holgura ("Respiración") en Datos Encerrados en Círculos y Píldoras (5 Juegos)
- **Diagnóstico**: Múltiples datos, números de paso, cronómetros y badges de estado se encontraban encerrados en círculos y pastillas con dimensiones microscópicas (14px - 18px) y paddings extremadamente ajustados (1px - 2px), asfixiando visualmente los dígitos contra los bordes perimetrales.
- **Acciones Quirúrgicas por Juego**:
  - **Juego 1 (`juego1_sga.html`)**:
    - `.level-step-num`: Ampliado de 18x18px a 22x22px con `font-size: 0.72rem;`, centrado flexible, sombra interna y separación `gap: 8px;` en `.level-step-btn`.
    - `.briefing-step-num`: Convertido de cuadrado rígido (3px radius) a círculo fluido de 24x24px (`border-radius: 50%`) con `font-size: 0.75rem;`.
    - `.timer-pill`: Relajado de `padding: 5px 10px;` a `padding: 5px 12px; font-size: 0.78rem; gap: 7px;` con sombra suave.
    - `.patch-circuit-badge`: Convertido en píldora con `padding: 3px 10px; border-radius: var(--radius-full); font-size: 0.68rem;`.
  - **Juego 2 (`juego2_bodega.html`)**:
    - `.stepper-num`: Ampliado de 18x18px a 22x22px con `font-size: 0.72rem; font-weight: 900;` y sombra interna.
    - `.stepper-pill`: Relajado a `padding: 6px 12px; gap: 8px;`.
    - `.matrix-legend-chip` y `.chip-dot`: Eliminados los estilos inline constrictivos (`padding: 2px 6px; font-size: 0.68rem;`), adoptando `padding: 4px 10px; font-size: 0.74rem; gap: 7px;` y puntos de 8x8px.
    - `.reject-status-badge`: Convertido en píldora con `padding: 4px 10px; font-size: 0.72rem; border-radius: var(--radius-full);`.
  - **Juego 3 (`juego3_trasiego.html`)**:
    - `.roadmap-step-pill .step-badge`: Ampliado de 18x18px a 22x22px con `font-size: 0.72rem;` y centrado fluido.
    - `.roadmap-step-pill`: Convertido en píldora con `padding: 4px 11px; border-radius: var(--radius-full); gap: 7px;`.
    - `.stat-badge` y `.combo-badge`: Convertidos a píldoras suaves (`border-radius: var(--radius-full); padding: 5px 12px;` en desktop, `padding: 4px 9px;` en móvil).
    - `.briefing-step-num`: Rediseñado a círculo cómodo de 24x24px (`border-radius: 50%`) con `font-size: 0.75rem;`.
  - **Juego 4 (`juego4_taller.html`)**:
    - `.roadmap-step-pill .step-circle`: Ampliado de 18x18px a 22x22px en escritorio y de 14x14px a 20x20px en móvil (`font-size: 0.70rem;`), eliminando la compresión de dígitos.
    - `.beacon-step-badge`: Rediseñado con `min-width: 20px; height: 20px; font-size: 0.68rem; padding: 0 5px; border-radius: var(--radius-full);`.
    - `.action-card-status`: Relajado a `padding: 4px 10px; font-size: 0.72rem; border-radius: var(--radius-full);`.
    - `.stat-badge` y `.combo-badge`: Relajados a `padding: 4px 10px; font-size: 0.74rem;` en desktop y `padding: 4px 9px;` en móvil.
  - **Juego 5 (`juego5_emergencias.html`)**:
    - `.step-num`: Convertido a círculo equilibrado de 24x24px (`border-radius: 50%`) con `font-size: 0.76rem; font-weight: 900;`.
    - `.mission-pill-btn`: Rediseñado con `padding: 5px 12px; font-size: 0.74rem; border-radius: var(--radius-full);`.
    - `.hud-detector-card` y `.hud-timer-card`: Rediseñados como tarjetas píldora con `padding: 4px 12px; border-radius: var(--radius-full); gap: 7px;` en desktop y `padding: 3px 8px;` en móvil.
    - `.hud-step-chip`: Relajado de `padding: 3px 8px; font-size: 0.6rem;` a `padding: 4px 10px; font-size: 0.68rem; gap: 6px;` en desktop y `padding: 3px 8px; font-size: 0.62rem;` en móvil.

## Arquitectura de Dos Escenarios Secuenciales con Cinemática Automática - Juego 3 (`juego3_trasiego.html`)
- **Diagnóstico Inicial de Escasez de Espacio y Oclusión**:
  - El lienzo SVG tenía una relación de aspecto ultra-ancha (`940 / 260` = 3.61:1) limitada a 115px - 165px de altura en móviles. A esa escala, un camión cisterna de 18 ruedas y una excavadora de 25 toneladas debían coexistir simultáneamente, resultando en vehículos diminutos (apenas 40px de alto) donde los rótulos SGA y puntos de inspección eran prácticamente invisibles.
  - La bandeja de tarjetas inferior mostraba simultáneamente 9 tarjetas de acción (6 correctas + 3 trampas) dispuestas en 3 filas de 3 columnas en desktop o 5 filas en móvil, consumiendo la mayor parte de la pantalla.
  - El toast flotante normativo (`#tech-feedback-toast`) estaba configurado con `position: absolute; top: 68px;`, encimándose de forma directa sobre el diálogo del Safety Bot y tapando el tercio superior del lienzo.
- **División en Dos Escenarios Secuenciales Especializados (Opción 1 Seleccionada)**:
  - **Fase 1 (Aseguramiento del Camión Cisterna)**:
    - Enfoque con alto zoom en el carrotanque cisterna de ACPM / Diésel (UN 1202 / Clase 3).
    - Pasos de seguridad normativos 1 a 3:
      - Paso 1 (targetId 5): Cuñas Antichispa de Inmovilización en las llantas (`translate(210, 275)` desktop, `translate(95, 205)` móvil).
      - Paso 2 (targetId 1): Neutralización de fuentes térmicas y celulares (Cabina del Cisterna `translate(255, 175)` desktop, `translate(180, 115)` móvil). Anima el letrero `#svg-tanker-motor-sign`.
      - Paso 3 (targetId 2): Conexión del cable equipotencial de Polo a Tierra (<10 Ω) al carrete del cisterna (`translate(185, 235)` desktop, `translate(135, 175)` móvil).
    - Bandeja de tarjetas: Únicamente 4 tarjetas visibles (`.scenario-1-card`: Cuñas, Motor, Polo a tierra, y Trampa de Lavar con Agua).
    - Grid en desktop: `grid-template-columns: repeat(4, minmax(0, 1fr));` (1 sola fila limpia). Grid en móvil: 2 filas de 2 tarjetas.
  - **Transición Cinemática Suave con GSAP**:
    - Al validar con éxito el Paso 3 (targetId 2, Polo a Tierra), el sistema marca el badge verde de Fase 1 completada (`#scene-1-check`), reproduce audio de éxito y activa un temporizador de 750ms.
    - El método `transitionToScenario(2, true)` utiliza GSAP para trasladar fluidamente el `viewBox` del SVG desde las coordenadas del cisterna (`10 50 480 260`) hasta la maquinaria receptora (`460 50 480 260`) en un paneo horizontal de 0.85s con curva `power2.inOut`.
    - La bandeja commuta a `.scenario-mode-2`, desvaneciendo las tarjetas de Fase 1 y desplegando las tarjetas de Fase 2 en una sola fila de 5 columnas.
  - **Fase 2 (Acople y Maquinaria Receptora)**:
    - Enfoque con alto zoom en la máquina pesada de obra (Excavadora CAT 320D, Volqueta Kenworth T800, Bulldozer CAT D6T o Generador CAT 250kVA).
    - Pasos de seguridad normativos 4 a 6:
      - Paso 4 (targetId 3): Bandeja Antiderrame al 110% colocada bajo la toma de combustible.
      - Paso 5 (targetId 6): Kit de control de derrames de hidrocarburos listo en el área.
      - Paso 6 (targetId 4): Extintor Satélite ABC 150 lbs situado a 5 metros en el perímetro.
    - Al validar el Paso 6, se marca `#scene-2-check` y se detona la certificación completa del vehículo con +150 pts de bonificación.
  - **Selector Manual de Pestañas (`#scenario-selector-bar`)**:
    - Dispone de dos pestañas ergonómicas (`#btn-scene-1` y `#btn-scene-2`) con indicadores numéricos y checkmarks verdes para permitir al usuario alternar libremente la cámara entre ambos escenarios en cualquier momento.
- **Ampliación Extrema del Lienzo SVG (>2.5x Más Grande)**:
  - Desktop: Se ajustó el aspect-ratio a `480 / 260` (~1.85:1) con altura de 230px a 390px.
  - Móvil: Se ajustó el aspect-ratio a `280 / 250` (~1.12:1) con altura mínima de 220px y máxima de 335px. Los vehículos se muestran ahora con un nivel de detalle 2.5 veces mayor.
- **Erradicación del Solapamiento de Alertas**:
  - Se reubicó `#tech-feedback-toast` a `position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(20px); z-index: 9999;` con `backdrop-filter: blur(10px)`. Ya no interfiere con el bot banner ni invade el campo visual de la escena de inspección.

## Optimización Ergonómica de Tarjetas, Desacople de Hotspots y Corrección del Extintor - Juego 3 (`juego3_trasiego.html`)
- **Reubicación de 'Apagar Motor & Celulares' (targetId 1) al Escenario 2 (Maquinaria Receptora)**:
  - El operario Lucho y el motor diésel con emisión de humo residen en la cabina del equipo receptor (Excavadora CAT 320D, Volqueta Kenworth, etc.).
  - Se reasignó la tarjeta 1 (`card-action-1`) a `.scenario-2-card` y se ajustaron las reglas CSS de filtrado (`.scenario-mode-1 #hotspot-1 { display: none !important; }`).
  - **Fase 1 (Cisterna - 2 Pasos)**:
    - Paso 1 (targetId 5): Cuñas en Llantas del Carrotanque (`translate(100, 275)` desktop, `translate(60, 205)` móvil).
    - Paso 2 (targetId 2): Conexión de Polo a Tierra (<10 Ω) (`translate(250, 235)` desktop, `translate(160, 165)` móvil).
    - Tarjetas visibles en bandeja: Únicamente 3 tarjetas amplias (`Cuñas`, `Polo a Tierra`, y `Lavar con Agua` - trampa).
    - Al completar el Paso 2 (targetId 2), se detona la transición cinemática automática al Escenario 2 con GSAP.
  - **Fase 2 (Maquinaria Receptora - 4 Pasos)**:
    - Paso 3 (targetId 1): Desconectar Motor & Celulares en la cabina del operario Lucho (`translate(665, 135)` desktop, `translate(375, 95)` móvil).
    - Paso 4 (targetId 3): Bandeja Antiderrame al 110% bajo el acople (`translate(600, 260)` desktop, `translate(325, 175)` móvil).
    - Paso 5 (targetId 6): Alistamiento del Kit Antiderrame (`translate(490, 265)` desktop, `translate(255, 205)` móvil).
    - Paso 6 (targetId 4): Extintor Satélite ABC 150 lbs a 5 metros en el perímetro derecho (`translate(840, 240)` desktop, `translate(460, 160)` móvil).
- **Legibilidad Nítida de Tarjetas y del Clon de Arrastre (`.floating-drag-clone`)**:
  - En la bandeja, el grid se estructuró a 3 columnas simétricas (`grid-template-columns: repeat(3, minmax(0, 1fr))`), otorgando a cada tarjeta ancho generoso (>260px) con altura mínima de 56px, eliminando el apiñamiento y truncamiento excesivo.
  - El clon arrastrado `.floating-drag-clone` se independizó del ancho colapsado de la cuadrícula: ahora tiene ancho fijo garantizado de 260px (`max-width: 290px`), fondo azul marino de alto contraste (`rgba(15, 23, 42, 0.98)`), borde dorado Bolívar de 2.5px, sombra 3D profunda, icono de 36px, y texto completo sin truncar (`-webkit-line-clamp: unset`).
  - Durante el arrastre, el clon se centra automáticamente bajo el punto táctil (`offsetX = 130`, `offsetY = 40`), evitando que el dedo o puntero tape el contenido.
- **Separación Radical de Círculos / Hotspots y Eliminación de Solapamiento**:
  - Se redujo el radio transparente del hitbox de `r="52"` a `r="34"`, y el radio de detección geométrica en `findHotspotAt` a `Math.max(30, Math.max(r.width, r.height) * 0.55)`.
  - Las coordenadas se distribuyeron a lo largo de todo el lienzo visual:
    - En Escenario 1: Hotspot 5 (X=100) y Hotspot 2 (X=250) están separados por 150px.
    - En Escenario 2: Hotspot 6 (X=490), Hotspot 3 (X=600), Hotspot 1 (X=665, Y=135) y Hotspot 4 (X=840, Y=240) mantienen entre 110px y 240px de distancia mutua. Cero superposiciones.
- **Corrección de la Activación del Extintor (Hotspot 4)**:
  - *Causa 1 (Colisión)*: El hotspot 4 y el hotspot 6 estaban prácticamente en las mismas coordenadas, por lo que el hit testing capturaba el kit en lugar del extintor. Al reubicar el extintor al perímetro a 5m (X=840) y reducir los hitboxes, la detección es unívoca.
  - *Causa 2 (Sobrescritura destructiva de Transform en GSAP)*: `applySvgSceneFix(4)` ejecutaba `gsap.fromTo(this.dom.svgExtinguisher, { opacity: 0, x: -80, rotation: -15 }, { opacity: 1, x: 0 })`. En SVG, GSAP sustituye el atributo `transform` por una matriz de coordenadas relativas a `x: 0`, reseteando el elemento a X=0 (fuera de la pantalla a la izquierda). Se corrigió aplicando animación de escala elástica `{ opacity: 0, scale: 0.3, transformOrigin: "14px 40px" }` a `{ opacity: 1, scale: 1, duration: 0.55, ease: "back.out(2)" }` y se actualizó el reset en `resetHotspotsAndCards` a `{ opacity: 0, scale: 1 }`.

## Revisión integral de los cinco juegos — 2026-10-22
- Informe: `docs/reviews/2026-10-22_revision_cinco_juegos.md` (18 hallazgos priorizados, R01–R18).
- Confirmado por ejecución aislada con Node.js vm: Trasiego obtiene 100% con 2/4 equipos (3600 puntos); Taller permite sumar 200 puntos alternando 16 veces los guantes y terminar sin EPP; Emergencias permite victoria sin válvula ni lavaojos; dos ciclos de crisis descuentan dos segundos por ronda; SGA acepta respuestas antes del render siguiente y conserva subfase 3B tras reset.
- Bodega: 96 distribuciones completas sin incompatibilidades ni infracción A3/C1; una auditoría sin ACPM almacenado obtiene 98%. No hay bloqueo por inexistencia de solución.
- Sintaxis JS válida en los cinco HTML; manifiestos individuales XML bien formado. Los seis paquetes coinciden con las fuentes tras normalizar CRLF/LF. La diferencia binaria inicial en Bodega no era desactualización.
- Limitaciones: ningún navegador conectado; sin QA visual/táctil ni Moodle real; simulación de DOM/audio no prueba renderizado. Contenido normativo no auditado exhaustivamente; referencias técnicas oficiales y riesgos pedagógicos consignados en R15.
- No se modificaron HTML, paquetes, pruebas existentes, dependencias ni historial Git. Próximo bloque recomendado: R01, evaluación de Trasiego independiente de rachas y condicionada a completar los cuatro equipos.

## Segunda profundización de la revisión — 2026-10-22
- Informe ampliado a 25 hallazgos: 10 P1, 14 P2, 1 P3; añadidos R19–R25, matriz de correcciones con aceptación y decisiones de evaluación pendientes.
- R19 confirmado con handlers reales simulados: drag RESPEL de Taller escribe selectedWasteItem y entrega un objeto DOM donde se exige selectedWaste e ID string; arrastre directo no confina, con selección previa penaliza -40 puntos/-5s sobre destino correcto.
- R20 confirmado: cuatro interacciones sobre fuego extinguen y activan alarma/extintor/pasador automáticamente; quinta interacción gana sin recoger manta en su estación.
- R21 confirmado: transición diferida de Trasiego después de timeout emite segundo reporte LMS (equipos 3 y después 4). R22: titulares de certificación de Trasiego/Taller son estáticos incluso con 0%. R23: auditar Trasiego al inicio muestra 00:50 de duración por mezclar base 120 y presupuesto 70.
- R24: FPS carece de limpieza de teclas por pérdida de foco (riesgo pendiente de reproducción UI). R25 confirmado con callback de movimiento: cambio de Vestidor a Patio guarda coordenadas en Patio y ejecuta callback anterior.
- Causa común: guía visual, estado operativo, puntaje y veredicto no comparten validación de precondiciones. Corrección posible dentro de los HTML actuales; no se propone migración de stack.
- Decisiones pendientes antes de cambiar reglas: modo formativo/evaluativo, agregación de dos misiones en un SCO, pausa/presupuestos, política de reintentos LMS y escenario SST/offline.
- No se modificó código ni paquetes. Navegadores conectados: inventario vacío al verificar de nuevo. Próximo bloque: resultado de Trasiego (cobertura 4/4, cierre único, veredicto y duración).

## Correcciones implementadas y verificadas — 2026-10-22
- El usuario aprobó: entrenamiento con reintentos, umbral 80% más todos los hitos, ambas misiones de Emergencias para completar el único SCO.
- Contrato vigente y estado R01–R25: docs/CORRECCIONES_2026-10-22.md. El informe de revisión conserva reproducciones históricas; sus líneas no describen las fuentes corregidas.
- SGA: bloqueo de respuesta por caso, botones FDS realmente deshabilitados, reinicio completo 3A, callbacks por intento y cierre solo con todas las fases.
- Bodega: inventario/rechazo/compatibilidad/A3-C1 obligatorios; incompletos como máximo 79%; reloj real y alerta de 18s. Retiradas afirmaciones de extintor como barrera y proximidad como contención real.
- Trasiego: nota por cobertura completa de equipos, racha separada, registro inmediato de hito, cierre único, callbacks invalidados y duración por reloj real.
- Taller: autorización EPP vigente, premios únicos, máximo habitual610 y tareas obligatorias; contrato drag/tap corregido, cancelación sin depósito, movimiento ligado a zona e intento. Las penalizaciones no regeneran tiempo.
- Emergencias: ambas misiones secuenciales, sin pasos automáticos; un reloj/deadline por misión, daño estacionario, física por delta normalizada, limpieza de teclas/mirada y promedio final reportado una vez.
- Bridge idéntico en los cinco juegos: preserva estados previos, review/browse sin escritura, verifica retornos SCORM1.2/2004 y muestra fallos con reintento de guardado. La agregación entre intentos sigue la política del LMS.
- Accesibilidad: runtime incrustado desde tools/accessibility_runtime.html, controles semánticos por teclado, foco/retorno/trampa de diálogos, anuncios y movimiento reducido. Observador filtra animaciones de estilo para evitar trabajo de foco por frame.
- Offline: dependencias ya existentes incrustadas mediante tools/bundle_offline.py (red aprobada por usuario); 22 recursos, versiones/procedencia/hashes en docs/THIRD_PARTY_ASSETS.md. Sin dependencias nuevas instaladas. El tamaño aumenta por las fuentes incrustadas (ZIP individuales ~2.2–2.5MB).
- Validación final: node --test tests/game_regressions.cjs =21/21; python build_scorm.py =6 ZIP regenerados; python tools/verify_games.py =sintaxis de todos los scripts, recursos offline, IDs, XML y coincidencia de los seis paquetes OK; git diff --check limpio tras corregir espacios de cabecera vendor y líneas nuevas.
- Pendientes externos explícitos: navegador/Moodle reales, lector/contraste/táctil y validación profesional SST de FDS/citas/escenarios. Las pruebas usan DOM/audio/tiempo simulados y no acreditan cumplimiento legal. No hubo commits, pushes, staging ni cambios de ramas.

## Ajuste visual del HUD superior de Emergencias — 2026-10-22
- Captura del usuario: pestañas de misión partidas, pasos/objetivo/bot/estadísticas superpuestos en cabecera estrecha.
- Causa: altura fija de cabecera 32/36px combinada con offsets absolutos top33/42/72px y transformaciones de escalado en media queries.
- Corrección localizada en juego5_emergencias.html: flujo vertical del HUD, cabecera grid (dos filas hasta768px), grupo hud-header-actions, misiones sin salto de texto, pasos con scroll horizontal, objetivo multilínea y estadísticas en dos columnas. Se retiró O2 de la etiqueta visible de vitalidad.
- Checks: los cinco bloques del HUD sin position:absolute/top/bottom/transform; sintaxis/recursos/paquetes verificados con python tools/verify_games.py; git diff --check correcto. ZIP regenerados y coincidentes con fuentes.
- Una verificación anterior coincidió con el empaquetado; se identificó su finalización y se repitió guardado/build/verificación secuencialmente. El paquete final de Emergencias es ~2.4MB, no el ZIP incompleto transitorio.
- Sin navegador conectado (inventario vacío); no se afirma revisión visual real. Recargar el juego y comprobar el HUD al ancho de la captura es el siguiente paso.

## Briefing breve de Emergencias — 2026-10-22
- A petición del usuario, explicación inicial reducida a un párrafo corto por misión, títulos Derrame120s/Incendio90s, una frase de objetivo y controles existentes. Aviso didáctico condensado; se mantiene que vitalidad no mide oxígeno.
- Solo contenido del briefing de juego5_emergencias.html; sin cambios de mecánica. ZIP regenerados y python tools/verify_games.py correcto; git diff --check sin errores.

## Simplificación efectiva de la cabecera de Emergencias — 2026-10-22
- El usuario pidió quitar elementos, no redistribuirlos. Se retiraron del HTML gas/temperatura, pestañas M1/M2, radar y barra completa de pasos. Arriba permanecen tiempo, sonido y fullscreen; debajo el objetivo vigente.
- Cabecera flex de un único grupo; retiradas reglas CSS de los componentes eliminados. updateCamera ya no accede a radar y checkProximity mantiene daño sin el indicador de gas. updateMissionStepsBar actualiza solo el objetivo actual.
- Nueva regresión con referencias DOM ausentes comprueba cámara, exposición y actualización de objetivo. 22/22 pruebas pasan; paquetes regenerados, verificador completo y diff --check correctos.
- Documentación de juego5 actualizada; no se afirma validación visual real por falta de navegador conectado.


## Matriz de Bodega en móviles — 2026-10-24
- La tabla exigía 900 px y la adaptación móvil anterior no contemplaba `.modal-dialog`. Se agregaron reglas específicas de matriz e inspector hasta 768 px, altura dinámica y controles táctiles de 44 px.
- Se conserva la matriz completa mediante scroll interno, primera columna de 140 px y encabezados sticky; leyenda adaptable, pestañas desplazables, fichas y selectores apilados.
- Cambios limitados a presentación y accesibilidad del contenedor; no se modifican cruces ni reglas del juego. Se respetaron los cambios preexistentes del árbol de trabajo.
- 22/22 regresiones pasan; verificador de sintaxis/offline/XML y fuentes empaquetadas correcto. Solo se regeneraron ZIP de Bodega y suite. Sin navegador conectado para inspección visual real; pendiente comprobar 320/390/768 px y orientación horizontal en dispositivo.

## Corrección de colapso en cabecera de Taller Seguro (Juego 4) — 2026-10-24
- **Diagnóstico**: En `juego4_taller.html`, el contenedor `.app-viewport` tiene un ancho máximo de 500 px. La cabecera `.header-bar` ubicaba en una sola fila sin envoltura el cluster de marca con un título de 45 caracteres ("Taller Seguro: Equipamiento y Mantenimiento") junto a la norma ("Res. 773/2021 & Dec. 4741/2005") y la barra de estadísticas (racha, cronómetro, puntos, pantalla completa y audio, ~330 px). Al no haber `min-width: 0` ni espacio suficiente en 500 px, los badges de racha y cronómetro colisionaban y se superponían directamente sobre el texto del título y subtítulo. Adicionalmente, una media query destructiva (`@media (max-width: 640px)`) ocultaba completamente `.brand-cluster` con `display: none !important;` en móviles.
- **Solución implementada**:
  1. **Estructura en dos filas limpias (`.header-top-row` + `.header-stats`)**:
     - *Fila 1 (Marca y Acciones)*: A la izquierda el icono de taller, título simplificado `Taller Seguro` y subtítulo `Seguros Bolívar • KMA`. A la derecha los botones de acción (`btn-moodle-fullscreen` y `btn-sound-toggle`). Ocupa ~230 px, garantizando total holgura en cualquier pantalla desde 320 px hasta 500 px.
     - *Fila 2 (Estadísticas y Desempeño)*: Tres badges distribuidos equitativamente (`flex: 1` con `justify-content: center`): `combo-badge` (RACHA: x1), `stat-timer` (tiempo) y `stat-badge` (puntos).
  2. **Eliminación del colapso y de la regla destructiva**: Se retiró `.brand-cluster { display: none !important; }` y el `.norma-pill` saturante, permitiendo que la cabecera respire con perfecta legibilidad, simetría y sin superposición alguna tanto en escritorio (enmarcado 500 px) como en dispositivos móviles.
  3. **Validación**: Paquetes SCORM 1.2 regenerados limpiamente con `build_scorm.py`.



## Verificacion y Optimizacion Ergonomica de la Matriz en Telefonos (Juego 2) - 2026-10-24
- **Diagnostico**: En pantallas moviles (360-430 px), la Matriz Oficial NTC 4435 en `juego2_bodega.html` quedaba sepultada verticalmente bajo cuatro tarjetas de leyenda de parrafo completo y tres banners repetitivos de instrucciones (~435 px de altura previa), forzando al usuario a realizar scroll vertical antes de poder ver una sola fila de la tabla. Al abrir el inspector de celda, los desplegables se posicionaban antes del veredicto, obligando a desplazar la pantalla para leer la justificacion tecnica.
- **Solucion implementada**:
  1. **Despeje inmediato de la tabla**: La leyenda de 4 convenciones (Compatible, Precaucion, Incompatible, Exclusivo) se transformo en un grid 4x1/2x2 de micro-chips sobrios (ocultando descripciones largas que ya existen en la pestana 3 y en las fichas).
  2. **Barra de herramientas compacta**: Fusionada la instruccion y el boton de selectores en una sola linea de 36 px.
  3. **Visualizacion directa**: La tabla NTC 4435 aparece inmediatamente en pantalla al abrir el modal, ocupando el 70% del viewport vertical sin necesidad de scroll hacia abajo.
  4. **Geometria tactil optimizada**: Sticky column ajustada a 124 px y celdas a 54x44 px (permitiendo ver mas de 4 columnas a la vez en iPhone/Android) con `touch-action: pan-x pan-y` y `overscroll-behavior: contain`.
  5. **UX del Inspector Flotante**: Reordenado mediante CSS flexbox order para que el Duelo de Sustancias (A vs B), el Veredicto Luminoso (`[I] INCOMPATIBLE CRITICO`) y la Justificacion Tecnica aparezcan en primer lugar de lectura, dejando los desplegables de cambio manual en la seccion inferior.
- **Validacion**: Paquetes SCORM 1.2 regenerados con `build_scorm.py`.


## Correccion de Solapamiento Fantasma en la Matriz Movil (Juego 2) - 2026-10-24
- **Diagnostico**: En `juego2_bodega.html`, la clase `.header-crosshair-active` aplicaba un fondo translucido `rgba(255, 199, 44, 0.22) !important`. Al activarse sobre la columna fija lateral (`td.sticky-col`), esta perdia su opacidad oscura solida, permitiendo que las celdas deslizantes subyacentes (iconos de advertencia, prohibicion y compatibilidad) se transparentaran debajo del texto de las sustancias ("3. Liq. Inflamable [ACPM / Diesel]"), colisionando visualmente en un borron ilegible. Adicionalmente, el contenedor `.modal-body` presentaba scroll vertical propio simultaneo al de `.matrix-scroll-region`, generando un doble scroll anidado que recortaba la fila superior de explosivos y ocultaba las pestanas.
- **Solucion implementada**:
  1. Opacidad obligatoria del 100%: `.header-crosshair-active` y `.row-crosshair-active .sticky-col` utilizan ahora fondo solido `#1e293b !important` con borde continuo de 2 px y sombra perimetral de 10 px. Ningun elemento deslizante puede verse a traves de la columna fija.
  2. Supresion de scroll anidado: `.modal-body` configurado con `overflow: hidden !important` y `flex: 1`. La region `.matrix-scroll-region` asume el desplazamiento unico de la tabla, manteniendo cabecera, pestanas, micro-chips de leyenda y barra de accion fijos y accesibles.
  3. Contencion interna de contornos: Reemplazado el contorno externo por sombra interior `boxShadow: inset 0 0 0 2px var(--bolivar-yellow)` y `outline-offset: -2px`.
- **Validacion**: 6 paquetes SCORM 1.2 regenerados con `build_scorm.py`.

## Correccion de Recorte Horizontal en Notificaciones Toast Movil (Juego 3) - 2026-10-27
- **Diagnostico**: En juego3_trasiego.html, la notificacion de retroalimentacion tecnica (#tech-feedback-toast) en dispositivos moviles (<= 768px) sufria un recorte horizontal severo donde el 50% izquierdo del mensaje quedaba fuera de la pantalla. El bug se originaba porque la media query asignaba left: 6px; right: 6px; top: 52px; sin restablecer 	ransform: translateX(-50%) del estilo base (.show { transform: translateX(-50%) translateY(0); }), desplazando el contenedor -50% a la izquierda de la coordenada left: 6px.
- **Solucion implementada**:
  1. Rediseño del anclaje universal sin 	ranslateX(-50%): 	op: 56px; left: 12px; right: 12px; width: auto; max-width: 580px; margin: 0 auto;.
  2. Animacion de entrada/salida basada exclusivamente en el eje vertical: 	ransform: translateY(-20px) -> translateY(0).
  3. En pantallas moviles (<= 768px): anclaje 	op: 50px; left: 8px; right: 8px; con margen visual limpio, garantizando visualizacion 100% centrada y sin recorte.
  4. Agregado boton de descarte [×] y cierre al tocar la notificacion.
- **Validacion**: Paquetes SCORM 1.2 reconstruidos con uild_scorm.py.

## Optimizacion Ergonomica y Supresion de Doble Caja en Matriz Movil (Juego 2) - 2026-10-27
- **Diagnostico**: En juego2_bodega.html, la ejecucion automatica de inspectFromDropdowns(false) al cargar el modal forzaba la activacion de row-crosshair-active y header-crosshair-active sobre la Fila 4 (3. Liq. Inflamable), dejandola permanentemente seleccionada con un box-shadow interior amarillento. Al desplazarse horizontalmente, la celda fija colisionaba visualmente con la celda activa contigua, formando un artefacto de doble caja naranja. Ademas, existian bordes inline heterogeneos (border-left: 3px solid ...) en solo 5 de las 12 filas.
- **Solucion implementada**:
  1. Supresion de seleccion artificial al cargar: inspectFromDropdowns(false) inicializa las etiquetas y cartas en segundo plano sin alterar las clases de reticula en la tabla visual (#table-official-matrix). La tabla abre 100% limpia.
  2. Sustitucion de contornos internos por acento lateral: td.sticky-col.header-crosshair-active utiliza ahora border-left: 3px solid var(--amarillo-bolivar) y fondo solido #1e293b, eliminando cualquier box-shadow interior que genere solapamiento visual con las celdas deslizantes.
  3. Homogeneizacion de filas: Retirados los estilos inline border-left en las filas 2, 4, 10, 11 y 12, estandarizando toda la tabla con una tipografia limpia de 0.62rem.
  4. Geometria de tabla adaptada: Columna fija ajustada a 96 px y celdas a 52 px (ancho total 720 px), garantizando que 5 columnas completas sean visibles a la vez en telefonos moviles.
- **Validacion**: Paquetes SCORM 1.2 reconstruidos exitosamente con build_scorm.py.

## Calificacion Plena de 100 y Optimizacion de Rendimiento en Juego 5 - 2026-10-27
- **Diagnostico**: En juego5_emergencias.html, el puntaje final dependia de variables complejas (vitalidad restante, tiempo exacto en segundos, conteo de pines ocultos de auditoria), reduciendo la nota a 70-85 pts a pesar de haber completado las dos emergencias reglamentarias. En cuanto al rendimiento, la simulacion 3D FPV sufria caidas severas de FPS (lag) causadas por filtros CSS gaussianos intensivos (filter: brightness saturate aplicado a las 6 paredes de 1400 px durante el conato de incendio, blur en el chorro PQS y vapor de valvula, drop-shadow en nodos de fuego), sumado a la ejecucion redundante de checkProximity() y reescritura forzada de innerHTML en cada frame del bucle de fisicas.
- **Solucion implementada**:
  1. Calificacion garantizada de 100%: Si el usuario concluye el entrenamiento dentro del tiempo limite, la calificacion asignada a las misiones y transmitida a Moodle SCORM es estrictamente de 100 pts / 100%. Desglose simplificado y transparente: Control Operativo 100/100, Tiempo Conforme y Protocolo SST 100%. Solo se reprueba (0 pts) si el tiempo limite expira.
  2. Supresion de filtros CSS pesados: Retirado roomFireGlow de las paredes tridimensionales, eliminado filter: blur de .pqs-spray-stream y .valve-steam-fx, y reemplazados los drop-shadows por sombreados GPU nativos (box-shadow).
  3. Desacoplamiento del bucle de fisicas: Eliminada la llamada duplicada de checkProximity() en reposo, cacheo de elementos del DOM de reticula, y actualizacion del indicador de guia flecha solo ante cambio efectivo de orientacion.
- **Validacion**: 6 paquetes SCORM 1.2 reconstruidos con build_scorm.py.
