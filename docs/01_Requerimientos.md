# 01. Requerimientos Técnicos y Normativos - Suite Seguridad Química Seguros Bolívar

## 1. Contexto y Objetivos del Negocio
Desarrollo de una suite interactiva de micro-juegos de simulación técnica y arcade pedagógico para la capacitación de trabajadores de obra, contratistas y personal operativo de **Seguros Bolívar**, enfocado en la prevención del riesgo químico y cumplimiento de la normatividad colombiana de Seguridad y Salud en el Trabajo (SST).

## 2. Marco Normativo Colombiano Obligatorio
1. **Resolución 773 de 2021 (Ministerio del Trabajo)**:
   - Implementación obligatoria del Sistema Globalmente Armonizado (SGA) en lugares de trabajo.
   - Clasificación de peligros físicos, para la salud y el medio ambiente.
   - Contenido de la Ficha de Datos de Seguridad (FDS) en 16 secciones (especial énfasis en Sección 2: Identificación de Peligros y Sección 8: Controles de Exposición / EPP).
   - Prohibición expresa (Art. 20) de reenvase de sustancias químicas en recipientes de alimentos o bebidas.
2. **Decreto 1496 de 2018**:
   - Adopción formal del SGA en Colombia.
3. **Decreto 1079 de 2015**:
   - Transporte terrestre de mercancías y sustancias peligrosas (protocolo de trasiego y puesta a tierra).
4. **Decreto 4741 de 2005**:
   - Prevención y manejo de residuos o desechos peligrosos (RESPEL) generados en la gestión de sustancias químicas.
5. **Reglamento Técnico de Instalaciones Eléctricas (RETIE) y NFPA 780**:
   - Protección contra descargas atmosféricas (tormentas eléctricas) y control de estática con conexiones equipotenciales a tierra durante el trasiego de combustibles.

## 3. Catálogo de Juegos y Requerimientos Funcionales

### 3.1. Juego 1: Desafío SGA (Clasificación de Peligros y Lectura de FDS) - `juego1_sga.html`
> 📄 **Documentación Técnica Exclusiva**: [`docs/juegos/01_juego1_sga.md`](juegos/01_juego1_sga.md)
- **Público Objetivo**: Trabajadores y supervisores de obra.
- **Mecánica**: 
  - Tutorial guiado paso a paso con el avatar institucional *Bolívar Safety Bot*.
  - Examen cronometrado (120 segundos) con 6 sustancias químicas representativas de obra (Thinner, Ácido Muriático, Acetileno, ACPM, Soda Cáustica, Pintura Epóxica).
  - Interacción táctil dual: Drag & Drop (Pointer Events nativos con física y rotación) y Tap-to-Select.
  - Visor modal interactivo de Ficha de Datos de Seguridad (FDS) con sus 16 secciones normativas.
  - Retroalimentación pedagógica detallada ante errores de clasificación.
  - Sistema de evaluación final con cálculo de efectividad y re-inspección de fallos.

### 3.2. Juego 2: Bodega Segura (Puzzle Isométrico de Compatibilidad Química) - `juego2_bodega.html`
> 📄 **Documentación Técnica Exclusiva**: [`docs/juegos/02_juego2_bodega.md`](juegos/02_juego2_bodega.md)
- **Público Objetivo**: Encargados de almacén, logística y supervisores SST.
- **Mecánica**:
  - Renderizado 2.5D isométrico con CSS 3D Transforms y billboarding de sprites.
  - Matriz de almacenamiento 3x3 para ubicación de 6 sustancias.
  - Validación dinámica de compatibilidad química SGA en tiempo real (haces de luz verde/rojo con vibración y alarma ante incompatibilidades).
  - Zona de Rechazo y RESPEL para detección y descarte de reenvases ilegales (envases de refresco).
  - Modal interactivo con la Matriz Guía de Almacenamiento Químico Mixto.
  - Reporte de auditoría final con cálculo de índice de riesgo y consecuencias de mezclas peligrosas.

### 3.3. Juego 3: Inspector de Trasiego: Inspección de Campo y Corrección de Riesgos - `juego3_trasiego.html`
> 📄 **Documentación Técnica Exclusiva**: [`docs/juegos/03_juego3_trasiego.md`](juegos/03_juego3_trasiego.md)
- **Público Objetivo**: Inspectores SST, operadores de maquinaria pesada y personal de abastecimiento.
- **Mecánica**:
  - **Zona A: Escenario de Inspección Vectorial SVG**:
    - Camión cisterna UN 1202 y maquinaria de obra secuencial (Excavadora CAT, Volqueta Kenworth, Bulldozer D6T, Generador Caterpillar).
    - 4 Puntos de Inspección / Hotspots parpadeantes en rojo:
      1. Cabina/Motor: Motor encendido / teléfonos celulares activos.
      2. Chasis/Masa: Ausencia de cable equipotencial de polo a tierra.
      3. Acople/Manguera: Ausencia de bandeja de goteo antiderrame.
      4. Perímetro: Ausencia de extintor satélite ABC a 5 metros.
  - **Zona B: Mazo de Tarjetas de Acción de Seguridad**:
    - 4 tarjetas arrastrables (Pointer Events Drag & Drop) o seleccionables (Tap-to-Place):
      1. Desconectar Motor & Aislar Celulares (`fa-power-off`).
      2. Conectar Cable de Polo a Tierra (`fa-bolt`).
      3. Posicionar Bandeja de Goteo Antiderrame (`fa-fill-drip`).
      4. Ubicar Extintor Satélite ABC a 5m (`fa-fire-extinguisher`).
  - **Feedback y Reglas Normativas**:
    - Acierto: Hotspot cambia a verde certificado, el elemento vectorial SVG se acopla dinámicamente y se emite toast normativo explicativo (Dec. 1079/2015, Ley 55/1993, Dec. 4741/2005, Res. 773/2021).
    - Error: Animación GSAP Shake y alerta técnica.
  - **Flujo de 3 Fases**: Tutorial Bolívar Safety Bot, Desafío cronometrado (120s) de 4 equipos y Auditoría Final con certificado.

### 3.4. Juego 4: Taller Seguro: Desafío Isométrico de Equipamiento y Mantenimiento - `juego4_taller.html`
> 📄 **Documentación Técnica Exclusiva**: [`docs/juegos/04_juego4_taller.md`](juegos/04_juego4_taller.md)
- **Público Objetivo**: Mecánicos de taller, técnicos de mantenimiento y supervisores SST.
- **Mecánica**:
  - **Zona 1: El Vestidor / Locker Room (Interior 2.5D Ampliado 500x500 px)**:
    - Casilleros interactivos con panel desplegable de EPP (Res. 773/2021).
    - Selección obligatoria de 4 EPP técnicos: Guantes de nitrilo/neopreno, Monogafas herméticas, Respirador con filtro de vapores orgánicos, Botas con suela antideslizante/nitrilo.
    - Checkpoint Biométrico / Puerta de Seguridad: Escaneo láser del avatar. Bloqueo en rojo con feedback correctivo si faltan elementos requeridos o si se seleccionan trampas (vaqueta, quirúrgico, tenis, etc.). Apertura hidráulica en verde al completar el 100%.
    - Arquitectura libre de oclusiones: Zócalo perimetral bajo (`width: 32px`) con franja verde Bolívar que nunca obstruye los casilleros, puerta o avatar; letreros técnicos reubicados en la pared de fondo.
  - **Zona 2: El Patio de Taller / Mantenimiento (Exterior 2.5D Ampliado 500x500 px)**:
    - Control Tap-to-Move para desplazamiento del avatar con GSAP en grilla de 100px por celda.
    - Tarea 1: Desengrase de pieza en banco de trabajo con solvente dieléctrico/químico.
    - Tarea 2: Mantenimiento de motor, retiro de filtro usado y drenaje de aceite con bandeja antiderrame.
    - Tarea 3: Segregación técnica de RESPEL (Decreto 4741 de 2005) depositando cada residuo en su contenedor específico (filtro en contenedor rojo, trapos en contenedor rojo de sólidos, aceite usado en tambor con estiba antiderrame).
    - Muro perimetral bajo (`width: 32px`) con franja de seguridad amarilla/negra para visibilidad panorámica total.
  - **Barra HUD Flotante de Control de Escenario y Rotación 3D**:
    - Botón de conmutación directa entre zonas (`#btn-toggle-scene`) para alternar fluidamente entre Vestidor y Patio de Taller.
    - Controles de rotación 3D en 90° (`[ ⟲ -90° ]` y `[ 🔄 +90° ]`) con indicador de brújula / orientación (`0° Norte`, `90° Este`, `180° Sur`, `270° Oeste`).
    - Billboarding dinámico de props y avatares con variables CSS `--counter-rot-z` y `--counter-rot-x` para encarar la pantalla en cualquier ángulo.
    - Controles de traslación direccional (`[⬅️]`, `[➡️]`, `[⬆️]`, `[⬇️]`) y botón `[🎯 Centrar]` calibrado en `--pan-x: 0px; --pan-y: 35px;`.
    - Controles de zoom óptico (`[🔍 +]`, `[🔍 -]`) y soporte de arrastre táctil/ratón.
  - **Feedback y Reglas Normativas**: Tarjetas explicativas de Res. 773/2021 (Sección 8 FDS) y Dec. 4741/2005 (Manejo integral de RESPEL).
  - **Flujo de 3 Fases**: Tutorial Bolívar Safety Bot, Desafío de operación (240s / 4 minutos de exploración y mantenimiento) y Auditoría final SST con certificado.

### 3.5. Juego 5: Brigada de Emergencia: Simulador 1ª Persona de Control de Derrames - `juego5_emergencias.html`
> 📄 **Documentación Técnica Exclusiva**: [`docs/juegos/05_juego5_emergencias.md`](juegos/05_juego5_emergencias.md)
- **Público Objetivo**: Brigadistas de emergencia en obra, inspectores SST, supervisores ambientales y personal de planta.
- **Perspectiva y Cámara**:
  - Vista 100% en Primera Persona (FPS / First-Person POV) que representa directamente el campo de visión y los ojos del brigadista a través de la visera de su casco de seguridad.
  - Habitación cúbica 3D estática (1400x1400px con 6 caras industriales en CSS3 Nativo) con desplazamiento físico en 1ª persona (WASD y D-Pad táctil móvil).
  - Rotación vertical (Pitch) Euler acotada entre -45° y +40° para inspeccionar suelo (charco químico, drenaje) y altura (techo, tuberías, baliza) sin cinetosis.
  - Spawn point calibrado frente al charco químico pero a distancia segura (X = 0, Z = 360, pitch = -12°) con ángulo frontal directo hacia la zona de emergencia.
  - Control de mirada normal con ratón (Pointer Lock API al hacer clic sobre el viewport y rotación con `e.movementX` y `e.movementY`) y arrastre táctil suave.
  - Alineación vectorial estricta de avance W/S y strafe A/D relativa al ángulo de mirada (`yaw`), garantizando avance frontal intuitivo hacia cualquier punto enfocado.
  - Control de interacción directa: accionamiento con tecla [E] en computadores (con prompt contextual dinámico en la mira central), clic izquierdo de ratón en modo Pointer Lock, clic directo sobre los modelos 3D o botón táctil en pantalla para dispositivos móviles.
  - Capa de Manos en 1ª Persona (First-Person Hands): Brazos animados que ejecutan acciones físicas directas (apretar válvulas, vestir guantes, manipular kit antiderrame y accionar lavaojos).
- **Mecánica Operativa (Protocolo de Crisis en 5 Pasos)**:
  1. *Caseta EPP (Oeste)*: Equipamiento en 1ª persona de guantes de nitrilo/neopreno de alta densidad y máscara Full-Face con filtro de vapores orgánicos (Res. 773/2021) mediante interacción fluida por proximidad (X = -550, Z = 350, r = 360px), tecla [E] o clic directo.
  2. *Válvula Principal (Norte)*: Agarre y giro mecánico de manivela para cortar el flujo de solvente tóxico.
  3. *Lavaojos de Emergencia (Sur)*: Accionamiento de palanca para lavado ocular continuo de 15 minutos en operario afectado (ANSI Z358.1 / FDS Sec. 4) calibrado a radio 230px frente a la pared sur.
  4. *Kit Antiderrame y Charco (Centro / Este)*: Obtención de insumos en el estante este y contención del charco corrosivo en el suelo mediante radio extendido de 420px con filtrado direccional por cono de visión (FOV / producto punto vectorial), instalando primero el cordón absorbente y aplicando posteriormente los paños sintéticos.
  5. *Acopio RESPEL (Oeste)*: Recolección de paños impregnados en bolsa roja, rotulado de peligro y disposición sobre estiba colectora (Dec. 4741/2005).
- **Auditoría de Campo en 1ª Persona (4 Hallazgos Ocultos)**:
  - Extintor despresurizado/vencido (NFPA 10).
  - Frasco de consumo alimentario reenvasado con químico sin etiquetado SGA (Art. 20 Res. 773/2021).
  - Puesto de mezclas con FDS ausente (Ley 55/1993).
  - Tambor apoyado sobre suelo natural sin estiba de contención (Dec. 4741/2005).
- **Reglas de Crisis**:
  - Exposición a vapores sin máscara reduce el medidor de O2/Vitalidad con parpadeo de asfixia en el visor.
  - Expansión del charco hacia el drenaje pluvial: si alcanza el 100% antes de confinarlo con el cordón, la misión fracasa por desastre ecológico.
- **Flujo de 3 Fases**: Inducción del Bolívar Safety Bot, Desafío de crisis en 1ª persona (120s) y Auditoría final con certificado de brigadista.

## 4. Requerimientos No Funcionales
- **Cero dependencias externas**: Eliminación de Tailwind CDN; diseño 100% nativo con variables CSS (`:root`).
- **Accesibilidad visual y ergonomía**: Escala tipográfica ergonómica (13px a 30px) y contraste superior a 4.5:1 para visualización óptima en dispositivos móviles, tablets de campo y kioscos de capacitación.
- **Audio procedimental**: Efectos de sonido generados en tiempo real mediante la Web Audio API nativa sin requerir archivos de audio externos.

## 5. Requerimientos de Plataforma LMS (Moodle) y Despliegue SCORM
> 📄 **Guía de Despliegue en Plataforma**: [`docs/GUIA_INTEGRACION_MOODLE.md`](GUIA_INTEGRACION_MOODLE.md)
- **Compatibilidad Universal con Moodle LMS (3.9+ a 4.4+)**:
  - Toda la suite debe operar tanto de forma autocontenida web como integrada nativamente dentro de Moodle.
- **Protocolo de Calificación SCORM 1.2 / 2004**:
  - Detección automática del API SCORM de Moodle (`window.API` / `parent.API`).
  - Envío automático de la calificación numérica final (0% a 100%) a `cmi.core.score.raw` y estado de aprobación a `cmi.core.lesson_status` (`passed` para $\ge 80\%$, `failed` para $< 80\%$).
- **Soporte de iFrame con HTML5 postMessage**:
  - Emisión de eventos `MOODLE_GAME_REPORT` hacia la ventana padre para incrustación dentro de páginas y etiquetas de Moodle.
- **Empaquetado Automatizado**:
  - Disponibilidad de paquetes ZIP canónicos (`imsmanifest.xml` e `index.html`) en la carpeta `scorm_packages/` listos para ser subidos como actividades SCORM.
- **Control de Pantalla Completa (Fullscreen)**:
  - Botón accesible en cabina (`btn-moodle-fullscreen`) para expandir el juego al 100% de la pantalla del operario, anulando márgenes o marcos reducidos de Moodle.

