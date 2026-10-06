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
- **Público Objetivo**: Trabajadores y supervisores de obra.
- **Mecánica**: 
  - Tutorial guiado paso a paso con el avatar institucional *Bolívar Safety Bot*.
  - Examen cronometrado (120 segundos) con 6 sustancias químicas representativas de obra (Thinner, Ácido Muriático, Acetileno, ACPM, Soda Cáustica, Pintura Epóxica).
  - Interacción táctil dual: Drag & Drop (Pointer Events nativos con física y rotación) y Tap-to-Select.
  - Visor modal interactivo de Ficha de Datos de Seguridad (FDS) con sus 16 secciones normativas.
  - Retroalimentación pedagógica detallada ante errores de clasificación.
  - Sistema de evaluación final con cálculo de efectividad y re-inspección de fallos.

### 3.2. Juego 2: Bodega Segura (Puzzle Isométrico de Compatibilidad Química) - `juego2_bodega.html`
- **Público Objetivo**: Encargados de almacén, logística y supervisores SST.
- **Mecánica**:
  - Renderizado 2.5D isométrico con CSS 3D Transforms y billboarding de sprites.
  - Matriz de almacenamiento 3x3 para ubicación de 6 sustancias.
  - Validación dinámica de compatibilidad química SGA en tiempo real (haces de luz verde/rojo con vibración y alarma ante incompatibilidades).
  - Zona de Rechazo y RESPEL para detección y descarte de reenvases ilegales (envases de refresco).
  - Modal interactivo con la Matriz Guía de Almacenamiento Químico Mixto.
  - Reporte de auditoría final con cálculo de índice de riesgo y consecuencias de mezclas peligrosas.

### 3.3. Juego 3: Mando de Control de Trasiego de Combustibles - `juego3_trasiego.html`
- **Público Objetivo**: Conductores de carrotanque, operadores de maquinaria pesada e inspectores.
- **Mecánica**:
  - Telemetría en tiempo real: clima (temperatura, tormentas), pendiente de terreno, proximidad a fuentes hídricas y uso de radiofrecuencia.
  - 6 interruptores tácticos de mitigación: Motor Apagado, Conexión a Tierra Equipotencial, Cuñas de Seguridad, Extintor BC en Batería, Kit Antiderrames y Valla de Exclusión.
  - Salida de doble mando: "Suspender Operación" vs "Autorizar Despacho".
  - Sistema ramificado con 8 consecuencias reales diferenciadas (incendios, explosión, choque de estática, contaminación ambiental, suspensión justificada).
  - Auditoría final con calificación de severidad según decretos normativos.

## 4. Requerimientos No Funcionales
- **Cero dependencias externas**: Eliminación de Tailwind CDN; diseño 100% nativo con variables CSS (`:root`).
- **Accesibilidad visual y ergonomía**: Escala tipográfica ergonómica (13px a 30px) y contraste superior a 4.5:1 para visualización óptima en dispositivos móviles, tablets de campo y kioscos de capacitación.
- **Audio procedimental**: Efectos de sonido generados en tiempo real mediante la Web Audio API nativa sin requerir archivos de audio externos.
