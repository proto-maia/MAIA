# Modelado de Amenazas: Un Enfoque Proactivo y Adaptativo

El modelado de amenazas es un proceso sistemático y proactivo para identificar, comprender y mitigar riesgos de seguridad. En lugar de reaccionar a incidentes, te permite anticipar posibles ataques y proteger lo que es más valioso a través de un análisis de riesgos exhaustivo y una implementación de contramedidas inteligente. Es un "documento vivo" que debe actualizarse frecuentemente, ya que el panorama de amenazas, los activos y el contexto de tu organización evolucionan constantemente. Es beneficioso desarrollar diferentes modelos de amenaza que cubran distintas partes (ej. operaciones, comunicaciones, proyectos específicos) y escenarios de tu organización.

Concepto y Ciclo de Vida: Una Aproximación Continua

El modelado de amenazas no es un ejercicio de una sola vez, sino un ciclo continuo de mejora y adaptación:
    1. Definición: Determinar los adversarios, activos y amenazas de una organización, persona o grupo de personas, proyecto, etc.
    2. Identificación: Combinar activos, adversarios y amenazas para descubrir riesgos, mismos que serán calificados por probabilidad e impacto y priorizados en función de esta clasificación.
    3. Mitigación: Diseñar e implementar controles de seguridad (contramedidas) para reducir o eliminar la probabilidad y/o impacto de los riesgos identificados.
    4. Verificación: Asegurarse de que los controles implementados sean efectivos y que el riesgo se haya reducido a un nivel aceptable.
Este ciclo se repite a medida que el contexto evoluciona, cambian las condiciones o el entorno de amenazas se modifica, garantizando que el modelo de seguridad permanezca relevante y efectivo.

Metodología Paso a Paso: Estructurando tu Análisis de Riesgos

Un enfoque estructurado es clave para un modelado de amenazas efectivo.
    1. Identificar Activos: ¿Qué es lo valioso?
        ? Definición: Enumerar y describir detalladamente todo aquello que tu organización considera valioso y que necesita protección.
        ? Tipos de Activos:
            ? Físicos: Oficinas, hardware (computadoras, servidores, discos duros), dispositivos móviles, documentos impresos, vehículos, etc.
            ? Digitales: Bases de datos de contactos, correos electrónicos, archivos en la nube, servidores web, sistemas de gestión interna, credenciales de acceso, sitios web, redes sociales.
            ? Intangibles: La reputación de la organización, la confianza de la comunidad, la continuidad de las operaciones, la privacidad de los miembros del equipo y de las personas a las que apoyas, el conocimiento y la experiencia acumulados.
        ? Asignación de Valor: Asignar un valor de importancia o criticidad a cada activo (ej., escala del 1 al 5, donde 5 es crítico y 1 es bajo). Esta calificación debe basarse en el impacto potencial si el activo se ve comprometido.
        ? Casos de Uso/Escenarios: Describir los escenarios en los que cada activo es utilizado, procesado o expuesto. Esto ayuda a comprender cómo se puede atacar.
            ? Ejemplo: Activo: "Base de datos de personas defensoras bajo amenaza". Caso de Uso: "Registro de nuevas personas defensoras", "Consulta de historial de casos", "Envío de alertas de seguridad".
    2. Identificar Adversarios: ¿Quién te quiere hacer daño y por qué?
        ? Definición: Cualquier persona, grupo u organización que pueda ejecutar una amenaza contra un activo. Los adversarios pueden ser específicos y deben ser  contextualizados, con sus posibles motivaciones.
        ? Ejemplos Específicos:
            ? Actores Estatales: Policía, servicios de inteligencia (locales e internacionales), militares, instituciones judiciales corruptas, fiscalía.
            ? Actores No Estatales: Grupos criminales organizados, empresas privadas de vigilancia, grupos paramilitares, individuos maliciosos (hacktivistas con motivaciones opuestas), ex-empleados descontentos, grupos de ciberdelincuentes (ransomware).
            ? Actores Internos: Miembros de la organización con acceso privilegiado que pueden ser comprometidos o actuar maliciosamente.
        ? Calificación de Capacidad: Calificar el nivel de sofisticación y los recursos del adversario (ej., escala del 1 al 5, donde 5 es un adversario con recursos ilimitados, capacidad de acción y apoyo estatal).
        ? Motivaciones: ¿Cuál es su objetivo? (Financiero, político, ideológico, robo de información, interrupción de operaciones, intimidación, represión).
    3. Identificar Amenazas: ¿Cómo pueden atacarte?
        ? Definición: Cualquier ataque o evento que un adversario pueda usar contra un activo, y que podría resultar en daño. Las amenazas son las acciones o eventos que explotan las vulnerabilidades.
        ? Organización y Calificación: Organizar las amenazas y calificar su dificultad de ejecución (ej., escala del 1 al 5, donde 5 es muy difícil, 1 es muy fácil).
        ? Ejemplo: "Acceso no autorizado", "Fuga de datos", "Ataque de ransomware".

Metodologías para Generar Ideas y Escenarios de Ataque: Pensando como un Atacante

Estas metodologías proporcionan marcos estructurados para ayudarte a pensar como un atacante e identificar posibles tipos de amenazas.
    - STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privileges):
        ? Spoofing (Suplantación): Un atacante se hace pasar por otra persona, sistema o entidad legítima.
            ? Concepto Ampliado: No solo suplantación de identidad (phishing, vishing, smishing), sino también suplantación de dirección IP, dirección MAC, GPS, DNS, o incluso dispositivos (ej. un cargador USB que esconde un dispositivo de espionaje).
            ? Ejemplos: Un correo de phishing que parece de un colega para obtener credenciales; un atacante que falsifica la identidad de un servidor para una conexión; un periodista que usa un perfil falso para infiltrarse en un grupo.
        ? Tampering (Manipulación de Datos): Modificación no autorizada de datos o sistemas.
            ? Concepto Ampliado: Alteración de información, códigos, configuraciones o logs. Impacta la integridad.
            ? Ejemplos: Un adversario modifica un informe para cambiar la narrativa; un atacante inyecta código malicioso en una página web.
        ? Repudiation (Repudio): La capacidad de un atacante de negar haber realizado una acción. Impacta la responsabilidad.
            ? Concepto Ampliado: La falta de mecanismos de registro o pruebas criptográficas que impidan a una persona negar haber llevado a cabo una acción (ej. una transacción, un envío de mensaje).
            ? Ejemplos: Un atacante niega haber accedido a un sistema porque los logs fueron borrados o no se implementó un sistema de firma digital. En el contexto de derechos humanos, esto es una "no-amenaza" para la privacidad de la persona defendida, pero es una amenaza para la rendición de cuentas del atacante.
        ? Information Disclosure (Divulgación de Información Privada): Exposición no autorizada de datos sensibles. Impacta la confidencialidad.
            ? Concepto Ampliado: Acceso, copia o fuga de información confidencial.
            ? Ejemplos: Un atacante accede a una base de datos de usuarios; un archivo confidencial se sube por error a un servidor público; un error de configuración en un servidor web que expone información restringida.
        ? Denial of Service (Denegación de Servicio - DoS/DDoS): Impedir el acceso legítimo a recursos o sobrecargar sistemas, haciéndolos indisponibles. Impacta la disponibilidad.
            ? Concepto Ampliado: No solo ataques de inundación de tráfico (DDoS), sino también secuestro de datos (ransomware), borrado de datos, sabotaje físico de infraestructura, o sobrecarga de sistemas por un alto número de solicitudes legítimas, pero mal gestionadas.
            ? Ejemplos: Un ataque DDoS contra el sitio web de la organización; un ataque de ransomware que cifra todos los archivos; un corte de energía que deja inoperativos los servidores.
        ? Elevation of Privileges (Elevación de Privilegios): Un atacante obtiene acceso a más información o permisos de los que debería tener. Impacta la autorización.
            ? Concepto Ampliado: Explotación de vulnerabilidades de software, configuraciones erróneas, o credenciales robadas para obtener acceso de administrador, acceso a datos más sensibles o control sobre sistemas críticos.
            ? Ejemplos: Un usuario normal logra acceso de superusuario en un servidor; un atacante utiliza un defecto en una aplicación para ejecutar código con privilegios elevados.

    - LINDDUN (Linking, Identification, Non-repudiation, Detectability, Data Disclosure, Unawareness, Non-compliance): Metodología centrada específicamente en amenazas a la privacidad de los datos.
        ? Linking (Vinculación): La capacidad para correlacionar diferentes datos o acciones realizadas por la misma persona, incluso si no se conoce su identidad directa.
            ? Ejemplo: Correlacionar el historial de navegación de un usuario con sus compras en línea, o sus movimientos físicos con sus interacciones en redes sociales.
        ? Identification (Identificación): Cuando un sistema o conjunto de datos puede ser vinculado con una identidad real (nombre, cédula, dirección).
            ? Ejemplo: Una base de datos anónima se des-anonimiza al combinarla con otros datos públicos, revelando las identidades de las personas.
        ? Non-repudiation (No Repudio): En el contexto de privacidad, esto es una "no-amenaza". Significa que una acción o transacción no puede ser negada. Desde el punto de vista del atacante, que no pueda repudiar es un control. Desde el punto de vista de la privacidad de la persona, podría ser un riesgo si la acción revelada es sensible.
            ? Ejemplo: Un sistema que registra todas las acciones de un usuario sin posibilidad de borrar o negar la actividad, comprometiendo la seudonimización.
        ? Detectability (Detectabilidad): La posibilidad de que un tercero sepa que se están recopilando datos o que se está produciendo un evento específico.
            ? Ejemplo: Un servicio en la nube notifica a un tercero sobre el acceso a un archivo.
        ? Data Disclosure (Divulgación de Datos): Revelación de información privada a terceros no autorizados.
            ? Ejemplo: Un proveedor de servicios comparte datos de usuarios con fines de marketing sin consentimiento.
        ? Unawareness (Desconocimiento): El derecho del individuo a saber qué sucede con sus datos e información privada, incluyendo quién los tiene, cómo se usan, por cuánto tiempo se almacenan y con quién se comparten.
            ? Ejemplo: Una aplicación recopila datos de ubicación en segundo plano sin informar claramente al usuario.
        ? Non-compliance (Incumplimiento): Datos manejados fuera de las reglas o políticas establecidas por regulaciones (ej. LOPDP), acuerdos de privacidad o políticas internas.
            ? Ejemplo: Una organización almacena datos personales más allá del tiempo permitido por la ley, o no los borra cuando se solicita.

    - JURIST (Judicial, Use of Force, Resources, Information Security, Surveillance, Theft): Marco de amenazas específico para organizaciones sociales y periodistas, centrado en contextos más amplios de seguridad y derechos humanos, que van más allá de lo meramente técnico.
        ? Judicial: Ataques que utilizan el sistema legal como instrumento de acoso o criminalización.
            ? Ejemplos: Demandas infundadas, acusaciones falsas, órdenes de registro o incautación de dispositivos sin base legal, criminalización de la protesta o el periodismo.
        ? Use of Force (Uso de la Fuerza): Amenazas directas o físicas a la integridad de las personas o bienes.
            ? Ejemplos: Amenazas físicas, agresiones, detenciones arbitrarias, destrucción de propiedad, allanamientos violentos, sabotaje de equipos.
        ? Resources (Recursos): Ataques relacionados con los recursos del atacante.
            ? Ejemplos: Sobornos para obtener información; corte de financiamiento.
        ? Information Security (Seguridad de la Información): Amenazas directas a la confidencialidad, integridad y disponibilidad de la información digital. Para detectar este tipo de vulnerabilidades se debería aplicar la metodología STRIDE.
            ? Ejemplos: Hackeo de sistemas, phishing para robo de credenciales, infección por malware, ataques a la infraestructura web de la organización.
        ? Surveillance (Vigilancia): Cualquier tipo de monitoreo o recolección de información sobre individuos o grupos.
            ? Ejemplos: Vigilancia física (seguimiento), vigilancia digital (interceptación de comunicaciones, spyware), vigilancia biométrica (reconocimiento facial), vigilancia electromagnética (TEMPEST).
        ? Theft (Robo): Sustracción de bienes o información.
            ? Ejemplos: Robo de dispositivos (laptops, celulares) para acceder a información; robo de documentos físicos; robo de credenciales o identidades.
    - DREAD (Damage, Reproducibility, Exploitability, Affected Users, Discoverability): Método para calificar el riesgo de las amenazas, enfocado en el impacto y la facilidad de explotación. 
        ? Damage (Daño): ¿Cuál sería el impacto si el ataque se llevara a cabo? (ej. 1=mínimo, 5=catastrófico). Considerar cuán difícil es recuperarse.
        ? Reproducibility (Reproducibilidad): ¿Qué tan fácil es que se repita un ataque. Un ataque fácil de reproducir se considera un riesgo mayor. (ej. 1=nada fácil, 5=muy fácil).
        ? Exploitability (Explotabilidad): ¿Cuán difícil es para un atacante realizar esta amenaza por primera vez? (ej. 1=muy fácil, 5=muy difícil).
        ? Affected Users (Usuarios Afectados): ¿Cuántos usuarios o miembros de la organización se verían afectados por el ataque? (ej. 1=pocos, 5=todos).
        ? Discoverability (Descubrimiento): ¿Cuán probable es que la amenaza o la vulnerabilidad sea descubierta por un atacante? (ej. 1=muy difícil de descubrir, 5=muy fácil).
Cálculo de la Puntuación: Se calcula la puntuación DREAD promedio sumando las puntuaciones de cada componente y dividiendo por 5. La puntuación DREAD ayuda a priorizar las amenazas, donde las amenazas con puntuaciones más altas son consideradas más críticas y requieren atención inmediata. 

Riesgo y Priorización: Decidiendo Dónde Invertir Esfuerzos
El riesgo se define como la combinación de un activo, un adversario y una amenaza. No tiene sentido proteger algo sin valor de un adversario que no existe con una amenaza que es imposible de ejecutar. La priorización de los riesgos es fundamental para la asignación eficiente de recursos limitados (tiempo, dinero, personal).
    - Fórmula General: Riesgo = Probabilidad (de que ocurra la amenaza) x Impacto (si la amenaza ocurre).
    - Priorización: Los riesgos con mayor puntuación (alta probabilidad y alto impacto) deben ser abordados primero.
    - Medidas de Seguridad (Controles):
        ? Las medidas de seguridad implementadas (controles) deben buscar reducir el impacto o la probabilidad de que suceda la amenaza.
        ? Defensa en Profundidad: Se recomienda usar más de una medida de seguridad para abordar un riesgo específico. Esta estrategia de "defensa en profundidad" implica capas de seguridad, de modo que si una falla, otras puedan contener el ataque.
        ? Evaluación Continua: Las medidas deben evaluarse regularmente para asegurar su efectividad continua, ya que las amenazas evolucionan.
        ? Ejemplo: Para proteger la "Base de datos de personas defensoras" (activo de alto valor) del "Servicio de inteligencia" (adversario de alta capacidad) mediante un "ataque de phishing" (amenaza):
            ? Reducir Probabilidad: Formación constante en concienciación de phishing, 2FA fuerte para todos los accesos.
            ? Reducir Impacto: Cifrado de la base de datos en reposo, copias de seguridad cifradas, segmentación de red para aislar la base de datos, principio de mínimo privilegio para el acceso.
    - Las medidas de gestión de riesgos son acciones y estrategias implementadas para identificar, evaluar, y controlar los riesgos, con el objetivo de minimizar su impacto negativo en una organización o proyecto. Estas medidas pueden incluir la prevención, mitigación, transferencia y aceptación de riesgos. 

    - Prevención: Se enfoca en evitar que ocurran eventos de riesgo, por ejemplo, para evitar el robo de documentos físicos, la medida de prevención sería no tener dichos documentos en primer lugar. 
    - Mitigación: Se refiere a reducir el impacto de un riesgo si este llegara a ocurrir, por ejemplo, contar con sistemas de respaldo o planes de contingencia. 
    - Transferencia: Implica trasladar el riesgo a un tercero, como a través de seguros. 
    - Aceptación: Implica reconocer el riesgo y decidir que no se tomarán medidas para evitarlo o reducirlo, generalmente cuando el costo de la prevención o mitigación es mayor que el impacto potencial del riesgo. 

Árboles de Ataque: Visualizando el Camino del Adversario
Los árboles de ataque son una herramienta poderosa y visual para representar cómo un atacante podría lograr un objetivo específico sobre un activo, desglosando el objetivo final en pasos más pequeños.
    - Estructura: Se comienza con el objetivo principal (la "raíz" del árbol) y se desglosa en subobjetivos o "nodos".
        ? Nodos "AND": Significan que todos los subobjetivos deben lograrse para cumplir el objetivo superior.
        ? Nodos "OR": Significan que basta con que uno de los subobjetivos se cumpla para lograr el objetivo superior.
    - Detalle: Es crucial especificar el paso a paso para llegar al objetivo principal, incluyendo la secuencia de acciones, las herramientas que el atacante podría usar, y las vulnerabilidades que podría explotar.
    - Ejemplo Práctico:
        ? Raíz: "Robar la información del CAD".
        ? Nivel 1 (OR):
            ? "Acceder físicamente a la oficina"
            ? "Robar la información de forma remota (cloud)"
        ? Desglose de "Acceder físicamente a la oficina" (OR):
            ? "Romper la cerradura" (AND: Herramienta de forzado, tiempo sin ser detectado)
            ? "Engañar al personal para que abra" (AND: Ingeniería social, perfil falso)
            ? "Tener una llave" (OR: Robo de llave, duplicado ilegal)
        ? Desglose de "Robar la información de forma remota (cloud)" (OR):
            ? "Comprometer credenciales de la nube" (AND: Phishing exitoso, falta de 2FA)
            ? "Explotar vulnerabilidad en servicio en la nube" (AND: Vulnerabilidad conocida, herramienta de explotación)
    - Beneficios: Los árboles de ataque son excelentes herramientas para:
        ? Generar Creatividad: Ayudan al equipo de seguridad a pensar como un atacante y a identificar vectores de ataque que quizás no se consideraron inicialmente.
        ? Análisis Objetivo: Permiten un análisis de riesgos más frío y objetivo al visualizar las dependencias.
        ? Planificación de Contramedidas: Identifican los puntos débiles y los lugares donde las contramedidas pueden ser más efectivas (cortar las ramas del árbol).
