# 02. Arquitectura de Software - Suite de Micro-Juegos Seguros Bolívar

## 1. Visión General de la Arquitectura
La suite se diseñó bajo una filosofía de **cero dependencias de empaquetado** y **máxima portabilidad offline** (Self-Contained Single File HTML/JS). Cada juego puede ejecutarse de manera autónoma en cualquier navegador moderno sin requerir servidores Node.js, compiladores Sass o conexiones a CDNs externos.

```
                    ┌────────────────────────────────────────────────────────┐
                    │               SISTEMA DE DISEÑO NATIVO                 │
                    │   Tokens CSS (:root) - Tipografía ergonómica 13-30px    │
                    │   Paleta Bolívar (#006738, #FFC72C, #EF4444)           │
                    └───────────────────────────┬────────────────────────────┘
                                                │
         ┌──────────────────────────────────────┼──────────────────────────────────────┐
         ▼                                      ▼                                      ▼
┌───────────────────┐                  ┌───────────────────┐                  ┌───────────────────┐
│  juego1_sga.html  │                  │ juego2_bodega.html│                  │juego3_trasiego.html│
│ (Desafío FDS/SGA) │                  │ (Bodega Isométrica│                  │(Mando de Trasiego)│
├───────────────────┤                  ├───────────────────┤                  ├───────────────────┤
│ • Pointer Events  │                  │ • 2.5D Preserve3D │                  │ • Telemetría Real │
│ • Dual Drag/Tap   │                  │ • Billboarding    │                  │ • 6 Switches SST  │
│ • Modal FDS 16 Sec│                  │ • Raycasting/Ady. │                  │ • Matriz de Falla │
│ • Lucho Avatar    │                  │ • Zona RESPEL     │                  │ • Doble Mando     │
└─────────┬─────────┘                  └─────────┬─────────┘                  └─────────┬─────────┘
          │                                      │                                      │
          └──────────────────────────────────────┴──────────────────────────────────────┘
                                                 │
                    ┌────────────────────────────┴───────────────────────────┐
                    │               SUBSISTEMAS COMPARTIDOS                  │
                    │  • Web Audio API Synth (Osciladores & GainNodes)       │
                    │  • Canvas 2D Particle Engine (Chispas / Confetti)      │
                    │  • GSAP 3.12 (Animaciones elásticas de retroalimentar) │
                    └────────────────────────────────────────────────────────┘
```

## 2. Subsistemas Clave

### 2.1. Motor de Estilos y Tokens Semánticos (`:root`)
Se descartó el uso de Tailwind CSS para evitar fragilidad por latencia de CDN y la dispersión de cadenas kilométricas de utilidades. Se implementaron tokens globales:
- **Colores de Identidad**: `--bolivar-green` (`#006738`), `--bolivar-green-glow` (`#10B981`), `--bolivar-yellow` (`#FFC72C`), `--hazard-red` (`#EF4444`).
- **Escala Tipográfica Ergonómica**:
  - `--font-xs`: `0.8125rem` (13px)
  - `--font-sm`: `0.9375rem` (15px)
  - `--font-base`: `1.0625rem` (17px)
  - `--font-lg`: `1.25rem` (20px)
  - `--font-xl`: `1.5rem` (24px)
  - `--font-2xl`: `1.875rem` (30px)
- **Fuentes**: Tipografía principal `Outfit` (sans-serif legible) y `JetBrains Mono` para datos técnicos y cronómetros.

### 2.2. Motor de Audio Sintetizado (Web Audio API)
Generación procedural de efectos sonoros sin archivos `.mp3` ni `.wav`:
- `playBeep(freq, type, duration, gain)`: Tonos sinusoidales para selecciones y advertencias.
- `playSuccessChord()`: Arpegio triádico mayor para clasificaciones correctas.
- `playAlarm()`: Tono triangular descendente con vibración para incompatibilidades químicas y fallas críticas.
- `playWinFanfare()`: Secuencia armónica ascendente para aprobación de evaluaciones.

### 2.3. Motor de Interacción y Física Táctil (Juego 1)
- Basado en **Pointer Events** (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`).
- Detección de umbral de 6px para diferenciar toque simple (Tap) de arrastre (Drag).
- Detección precisa de destinos con `document.elementFromPoint` desactivando temporalmente `pointer-events` en la tarjeta activa.
- Retorno elástico con transición cúbica cuando se suelta fuera de casilla válida.

### 2.4. Perspectiva Isométrica 2.5D en CSS Puro (Juego 2)
- Tablero tridimensional con `perspective: 1100px` y `transform: rotateX(60deg) rotateZ(-45deg)`.
- Sprites verticales contrarrotados (`rotateZ(45deg) rotateX(-60deg)`) para evitar distorsión de la cámara y proyectar sombras dinámicas sobre la grilla.
- Algoritmo de adyacencia ortogonal en grilla 3x3 (`|r1 - r2| + |c1 - c2| === 1`) con trazado de rayos luminosos dinámicos entre celdas.

### 2.5. Máquina de Estados y Telemetría Táctica (Juego 3)
- Estructura de escenarios reactiva basada en condiciones de campo:
  `{ id, title, truck, ambient, terrain, groundRisk, waterRisk, phoneRisk, severeWeather }`.
- Validación lógica de matriz de riesgos que evalúa la combinación de interruptores activados contra las condiciones ambientales y decide si procede despacho seguro, suspensión justificada o falla catastrófica de SST.
