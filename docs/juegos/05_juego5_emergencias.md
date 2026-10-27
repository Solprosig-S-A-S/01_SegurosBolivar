# Documentación Técnica Exclusiva - Juego 5

> **Contrato vigente 2026-10-22:** Emergencias: Derrame (120 s) e Incendio (90 s), en ese orden y ambos obligatorios. Selección de extintor, pasador y manta son acciones separadas. Solo tras ambas misiones se reporta promedio al SCO. Un intervalo por misión, exposición aun quieto, velocidad por tiempo y entradas limpiadas al perder foco. Vitalidad no mide oxígeno. Aprobación desde 80 % y todos los hitos. [Contrato y validaciones](../CORRECCIONES_2026-10-22.md).
> Las referencias normativas y detalles del diseño original que siguen son contexto histórico, no instrucciones de campo ni acreditación de cumplimiento; prevalece este contrato. Recursos externos incrustados, sin CDN en ejecución. QA visual, lector de pantalla y SST profesional pendientes.
## Brigada de Emergencia: Simulador 1ª Persona de Control de Derrames

### Ajuste del HUD superior — 2026-10-22

El briefing inicial presenta un resumen breve por misión, sus tiempos y una línea de controles. La explicación detallada se proporciona mediante los objetivos durante el juego; el aviso de alcance didáctico también se condensó.

La cabecera simplificada conserva únicamente tiempo, sonido y pantalla completa. Se retiraron del HTML el detector de gas/temperatura, las pestañas de misión, el radar y la barra de pasos. Debajo se muestra el objetivo actual; las estadísticas y el feedback siguen disponibles. El avance es secuencial y la exposición se calcula sin depender de esos indicadores. Verificado por regresiones y empaquetado; comprobación visual pendiente de navegador conectado.

---

## 1. Ficha Técnica y Resumen Ejecutivo

| Parámetro | Especificación Técnica |
| :--- | :--- |
| **Nombre del Módulo** | Brigada de Emergencia: Simulador 1ª Persona de Control de Derrames |
| **Archivo Fuente** | `juego5_emergencias.html` |
| **Público Objetivo** | Brigadistas de emergencia en obra, inspectores SST, supervisores ambientales y personal de planta |
| **Perspectiva / Vista** | **100% Primera Persona (FPS / First-Person POV)** a través de la visera del casco |
| **Restricción de Cámara** | Cero avatares de 3ª persona, cero perspectiva isométrica, cero vista cenital |
| **Espacio de Habitación** | Habitación cúbica 3D estática de 1400x1400px en CSS3 Puro (`perspective: 750px`) |
| **Sistema de Cámara** | Rig Ocular Euler con Pitch Vertical ($-45^\circ$ a $+40^\circ$) y Yaw Horizontal ($360^\circ$) |
| **Stack Tecnológico** | HTML5, CSS3 Nativo (`:root`), JavaScript ES6, GSAP v3, Pointer Lock API, Web Audio API |
| **Recursos offline** | Fuentes, Font Awesome 6.4.0 y GSAP 3.12.2 (juegos 3-5) incrustados en HTML |
| **Empaquetador / Build** | Cero dependencias / Vanilla JS (Ejecución standalone directa en navegador) |

El **Juego 5** es un simulador inmersivo en primera persona que traslada al jugador a una situación real de emergencia química en un cuarto de almacenamiento industrial: una fuga activa de solvente inflamable y corrosivo con un operario afectado, riesgo inminente de asfixia por vapores orgánicos y expansión de un charco químico hacia el drenaje pluvial ambiental.

---

## 2. Marco Normativo y Protocolo de Emergencias

1. **Decreto 1072 de 2015 (Libro 2, Parte 2, Título 4, Capítulo 6)**:
   - Implementación de la Brigada de Prevención, Preparación y Respuesta ante Emergencias en el SG-SST.
   - Procedimientos operativos normalizados (PON) para control y atención de derrames químicos.
2. **Resolución 773 de 2021**:
   - Equipamiento de protección respiratoria con cartuchos para vapores orgánicos y guantes de nitrilo de alta densidad.
   - Disposición accesible de Fichas de Datos de Seguridad y rotulado de recipientes.
3. **Decreto 4741 de 2005 (Manejo Integral de RESPEL)**:
   - Confinamiento de material absorbente contaminado en bolsas rojas de bioseguridad/químicos y disposición en acopio autorizado sobre estiba colectora.
4. **Norma Técnica ANSI Z358.1 (Equipos de Lavado de Ojos y Ducha de Emergencia)**:
   - Protocolo de irrigación ocular continua inmediata durante un mínimo de 15 minutos en caso de contacto con químicos corrosivos o irritantes.
5. **Norma NFPA 10 (Extintores Portátiles) y Ley 55 de 1993**:
   - Verificación de presurización y fecha de vigencia de extintores en áreas con riesgo de solventes.

---

## 3. Cinemática 3D, Rig de Cámara y Controles FPS

```mermaid
flowchart LR
    A[Pointer Lock API / Arrastre Táctil] -->|Yaw 360° + Pitch Euler| B[Rig Ocular de Cámara 3D]
    B --> C[Habitación Cúbica 1400x1400px]
    D[Teclado WASD / D-Pad Móvil] -->|Avance Vectorial Relativo a Mirada| C
    B --> E[Cono de Visión FOV: Dot Product]
    E -->|Filtrar Estación Apuntada en Retícula| F[Prompt Contextual [E] / Clic Izquierdo]
```

### 3.1. Pipeline de Transformación Ocular en CSS 3D
Al utilizar `perspective: 750px`, la matriz del rig traslada el pivote de giro exactamente al punto de visión de los ojos del brigadista, impidiendo desplazamientos excéntricos:
```javascript
// Transformación Matemática del Rig de Cámara
this.dom.cameraRig.style.transform = `
    translateZ(750px)
    rotateX(${this.pitch}deg)
    rotateY(${this.yaw}deg)
    translate3d(${-this.posX}px, 0px, ${-this.posZ}px)
`;
```
- **Yaw (Giro Horizontal $0^\circ$ a $360^\circ$)**: Mirada en 360° con ratón (Pointer Lock API con clic en viewport) o arrastre táctil.
- **Pitch (Inclinación Vertical $-45^\circ$ a $+40^\circ$)**: Permite mirar hacia arriba (luminarias, tuberías y baliza de alarma) y hacia abajo (suelo, charco químico y drenaje) con horizonte perfectamente estable y sin cinetosis.
- **Spawn Seguro**: Posicionado en $(X = 0, Z = 360)$ con rumbo $0^\circ$ (Norte) y cabeceo inicial de $-12^\circ$. El usuario contempla el derrame de frente a $290\text{px}$ (fuera del radio de daño tóxico de $260\text{px}$).

### 3.2. Avance Vectorial y Strafe Dinámico
El desplazamiento físico con teclas `W`, `A`, `S`, `D` (o flechas) y D-Pad móvil se calcula relativo al vector de orientación horizontal:
- $\vec{F} = (\sin(\theta), -\cos(\theta))$ para avanzar frontalmente hacia donde apunta la mirada.
- $\vec{R} = (\cos(\theta), \sin(\theta))$ para pasos laterales (strafe).
- Colisiones perimetrales rígidas acotadas en $\pm 520\text{px}$ respecto a las paredes del cubo ($\pm 700\text{px}$).

### 3.3. Algoritmo de Targeting con Cono de Visión (FOV / Dot Product)
Para resolver falsos positivos donde estaciones a espaldas del jugador capturaban la retícula:
1. Se calcula el vector director frontal de la cámara $\vec{F} = (\sin(\theta), -\cos(\theta))$.
2. Se calcula el vector normalizado hacia cada estación $\vec{V}_{norm} = (\frac{dx}{dist}, \frac{dz}{dist})$.
3. Producto punto: $\text{dot} = \vec{F} \cdot \vec{V}_{norm} = \cos(\alpha)$.
4. Si $\text{dot} < 0.25$ ($> 75^\circ$ respecto al centro de la mira), la estación se descarta categóricamente por estar a espaldas o fuera de foco.
5. Las estaciones válidas se jerarquizan con $\text{score} = (\text{dot} \cdot 1000) / (dist + 40)$.

---

## 4. Protocolo Operativo de Crisis (5 Pasos en Secuencia)

| Estación 3D | Coordenadas $(X, Z)$ y Radio | Acción en 1ª Persona | Consecuencia y Feedback |
| :--- | :--- | :--- | :--- |
| **1. Caseta EPP** | $X = -550, Z = +350$ (Pared Oeste, $r = 360$) | Equipar guantes de nitrilo y máscara Full-Face | Visor activa `.fullface-active` con filtro de aire, guantes cambian a nitrilo azul y se anula el daño por vapores. |
| **2. Válvula de Corte** | $X = 0, Z = -620$ (Pared Norte, $r = 260$) | Agarrar y rotar 360° la manivela mecánica | Cesa el silbido de vapor químico, válvula hermética y se detiene la emanación de solvente. |
| **3. Lavaojos 15 Min** | $X = 0, Z = +620$ (Pared Sur, $r = 230$) | Empujar la palanca de agua continua | Sonido turbulento de agua (ANSI Z358.1). Operario fuera de peligro. |
| **4. Kit Antiderrame** | $X = +620, Z = 0$ (Pared Este, $r = 280$) | Abrir maletín y tomar cordones y paños | Pasa insumos al inventario de manos. Habilita contención del charco. |
| **5. Charco Químico** | $X = 0, Z = +70$ (Suelo 3D, $r = 420$) | 1° Extender cordón delimitador<br>2° Aplicar paños sintéticos | 1° Detiene el avance hacia el drenaje.<br>2° Absorbe el solvente corrosivo. |
| **6. Acopio RESPEL** | $X = -550, Z = -350$ (Pared Oeste, $r = 360$) | Sellar bolsa roja sobre estiba colectora | Confinamiento final de paños usados conforme al Dec. 4741/2005. |

---

## 5. Auditoría de Campo en 1ª Persona (4 Hallazgos Ocultos)

Mientras controla la emergencia, el brigadista puede explorar el entorno e interactuar con 4 no conformidades de campo:
1. **Extintor Despresurizado (Pared Norte)**: Aguja en zona roja y tarjeta de inspección vencida (NFPA 10). (+25% auditoría).
2. **Botella Reenvasada Ilegalmente (Pared Oeste)**: Envase comercial de jugo con solvente químico sin rotular (Art. 20 Res. 773/2021). (+25% auditoría).
3. **Portahojas FDS Vacío (Pared Este)**: Estación de mezclas sin ficha técnica disponible para los trabajadores (Ley 55/1993). (+25% auditoría).
4. **Tambor de Aceite sin Estiba (Esquina Sureste)**: Tambor metálico sobre suelo natural con riesgo de filtración (Dec. 4741/2005). (+25% auditoría).

---

---

## 6. HUD de la Visera y Reglas de Crisis

### 6.1. Cuadro Previo de Contexto Táctico (Briefing de Misión SST - Estilo Star Wars Simplificado)
Para evitar saturación visual y sobrecarga cognitiva, el simulador incorpora una pantalla previa de misión limpia, sobria y de lectura rápida (KISS):
- **Silueta Biselada Espacial**: Contenedor compacto (`max-width: 520px`) con corte angular a 45° (`clip-path: polygon(...)`), fondo obsidiana (`#060A14`) y acento amarillo Star Wars / Bolívar.
- **Jerarquía Tipográfica Homogénea**: Fuente monoespaciada `JetBrains Mono` con escala uniforme (0.85rem / 14px en cuerpo) erradicando la disparidad de tamaños y formatos.
- **5 Pasos Operativos Claros y Concisos**:
  1. *Caseta EPP*: Equípate con guantes y máscara.
  2. *Válvula*: Ciérrala para frenar la fuga.
  3. *Lavaojos*: Atiende al compañero afectado.
  4. *Derrame*: Contén el charco con cordón y paños.
  5. *RESPEL*: Desecha los paños en la caneca roja.
- **Controles en Línea Única**: `WASD: Caminar • Ratón: Mirar • [E] / Clic: Interactuar`.
- **Botón Directo de Inicio**: `[ INICIAR MISIÓN (120s) ]`. La física de marcha y el reloj de crisis permanecen pausados hasta pulsar este botón.

- **Detector PID de Gases en Vivo (PPM)**: Calcula la concentración de vapores orgánicos según la distancia real al charco y estado de la válvula. Si supera los 90 PPM emite alerta roja estroboscópica.
- **Reloj de Crisis (120 Segundos)**: Cuenta regresiva digital de alta tensión.
- **Barra de Expansión hacia Drenaje**: Crece a 1.2% por segundo si no se ha colocado el cordón delimitador. Si llega al 100%, la misión fracasa de inmediato por **Desastre Ecológico**.
- **Barra de Vitalidad Simulada**: Si el operario se acerca a menos de $260\text{px}$ del charco sin máscara, sufre parpadeo rojo por asfixia y daño continuo.

---

## 7. Pruebas y Casos de Validación

1. **Prueba de Inhalación Tóxica**:
   - Acercarse al charco inmediatamente al iniciar sin pasar por la caseta EPP: el visor debe parpadear en rojo por asfixia y la vitalidad simulada debe decrecer.
2. **Prueba de Targeting en Retícula**:
   - Situarse a $Z = 400$ mirando al Norte ($yaw = 0^\circ$): la mira debe mostrar exclusivamente `ZONA DE DERRAME` con glow amarillo sobre el charco; el Lavaojos detrás del jugador ($Z = 620$) debe estar 100% descartado.
3. **Prueba de Interacción Completa con Clic y Tecla E**:
   - Completar la ruta: Caseta EPP ➔ Válvula ➔ Lavaojos ➔ Kit ➔ Charco (Cordón) ➔ Charco (Paños) ➔ RESPEL. El informe de misión permite avanzar a Incendio; solo al completar ambas misiones se reporta la nota promedio al SCO (no necesariamente 100%).

