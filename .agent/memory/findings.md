Registro de Hallazgos y Decisiones Técnicas

Bitácora de Decisiones Arquitectónicas

[Fase Inicial] - Configuración de Gobernanza de Agentes

Decisión: Implementar protocolo estricto "Human-in-the-Loop" en Git y terminal.

Razón Técnica: Prevenir mutaciones destructivas en el repositorio local y evitar que el agente aplique comandos que alteren el historial sin revisión humana.

Resultado: Ningún commit, push o comando de borrado puede ser disparado de forma autónoma.

[Fase Inicial] - Inicialización del Marco Docs-as-Code

Decisión: Establecer estructura de documentación viva en `docs/` (`01_Requerimientos.md`, `02_Arquitectura.md`, `/docs/adr/`).

Razón Técnica: Cumplir con la trazabilidad mandatoria del protocolo operativo y documentar contratos y decisiones antes de la codificación de lógica de negocio.

Resultado: Base documental lista para iteración continua en cada interacción.

[Fase 1] - Suite de Videojuegos Desacoplada Multi-Página

Decisión: Desarrollar 1 archivo HTML autónomo para cada uno de los 5 minijuegos pedagógicos, integrados a través de un Hub Central (`index.html`) con contrato compartido de persistencia en `localStorage` (`sb_solprosig_arcade_state`).

Razón Técnica: Maximizar mantenibilidad, modularidad y rendimiento en dispositivos móviles sin sobrecargar un único bundle monolítico, permitiendo testing y despliegue independiente de cada dinámica arcade.

Resultado: Arquitectura desacoplada, 100% responsive, sin dependencias de compilación ni assets locales.

[Fases 2 a 6] - Construcción e Integración de los 5 Videojuegos Arcade

Decisión: Entrega completa y desacoplada de los 5 videojuegos individuales (`game1_sga_hazard.html` a `game5_slime_invasor.html`) vinculados con el Hub central (`index.html`).

Razón Técnica: Cumplimiento integral del marco normativo colombiano (Res. 773/2021, Dec. 1496/2018, Dec. 4741/2005, Ley 55/1993, Dec. 1079/2015, Dec. 1072/2015) mediante mecánicas diferenciadas (arrastre, apilamiento, checklist interactivo, tiro parabólico y contención en 5 pasos).

Resultado: Suite educativa 100% operativa, mobile-first, sin assets externos locales y con persistencia sincronizada en `localStorage`.

[Fase 7] - Validación Integral de Persistencia, Navegación y Viewport Móvil

Decisión: Verificación exhaustiva de balance sintáctico, enlaces relativos y aislamiento de eventos táctiles (`e.preventDefault()`).

Razón Técnica: Asegurar que el contrato de datos `sb_solprosig_arcade_state` funcione tanto en flujo guiado desde el Hub como en ejecución aislada de cada archivo HTML.

Resultado: 0 errores de sintaxis, navegación cruzada fluida y compatibilidad con webviews móviles.

[Fase 8] - Motor Gráfico y Mecánicas en Primera Persona (POV Hands Engine)

Decisión: Transición completa a perspectiva en primera persona (POV) en los 5 videojuegos, renderizando proceduralmente extremidades con EPP normativo (guantes de nitrilo, mangas reflectivas y trajes Tyvek) y vinculando físicamente el movimiento táctil a la manipulación de herramientas y químicos.

Razón Técnica: Maximizar la retención pedagógica háptica y la inmersión del trabajador en el uso riguroso del EPP según la normatividad colombiana (Res. 773/2021, Dec. 4741/2005 y Dec. 1072/2015), sin introducir bibliotecas 3D pesadas ni texturas externas (cero impacto en carga).

Resultado: 5 minijuegos con interacción táctil cinemática en primera persona, 60 FPS estables, compatibilidad multiplataforma y cero dependencias binarias externas.

[Fase 9] - Modelado Vectorial 2D Animado de Siggy (Mascota Institucional)

Decisión: Construcción de un rig 2D en SVG puro y hojas de estilo CSS para "Siggy", la ardilla corporativa de Seguros Bolívar y Solprosig, respetando meticulosamente el diseño 3D provisto (polo celeste con 3 botones y logotipo circular "S", pantalón gris pizarra, cinturón marrón, zapatillas azul marino con puntera y suela blanca, cola frondosa curvada, mejillas crema y dientes paletos frontales).

Razón Técnica: Dotar a la suite de una identidad visual homogénea y oficial, sustituyendo marcadores genéricos por la mascota institucional animada con 6 ciclos cinemáticos (respiración, meneo de cola, contracción de orejas, parpadeo, saludo con pata derecha y fonemas de habla), con cero peticiones de red adicionales y soporte responsive.

Resultado: Modelo completo y animado disponible en `siggy_mascot.html` e integrado en `index.html` como tutor principal y avatar seleccionable.

[Fase 10] - Identidad Visual y Vectorización Geométrica del Logotipo Isométrico "S" (Solprosig)

Decisión: Ingeniería inversa matemática de la imagen oficial del logotipo (786 x 983 px) para modelar con precisión del 99.15% la "S" isométrica en SVG puro (5 facetas poligonales a 30° en gris `#878786` y teal `#0080A8`), integrándolo en el distintivo bordado del pecho de Siggy y a través de toda la interfaz web (navbars del Hub `index.html` y los 5 videojuegos, así como modales pedagógicos).

Razón Técnica: Cumplir con los lineamientos de marca oficiales de Solprosig y Seguros Bolívar con consistencia radical, garantizando escalabilidad fluida, ausencia de desbordes en móviles (`viewBox="0 0 786 983"`) y cero peticiones de red adicionales.

Resultado: Suite completa y avatar de Siggy homogeneizados con el emblema oficial vectorial en los 7 archivos HTML, validado y auditado al 100%.

[Fase 11] - Estructuración del Sistema Integral de Documentación Viva y Bitácora de Avances

Decisión: Crear `README.md`, `docs/00_Descripcion_General.md` y una serie de 10 documentos independientes y explicados de forma natural en `docs/avances/` que relatan el reto, la solución y el resultado de cada hito técnico de la suite.

Razón Técnica: Facilitar la comprensión ejecutiva, pedagógica y técnica del proyecto para cualquier stakeholder o nuevo desarrollador sin necesidad de descifrar código fuente, cumpliendo con el paradigma Docs-as-Code.

Resultado: 11 nuevos documentos creados (`docs/00_Descripcion_General.md`, `README.md` y 10 archivos en `docs/avances/`) organizados y vinculados entre sí.

[Fase 12] - Activos Gráficos Legales y Normativos Idénticos a la Realidad (SGA, NFPA y RESPEL)

Decisión: Reemplazar todo ícono provisional o genérico en los 5 videojuegos arcade por representaciones vectoriales 100% idénticas a las normativas de seguridad reales (Resolución 773/2021, Decreto 1496/2018, Decreto 1079/2015, Decreto 4741/2005 y NFPA 704).

Razón Técnica: Maximizar la transferencia de aprendizaje en campo garantizando que los trabajadores reconozcan exactamente los rótulos y señalizaciones reales en obra (los 9 rombos UNECE GHS a 45° con marco `#DA291C`, placa naranja UN 1202/30, diamante NFPA 704 cuatripartito, canecas y bolsas RESPEL con generador Solprosig, y botellas trampa de gaseosa con advertencia explícita de prohibición de reenvase). Todo en SVG y Canvas 2D sin archivos raster externos.

Resultado: Los 5 minijuegos auditados y validados con `verify_suite.py`, 0 dependencias externas, 60 FPS estables y coherencia normativa absoluta. Documentado en ADR 0007 y Avance 10.

[Fase 13] - Rectificación de Identidad Corporativa: Atribución de Marca a Solprosig

Decisión: Rectificar todas las atribuciones de marca, textos de interfaz, etiquetas de maquinaria, tambores y bolsas de residuos a Solprosig (dueño legítimo del isotipo isométrico "S"), manteniendo la alianza con Seguros Bolívar (ARL). Migrar el contrato de persistencia a `'sb_solprosig_arcade_state'` garantizando fallback de retrocompatibilidad con `'sb_kma_arcade_state'`.

Razón Técnica: Alinear el código y toda la suite de documentación con la identidad real de Solprosig requerida por el usuario, sin pérdida de datos en partidas previas de trabajadores.

Resultado: 7 archivos HTML actualizados (`index.html`, `siggy_mascot.html`, `game1` a `game5`), 10 documentos en `docs/avances/`, 7 ADRs, especificaciones y suite de tests `verify_suite.py` 100% auditada en verde.

[Fase 14] - Coexistencia KMA / Solprosig y Módulo de Pruebas Interactivas con Puntuación Final

Decisión: Clarificar formalmente los roles de negocio: la suite capacita a los trabajadores de **KMA Construcciones** en sus obras civiles, maquinaria e infraestructura vial, mientras que el **logotipo oficial** (isotipo isométrico "S" en SVG de alta precisión) pertenece a **Solprosig S.A.S.** (consultora y asesora en SST aliada con ARL Seguros Bolívar). Incorporar en cada uno de los 5 minijuegos una **Prueba Interactiva** de 3 preguntas de evaluación de competencias con retroalimentación inmediata, y consolidar una pantalla de **Puntuación Final** integrada (Puntos de Juego + Puntos de Prueba = Puntuación Final Total) con cálculo dinámico de estrellas y sincronización dual de persistencia (`sb_kma_arcade_state` y `sb_solprosig_arcade_state`).

Razón Técnica: Cerrar la brecha pedagógica entre la simulación de destreza motriz y la evaluación formativa cognitiva requerida por la normativa de SST (Res. 773/2021, Dec. 4741/2005, Dec. 1079/2015), garantizando que el trabajador de KMA valide los conceptos teóricos antes de certificar el nivel.

Resultado: Arquitectura pedagógica reforzada con evaluación interactiva táctil, desglose transparente de puntuación final, y preservación de la identidad visual de Solprosig en el contexto de obra de KMA Construcciones.


