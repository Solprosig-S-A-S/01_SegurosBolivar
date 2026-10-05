description: "Reglas obligatorias para servicios de datos, contratos de red, validación y persistencia."
globs: "/services/, /repositories/, /models/, /database/, /schemas/, /data/"
alwaysApply: false

Directrices de Backend, Datos y Persistencia

1. Validación y Sanitización de Entradas

Frontera Segura (Zero Trust):

Ninguna carga útil (payload) proveniente de formularios, argumentos de terminal o respuestas de red puede insertarse en base de datos o lógica de negocio sin validación previa de esquema y sanitización de tipos.

Contratos Tipados:

Todo endpoint o método de repositorio debe definir esquemas de entrada (DTOs de solicitud) y modelos de salida fuertemente tipados. Prohibido retornar maps o diccionarios no estructurados.

2. Manejo Estructurado de Errores y Resiliencia

Tipos Result / Either:

Toda función asíncrona de acceso a datos debe envolver su resultado en una estructura predecible de éxito o fallo (patrón Result<T, Failure>).

Queda prohibido permitir que excepciones no controladas escalen a la capa de UI sin un mensaje comprensible y tipificado.

Mapeo de Errores al Usuario:

Traduce códigos de error técnicos (como SocketException, ECONNREFUSED, PostgresError 23505) a fallos controlados de dominio. Jamás expongas trazas de pila (stacktraces) crudas a los usuarios finales.

3. Integridad de Datos

Transacciones:

Cualquier operación que implique múltiples mutaciones dependientes en base de datos debe ejecutarse dentro de un bloque transaccional atómico.

Borrado Seguro:

Prefiere el borrado lógico (is_deleted, deleted_at) sobre la eliminación física destructiva (DELETE FROM).