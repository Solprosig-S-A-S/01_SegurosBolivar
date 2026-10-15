# 02. Arquitectura de Software - Suite de Micro-Juegos Seguros Bolívar

## 1. Visión General de la Arquitectura
La suite se diseñó bajo una filosofía de **cero dependencias de empaquetado** y **máxima portabilidad offline** (Self-Contained Single File HTML/JS). Cada juego puede ejecutarse de manera autónoma en cualquier navegador moderno sin requerir servidores Node.js, compiladores Sass o conexiones a CDNs externos.

```
                    ┌────────────────────────────────────────────────────────┐
                    │               SISTEMA DE DISEÑO NATIVO                 │
                    │   Tokens CSS (:root) - Tipografía ergonómica 13-30px    │
                    │   Paleta Bolívar (#006738, #FFC72C, #EF4444)           │
                    └───────────────────────────┬────────────────────────────┘
                                                │
         ┌──────────────────────────────────────┼──────────────────────────────────────┐
         ▼                                      ▼                                      ▼
┌───────────────────┐                  ┌───────────────────┐                  ┌───────────────────┐
│  juego1_sga.html  │                  │ juego2_bodega.html│                  │juego3_trasiego.html│
│ (Desafío FDS/SGA) │                  │ (Bodega Isométrica│                  │(Mando de Trasiego)│
├───────────────────┤                  ├───────────────────┤                  ├───────────────────┤
│ • Pointer Events  │                  │ • 2.5D Preserve3D │                  │ • Telemetría Real │
│ • Dual Drag/Tap   │                  │ • Billboarding    │                  │ • 6 Switches SST  │
│ • Modal FDS 16 Sec│                  │ • Raycasting/Ady. │                  │ • Matriz de Falla │
│ • Lucho Avatar    │                  │ • Zona RESPEL     │                  │ • Doble Mando     │
└─────────┬─────────┘                  └─────────┬─────────┘                  └─────────┬─────────┘
          │                                      │                                      │
          └──────────────────────────────────────┴──────────────────────────────────────┘
                                                 │
                    ┌────────────────────────────┴───────────────────────────┐
                    │               SUBSISTEMAS COMPARTIDOS                  │
                    │  • Web Audio API Synth (Osciladores & GainNodes)       │
                    │  • Canvas 2D Particle Engine (Chispas / Confetti)      │
                    │  • GSAP 3.12 (Animaciones elásticas de retroalimentar) │
                    └────────────────────────────────────────────────────────┘
```

## 2. Subsistemas Clave

### 2.1. Motor de Estilos y Tokens Semánticos (`:root`)
Se descartó el uso de Tailwind CSS para evitar fragilidad por latencia de CDN y la dispersión de cadenas kilométricas de utilidades. Se implementaron tokens globales:
- **Colores de Identidad**: `--bolivar-green` (`#006738`), `--bolivar-green-glow` (`#10B981`), `--bolivar-yellow` (`#FFC72C`), `--hazard-red` (`#EF4444`).
- **Escala Tipográfica Ergonómica**:
  - `--font-xs`: `0.8125rem` (13px)
  - `--font-sm`: `0.9375rem` (15px)
  - `--font-base`: `1.0625rem` (17px)
  - `--font-lg`: `1.25rem` (20px)
  - `--font-xl`: `1.5rem` (24px)
  - `--font-2xl`: `1.875rem` (30px)
- **Fuentes**: Tipografía principal `Outfit` (sans-serif legible) y `JetBrains Mono` para datos técnicos y cronómetros.

### 2.2. Motor de Audio Sintetizado (Web Audio API)
Generación procedural de efectos sonoros sin archivos `.mp3` ni `.wav`:
- `playBeep(freq, type, duration, gain)`: Tonos sinusoidales para selecciones y advertencias.
- `playSuccessChord()`: Arpegio triádico mayor para clasificaciones correctas.
- `playAlarm()`: Tono triangular descendente con vibración para incompatibilidades químicas y fallas críticas.
- `playWinFanfare()`: Secuencia armónica ascendente para aprobación de evaluaciones.

### 2.3. Motor de Interacción y Física Táctil (Juego 1)
- Basado en **Pointer Events** (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`).
- Detección de umbral de 6px para diferenciar toque simple (Tap) de arrastre (Drag).
- Detección precisa de destinos con `document.elementFromPoint` desactivando temporalmente `pointer-events` en la tarjeta activa.
- Retorno elástico con transición cúbica cuando se suelta fuera de casilla válida.

### 2.4. Perspectiva Isométrica 2.5D en CSS Puro (Juego 2)
- Tablero tridimensional con `perspective: 1100px` y `transform: rotateX(60deg) rotateZ(-45deg)`.
- Sprites verticales contrarrotados (`rotateZ(45deg) rotateX(-60deg)`) para evitar distorsión de la cámara y proyectar sombras dinámicas sobre la grilla.
- Algoritmo de adyacencia ortogonal en grilla 3x3 (`|r1 - r2| + |c1 - c2| === 1`) con trazado de rayos luminosos dinámicos entre celdas.

### 2.5. Inspector de Trasiego: Escenario SVG y Motor Drag & Drop (Juego 3)
- **Escenario Vectorial SVG y Puntos de Riesgo**:
  - Escenario compuesto por camión cisterna UN 1202 y maquinaria de obra pesada.
  - 4 Hotspots parpadeantes en SVG vinculados a atributos de datos (`data-target="1..4"`) con animación CSS de alerta (`pulse-hazard`).
  - Al recibir la acción correcta, el hotspot conmuta a verde certificado (`is-certified`) y detona la aparición animada del elemento SVG correspondiente (humo disipado, cable de tierra acoplado, bandeja de goteo posicionada o extintor satélite perimetral).
- **Motor de Interacción Dual (Pointer Events Drag & Drop + Tap-to-Place)**:
  - Sistema de captura de puntero (`setPointerCapture`) con clon flotante optimizado para pantallas táctiles y ratón de escritorio.
  - Detección precisa de objetivo mediante `document.elementFromPoint` durante el evento `pointerup`.
  - Mecanismo alternativo de selección por toque (Tap-to-Place) para garantizar accesibilidad en dispositivos pequeños.
- **Sistema de Feedback Normativo y Audio Procedimental**:
  - Emisión de toasts con citas legales explícitas (Decreto 1079 de 2015, Decreto 4741 de 2005, Ley 55 de 1993 y Resolución 773 de 2021).
  - Tono armónico ascendente en aciertos y timbre grave con vibración GSAP Shake en desaciertos.
  - Flujo secuencial de 4 equipos y auditoría final certificada.

### 2.6. Taller Seguro: Motor Isométrico 2.5D Multiescenario por Separado, Tap-to-Move y Segregación RESPEL (Juego 4)
- **Perspectiva Isométrica 2.5D Multiescenario Autónomo y Ampliado**:
  - Dos escenarios completos renderizados por separado (`#stage-vestidor` y `#stage-workshop`) con conmutación dinámica (`switchZone`), garantizando inmersión total en cada fase y evitando la sobrecarga espacial de visualización simultánea.
  - Dimensiones ampliadas a `500px x 500px` con viewport de `640px` (mínimo `580px` en escritorio, `520px` en tablet y `440px` en móvil) y grilla de 25 baldosas de `100px x 100px` por cuarto.
  - Cada escenario dispone de su propio `.iso-world` centrado con transformaciones CSS 3D (`rotateX(var(--rot-x, 60deg)) rotateZ(var(--rot-z, -45deg))`).
- **Arquitectura Anti-Oclusión y Muros de Perímetro Seguro**:
  - `.iso-wall-left`: Muro de fondo vertical de `160px` con `backface-visibility: hidden;` donde se concentran los espejos, tableros de herramientas, ventanas industriales y señalética normativa.
  - `.iso-wall-right`: Transformado de muro alto de 170px a un **zócalo perimetral arquitectónico bajo (`width: 32px`)** con `backface-visibility: hidden;` y franjas de advertencia industrial. Esto elimina al 100% el bloqueo visual que antes cubría los casilleros y el suelo, proporcionando visualización diáfana desde cualquier ángulo.
- **Sistema de Rotación 3D Continua (90°) y Billboarding Dinámico**:
  - Barra HUD con botones de giro `[ ⟲ -90° ]` y `[ 🔄 +90° ]` con lector de brújula analítica (`0° Norte`, `90° Este`, `180° Sur`, `270° Oeste`).
  - Billboarding dinámico mediante variables CSS: `--counter-rot-z: ${-rotZ}deg` y `--counter-rot-x: ${-rotX}deg` en `.iso-prop` e `.iso-avatar`, logrando que todos los elementos y el operador encaren siempre la pantalla perpendicularmente al rotar el escenario en los 4 cuadrantes sin deformación.
- **Detalle Arquitectónico y Props Realistas**:
  - **Escenario 1 (El Vestidor)**: Batería de 3 casilleros de acero (`left: 35px, top: 30px`), banco central de madera/hierro (`left: 175px, top: 220px`), espejo de inspección EPP, lavaojos de emergencia reglamentario, pediluvio sanitario de calzado (`left: 370px, top: 280px`), perchero de dotación limpia (`left: 390px, top: 160px`) y puerta de esclusa blindada con panel biométrico (`left: 320px, top: 30px`).
  - **Escenario 2 (El Taller Mecánico)**: Banco pesado de desengrase con tornillo de banco (`left: 45px, top: 60px`), bloque de motor con **bandeja de goteo antiderrame profunda** (`left: 300px, top: 60px`), estación oficial RESPEL delimitada con franja amarilla/negra (`left: 80px, top: 300px`, ancho 260px) con estiba antiderrame de polietileno, carro móvil de herramientas (`left: 385px, top: 320px`) y gabinete de kit antiderrames de emergencia (`left: 395px, top: 160px`).
- **Transición Cinematográfica entre Escenarios**:
  - Al completar el 100% del EPP requerido (Res. 773/2021) y superar el escaneo biométrico, se activa un overlay cinematográfico con animación de compuertas y audio hidráulico que conmuta fluidamente al patio de taller.
- **Sistema de Movimiento Tap-to-Move con GSAP v3**:
  - Rejillas 5x5 por escenario (25 baldosas de 100px) con cálculo euclidiano de desplazamiento y sincronización de avatares centrados inicialmente en `(250, 250)`.
- **Centrado de Masa Visual y Pipeline de Cámara Isométrica**:
  - Calibración del centro de gravedad visual mediante variables CSS dinámicas en `:root`: `--pan-x: 0px; --pan-y: 35px; --rot-x: 60deg; --rot-z: -45deg; --scene-scale: 1;`.
  - Botón `[🎯 Centrar]` reajusta instantáneamente el encuadre exacto sin pérdida de contexto. Arrastre táctil y ratón con Pointer Events fluidos.
- **Auditoría Técnica y Certificación SST**:
  - Cronómetro de desafío en 240 segundos (04:00 minutos) para exploración pausada y mantenimiento seguro.
  - Evaluación integral con cálculo porcentual (0%-100%), racha técnica, tiempo restante y emisión de certificado de Taller Seguro conforme a Res. 773/2021 y Dec. 4741/2005.

### 2.7. Brigada de Emergencia: Motor de Simulación en Primera Persona (FPS POV), Habitación Cúbica 3D y HUD (Juego 5)
- **Perspectiva y Cámara en Primera Persona (FPS / First-Person POV)**:
  - Vista directa desde los ojos del brigadista; estrictamente sin avatares de tercera persona, sin vista isométrica ni vista top-down.
  - Habitación cúbica 3D estática de 1400x1400px en CSS3 Nativo (`perspective: 750px`), estructurada con 6 caras geométricas cerradas (suelo epóxico a Y = +350px, techo con baliza a Y = -350px, y 4 paredes a Z/X = ±700px).
  - Transformación del Rig de Cámara con pivote ocular exacto: `transform: translateZ(750px) rotateX(pitch deg) rotateY(yaw deg) translate3d(-posX, 0, -posZ)`.
  - Rotación vertical Euler (`pitch`) acotada entre -45° y +40° para posibilitar visualización de techo/baliza y suelo/charco sin deformaciones excéntricas.
  - Spawn inicial estratégico: `posX = 0, posZ = 360, yaw = 0°, pitch = -12°` frente al charco químico pero a distancia segura ($d = 290\text{px} > 260\text{px}$) para evitar daño inmediato de asfixia.
  - Giro de mirada normal con ratón (Pointer Lock API activo con clic en pantalla para captura de mira FPS y `e.movementX`/`e.movementY`, con arrastre fluido de respaldo).
  - Detección de proximidad y targeting FPS con cono de visión (FOV / producto punto $\vec{F} \cdot \vec{V}_{norm} \ge 0.25$): descarta objetos a espaldas del jugador, radio del charco químico ampliado a $420\text{px}$ para contención perimetral cómoda, lavaojos calibrado a $230\text{px}$, caseta EPP y RESPEL a $360\text{px}$, soporte de clic izquierdo interactivo en Pointer Lock y colisiones en límites perimetrales ($\pm 520\text{px}$).
- **Visera del Casco y Head-Up Display (HUD)**:
  - Marco perimetral curvado simulando el policarbonato del casco de seguridad con sombreado de oclusión y texturizado de visor.
  - Medidor de Detector de Gases/Vapores PID en tiempo real (PPM) calibrado dinámicamente según la cercanía al charco químico y estado de la válvula.
  - Reloj de crisis digital de 120 segundos y barra de Vitalidad / O2 del operador con parpadeo rojo de advertencia de asfixia ante exposición sin máscara.
  - Medidor de avance del derrame hacia el drenaje ambiental (0% a 100%) con condición de derrota instantánea si alcanza el drenaje.
  - Al equipar la máscara Full-Face en la caseta EPP, el visor activa la clase `.fullface-active` con tintado protector y filtro químico.
- **Capa de Manos en 1ª Persona (First-Person Hands Layer)**:
  - Par de brazos/manos en perspectiva inferior (`.fps-hands-layer`) con animación GSAP de balanceo al girar la mirada.
  - Transición de guantes de dotación básica a guantes de nitrilo químico de alta densidad (`.gloves-equipped`) al interactuar con la caseta EPP.
  - Animaciones de acción física (`.action-active`) en cada interacción: giro de 360° en la manivela de válvula, apertura de kit, tendido de cordones y paños, empuje de palanca de lavaojos y acopio de residuo.
- **Mecánica de Interacción de 6 Nodos y Auditoría de Campo (4 Hallazgos)**:
  - 6 Estaciones interactivas orientadas en el espacio 360°: Válvula Norte, Caseta EPP Noroeste, Kit Antiderrame Este, Charco Químico Sur, Lavaojos Sureste y Acopio RESPEL Oeste.
  - 4 Hallazgos de auditoría ocultos en el entorno con pines interactivos: extintor despresurizado (NFPA 10), botella de jugo con solvente sin etiqueta SGA (Res. 773/2021), puesto de mezclas sin FDS (Ley 55/1993) y tambor en suelo sin estiba colectora (Dec. 4741/2005).
- **Motor de Audio Procedimental Sintético (Web Audio API)**:
  - Generación en tiempo real de sirenas de emergencia moduladas, silbido de vapor químico, clank mecánico de válvula, flujo turbulento de agua en lavaojos, respiración rítmica del filtro de máscara y tonos de confirmación.

### 2.8. Arquitectura de Integración LMS Moodle y SCORM Universal (`BolivarLmsBridge`)
> 📄 **Especificación Detallada de Integración**: [`docs/GUIA_INTEGRACION_MOODLE.md`](GUIA_INTEGRACION_MOODLE.md)
- **Capa de Abstracción Universal (`BolivarLmsBridge`)**:
  - Embebida directamente en cada uno de los 5 juegos, garantizando cero dependencias externas y ejecución dual (Moodle LMS vs Web Standalone).
  - Detección recursiva del API SCORM de Moodle (`window.API` / `window.parent.API` / `window.top.API` / `opener`) con soporte para SCORM 1.2 y SCORM 2004.
  - Almacena automáticamente en el Libro de Calificaciones de Moodle:
    - `cmi.core.score.raw`: Puntaje de 0 a 100 puntos.
    - `cmi.core.lesson_status`: `passed` si $\ge 80\%$, `failed` si $< 80\%$.
    - `cmi.core.exit`: Cierre de sesión limpio en eventos `beforeunload`.
  - Capa de comunicación secundaria vía **HTML5 `postMessage`** (`MOODLE_GAME_REPORT`) para cuando los juegos se embeben en etiquetas o páginas mediante `<iframe>`.
- **Botón de Pantalla Completa Moodle (`btn-moodle-fullscreen`)**:
  - Control de pantalla completa con la API `requestFullscreen()` de HTML5, permitiendo al operario expandir el juego y anular los márgenes y bloques laterales de Moodle.
- **Pipeline de Empaquetado Automatizado (`build_scorm.py`)**:
  - Generador Python que produce paquetes `.zip` estándar con manifiesto `imsmanifest.xml` canónico e `index.html` en la carpeta `scorm_packages/`.

---

## 3. Índice de Documentación Exclusiva por Juego

Para la especificación funcional, matemática, modelos de datos y análisis de componentes en profundidad de cada micro-juego, consulte su respectivo documento técnico exclusivo:

- 🧪 **Juego 1: Desafío SGA (Clasificación de Peligros y FDS)**: [`docs/juegos/01_juego1_sga.md`](juegos/01_juego1_sga.md)
- 📦 **Juego 2: Bodega Segura (Puzzle Isométrico 2.5D de Compatibilidad)**: [`docs/juegos/02_juego2_bodega.md`](juegos/02_juego2_bodega.md)
- ⛽ **Juego 3: Inspector de Trasiego (Inspección de Campo y Hotspots)**: [`docs/juegos/03_juego3_trasiego.md`](juegos/03_juego3_trasiego.md)
- 🛠️ **Juego 4: Taller Seguro (Desafío Isométrico de Equipamiento y Mantenimiento)**: [`docs/juegos/04_juego4_taller.md`](juegos/04_juego4_taller.md)
- 🚨 **Juego 5: Brigada de Emergencia (Simulador 1ª Persona de Control de Derrames)**: [`docs/juegos/05_juego5_emergencias.md`](juegos/05_juego5_emergencias.md)
