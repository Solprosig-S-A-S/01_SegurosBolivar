# Revisión técnica de los cinco juegos — 2026-10-22

> **Estado posterior a la corrección:** implementadas las correcciones técnicas y cubiertas por regresiones. Este informe conserva las reproducciones sobre la versión anterior; las líneas históricas no describen el código actualizado. Consulta el [contrato vigente y estado R01–R25](../CORRECCIONES_2026-10-22.md). Pendientes: QA en navegador/Moodle y validación profesional SST; no se consideran comprobados por las pruebas simuladas.

## Alcance y dictamen

Revisión de los cinco HTML, sus flujos de interacción, estado, evaluación, temporizadores, puente LMS, documentación y los seis ZIP SCORM. No se modificó código de los juegos ni se regeneraron paquetes.

Segunda profundización del mismo día: **25 hallazgos en total** (10 P1, 14 P2 y 1 P3), incluyendo los siete casos adicionales R19–R25 y una propuesta concreta de corrección/aceptación. R24 describe una carencia de recuperación ante pérdida de foco comprobada en código; no una reproducción visual de Alt-Tab.

**Dictamen:** los resultados actuales no son suficientemente fiables para utilizarse como evidencia de aprobación de competencias. Hay aprobaciones reproducibles con operaciones obligatorias pendientes. Esto no significa que los juegos no puedan utilizarse como material exploratorio; requiere corregir primero la evaluación y sus precondiciones para uso calificable.

Prioridades: **P1**, corregir antes de utilizar la calificación como evidencia; **P2**, corregir en el siguiente bloque funcional; **P3**, consistencia documental y mantenimiento. Los hallazgos se apoyan en lectura de código y, cuando se indica, ejecución aislada de métodos reales con Node.js `vm` y un DOM simulado. No equivalen a pruebas completas de navegador.

## Hallazgos prioritarios

### R01 · P1 · Trasiego entrega 100 % con dos de cuatro equipos

- Referencias: [puntos por racha](../../juego3_trasiego.html#L3815), [bonificación por equipo](../../juego3_trasiego.html#L4458), [denominador final](../../juego3_trasiego.html#L4570).
- Cada acierto suma `100 * min(3, streak)`, pero el máximo final se fija en `4 * 750 = 3000`.
- Reproducción: ejecutar las seis medidas en orden para el primer equipo y las seis para el segundo, conservando la racha; cerrar la auditoría en ese estado.
- Resultado observado con los métodos reales: `rawScore=3600`, `vehiclesCompleted=2`, `score=100`.
- Impacto: el agotamiento posterior del tiempo puede producir aprobación perfecta con la mitad de la inspección pendiente.
- Corrección mínima: separar puntos arcade de nota de evaluación y condicionar la aprobación a la cobertura de los cuatro equipos. Ajustar solo el divisor no garantiza por sí mismo ese requisito.

### R02 · P1 · Taller permite fabricar puntos con el mismo EPP

- Referencia: [toggleEPP](../../juego4_taller.html#L5158).
- Equipar un elemento suma 25 puntos; retirarlo no resta ni impide volver a premiar el mismo elemento. El checkpoint también suma 100 cada vez que se supera y permite volver al vestidor.
- Reproducción aislada: alternar 16 veces los guantes.
- Resultado observado: `score=200`, `equippedEPP=[]`. Con 32 alternancias se obtienen 400 puntos y una nota de 100 % según el divisor actual, aunque no quede ningún EPP puesto.
- Corrección mínima: premiar hitos una sola vez y calcular cumplimiento desde el estado validado, sin permitir que puntos repetibles sustituyan operaciones obligatorias.

### R03 · P1 · Taller permite operar sin pasar el checkpoint

- Referencias: [pestañas de zona](../../juego4_taller.html#L4522), [switchZone](../../juego4_taller.html#L5356), [tareas del taller](../../juego4_taller.html#L5567).
- La pestaña Patio y el botón de cambio llaman directamente a `switchZone(2)`. El método no comprueba EPP ni autorización; desengrase, mantenimiento y RESPEL tampoco validan esa precondición.
- Reproducción: iniciar, abrir Patio sin equiparse y ejecutar las tareas. El código solo impone el orden desengrase → mantenimiento → residuos.
- Impacto: el checkpoint no es una barrera efectiva para la operación que pretende proteger.
- Corrección mínima: permitir exploración si esa es la intención, pero bloquear acciones operativas hasta validar la dotación completa y libre de trampas. Invalidar autorización si cambia la dotación.

### R04 · P1 · Taller aprueba antes de completar RESPEL

- Referencias: [premio de EPP](../../juego4_taller.html#L5200), [checkpoint](../../juego4_taller.html#L5458), [auditoría](../../juego4_taller.html#L6013).
- Recorrido correcto: EPP 100 + checkpoint 100 + desengrase 85 + mantenimiento 85 + cuatro residuos de 60 = **610 puntos**. El divisor sigue siendo **400**.
- Antes de segregar un solo residuo ya hay 370 puntos: al agotarse el reloj la nota es **93 %**, con RESPEL pendiente. `tasksDone` se muestra, pero no condiciona la nota ni el aprobado enviado.
- Corrección mínima: definir el máximo desde los hitos reales y exigir las tres operaciones para aprobar.

### R05 · P1 · Emergencias permite ganar sin cerrar la fuga ni auxiliar al compañero

- Referencias: [interacciones de misión 1](../../juego5_emergencias.html#L4882), [cierre por RESPEL](../../juego5_emergencias.html#L5000).
- La válvula y el lavaojos aparecen en la guía, pero no son precondiciones del tratamiento del derrame ni del cierre exitoso.
- Reproducción aislada: con EPP y kit tomados, interactuar con `spill`, `spill`, `respel`, omitiendo válvula y lavaojos.
- Resultado observado: `victory=true`, `valveClosed=false`, `eyewashActive=false`.
- El informe final afirma que se cerró la fuga y se auxilió al compañero aun cuando esas acciones no ocurrieron.
- Corrección mínima: validar todos los hitos obligatorios antes de certificar, y derivar las afirmaciones del informe del estado real.

### R06 · P1 · Cambiar de misión reinicia el riesgo y el tiempo durante una partida

- Referencias: [listeners de las pestañas](../../juego5_emergencias.html#L3626), [switchMission](../../juego5_emergencias.html#L4004).
- Las pestañas llaman a `switchMission` durante el desafío. Este restaura salud a 100, tiempo a 120/90 y los pasos del escenario, sin una política de nuevo intento ni cierre del anterior.
- Reproducción por lectura de flujo: iniciar, consumir tiempo o recibir daño, pulsar de nuevo la misión actual; los recursos se restauran.
- Impacto: el límite temporal y la penalización por exposición se pueden evitar desde controles normales de la interfaz.
- Corrección mínima: separar navegación, reinicio explícito e intento calificable; impedir que una pestaña regenere recursos del intento activo.

## Otros fallos funcionales

### R07 · P2 · SGA admite respuestas sobre preguntas todavía no renderizadas

- Referencias: [classifyLevel2Item](../../juego1_sga.html#L4934), [handleFdsSectionSelection](../../juego1_sga.html#L5282).
- Nivel 2 incrementa el índice inmediatamente y demora 900 ms el render siguiente; no bloquea una segunda respuesta. Los primeros dos casos pertenecen a `fisico`.
- Reproducción aislada: dos llamadas consecutivas con `fisico` antes de ejecutar temporizadores.
- Resultado observado: índice 2 y dos puntos, sin haber presentado el segundo caso.
- En FDS, `pointer-events:none` solo bloquea puntero: el botón enfocado sigue pudiendo activarse con teclado, mientras el índice ya corresponde a la siguiente pregunta.
- Corrección mínima: estado explícito de respuesta en curso y botones realmente deshabilitados; resolver una sola vez cada pregunta.

### R08 · P2 · Reiniciar SGA conserva la pestaña FDS del intento anterior

- Referencias: [resetAll](../../juego1_sga.html#L4138), [entrada al nivel 3](../../juego1_sga.html#L4128), [setSubphase](../../juego1_sga.html#L4993).
- `resetAll` limpia puntuaciones, pero no restaura `level3Subphase` ni las clases de visibilidad de las subfases. `initLevel3A` tampoco selecciona explícitamente la pestaña 3A.
- Resultado aislado: tras reiniciar desde `level3Subphase='3b'`, permanece `3b`.
- Impacto: el nuevo recorrido llega al nivel 3 mostrando FDS y omitiendo visualmente la entrada prevista al rotulado; debe cambiarse manualmente de pestaña.
- Corrección mínima: restaurar subfase y vista al comenzar el nuevo intento; cancelar callbacks pendientes del anterior.

### R09 · P2 · Bodega entrega 98 % dejando un químico sin almacenar

- Referencia: [inventario parcial](../../juego2_bodega.html#L7307).
- La organización completa solo pesa 15 puntos y recibe crédito proporcional; su incumplimiento no bloquea la aprobación.
- Configuración reproducida con `item_soda` rechazado, sin incidentes y dejando ACPM en bandeja:

| Fila | Columna 1 | Columna 2 | Columna 3 |
| --- | --- | --- | --- |
| A | Vacío | Vacío | Ácido |
| B | Vacío | Estiba | Extintor |
| C | Soda cáustica | Pintura | Acetileno |

- Resultado observado mediante `generateAuditReport`: **98 %**. Hay una solución completa de 100 %: colocar ACPM en A1 de esta misma configuración.
- La búsqueda encontró 96 distribuciones completas sin incompatibilidades ni infracción A3/C1, conforme a las reglas programadas. El puzzle sí tiene solución.
- Corrección mínima: exigir inventario completo para certificar; conservar el puntaje parcial para feedback formativo.

### R10 · P2 · “Aprobado” en pantalla y “failed” en Moodle para la misma nota

- Referencias: [resultado SGA](../../juego1_sga.html#L5367), [resultado Bodega](../../juego2_bodega.html#L7423), [puente LMS](../../juego1_sga.html#L3157), [mastery score](../../build_scorm.py#L20).
- SGA y Bodega muestran aprobación desde 60 %. El puente y los manifiestos exigen 80 %.
- Reproducción: finalizar con cualquier nota entre 60 y 79; la pantalla indica aprobado y SCORM reporta reprobado.
- Corrección mínima: una misma regla de aprobación para texto, estilos, reportes y manifiesto.

### R11 · P2 · Carrera entre temporizadores al pasar rápidamente a misión 2

- Referencias: [botón de siguiente misión](../../juego5_emergencias.html#L4272), [startCrisisLoop](../../juego5_emergencias.html#L5077).
- El intervalo se guarda en una variable local. La victoria no lo cancela inmediatamente: espera a que su siguiente tick observe `isGameOver`.
- Si se avanza antes de ese tick, el botón vuelve a poner `isGameOver=false` y crea otro intervalo. El antiguo continúa funcionando.
- Prueba aislada de dos arranques: una ronda de callbacks reduce `timeLeft` de 100 a **98**.
- Corrección mínima: un único identificador de intervalo por instancia; cancelarlo al terminar, reiniciar y cambiar de misión. Hacer el cierre idempotente.

### R12 · P2 · Abrir de nuevo un SCO sobrescribe su estado con “incomplete”

- Referencias: `BolivarLmsBridge.init` en [SGA](../../juego1_sga.html#L3124), [Bodega](../../juego2_bodega.html#L4531), [Trasiego](../../juego3_trasiego.html#L2376), [Taller](../../juego4_taller.html#L3724) y [Emergencias](../../juego5_emergencias.html#L3218).
- Tras inicializar, todos escriben `incomplete` sin leer si el estado guardado ya era `passed`, `failed` o `completed`, ni comprobar modo de revisión. SCORM 2004 tiene el mismo patrón para `completion_status`.
- Prueba con API simulada: inicializar genera la escritura y commit de `cmi.core.lesson_status=incomplete`; nunca consulta el estado anterior.
- Impacto: el SCO solicita degradar el estado guardado al revisitarlo. El resultado definitivo depende de la política de intentos del LMS; no se probó Moodle real.
- Corrección mínima: distinguir revisión, continuación y nuevo intento; no sobrescribir una finalización previa automáticamente. Comprobar retornos de SetValue/Commit.

### R13 · P2 · Movimiento FPS dependiente de la frecuencia de pantalla

- Referencia: [startPhysicsLoop](../../juego5_emergencias.html#L4455).
- Cada frame avanza 11 o 14 unidades; no se utiliza tiempo transcurrido. A 120 Hz se recorre aproximadamente el doble por segundo que a 60 Hz, mientras el reloj de crisis usa segundos.
- Impacto: dificultad distinta según dispositivo y desplazamiento más rápido en diagonal al sumar dos ejes sin normalización.
- Corrección mínima: velocidad por segundo multiplicada por delta temporal y normalización del vector diagonal.

### R14 · P2 · La exposición ambiental deja de evaluarse al permanecer quieto

- Referencias: [bucle de física](../../juego5_emergencias.html#L4495), [daño en checkProximity](../../juego5_emergencias.html#L4631), [reloj de crisis](../../juego5_emergencias.html#L5077).
- El daño por vapores/calor se calcula al actualizar cámara/proximidad. El bucle de física actualiza la cámara solo al moverse o girar. El reloj no aplica ese daño.
- Reproducción derivada del flujo: entrar en rango peligroso sin protección y dejar de moverse, girar o interactuar; no existe actualización periódica de exposición durante esa inactividad.
- Corrección mínima: evaluar exposición con tiempo transcurrido independientemente de la entrada del usuario.

## Contenido, accesibilidad y portabilidad

### R15 · P1 · Falta un contrato técnico del escenario para respaldar las afirmaciones SST

- Referencias: [ACPM/solvente agrupados](../../juego2_bodega.html#L4146), [compatibilidad por categorías](../../juego2_bodega.html#L6662), [selección y mensaje de EPP](../../juego5_emergencias.html#L4883), [informe final](../../juego5_emergencias.html#L5155).
- Bodega trata una estiba o un extintor como compatible con cualquier vecino y describe el extintor como barrera física. La contención secundaria se acredita por estar en una casilla adyacente. Estas son reglas del puzzle; no demuestran contención real, separación constructiva ni compatibilidad específica de productos.
- Emergencias mezcla una barra de “O2/Vitalidad”, un químico genérico y una máscara para vapores, y afirma que las vías respiratorias quedan “blindadas”. No se establece identidad/concentración del producto, condiciones atmosféricas ni límites de protección que permitan sostener esa afirmación.
- Como referencia técnica internacional, OSHA exige seleccionar protección según el contaminante y las condiciones y trata las atmósferas deficientes en oxígeno como IDLH con las excepciones expresas de su norma: [29 CFR 1910.134(d)](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.134). Las FDS deben cubrir almacenamiento, incompatibilidades y protección personal: [Apéndice D de 1910.1200](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200AppD). Estas referencias no sustituyen la validación colombiana aplicable.
- Corrección mínima: validar escenarios y textos con SST y FDS de productos concretos; distinguir claramente reglas simplificadas del juego y condiciones operativas reales. No presentar el puntaje como acreditación de cumplimiento legal.
- No se realizó auditoría normativa exhaustiva de cada cita, cifra ni afirmación química de la suite.

### R16 · P2 · La distribución no cumple la promesa de cero conexiones externas

- Los cinco HTML cargan Google Fonts y Font Awesome desde terceros. Juegos 3, 4 y 5 también cargan GSAP por CDN en la línea 9.
- Los ZIP individuales contienen solo HTML y manifiesto; no incluyen esas dependencias. Contradice [arquitectura offline](../02_Arquitectura.md#L4).
- Hay guardas/fallbacks de GSAP en muchos puntos: no se afirma que todos los juegos se bloqueen por completo sin Internet. Sí cambian iconos, tipografías, animaciones y, en Trasiego, representaciones de las correcciones SVG.
- Corrección mínima: definir si offline es requisito y, si lo es, empaquetar los recursos necesarios y verificar sin red.

### R17 · P2 · Acciones principales sin alternativa completa de teclado y modales sin gestión de foco

- Ejemplo concreto: [familias SGA](../../juego1_sga.html#L2397) son `div` con listeners de clic, sin `tabindex`, rol ni activación por teclado. Los hotspots SVG y props del taller siguen el patrón de interacción por puntero.
- SGA y Taller no contienen atributos `aria-*`; los modales carecen de contrato de foco, retorno al disparador y semántica consistente de diálogo. Hay botones nativos accesibles, pero no cubren todo el recorrido.
- El teclado de Emergencias sirve al desplazamiento/objetivo, pero el handler global captura Enter/Space salvo en campos, por lo que puede interceptar la activación normal de otros botones.
- Corrección mínima: controles semánticos para todas las acciones obligatorias, teclado equivalente y gestión de foco/modal. Auditar anuncios de feedback y opciones de movimiento reducido.
- No se certificaron contraste, lector de pantalla ni tamaño táctil: requieren navegador y medición visual.

### R18 · P3 · Documentación funcional desactualizada

- README describe SGA como examen de 120 s, pero actualmente tiene niveles legal, familias y rotulado/FDS sin ese cronómetro de examen.
- Trasiego se documenta con cuatro hotspots y 120 s; el código tiene seis pasos y arranque de 70 s.
- Taller se documenta con 240 s en requisitos, pero arranca y reinicia en 90 s.
- La arquitectura promete escala mínima de 13 px; existen numerosos textos a 0.58–0.7 rem y valores fijos de 11 px. Esto no prueba por sí mismo ilegibilidad, pero invalida la garantía documentada.
- Corrección mínima: actualizar documentos después de acordar las reglas reales de evaluación y tiempo, evitando consolidar como requisitos los defectos actuales.

## Validaciones ejecutadas y límites

| Comprobación | Resultado |
| --- | --- |
| Extracción de scripts y `node --check -` | Los cinco HTML pasan sintaxis |
| Carga aislada de lógica con Node.js `vm` | Métodos reproducidos con efectos de DOM/audio simulados |
| SGA: dos respuestas antes del render | Dos casos puntuados; segundo aún no presentado |
| SGA: reinicio | Subfase 3B conservada |
| Trasiego: dos equipos completos | 3600 puntos; nota 100 %; 2/4 equipos |
| Taller: 16 alternancias de guantes | 200 puntos; ningún EPP equipado al terminar |
| Emergencias: omitir válvula y lavaojos | Cierre exitoso reproducido |
| Emergencias: dos intervalos activos | Dos segundos descontados por ronda de callbacks |
| Bodega: búsqueda de distribuciones completas válidas | 96 soluciones sin incompatibilidades ni infracciones A3/C1 |
| Bodega: auditoría con ACPM sin ubicar | Nota 98 % reproducida |
| Cinco manifiestos individuales | XML bien formado; no equivale a validación XSD/SCORM completa |
| Cinco ZIP individuales y ZIP de la suite | HTML coincide con fuentes al normalizar CRLF/LF |
| IDs del HTML real, excluyendo plantillas JS | Sin IDs duplicados detectados en el marcado inicial |
| Git al iniciar revisión | Árbol sin cambios preexistentes visibles |

La primera versión del arnés omitía `document.readyState='loading'`, por lo que SGA intentó construir su UI en el DOM simulado. Se corrigió el arnés y se repitieron las reproducciones; no era un fallo del juego.

La comparación binaria inicial del ZIP de Bodega detectó únicamente CRLF frente a LF. No hay evidencia de paquete desactualizado.

No hay navegador conectado disponible en esta sesión. Quedan pendientes recorridos manuales completos, pantalla móvil/desktop, drag/tap real, audio, pantalla completa, red bloqueada, Safari/Firefox, lectores de pantalla y Moodle real. No se instalaron dependencias, no se ejecutaron pruebas existentes excluidas por `.aiexclude` y no se modificaron sus aserciones.

## Orden recomendado de corrección

1. Un bloque atómico para evaluación de Trasiego: nota independiente de rachas y cobertura completa obligatoria (R01).
2. Evaluación y autorización de Taller: premios únicos, checkpoint y RESPEL obligatorio (R02–R04).
3. Máquina de estados e intentos de Emergencias: precondiciones, cambio de misión y ciclo de temporizador (R05, R06, R11).
4. Bloqueo de respuestas y reinicio de SGA; inventario obligatorio de Bodega y umbral único (R07–R10).
5. Persistencia LMS, física/exposición, revisión SST, accesibilidad y distribución offline (R12–R17).
6. Sincronizar documentación y regenerar paquetes solo después de corregir y validar cada bloque (R18).

## Segunda profundización: causas y fallos adicionales

### R19 · P1 · El arrastre RESPEL de Taller no respeta el contrato de validación

- Referencias: [selección por toque](../../juego4_taller.html#L4727), [inicio de arrastre](../../juego4_taller.html#L5774), [entrega al contenedor](../../juego4_taller.html#L5816), [validación](../../juego4_taller.html#L5842).
- Hay dos rutas que deberían efectuar la misma operación, pero usan contratos diferentes. El toque escribe `selectedWaste` y pasa `bin.dataset.bin`; el arrastre escribe `selectedWasteItem` y pasa el elemento DOM completo.
- Reproducción mediante los handlers reales `pointerdown`, `pointermove` y `pointerup`, con tarjeta y destino de geometría simulada:
  - Arrastrar directamente: `selectedWaste=null`, `selectedWasteItem='filter'`; se solicita seleccionar un residuo y se confinan cero elementos.
  - Con selección previa válida: se compara el identificador esperado con un objeto DOM; se descuenta 40 puntos y 5 segundos aun soltando sobre el contenedor correcto.
- Además, el arrastre consulta `confined` y añade `selected`/`drag-over`, mientras el resto del código y CSS utilizan `is-confined`, `is-active` y `drop-target-hover`.
- `pointercancel` usa la misma rutina que una entrega válida: al reparar el contrato también debe evitarse que cancelar un gesto ejecute una operación.
- Corrección mínima: una selección canónica `selectedWaste`; pasar siempre el ID del contenedor; unificar clases; cancelar sin depositar y rechazar elementos ya confinados.
- Aceptación: el mismo residuo/destino produce idéntico resultado por toque y arrastre; un gesto cancelado no cambia score, tiempo ni inventario.

### R20 · P1 · Incendio certifica acciones realizadas automáticamente por el código

- Referencias: [equipExtinguisher](../../juego5_emergencias.html#L4656), [interacción de fuego](../../juego5_emergencias.html#L4767), [manta automática](../../juego5_emergencias.html#L4828).
- Tomar el extintor activa alarma/corte y retira el pasador automáticamente. Tocar el fuego sin extintor lo equipa automáticamente. Tocar el fuego ya apagado asigna `blanketEquipped=true` y sella, aunque nunca se visitara la estación de manta.
- Reproducción aislada con Nomex/ERA equipado y el resto sin resolver: cuatro llamadas de interacción sobre `fire` dejan intensidad 0, alarma activada, extintor PQS equipado y pasador retirado, pero sin manta. La quinta llamada produce victoria y marca la manta y el sellado.
- Resultado observado: una victoria con `mission1Completed=false` y sin recoger la manta. La misión 1 independiente puede ser una decisión de producto; la atribución de pasos no realizados contradice el propio recorrido de Incendio.
- El mensaje final también afirma selección de PQS y descarte de agua aunque el jugador pudiera haber usado CO2 o no haber evaluado el distractor.
- Corrección mínima: separar adquisición, preparación y uso; exigir precondiciones en el método que cambia el estado. La guía puede orientar o trasladar al jugador, pero no atribuirle decisiones que no tomó.
- Aceptación: no se descarga sin extintor preparado ni se sella sin manta obtenida; el informe describe el agente realmente usado y las acciones realmente ejecutadas.

### R21 · P2 · Un callback de Trasiego sigue operando después del cierre

- Referencias: [transición diferida](../../juego3_trasiego.html#L4468), [auditoría sin guarda de cierre](../../juego3_trasiego.html#L4565).
- Al terminar un equipo se programa una transición de 1600 ms. No se cancela ni comprueba el estado de la partida al ejecutarse. El cierre por tiempo puede adelantarse a esa transición.
- Reproducción aislada: completar el último equipo, cerrar por agotamiento de reloj y ejecutar después el callback pendiente.
- Resultado observado: dos reportes LMS, primero con `vehiclesCompleted=3` y después con `vehiclesCompleted=4`, ambos con el mismo score. Con equipos intermedios puede reconstruirse la escena detrás de la auditoría.
- Corrección mínima: registrar un equipo completado de inmediato, separar ese hecho de la animación y bloquear todo callback cuyo intento ya terminó. Una generación/ID de intento y un cierre idempotente son suficientes; no se necesita un framework.
- Aceptación: timeout, acierto final y callbacks pendientes concurrentes producen exactamente un resultado y no modifican el siguiente intento.

### R22 · P1 · Trasiego y Taller muestran certificación aun con 0 %

- Referencias: [veredicto estático de Trasiego](../../juego3_trasiego.html#L2123), [veredicto estático de Taller](../../juego4_taller.html#L3461).
- `final-audit-verdict` y `final-audit-sub` solo aparecen en el HTML inicial: la auditoría no actualiza el texto “INSPECTOR MASTER” ni la afirmación de haber inspeccionado cuatro frentes.
- `audit-headline` y `audit-subheadline` también son estáticos: “Técnico de Mantenimiento Certificado” y “Cumplimiento total” permanecen ante cualquier resultado.
- La ejecución aislada de auditoría con score cero confirma la nota 0 %; la inspección de referencias demuestra que esos titulares no se reemplazan.
- Corrección mínima: construir veredicto, subtítulo, iconografía y detalles desde el mismo objeto de resultado enviado al LMS. Mostrar pendientes concretos ante reprobación.
- Aceptación: cero acciones, aprobación parcial y cumplimiento total muestran veredictos diferentes y coherentes con SCORM.

### R23 · P2 · El tiempo informado por Trasiego no representa tiempo empleado

- Referencias: [inicio en 70 s](../../juego3_trasiego.html#L4074), [cálculo final desde 120](../../juego3_trasiego.html#L4572).
- Reproducción aislada: auditar inmediatamente con `timeLeft=70` produce **00:50 min**, aunque no haya transcurrido tiempo.
- Las bonificaciones y penalizaciones también alteran el tiempo restante, de modo que ni reemplazar 120 por 70 corrige por completo la métrica de duración real.
- Corrección mínima: conservar inicio y fin de intento para duración; mantener por separado presupuesto restante y ajustes arcade.
- Aceptación: inicio inmediato informa 0 s; una penalización cambia presupuesto pero no inventa segundos de duración. Una bonificación tampoco reduce lo ya jugado.
- Los relojes que descuentan uno por callback también deben revisarse frente a suspensiones/throttling: contar callbacks no mide de forma fiable tiempo real. No se probó la suspensión de navegador en esta sesión.

### R24 · P2 · El FPS no limpia entradas al perder foco

- Referencia: [bindKeyboardControls](../../juego5_emergencias.html#L4285).
- `keydown` deja una marca y solo `keyup` la retira. No hay limpieza de `keysPressed` en `blur` ni `visibilitychange`.
- Prueba aislada: después de `KeyW`, el estado permanece `true`; los únicos listeners relevantes registrados son `keydown` y `keyup`, sin recuperación por pérdida de foco.
- Riesgo concreto: si el usuario cambia de ventana antes de soltar la tecla y el juego no recibe `keyup`, el movimiento puede continuar al volver.
- Corrección mínima: vaciar entradas al perder foco/ocultarse, cerrar gestos activos y decidir explícitamente si el reloj continúa o se pausa.
- Aceptación pendiente en navegador: mantener W, cambiar de ventana, soltarla y volver no mueve al jugador sin nueva entrada.

### R25 · P2 · Cambiar de zona durante un movimiento actualiza el avatar equivocado

- Referencia: [moveAvatarTo](../../juego4_taller.html#L5030).
- El método elige el avatar al empezar, pero su `onComplete` decide qué coordenadas guardar leyendo el `currentZone` de ese momento. Las pestañas permiten cambiar de zona mientras dura la animación.
- Reproducción con callback real de GSAP capturado: comenzar en Vestidor hacia `(110,160)`, cambiar a Patio y completar la animación.
- Resultado observado: Vestidor conserva `(250,250)`, Patio recibe `(110,160)` y se ejecuta el callback de la operación anterior.
- Corrección mínima: capturar la zona de origen y validar que zona/intento sigan vigentes antes de ejecutar la operación; cancelar la animación y sus efectos al abandonar la zona.
- Aceptación: alternar escenas durante desplazamiento o reiniciar no transporta coordenadas ni abre estaciones del escenario anterior.

## Qué se puede corregir y cómo comprobarlo

La causa compartida es la separación entre guía visual, puntuación arcade, estado operativo e informe final. Un texto que indica “paso pendiente” no impide que otra ruta certifique el éxito. La corrección debe estar en el método que realiza la acción, además de reflejarse en los controles.

| Componente | Cambio concreto mínimo | Criterio de aceptación |
| --- | --- | --- |
| Resultado de cada juego | Calcular score, requisitos obligatorios, aprobado y desglose juntos; usar ese resultado en UI y LMS | El mismo intento siempre tiene el mismo veredicto visible y SCORM |
| SGA | Bloqueo de respuesta por pregunta; reinicio completo de subfase; callbacks ligados al intento | Doble clic/Enter no responde un caso oculto y reintentar empieza en el estado inicial |
| Bodega | Inventario completo como condición de certificación; conservar crédito parcial como diagnóstico | Falta de ACPM nunca certifica una bodega completa; solución válida completa sigue dando 100 % |
| Trasiego | Cobertura 4/4 independiente de racha; registro inmediato de hitos; cierre único; duración real | Dos equipos no aprueban; los cuatro completos sí pueden aprobar; un único reporte aun al vencer el tiempo |
| Taller | EPP y checkpoint vigentes para operar; premios únicos; RESPEL obligatorio; contrato único de drag/tap; movimiento ligado a zona | No se fabrican puntos, no se opera sin autorización, ambas entradas segregan igual y cambiar de escena no filtra acciones |
| Emergencias | Validar pasos reales en ambas misiones; un intervalo; cambio de misión con política de intento; daño independiente del movimiento; física por tiempo | No se gana omitiendo válvula/lavaojos/manta; no se restaura salud con pestañas; frecuencia de pantalla no cambia velocidad |
| LMS | Preservar estados previos cuando corresponde; comprobar retorno de escrituras/commit; cerrar una sola vez | Revisitar un aprobado no lo degrada silenciosamente y una escritura rechazada no se presenta como guardada |
| UX y accesibilidad | Veredictos reales, teclado equivalente, foco de modales y limpieza al perder foco | Recorrido completo por teclado y resultado coherente para cero, parcial y total |
| Distribución | Resolver requisito offline, empaquetar recursos necesarios y reconstruir ZIP después de validar | El paquete probado contiene exactamente la versión corregida y funciona en las condiciones de red acordadas |

No se necesita migrar a React, crear un backend ni reescribir los cinco juegos para corregir estos defectos funcionales. Se pueden mantener los HTML y aplicar cambios pequeños a sus controladores. La garantía de evaluación resistente a manipulación deliberada del JavaScript del cliente es un objetivo distinto que no queda resuelto por estas correcciones locales.

## Decisiones que deben fijarse antes de alterar las reglas

1. **Entrenamiento o evaluación:** en entrenamiento se pueden permitir reintentos sin penalización; en evaluación hay que definir si cuenta la primera respuesta, la mejor o el resultado tras ayudas. SGA actualmente otorga todos los puntos de rotulado al terminar aunque se hayan probado pictogramas incorrectos. Eso puede ser intencional; no se calificó como bug sin definir el modo.
2. **Resultado de Emergencias:** hay dos misiones seleccionables e independientes, pero un solo SCO y un único score. Cada cierre sobrescribe el resultado anterior; no hay agregación de misión 1 y 2. Definir si basta una misión, se exigen ambas o se publican como SCO separados antes de cambiar el cálculo.
3. **Tiempo, pausas y penalizaciones:** fijar presupuestos por juego y conducta al ocultar la pestaña. Los actuales valores documentados difieren del código. Mantener separadas duración real, presupuesto y ajustes.
4. **Repetición LMS:** decidir si se conserva mejor nota, último intento o la política del LMS. No introducir una política distinta unilateralmente desde el puente.
5. **Escenario SST y offline:** concretar productos/FDS y condiciones operativas; confirmar si una conexión externa es admisible. Las correcciones de sintaxis/estado no validan esas decisiones de contenido.

## Secuencia de trabajo propuesta, una responsabilidad por bloque

1. **Trasiego: resultado fiable** — R01, R21, parte de R22 y R23. Nota por cumplimiento, cierre único, veredicto y duración coherentes; sin tocar los otros juegos.
2. **Taller: resultado y autorización** — R02–R04 y su parte de R22. Después, en bloques propios, reparar arrastre R19 y movimiento R25.
3. **Emergencias: transiciones y precondiciones** — R05, R06, R11 y R20. Después física/exposición/entradas R13, R14 y R24.
4. **SGA: respuestas y reinicio** — R07, R08. Después Bodega: requisito de inventario R09.
5. **Integración y calidad transversal** — umbral R10, persistencia R12, validación SST R15, accesibilidad R17, offline R16 y sincronización documental R18.

Para cada bloque: reproducir primero el caso negativo, aplicar la corrección mínima, verificar el caso negativo y el recorrido válido, actualizar memoria/documentación y reconstruir paquetes solo cuando ese bloque quede validado. Las pruebas de navegador y Moodle siguen pendientes: se comprobó nuevamente que el inventario de navegadores conectado está vacío.
