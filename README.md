# Sistema ERP Full Stack

## Comenzando 🚀

1. Primero hay que leer e instalar todo lo del siguiente documento word: "Manual-Instalacion-Sistema-ERP-Diego-Gonzalez.docx"

2. Cuando tengamos todo instalado tenemos que clonar el repositoria. Lo haremos con este comando "git clone https://github.com/Diegopower199/Sistema-ERP-Full-Stack.git"

> [!WARNING]
> Antes de ejecutar ningun comando tenemos que crear o modificar algunos archivos. A continuacion se indicará los pasos que se deben seguir para que funcione todo correctamente.

## Configuracion 🔧

### Base de datos

#### Creación una nueva conexión en MySQL Workbench

1. Abre MySQL Workbench
2. Haz clic en "Database" en la barra de menú superior
3. Selecciona "Manage Connections" y luego "New"
4. Completa los detalles de la conexión, como nombre de conexión, host, puerto, nombre de usuario y contraseña.

Ejemplo de detalles de conexión:

- **Connection Name:** Sistema-ERP-Full-Stack
- **Host:** 127.0.0.1
- **Port:** 3306
- **Username:** root
- **Password:** [tu_contraseña]

#### Creación y Configuración de la Base de Datos

Una vez creada la conexión, sigue los siguientes pasos para configurar la base de datos:

1. Haz clic en la nueva conexión creada en MySQL Workbench.
2. Ejecuta el script `Creacion-Usuario-Y-Esquema-Sistema-ERP.sql`. Este script creará un nuevo usuario en la base de datos.
3. Ejecuta el script `Creacion-Tablas-Sistema-ERP.sql`. Este script creará las tablas necesarias para el sistema ERP.
4. Ejecuta el script `Cargar-Datos-Sistema-ERP.sql`. Este script insertará datos iniciales en las tablas del sistema ERP.

### Back-End

El fichero `application.properties` contiene la configuración de la base de datos MySQL para la aplicación Spring Boot. A continuación se describen las propiedades utilizadas:

Configuración de la base de datos MySQL:

- **spring.datasource.url**: Establece la URL de conexión JDBC a la base de datos MySQL -> jdbc:mysql://${MYSQL_HOST:localhost}:3306/db_example
- **spring.datasource.username**: El nombre del usuario para acceder a la base de datos
- **spring.datasource.password**: La contraseña para el usuario de la base de datos
- **spring.datasource.driver-class-name**: Define el nombre de la clase del controlador JDBC para la base de datos MySQL.

Configuración de JPA y Hibernate:

- **spring.jpa.database-platform**: Define la plataforma de la base de datos para Hibernate -> org.hibernate.dialect.MySQL8Dialect
- **spring.jpa.show-sql**: Especifica si Hibernate debe mostrar las consultas SQL generadas -> true
- **spring.jpa.hibernate.ddl-auto**: Controla la generación automática del esquema de la base de datos por parte de Hibernate -> update
- **logging.level.org.hibernate.SQL**: Establece el nivel de registro para las consultas SQL de Hibernate -> debug

Configuración del servidor:

- **server.port**: Define el puerto en el que se ejecutará el servidor Spring Boot -> 8080

Ejemplo del fichero `application.properties` si utilizamos este script:

Script Creacion-Usuario-Y-Esquema-Sistema-ERP.sql:

```
DROP USER IF EXISTS 'diegogonzalez'@'localhost';

CREATE USER 'diegogonzalez'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bbdd1122';

DROP SCHEMA IF EXISTS trabajotfgerp;

CREATE SCHEMA trabajotfgerp;

GRANT ALL PRIVILEGES ON trabajotfgerp.* TO 'diegogonzalez'@'localhost';

flush privileges;

USE trabajotfgerp;
```

Ejemplo de detalles del fichero `application.properties`

```
# Configuración de la base de datos MySQL
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/trabajotfgerp
spring.datasource.username=diegogonzalez
spring.datasource.password=bbdd1122
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Configuración de JPA y Hibernate
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
logging.level.org.hibernate.SQL=debug

# Configuración del servidor
server.port=8080
```

### Blockchain

El fichero `application.properties` contiene la configuración del servidor Blockchain. A continuación se describen las propiedades utilizadas:

- **PORT**: Define el puerto en el que se ejecutará el servidor Blockchain

Ejemplo de configuración del servidor Blockchain

- **PORT**=12345

> [!IMPORTANT]
> El valor de HOST y PORT de este fichero tiene que ser igual en el fichero de `GlobalConstants.java` ya que si no, no funciona

### Front-End

Creamos un fichero llamado `.env` con la plantilla del fichero `.env.sample`

El archivo .env contiene la configuración de variables de entorno para la aplicación. A continuación se describen las variables utilizadas:

- **NEXT_PUBLIC_WEB_SERVER**: Esta variable define la dirección del servidor web utilizado por la aplicación
- **NEXT_PUBLIC_WEB_PORT_BACK_END**: Este valor especifica el puerto utilizado para la comunicación con el backend de la aplicación web
- **NEXT_PUBLIC_WEB_PORT_EMAIL**: Este valor indica el puerto utilizado para la comunicación con el servidor de correo electrónico de la aplicación web

Ejemplo de configuración de servidor web y puerto:

- **NEXT_PUBLIC_WEB_SERVER**=localhost
- **NEXT_PUBLIC_WEB_PORT_BACK_END**=8080
- **NEXT_PUBLIC_WEB_PORT_EMAIL**=3001

> [!IMPORTANT]
> El valor de **NEXT_PUBLIC_WEB_PORT_BACK_END** debe ser igual al del fichero del Back-End de `application.properties`
>
> El valor de **NEXT_PUBLIC_WEB_PORT_EMAIL** debe ser igual al del fichero del servidor-correo-node-mailer de `.env`

### Servidor correo node mailer

Creamos un fichero llamado `.env` con la plantilla del fichero `.env.sample`

El archivo `.env` contiene la configuración de variables de entorno para la aplicación. A continuación se describen las variables utilizadas:

- **TRANSPORTER_USER**: Esta variable especifica el nombre de usuario utilizado para autenticarse en el servidor de correo electrónico
- **TRANSPORTER_PASSWORD**: Esta variable indica la contraseña asociada al nombre de usuario utilizado para autenticarse en el servidor de correo electrónico
- **PORT_EMAIL_SERVER**: Define el puerto en el que se ejecutará el servidor de envio de correo electronico
- **PORT_FRONT_END**: Define el puerto en el que se ejecutará el servidor de front-end
- **HOST_FRONT_END**: Esta variable define la dirección del servidor web utilizado por la aplicación.

Ejemplo de configuración de servidor web y puerto:

- **TRANSPORTER_USER**=example@gmail.com
- **TRANSPORTER_PASSWORD**=password
- **PORT_EMAIL_SERVER**=3001
- **PORT_FRONT_END**=3000
- **PORT_EMAIL_SERVER**=localhost

> [!IMPORTANT]
> El valor de **TRANSPORTER_USER** debe ser igual al del fichero del Back-End de `application.properties`
>
> El valor de **TRANSPORTER_PASSWORD** se obtiene de la siguiente manera:
>
> 1. Ir a Chrome y pulsar en el perfil (en la parte superior derecha) y hacer click en "Administrar tu cuenta de Google"
>
> 2. En la busqueda, buscar "contraseñas de aplicaciones"
>
> 3. Nombramos que nombre queremos poner y nos saldra un mensaje emergente de la contraseña, y ya tendriamos todo.
>
> El valor **PORT_FRONT_END** debe ser igual al del fichero del Front-End de `.env`

## Ejecutar ⚙️

> [!IMPORTANT]
> Antes de ejecutar cada proyecto, asegúrate de cambiar al directorio del proyecto correspondiente usando el comando `cd`:

1. **Common classes Back-End and Blockchain:**

```
cd common-backend-and-blockchain-classes
mvn clean install exec:java
```

2. **Back-End:**

```
cd back-end
./mvnw clean install spring-boot:run
```

3. **Blockchain:**

```
cd blockchain-authorized-vacations
mvn clean install exec:java
```

4. **Front-end:**

Antes de ejecutarlo, asegúrate de tener las dependencias instaladas con el comando `npm install`.

```
cd front-end
npm run dev
```

5. **Email:**

Antes de ejecutarlo, asegúrate de tener las dependencias instaladas con el comando `npm install`.

```
cd servidor-correo-node-mailer
npm run dev
```

> [!IMPORTANT]
> Cosas a tener en cuenta y que tengo que hacer:

1. Controlar si el back-end o la BBDD no funciona que en el front-end lo controle, tengo aqui un ejemplo: EjemploControlarBackEndAndBBDDEnFront.txt Lo tengo para el login (asi que los demas son iguales), solo me falta poner si no se pone que el input se pongo en rojo (Lo debo cambiar todo a Antd)

> [!WARNING] 
> COSAS QUE HACER EN EL FUTURO
> ESTO EN VACACIONES (PERO PARA UN FUTURO)
>
> - @Column(name = "fecha_solicitud", nullable = true)
> - private LocalDate fecha_solicitud;
> -
> - @Column(name = "fecha_ultima_modificacion", nullable = true)
> - private LocalDateTime fecha_ultima_modificacion;
> -
> - @ManyToOne
> -
> - @JoinColumn(name = "id_supervisor_modificacion_vacaciones", nullable = true, // Es mejor el nombre supervisor_modificacion_vacaciones asi que tengo que > acomplar a este nombre
> - foreignKey = @ForeignKey(name =
> - "FK_vacaciones_empleados_supervisor_modificacion_vacaciones"))
> - private PersonaModel supervisor_modificacion_vacaciones;
> -
> - \*/
>
> Ademas en "bajas laborales", "ayudas" y "solicitudes" debo poner lo del supervisor tambien, IMPORTANTE
>
> Otra cosa importante es cuando haga claves foraneas, al hacer JoinColumn poner por ejemplo "personaAsignada", ahora solo hay "persona" y asi con todos, no es urgente, pero es para el codigo sea legible. Ademas si se hace este cambio verlo en los ficheros repositories, ya que ahi hago referencia a variables de los models
>
> Como el siguiente ejemplo:
> @ManyToOne
> @JoinColumn(name = "id_persona", nullable = false, foreignKey = @ForeignKey(name = "FK_ayudas_empleados_personas"))
> private PersonaModel personaAsignada;
