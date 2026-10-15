# GUÍA PASO A PASO DE CADA JUEGO
## Suite de Entrenamiento en Seguridad Química y Materiales Peligrosos
### Seguros Bolívar & KMA Construcciones

---

## 1. INTRODUCCIÓN Y PROPÓSITO GENERAL

Esta colección de 5 juegos interactivos está diseñada para que cualquier trabajador de obra, operador de maquinaria, brigadista o supervisor aprenda y practique las reglas indispensables de seguridad química de forma entretenida, visual y práctica.

Los juegos funcionan directamente en cualquier computador, tableta o celular moderno (a través de Chrome, Edge, Safari o Firefox) y no requieren conexión permanente a internet para funcionar en campo.

Cada juego cuenta con el acompañamiento de **Lucho**, el asistente virtual y robot asesor de seguridad de Seguros Bolívar, quien brinda explicaciones claras antes y durante cada actividad.

---

## 2. JUEGO 1: DESAFÍO SGA (CLASIFICACIÓN DE PELIGROS Y FICHAS DE SEGURIDAD)
**Archivo:** `juego1_sga.html`  
**Objetivo:** Aprender a identificar los peligros de los productos químicos utilizados en obra y saber qué equipo de protección ponerse leyendo la etiqueta y la Ficha de Datos de Seguridad (FDS).

### ¿Cómo se juega paso a paso?

1. **Paso 1 - Bienvenida y Tutorial con Lucho:**
   - Al iniciar, el robot Lucho te da la bienvenida y te enseña cómo funciona la pantalla.
   - En pantalla verás una tarjeta con un producto químico real de obra (por ejemplo: ACPM, Thinner, Ácido Muriático o Cemento).
   - Abajo encontrarás los símbolos oficiales de peligro (rombos con borde rojo conocidos como pictogramas del Sistema Globalmente Armonizado - SGA).

2. **Paso 2 - Identificar el Peligro Principal:**
   - Lee el nombre del producto y la pista que te da Lucho.
   - Si no estás seguro de qué peligro tiene o qué guantes debes usar, toca el botón amarillo **[Ver Ficha FDS]**. Esto abrirá la Ficha de Datos de Seguridad del producto en un lenguaje muy sencillo, destacando la Sección 2 (Peligros) y la Sección 8 (Elementos de Protección Personal - EPP).

3. **Paso 3 - Clasificar el Producto:**
   - Puedes jugar de dos formas:
     - **Forma A (Arrastrar):** Mantén presionado el producto químico con el dedo o el ratón y arrástralo hasta el rombo de peligro correcto.
     - **Forma B (Tocar y Tocar):** Toca primero el producto químico para seleccionarlo y luego toca el rombo de peligro donde debe ir.

4. **Paso 4 - Aciertos, Errores y Explicación:**
   - **Si aciertas:** Sonará un tono positivo, saldrán chispas de celebración y sumarás puntos.
   - **Si te equivocas:** Sonará una alerta suave y Lucho te explicará exactamente por qué ese producto no pertenece a esa categoría y qué daño causaría en la vida real.

5. **Paso 5 - Cierre y Certificación:**
   - Al completar la ronda de productos, el sistema te mostrará tu puntaje final (0 a 100%), felicitándote por los aciertos y permitiéndote repasar los productos donde tuviste dudas.

---

## 3. JUEGO 2: BODEGA SEGURA (ORGANIZACIÓN Y COMPATIBILIDAD EN ALMACÉN)
**Archivo:** `juego2_bodega.html`  
**Objetivo:** Organizar las sustancias químicas dentro de un almacén de obra de 3x3 casillas sin mezclar sustancias que puedan reaccionar entre sí y evitando zonas de peligro de la infraestructura.

### ¿Cómo se juega paso a paso?

1. **Paso 1 - Inducción de 3 Pasos:**
   - **Paso 1 del tutorial:** Aprendes a colocar un químico en el piso 3D de la bodega.
   - **Paso 2 del tutorial:** Descubres qué ocurre cuando dos químicos incompatibles quedan juntos (por ejemplo, ácido y combustible) y cómo una estiba plástica o extintor sirve de barrera segura.
   - **Paso 3 del tutorial:** Descubres una botella plástica de gaseosa que alguien usó para reempacar químico. Lucho te enseña que **está terminantemente prohibido almacenar químicos en botellas de bebidas** y te enseña a llevarla a la caneca roja de RESPEL (Zona de Rechazo).

2. **Paso 2 - El Desafío del Almacén (Reloj de 90 segundos):**
   - Aparece la bodega en vista tridimensional con 9 casillas (A1 a C3) y una bandeja abajo con los productos disponibles (ACPM, Ácido Muriático, Soda Cáustica, Pintura Epóxica, Cilindro de Gas Acetileno, Estiba Antiderrame, Extintor y la botella ilegal).
   - Toca o arrastra cada producto desde la bandeja hacia las casillas del almacén.

3. **Paso 3 - Cuidado con las Líneas de Conexión (Rojas vs. Verdes):**
   - Entre casillas vecinas se encienden haces de luz:
     - **Línea Verde:** Las sustancias son compatibles y están seguras.
     - **Línea Roja con Alarma:** ¡Peligro! Esas dos sustancias reaccionan entre sí (peligro de incendio o explosión). Si se activa una línea roja, se iniciará una cuenta regresiva de **6 segundos**. Debes separar las sustancias antes de que el reloj llegue a cero o habrá una deflagración que bajará puntos.

4. **Paso 4 - Consulta de la Matriz Oficial de Compatibilidad (Ventana Emergente):**
   - Si dudas si dos sustancias pueden ir juntas, presiona el botón **[Matriz de Compatibilidad]**.
   - Verás la tabla completa de 12 clases SGA/ONU. **Toca cualquier cuadradito de la matriz**: se abrirá una ventana emergente que te muestra los rombos de peligro, el veredicto oficial (`Compatible [C]`, `Precaución [P]`, `Incompatible [I]` o `Exclusivo [🔒 E]`) y la explicación técnica de qué pasaría si se mezclan.

5. **Paso 5 - Cuidado con los Peligros Físicos de la Bodega:**
   - **Casilla A3 (Tablero Eléctrico 440V):** Marcada con un rayo amarillo. Prohibido poner combustibles o cilindros de gas cerca de chispas eléctricas.
   - **Casilla C1 (Ventana / Sol Directo):** Marcada con un sol. Prohibido poner cilindros de gas bajo radiación directa de calor.

6. **Paso 6 - La Botella de Gaseosa (Trampa Crítica):**
   - La botella de gaseosa NUNCA debe colocarse en las casillas del almacén. Debe arrastrarse o tocarse y llevarse a la **Zona de Rechazo / RESPEL** ubicada a la derecha.

7. **Paso 7 - Auditoría y Evaluación Final:**
   - Al terminar de organizar o pulsar **[Finalizar y Auditar]**, el sistema califica tu bodega como si fuera una inspección real del Ministerio de Trabajo / ARL, entregándote tu certificado de almacenamiento seguro.

---

## 4. JUEGO 3: INSPECTOR DE TRASIEGO (SUMINISTRO SEGURO DE COMBUSTIBLE ACPM)
**Archivo:** `juego3_trasiego.html`  
**Objetivo:** Realizar la inspección y aseguramiento preventivo antes de abastecer de combustible (ACPM) a la maquinaria pesada en el frente de obra, aplicando los 4 pasos del procedimiento oficial.

### ¿Cómo se juega paso a paso?

1. **Paso 1 - Reconocer la Maquinaria:**
   - En cada ronda se presenta un vehículo de obra diferente (Volqueta Dobletroque, Excavadora de Orugas, Bulldozer o Planta Eléctrica) estacionado junto al camión cisterna de combustible.
   - En el vehículo y el camión cisterna parpadean 4 puntos de riesgo críticos en color rojo.

2. **Paso 2 - Aplicar los 4 Pasos Obligatorios del Procedimiento:**
   El jugador debe seleccionar y colocar la medida de seguridad correcta en cada punto:
   - **Paso 1 - Motor Apagado y Cero Calor (En la cabina/escape):** Apagar el motor del vehículo y prohibir el uso de teléfonos celulares para evitar que el calor del turbo o una chispa eléctrica encienda los vapores de combustible.
   - **Paso 2 - Conexión de Polo a Tierra (En el chasis de la máquina):** Conectar la pinza de cable a tierra entre el cisterna y la máquina para descargar toda la electricidad estática acumulada por el rozamiento del ACPM.
   - **Paso 3 - Bandeja Antiderrame al 110% (Bajo el acople de la manguera):** Colocar la bandeja plástica de contención justo debajo de la manguera para atrapar cualquier gota o fuga imprevista y no contaminar el suelo.
   - **Paso 4 - Extintor Satélite de 150 lbs (A 5 metros en el perímetro):** Ubicar el extintor de polvo químico listo para actuar ante cualquier emergencia con fuego.

3. **Paso 3 - Cuidado con las Opciones Trampa (Malas Prácticas Reales):**
   - En el mazo de cartas aparecen opciones incorrectas que suelen cometerse por desconocimiento (como lavar derrames con agua, usar herramientas de acero que botan chispas, taponar mangueras con trapos o usar radios cerca del tanque).
   - Si intentas aplicar una trampa, sonará un error y Lucho te explicará la consecuencia ambiental o de seguridad que causaría.

4. **Paso 4 - Completar los Vehículos y Certificación:**
   - Una vez asegurados los 4 puntos, el vehículo queda certificado con luz verde y avanzas al siguiente reto hasta completar la jornada de abastecimiento.

---

## 5. JUEGO 4: TALLER SEGURO (DOTACIÓN DE EPP Y MANTENIMIENTO MECÁNICO)
**Archivo:** `juego4_taller.html`  
**Objetivo:** Cumplir el protocolo completo de ingreso y trabajo en taller: primero equiparse los EPP correctos en el vestidor, validar en el escáner biométrico y luego ejecutar las 3 tareas del patio en orden estricto.

### ¿Cómo se juega paso a paso?

### FASE 1: EL VESTIDOR (PREPARACIÓN Y EPP)
1. **Paso 1 - Ir al Casillero EPP:**
   - Toca el casillero `#01` o el suelo marcado frente a él. Tu personaje caminará hasta allí y se abrirá el casillero.
2. **Paso 2 - Escoger la Dotación para Solventes Químicos:**
   - En el casillero verás 8 opciones. Debes activar exactamente los 4 elementos obligatorios contra sustancias químicas:
     1. **Gafas de Seguridad Herméticas** (anti-salpicaduras).
     2. **Respirador con Cartucho Químico** (para vapores orgánicos).
     3. **Guantes de Nitrilo/Neopreno** (resistentes a químicos, no de tela ni cuero).
     4. **Botas de Seguridad con Puntera** y suela antideslizante.
   - Cierra el casillero confirmando tu selección.
3. **Paso 3 - Cruzar la Puerta Checkpoint:**
   - Toca la puerta de esclusa al final del cuarto. El escáner láser verificará tu dotación:
     - Si te falta algún EPP o elegiste uno equivocado, la puerta sonará roja y Lucho te dirá qué te faltó.
     - Si tienes el 100% de la dotación, sonará un timbre verde de éxito, se abrirán las compuertas y pasarás automáticamente al Patio de Mantenimiento.

### FASE 2: EL PATIO DE TALLER (OPERACIONES EN ORDEN)
En el patio debes realizar 3 estaciones de trabajo en orden lógico (guiado por la barra superior y las balizas doradas):

1. **Estación 1 - Mesa de Desengrase:**
   - Toca la mesa de trabajo a la izquierda. Tu personaje caminará allí y limpiará la pieza mecánica usando el solvente dieléctrico con brocha y bandeja.
2. **Estación 2 - Motor V8 (Cambio de Filtro y Aceite):**
   - Una vez limpia la pieza, la baliza del motor se pondrá dorada. Toca el motor V8. El operario reemplazará el filtro usado y drenará el aceite sucio sobre la bandeja antiderrame integrada.
3. **Estación 3 - Punto Ecológico RESPEL (Reto Aleatorio de Residuos Peligrosos):**
   - Con los residuos generados, se activará la baliza del Punto RESPEL. Toca las canecas al fondo.
   - **Desafío Aleatorio Impredecible:** En cada partida se extraen al azar **4 residuos de obra** (de un catálogo de 8: filtros usados, trapos impregnados, aceite sucio, baterías con ácido, latas de aerosol, refrigerante/anticongelante, garrafas plásticas químicas o cajas de cartón seco como trampa ordinaria) y **5 contenedores técnicos barajados**.
   - Toca primero el residuo y luego toca el contenedor correcto. ¡Cuidado!: equivocarte descuenta **5 segundos** y **40 puntos**. Al confinar los 4 residuos, la estación queda aprobada.

4. **Paso 4 - Evaluación Final:**
   - Al terminar, se emitirá la auditoría final con tu puntaje de cumplimiento en vestidor, mantenimiento y gestión ambiental.

---

## 6. JUEGO 5: BRIGADA DE EMERGENCIA (SIMULADOR DE RESCATE QUÍMICO EN 3D)
**Archivo:** `juego5_emergencias.html`  
**Objetivo:** Simular en primera persona (caminando dentro de la planta) la atención inmediata de un derrame químico con compañero salpicado, cumpliendo los 5 pasos de rescate en menos de 120 segundos.

### ¿Cómo se juega paso a paso?

1. **Paso 1 - Lectura del Briefing Táctico:**
   - Al abrir el juego verás una pantalla de comando estilo terminal táctico con las instrucciones de la misión y los controles.
   - Tienes **120 segundos** para controlar la emergencia. Presiona **[INICIAR MISIÓN]** para empezar.

2. **Paso 2 - Controles de Movimiento:**
   - **En Computador:** Teclas `W`, `A`, `S`, `D` para caminar • Mover el ratón para mirar alrededor • Tecla `E` o Clic para interactuar con objetos.
   - **En Celular / Tableta:** Palanca táctil virtual (joystick) a la izquierda para caminar • Deslizar la pantalla a la derecha para mirar • Botón de mano para interactuar.

3. **Paso 3 - Los 5 Pasos de Rescate en Orden:**
   - **Paso 1 (Caseta EPP):** Camina hacia la caseta de emergencias amarilla y equipa el traje químico de protección (Nivel B). *¡Si te acercas al químico sin el traje, tu nivel de salud bajará por los vapores!*
   - **Paso 2 (Válvula de Emergencia):** Corre hacia la tubería rota y gira la válvula de cierre para cortar el flujo del químico que alimenta el charco.
   - **Paso 3 (Lavaojos y Compañero Salpicado):** Acércate a tu compañero afectado y guíalo hasta la estación de lavaojos y ducha de emergencia para iniciar la descontaminación inmediata.
   - **Paso 4 (Contención del Derrame):** Ve a la estación del kit antiderrame, toma las salchichas absorbentes y colócalas alrededor del charco para que el líquido no llegue a los drenajes.
   - **Paso 5 (Acopio RESPEL):** Recoge los absorbentes empapados y deposítalos dentro de la caneca roja de residuos peligrosos.

4. **Paso 4 - Victoria y Certificación:**
   - Al concluir los 5 pasos antes de los 120 segundos, la alarma de la planta se silenciará, el ambiente quedará seguro y recibirás la certificación oficial como **Brigadista Químico Certificado**.

---

## 7. CONSEJOS GENERALES PARA FACILITADORES Y CAPACITADORES

1. **Facilidad de Toque:** En todos los juegos puedes interactuar tocando el objeto 3D, su baliza superior, la demarcación pintada en el piso o los botones guía. No es necesario apuntar a un milímetro exacto.
2. **Uso en Pantallas Táctiles:** En teléfonos y tablets, un toque simple sirve para interactuar o caminar. Para mover el ángulo de la cámara en los juegos isométricos, se usan dos dedos.
3. **Autonomía Total:** Todos los juegos pueden guardarse en una memoria USB o abrirse directamente desde una carpeta local de la obra, sin depender de internet.

