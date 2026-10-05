# Plan de Tareas Activo: Suite Arcade Seguridad Química Solprosig - Seguros Bolívar

## 1. Objetivo Inmediato del Sprint
- **Hito:** Implementación modular de la suite de 5 videojuegos arcade educativos individuales y su Hub central de navegación.
- **Prioridad:** Alta.

---

## 2. Fases de Ejecución

### Fase 0: Marco de Gobernanza y Especificación Técnica
- [x] Establecer reglas operativas y de arquitectura (.agent/rules, AGENTS.md).
- [x] Especificar requerimientos normativos colombianos y diseño de los 5 juegos (docs/01_Requerimientos.md).
- [x] Diseñar arquitectura multi-página desacoplada y contrato de LocalStorage (docs/02_Arquitectura.md).

### Fase 1: Dashboard / Hub Central (`index.html`)
- [x] Construir layout Mobile-First con paleta Seguros Bolívar / Solprosig.
- [x] Implementar perfil de usuario (nombre, avatar seleccionable, XP, estrellas 0/15 y medallas).
- [x] Crear grid de navegación a los 5 minijuegos con cálculo de desbloqueo reactivo.
- [x] Desarrollar módulo singleton de persistencia unificada `localStorage`.

### Fase 2: Nivel 1 - "SGA Hazard Catch & Smash" (`game1_sga_hazard.html`)
- [x] Canvas con caída física de frascos químicos reales.
- [x] Mecánica de arrastre táctil a canastas con pictogramas SGA.
- [x] Mecánica de Lupa FDS (congelamiento de tiempo y visor de secciones 2/8 según Res. 773/2021).
- [x] Modal de cierre pedagógico y feedback slapstick con Lucho.

### Fase 3: Nivel 2 - "Tetris Químico: Bodega en Peligro" (`game2_bodega_peligro.html`)
- [x] Estantería de 4 cuadrantes y física de apilamiento.
- [x] Matriz de incompatibilidad reactiva (explosión cómica).
- [x] Evento de envase trampa (botellas de refresco reenvaseadas para tap rápido).

### Fase 4: Nivel 3 - "Combustible Nitro: Trasiego Extremo" (`game3_combustible_nitro.html`)
- [x] Checklist interactivo (pinza de polo a tierra, corte de motor, extintor, cero ignición).
- [x] Simulación de fluido en Canvas con gatillo de pistola dispensadora.
- [x] Efectos de chispazo estático cómico ante incumplimiento.

### Fase 5: Nivel 4 - "Meca-Dress & RESPEL Basketball" (`game4_meca_dress_respel.html`)
- [x] Fase A: Dress-up táctil de EPP específico para mecánicos.
- [x] Fase B: Balística parabólica en Canvas para encestar residuos en canecas RESPEL (Dec. 4741/2005).

### Fase 6: Nivel 5 - "Slime Invasor: Control de Derrames" (`game5_slime_invasor.html`)
- [x] Canvas de expansión orgánica de fluido viscoso.
- [x] Secuencia estricta de 5 pasos del kit antiderrame con cordones y paños absorbentes.
- [x] Disposición final en bolsa roja RESPEL.

### Fase 7: Validación Integral
- [x] Verificación de flujo entre juegos y sincronización de progreso en `localStorage`.
- [x] Pruebas de compatibilidad táctil móvil (viewport 100vh).

### Fase 8: Motor Gráfico y Mecánicas en Primera Persona (POV Hands Engine)
- [x] Nivel 1: Mano en primera persona con agarre háptico de tambores químicos y arrastre a canastas SGA (`game1_sga_hazard.html`).
- [x] Nivel 2: Manos en primer plano sujetando recipientes a nivel de pecho para orden en bodega e intercepción de trampas (`game2_bodega_peligro.html`).
- [x] Nivel 3: Manos sujetando pinza de tierra y pistola de trasiego con gatillo activo y retroceso (`game3_combustible_nitro.html`).
- [x] Nivel 4: Manos de lanzador de baloncesto enguantadas para tiro parabólico RESPEL (`game4_meca_dress_respel.html`).
- [x] Nivel 5: Manos con traje Tyvek químico para escáner, traje, cordones, paño y bolsa roja (`game5_slime_invasor.html`).
- [x] Documentación y registro formal de arquitectura (ADR 0004 y manual técnico).

### Fase 9: Modelado Vectorial 2D Animado de Siggy (Mascota Institucional)
- [x] Creación del modelo 2D fiel en SVG con anatomía y vestimenta idéntica al render 3D (`siggy_mascot.html`).
- [x] Sistema de animaciones CSS (respiración, cola pendular, orejas reactivas, parpadeo, saludo, habla y emociones).
- [x] Integración de Siggy en el Hub central (`index.html`) y adición como avatar seleccionable.
- [x] Documentación viva de arquitectura (ADR 0005, NFR-007 en Requerimientos y Sección 7 en Arquitectura).

### Fase 10: Identidad Visual y Vectorización Geométrica del Logotipo Isométrico "S" (Solprosig)
- [x] Ingeniería inversa matemática pixel-a-pixel del asset oficial 3D (786 x 983 px) con 99.15% de fidelidad de ray-casting.
- [x] Extracción y unificación de las 5 facetas poligonales a 30° con paleta plana corporativa (`#878786` y `#0080A8`).
- [x] Integración del distintivo bordado en el pecho de Siggy en `siggy_mascot.html` y en el Hub `index.html`.
- [x] Despliegue responsivo y adaptado en navbars/headers del Hub y de los 5 minijuegos (`game1` a `game5`) con contención anti-desborde.
- [x] Inclusión del isotipo en modales de resultados pedagógicos de todos los minijuegos.
- [x] Documentación y registro formal de arquitectura (ADR 0006 y Sección 8 en Arquitectura).

### Fase 11: Documentación Integral Docs-as-Code y Bitácora de Avances
- [x] Creación de `README.md` como puerta de entrada al repositorio con accesos rápidos.
- [x] Creación de `docs/00_Descripcion_General.md` con la ficha técnica completa y marco legal.
- [x] Creación de los 10 documentos de avances en `docs/avances/` redactados en lenguaje natural y pedagógico:
  - `01_Arquitectura_Multipagina_y_Hub.md`
  - `02_Juego1_SGA_Hazard_Catch.md`
  - `03_Juego2_Tetris_Quimico_Bodega.md`
  - `04_Juego3_Combustible_Nitro_Trasiego.md`
  - `05_Juego4_Meca_Dress_y_RESPEL_Basketball.md`
  - `06_Juego5_Slime_Invasor_Derrames.md`
  - `07_Motor_Grafico_Primera_Persona_POV.md`
  - `08_Mascota_Institucional_Siggy.md`
  - `09_Logotipo_Isometrico_S_Solprosig.md`
  - `10_Graficos_Legales_Normativos_Identicos.md`

### Fase 12: Activos Gráficos Legales y Normativos Idénticos a la Realidad
- [x] Nivel 1 (`game1_sga_hazard.html`): Modelado de canecas industriales de 55 galones con aros de refuerzo, etiqueta legal de 6 bloques según Res. 773/2021, precacheo de los 9 rombos UNECE GHS y renderizado en visor FDS.
- [x] Nivel 2 (`game2_bodega_peligro.html`): Incorporación de rombos UNECE GHS en los 4 cuadrantes de almacenamiento, tarjetas químicas con rombo y señal de peligro, y envase trampa con cinta de advertencia de prohibición de reenvase.
- [x] Nivel 3 (`game3_combustible_nitro.html`): Modelado vectorial en cisterna con Placa Naranja Oficial UN 1202 / 30 (Dec. 1079/2015), Diamante NFPA 704 y Rombo SGA de Líquidos Inflamables.
- [x] Nivel 4 (`game4_meca_dress_respel.html`): Modelado de canecas industriales con rótulo oficial de Residuos Peligrosos RESPEL (Dec. 4741/2005) y caneca de reciclables con Lazo de Möbius.
- [x] Nivel 5 (`game5_slime_invasor.html`): Escáner HUD con rombo oficial SGA H225 y bolsa roja de contención RESPEL de alta densidad con etiqueta legal completa.
- [x] Auditoría integral automatizada con `verify_suite.py` aprobada con 0 dependencias externas raster.
- [x] Documentación viva: Creación de `docs/avances/10_Graficos_Legales_Normativos_Identicos.md`, ADR 0007 y Sección 9 en `docs/02_Arquitectura.md`.

### Fase 13: Rectificación Integral de Identidad Corporativa: Atribución a Solprosig
- [x] Rectificación de marca en los 7 archivos HTML (`index.html`, `siggy_mascot.html`, `game1` a `game5`): títulos, tooltips, modales de resultados, etiquetas de tambores (`SOLPROSIG OBRA`), bolsas de derrames (`SOLPROSIG S.A.S.`) y maquinaria (`EXCAVADORA SOLPROSIG`).
- [x] Migración transparente de clave de persistencia: `'sb_solprosig_arcade_state'` con fallback y retrocompatibilidad automática para partidas existentes bajo `'sb_kma_arcade_state'`.
- [x] Actualización de la suite documental completa (`docs/00_Descripcion_General.md`, `01_Requerimientos.md`, `02_Arquitectura.md`, `03_Manual_Tecnico_y_Pedagogico.md`, `README.md`, ADRs 0002, 0004, 0006, 0007, y avances 01, 08, 09, 10).
- [x] Actualización de `verify_suite.py` y validación 100% verde sin errores ni dependencias externas.

### Fase 14: Alineación KMA / Solprosig y Pruebas Interactivas con Puntuación Final
- [x] Definir y alinear la relación de negocio: El trabajo y la capacitación son para **KMA Construcciones** (Obra KMA, maquinaria y operarios KMA), mientras que el logotipo oficial ("S" isométrica en SVG) es de **Solprosig** (asesoría técnica en SST y ARL Seguros Bolívar).
- [x] Implementar en los 5 videojuegos (`game1` a `game5`) la **Prueba Interactiva** de validación de conocimientos normativos con opciones táctiles y retroalimentación inmediata.
- [x] Diseñar y desplegar la pantalla de **Puntuación Final Consolidada** (Destreza en Juego + Prueba Interactiva = Puntuación Final Total) con cálculo dinámico de estrellas y retroalimentación pedagógica.
- [x] Actualizar el Hub (`index.html`), mascota (`siggy_mascot.html`) y documentación viva de arquitectura y requerimientos (ADR 0008, Avance 11, docs 00, 01, 02 y README).
- [x] Validar con `verify_suite.py` que no existan dependencias externas y se cumplan todos los contratos (100% PASS).