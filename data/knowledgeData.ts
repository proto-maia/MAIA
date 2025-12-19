
export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
}

const example1 = `# Caso 1: Organización de apoyo a defensoras comunitarias

## Contexto

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

Guardar códigos de recuperación fuera del dispositivo.`;

const example2 = `# Caso 2: Organización Feminista de Acompañamiento

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

Manual interno de manejo de crisis comunicacionales.`;

const example3 = `# Caso 3: Colectivo Ambientalista Rural

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

Publicar copias en múltiples canales (redes, aliados, blogs independientes).`;

const jurist = `# Metodología JURIST para OpSec

Tuve una conversación sobre las necesidades de modelado de amenazas para una organización que necesita pensar de manera integral sobre las amenazas, no solo las típicas amenazas de seguridad informática que solemos tratar en el modelado de amenazas. Uno de mis colegas mencionó que sería bueno tener una herramienta como STRIDE para generar conversaciones y pensar en torno a posibles áreas de amenazas. Poco después nació JURIST. Todavía es un trabajo en progreso, por supuesto, pero podría ser útil para que alguien comience a pensar. Esto fue creado pensando específicamente en los tipos de amenazas que enfrentan abogados y periodistas, pero sospecho que es bastante general.

#### Judicial Attack (Ataque Judicial)

Dependiendo de quién sea el atacante y qué tipo de activos estés tratando de proteger, diferentes tipos de ataques legales podrían ser muy probables. Estos pueden tomar varias formas diferentes: mandatos judiciales, demandas por difamación, arrestos o retiro de licencias para operar. El atacante puede ser estados nación, corporaciones o individuos privados; esta vía de ataque requiere algunos recursos por parte del atacante, pero no cantidades extremas.

#### Use of Force (Uso de la Fuerza)

Dependiendo de la ubicación y en qué tipo de área se encuentren los activos, esto puede ser más o menos probable. El rango va desde violencia estatal por parte de la policía o el ejército, asesinatos, amenazas físicas, daño a edificios o equipos hasta diferentes tipos de ataques de denegación de servicio como manifestaciones y desobediencia civil.

#### Resources (Recursos)

Hay varias formas en que un oponente puede usar recursos y dinero para atacar. Las formas más comunes serían cosas como el soborno o la compra de información o entidades. Los recursos también se pueden usar para propaganda de diferentes tipos, tanto desinformación como difamación.

#### InfoSec (Seguridad de la Información)

En medio de pensar en tipos genéricos de ataques, todos los tipos de ataques de seguridad de la información que el modelado de amenazas regular analiza también son aplicables. Por lo tanto, STRIDE puede ser útil para integrarlo aquí.

#### Surveillance (Vigilancia)

En muchos casos, diferentes tipos de espionaje pueden ser medidas de ataque muy potentes. Esto incluye seguimiento físico, colocación de diferentes tipos de micrófonos, vigilancia por video, uso de registros telefónicos y ubicaciones de teléfonos móviles y el tipo de vigilancia masiva que ahora sabemos que usan los estados nación. Los tipos más básicos de vigilancia están al alcance de la mayoría de los atacantes, mientras que los tipos más sofisticados son dominio exclusivo de gobiernos y grandes corporaciones.

#### Theft (Robo)

El tipo final de ataque es el robo: esto puede suceder mediante allanamientos, personas internas, robos en la calle o cualquiera de las otras formas en que las personas se roban cosas entre sí.

#### Conclusión

Espero que esta sea una descripción general útil del tipo de riesgos de seguridad operativa que puedes enfrentar. Como se mencionó anteriormente, probablemente no esté completo y algo de esto sea un poco forzado. Recuerda, es una herramienta para generar ideas, no una lista de verificación.`;

const book = `# Introducción al Modelado de Amenazas

## Introducción

Como se mencionó numerosas veces, la seguridad se trata de tomar decisiones racionales sobre qué posibles amenazas enfrentas y cuáles son las mitigaciones adecuadas para ellas. Es *posible*, pero no fácil, simplemente improvisar esto. Sin embargo, para la mayoría, eso conduciría a errores. En su lugar, podemos usar un proceso llamado Modelado de Amenazas para ayudarnos. Este proceso es una herramienta, algo que se puede utilizar para que sea más probable tener éxito y para simplificar tu estrategia.

El resultado del proceso de Modelado de Amenazas se llama Modelo de Amenazas. Este debería ser un documento vivo, algo que puedas actualizar continuamente. También puedes tener más de un modelo, cada uno para diferentes contextos o circunstancias. Por ejemplo, puedes tener uno para tu vida habitual, uno para cuando viajas y uno para un proyecto específico del que eres parte.

Mi objetivo con este capítulo es describir cómo pienso sobre el modelado de amenazas, para mí mismo, con el propósito de modelar para OpSec. El proceso es intencionalmente bastante simple. Una de las formas en que el pensamiento de seguridad a menudo sale mal es que piensas en una amenaza específica y se te ocurre una "historia" que suena probable. Pero el problema es que cuando los humanos piensan en eventos desde una perspectiva narrativa, tenemos tendencia a ser malos juzgando la probabilidad. También a menudo pasamos por alto amenazas cuando pensamos en historias. Por lo tanto, el enfoque aquí está destinado intencionalmente a no utilizar este tipo de pensamiento.

Este tipo de modelado se puede hacer en grupos o solo, dependiendo del propósito del Modelo de Amenazas. Hacerlo de manera colaborativa a menudo puede producir mejores resultados, ya que es menos probable que olvides detalles cuando tienes varias personas ayudando.

Dado que un modelo de amenazas a veces puede contener detalles sensibles, puede ser una buena idea asegurarse de que la información se mantenga segura. En algunos casos esto no importa, por ejemplo, si tienes un activo donde la existencia del activo en sí es sensible, vale la pena proteger el modelo. Irónicamente, incluso podría ser una buena idea incluir el modelo de amenazas en sí mismo como un activo para proteger, dentro de tu modelo de amenazas.

El flujo general de este estilo de ejercicio de modelado de amenazas comienza elaborando listas de activos, adversarios y posibles ataques. Una vez que tienes estos, los combinas en una lista de riesgos. Finalmente, decides qué mitigaciones, si las hay, aplicarás a los riesgos. También debes evaluar la efectividad de las mitigaciones.

Como con muchas cosas, el modelado de amenazas no surgirá de forma natural al principio. No te preocupes, es normal. Es una buena idea practicar el modelado de amenazas varias veces antes de usarlo en la realidad.

Recuerda, el modelado de amenazas es una herramienta. El único objetivo es ayudarte a tomar decisiones de seguridad mejores y más racionales.

## "Modela tus activos"

El primer paso es pensar en tus activos. Estas son las cosas que quieres proteger, las cosas que tienen valor. Los activos pueden ser cualquier cosa, no solo elementos físicos. Activos típicos pueden ser dinero, tu cámara, tu vida, tu libertad, información sensible, la integridad de los datos o muchas otras cosas. Como puedes ver, algunos activos son táctiles y tangibles, mientras que otros son intangibles y más como ideas. Fundamentalmente, el objetivo es enumerar lo que podrías querer proteger en este modelo de amenazas. Si quieres, también puedes asignar un valor a cada activo. Este valor es puramente relativo y es solo algo que usarás para priorizar más tarde.

A veces, las personas tienen problemas para averiguar qué son buenos activos. Por ejemplo, cámaras de vigilancia que están en su lugar para asegurar que nadie entre a tu oficina; ¿es eso un buen activo? La mayoría de las veces, no. Queremos proteger la integridad de las cámaras, pero hacerlo no tiene ningún valor en sí mismo. Y es esta idea de valor intrínseco la que es más útil para distinguir los buenos activos de los malos. Si algo vale la pena proteger de forma aislada del resto del modelo, probablemente sea un buen activo.

Como hablamos antes, los modelos de amenazas no tienen que cubrir todo. Puedes tener varios modelos para diferentes propósitos. Entonces, si bien en tu modelo de amenazas personal, tu cuenta bancaria y pertenencias personales probablemente sean buenos activos, probablemente no necesites incluirlos cuando hagas un modelo para tu grupo de protesta política.

Una cosa que notarás rápidamente es que en muchos casos tendrás muchos activos compartidos. También habrá únicos, pero compartir es muy común. La razón es simple: tenemos preocupaciones compartidas que debemos tener en cuenta sin importar el contexto.

## "Piensa en tus adversarios"

Una cosa que hace que la seguridad sea diferente de otros campos, como la ingeniería de resiliencia y la planificación de desastres, es que en seguridad alguien está trabajando en nuestra contra. Si no hay otra parte, no necesitas seguridad. Por lo tanto, una parte integral del modelado de amenazas es pensar en la posible parte opuesta. Estos pueden considerarse antagonistas, enemigos u opuestos. Aquí usaremos el término adversario.

Un adversario tiene intención. Están actuando activa o pasivamente amenazas contra tus activos. Debido a la intencionalidad, los animales no son adversarios. La naturaleza no lo es. En general, tu familia tampoco lo será, a menos que exista el riesgo de que trabajen activamente en contra de tus intereses.

Al igual que con los activos, comienza creando una lista. Por ahora, no pienses en *cómo* podrían atacarte. Simplemente considera cualquier entidad, persona u organización que podría tener la posibilidad de ser una amenaza. Podría ser realmente descabellado, al igual que con los activos, las alternativas menos probables desaparecerán más tarde. Por ahora, es más importante ser exhaustivo, para no perder un adversario que podría ser un problema real para ti más tarde.

Mientras haces la lista, piensa en cuán poderoso crees que es el adversario y asigna una puntuación para eso. 1-5 funciona bien. Esto es solo para que sea más fácil más tarde pensar si un adversario específico es lo suficientemente poderoso como para instigar realmente un tipo específico de ataque.

Al pensar en adversarios, trata de evitar pensar en motivaciones. No pienses demasiado en los activos en esta etapa. El *por qué* de un adversario puede restringir tu pensamiento y perderás mitigaciones que habrían sido realmente valiosas de considerar.

## "Analiza posibles amenazas y ataques"

El siguiente paso es comenzar a pensar en diferentes tipos de amenazas o ataques contra los activos. En este punto, es mejor ignorar a los adversarios. Simplemente revisa cada uno de los activos y piensa en diferentes formas en que ese activo específico podría verse amenazado. En esta etapa suele ser bueno ser lo más detallado posible y proponer tantos ataques como sea posible.

Como de costumbre, trata de evitar entrar en el modo de contar historias. Al igual que con los activos y los adversarios, esto puede llevar a perder aspectos.

El mayor problema con esta etapa es que a veces requiere creatividad y a veces conocimiento para proponer amenazas adecuadas. Existen algunas técnicas que se pueden utilizar para ayudar a extraer ideas potenciales. Una técnica se llama Árboles de Ataque. Con esto, comienzas con un objetivo de alto nivel y luego te preguntas repetidamente cómo lograr ese objetivo. Al hacer esto una y otra vez, pasarás de ataques genéricos a otros muy específicos.

Otra herramienta es utilizar taxonomías de tipos de ataques. Al usarlas, recordarás las posibles formas en que se pueden perpetrar los ataques. Uno se llama STRIDE. Se ha utilizado específicamente para amenazas de seguridad de la información. También he usado otro, llamado JURIST. Esto es más genérico y se aplica a cualquier cosa que puedas encontrar en OpSec.

Recuerda, estas son herramientas. El propósito es que propongas amenazas útiles. Y honestamente, no importa qué técnicas uses, si el resultado es una lista completa de amenazas, eso es todo lo que importa.

## "Combina todo en una tabla de riesgos"

Ahora deberías tener 3 tablas, una con activos, una con adversarios y una con amenazas específicas contra activos. El siguiente paso es combinar las amenazas con adversarios específicos. La forma de hacerlo es simplemente revisar cada adversario y, para cada uno, revisar la lista de amenazas. Si crees que existe alguna posibilidad de que ese adversario ejecute esa amenaza, agrégala a la tabla de riesgos. Finalmente, para cada entrada en la tabla de riesgos, averigua dos números.

El primero es la probabilidad de que ese adversario ejecute esa amenaza. Al considerar este número, finalmente piensas en las motivaciones. Básicamente, tienes que preguntar si el adversario tiene algún interés en el activo, por alguna razón, y si el adversario tiene la capacidad de ejecutar la amenaza.

El segundo número es el impacto. Básicamente, si se ejecuta la amenaza, qué tan malo sería. Usa una escala relativa, algo así como 1-5 o 1-10. Para muchas amenazas, este número será independiente del adversario, pero en algunos casos sí importa, por eso lo tenemos aquí.

Si quieres, ahora puedes filtrar la lista de riesgos por primera vez. Puedes eliminar riesgos con probabilidad realmente baja o con impacto muy bajo. También está bien mantenerlo hasta el siguiente paso.

Debes ordenar la lista en orden descendente, de la combinación de probabilidad e impacto. Este es el orden en que comenzaremos a ver los riesgos.

## "Propón mitigaciones adecuadas"

Ahora que sabemos cuáles son los riesgos y sabemos los más importantes, podemos empezar a pensar en mitigaciones.

Para cada riesgo, primero decidirás qué hacer al respecto. Fundamentalmente, hay tres respuestas básicas a un riesgo. Puedes mitigarlo, puedes transferirlo o puedes aceptarlo. Mitigarlo significa que propones una o más medidas que tomarás, y estas medidas reducirán la probabilidad o el impacto, o ambos, de un riesgo. Es importante recordar que nunca se puede mitigar un riesgo por completo, y generalmente no vale la pena intentarlo.

Transferir un riesgo es básicamente decir que es problema de otra persona. No estás ignorando el riesgo, solo notando que no puedes hacer mucho al respecto. Por ejemplo, hay muchos riesgos relacionados con las tarjetas de débito en los que no pensamos. En cambio, transferimos estos riesgos a nuestros bancos.

El enfoque final es aceptar el riesgo. Si podemos proponer buenas mitigaciones, o es un riesgo que estamos dispuestos a correr, aceptarlo está bien.

Ten en cuenta que en esta etapa solo estás proponiendo mitigaciones *potenciales*. Todavía no hemos decidido qué mitigaciones usar realmente o no.

## "Evalúa y decide sobre las mitigaciones"

Una vez que tengas tu lista de mitigaciones potenciales, debes revisarlas todas y evaluarlas. El primer paso es revisar cada mitigación y pensar en el costo de la misma, en términos de dinero, esfuerzo, inconveniencia, cualquier cosa que sea relevante. Una vez hecho esto, debes revisar cada riesgo nuevamente. Esta vez, mira las mitigaciones potenciales y evalúa qué tan efectiva sería cada mitigación. Finalmente, decide qué mitigaciones adoptar en función del costo y la efectividad potencial. Al final, tendrás una lista de mitigaciones para implementar en tu estrategia de OpSec. Eso marca el final del ejercicio.

Como se mencionó anteriormente, el modelado de amenazas tiene que ser un proceso vivo, algo que debe revisarse una y otra vez.

## "A veces una postura de amenaza está bien"

Todo lo que acabo de describir parece mucho trabajo, y puede serlo. Sin embargo, hay una razón para hacerlo de esta manera: quieres asegurarte de no perder nada importante. ¿Pero siempre tienes que hacer este proceso? ¿Yo siempre lo hago? La respuesta es no. Cuando tienes suficiente experiencia e instinto, a veces puedes saltarte el modelo de amenazas completo y simplificar un poco las cosas. Solo recuerda, corres un riesgo adicional al cortocircuitar el proceso.

Un área donde a menudo puede ser razonablemente seguro no pasar por el modelo de amenazas completo es en el área que llamo Higiene de Seguridad. Al igual que no necesitas hacer un análisis profundo de si debes usar jabón al lavarte las manos, hay aspectos básicos de seguridad que, en general, todos deberían hacer. Cosas como contraseñas adecuadas, discos duros cifrados y copias de seguridad son tan fundamentales que no necesitas hacer un modelo de amenazas para decidir usarlas.

Para temas más complicados, puedes adoptar lo que llamo una Postura de Amenaza. Este es un modelo de amenazas radicalmente simplificado, donde no haces explícitas la mayoría de las cosas. La suposición es que ya conoces bastante bien tus activos y también comprendes los riesgos probables. Una postura de amenaza es básicamente un conjunto genérico de mitigaciones que, a través de la experiencia, has decidido que probablemente te brindarán una protección lo suficientemente buena contra los riesgos que te preocupan.

Cuando estás empezando, nunca uses posturas de amenaza. Aprende a hacer un modelado de amenazas correctamente primero. Practica y asegúrate de entenderlo profundamente.

## Conclusión

El modelado de amenazas, implícito o explícito, está en el núcleo de la seguridad. He dicho muchas veces que la seguridad adecuada es relativa, no es perfecta, y es práctica. El modelado de amenazas es lo que la hace todas esas cosas.

Leer este capítulo no te convertirá en un experto en modelado de amenazas. Para hacerlo correctamente, necesitas todo tipo de conocimientos. Pero incluso con ese conocimiento, aún necesitarás practicar. El modelado de amenazas es una habilidad y no surge de forma natural. He conocido a muchas grandes personas de seguridad que no tienen ningún sentido para el modelado de amenazas, porque nunca lo hicieron. Y como consecuencia, proponen mitigaciones que son completamente incorrectas y pasan por alto riesgos obvios. No seas así. Pon la práctica del modelado de amenazas en la base de tu vida de seguridad.

Y no olvides practicar, diligentemente.`;

const workshops = `# Modelado de Amenazas: Un Enfoque Proactivo y Adaptativo

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
        ? Planificación de Contramedidas: Identifican los puntos débiles y los lugares donde las contramedidas pueden ser más efectivas (cortar las ramas del árbol).`;

export const fileSystem: FileNode[] = [
  {
    id: 'folder_user_files',
    name: 'Mis archivos',
    type: 'folder',
    children: []
  },
  {
    id: 'folder_ejemplos',
    name: 'Ejemplos Prácticos',
    type: 'folder',
    children: [
      { id: 'file_caso_1', name: 'Caso 1: Organización Defensoras', type: 'file', content: example1 },
      { id: 'file_caso_2', name: 'Caso 2: Organización Feminista', type: 'file', content: example2 },
      { id: 'file_caso_3', name: 'Caso 3: Colectivo Ambientalista', type: 'file', content: example3 },
    ]
  },
  {
    id: 'folder_fundamentos',
    name: 'Fundamentos Teóricos',
    type: 'folder',
    children: [
      { id: 'file_jurist', name: 'Metodología JURIST', type: 'file', content: jurist },
      { id: 'file_intro', name: 'Introducción al Modelado', type: 'file', content: book },
      { id: 'file_proactivo', name: 'Enfoque Proactivo y Adaptativo', type: 'file', content: workshops },
    ]
  }
];