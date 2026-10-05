# ADR 0004: Adopción del Motor Gráfico y Mecánicas en Primera Persona (POV Hands Engine)

## Estado
Aceptado

## Contexto
En los entornos de capacitación de seguridad química en obra (Solprosig y ARL Seguros Bolívar), la perspectiva en tercera persona o la simple interacción abstracta de "hacer tap en botones" reduce la recordación háptica y el sentido de responsabilidad individual del trabajador. El usuario solicitó explícitamente elevar la fidelidad gráfica y mecánica para visualizar directamente las manos y antebrazos del operario manipulando instrumental, envases, pistolas de trasiego, paños y bolsas de residuos en perspectiva de primera persona (First-Person View / POV).

## Decisión
1. **Modelado Procedural de Extremidades y EPP:**
   - Renderizar proceduralmente en el lienzo HTML5 Canvas y SVG las manos y antebrazos del operario en cada dinámica.
   - Representar con precisión el EPP normativo: guantes de nitrilo/neopreno de alta resistencia química (`#006738` / `#008244`), puños de seguridad reforzados (`#FFC72C`), mangas de uniforme institucional de alta visibilidad con franjas reflectivas (`#E2E8F0`), y mangas blancas de traje Tyvek para respuesta a emergencias químicas.
2. **Mecánicas Táctiles Directas en Primera Persona:**
   - **Nivel 1 (SGA):** La mano derecha sujeta proceduralmente cada caneca de químico durante el arrastre táctil y envuelve los dedos alrededor del envase hasta embocarlo en las canastas SGA.
   - **Nivel 2 (Bodega):** Manos en primer plano sujetando los recipientes a la altura del pecho del operario, permitiendo ubicar o destruir botellas trampa ilegales.
   - **Nivel 3 (Trasiego):** Manos sujetando la pinza a tierra elástica y empuñando la pistola dispensadora con gatillo mecánico que se aprieta con retroceso y vibración al bombear combustible.
   - **Nivel 4 (RESPEL Basketball):** Postura de tiro de baloncesto con mano de apoyo y mano de empuje, calculando la parábola balística para clasificar residuos peligrosos.
   - **Nivel 5 (Derrames):** Manos con traje Tyvek blanco que escanean el químico con sonda láser, cierran el cierre hermético, despliegan cordones absorbentes, frotan el paño absorbente cambiando su coloración por saturación y depositan el desecho en la bolsa roja RESPEL.
3. **Optimización de Rendimiento:**
   - Implementado 100% mediante vectores y funciones trigonométricas directas en Canvas 2D (`arc`, `roundRect`, `ellipse`, `quadraticCurveTo`), manteniendo 60 FPS estables sin texturas externas ni bibliotecas 3D pesadas (cero Three.js / WebGL innecesario).

## Consecuencias
- **Positivas:**
  - Inmersión pedagógica extrema y conexión directa entre el gesto táctil del trabajador y el uso del EPP.
  - Cero dependencias binarias externas (0 KB de texturas o modelos 3D externos).
  - Rendimiento fluido y consumo de batería optimizado en smartphones de gama de entrada.
- **Negativas:**
  - Requiere cálculo de vectores cinemáticos en tiempo real durante eventos `touchmove` y `mousemove`.
