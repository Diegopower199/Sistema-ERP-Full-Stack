# Sistema ERP Full Stack

Primero hay que leer e instalar todo lo del siguiente documento word: "Manual-Instalacion-Sistema-ERP-Diego-Gonzalez.docx"

Comandos a ejecutar sin tener el archivo tasks.json:

    - back-end: ./mvnw clean install spring-boot:run 

    - blockchain-authorized-vacations: mvn clean install exec:java

    - common-backend-and-blockchain-classes: mvn clean install exec:java

    - front-end: npm run dev

    - servidor-correo-node-mailer: npm run dev






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
    - √ Would you like to customize the default import alias (@/*)? ... No / <u>**Yes**</u>
    - √ What import alias would you like configured? ... @/*



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

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
El comando "git config --global core.longpaths true" configura Git para que acepte rutas de archivos más largas.

    El comando "git lfs install" sirve para manejar archivos grandes de manera eficiente en repositorios de Git.

Los siguientes comandos se hacen en cada proyecto para que Git LFS indique qué tipos de archivos específicos deben ser gestionados de manera especial debido a su tamaño.

    - git lfs track "*.class"

    - git lfs track "_.java"

    - git lfs track "_.xml"

El archivo ".gitattributes" es un archivo de configuración en Git que se utiliza para asignar atributos a los archivos y, entre otras cosas, especificar cómo Git debe tratar ciertos archivos

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

Limpiar el Caché de Git: A veces, Git puede estar reteniendo información en su caché que está interfiriendo con las reglas de .gitignore. Puedes limpiar la caché de Git utilizando el siguiente comando:

  git rm -r --cached .
  git add .
  git commit -m "Limpiar caché de Git y volver a agregar archivos"




https://medium.com/@thearaseng/building-a-full-stack-product-app-with-react-spring-boot-and-docker-compose-64a47f4a1080