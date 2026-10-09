# Documentación Técnica Exclusiva - Juego 3
## Inspector de Trasiego: Inspección de Campo y Corrección de Riesgos

---

## 1. Ficha Técnica y Resumen Ejecutivo

| Parámetro | Especificación Técnica |
| :--- | :--- |
| **Nombre del Módulo** | Inspector de Trasiego: Inspección de Campo y Corrección de Riesgos |
| **Archivo Fuente** | `juego3_trasiego.html` |
| **Público Objetivo** | Operadores de carrotanque, maquinistas, inspectores de trasiego y personal SST |
| **Perspectiva / Vista** | Escenario Vectorial SVG 2D de Alta Definición + Mazo de Tarjetas Táctiles |
| **Resolución y Layout** | Diseño responsivo (Zona A: Escena Técnica SVG; Zona B: Mazo de Acción Táctica) |
| **Stack Tecnológico** | HTML5, SVG Nativo, CSS3 Puro (`:root`), JavaScript ES6, GSAP v3, Web Audio API |
| **Efectos Visuales** | GSAP v3 (animación de tarjetas y transiciones) + Canvas 2D Particle Engine |
| **Dependencias CDN** | GSAP 3.12.2, Google Fonts ('Outfit'), FontAwesome v6 |
| **Empaquetador / Build** | Cero dependencias / Vanilla JS (Ejecución standalone directa en navegador) |

El **Juego 3** posiciona al usuario en el rol de un Inspector Técnico de Seguridad durante la operación más crítica de abastecimiento de combustible en obras de infraestructura vial: el **trasiego de hidrocarburos (ACPM UN 1202)** desde el camión cisterna nodriza hacia la maquinaria pesada de movimiento de tierras y generadores eléctricos.

---

## 2. Marco Normativo y Protocolo de Trasiego

El simulador evalúa las medidas obligatorias estipuladas por la legislación colombiana y estándares internacionales:

1. **Decreto 1079 de 2015 (Reglamentario Único del Sector Transporte)**:
   - Sección de Transporte Terrestre Automotor de Mercancías Peligrosas por Carretera (Decreto 1609/2002 compilado).
   - Obligación estricta de conexión equipotencial a tierra antes de conectar mangueras de cargue/descargue para disipar energía estática.
2. **Resolución 773 de 2021**:
   - Identificación y rotulado de combustibles industriales (Líquido Inflamable Categoría 3, UN 1202 ACPM).
   - Controles de ingeniería y prohibición de fuentes de ignición en el radio de operación de vapores.
3. **Decreto 4741 de 2005 y Ley 1333 de 2009 (Régimen Sancionatorio Ambiental)**:
   - Uso obligatorio de bandejas de retención secundaria con capacidad mínima del 110% bajo puntos de acople para impedir contaminación de suelos o fuentes hídricas.
4. **Ley 55 de 1993 y Res. 2400 de 1979**:
   - Supresión de fuentes de ignición térmica (motores encendidos) y eléctricas en atmósferas con presencia de hidrocarburos.
5. **NFPA 10 (Extintores Portátiles) y NFPA 77 (Electricidad Estática)**:
   - Disposición de equipo de extinción Clase B en el perímetro exterior (mínimo extintor satélite rodante a 5 metros).
   - Límites de resistencia de puesta a tierra inferiores a 10 Ohmios.

---

## 3. Escenarios, Hotspots y Catálogo de Medidas Preventivas

El juego presenta 4 frentes de obra secuenciales con retos ambientales y de dificultad creciente:

### 3.1. Maquinaria y Condiciones Ambientales Evaluadas
1. **Excavadora CAT 320D**: Terreno plano, viento moderado. Enfoque en apagado de motor y celular, puesta a tierra y bandeja.
2. **Volqueta Dobletroque Kenworth T800**: Pendiente pronunciada del 12%. Riesgo de rodamiento de tambor y presión hidráulica.
3. **Bulldozer CAT D6T (Oruga)**: Polvareda intensa, temperatura ambiente >35°C. Riesgo de inducción por radiofrecuencia VHF.
4. **Generador Industrial Caterpillar 250kVA**: Área semi-confinada junto a campamentos. Alto riesgo por concentración de vapores y escape caliente a >450°C.

### 3.2. Los 4 Hotspots de Inspección de Campo (Zona A)

| Hotspot | Sector de la Máquina | Medida Preventiva Obligatoria | Fundamento Normativo |
| :--- | :--- | :--- | :--- |
| **`hs_motor`** | Cabina / Motor | **Apagado de motor y aislamiento de celulares** | Turbo a >450°C autoigniciona diésel (210°C). Baterías de litio prohibidas. Ley 55/1993. |
| **`hs_ground`** | Chasis / Masa | **Polo a tierra equipotencial (< 10 $\Omega$)** | Fricción del flujo acumula hasta 15 kV. Se previene chispa en la boquilla. Dec. 1079/2015 / NFPA 77. |
| **`hs_tray`** | Acople / Manguera | **Bandeja antiderrame al 110% de retención** | 1 litro de diésel contamina 1 millón de litros de agua. Retención de fugas. Dec. 4741/2005. |
| **`hs_extinguisher`**| Perímetro (5 metros) | **Extintor satélite ABC 150 lbs en retaguardia** | Autonomía de 45s de sofocación continua ante conatos Clase B. NFPA 10. |

### 3.3. Banco de Distractores Trampa (Por qué son Infracciones Fatales)
El juego incluye tarjetas trampa contextuales por cada vehículo que ponen a prueba el criterio del usuario:
- *Linterna doméstica común*: No tiene certificación intrínseca antiexplosiva (NFPA 70 Clase I Div 1); chispa en interruptor.
- *Extintor de agua a presión*: Error fatal (Boilover). El agua en hidrocarburos Clase B provoca salpicadura violenta de fuego.
- *Arena común de obra*: No es absorbente oleofílico sintético certificado; genera residuo contaminante no confinado (Ley 430/1998).
- *Lavar fuga con manguera*: El ACPM flota sobre el agua, extendiendo el derrame a cunetas y alcantarillas.
- *Mandarria de acero*: Genera chispas mecánicas por fricción. Prohibido acero; solo herramientas de bronce/berilio (OSHA 1910.106).
- *Taponar ducto de venteo*: Genera vacío destructivo en la cisterna durante el bombeo (Dec. 1079/2015).
- *Operar radio VHF a 30cm*: Corrientes parásitas de radiofrecuencia inducen arcos voltaicos en la boquilla.
- *Trapos con solvente sobre turbo*: El múltiple a >450°C causa autoignición espontánea.

---

## 4. Experiencia de Usuario, HUD y Controles

```mermaid
flowchart LR
    A[Mazo de Tarjetas: Zona B] -->|Drag & Drop o Tap-to-Place| B[Hotspots de Inspección: Zona A]
    B --> C{Evaluación Técnica}
    C -->|Medida Correcta| D[Hotspot Resuelto: Glow Verde + Feedback Normativo]
    C -->|Tarjeta Trampa| E[Sacudida de Pantalla + Alarma Roja + Explicación del Error]
```

### Controles Ergonómicos y Complejidad Procedimental (SOP / ATS)
1. **Drag & Drop con Pointer Events**: Arrastre fluido de la tarjeta de seguridad hasta el hotspot visual en la máquina.
2. **Tap-to-Place para Pantallas Táctiles**: Toque en la tarjeta de acción (se eleva con halo dorado) seguido de toque en el hotspot parpadeante en rojo.
3. **Secuencia Operacional ATS Obligatoria (Decreto 1079 de 2015)**:
   - *Paso 1 Obligatorio (Inmovilización Mecánica)*: Las **Cuñas en Llantas (Punto 5)** deben ser colocadas antes de cualquier otra intervención. Cualquier intento de intervenir acoples o sistemas eléctricos sin acuñar dispara una **Violación Crítica de Secuencia ATS** (-4s / -30 pts).
   - *Paso 2 Obligatorio (Desconexión de Ignición y Puesta a Tierra)*: El **Motor/Celular (Punto 1)** y el **Polo a Tierra (Punto 2)** deben resolverse antes de preparar bandejas de derrame o manipular acoples de combustible, previniendo ignición por arco estático (-4s / -30 pts).
   - *Paso 3 (Mitigación Ambiental y Extintores)*: Instalación de bandeja de goteo, extintor a barlovento y kit de derrames.
4. **Penalización Directa y Cero Pistas Gratuitas**:
   - Cada intento erróneo penaliza inmediatamente **-3 segundos y -30 puntos**, rompiendo la racha combo para exigir rigor al jugador.
   - El uso de tarjetas trampa descuenta **-10 segundos y -100 puntos**.
5. **Telemetría en Vivo y Dinamismo (HUD)**:
   - Medidor de racha técnica con multiplicador de puntaje (`x1`, `x2`, `x3`).
   - Cronómetro arcade calibrado a **70 segundos base** con **bonificación de +8 segundos de tiempo extra** por cada frente de obra completado.
   - Píldora de estado del vehículo en curso (`1/4`, `2/4`, `3/4`, `4/4`).

---

## 5. Arquitectura de Software

- **`FieldInspectorGame`**: Controlador central que gestiona el estado de los vehículos, la validación de hotspots, el cálculo de puntaje y el cambio de escena SVG.
- **`ProceduralAudioEngine`**: Síntesis en tiempo real de tonos de éxito armónico, clank metálico de acoples, alarmas estroboscópicas de error y fanfarria de certificación.
- **`CanvasParticleEngine`**: Sistema de partículas en canvas para chispas en errores de ignición y confeti en la aprobación de la auditoría.
- **Feedback Normativo en Tiempo Real (`normativeFeedback`)**: Renderizado dinámico de tarjetas explicativas con viñetas de cómic técnico.

---

## 6. Pruebas y Validación Funcional

1. **Prueba de Infracción Crítica**:
   - Arrastrar un distractor (ej. "Extintor de Agua") sobre el hotspot del motor: el sistema debe descontar racha, vibrar en rojo y desplegar el toast de error pedagógico ("Boilover fatal").
2. **Prueba de Transición de Escena**:
   - Al completar los 4 hotspots del vehículo 1, la escena SVG debe ejecutar una transición suave mediante GSAP hacia el vehículo 2, actualizando condiciones ambientales y barajando el mazo de tarjetas.
3. **Prueba de Certificación Final**:
   - Al superar los 4 frentes de obra, se emite el certificado oficial de "Inspector Técnico de Trasiego Seguro" conforme al Dec. 1079/2015.

