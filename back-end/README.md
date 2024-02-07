// CAMBIAR TODO SI HAY UN GET A POST POR SEGURIDAD

Tablas

Docker compose: https://luizcostatech.medium.com/how-to-dockerize-spring-boot-react-apps-1a4aea1acc44

https://www.youtube.com/watch?v=kZ8g2c1PW0g&t=14816s

Crear tablas front: https://mui.com/material-ui/react-table/#sorting-amp-selecting

export tablas (excel, csv): https://mui.com/x/react-data-grid/export/

https://mui.com/material-ui/getting-started/templates/

HAY QUE COMPROBAR TODOS LOS CAMPOS EN LA FUNCION SERVICE

Node: https://nodejs.org/en/blog/release/v18.18.0


SOLO FALTA NOMINAS

Almacen:
    - Categorias
    - Subcategorias
    

DEBO TENER EN TODOS LOS CONTROLLER LO SIGUIENTE PARA QUE EL FRONBT PUEDA PEDIR PETICIONES -> @CrossOrigin(origins = "http://localhost:3000")
Aqui esta la explicacion: https://chat.openai.com/share/ab29a897-e480-4df6-814a-992b673f9004



Para ejecutar los comandas de Maven de Lifecycle debo hacerlo por consola

Ejecutar el back-end:

    - ./mvnw spring-boot:run

    Importante para una clase genérica: https://www.youtube.com/watch?v=g8IqT45n9x4


Permisos, muy importante de ver esto: https://chat.openai.com/share/4a7cd15e-d632-4f68-97ea-1b1b7ee55df2
https://chat.openai.com/share/a3be0acd-921c-4e1b-9854-678a48643f0b
https://chat.openai.com/share/ed213ecf-3a9a-4291-a61d-c56bac8dea1f

CREATE TABLE permisos (
    id_permiso INT PRIMARY KEY,
    -- Permisos para Recursos Humanos
    asistencia_crear BOOLEAN DEFAULT FALSE,
    asistencia_actualizar BOOLEAN DEFAULT FALSE,
    asistencia_ver BOOLEAN DEFAULT FALSE,
    asistencia_borrar BOOLEAN DEFAULT FALSE,
    ayudas_crear BOOLEAN DEFAULT FALSE,
    ayudas_actualizar BOOLEAN DEFAULT FALSE,
    ayudas_ver BOOLEAN DEFAULT FALSE,
    ayudas_borrar BOOLEAN DEFAULT FALSE,
    bajas_laborales_crear BOOLEAN DEFAULT FALSE,
    bajas_laborales_actualizar BOOLEAN DEFAULT FALSE,
    bajas_laborales_ver BOOLEAN DEFAULT FALSE,
    bajas_laborales_borrar BOOLEAN DEFAULT FALSE,
    solicitudes_crear BOOLEAN DEFAULT FALSE,
    solicitudes_actualizar BOOLEAN DEFAULT FALSE,
    solicitudes_ver BOOLEAN DEFAULT FALSE,
    solicitudes_borrar BOOLEAN DEFAULT FALSE,
    vacaciones_crear BOOLEAN DEFAULT FALSE,
    vacaciones_actualizar BOOLEAN DEFAULT FALSE,
    vacaciones_ver BOOLEAN DEFAULT FALSE,
    vacaciones_borrar BOOLEAN DEFAULT FALSE,
    -- Permisos para el módulo de Clientes
    crear_clientes BOOLEAN DEFAULT FALSE,
    actualizar_clientes BOOLEAN DEFAULT FALSE,
    ver_clientes BOOLEAN DEFAULT FALSE,
    borrar_clientes BOOLEAN DEFAULT FALSE,
    crear_pedidos_clientes BOOLEAN DEFAULT FALSE,
    actualizar_pedidos_clientes BOOLEAN DEFAULT FALSE,
    ver_pedidos_clientes BOOLEAN DEFAULT FALSE,
    borrar_pedidos_clientes BOOLEAN DEFAULT FALSE,
    -- Permisos para el módulo de Facturación
    crear_facturas BOOLEAN DEFAULT FALSE,
    actualizar_facturas BOOLEAN DEFAULT FALSE,
    ver_facturas BOOLEAN DEFAULT FALSE,
    borrar_facturas BOOLEAN DEFAULT FALSE,
    crear_detalles_facturas BOOLEAN DEFAULT FALSE,
    actualizar_detalles_facturas BOOLEAN DEFAULT FALSE,
    ver_detalles_facturas BOOLEAN DEFAULT FALSE,
    borrar_detalles_facturas BOOLEAN DEFAULT FALSE,
    crear_pagos_facturas BOOLEAN DEFAULT FALSE,
    actualizar_pagos_facturas BOOLEAN DEFAULT FALSE,
    ver_pagos_facturas BOOLEAN DEFAULT FALSE,
    borrar_pagos_facturas BOOLEAN DEFAULT FALSE
);
