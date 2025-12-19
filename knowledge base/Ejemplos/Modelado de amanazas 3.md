# Threat Model Example 3 - Colectivo Ambientalista Rural

## Contexto

Un colectivo ambientalista en zona rural investiga contaminación por parte de una empresa extractiva. Realizan trabajo
comunitario, documentan daños ambientales y publican informes. No tienen estructura formal ni mucha capacidad técnica.


## Activos

### A1: Evidencia fotográfica y de video de contaminación

Criticidad: Alta
Razón: Es la base de las denuncias públicas y legales.


### A2: Identidad y seguridad de líderes comunitarios

Criticidad: Muy alta
Razón: Son personas que enfrentan amenazas por denunciar abusos.


### A3: Sitio web simple donde publican informes

Criticidad: Media
Razón: Controlan la narrativa pública y la difusión de evidencia.


## Adversarios

### ADV1: Empresa extractiva con poder económico

Capacidad: Alta
Motivación: Evitar denuncias, controlar narrativa pública, identificar líderes.


### ADV2: Actores criminales locales contratados informalmente

Capacidad: Media
Motivación: Intimidación física o robo.


## Amenazas

### T1: Destrucción o robo de evidencia

(Alineado con Theft y Use of Force en JURIST)


### T2: Ataques al sitio web (DDoS o defacement)

(Alineado con Denial of Service y Tampering en STRIDE)


### T3: Vigilancia y seguimiento físico a líderes

(Alineado con Surveillance en JURIST)


## Riesgos

### R1: Actores criminales roban o destruyen evidencia (A1 × ADV2 × T1)

Probabilidad: Media
Impacto: Muy alto


### R2: Empresa realiza vigilancia sobre líderes comunitarios (A2 × ADV1 × T3)

Probabilidad: Alta
Impacto: Muy alto


### R3: Empresa ataca el sitio web para impedir difusión (A3 × ADV1 × T2)

Probabilidad: Media
Impacto: Alto


## Priorización

R2 – Muy alto

R1 – Muy alto

R3 – Alto


## Tratamiento y Medidas

### R2 – Vigilancia a líderes

Tratamiento: Mitigar
Medidas:

Protocolos de movimiento y comunicación segura.

Rutas alternas y coordinación con redes de apoyo comunitario.

Capacitación básica en reconocimiento de vigilancia.


### R1 – Robo/destrucción de evidencia

Tratamiento: Mitigar
Medidas:

Subir copias inmediatamente a almacenamiento seguro fuera de la zona.

Dispositivos de bajo perfil; no almacenar evidencia sólo en un teléfono.

Encriptar tarjetas SD y respaldos.


### R3 – Ataques al sitio web

Tratamiento: Mitigar / Transferir
Medidas:

Usar plataformas con mitigación integrada (ej. servicios gestionados con protección DDoS).

Backups estáticos.

Publicar copias en múltiples canales (redes, aliados, blogs independientes).
