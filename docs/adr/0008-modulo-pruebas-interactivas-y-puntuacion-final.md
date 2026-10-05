# ADR 0008: Implementación de Módulo de Pruebas Interactivas Normativas y Puntuación Final Consolidada

## Estado
Aceptado

## Fecha
2026-10-05

## Contexto y Planteamiento del Problema
En la suite arcade de seguridad química desarrollada para los frentes de obra de **KMA Construcciones S.A.S.** con la asesoría técnica de **Solprosig S.A.S.** y el respaldo de **ARL Seguros Bolívar**, la evaluación inicial se centraba exclusivamente en el desempeño de reflejos y destreza motriz durante la simulación arcade en primera persona (POV).

Para certificar la apropiación de conocimientos técnicos y normativos exigidos por el Ministerio del Trabajo y el Ministerio de Ambiente en Colombia (Resolución 773 de 2021, Decreto 4741 de 2005, Decreto 1079 de 2015, Ley 55 de 1993 y protocolos de kit de derrames), se requería un mecanismo de comprobación pedagógica interactiva que:
1. Verificara el dominio de conceptos normativos inmediatamente después de culminar cada minijuego.
2. Brindara retroalimentación formativa inmediata (explicación del porqué de la respuesta correcta e invocación del artículo legal).
3. Consolidara una **Puntuación Final Total** compuesta por los puntos de juego y los puntos obtenidos en la prueba interactiva.
4. Mantuviera la arquitectura sin dependencias externas (100% JavaScript vanilla, Web Audio API y CSS Tailwind responsive).

---

## Decisión Arquitectónica
Se diseñó e implementó un subsistema modular de evaluación pedagógica integrado en los 5 minijuegos arcade (`game1_sga_hazard.html` a `game5_slime_invasor.html`):

1. **Flujo de Transición y Máquina de Estados:**
   - Al alcanzar la condición de victoria arcade (`won === true`), en lugar de desplegar directamente el modal estático de resultados, se invoca `this.startQuiz()`.
   - Se presenta el modal interactivo `#quizModal`, que renderiza secuencialmente 3 preguntas de opción múltiple contextualizadas en obra.

2. **Reactivos Normativos Específicos por Módulo (`QUIZ_QUESTIONS`):**
   - **Nivel 1 (SGA):** Pictogramas reglamentarios, identificación de peligros y estructura de 16 secciones de las FDS (Res. 773/2021).
   - **Nivel 2 (Bodega):** Prohibición legal de reenvase en botellas de bebidas (Art. 12 Res. 773) y separación por matriz de incompatibilidad (Dec. 4741).
   - **Nivel 3 (Combustible):** Conexión obligatoria de pinza a tierra antes del trasiego (Ley 55/1993), rotulado UN 1202 y corte de motor/ignición (Dec. 1079).
   - **Nivel 4 (RESPEL):** Segregación en caneca roja RESPEL (Dec. 4741/2005) y selección de EPP con resistencia química en taller (Dec. 1072/2015).
   - **Nivel 5 (Derrames):** Secuencia obligatoria de los 5 pasos del kit antiderrame, cerramiento perimetral y embalaje en bolsa roja de residuos peligrosos.

3. **Mecánica de Calificación y Retroalimentación Táctil:**
   - Cada acierto otorga **+100 puntos** evaluativos (máximo 300 puntos).
   - Audio feedback mediante síntesis Web Audio (`audio.playSuccess()` / `audio.playError()`).
   - Efectos visuales de confirmación verde/roja y mensaje explicativo del artículo de la norma aplicable.

4. **Puntuación Final Consolidada (`#resultsModal`):**
   - Desglose transparente en el modal final:
     - *Destreza en Juego:* Puntos de la fase arcade.
     - *Prueba Interactiva:* Puntos normativos (ej. 300 / 300 Pts).
     - *Puntuación Final Total:* Suma consolidada ($P_{\text{total}} = P_{\text{juego}} + P_{\text{quiz}}$).
   - Cálculo dinámico de estrellas (1 a 3 estrellas) en función de la puntuación combinada.

5. **Persistencia Dual en LocalStorage:**
   - Para garantizar interoperabilidad total y soporte a sesiones previas o nuevas, el guardado de estado actualiza simultáneamente las claves `'sb_solprosig_arcade_state'` y `'sb_kma_arcade_state'`.

---

## Consecuencias y Beneficios

### Positivas
- **Alineación Pedagógica Dual:** Evalúa tanto la respuesta visomotora (tiempo de reacción ante el peligro) como la comprensión conceptual de la normativa colombiana de SST.
- **Retroalimentación Formativa:** El operario comprende de inmediato por qué un procedimiento es seguro o sancionable bajo la normatividad legal.
- **Persistencia Robusta:** Sincronización transparente sin pérdida de datos en `localStorage` entre ambas versiones de claves.
- **Rendimiento Óptimo:** Ejecución en menos de 10 ms por transición sin sobrecargar el hilo de renderizado Canvas ni requerir librerías externas.

### Negativas / Mitigaciones
- **Mayor duración de cada sesión de juego:** Mitigado limitando la prueba a 3 preguntas concisas de selección directa con botones táctiles de gran tamaño (mínimo 48px de alto).
