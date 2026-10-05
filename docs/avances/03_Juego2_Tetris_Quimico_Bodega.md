# Avance 3: Minijuego 2 - "Tetris Químico: Bodega en Peligro"
### Matriz de Compatibilidad Química y Erradicación del Reenvase (Res. 773/2021 & Dec. 4741/2005)

---

## 💡 ¿Qué reto teníamos?
Los almacenistas de obra enfrentan dos riesgos graves en su rutina:
1. Almacenar juntos productos químicos incompatibles que al entrar en contacto pueden reaccionar violentamente, generar gases tóxicos o provocar explosiones (como colocar solventes inflamables junto a comburentes/oxidantes o ácidos fuertes junto a bases).
2. La práctica común y peligrosa de reenvasar sobrantes químicos (cloro, desmoldante, ACPM) en botellas plásticas de gaseosa o jugo, lo que provoca intoxicaciones letales cuando otros trabajadores las confunden con bebidas.

## 🛠️ ¿Cómo lo resolvimos?
Desarrollamos [`game2_bodega_peligro.html`](../../game2_bodega_peligro.html), combinando una estantería inteligente inspirada en el clásico Tetris con un sistema de eventos de reflejos rápidos:

### 1. Estantería por Cuadrantes de Compatibilidad
- La pantalla presenta un estante de almacenamiento dividido en 4 zonas segregadas:
  * **Zona 1 (Rojo):** Líquidos y gases inflamables (gasolina, thinner, acetileno).
  * **Zona 2 (Azul):** Sustancias corrosivas (ácidos y soda cáustica).
  * **Zona 3 (Amarillo):** Reactivos y oxidantes (oxígeno, peróxidos).
  * **Zona 4 (Verde):** Materiales no reactivos / varios (pinturas base agua, aditivos).
- Los productos llegan por una cinta transportadora superior y el usuario debe arrastrarlos a la zona correspondiente.
- **Regla Estricta de Compatibilidad:** Si el jugador intenta colocar un inflamable en la misma celda o adyacente a un oxidante, el juego dispara una explosión cómica animada con humo naranja y chispas, mientras Lucho aparece con la cara tiznada gritando *"¡INCOMPATIBLES!"*, bajando la estabilidad de la bodega.

### 2. Evento Dinámico "Envase Trampa" (Anti-Reenvase)
- De forma sorpresiva, entre las canecas de la cinta transportadora aparecen botellas de refresco o jugo rellenas de líquidos de colores sospechosos (amarillo o rojo).
- Estas botellas representan la práctica ilegal de reenvase prohibida tajantemente por la **Resolución 773 de 2021**.
- El jugador debe detectarlas de inmediato y presionar un botón de emergencia para incinerarlas/desecharlas antes de que toquen los estantes. Si no lo hace a tiempo, la penalización es severa.

## 🌟 Resultado
Una mecánica divertida y adictiva que graba en la memoria del almacenista la matriz de segregación y la prohibición absoluta de usar botellas de comida para almacenar químicos.
