# 03 - Manual Técnico y Pedagógico: Suite Arcade Seguridad Química Solprosig - Seguros Bolívar

## 1. Propósito y Alcance del Proyecto
Esta suite de videojuegos educativos arcade ha sido diseñada para capacitar de manera inmersiva, interactiva y divertida a los trabajadores de obra de **Solprosig** bajo los estándares de prevención de riesgos laborales de **ARL Seguros Bolívar**.

La plataforma transforma requerimientos normativos complejos en mecánicas táctiles comprensibles, utilizando personajes caricaturescos (el operario "Lucho" y el "Bolívar Safety Bot") y humor tipo historieta (*slapstick*) para reforzar el aprendizaje sin generar frustración punitiva.

---

## 2. Mapa Integral de Normativa Colombiana Aplicada

| Nivel / Archivo | Título del Módulo | Normatividad Colombiana Citada | Competencia Pedagógica Evaluada |
| :--- | :--- | :--- | :--- |
| **Nivel 1**<br>[`game1_sga_hazard.html`](../game1_sga_hazard.html) | SGA Hazard Catch & Smash | **Resolución 773 de 2021**<br>**Decreto 1496 de 2018** | Identificación de los 9 pictogramas del SGA y lectura rápida de Secciones 2 (Peligros) y 8 (EPP) de la Ficha de Datos de Seguridad (FDS). |
| **Nivel 2**<br>[`game2_bodega_peligro.html`](../game2_bodega_peligro.html) | Tetris Químico: Bodega en Peligro | **Resolución 773 de 2021** (Art. 12)<br>**Decreto 4741 de 2005** | Aplicación de la Matriz de Incompatibilidad Química en estanterías y erradicación del reenvase ilegal en botellas de alimentos/bebidas. |
| **Nivel 3**<br>[`game3_combustible_nitro.html`](../game3_combustible_nitro.html) | Combustible Nitro: Trasiego Extremo | **Ley 55 de 1993**<br>**Decreto 1079 de 2015** | Protocolo seguro de trasiego de hidrocarburos: disipación de estática con pinza a tierra, apagado de motor y extintor satélite en obra. |
| **Nivel 4**<br>[`game4_meca_dress_respel.html`](../game4_meca_dress_respel.html) | Meca-Dress & RESPEL Basketball | **Decreto 4741 de 2005**<br>**Decreto 1072 de 2015** | Dotación del EPP adecuado para manipulación de solventes en taller y segregación correcta de Residuos Peligrosos (RESPEL) en caneca roja. |
| **Nivel 5**<br>[`game5_slime_invasor.html`](../game5_slime_invasor.html) | Slime Invasor: Control de Derrames | **Resolución 773 de 2021** (Capítulo de Emergencias) | Ejecución estricta de la secuencia de 5 pasos del Kit Antiderrame: Evaluar → Proteger → Contener → Limpiar → Disponer en bolsa roja. |

---

## 3. Arquitectura Técnica de Ejecución
- **Agnóstica al Servidor:** No requiere Node.js, Python ni servidores backend. Cada archivo es ejecutable directamente abriéndolo en Google Chrome, Microsoft Edge, Mozilla Firefox o Safari móvil.
- **Gráficos Autónomos (Zero Local Assets):**
  - Gráficos vectoriales SVG en línea para personajes y pictogramas.
  - Lienzo HTML5 Canvas para simulaciones físicas (gravedad, partículas de fluidos, tiro parabólico y expansión celular de derrames).
- **Web Audio API:** Generación procedural de frecuencias sinusoidales, triangulares y ondas de sierra para feedback auditivo inmediato.
- **Persistencia en LocalStorage:**
  - Clave unificada: `'sb_solprosig_arcade_state'` (con soporte de retrocompatibilidad para `'sb_kma_arcade_state'`)
  - Registra: nombre del operario, avatar seleccionado, estrellas acumuladas (0 a 15), puntaje global, medallas obtenidas y estado de desbloqueo progresivo de cada nivel.

---

---

## 4. Guía de Ejecución y Pruebas
1. Para iniciar la suite completa, abrir el archivo [`index.html`](../index.html) en el navegador.
2. Cada nivel superado con al menos 1 estrella desbloquea automáticamente el siguiente nivel en la tarjeta de selección.
3. Para fines de demostración técnica o auditoría pedagógica, el botón inferior del Hub principal *"Reiniciar progreso para demostración"* permite restablecer el estado inicial en cualquier momento.

---

## 5. Experiencia Háptica en Primera Persona (POV Hands Engine)
Cada nivel ubica al operario dentro de su propio EPP mediante renderizado cinemático en primera persona:
- **Nivel 1:** Agarre háptico de canecas con guante de nitrilo y puño dorado de seguridad Bolívar.
- **Nivel 2:** Sostén de recipientes a la altura del pecho para inspección de rotulado y detección de envases trampa.
- **Nivel 3:** Manipulación de pinza a tierra elástica y accionamiento de pistola de trasiego con contragolpe visual.
- **Nivel 4:** Agarre biomecánico de residuos (apoyo y empuje) con cálculo parabólico hacia canecas RESPEL.
- **Nivel 5:** Escaneo de sustancia, colocación de traje Tyvek, tendido de cordones absorbentes, frotado con paño químico y depósito en bolsa roja de residuos peligrosos.
*(Para más detalles técnicos, consultar el [`ADR 0004: Motor Gráfico en Primera Persona`](adr/0004-motor-grafico-primera-persona-pov.md)).*

