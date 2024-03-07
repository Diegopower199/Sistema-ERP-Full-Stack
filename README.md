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

```
cd front-end
npm run dev
```

5. **Email:**

```
cd servidor-correo-node-mailer
npm run dev
```

## Aclaraciones

En el back si hay problemas se debe hacer lo siguiente en el proyecto (back-end):

    - ./mvnw clean

Funciones que utilizamos en el proyecto Maven:

    clean:
        Este comando limpia el directorio target, eliminando los archivos generados durante compilaciones anteriores
        "./mvnw clean"

    validate:
        El comando validate valida que el proyecto esté correctamente configurado y que todas las dependencias necesarias estén disponibles
        ./mvnw validate"

    compile:
        El comando compile compila el código fuente de tu proyecto. Se pueden compilar todas las clases Java y otros archivos fuente
        "./mvnw compile"

    test:
        El comando test ejecuta las pruebas unitarias en el proyecto. Las pruebas unitarias son escritas por los desarrolladores para asegurar que partes específicas del código funcionen correctamente
        "./mvnw test"

    test-compile:
        El comando test-compile compila las clases de prueba del proyecto. Esto es útil si solo quieres compilar las clases de prueba sin ejecutar las pruebas
        "./mvnw test-compile"

    package:
        El comando package toma el código compilado y lo empaqueta en un formato específico, como JAR o WAR
        "./mvnw package"

    verify:
        El comando verify ejecuta todas las verificaciones para asegurarse de que el paquete es válido y cumple con ciertos criterios. Esto incluye las pruebas y otras verificaciones definidas en el proyecto.
        "./mvnw verify"

    install:
        El comando install instala el paquete en el repositorio local de Maven, haciendo que esté disponible para otros proyectos locales.
        "./mvnw install"

    site:
        El comando site genera la documentación del proyecto, informes y otros elementos relacionados con la generación del sitio del proyecto.
        "./mvnw site"

    deploy:
        El comando deploy copia el paquete a un repositorio remoto para compartirlo con otros desarrolladores o sistemas de construcción.
        "./mvnw deploy"

Generar el front-end:

- Instalar en la terminal génerica: **npx create-next-app**

  ### √ What is your project named? ... front-end

  - √ Would you like to use TypeScript? ... <u>**No**</u> / Yes
  - √ Would you like to use ESLint? ... No / <u>**Yes**</u>
  - √ Would you like to use Tailwind CSS? ... <u>**No**</u> / Yes
  - √ Would you like to use `src/` directory? ... No / <u>**Yes**</u>
  - √ Would you like to use App Router? (recommended) ... <u>**No**</u> / Yes
  - √ Would you like to customize the default import alias (@/\*)? ... No / <u>**Yes**</u>
  - √ What import alias would you like configured? ... @/\*

Cosa que me tengo que mirar para ejecutar los maven y que uno comparta las clases en blockchain y back-end: https://chat.openai.com/share/cd80a350-03b9-4ebb-aab5-0d0f005c3f59

https://chat.openai.com/share/cd80a350-03b9-4ebb-aab5-0d0f005c3f59

Y PARA COSAS DE MAVEN: https://youtu.be/zlHXH6maOR0?si=JsXn-JjNZs4YhwDl

Pasos de creacion proyectos maven:

    El pom.xml debo poner plugin para poder ejecutarlo. Cuando tenga todo los ficheros correctos debo ejecutar el siguiente comando: "mvn clean install" y despues ejecutar "mvn exec:java".

Para ejecutar Spring Boot debo hacer poner esto por la terminal: "./mvnw spring-boot:run"

Si cambio algo en "pom.xml" de los proyectos de Maven, debo recargar el proyecto de la siguiente manera

1. Debemos ir a Java Projects de VS Code, y dar click derecho al proyecto

2. Ir a la opción Maven y hacer click en Reload Project

3. Ejecutar desde el raiz del proyecto el siguiente comando "mvn clean install"

4. Ejecuta el comando para arrancar el proyecto "mvn exec:java"

INFORMACION QUE ES IMPORTANTE, POR SI SUBO ALGO MUY PESADO Y LOS FICHEROS SON MUY LARGOS

---

El comando "git config --global core.longpaths true" configura Git para que acepte rutas de archivos más largas.

    El comando "git lfs install" sirve para manejar archivos grandes de manera eficiente en repositorios de Git.

Los siguientes comandos se hacen en cada proyecto para que Git LFS indique qué tipos de archivos específicos deben ser gestionados de manera especial debido a su tamaño.

    - git lfs track "*.class"

    - git lfs track "_.java"

    - git lfs track "_.xml"

El archivo ".gitattributes" es un archivo de configuración en Git que se utiliza para asignar atributos a los archivos y, entre otras cosas, especificar cómo Git debe tratar ciertos archivos

---

Limpiar el Caché de Git: A veces, Git puede estar reteniendo información en su caché que está interfiriendo con las reglas de .gitignore. Puedes limpiar la caché de Git utilizando el siguiente comando:

git rm -r --cached .
git add .
git commit -m "Limpiar caché de Git y volver a agregar archivos"

https://medium.com/@thearaseng/building-a-full-stack-product-app-with-react-spring-boot-and-docker-compose-64a47f4a1080
