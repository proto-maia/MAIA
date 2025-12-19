# Threat Model Example 2 - Organización Feminista de Acompañamiento y Defensa

## Contexto

Una organización feminista en Ecuador acompaña a mujeres sobrevivientes de violencia de género. Manejan información
extremadamente sensible y realizan incidencia pública contra instituciones que fallan en proteger a las víctimas.


## Activos

### A1: Base de datos de mujeres acompañadas

Descripción: Contiene nombres, teléfonos, historial de violencia, casos legales, riesgos identificados.
Criticidad: Muy alta
Razón: Si esta información se filtra, podría poner directamente en peligro a víctimas.


### A2: Chat interno entre psicólogas y abogadas

Descripción: Coordinación de casos, seguimiento, alertas de riesgo.
Criticidad: Alta
Razón: Contiene detalles sensibles sobre procesos legales y riesgos actuales.


### A3: Identidad pública y reputación de la organización

Descripción: Credibilidad, confianza comunitaria.
Criticidad: Media
Razón: Un daño reputacional afecta donaciones, acceso a víctimas y alianzas.


## Adversarios

### ADV1: Parejas agresoras / exparejas violentas

Capacidad: Media-baja
Motivación: Obtener información de víctimas, intimidar, sabotear procesos legales.


### ADV2: Funcionarios de fiscalía o policía con sesgos machistas

Capacidad: Media
Motivación: Minimizar denuncias, desacreditar organización, exponer información por negligencia o animadversión.


## Amenazas

### T1: Filtración de información sensible

(Alineado con Information Disclosure en STRIDE)


### T2: Uso de procesos judiciales para intimidar

(Alineado con Judicial attacks en JURIST)


### T3: Campaña de difamación en redes sociales

(Relacionado con Resources y Surveillance en JURIST)


## Riesgos

### R1: Filtración de datos de mujeres acompañadas (A1 × ADV2 × T1)

Probabilidad: Media
Impacto: Muy alto


### R2: Expareja agresora usa el sistema judicial para acosar (A3 × ADV1 × T2)

Probabilidad: Alta
Impacto: Alto


### R3: Difamación en redes para dañar la reputación (A3 × ADV2 × T3)

Probabilidad: Media
Impacto: Alto


## Priorización

R1 – Muy alto

R2 – Alto

R3 – Alto/medio


## Tratamiento y Medidas

### R1 – Filtración de datos sensibles

Tratamiento: Mitigar
Medidas:

Separar información legal y psicológica en sistemas distintos.

Autenticación fuerte y mínima cantidad de personas con acceso.

Política estricta de no compartir datos por WhatsApp sin cifrado extremo.


### R2 – Acoso judicial

Tratamiento: Mitigar / Transferir parcialmente
Medidas:

Acompañamiento legal y alianzas con colectivos de abogadas.

Documentación detallada de los casos y su historial.

Capacitación en reconocimiento de patrones de acoso judicial.


### R3 – Difamación en redes

Tratamiento: Mitigar
Medidas:

Respuesta pública basada en evidencia con vocería preparada.

Sistema de alertas comunitarias para reportar cuentas falsas.

Manual interno de manejo de crisis comunicacionales.
