# Documentación Técnica Exclusiva - Juego 2
## Bodega Segura: Puzzle Isométrico de Compatibilidad Química

---

## 1. Ficha Técnica y Resumen Ejecutivo

| Parámetro | Especificación Técnica |
| :--- | :--- |
| **Nombre del Módulo** | Bodega Segura: Puzzle Isométrico de Compatibilidad Química |
| **Archivo Fuente** | `juego2_bodega.html` |
| **Público Objetivo** | Almacenistas, jefes de patio, supervisores SST y brigadistas de planta |
| **Perspectiva / Vista** | 2.5D Isométrica pura (`rotateX(60deg) rotateZ(-45deg)`) con sombreado de oclusión |
| **Dimensiones de Matriz** | Tablero 3x3 de celdas isométricas con 12 conexiones ortogonales dinámicas |
| **Stack Tecnológico** | HTML5, CSS3 Nativo (`:root`), JavaScript ES6, Web Audio API, Canvas 2D Engine |
| **Efectos y Partículas** | Canvas 2D Particles (`FxEngine`: chispas de ignición y confeti triunfal) |
| **Dependencias CDN** | Google Fonts ('Outfit', 'JetBrains Mono'), FontAwesome v6 |
| **Empaquetador / Build** | Cero dependencias / Vanilla JS (Ejecución standalone directa en navegador) |

El **Juego 2** simula la gestión de almacenamiento y estibado seguro en una bodega de químicos de obra. Utilizando una proyección isométrica 2.5D matemática en CSS puro, el jugador debe ubicar reactivos industriales en una cuadrícula de 3x3, garantizando que los productos adyacentes sean mutuamente compatibles y evitando reacciones violentas, ignición por contacto o contaminación ambiental.

---

## 2. Marco Normativo y Reglas de Compatibilidad

### 2.1. Normatividad Colombiana Integrada
1. **Resolución 773 de 2021**:
   - *Artículo 7*: Segregación obligatoria de sustancias químicas incompatibles y prohibición de almacenamiento conjunto sin barrera física o distancia mínima reglamentaria.
   - *Artículo 12*: Requisitos de almacenamiento de productos químicos inflamables, corrosivos y tóxicos.
   - *Artículo 20*: **Infracción muy grave**. Prohibición expresa de re-envasar sustancias químicas en recipientes para alimentos o bebidas de consumo humano.
2. **Decreto 1496 de 2018**:
   - Clasificación de incompatibilidades conforme a los peligros físicos y a la salud del SGA.
3. **Decreto 4741 de 2005 (Manejo Integral de RESPEL)**:
   - Normas para la prevención de derrames y gestión de residuos y recipientes contaminados.
4. **Norma Técnica Colombiana NTC 4435**:
   - Guía para el almacenamiento seguro de productos químicos y matriz de reactividad.
5. **NFPA 55 y NFPA 704**:
   - Almacenamiento seguro de cilindros de gas comprimido y distanciamiento ignífugo de 6 metros o muros cortafuego de 2 horas.

### 2.2. Matriz Completa y Real de Compatibilidad Química (CISTEMA / CCS / NTC 4435)

La herramienta de compatibilidad implementada en el modal `#modal-matrix` y en la validación algorítmica del juego replica fielmente la **Matriz Guía Oficial de Almacenamiento Conjunto de Sustancias Peligrosas** (CISTEMA ARL Sura / Consejo Colombiano de Seguridad - CCS / MinAmbiente):

#### 2.2.1. Las 4 Convenciones Oficiales de Segregación
1. 🟢 **Compatible (Verde)**: Las sustancias pueden almacenarse juntas en la misma estantería o módulo sin riesgo de reacción peligrosa.
2. 🟡 **Precaución / Condicional (Amarillo)**: Requiere evaluar la Ficha de Datos de Seguridad (FDS - Secciones 10 y 14) y aplicar medidas de separación física (distancia de 2 a 3 metros, contención secundaria independiente o buffer aislante neutro).
3. 🔴 **Incompatible (Rojo)**: Almacenamiento conjunto estrictamente prohibido. Exige áreas separadas, distancia mínima de 6 metros o muros cortafuego certificados de al menos 2 horas (NFPA 30 / NFPA 55).
4. ⚫ **[🔒 E] Candado = Almacenamiento Especial Exclusivo (Bajo Llave)**: Sustancias con requerimientos extremos que tienen prohibición legal estricta de almacenarse en bodegas generales de obra (NTC 4435 / Dec. 2535 / Res. 773/2021). Exigen custodia permanente bajo llave en recintos independientes especializados: Explosivos Clase 1 en polvorín militar certificado por INDUMIL; Peróxidos Orgánicos Clase 5.2 en cámara refrigerada antideflagrante con monitoreo estricto de TDAA.

#### 2.2.2. Tabla Maestra de Doble Entrada (12 Clases Técnicas)

| Clase ONU / SGA | 1 | 2.1 | 2.2 | 2.3 | 3 | 4 | 5.1 | 5.2 | 6.1 | 8A | 8B | 9 | Insumo en el Juego |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **1. Explosivos** | ⚫ | ⚫ | ⚫ | ⚫ | ⚫ | ⚫ | ⚫ | ⚫ | ⚫ | ⚫ | ⚫ | ⚫ | *Exclusivo Polvorín* |
| **2.1 Gases Inflamables** | ⚫ | 🟢 | 🟡 | 🔴 | 🔴 | 🔴 | 🔴 | ⚫ | 🟡 | 🔴 | 🔴 | 🟡 | `item_acetylene` (Acetileno) |
| **2.2 Gases Inertes** | ⚫ | 🟡 | 🟢 | 🟡 | 🟡 | 🟡 | 🟢 | ⚫ | 🟡 | 🟡 | 🟡 | 🟢 | *Argón, CO2, N2* |
| **2.3 Gases Tóxicos** | ⚫ | 🔴 | 🟡 | 🟢 | 🔴 | 🔴 | 🔴 | ⚫ | 🟡 | 🔴 | 🔴 | 🟡 | *Cloro, Amoníaco* |
| **3. Líq. Inflamables** | ⚫ | 🔴 | 🟡 | 🔴 | 🟢 | 🔴 | 🔴 | ⚫ | 🟡 | 🔴 | 🔴 | 🟡 | `item_acpm` (ACPM / Diésel) |
| **4. Sólidos Inflamables**| ⚫ | 🔴 | 🟡 | 🔴 | 🔴 | 🟢 | 🔴 | ⚫ | 🟡 | 🔴 | 🔴 | 🟡 | *Reactivos sólidos* |
| **5.1 Comburentes/Oxid.** | ⚫ | 🔴 | 🟢 | 🔴 | 🔴 | 🔴 | 🟢 | ⚫ | 🟡 | 🔴 | 🔴 | 🔴 | *Oxidantes / Peróxidos conc.*|
| **5.2 Peróxidos Orgánicos**| ⚫ | ⚫ | ⚫ | ⚫ | ⚫ | ⚫ | ⚫ | 🟡 | ⚫ | ⚫ | ⚫ | ⚫ | *Cámara refrigerada TDAA* |
| **6.1 Sustancias Tóxicas**| ⚫ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | ⚫ | 🟢 | 🔴 | 🟡 | 🟢 | *Venenos / Plaguicidas* |
| **8A. Corrosivos ÁCIDOS**| ⚫ | 🔴 | 🟡 | 🔴 | 🔴 | 🔴 | 🔴 | ⚫ | 🔴 | 🟢 | 🔴 | 🔴 | `item_muriatic` (Ác. Muriático)|
| **8B. Corrosivos BASES** | ⚫ | 🔴 | 🟡 | 🔴 | 🔴 | 🔴 | 🔴 | ⚫ | 🟡 | 🔴 | 🟢 | 🟡 | `item_soda_caustic` (Soda Cáustica)|
| **9. Misceláneos / Salud**| ⚫ | 🟡 | 🟢 | 🟡 | 🟡 | 🟡 | 🔴 | ⚫ | 🟢 | 🔴 | 🟡 | 🟢 | `item_paint` (Pintura Epóxica)|

*Nota Crítica de Obra:* La segregación entre **8A (Ácidos)** y **8B (Bases)** es de **ROJO OBLIGATORIO**. Su contacto produce neutralización exotérmica súbita a más de 90°C con proyecciones cáusticas graves y rotura de contenedores.

#### 2.2.3. Matriz Oficial por Tipos y Etiquetas SGA / ONU (12 Clases Técnicas)
El modal `#modal-matrix` replica fielmente la matriz oficial original organizada por **Tipos de Peligro y Etiquetas Oficiales SGA (12 Clases ONU)** conforme a la NTC 4435, CISTEMA y Res. 773/2021:
1. **1. Explosivos** (Etiqueta Bomba Explotando) -> Dinamita, detonadores (Exclusivo Polvorín Indumil).
2. **2.1 Gases Inflamables** (Etiqueta Llama) -> Acetileno en cilindros, Propano, GLP.
3. **2.2 Gases Inertes** (Etiqueta Cilindro a Presión) -> Argón (TIG/MIG), Nitrógeno, CO2.
4. **2.3 Gases Tóxicos** (Etiqueta Calavera) -> Cloro gas, Amoníaco anhidro.
5. **3. Líquidos Inflamables** (Etiqueta Llama) -> ACPM/Diésel, Gasolina motor, Thinner, Solventes.
6. **4. Sólidos Inflamables** (Etiqueta Llama Franjeada) -> Carburo de calcio, Azufre.
7. **5.1 Comburentes** (Etiqueta Llama sobre Círculo) -> Cilindro de Oxígeno industrial (Oxicorte).
8. **5.2 Peróxidos Orgánicos** (Etiqueta Llama sobre Círculo / Bicolor) -> Catalizador MEKP.
9. **6.1 Sustancias Tóxicas** (Etiqueta Calavera) -> Biocidas, Plaguicidas, Compuestos de plomo.
10. **8A. Corrosivos Ácidos** (Etiqueta Corrosión) -> Ácido Muriático (HCl 30%), Baterías de maquinaria.
11. **8B. Corrosivos Álcalis** (Etiqueta Corrosión) -> Soda Cáustica (NaOH), Desengrasantes alcalinos.
12. **9. Misceláneos / Salud** (Etiqueta Misceláneo/Salud) -> Pintura Epóxica, Aceites usados (RESPEL).

- Cruce Rápido por doble selector desplegable (`#select-compound-a` vs `#select-compound-b`) entre los 12 tipos/etiquetas.
- **Leyenda Oficial de 4 Convenciones y Jerarquía en Modal (`.matrix-legend-grid`):**
  - Ubicada directamente bajo el selector de pestañas para brindar orientación inmediata antes de operar el Inspector o la Matriz 12x12.
  - Formato limpio y desprovisto de redundancias (sin dobles emojis):
    - `[C] Compatible`: Almacenamiento conjunto permitido en el mismo módulo o estantería.
    - `[P] Precaución`: Separación física (2-3m, estiba independiente o buffer neutro). FDS.
    - `[I] Incompatible`: Prohibido almacenar juntos. Muro cortafuego 2h o distancia > 6m.
    - `[🔒 E] Exclusivo Bajo Llave`: Custodia bajo llave fuera de bodega (Polvorín INDUMIL o Cámara Fría TDAA).
- **Ventana Modal Emergente del Inspector de Compatibilidad (`#modal-matrix-inspector`):**
  - Desacoplado del flujo vertical estático para dejar la tabla 12x12 completamente despejada y visible bajo la leyenda.
  - Se abre automáticamente como ventana emergente al hacer clic o tocar cualquier casilla [cuadradito] de la matriz o al pulsar el botón `Consultar por Selectores`.
  - Muestra la ficha técnica completa: selectores desplegables A vs B, rombos vectoriales SGA, nota normativa del candado `[🔒 E]`, veredicto homologado (`[C]`, `[P]`, `[I]`, `[🔒 E]`) y justificación técnica detallada con consecuencias reales.
  - Cuenta con botón de cierre `[×]`, botón `Entendido, Volver a la Matriz`, cierre por clic en backdrop y soporte de tecla Escape.
- Rombos vectoriales SGA de alta fidelidad que acompañan cada veredicto.
- Mapeo instantáneo que muestra qué sustancias de obra corresponden a la etiqueta seleccionada.
- Retícula luminosa bidireccional en la cuadrícula de 144 celdas oficiales.
- 3 pestañas: Matriz Oficial por Tipos/Etiquetas, Guía de Etiquetas SGA con fichas por clase, y Buffers Neutros & RESPEL.

---

## 3. Catálogo de Sustancias, Props y Consecuencias Críticas

### 3.1. Productos Químicos e Insumos Modelados

| ID | Nombre de Producto / Objeto | Categoría SGA | Estado Físico | Comportamiento en Bodega |
| :--- | :--- | :--- | :--- | :--- |
| **`item_acpm`** | ACPM / Diésel (Tambor 55 Gal) | Inflamable | Líquido | Requiere estiba antiderrame. Incompatible con ácidos y álcalis. |
| **`item_muriatic`** | Ácido Muriático (HCl 28%) | Corrosivo | Líquido | Emite vapores agresivos. Reacciona violentamente con bases (Soda). |
| **`item_acetylene`**| Cilindro de Acetileno (Gas) | Gas a Presión | Gas | Extremadamente inflamable a presión. Requiere barrera ante líquidos. |
| **`item_paint`** | Pintura Epóxica + Catalizador | Salud / Irritante | Líquido | Sensibilizante. Incompatible con catalizadores ácidos descontrolados. |
| **`item_soda_caustic`**| Soda Cáustica Líquida (Base) | Base / Álcali | Líquido | Álcali corrosivo fuerte. Prohibido adyacente a ácidos (neutralización violenta). |
| **`item_pallet`** | Estiba Antiderrame 110% | Contención | Prop Físico | Rejilla de retención. Valida contención secundaria de líquidos. |
| **`item_extinguisher`**| Extintor PQS / Barrera | Buffer Físico | Prop Físico | Actúa como pared cortafuego/buffer que aísla químicos no compatibles. |
| **`item_soda`** | Botella de Gaseosa con Químico | **¡ILEGAL!** | Líquido | **Infracción Art. 20 Res. 773**. Debe enviarse a la Zona de Rechazo / RESPEL. |

### 3.2. Catálogo de Consecuencias Químicas (`CHEMICAL_CONSEQUENCES`)
Cuando dos productos incompatibles se posicionan en celdas contiguas (ortogonales), el motor detona una alerta de reactividad química con sacudida visual y alarma:

- **`corrosivo_base` (Ácido + Soda Cáustica)**:
  - *Modo de Falla*: Reacción ácido-base de neutralización instantánea e hiper-exotérmica.
  - *Consecuencia*: Ebullición violenta súbita, salpicaduras cáusticas a >90°C, quemaduras de 3er grado y ruptura de envases.
- **`inflamable_corrosivo` (ACPM + Ácido)**:
  - *Modo de Falla*: Vapores de HCl atacan la chapa metálica con degradación exotérmica.
  - *Consecuencia*: Perforación del tambor, derrame masivo y conato de incendio Clase B al superar el punto de inflamación.
- **`gas_inflamable` (Acetileno + ACPM)**:
  - *Modo de Falla*: Falta de distanciamiento de 6 metros o muro ignífugo (NFPA 55).
  - *Consecuencia*: El calor de un conato en el tambor sobrecalienta el cilindro (200 bar) detonando una explosión BLEVE con radio mortal de 50m.
- **`infraccion_any` (Envase de bebida en el tablero)**:
  - *Modo de Falla*: Incumplimiento del Art. 20 de la Res. 773/2021.
  - *Consecuencia*: Ingesta accidental mortal por confusión humana con bebidas refrescantes.

---

## 4. Arquitectura Isométrica y Algoritmos de Evaluación

### 4.1. Transformación 2.5D Isométrica
El tablero se proyecta mediante CSS 3D Transforms puro sin canvas WebGL:
```css
.iso-world {
    transform: rotateX(60deg) rotateZ(-45deg);
    transform-style: preserve-3d;
}
```
Las piezas y sprites se proyectan perpendicularmente mediante contrarrotación angular para mantener el efecto diorama (Billboarding).

### 4.2. Algoritmo de Evaluación de Enlaces Ortogonales (12 Conexiones)
La cuadrícula 3x3 posee 9 celdas $(r, c)$ y 12 conexiones entre vecinos inmediatos:
- **6 Enlaces Horizontales**: $(r, c) \leftrightarrow (r, c+1)$ para $r \in [0, 2], c \in [0, 1]$.
- **6 Enlaces Verticales**: $(r, c) \leftrightarrow (r+1, c)$ para $r \in [0, 1], c \in [0, 2]$.

```javascript
// Pseudocódigo del Validador de Conexiones
for (let link of ORTHOGONAL_LINKS) {
    let itemA = grid[link.r1][link.c1];
    let itemB = grid[link.r2][link.c2];
    
    if (!itemA || !itemB) continue;
    
    // Si uno es buffer (extintor o estiba), actúa como aislante seguro
    if (itemA.category === 'buffer' || itemB.category === 'buffer') {
        markConnection(link, 'compatible');
        continue;
    }
    
    // Verificación en la matriz de reactividad
    let pairKey = `${itemA.category}_${itemB.category}`;
    if (CHEMICAL_CONSEQUENCES[pairKey]) {
        markConnection(link, 'hazard');
        triggerHazardAlert(pairKey);
        shakeScreen();
        sound.hazardAlarm();
    } else {
        markConnection(link, 'compatible');
    }
}
```

---

## 5. Experiencia de Usuario y Flujo de 3 Fases

### Pantalla Previa de Contexto Situacional (Briefing Táctico Datapad)
- **Overlay Previo (`#modal-briefing-overlay`)**: Antes de iniciar el tablero o correr el tiempo, se presenta una pantalla estilo Datapad de Star Wars simplificada y limpia.
- **Situación Operativa**: *"Acabas de recibir la bodega central de obra desorganizada. Hay reactivos incompatibles en riesgo de reacción exotérmica y recipientes no conformes. Debes organizar el almacenamiento cumpliendo la norma técnica antes de que ocurra un incidente."*
- **Directiva Operativa en 3 Pasos**:
  1. *Segregación NTC 4435*: Separa sustancias incompatibles (Ácidos lejos de Álcalis).
  2. *Buffers y Contención*: Usa estibas y extintores como barreras seguras.
  3. *Zona de Rechazo*: Envía de inmediato el refresco ilegal a la caneca RESPEL.
- **Instrucciones Directas de Control**: `PC: Arrastrar o Clic a celda` / `Móvil: Tocar sustancia y tocar celda`.
- **Botón de Despliegue (`btn-start-briefing`)**: Inicia la bodega y activa el tablero.

1. **Fase 1: Tutorial Guiado (3 Pasos de Inducción)**:
   - *Paso 1*: Ubicación segura de un reactivo en la celda central.
   - *Paso 2*: Demostración de incompatibilidad y uso del Extintor/Buffer para neutralizar el peligro entre reactivos.
   - *Paso 3*: Detección de la botella ilegal de gaseosa y descarte en la **Zona de Rechazo / RESPEL**.
2. **Fase 2: Desafío de Bodega (90 Segundos de Tensión Arcade)**:
   - Tablero 3x3 con restricciones espaciales reales de infraestructura industrial y bandeja de inventario.
   - **Restricciones de Infraestructura de Bodega (Peligros Ambientales Fijos)**:
     - **Celda A3 (Tablero Eléctrico de Potencia 440V)**: Marcador visual `⚡ 440V`. Prohibido almacenar combustible (`item_acpm`: ACPM) o gas inflamable (`item_gas`: Acetileno) en esta casilla debido a riesgo de ignición por arco eléctrico (NFPA 70 / Res. 2400).
     - **Celda C1 (Radiación Solar Directa / Claraboya)**: Marcador visual `☀️ CALOR`. Prohibido almacenar cilindros de gas comprimido (`item_gas`) o combustibles (`item_acpm`) por riesgo de sobrepresión térmica y ruptura (NFPA 55).
   - **Reacción Exotérmica Activa con Cuenta Regresiva de Crisis (6 Segundos)**:
     - Si dos sustancias incompatibles quedan adyacentes, o si se vulnera una restricción ambiental, se activa una alarma crítica y una barra de peligro en tiempo real con cuenta regresiva de 6 segundos.
     - Si el jugador no separa los reactivos antes de que expire el tiempo, ocurre una **Deflagración Química** con sacudida, chispas y penalización irreversible de **-150 puntos** en la auditoría.
   - **Mecánica Dual de Interacción (Drag & Drop + Tap-to-Select & Tap-to-Place)**:
     - **Pointer Events con Pointer Capture Universal**: Implementación de setPointerCapture y releasePointerCapture para seguimiento inmune a cancelaciones por gestos de scroll del contenedor padre (overflow-y-auto). Umbral calibrado de 6px que discrimina toques simples de arrastre intencionado.
     - **Estabilidad Dimensional**: Dimensiones constantes de 98px de alto en la bandeja (transition restringida a colores y sombras sin alterar layout), supresión de aspect-ratio 1:1 y scale(1.02) sutil durante el vuelo de la tarjeta.
     - **Hit-Testing Infalible**: Regla CSS .is-dragging, .is-dragging * { pointer-events: none !important; } aplicada a tarjetas y sprites, garantizando detección precisa mediante elementFromPoint.
     - **Reemplazo y Swap Fluido**: Soporte de reemplazo inmediato al soltar o hacer tap con un ítem de la bandeja sobre una celda ocupada (el ítem previo vuelve a la bandeja automáticamente), y swap bidireccional entre celdas del tablero.
   - **Toast de Advertencia Ergonómico**: Banner de riesgo compacto fuera del viewport con botones de cierre manual [×] y temporizador para no interferir con la visibilidad del tablero isométrico.
   - **Barra de Semáforo de Compatibilidad Química (.matrix-quick-legend-bar)**: Barra interactiva superior a la bandeja con chips visuales (Verde: Compatible, Amarillo: Separar con Estiba/Extintor, Rojo: Incompatible) y botón de acceso rápido [ Tabla NTC 4435 ].
   - Botón [Matriz SGA]: Despliega la matriz técnica oficial (NTC 4435 / Res. 773) para consulta completa en cualquier momento.
3. **Fase 3: Auditoría Técnica y Certificación**:
   - Calificación estricta de 0% a 100% que evalúa:
     - Enlaces compatibles y cero reactividades activas (30%).
     - Gestión del reenvase ilegal en RESPEL (20%).
     - Cumplimiento de restricciones ambientales en A3 y C1 (pérdida de -20 pts por infracción).
     - Contención secundaria de líquidos contiguos a estiba (15%).
     - Penalización severa por incidentes exotérmicos consumados (-150 pts por detonación).

---

## 6. Pruebas y Casos de Validación

1. **Prueba de Reenvase Ilegal**:
   - Intentar colocar la botella de gaseosa en el tablero: el sistema debe disparar alarma crítica roja y forzar su traslado a la Zona de Rechazo.
2. **Prueba de Barrera Buffer**:
   - Colocar Ácido y Álcali con un Extintor PQS en medio: los dos haces adyacentes al extintor deben encenderse en verde sin disparar alerta de neutralización violenta.
3. **Prueba de Concurrencia Táctil**:
   - Arrastre táctil en teléfonos móviles y selección Tap-to-Place verificados sin bloqueos ni distorsiones de perspectiva.

