# Avance 6: Minijuego 5 - "Slime Invasor: Control de Derrames"
### Procedimiento Operativo Estandarizado del Kit Antiderrame (Res. 773/2021)

---

## 💡 ¿Qué reto teníamos?
Cuando ocurre un derrame de sustancias químicas en obra (por rotura de canecas o goteo de mangueras), la reacción impulsiva de los trabajadores inexpertos suele ser fatal: intentar limpiar el charco directamente con trapos comunes sin equipo de protección, lo que provoca salpicaduras, inhalación de vapores tóxicos o expansión del contaminante hacia fuentes de agua y alcantarillas.

## 🛠️ ¿Cómo lo resolvimos?
Desarrollamos [`game5_slime_invasor.html`](../../game5_slime_invasor.html), un juego de estrategia en tiempo real donde el líquido derramado se comporta como un fluido orgánico vivo ("Slime") que se expande por el suelo de la obra si no es contenido inmediatamente.

### 1. La Secuencia Estricta de 5 Pasos del Kit Antiderrame
Para neutralizar la amenaza, el operario debe ejecutar rigurosamente los 5 pasos técnicos exigidos por los protocolos de la **Resolución 773 de 2021**:
1. **Paso 1 - Identificar:** Escanear el líquido con un sensor para verificar su naturaleza química y consultar su FDS antes de acercarse.
2. **Paso 2 - Protegerse:** Equipar el traje químico completo (overol blanco Tyvek, botas de caucho y máscara con filtro).
3. **Paso 3 - Delimitar y Contener:** Desplegar cordones absorbentes perimetrales (*booms/salchichas*) rodeando el derrame con un lazo elástico para frenar su avance hacia desagües.
4. **Paso 4 - Absorber y Limpiar:** Colocar paños absorbentes oleofílicos sobre el líquido y frotar hasta neutralizar la mancha.
5. **Paso 5 - Confinar y Disponer:** Recoger todo el material contaminado y sellarlo en una bolsa roja de residuos peligrosos (RESPEL) con precinto de seguridad.

### 2. Tensión Dinámica en Pantalla
- El charco de líquido cuenta con una barra de riesgo ambiental que va del verde al rojo. Si el jugador pierde tiempo o ejecuta los pasos en desorden (por ejemplo, intentar frotar paños sin haber delimitado antes con los cordones), el charco crece rápidamente y se activa una alarma de emergencia ambiental con reinicio del nivel.

## 🌟 Resultado
Un nivel de cierre memorable que convierte el protocolo abstracto del kit antiderrame en una secuencia táctica intuitiva y de rápida reacción mental para los brigadistas.
