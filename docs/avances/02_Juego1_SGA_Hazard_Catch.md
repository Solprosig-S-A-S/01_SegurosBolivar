# Avance 2: Minijuego 1 - "SGA Hazard Catch & Smash"
### Clasificación de Pictogramas SGA y Fichas de Datos de Seguridad (Res. 773/2021)

---

## 💡 ¿Qué reto teníamos?
En obra se manipulan a diario productos como ACPM, Ácido Muriático, Thinner, Soda Cáustica, Desmoldante, Acetileno y Pinturas Epóxicas. Con frecuencia, los trabajadores confunden los 9 pictogramas de peligro del Sistema Globalmente Armonizado (SGA) o no saben dónde buscar en las Fichas de Datos de Seguridad (FDS de 16 secciones) antes de manipular un producto desconocido.

## 🛠️ ¿Cómo lo resolvimos?
Creamos un juego de destreza y reflejos en [`game1_sga_hazard.html`](../../game1_sga_hazard.html) con una dinámica arcade de caída libre física:

### 1. Mecánica de Caída y Clasificación Táctil
- Desde la parte superior de la pantalla caen bidones y canecas de sustancias químicas reales de construcción, cada una con su etiqueta visible.
- En la parte inferior se ubican 4 cestas de clasificación dinámicas identificadas con los rombos oficiales del SGA (Llama, Corrosión, Calavera, Bomba explotando, Cilindro de gas, Signo de exclamación, Daño a la salud, Medio ambiente y Llama sobre círculo).
- El jugador debe deslizar el dedo (*touch drag*) sobre el recipiente para interceptarlo y depositarlo rápidamente en la cesta con el pictograma que le corresponde.

### 2. La Mecánica de la "Lupa FDS" (Pedagogía en Tiempo Real)
- Si el operario tiene dudas sobre los peligros de una sustancia específica (por ejemplo, entre toxicidad aguda y corrosión para la soda cáustica), puede presionar rápidamente sobre el frasco.
- Esta acción **congela el tiempo del juego durante 3 segundos** y despliega un modal con un extracto auténtico de la Ficha de Datos de Seguridad del producto según la **Resolución 773 de 2021**:
  * **Sección 2:** Identificación de peligros e indicaciones de advertencia.
  * **Sección 8:** Controles de exposición y Elementos de Protección Personal (EPP) obligatorios.
- De esta manera, el jugador no aprende por ensayo y error a ciegas, sino consultando la fuente técnica que debe revisar en su trabajo real.

### 3. Físicas y Humor Slapstick (Cómic)
- Si un envase cae al piso o se clasifica en la cesta equivocada, el frasco se estrella con un sonido cómico de `¡CLANK!`, la pantalla tiembla con un efecto visual de *screen-shake* y el operario Lucho reacciona con una expresión cómica de pánico, reduciendo la barra de seguridad de la obra.

## 🌟 Resultado
Un juego arcade ágil que enseña a asociar instantáneamente el químico con su pictograma y refuerza el hábito de consultar las FDS en obra.
