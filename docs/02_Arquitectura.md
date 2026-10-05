# 02 - Documento de Arquitectura de Software: Suite Arcade Seguridad Química

## 1. Patrón Arquitectónico: Micro-SPA Desacoplada Multi-Página
El sistema se compone de archivos HTML autónomos que no requieren servidor de aplicaciones ni empaquetadores (bundlers). Cada juego puede ejecutarse individualmente o ser navegado desde el Hub principal.

```
/
├── index.html                  # Hub / Dashboard Central (Perfil, Progreso, Selección)
├── game1_sga_hazard.html       # Nivel 1: SGA Hazard Catch & Smash
├── game2_bodega_peligro.html   # Nivel 2: Tetris Químico: Bodega en Peligro
├── game3_combustible_nitro.html# Nivel 3: Combustible Nitro: Trasiego Extremo
├── game4_meca_dress_respel.html# Nivel 4: Meca-Dress & RESPEL Basketball
├── game5_slime_invasor.html    # Nivel 5: Slime Invasor: Control de Derrames
└── docs/                       # Documentación viva y especificaciones técnicas
```

---

## 2. Contrato de Datos Compartido (`localStorage`)
La persistencia de estado global se gestiona bajo la clave `'sb_solprosig_arcade_state'` (con soporte de retrocompatibilidad para lecturas previas bajo `'sb_kma_arcade_state'`):

```json
{
  "player": {
    "name": "Operario Solprosig",
    "avatar": "helmet_yellow",
    "totalScore": 0,
    "totalStars": 0,
    "xp": 0
  },
  "levels": {
    "1": { "unlocked": true, "stars": 0, "highScore": 0, "completed": false },
    "2": { "unlocked": false, "stars": 0, "highScore": 0, "completed": false },
    "3": { "unlocked": false, "stars": 0, "highScore": 0, "completed": false },
    "4": { "unlocked": false, "stars": 0, "highScore": 0, "completed": false },
    "5": { "unlocked": false, "stars": 0, "highScore": 0, "completed": false }
  },
  "medals": [
    { "id": "sga_master", "unlocked": false, "title": "Guardián del SGA" },
    { "id": "storage_hero", "unlocked": false, "title": "Maestro de Bodega" },
    { "id": "static_zero", "unlocked": false, "title": "Cero Chispa" },
    { "id": "respel_pro", "unlocked": false, "title": "Defensor Ambiental" },
    { "id": "spill_commander", "unlocked": false, "title": "Comandante de Derrames" }
  ]
}
```

---

## 3. Motor de Audio Sintetizado (Web Audio API)
Sin recursos de audio externos. Se implementa un singleton `SoundFX` / `SoundEngine` reutilizable en cada archivo:
- `playTone(freq, type, duration, vol)`
- `playSuccess()` (arpegio mayor ascendente de onda triangular)
- `playZap()` / `playBoom()` (frecuencias bajas moduladas con decay exponencial)
- `playSwish()` / `playFlow()` (pulsos senoidales continuos)
- **Manejo de Autoplay Móvil:** Detección de estado `suspended` del `AudioContext` con invocación de `this.ctx.resume()` tras el primer gesto táctil del usuario.

---

## 4. Sistema de Físicas y Renderizado (Canvas 2D & SVG)
- **Físicas:** Motor de partículas propio para fluidos, colisiones rectangulares (AABB), arco de trayectoria parabólica predictiva con arrastre tipo resorte (slingshot) y expansión celular de derrames.
- **Gráficos:** Sprites vectoriales inline (SVG nativos) de los personajes: "Lucho" (operario cómico) y "Bolívar Safety Bot".
- **Animaciones Slapstick:** Screen-shake mediante clases CSS dinámicas (`@keyframes screenShake`), nubes de humo estilo cómic y bocadillos de diálogo tipo historieta.
- **Compatibilidad Extrema (Polyfill Canvas):** Polyfill integrado para `CanvasRenderingContext2D.prototype.roundRect`, garantizando ejecución en versiones antiguas de Android WebViews y Safari.
- **Aislamiento Táctil Móvil:** Control de eventos `touchstart` y `touchmove` con `if (e.cancelable) e.preventDefault()` para eliminar desplazamientos no deseados o rebotes elásticos del viewport en iOS/Android.

---

## 5. Resiliencia de Persistencia Autónoma
Cada archivo de juego implementa un modelo de datos por defecto (`DEFAULT_STATE`) en `saveProgress()`, permitiendo que cualquier nivel sea probado de forma individual y aislada sin depender de una visita previa a `index.html`. Al completar el nivel, se recalculan automáticamente las estrellas totales, puntaje y medallas en `'sb_solprosig_arcade_state'` (con retrocompatibilidad para `'sb_kma_arcade_state'`).

---

## 6. Motor Gráfico en Primera Persona (POV Hands Engine)
Para maximizar la inmersión del operario y reforzar la sensación de control biomecánico del EPP, los 5 minijuegos adoptan perspectiva en primera persona (First-Person View / POV):
- **Biomecánica de EPP Visible:** Manos y antebrazos del operario modelados con guantes de nitrilo/neopreno de alta resistencia química, puños de seguridad y mangas de alta visibilidad con cinta reflectiva.
- **Interacción Cinemática Procedural:**
  - **Nivel 1 (SGA):** Mano con guante de nitrilo que sigue las coordenadas táctiles, sujeta firmemente las canecas de químicos por su asa y las deposita en la cesta correspondiente.
  - **Nivel 2 (Bodega):** Manos en primer plano sujetando los bidones químicos a la altura del pecho y empujándolos físicamente al interior de los cuadrantes de la estantería.
  - **Nivel 3 (Combustible):** Manos empuñando la pinza de masa metálica para conectarla al chasís, y mano derecha sujetando la pistola dispensadora con gatillo mecánico que se aprieta en tiempo real con efecto de retroceso.
  - **Nivel 4 (RESPEL Basketball):** Postura de lanzamiento de baloncesto en primera persona con dos manos enguantadas que apuntan, tensan y sueltan los residuos peligrosos hacia las canecas.
  - **Nivel 5 (Derrames):** Manos con mangas blancas de traje Tyvek desplegando cordones absorbentes, frotando paños sobre el slime contaminante y sosteniendo la bolsa roja RESPEL para su disposición final.

---

## 7. Arquitectura del Modelo Vectorial 2D de Siggy
Para garantizar consistencia absoluta con la mascota corporativa 3D de Seguros Bolívar y Solprosig, se implementó el modelo vectorial 2D animado de **Siggy** (`siggy_mascot.html` e integrado en `index.html`):
- **Estructura por Capas SVG:**
  1. *Fondo:* Cola frondosa con balanceo pendular (`siggyTailSway`).
  2. *Inferior:* Piernas y pantalones gris pizarra (`#4A5568`), zapatillas deportivas azul marino (`#4B6B94`) con puntera redondeada blanca y cordones celestes (`#38BDF8`).
  3. *Medio:* Torso con camisa polo celeste (`#89C4E8`), solapas de cuello abierto, tapeta central con 3 botones blancos, cinturón de cuero marrón con hebilla metálica y distintivo bordado circular con la "S" de Solprosig.
  4. *Brazos:* Brazo izquierdo en reposo y brazo derecho extendido en saludo activo (`siggyWave`).
  5. *Cabeza y Rostro:* Orejas con contracción reactiva (`siggyEarTwitch`), pelaje facial naranja caramelo (`#D97026`), grandes mejillas y hocico crema (`#FDF3E3`), bigotes sutiles, ojos almendrados con doble brillo especular y parpadeo (`siggyBlink`), nariz chocolate oscuro y boca sonriente con dos dientes paletos frontales cuadrados y animación de fonemas (`siggyTalk`).
- **Controlador de Estados Emocionales:** Clase `SiggyController` con soporte para transiciones reactivas (`wave`, `talk`, `celebrate`, `scared`).

---

## 8. Arquitectura e Integración del Logotipo Isométrico "S" (Solprosig)
- **Modelado Poligonal Exacto:** Se realizó ingeniería inversa matemática del asset oficial rasterizado (786 x 983 px), logrando una precisión del 99.15% en ray-casting contra el mapa de bits original.
- **Paleta Oficial Bicolor:** Gris corporativo `#878786` (RGB 135, 135, 134) y Cyan/Teal institucional `#0080A8` (RGB 0, 128, 168).
- **Proyección Isométrica Hexagonal:** 5 facetas poligonales a 30° con simetría de rotación a 180° que forman el isotipo "S" entrelazado.
- **Despliegue Universal y Responsivo:**
  - **Pecho de Siggy:** Integrado en el polo celeste como parche bordado de contraste sobre base blanca tanto en `siggy_mascot.html` como en el avatar del Hub `index.html`.
  - **Navbar / Top HUD:** Integrado en contenedores acotados (`w-10 h-10` en Hub, `w-9 h-9` en minijuegos) garantizando cero desbordes en pantallas móviles ultra-angostas.
---

## 9. Arquitectura de Activos Gráficos Legales y Normativos (SGA, NFPA y RESPEL)
Para cumplir con la exigencia de identidad absoluta respecto a la normatividad real colombiana e internacional (Res. 773/2021, Dec. 1496/2018, Dec. 1079/2015, Dec. 4741/2005 y NFPA 704), se implementó una capa de renderizado puramente procedural y vectorial:
- **Los 9 Rombos Oficiales del SGA (UNECE GHS Rev. 9):**
  - Generador procedural `getGhsSvg(id, size)` con geometrías estandarizadas a 45°, marco rojo `#DA291C`, fondo blanco `#FFFFFF` y siluetas vectoriales reglamentarias.
  - Pre-cacheo en bitmaps de memoria (`GHS_CANVAS_IMAGES`) para blitting a 60 FPS sin recálculos de renderizado en Canvas 2D.
- **Rótulo Químico de 6 Bloques (Res. 773/2021 Art. 6):**
  - Estampado en canecas de 55 galones con aros de refuerzo metálicos, palabra de advertencia (*PELIGRO* / *ATENCIÓN*), rombo oficial SGA, nombre del producto y código H.
- **Placa Naranja UN 1202 y Diamante NFPA 704 (Dec. 1079/2015):**
  - Placa naranja oficial `#FF7900` con marco negro y divisor central mostrando el código de peligro `30` y el número UN `1202` (ACPM / Gasóleo) estampado en el camión cisterna.
  - Diamante NFPA 704 cuatripartito: Azul-2 (Salud), Rojo-2 (Inflamabilidad), Amarillo-0 (Inestabilidad) y Blanco (Riesgo Especial).
- **Rótulos de Residuos Peligrosos RESPEL (Dec. 4741/2005):**
  - Canecas de taller y bolsa roja de contención de derrames con cabecera de peligro amarilla (*⚠ RESIDUOS PELIGROSOS*), rombo de riesgo químico y datos del generador (*KMA CONSTRUCCIONES S.A.S.* en alianza con *SOLPROSIG S.A.S.*).
  - Envase trampa con cinta y franja de prohibición explícita de reenvase según el Art. 12 de la Resolución 773/2021.

---

## 10. Arquitectura del Módulo de Pruebas Interactivas y Puntuación Consolidada
Para elevar el rigor pedagógico y garantizar que los operarios no solo demuestren reflejos motores sino comprensión cognitiva de la normatividad, se diseñó e integró un subsistema modular de evaluación en los 5 minijuegos:

### 10.1 Flujo de Ejecución y Máquina de Estados
```
[FASE ARCADE POV] -> (Victoria: won === true) -> [startQuiz()] -> [MODAL INTERACTIVO: #quizModal]
                                                                        |
                                                     (Responde 3 preguntas normativas)
                                                                        |
                                                                        v
                                                          [showFinalResults()]
                                                                        |
                                                     [MODAL RESULTADOS: #resultsModal]
                                                     - Destreza en Juego (arcadeScore)
                                                     - Prueba Interactiva (quizScore)
                                                     - PUNTUACIÓN FINAL TOTAL (consolidada)
                                                                        |
                                                                        v
                                                      [Persistencia Dual en LocalStorage]
```

### 10.2 Estructura de Datos de Preguntas (`QUIZ_QUESTIONS`)
Cada archivo HTML implementa una constante inmutable `QUIZ_QUESTIONS` con 3 reactivos técnicos específicos del módulo:
- `question`: Enunciado contextualizado en obra o taller.
- `options`: Arreglo de opciones de respuesta táctiles.
- `answer`: Índice de la respuesta correcta.
- `feedback`: Justificación normativa explícita invocando el artículo de ley, resolución o decreto aplicable.

### 10.3 Retroalimentación Táctil y Ponderación
- Cada acierto otorga **+100 puntos** y dispara el acorde armónico triunfal sintetizado por Web Audio API (`audio.playSuccess()`).
- Un fallo marca visualmente la opción seleccionada en rojo con animación de sacudida y reproduce `audio.playError()`.
- Los botones se desactivan temporalmente tras la selección para prevenir dobles toques accidentales.
- Tras un retardo pedagógico de 1.2 segundos, la interfaz avanza a la siguiente pregunta o deriva a `showFinalResults()`.

### 10.4 Puntuación Consolidada y Persistencia Dual
El cálculo de estrellas (1 a 3) y el guardado en base de datos local integra ambas dimensiones:
$$\text{Puntuación Final Total} = \text{Puntuación Arcade} + \text{Puntuación Prueba Interactiva}$$
El resultado se persiste de forma simultánea e idéntica en `'sb_solprosig_arcade_state'` y `'sb_kma_arcade_state'`, garantizando interoperabilidad y soporte continuo.
