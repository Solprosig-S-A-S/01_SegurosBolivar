# Documentación Técnica Exclusiva - Juego 1

> **Contrato vigente 2026-10-22:** SGA: tres niveles sin reloj de examen; cuatro asociaciones legales, seis casos de familias, tres envases (Thinner, HCl, pintura) y seis casos FDS. Las respuestas quedan bloqueadas durante feedback; el reinicio restaura rotulado 3A. Se permite corregir el rotulado en modo entrenamiento. Aprobación desde 80 % y todos los hitos. [Contrato y validaciones](../CORRECCIONES_2026-10-22.md).
> Las referencias normativas y detalles del diseño original que siguen son contexto histórico, no instrucciones de campo ni acreditación de cumplimiento; prevalece este contrato. Recursos externos incrustados, sin CDN en ejecución. QA visual, lector de pantalla y SST profesional pendientes.
## Desafío SGA: Clasificación de Peligros y Lectura de FDS

---

## 1. Ficha Técnica y Resumen Ejecutivo

| Parámetro | Especificación Técnica |
| :--- | :--- |
| **Nombre del Módulo** | Desafío SGA: Clasificación de Peligros y Lectura de FDS |
| **Archivo Fuente** | `juego1_sga.html` |
| **Público Objetivo** | Operarios de obra, almacenistas, inspectores SST y supervisores ambientales |
| **Perspectiva / Vista** | UI High-Tech 2D Responsive (Cabina digital con vista vertical tipo tableta industrial) |
| **Viewport Objetivo** | 100vh / Responsive (Enfocado en móviles y tablets, enmarcado ergonómico en PC) |
| **Stack Tecnológico** | HTML5 Semántico, CSS3 Nativo (`:root`), JavaScript ES6 Puro, Web Audio API |
| **Recursos offline** | Fuentes, Font Awesome 6.4.0 y GSAP 3.12.2 (juegos 3-5) incrustados en HTML |
| **Empaquetador / Build** | Cero dependencias / Vanilla JS (Ejecución standalone directa en navegador) |

El **Juego 1** es un simulador interactivo de evaluación y aprendizaje para el Sistema Globalmente Armonizado (SGA). Su objetivo es entrenar la habilidad del personal de construcción e industria para interpretar fichas técnicas FDS (Sección 2: Identificación de Peligros y Sección 8: Controles de Exposición y EPP) y asociar de manera certera el pictograma de peligro oficial correspondiente a sustancias químicas reales utilizadas en frentes de obra.

---

## 2. Marco Normativo y Fundamento Legal

El juego está diseñado en estricto apego al marco regulatorio de seguridad química en Colombia:

1. **Resolución 773 de 2021 (Ministerio del Trabajo y Ministerio de Salud)**:
   - *Artículo 6*: Obligatoriedad de rotulado conforme al Sistema Globalmente Armonizado en los lugares de trabajo.
   - *Artículo 7*: Prohibición tajante de mezclas incompatibles e instrucciones obligatorias de segregación química.
   - *Artículo 12*: Requisitos de etiquetado y comunicación de peligros durante el almacenamiento y trasiego.
   - *Artículo 15*: Disponibilidad y consulta obligatoria de la Ficha de Datos de Seguridad (FDS) de 16 secciones en el puesto de trabajo.
2. **Decreto 1496 de 2018**:
   - Adopción oficial del Sistema Globalmente Armonizado de Clasificación y Etiquetado de Productos Químicos (SGA) en el territorio nacional.
3. **Ley 55 de 1993 (Convenio 170 de la OIT)**:
   - Seguridad en la utilización de los productos químicos en el trabajo y derecho de los trabajadores a conocer los peligros intrínsecos de las sustancias.
4. **Decreto 1072 de 2015 (SG-SST)**:
   - Estándares mínimos para capacitación y prevención del riesgo químico en el Sistema de Gestión de Seguridad y Salud en el Trabajo.

---

## 3. Catálogo de Pictogramas SGA y Reactivos de Obra

### 3.1. Pictogramas Oficiales Modelados (SVG Vectorial Directo)
El simulador incorpora vectores SVG nativos con rombos de borde rojo y fondo blanco para:
- **`inflamable`**: Llama sobre línea horizontal (Líquidos, sólidos o gases inflamables).
- **`corrosivo`**: Tubos de ensayo vertiendo líquido corrosivo sobre barra metálica y mano humana (Corrosión cutánea Cat. 1 y metales Cat. 1).
- **`gas`**: Bombona / cilindro de gas a presión (Gases comprimidos, licuados o disueltos).
- **`salud`**: Silueta humana con estrella de explosión interior en el pecho (Peligro por aspiración, carcinogenicidad, mutagenicidad, toxicidad específica STOT).
- **`toxicidad`**: Calavera y tibias cruzadas (Toxicidad aguda severa oral, dérmica o por inhalación Cat. 1-3).
- **`irritante`**: Signo de exclamación grueso (Irritación cutánea/ocular, sensibilización, narcótico Cat. 2).

### 3.2. Envases del nivel de rotulado vigente

| ID | Ejemplo ficticio | Pictogramas requeridos por los datos del escenario |
| --- | --- | --- |
| chem_2 | Thinner | Inflamable, salud, irritante |
| chem_1 | HCl | Corrosivo, irritante, toxicidad |
| chem_6 | Pintura epoxica | Inflamable, salud, irritante, ambiente |

Las FDS incluidas son ejemplos didacticos, no fichas de un fabricante.

## 4. Recorrido vigente

1. Asociar cuatro normas y conceptos.
2. Clasificar seis situaciones por familia de peligro; una respuesta por caso presentado.
3. Rotular tres envases con varios pictogramas y resolver seis consultas FDS.
4. Mostrar resultado solo tras completar todo. Aprobacion desde 80 %, con reintentos completos y sin reloj de examen.

## 5. Arquitectura de Software y Código

### 5.1. Sistema de Diseño CSS Puro (Sin Tailwind)
- Variables semánticas centralizadas en `:root`:
  - Colores: `--bolivar-green: #006738`, `--bolivar-yellow: #FFC72C`, `--bg-viewport: #0F172A`, `--bg-card: #1E293B`.
  - Escala tipográfica ergonómica: `--font-xs: 0.8125rem` (13px) hasta `--font-2xl: 1.875rem` (30px), garantizando legibilidad en teléfonos bajo luz solar.
- Eliminación total de Tailwind CDN para autonomía de red y velocidad de carga instantánea.
- **Transparencia e Inmunidad de Capas Visuales (`pointer-events: none`)**:
  - Las capas de efectos de partículas (`#fx-canvas`) y globos de cómic (`#comic-reaction-layer`) cuentan con `.pointer-events-none` en el sistema de diseño y `pointer-events: none;` explícito inline, erradicando cualquier bloqueo de eventos de clic, selección o arrastre sobre la interfaz.
- **Controlador Robusto de Arrastre (`setupDragAndDrop`)**:
  - Al iniciar el arrastre sobre una tarjeta química, la escucha de `pointermove` y `pointerup` se delega dinámicamente al objeto global `window`, evitando pérdidas de captura de puntero si el cursor sale de la tarjeta o cuando se aplica la clase `.is-dragging`.
- **Rediseño Integral de Interfaz y Erradicación de Saturación Visual**:
  - **Calibración de Escala Tipográfica**: Estandarización de jerarquía en `:root` (`--font-xs: 12px`, `--font-sm: 14px`, `--font-base: 15px`, `--font-lg: 18px`, `--font-xl: 22px`). Supresión de pesos tipográficos excesivos (`font-weight: 900` generalizado reemplazado por `700` en títulos y `400/500` en cuerpos) para descanso visual.
  - **Desaturación Cromática y Eliminación de Neones**: Supresión de resplandores fluorescentes intensos (`0 0 30px` y `0 0 20px`), gradientes incandescentes y bordes verdes prematuros en tarjetas sin clasificar. Las tarjetas adoptan un fondo oscuro sobrio (`rgba(30, 41, 59, 0.55)`), bordes sutiles en pizarra neutra (`rgba(148, 163, 184, 0.2)`) y estados activos refinados.
  - **Ergonomía Visual en Visor FDS (`#modal-fds`) y Modales Técnicos (`#modal-error-feedback`, `#modal-word-challenge`)**:
    - Visor FDS focalizado exclusivamente en **Sección 2 (Peligros SGA)** y **Sección 8 (EPP y Controles)**, eliminando 3 tarjetas de relleno irrelevante.
    - Modales de error y mini-reto unificados con acentos laterales discretos de 4px (`border-left`), tipografía limpia y botones balanceados.

### 5.2. Motor de Audio Procedimental (`SoundEngine`)
Generación de audio analógico mediante Web Audio API nativa sin archivos `.mp3` ni `.wav`:
- `tap()`: Tono sinusoidal corto en 700 Hz.
- `correct()`: Acorde armónico ascendente C5 (523 Hz) ➔ E5 (659 Hz) ➔ G5 (784 Hz).
- `error()`: Tono en diente de sierra descendente a 150 Hz con vibración.
- `fanfare()`: Fanfarria de victoria tetra-armónica al aprobar el examen.

---

## 6. Pruebas y Casos de Validación

1. **Prueba de Compatibilidad Táctil**:
   - Arrastrar pictogramas en pantallas táctiles iOS / Android: no debe producir scroll involuntario de página (`touch-action: manipulation;`).
2. **Prueba de Modal FDS**:
   - Abrir el visor FDS durante el cronómetro: el modal debe aislar el foco y permitir cerrar con botón `[Cerrar FDS]` o toque fuera del diálogo.
3. **Prueba de Re-inspección**:
   - Al cometer un error intencional, la fase 3 debe marcar la tarjeta con borde rojo, mostrar el pictograma correcto esperado y citar el artículo de la Res. 773/2021.

