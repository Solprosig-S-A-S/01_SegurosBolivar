description: "Estándares y cobertura mínima obligatoria para pruebas automatizadas."
globs: "/test/, /tests/, /_test., /.spec., /_spec."
alwaysApply: false

Disciplina de Testing y Verificación de Calidad

1. Cobertura Obligatoria por Módulo

Cada servicio de lógica de negocio, caso de uso o módulo de cálculo debe acompañarse de su correspondiente suite de pruebas unitarias que cubra:

Camino Feliz (Happy Path): Ejecución estándar con entradas válidas y resultado esperado exacto.

Casos Borde (Edge Cases): Manejo de valores vacíos, nulos, ceros, límites de longitud o formatos numéricos inválidos.

Casos de Fallo Controlado: Verificación explícita de cómo responde el módulo ante cortes de red, tiempos de espera (timeout) o respuestas 4xx/5xx del servidor.

2. Aislamiento y Determinismo

Sin Red Viva: Las pruebas unitarias no deben depender de conexiones activas a internet, bases de datos remotas en producción ni servicios en la nube. Todas las fuentes de datos externas deben ser simuladas (mocks/stubs).

Inviolabilidad: Si un test existente falla tras una modificación, está terminantemente prohibido alterar la aserción de la prueba para forzar el paso en verde, salvo que el requerimiento funcional haya cambiado formalmente.