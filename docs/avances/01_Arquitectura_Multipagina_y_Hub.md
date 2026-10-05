# Avance 1: Arquitectura Multi-Página Desacoplada y Hub Central
### Construcción de la Base Estructural y el Dashboard del Operario

---

## 💡 ¿Qué reto teníamos?
Al iniciar el proyecto, el requerimiento preliminar contemplaba una Single Page Application (SPA) en un único archivo HTML gigante. Sin embargo, al diseñar 5 videojuegos completos con mecánicas físicas complejas (caída de canecas, Tetris de bodega, fluidos de combustible, tiro parabólico y contención de derrames), empaquetarlo todo en un solo bloque monolítico de miles de líneas habría traído graves problemas:
1. Alto riesgo de fugas de memoria en smartphones de obra al cambiar de juego.
2. Dificultad para que los ingenieros o capacitadores prueben un minijuego de forma aislada.
3. Complejidad innecesaria en el mantenimiento y depuración del código.

## 🛠️ ¿Cómo lo resolvimos?
Optamos por una **arquitectura multi-página desacoplada**. Diseñamos un **Hub Central** en [`index.html`](../../index.html) que sirve como cuartel general del operario y distribuye la navegación hacia los 5 minijuegos individuales, cada uno viviendo en su propio archivo HTML independiente (`game1` a `game5`).

### 1. El Hub Central (`index.html`)
Diseñamos una interfaz limpia y táctil optimizada para teléfonos móviles en vertical:
- **Perfil del Operario:** Permite personalizar el nombre del trabajador y elegir entre 8 avatares temáticos (incluyendo cascos de obra, laboratoristas, mecánicos y a la ardilla Siggy).
- **Sistema de Progresión (XP y Estrellas):** Muestra el nivel alcanzado (Nivel 1 a 5), una barra animada de experiencia, el acumulador de estrellas (0 a 15, con un máximo de 3 por nivel) y el contador de medallas desbloqueadas.
- **Parrilla de Niveles Interactiva:** Tarjetas para cada uno de los 5 juegos que indican su estado (bloqueado o disponible), mejor puntaje histórico y estrellas conseguidas.

### 2. Sincronización Inteligente con `localStorage`
Para que los 5 juegos se comuniquen sin necesidad de un servidor o base de datos en la nube, creamos un contrato de persistencia compartido bajo la clave `'sb_solprosig_arcade_state'` (con retrocompatibilidad para lecturas previas bajo `'sb_kma_arcade_state'`). 
- Cada vez que un trabajador termina una partida en cualquiera de los juegos, el archivo correspondiente lee el estado actual, actualiza las estrellas y el puntaje si se superó el récord previo, y recalcula las insignias ganadas.
- Además, cada juego cuenta con un estado por defecto (`DEFAULT_STATE`), lo que significa que cualquier capacitador puede abrir directamente `game3_combustible_nitro.html` en su teléfono y jugarlo sin haber pasado previamente por el Hub.

## 🌟 Resultado
Logramos una base ultraligera, modular, con carga instantánea y sin dependencias de red, lista para albergar los 5 retos de seguridad química.
