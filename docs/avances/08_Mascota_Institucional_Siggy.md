# Avance 8: Modelado Vectorial y Animaciones 2D de Siggy
### La Mascota Corporativa como Tutor Pedagógico y Compañero de Obra

---

## 💡 ¿Qué reto teníamos?
Seguros Bolívar y Solprosig cuentan con una mascota institucional 3D oficial: **Siggy**, una ardilla carismática, enérgica y empática. Al inicio, la plataforma usaba un robot genérico provisional ("Bolívar Safety Bot"). El requerimiento fue taxativo: debíamos sustituir ese marcador temporal y crear un **modelo 2D extremadamente fiel al diseño 3D corporativo**, que tuviera vida propia, animaciones fluidas y actuara como el tutor que guía al trabajador a través de los retos.

## 🛠️ ¿Cómo lo resolvimos?
Diseñamos el rig completo de Siggy en formato vectorial SVG nativo puro ([`siggy_mascot.html`](../../siggy_mascot.html)), replicando cada detalle anatómico de su diseño original:

### 1. Fidelidad Anatómica y Vestimenta 3D
- **Pelaje Cálido y Rostro:** Gradientes radiales caramelo y naranja cálido (`#E67E22`, `#D97026`), grandes mejillas y hocico crema (`#FDF3E3`), nariz de botón chocolate oscuro, orejas puntiagudas con interior sonrosado y los dos característicos dientes paletos frontales cuadrados que le dan su personalidad tierna y graciosa.
- **Camisa Polo Celeste Institucional:** Cuello tipo polo abierto, tapeta frontal con 3 botones blancos circulares alineados y el distintivo corporativo bordado en el pecho.
- **Pantalón y Zapatillas:** Cinturón de cuero marrón con hebilla plateada, pantalón de mezclilla gris pizarra (`#4A5568`) y zapatillas deportivas azul marino (`#4B6B94`) con puntera redondeada blanca y cordones celestes.
- **Cola de Ardilla Voluminosa:** Cola curva gigante con gradientes de doble tono que enmarca el diseño.

### 2. Sistema de 6 Animaciones Cinemáticas CSS
Para que Siggy no fuera una ilustración estática, programamos 6 ciclos de movimiento independientes sincronizados:
1. **Respiración Pasiva (`siggyBreathe`):** Micro-movimiento vertical del pecho y hombros que le da vida constante.
2. **Meneo de Cola (`siggyTailSway`):** Curvatura sinusoidal suave de la cola de izquierda a derecha.
3. **Parpadeo Ocular Espontáneo (`siggyBlink`):** Párpados que parpadean cada 4 segundos de forma natural.
4. **Contracción de Orejas (`siggyEarTwitch`):** Movimiento independiente de alerta en las orejas cada 5 segundos.
5. **Saludo con la Pata Derecha (`siggyWave`):** Brazo extendido hacia el espectador con palma abierta y 4 dedos regordetes en vaivén acogedor.
6. **Fonemas de Habla (`siggyTalk`):** Movimiento de apertura y cierre de la boca coordinado con los diálogos y consejos pedagógicos.

### 3. Estudio 2D y Despliegue en el Hub
- Creamos el archivo [`siggy_mascot.html`](../../siggy_mascot.html) como estudio interactivo donde los usuarios pueden interactuar con Siggy, hacerlo hablar, saludar, asustarse ante un peligro químico o celebrar con saltos al completar la misión.
- Integramos el rig en el Hub central ([`index.html`](../../index.html)) como el tutor principal y lo habilitamos como avatar seleccionable (`🐿️`).

## 🌟 Resultado
Una mascota viva, carismática y 100% fiel a la marca que humaniza la experiencia de seguridad química y conecta emocionalmente con los trabajadores.
