# Avance 4: Minijuego 3 - "Combustible Nitro: Trasiego Extremo"
### Protocolo de Despacho Seguro, Puesta a Tierra y Prevención de Incendios (Ley 55/1993 & Dec. 1079/2015)

---

## 💡 ¿Qué reto teníamos?
El abastecimiento de combustible (ACPM y gasolina) a maquinaria pesada (volquetas, excavadoras, retrocargadores) es una de las tareas más críticas en frentes de obra. El flujo del hidrocarburo por mangueras plásticas o metálicas genera cargas estáticas de alto voltaje. Si el operador olvida conectar la pinza de polo a tierra, no apaga el motor o permite fuentes de ignición en el área, una sola chispa microscópica puede desatar un incendio de gran magnitud.

## 🛠️ ¿Cómo lo resolvimos?
Diseñamos [`game3_combustible_nitro.html`](../../game3_combustible_nitro.html) estructurado en dos fases complementarias que enseñan orden procedimental estricto y control operativo:

### 1. Fase de Checklist Táctil Obligatorio
El juego no permite accionar la pistola de combustible hasta que el trabajador cumpla en orden estricto los 4 pasos de seguridad exigidos por la **Ley 55 de 1993** y el **Decreto 1079 de 2015**:
1. **Conexión de la Pinza de Puesta a Tierra:** El jugador arrastra una pinza metálica conectada a un cable con física de cuerda elástica interactiva y la engancha al chasís metálico de la máquina.
2. **Apagado del Motor:** Tocar la llave de ignición en el tablero para apagar el motor en caliente.
3. **Ubicación del Extintor Satélite:** Posicionar el extintor de polvo químico seco (PQS) de 150 lbs en la zona de escape.
4. **Eliminación de Fuentes de Ignición:** Retirar mediante un deslizamiento (*swipe*) cualquier celular encendido o colilla de cigarrillo en un radio de 10 metros.

### 2. Fase de Dispensado y Simulación de Fluidos en Canvas
- Una vez asegurada la zona, el operario toma la pistola dispensadora y aprieta el gatillo.
- El motor de Canvas genera partículas de combustible que fluyen en tiempo real hacia el tanque de la maquinaria.
- El jugador debe mantener el flujo continuo hasta completar el 100% de la capacidad sin derramar líquido por fuera del orificio de llenado.
- Si el usuario intentara activar la válvula sin la pinza a tierra conectada, el sistema dispara un chispazo eléctrico con sonido cómico de cortocircuito, erizando el cabello de Lucho y reiniciando el procedimiento.

## 🌟 Resultado
Un simulador táctil que inculca el respeto innegociable a la secuencia de puesta a tierra antes de cualquier trasiego de hidrocarburos.
