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

Instalar en la terminal génerica:
npx create-next-app

√ What is your project named? ... front-end
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the default import alias (@/*)? ... No / Yes
√ What import alias would you like configured? ... @/*



Cosa que me tengo que mirar para ejecutar los maven y que uno comparta las clases en blockchain y back-end: https://chat.openai.com/share/cd80a350-03b9-4ebb-aab5-0d0f005c3f59

Y PARA COSAS DE MAVEN: https://youtu.be/zlHXH6maOR0?si=JsXn-JjNZs4YhwDl

Pasos de creacion proyectos maven:

    El pom.xml debo poner plugin para poder ejecutarlo. Cuando tenga todo los ficheros correctos debo ejecutar el siguiente comando: "mvn clean install" y despues ejecutar "mvn exec:java".

Para ejecutar Spring Boot debo hacer poner esto por la terminal: "./mvnw spring-boot:run"