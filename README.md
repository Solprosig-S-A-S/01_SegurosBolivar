# Suite Arcade de Seguridad Química - Seguros Bolívar

> Reglas vigentes: [contrato de evaluación y correcciones](docs/CORRECCIONES_2026-10-22.md). Entrenamiento con reintentos, aprobación desde 80 % y todos los hitos obligatorios. Escenarios didácticos: el resultado no acredita cumplimiento legal ni reemplaza las FDS reales y la evaluación SST.

Plataforma interactiva de micro-juegos de entrenamiento técnico y prevención del riesgo químico en obras y operaciones industriales, desarrollada bajo los lineamientos de la **Resolución 773 de 2021**, **Decreto 1496 de 2018**, **Decreto 1079 de 2015** y **Decreto 4741 de 2005**.

---

## 🎮 Catálogo de Juegos

### 1. Desafío SGA: Clasificación de Peligros y FDS (`juego1_sga.html`)
- **Documentación Exclusiva**: [📖 `docs/juegos/01_juego1_sga.md`](docs/juegos/01_juego1_sga.md)
- **Objetivo**: Identificar los pictogramas SGA correctos para sustancias químicas de obra utilizando su Ficha de Datos de Seguridad (FDS).
- **Mecánicas**:
  - Tutorial guiado paso a paso con el avatar *Bolívar Safety Bot*.
  - Tres niveles: marco legal, seis casos de familias y rotulado de tres envases más seis consultas FDS, sin reloj de examen.
  - Interacción táctil fluida (Drag & Drop con física de arrastre y Tap-to-Select).
  - Modal interactivo con las 16 secciones oficiales de la FDS (énfasis en Secciones 2 y 8).
  - Informe pedagógico final y opción de re-inspección de errores.

### 2. Bodega Segura: Puzzle Isométrico 2.5D (`juego2_bodega.html`)
- **Documentación Exclusiva**: [📖 `docs/juegos/02_juego2_bodega.md`](docs/juegos/02_juego2_bodega.md)
- **Objetivo**: Organizar una matriz de almacenamiento 3x3 garantizando la compatibilidad química y evitando reacciones peligrosas.
- **Mecánicas**:
  - Perspectiva 2.5D isométrica renderizada con CSS 3D Transforms puro.
  - Validación en vivo de 12 conexiones ortogonales (haces luminosos verdes de compatibilidad o rojos de alerta estroboscópica).
  - Zona de Rechazo y RESPEL para detección y descarte de reenvases prohibidos en botellas de gaseosa (Art. 20 Res. 773/2021).
  - Matriz interactiva de compatibilidad química y reporte de auditoría técnica con consecuencias de mezclas peligrosas.

### 3. Inspector de Trasiego: Inspección de Campo y Corrección de Riesgos (`juego3_trasiego.html`)
- **Documentación Exclusiva**: [📖 `docs/juegos/03_juego3_trasiego.md`](docs/juegos/03_juego3_trasiego.md)
- **Objetivo**: Detectar e intervenir riesgos de ignición, electrostática, derrames e incendios en el punto de trasiego de combustibles de obra mediante Drag & Drop y Tap-to-Place.
- **Mecánicas**:
  - Zona A: camión cisterna y cuatro equipos secuenciales; seis medidas por equipo: cuñas, tierra, motor, bandeja, kit y extintor.
  - Zona B: tarjetas de acción con selección por puntero o teclado y validación de secuencia.
  - Feedback normativo en tiempo real: Confirmación técnica de la medida preventiva con respaldo legal (Dec. 1079/2015, Dec. 4741/2005, Ley 55/1993 y Res. 773/2021).
  - Presupuesto inicial de 70 s y bonificación de 8 s por equipo; aprobación requiere 4/4 equipos. Racha y nota se calculan por separado.

### 4. Taller Seguro: Desafío Isométrico de Equipamiento y Mantenimiento (`juego4_taller.html`)
- **Documentación Exclusiva**: [📖 `docs/juegos/04_juego4_taller.md`](docs/juegos/04_juego4_taller.md)
- **Objetivo**: Superar el filtro de equipamiento EPP para solventes y vapores (Res. 773/2021) y ejecutar 3 tareas de mantenimiento con segregación técnica de residuos peligrosos (Dec. 4741/2005).
- **Mecánicas**:
  - Zona 1 (El Vestidor): Casilleros interactivos con panel EPP y Checkpoint de seguridad con escaneo biométrico y bloqueo en tiempo real ante faltantes.
  - Zona 2 (Patio de Taller): Control Tap-to-Move para desplazamiento del avatar por baldosas en perspectiva isométrica 2.5D.
  - Barra HUD de Control y Cámara: Botón de cambio de escenario inmediato (`#btn-toggle-scene`), traslación direccional (`[⬅️]`, `[➡️]`, `[⬆️]`, `[⬇️]`), botón `[🎯 Centrar]`, alternancia de perspectiva `[📐 3D]`, zoom y arrastre táctil / mouse.
  - 3 Tareas Operativas: Desengrase de piezas mecánicas, cambio de filtro y aceite lubricante, y segregación técnica de residuos (filtros, trapos con grasa y aceite usado en estiba).
  - Desafío de 90 s con autorización EPP, premios únicos y cuatro residuos aleatorios. Informe calculado desde las operaciones realizadas.

### 5. Brigada de Emergencia: Simulador 1ª Persona de Control de Derrames (`juego5_emergencias.html`)
- **Documentación Exclusiva**: [📖 `docs/juegos/05_juego5_emergencias.md`](docs/juegos/05_juego5_emergencias.md)
- **Objetivo**: Controlar una fuga química activa y descontaminar el área mediante un simulador en Primera Persona (FPS / First-Person POV) con visera de casco, manos en pantalla y respuesta técnica a emergencias (Dec. 1072/2015, Res. 773/2021 y Dec. 4741/2005).
- **Mecánicas**:
  - Vista 100% en Primera Persona: Campo de visión directo desde los ojos del brigadista con marco perimetral de visera y HUD digital (detector PID de gases, cronómetro de crisis de 120s y monitor de vitalidad/O2).
  - Manos en 1ª Persona (First-Person Hands Layer): Brazos interactivos que ejecutan giros de válvula, postura de guantes, despliegue de cordones y paños, accionamiento de lavaojos y embolse RESPEL.
  - Navegación Panorámica 360°: Control libre de rumbo (Yaw) mediante arrastre táctil/ratón y brújula cardinal hacia los 6 sectores de la planta.
  - 4 Hallazgos Ocultos de Auditoría SST: Inspección de extintor vencido (NFPA 10), reenvase no rotulado (Res. 773), FDS faltante (Ley 55) y aceite sin estiba (Dec. 4741).
  - Derrame (120 s) seguido de Incendio (90 s), ambos obligatorios. Solo al completar las dos misiones se envía la nota promedio al SCO; no constituye certificación operativa.

---

## ⚙️ Tecnologías y Arquitectura

- **Arquitectura**: Single File HTML5/JS autocontenido, ejecutable directamente en el navegador sin dependencias ni empaquetadores.
- **Estilos**: Sistema de diseño nativo en CSS puro con variables `:root` corporativas (Verde Bolívar `#006738`, Amarillo `#FFC72C`) y escala tipográfica ergonómica (13px a 30px). Cero dependencias de frameworks externos como Tailwind.
- **Audio**: Web Audio API nativa para síntesis en tiempo real de tonos, alertas y fanfarrias sin necesidad de archivos de audio externos.
- **Recursos offline**: fuentes, Font Awesome 6.4.0 y GSAP 3.12.2 incrustados en los HTML; sin peticiones a CDN. Procedencia en [THIRD_PARTY_ASSETS.md](docs/THIRD_PARTY_ASSETS.md).
- **Accesibilidad**: teclado para acciones principales, foco de diálogos y movimiento reducido. La comprobación visual y con lector de pantalla sigue pendiente.

Validación de lógica y distribución: `node --test tests/game_regressions.cjs` y, después de regenerar ZIP, `python tools/verify_games.py`.

---

## 🚀 Instrucciones de Uso

### Modo Web Local / Standalone
Abra cualquiera de los archivos `.html` directamente en Google Chrome, Microsoft Edge, Mozilla Firefox o Safari:
- `juego1_sga.html`
- `juego2_bodega.html`
- `juego3_trasiego.html`
- `juego4_taller.html`
- `juego5_emergencias.html`

### Modo Moodle LMS (Paquetes SCORM 1.2)
> 📄 **Guía Paso a Paso para Administradores de Moodle**: [`docs/GUIA_INTEGRACION_MOODLE.md`](docs/GUIA_INTEGRACION_MOODLE.md)
Toda la suite incluye integración nativa con Moodle a través de **`BolivarLmsBridge`** y paquetes SCORM 1.2 listos para subir:
1. Suba los archivos `.zip` ubicados en `scorm_packages/` como actividades de tipo **Paquete SCORM** en su curso de Moodle.
2. Moodle registrará automáticamente las calificaciones en el **Libro de Calificaciones (Gradebook)**.
3. Para regenerar los paquetes tras cualquier cambio en el código, ejecute:
```powershell
python build_scorm.py
```

