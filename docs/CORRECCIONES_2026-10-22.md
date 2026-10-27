# Contrato vigente de evaluación y correcciones — 2026-10-22

Este documento fija las reglas aceptadas por el usuario para los cinco juegos y sustituye los cálculos y recorridos anteriores descritos en la documentación histórica. El informe de revisión conserva los casos originales para trazabilidad; sus referencias a líneas corresponden al código previo a las correcciones.

## Reglas aceptadas

- Entrenamiento con reintentos completos. SGA permite corregir el rotulado; no se interpreta como examen por primera respuesta.
- Aprobación desde 80 %, con todos los hitos obligatorios. Los puntos arcade o las ayudas no sustituyen requisitos pendientes.
- Un único resultado final por intento, con el mismo criterio en pantalla y en el puente LMS.
- Emergencias requiere Derrame e Incendio, en ese orden. Solo al completar ambas se reporta el promedio de sus notas al único SCO. Una misión aislada no aprueba la actividad.
- El presupuesto temporal continúa mientras la pestaña está oculta. Se mide tiempo transcurrido, no número de callbacks. Las bonificaciones/penalizaciones modifican el presupuesto, no la duración informada.
- Revisitar una actividad no escribe `incomplete` sobre un estado terminado. En modo `review`/`browse` no se envían nuevas calificaciones. En modo normal se reporta el intento actual; la agregación entre intentos corresponde a la configuración del LMS.

## Comportamiento actual por juego

| Juego | Recorrido y tiempo | Evaluación |
| --- | --- | --- |
| SGA | Marco legal, seis casos de familias, tres envases con varios pictogramas y seis casos FDS. Sin reloj de examen | Cobertura de todas las fases antes del cierre; puntaje por aciertos; feedback bloquea doble respuesta |
| Bodega | Tutorial y tablero de 120 s; alerta de riesgo de 18 s | Inventario legal completo, botella rechazada, sin incompatibilidades ni infracciones A3/C1 para poder aprobar; score incompleto limitado a 79 |
| Trasiego | Cuatro equipos, seis medidas por equipo; 70 s iniciales y +8 s por equipo, hasta 100 s restantes | Porcentaje de equipos completamente inspeccionados: 0, 25, 50, 75 o 100 %. Las rachas son arcade. Solo 4/4 satisface el umbral |
| Taller | 90 s; EPP, checkpoint, desengrase, mantenimiento y cuatro residuos aleatorios | Máximo habitual 610: EPP 100, checkpoint 100, tareas 170 y residuos 240. Cada EPP/checkpoint se premia una sola vez. Incumplimientos obligatorios limitan score a 79 |
| Emergencias | Derrame 120 s y después Incendio 90 s | Todos los hitos de ambas misiones; promedio de notas de misión; fallo terminal reporta 0 y ofrece reinicio |

El arrastre y el toque en Taller usan `selectedWaste` y un ID string de contenedor. Cancelar un gesto no deposita residuos. La autorización del checkpoint se revoca al modificar EPP y se comprueba también en los métodos que realizan las tareas.

En Incendio son acciones distintas: equipar protección, activar alarma/corte, seleccionar extintor, retirar pasador, descargar, recoger manta y completar el paso final del escenario. No se activan automáticamente al tocar las llamas. El informe muestra el agente realmente seleccionado.

## Estado de los 25 hallazgos

| Hallazgo | Corrección técnica |
| --- | --- |
| R01 | Nota de Trasiego basada en equipos completos, independiente de racha |
| R02 | Premios únicos por EPP y checkpoint; residuos ya confinados no vuelven a puntuar |
| R03 | Patio y métodos de operación comprueban autorización/EPP vigente |
| R04 | Divisor real y requisito de las tres tareas de Taller |
| R05 | Cierre de misión valida válvula, asistencia, EPP, kit, contención y residuos |
| R06 | Pestañas no reinician recursos de una misión activa; avance controlado entre misiones |
| R07 | Bloqueo de respuesta y botones FDS deshabilitados durante feedback |
| R08 | Reinicio restaura subfase 3A y descarta callbacks del intento previo |
| R09 | Inventario incompleto impide aprobar Bodega; crédito parcial permanece formativo |
| R10 | Aprobación visual y SCORM usan 80 % |
| R11 | Un solo intervalo de crisis, cancelado al cerrar/cambiar misión |
| R12 | Estado LMS previo preservado; review/browse sin escritura; retornos comprobados y reintento de guardado explícito |
| R13 | Desplazamiento/rotación por delta temporal y diagonal normalizada |
| R14 | Exposición evaluada en física y reloj aunque el jugador permanezca quieto |
| R15 | Alcance ficticio explícito, retiradas afirmaciones de protección absoluta, de tratamiento exitoso no medido y de barrera física por extintor; validación profesional SST pendiente |
| R16 | Fuentes, iconos y GSAP existentes incrustados; sin recursos remotos de ejecución |
| R17 | Teclado para acciones principales, nombres accesibles, foco/retorno/trampa de diálogos, feedback anunciado y reducción de movimiento; auditoría real de lector/contraste/táctil pendiente |
| R18 | Contrato vigente, instrucciones de validación y documentación funcional sincronizados |
| R19 | Selección, ID de destino y clases del arrastre RESPEL unificados; cancelación sin operación |
| R20 | Retirados alarma, selección, pasador y manta automáticos; precondiciones reales de misión |
| R21 | Hito registrado antes de animación, cierre idempotente y callbacks ligados al intento |
| R22 | Veredictos finales de Trasiego/Taller calculados desde cumplimiento; sin certificación estática para 0 % |
| R23 | Duración de Trasiego obtenida de inicio/fin reales; presupuesto independiente |
| R24 | Teclas y gesto de mirada limpiados al perder foco |
| R25 | Movimiento ligado a zona e intento; cambio de escena invalida callback anterior |

## Recursos, distribución y contratos técnicos

Los cinco HTML mantienen ejecución autónoma sin instalar dependencias. `tools/bundle_offline.py` integró las versiones que ya se usaban: Font Awesome 6.4.0, GSAP 3.12.2 y fuentes de Google Fonts. Los hashes/procedencia están en [THIRD_PARTY_ASSETS.md](THIRD_PARTY_ASSETS.md); se conservan avisos upstream. Incrustar fuentes incrementa el tamaño de los HTML/ZIP frente a referencias CDN.

`tools/accessibility_runtime.html` es la fuente del bloque `BEGIN GAME ACCESSIBILITY` incrustado en cada HTML. Al modificarlo deben sincronizarse las cinco copias antes de regenerar los ZIP. `BolivarLmsBridge` conserva idéntico contrato en las cinco copias: `reportCompletion(score, details)` devuelve `{score, passed, saved}`; `saved=null` indica modo autónomo sin API SCORM, `false` indica ausencia de confirmación de guardado o modo de revisión.

Los nombres internos heredados `healthO2` y `buffer` se conservan para evitar una refactorización ajena al arreglo. Representan vitalidad ficticia y recursos neutros del puzzle, respectivamente: no son mediciones atmosféricas ni barreras constructivas.

## Validación reproducible

```powershell
node --test tests/game_regressions.cjs
python build_scorm.py
python tools/verify_games.py
git diff --check
```

Las pruebas ejecutan métodos y handlers reales en Node `vm` con dobles de DOM/audio/tiempo. Cubren caminos negativos, recorridos válidos, SCORM 1.2/2004, guardado rechazado, foco/teclado y comparación 60/120 Hz. El verificador comprueba sintaxis de todos los scripts, IDs iniciales, ausencia de recursos remotos, XML bien formado y coincidencia de fuentes con los seis ZIP.

No sustituyen un navegador real, validación XSD/SCORM formal ni Moodle. La sesión no dispone de navegador conectado: quedan pendientes pantallas móvil/desktop, gestos físicos, audio, fullscreen, lector de pantalla, contraste y LMS real. Tampoco se ha validado cada afirmación normativa/FDS por un profesional SST; la aplicación se identifica como material didáctico y no como acreditación legal.
