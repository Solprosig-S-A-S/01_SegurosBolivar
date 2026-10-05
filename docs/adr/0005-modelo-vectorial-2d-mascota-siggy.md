# ADR 0005: Modelado Vectorial 2D Animado de Siggy (Mascota Institucional)

## Estado
Aceptado

## Contexto
La empresa cuenta con una mascota 3D corporativa oficial denominada **Siggy** (una ardilla antropomórfica carismática con pelaje caramelo, mejillas crema regordetas, camisa polo celeste institucional con cuello abierto y botones, distintivo bordado circular con la "S" en el pecho, pantalón gris pizarra, cinturón marrón y zapatillas azul marino con puntera y suela de goma blanca). El cliente solicitó formalizar un modelo 2D **fiel**, consistente y animado que represente con exactitud las proporciones y detalles del diseño 3D para actuar como el tutor y guía de la suite educativa de seguridad química.

## Decisión
1. **Modelado Vectorial SVG Puro (Zero-Raster):**
   - Construir el rig de Siggy completamente en formato SVG nativo utilizando gradientes radiales y lineales (`#E67E22`, `#D97026`, `#B85614` para el pelaje; `#A2D2EE`, `#89C4E8`, `#6FAED5` para la camisa polo; `#FDF3E3` para el hocico y mejillas; `#4A5568` para el pantalón; `#4B6B94` y `#FFFFFF` para las zapatillas deportivas).
   - Mantener las marcas identitarias clave: dos dientes paletos frontales cuadrados, ojos grandes oscuros con doble punto de brillo especular, nariz de botón chocolate oscuro, bigotes sutiles, cola frondosa de dos tonos y el distintivo "S" en el pecho.
2. **Sistema Cinemático de Animaciones CSS:**
   - **Respiración Pasiva (`siggyBreathe`):** Micro-oscilación vertical en el torso.
   - **Meneo de Cola (`siggyTailSway`):** Curvatura sinusoidal fluida en la cola trasera.
   - **Parpadeo Natural (`siggyBlink`):** Párpados animados cada 4 segundos.
   - **Contracción de Orejas (`siggyEarTwitch`):** Movimiento reactivo independiente en ambas orejas.
   - **Gesto de Saludo (`siggyWave`):** Brazo derecho extendido con mano abierta y 4 dedos regordetes en ciclo de vaivén.
   - **Fonemas y Habla (`siggyTalk`):** Apertura y cierre de boca sincronizado con diálogos pedagógicos.
   - **Modos de Expresión Emocional:** Saludo (acogedor), Explicación (normativa), Celebración (victoria con saltos) y Alerta/Susto (peligro químico con ojos dilatados y boca abierta).
3. **Módulo Autónomo y Despliegue:**
   - Crear el entorno interactivo [`siggy_mascot.html`](../../siggy_mascot.html) como banco de pruebas y estudio de animación de la mascota.
   - Integrar a Siggy en el Hub central ([`index.html`](../../index.html)) reemplazando el marcador de posición genérico, y habilitarlo como avatar seleccionable del operario.

## Consecuencias
- **Positivas:**
  - Identidad de marca unificada y 100% fiel al render 3D provisto por el cliente.
  - Cero peticiones de red ni dependencias de archivos PNG/JPG pesados (escalabilidad infinita a cualquier resolución móvil).
  - Rendimiento a 60 FPS sin consumo excesivo de GPU/batería en smartphones de los trabajadores de obra.
- **Negativas:**
  - Requiere mayor densidad de nodos SVG en comparación con caricaturas minimalistas estándar.
