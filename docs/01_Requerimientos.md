# 01 - Especificación de Requerimientos: Suite Arcade Seguridad Química KMA Construcciones • Solprosig & Seguros Bolívar

## 1. Visión General
Suite de 5 videojuegos educativos interactivos táctiles (Mobile-First) sobre Seguridad Química en Obras de Infraestructura y Construcción, desarrollada para los trabajadores de **KMA Construcciones S.A.S.** con la consultoría en SST de **Solprosig S.A.S.** (logotipo oficial "S") y el respaldo de **ARL Seguros Bolívar**.
Arquitectura distribuida en archivos HTML independientes autocontenidos (`index.html` como Hub central y 5 archivos específicos para cada minijuego), con persistencia unificada mediante `localStorage`. Cada minijuego incluye al finalizar su fase operativa una **Prueba Interactiva Normativa** y una **Puntuación Final Consolidada**.

---

## 2. Marco Normativo Colombiano Obligatorio
- **Resolución 773 de 2021:** Implementación del SGA en lugares de trabajo, etiquetado de envases, estructura de FDS de 16 secciones y prohibición expresa de reenvase de químicos en envases de alimentos o bebidas.
- **Decreto 1496 de 2018:** Adopción obligatoria del Sistema Globalmente Armonizado (SGA).
- **Decreto 4741 de 2005:** Prevención y manejo de Residuos Peligrosos (RESPEL) e incompatibilidades químicas.
- **Ley 55 de 1993:** Convenio OIT sobre seguridad en la utilización de los productos químicos en el trabajo.
- **Decreto 1079 de 2015 & Dec. 1072 de 2015:** Protocolos de transporte/trasiego de sustancias peligrosas y SG-SST.

---

## 3. Desglose de Módulos y Entregables

### 3.0 Dashboard / Hub Central (`index.html`)
- Identidad gráfica Seguros Bolívar & Solprosig.
- Tarjeta de perfil de usuario (nombre/avatar editable, nivel, puntaje acumulado, 0/15 estrellas, medallas).
- Grid de navegación táctil a los 5 minijuegos con estado (desbloqueado/bloqueado) y barra de progreso.

### 3.1 Nivel 1: "SGA Hazard Catch & Smash" (`game1_sga_hazard.html`)
- **Normativa:** Res. 773/2021, Dec. 1496/2018.
- **Mecánica:** Caída de frascos de químicos reales (ACPM, Thinner, Ácido Muriático, Soda Cáustica, etc.) con físicas en Canvas. Arrastre táctil a canastas clasificadoras según el pictograma SGA correcto. Lupa interactiva FDS que congela 3 segundos y muestra sección 2 u 8.

### 3.2 Nivel 2: "Tetris Químico: Bodega en Peligro" (`game2_bodega_peligro.html`)
- **Normativa:** Res. 773/2021 (prohibición de reenvase) y Dec. 4741/2005 (matriz de compatibilidad).
- **Mecánica:** Estantería por cuadrantes (Inflamables, Corrosivos, Oxidantes, Varios). Caída tipo Tetris. Explosión cómica ante incompatibilidad química. Evento trampa de botellas de refresco reenvaseadas para eliminación inmediata.

### 3.3 Nivel 3: "Combustible Nitro: Trasiego Extremo" (`game3_combustible_nitro.html`)
- **Normativa:** Ley 55/1993, Dec. 1079/2015.
- **Mecánica:** Secuencia obligatoria de trasiego: puesta a tierra con pinza elástica interactiva, apagado de motor, colocación de extintor y eliminación de fuentes de ignición. Simulación Canvas de fluido combustible al despachar con pistola.

### 3.4 Nivel 4: "Meca-Dress & RESPEL Basketball" (`game4_meca_dress_respel.html`)
- **Normativa:** Dec. 4741/2005, Dec. 1072/2015.
- **Mecánica (2 Fases):** Fase A: Selección táctil de EPP específico según riesgo del taller. Fase B: Tiro parabólico táctil para encestar residuos en canecas RESPEL correspondientes.

### 3.5 Nivel 5: "Slime Invasor: Control de Derrames" (`game5_slime_invasor.html`)
- **Normativa:** Res. 773/2021.
- **Mecánica:** Simulación de derrame viscoso en Canvas que se expande orgánicamente. Aplicación estricta del protocolo de 5 pasos: Evaluar -> Proteger -> Contener (cordones absorbentes trazados) -> Limpiar (paños) -> Disponer (bolsa roja RESPEL).

### 3.6 Módulo Transversal: Pruebas Interactivas y Puntuación Final Consolidada
- **Evaluación Normativa Inmediata:** Al completar la fase de destreza arcade en cada nivel (`won === true`), se despliega una prueba interactiva modal (`#quizModal`) de 3 preguntas de selección múltiple sobre la normativa del módulo (Res. 773/2021, Dec. 4741/2005, Dec. 1079/2015, Ley 55/1993, Kit Antiderrame).
- **Puntuación y Retroalimentación Táctil:** +100 puntos por respuesta correcta con efectos de sonido Web Audio y animación verde/roja instantánea con justificación normativa.
- **Puntuación Final Consolidada (`#resultsModal`):** Desglose explícito en pantalla de:
  - *Destreza en Juego* (puntos arcade obtenidos).
  - *Prueba Interactiva* (puntos normativos obtenidos, ej. 300 / 300 Pts).
  - *Puntuación Final Total* (suma consolidada con cálculo dinámico de estrellas 1 a 3 y guardado dual en LocalStorage).

---

## 4. Requerimientos No Funcionales (NFR)
- **NFR-001 (Zero External Assets):** Gráficos 100% vectoriales en Canvas o SVG en línea. Sin dependencias locales de imágenes.
- **NFR-002 (Web Audio API Synthesizer):** Efectos sonoros sintetizados programáticamente (sin archivos MP3/WAV externos).
- **NFR-003 (Mobile-First Touch):** Botones mínimos de 48x48px, gestos táctiles fluidos, diseño adaptativo a 100vh vertical.
- **NFR-004 (Persistencia Unificada):** Sincronización transparente en `localStorage` bajo la clave `sb_solprosig_arcade_state` (con retrocompatibilidad para `sb_kma_arcade_state`).
- **NFR-005 (Seguridad de Credenciales):** Cumplimiento estricto de `.aiexclude` y gestión exclusiva por variables de entorno.
- **NFR-006 (Perspectiva en Primera Persona - POV):** Renderizado visible de manos y herramientas del operario con EPP específico de obra (guantes de nitrilo, mangas de seguridad, pinzas, pistolas y kits) sincronizados con los gestos táctiles.
- **NFR-007 (Mascota Institucional Siggy):** Modelado 2D vectorial estricto y fiel al diseño 3D oficial de Siggy (ardilla corporativa con polo celeste, emblema 'S' de Solprosig, pantalón gris, zapatillas deportivas y cola frondosa), provista de animaciones CSS fluidas (respiración, parpadeo, saludo, habla y reacciones emocionales).

