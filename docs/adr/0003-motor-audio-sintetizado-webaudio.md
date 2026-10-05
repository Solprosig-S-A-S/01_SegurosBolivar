# ADR 0003: Síntesis Programática de Efectos Sonoros vía Web Audio API

## Estado
Aceptado

## Contexto
Los entornos educativos en obras de construcción a menudo presentan conectividad a internet intermitente o restricciones de descarga de archivos binarios pesados (MP3/WAV/OGG). Además, el proyecto exige operar sin dependencias de activos locales que requieran un servidor estático con rutas complejas.

## Decisión
1. Implementar la clase singleton `SoundEngine` / `SoundFX` utilizando exclusivamente la API nativa `AudioContext` de los navegadores modernos.
2. Sintetizar todos los efectos auditivos programáticamente mediante osciladores (`OscillatorNode`) con modulaciones de frecuencia y curvas de atenuación exponencial (`GainNode`):
   - Acierto/Éxito: Arpegios ascendentes de onda triangular.
   - Error/Choque: Frecuencias bajas con onda de sierra (`sawtooth`).
   - Chispazo estático: Ráfagas descendentes de onda cuadrada/sierra.
   - Fluido: Pulsos senoidales amortiguados continuos.
3. Incluir control de activación/silencio accesible en el HUD superior de cada archivo.

## Consecuencias
- **Positivas:**
  - Cero peticiones de red para audio (0 KB de archivos de audio adicionales).
  - Tiempo de inicio instantáneo sin latencia de decodificación de medios.
  - Compatibilidad completa con navegadores móviles iOS Safari y Android Chrome.
- **Negativas:**
  - Requiere interacción inicial del usuario (Tap/Click) para desbloquear el contexto de audio del navegador de acuerdo con las políticas de autoplay.
