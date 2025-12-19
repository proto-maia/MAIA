# Threat Model Example 1 - Organización de apoyo a defensoras comunitarias

## Context 

Una pequeña organización de la sociedad civil en Ecuador acompaña a defensoras comunitarias. Manejan información
sensible, coordinan talleres, y realizan denuncias públicas cuando hay abusos de autoridad. Las personas usuarias no
tienen formación técnica.

## Activos

### A1: Lista de defensoras acompañadas

Descripción: Datos personales, historial de riesgos, teléfonos, ubicación general.
Valor / criticidad: Alta
Por qué es valioso: Contiene información que podría poner en peligro a personas vulnerables si se expone.

### A2: Cuenta de redes sociales de la organización (Facebook/Instagram)

Descripción: Canal principal de comunicación y denuncias públicas.
Valor / criticidad: Media
Por qué es valioso: Si es manipulada o tomada por un adversario, podría afectar reputación, generar desinformación o poner en riesgo a defensoras.

### A3: Equipos móviles del equipo (celulares de personal)

Descripción: Contienen chats con personas acompañadas, fotos de evidencia, accesos a correos.
Valor / criticidad: Alta
Por qué es valioso: Su compromiso permite acceso a toda la operación.


## Adversarios

### ADV1: Funcionarios locales hostiles

Descripción: Funcionarios de municipio y policía local que han mostrado actitudes de hostigamiento hacia defensoras.
Capacidad: Media
Motivación: Limitar, intimidar, obtener información de personas acompañadas.

### ADV2: Criminales comunes / oportunistas

Descripción: Personas que buscan robar dispositivos o acceder a cuentas para obtener dinero o vender información.
Capacidad: Baja
Motivación: Económica, oportunista.


## Amenazas

### T1: Robo o pérdida de dispositivos móviles

(Riesgo físico frecuente, alineado con Theft en JURIST )

### T2: Acceso no autorizado a redes sociales

(Encaja con Information Disclosure y Tampering en STRIDE )

### T3: Vigilancia de comunicaciones digitales

(Encaja con Surveillance en JURIST )


## Riesgos

(Ejemplos, solo 3 riesgos para mantenerlo pequeño)

### R1: Robo de un celular del personal (A3) por criminales oportunistas (ADV2) mediante T1 (robo de dispositivos)

Probabilidad: Media
Impacto: Alto
Descripción: El robo de un dispositivo sin protección puede exponer chats, archivos y accesos a cuentas.

### R2: Acceso no autorizado a las redes sociales de la organización (A2) por funcionarios hostiles (ADV1) mediante T2

Probabilidad: Baja
Impacto: Alto
Descripción: Podrían manipular la narrativa pública, publicar información falsa o revelar datos sensibles.

### R3: Vigilancia de comunicaciones entre el equipo y defensoras (A1/A3) por funcionarios hostiles (ADV1) mediante T3

Probabilidad: Media
Impacto: Muy alto
Descripción: La vigilancia podría identificar a personas acompañadas, exponer denuncias y poner a defensoras en riesgo.


## Priorización

R3 (Media × Muy alto → alto/muy alto)

R1 (Media × Alto → alto)

R2 (Baja × Alto → medio)


## Tratamiento y medidas sugeridas

### R3 – Vigilancia de comunicaciones

Tratamiento: Mitigar
Medidas:

Migrar conversaciones sensibles a una app con cifrado fuerte y controles de seguridad (ej. Signal).

Protocolos para no enviar datos sensibles por teléfono.

Revisión periódica de permisos de apps y configuraciones de dispositivos.

### R1 – Robo de celular

Tratamiento: Mitigar
Medidas:

Bloqueo automático y biométrico.

Cifrado activado.

Copias de seguridad cifradas.

Separar WhatsApp personal de cuentas sensibles.

### R2 – Toma de redes sociales

Tratamiento: Mitigar
Medidas:

Activar 2FA en todas las cuentas.

Revisar quién tiene acceso y reducirlo al mínimo.

Contraseñas únicas y robustas.

Guardar códigos de recuperación fuera del dispositivo.

