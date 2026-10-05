# Descripción General del Proyecto: Suite Arcade de Seguridad Química
### Solprosig & ARL Seguros Bolívar

---

## 1. Visión y Propósito del Proyecto
La **Suite Arcade de Seguridad Química KMA Construcciones • Solprosig - Seguros Bolívar** es una plataforma educativa interactiva mobile-first diseñada específicamente para los frentes de obra e infraestructura vial de **KMA Construcciones S.A.S.**, ejecutada bajo la asesoría y consultoría técnica de **Solprosig S.A.S.** (cuyo logotipo e isotipo oficial "S" identifica la iniciativa) y el respaldo de la aseguradora de riesgos laborales **ARL Seguros Bolívar**.

El objetivo primordial del proyecto es transformar la capacitación técnica obligatoria en gestión de sustancias químicas peligrosas en una experiencia de aprendizaje interactiva, inmersiva y de alto impacto conductual. Para lograrlo, la plataforma implementa **5 videojuegos arcade táctiles en primera persona (POV)**, articulados a través de un **Hub Central** de gestión de progreso, acompañados pedagógicamente por la mascota institucional animada **Siggy**, y culminados en cada nivel con un **Módulo de Prueba Interactiva Normativa** y una **Puntuación Final Consolidada** que evalúa tanto la destreza motriz como el dominio reglamentario del operario.

El proyecto erradica la pasividad de las capacitaciones tradicionales con diapositivas, sustituyéndola por memoria muscular, toma de decisiones en tiempo real sobre riesgos químicos reales presentes en obras civiles y validación inmediata del conocimiento mediante pruebas de 3 preguntas normativas por nivel.

---

## 2. Marco Normativo Colombiano Obligatorio
Cada uno de los componentes de la suite responde a un mandato legal y técnico de la República de Colombia:

| Norma | Ámbito de Aplicación en la Suite |
| :--- | :--- |
| **Resolución 773 de 2021 (MinTrabajo)** | Adopción del Sistema Globalmente Armonizado (SGA) en lugares de trabajo: los 9 pictogramas oficiales, estructura de 16 secciones de las FDS, prohibición tajante del reenvase en recipientes de alimentos/bebidas y estándares de kits antiderrame. |
| **Decreto 1496 de 2018** | Adopción transversal del SGA para la clasificación y comunicación de peligros químicos en el territorio nacional. |
| **Decreto 4741 de 2005 (MADS)** | Prevención y manejo integral de Residuos Peligrosos (RESPEL) generados en mantenimiento y taller (aceites usados, filtros, baterías, trapos impregnados con hidrocarburos). |
| **Ley 55 de 1993 & Decreto 1079 de 2015** | Seguridad en el uso y trasiego de sustancias químicas e hidrocarburos (ACPM/gasolina), puesta a tierra para descarga de electricidad estática y prevención de incendios. |
| **Decreto 1072 de 2015 (SG-SST)** | Obligaciones del Sistema de Gestión de Seguridad y Salud en el Trabajo: dotación, inspección y uso innegociable de Elementos de Protección Personal (EPP) específicos. |

---

## 3. Arquitectura y Stack Tecnológico
La aplicación se construyó bajo una filosofía de **simplicidad radical, máximo rendimiento y cero dependencias pesadas**:

- **Arquitectura Multi-Página Desacoplada (MPA):** Cada juego y el Hub residen en archivos HTML independientes (`index.html`, `game1_sga_hazard.html` a `game5_slime_invasor.html`, `siggy_mascot.html`). Esto permite probar, actualizar o desplegar cada nivel por separado sin riesgo de romper el resto de la suite.
- **Tecnologías Web Nativas (Zero-Build):**
  - **HTML5 Canvas 2D API:** Motor de partículas fluidas, balística parabólica, física de cuerdas elásticas y propagación orgánica de derrames.
  - **Web Audio API:** Síntesis procedimental de efectos sonoros (tonos de acierto, chispas eléctricas, retrocesos, clanks metálicos) directamente en el procesador de audio del dispositivo, consumiendo **0 bytes** de audio descargado.
  - **Vanilla JavaScript (ES6+):** Lógica orientada a objetos mediante máquinas de estados desacopladas.
  - **Tailwind CSS v3 (vía CDN):** Estilizado visual responsive optimizado para smartphones en posición vertical.
- **Persistencia Autónoma (`localStorage`):** Gestión centralizada mediante la clave `'sb_solprosig_arcade_state'` (con soporte de retrocompatibilidad con `'sb_kma_arcade_state'`), con sincronización en tiempo real de estrellas (0/15), medallas, nivel y experiencia (XP).
- **POV Hands Engine:** Manos biomecánicas en primera persona renderizadas proceduralmente en Canvas/SVG con guantes de nitrilo, mangas de alta visibilidad y trajes Tyvek.
- **Vectorización SVG Pura (Logotipo S y Siggy):** Renderizado de ultra-alta fidelidad matemática (99.15% de precisión) sin mapas de bits pesados ni desbordes en pantalla móvil.

---

## 4. Estructura de la Documentación del Proyecto
Para consultar en detalle cada aspecto del sistema y sus fases evolutivas explicadas de forma natural, consulta los siguientes documentos:

### Especificación y Arquitectura
- [`docs/01_Requerimientos.md`](01_Requerimientos.md): Requerimientos funcionales, no funcionales y pedagógicos.
- [`docs/02_Arquitectura.md`](02_Arquitectura.md): Diseño técnico, persistencia, POV Hands Engine e identidad visual.
- [`docs/03_Manual_Tecnico_y_Pedagogico.md`](03_Manual_Tecnico_y_Pedagogico.md): Guía de despliegue, instrucciones de juego y sustento legal.

### Registro de Decisiones de Arquitectura (ADRs)
- [`docs/adr/0001-adopcion-clean-architecture-y-gobernanza.md`](adr/0001-adopcion-clean-architecture-y-gobernanza.md): Marco de gobernanza y Clean Architecture.
- [`docs/adr/0002-suite-arcade-independiente-multipage.md`](adr/0002-suite-arcade-independiente-multipage.md): Adopción de arquitectura desacoplada Multi-Page.
- [`docs/adr/0003-motor-audio-sintetizado-webaudio.md`](adr/0003-motor-audio-sintetizado-webaudio.md): Síntesis de sonido nativa Web Audio API.
- [`docs/adr/0004-motor-grafico-primera-persona-pov.md`](adr/0004-motor-grafico-primera-persona-pov.md): Motor biomecánico en primera persona (POV).
- [`docs/adr/0005-modelo-vectorial-2d-mascota-siggy.md`](adr/0005-modelo-vectorial-2d-mascota-siggy.md): Rig vectorial 2D animado de Siggy.
- [`docs/adr/0006-identidad-visual-logotipo-isometrico-s.md`](adr/0006-identidad-visual-logotipo-isometrico-s.md): Modelado y vectorización del logotipo isométrico Solprosig S.
- [`docs/adr/0007-graficos-legales-oficiales-sga-nfpa-respel.md`](adr/0007-graficos-legales-oficiales-sga-nfpa-respel.md): Activos vectoriales legales idénticos a la normatividad.
- [`docs/adr/0008-modulo-pruebas-interactivas-y-puntuacion-final.md`](adr/0008-modulo-pruebas-interactivas-y-puntuacion-final.md): Módulo de pruebas interactivas normativas y puntuación final consolidada.

### Bitácora Detallada de Avances Técnicos
- [`docs/avances/01_Arquitectura_Multipagina_y_Hub.md`](avances/01_Arquitectura_Multipagina_y_Hub.md): Creación del Hub central y persistencia.
- [`docs/avances/02_Juego1_SGA_Hazard_Catch.md`](avances/02_Juego1_SGA_Hazard_Catch.md): Minijuego 1 - SGA y FDS.
- [`docs/avances/03_Juego2_Tetris_Quimico_Bodega.md`](avances/03_Juego2_Tetris_Quimico_Bodega.md): Minijuego 2 - Matriz de compatibilidad y anti-reenvase.
- [`docs/avances/04_Juego3_Combustible_Nitro_Trasiego.md`](avances/04_Juego3_Combustible_Nitro_Trasiego.md): Minijuego 3 - Trasiego de combustible y puesta a tierra.
- [`docs/avances/05_Juego4_Meca_Dress_y_RESPEL_Basketball.md`](avances/05_Juego4_Meca_Dress_y_RESPEL_Basketball.md): Minijuego 4 - EPP y RESPEL Basketball.
- [`docs/avances/06_Juego5_Slime_Invasor_Derrames.md`](avances/06_Juego5_Slime_Invasor_Derrames.md): Minijuego 5 - Protocolo de 5 pasos para derrames químicos.
- [`docs/avances/07_Motor_Grafico_Primera_Persona_POV.md`](avances/07_Motor_Grafico_Primera_Persona_POV.md): Evolución gráfica a perspectiva POV háptica.
- [`docs/avances/08_Mascota_Institucional_Siggy.md`](avances/08_Mascota_Institucional_Siggy.md): Modelado y animación 2D de Siggy.
- [`docs/avances/09_Logotipo_Isometrico_S_Solprosig.md`](avances/09_Logotipo_Isometrico_S_Solprosig.md): Vectorización matemática del logotipo corporativo Solprosig S.
- [`docs/avances/10_Graficos_Legales_Normativos_Identicos.md`](avances/10_Graficos_Legales_Normativos_Identicos.md): Gráficos idénticos a la normatividad legal.
- [`docs/avances/11_Pruebas_Interactivas_y_Puntuacion_Final.md`](avances/11_Pruebas_Interactivas_y_Puntuacion_Final.md): Módulo de pruebas interactivas normativas y puntuación final consolidada.
