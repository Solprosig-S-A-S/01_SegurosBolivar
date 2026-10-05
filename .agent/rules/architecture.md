description: "Estándares arquitectónicos, separación estricta de capas y manejo de contratos."
globs: "/lib/, /src/, /domain/, /presentation/, /controllers/, /core/"
alwaysApply: false

Directrices de Arquitectura y Diseño de Software

1. Principios Fundamentales

Separación de Responsabilidades (SoC):

La capa de presentación (UI/Vistas) jamás debe invocar directamente controladores de base de datos o llamadas HTTP crudas. Debe consumir exclusivamente Casos de Uso o Repositorios.

Toda dependencia externa (servicios de red, almacenamiento local, APIs de terceros) debe implementarse tras una interfaz o clase abstracta para permitir sustitución y mockeo en pruebas.

Inmutabilidad y Tipado Estricto:

Prohibido el uso de tipos genéricos dinámicos (dynamic, any, Object? no validado) salvo en fronteras de serialización donde la validación inmediata sea obligatoria.

Las entidades de dominio y los estados de aplicación deben modelarse como estructuras de datos inmutables.

Flujo de Datos Unidireccional:

El estado fluye hacia abajo (hacia la UI) y los eventos fluyen hacia arriba (hacia los casos de uso/controladores).

Ningún componente de interfaz debe mutar directamente variables globales o compartidas.

2. Convenciones de Estructura de Proyecto

core/: Utilidades transversales, temas, constantes y extensiones que no dependen de la lógica de negocio.

domain/: Entidades puras, reglas de negocio y contratos abstractos de repositorio. Cero dependencias de frameworks externos.

data/: Implementaciones concretas de contratos, modelos con serialización JSON, datasources (HTTP, DB local).

presentation/: Controladores de estado, pantallas, componentes visuales reutilizables.