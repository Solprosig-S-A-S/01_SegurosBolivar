# Avance 7: Motor Gráfico en Primera Persona (POV Hands Engine)
### Inmersión Háptica y Biomecánica del EPP Visible en Pantalla

---

## 💡 ¿Qué reto teníamos?
En las primeras versiones de los minijuegos, la interacción era en tercera persona: el usuario arrastraba iconos o miraba a "Lucho" reaccionar desde lejos. Aunque era funcional, el cliente y la pedagogía de SST señalaron una oportunidad clave: **el trabajador debía sentir que él mismo estaba en la obra**, mirando sus propias manos protegidas con los guantes y manipulando directamente las herramientas químicas.

## 🛠️ ¿Cómo lo resolvimos?
Diseñamos e implementamos el **POV Hands Engine** (First-Person View / Perspectiva en Primera Persona) en los 5 minijuegos arcade:

### 1. Renderizado Procedural en Tiempo Real
En lugar de cargar texturas pesadas o modelos 3D que ralentizarían los teléfonos celulares, programamos las manos y brazos mediante dibujo procedural vectorial en HTML5 Canvas y SVG:
- **Guantes de Nitrilo y Neopreno:** Representados en color azul y verde esmeralda con pliegues elásticos en nudillos y muñecas.
- **Mangas de Alta Visibilidad:** Mangas de overol azul marino con franjas amarillas de alta visibilidad y bandas reflectivas plateadas.
- **Traje Tyvek Blanco:** Mangas impermeables con elásticos ajustados en las muñecas para el nivel de derrames.

### 2. Comportamiento Biomecánico según cada Juego
1. **Nivel 1 (SGA):** La mano enguantada se desplaza siguiendo exactamente la posición del dedo del jugador en la pantalla táctil, cerrando los dedos para agarrar con firmeza la manija de la caneca química y soltándola al llegar a la cesta.
2. **Nivel 2 (Bodega):** Dos manos en primer plano sostienen los bidones a la altura del pecho y los empujan físicamente hacia los estantes de almacenamiento.
3. **Nivel 3 (Combustible):** La mano izquierda empuña la pinza metálica de polo a tierra, mientras la mano derecha sostiene la pistola de combustible; al presionar la pantalla, el gatillo se aprieta visiblemente y la pistola produce un retroceso mecánico con vibración sutil.
4. **Nivel 4 (RESPEL Basketball):** Dos manos en postura de tiro de baloncesto sostienen el filtro o la batería usada, tensando el resorte de lanzamiento hacia atrás y abriendo las palmas en el momento del disparo parabólico.
5. **Nivel 5 (Derrames):** Manos con overol Tyvek que despliegan los cordones absorbentes, frotan con paños la superficie contaminada y atan la bolsa roja RESPEL.

## 🌟 Resultado
Un salto cualitativo en la experiencia de usuario: el operario no solo aprende la teoría, sino que visualiza y asimila la sensación física de operar siempre con el EPP puesto.
