USE trabajotfgerp;

-- ========================================
-- Permisos Usuarios
-- ========================================
-- Permiso Administradores
INSERT INTO `trabajotfgerp`.`permisos_usuarios` (`actualizar_asistencias`, `actualizar_ayudas`, `actualizar_bajas_laborales`, `actualizar_clientes`, `actualizar_detalles_facturas`, `actualizar_facturas`, `actualizar_nominas`, `actualizar_pagos_facturas_clientes`, `actualizar_pedidos_clientes`, `actualizar_personas`, `actualizar_solicitudes`, `actualizar_usuarios`, `actualizar_vacaciones`, `borrar_asistencias`, `borrar_ayudas`, `borrar_bajas_laborales`, `borrar_clientes`, `borrar_detalles_facturas`, `borrar_facturas`, `borrar_nominas`, `borrar_pagos_facturas_clientes`, `borrar_pedidos_clientes`, `borrar_personas`, `borrar_solicitudes`, `borrar_usuarios`, `borrar_vacaciones`, `crear_asistencias`, `crear_ayudas`, `crear_bajas_laborales`, `crear_clientes`, `crear_detalles_facturas`, `crear_facturas`, `crear_nominas`, `crear_pagos_facturas_clientes`, `crear_pedidos_clientes`, `crear_personas`, `crear_solicitudes`, `crear_usuarios`, `crear_vacaciones`, `ver_asistencias`, `ver_ayudas`, `ver_bajas_laborales`, `ver_clientes`, `ver_detalles_facturas`, `ver_facturas`, `ver_nominas`, `ver_pagos_facturas_clientes`, `ver_pedidos_clientes`, `ver_personas`, `ver_section_clientes`, `ver_section_facturacion`, `ver_section_recursos_humanos`, `ver_solicitudes`, `ver_usuarios`, `ver_vacaciones`) VALUES (TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);
-- Permiso Usuarios Normales
INSERT INTO `trabajotfgerp`.`permisos_usuarios` (`ver_asistencias`, `ver_ayudas`, `ver_bajas_laborales`, `ver_personas`,  `ver_section_clientes`, `ver_section_facturacion`, `ver_section_recursos_humanos`, `ver_solicitudes`, `ver_vacaciones`, `ver_clientes`, `ver_pedidos_clientes`,`ver_facturas`, `ver_detalles_facturas`, `ver_pagos_facturas_clientes`) VALUES (TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);
-- Permiso Recursos Humanos
INSERT INTO `trabajotfgerp`.`permisos_usuarios` (`actualizar_asistencias`, `actualizar_ayudas`, `actualizar_bajas_laborales`, `actualizar_facturas`, `actualizar_personas`, `actualizar_solicitudes`, `actualizar_vacaciones`, `crear_asistencias`, `crear_ayudas`, `crear_bajas_laborales`, `crear_nominas`, `crear_personas`, `crear_solicitudes`, `crear_vacaciones`, `ver_asistencias`, `ver_ayudas`, `ver_bajas_laborales`, `ver_nominas`, `ver_personas`, `ver_section_recursos_humanos`, `ver_solicitudes`, `ver_vacaciones`) VALUES (TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);
-- Permiso Clientes
INSERT INTO `trabajotfgerp`.`permisos_usuarios` (`crear_clientes`, `actualizar_clientes`, `ver_clientes`, `crear_pedidos_clientes`, `actualizar_pedidos_clientes`, `ver_pedidos_clientes`, `ver_section_clientes`) VALUES (TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);
-- Permiso Facturación
INSERT INTO `trabajotfgerp`.`permisos_usuarios` (`crear_facturas`, `crear_detalles_facturas`, `crear_pagos_facturas_clientes`, `actualizar_facturas`, `actualizar_detalles_facturas`, `actualizar_pagos_facturas_clientes`, `ver_facturas`, `ver_detalles_facturas`, `ver_pagos_facturas_clientes`, `ver_section_facturacion`) VALUES (TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);


-- ========================================
-- Tipos estados facturas
-- ========================================
INSERT INTO `trabajotfgerp`.`tipos_estados_facturas` (`tipo_estado_factura`) VALUES ('Pendiente de facturar');
INSERT INTO `trabajotfgerp`.`tipos_estados_facturas` (`tipo_estado_factura`) VALUES ('Facturado');
INSERT INTO `trabajotfgerp`.`tipos_estados_facturas` (`tipo_estado_factura`) VALUES ('Cerrado sin facturar');



-- ========================================
-- Tipos estados
-- ========================================
INSERT INTO `trabajotfgerp`.`tipos_estados` (`tipo_estado`) VALUES ('Pendiente de revisión');
INSERT INTO `trabajotfgerp`.`tipos_estados` (`tipo_estado`) VALUES ('Aprobado');
INSERT INTO `trabajotfgerp`.`tipos_estados` (`tipo_estado`) VALUES ('Rechazado');
INSERT INTO `trabajotfgerp`.`tipos_estados` (`tipo_estado`) VALUES ('Pendiente de pago');
INSERT INTO `trabajotfgerp`.`tipos_estados` (`tipo_estado`) VALUES ('Pago realizado');
INSERT INTO `trabajotfgerp`.`tipos_estados` (`tipo_estado`) VALUES ('Cancelado');
INSERT INTO `trabajotfgerp`.`tipos_estados` (`tipo_estado`) VALUES ('Generada');
INSERT INTO `trabajotfgerp`.`tipos_estados` (`tipo_estado`) VALUES ('Enviada');



-- ========================================
-- Tipos usuarios
-- ========================================
INSERT INTO `trabajotfgerp`.`tipos_usuarios` (`tipo_usuario`, `id_permiso_usuario`) VALUES ('Administrador', '1');
INSERT INTO `trabajotfgerp`.`tipos_usuarios` (`tipo_usuario`, `id_permiso_usuario`) VALUES ('Usuario Normal', '2');
INSERT INTO `trabajotfgerp`.`tipos_usuarios` (`tipo_usuario`, `id_permiso_usuario`) VALUES ('Recursos humanos', '3');
INSERT INTO `trabajotfgerp`.`tipos_usuarios` (`tipo_usuario`, `id_permiso_usuario`) VALUES ('Cliente', '4');
INSERT INTO `trabajotfgerp`.`tipos_usuarios` (`tipo_usuario`, `id_permiso_usuario`) VALUES ('Facturación', '5');



-- ========================================
-- Tipos personas
-- ========================================
INSERT INTO `trabajotfgerp`.`tipos_personas` (`tipo_persona`) VALUES ('Empleado');
INSERT INTO `trabajotfgerp`.`tipos_personas` (`tipo_persona`) VALUES ('No empleado');
INSERT INTO `trabajotfgerp`.`tipos_personas` (`tipo_persona`) VALUES ('Becario');
INSERT INTO `trabajotfgerp`.`tipos_personas` (`tipo_persona`) VALUES ('Ex empleado');



-- ========================================
-- Tipos solicitudes
-- ========================================
INSERT INTO `trabajotfgerp`.`tipos_solicitudes` (`tipo_solicitud`) VALUES ('Vacaciones');
INSERT INTO `trabajotfgerp`.`tipos_solicitudes` (`tipo_solicitud`) VALUES ('Ayudas');
INSERT INTO `trabajotfgerp`.`tipos_solicitudes` (`tipo_solicitud`) VALUES ('Bajas laborales');



-- ========================================
-- Motivos bajas
-- ========================================
INSERT INTO `trabajotfgerp`.`motivos_bajas` (`motivo_baja`) VALUES ('Vacaciones');
INSERT INTO `trabajotfgerp`.`motivos_bajas` (`motivo_baja`) VALUES ('Enfermedad');
INSERT INTO `trabajotfgerp`.`motivos_bajas` (`motivo_baja`) VALUES ('Licencia por maternidad');
INSERT INTO `trabajotfgerp`.`motivos_bajas` (`motivo_baja`) VALUES ('Licencia por paternidad');
INSERT INTO `trabajotfgerp`.`motivos_bajas` (`motivo_baja`) VALUES ('Licencia por estudios');



-- ========================================
-- Tipos ayudas
-- ========================================
INSERT INTO `trabajotfgerp`.`tipos_ayudas` (`tipo_ayuda`) VALUES ('Comida');
INSERT INTO `trabajotfgerp`.`tipos_ayudas` (`tipo_ayuda`) VALUES ('Transporte');
INSERT INTO `trabajotfgerp`.`tipos_ayudas` (`tipo_ayuda`) VALUES ('Guarderias');



-- ========================================
--  Personas
-- ========================================
-- Tipo persona 1 (Empleado)
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Master', 'diegogs2323@gmail.com', 'Calle Administrativa 1', '12345678A', '1986-01-01', 'Masculino', 'Admin', '1', '34678901234', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Gonzalez', 'diego.gonzalez@gmail.com', 'Calle Principal 123', '12345678H', '1990-12-12', 'Masculino', 'Diego', '2', '34671234567', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Martinez', 'laura.martinez@yahoo.com', 'Avenida Central 456', '98765432R', '1985-05-05', 'Femenino', 'Laura', '3', '3467890123', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Rodriguez', 'carlos.rodriguez@hotmail.com', 'Calle Secundaria 789', '13579246S', '1995-08-20', 'Masculino', 'Carlos', '4', '34671234568', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Fernandez', 'ana.fernandez@gmail.com', 'Calle Residencial 101', '24681357K', '2000-03-15', 'Femenino', 'Ana', '5', '34672345679', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Lopez', 'pablo.lopez@yahoo.com', 'Avenida Principal 567', '65432109H', '1987-11-10', 'Masculino', 'Pablo', '6', '34673456780', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Sanchez', 'marina.sanchez@hotmail.com', 'Calle Central 123', '10987654R', '1992-09-25', 'Femenino', 'Marina', '7', '34674567891', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Gomez', 'javier.gomez@gmail.com', 'Avenida Secundaria 456', '32109876S', '1983-07-18', 'Masculino', 'Javier', '8', '34675678902', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Perez', 'sara.perez@yahoo.com', 'Calle Residencial 789', '76543210K', '1998-04-03', 'Femenino', 'Sara', '9', '34676789013', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Hernandez', 'adrian.hernandez@gmail.com', 'Avenida Principal 101', '54321098H', '1980-12-29', 'Masculino', 'Adrian', '10', '34677890124', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Gómez', 'luisa.gomez@gmail.com', 'Calle Secundaria 202', '67890123J', '1994-06-08', 'Femenino', 'Noemí', '19', '34678901237', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Martínez', 'rafael.martinez@yahoo.com', 'Avenida Central 303', '65432109T', '1989-02-14', 'Masculino', 'Miguel', '20', '34671234560', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('González', 'gabriel.gonzalez@gmail.com', 'Calle Principal 101', '12345678Z', '1991-12-30', 'Masculino', 'Gabriel', '23', '34675678904', '1');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Gonzalez', 'maria.gonzalez@yahoo.com', 'Calle Residencial 808', '12345678K', '1981-07-18', 'Femenino', 'Maria', '24', '34676789015', '1');

-- Tipo persona 2 (No empleado)
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Vega', 'noemi.vega@yahoo.com', 'Calle Secundaria 202', '87654321J', '1994-06-08', 'Femenino', 'Noemí', '11', '34678901236', '2');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Ruiz', 'miguel.ruiz@hotmail.com', 'Avenida Central 303', '13579864Q', '1989-02-14', 'Masculino', 'Miguel', '12', '34671234569', '2');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('García', 'luisa.garcia@gmail.com', 'Calle Mayor 505', '98765432W', '1990-09-25', 'Femenino', 'Luisa', '21', '34678901238', '2');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Perez', 'juan.perez@gmail.com', 'Avenida Principal 909', '23456789S', '1996-04-03', 'Masculino', 'Juan', '25', '34677890126', '2');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Martínez', 'raquel.martinez@hotmail.com', 'Calle Principal 303', '12345678X', '1993-07-10', 'Femenino', 'Raquel', '26', '34672345671', '2');

-- Tipo persona 3 (Becario)
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Cortes', 'elena.cortes@gmail.com', 'Calle Residencial 404', '24681357P', '1997-10-21', 'Femenino', 'Elena', '13', '34672345670', '3');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Fuentes', 'alejandro.fuentes@yahoo.com', 'Avenida Principal 505', '65432109X', '1991-05-16', 'Masculino', 'Alejandro', '14', '34673456781', '3');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Molina', 'isabel.molina@hotmail.com', 'Calle Secundaria 606', '10987654Y', '1986-03-05', 'Femenino', 'Isabel', '15', '34674567892', '3');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Romero', 'manuel.romero@yahoo.com', 'Avenida Central 404', '76543210M', '1985-03-18', 'Masculino', 'Manuel', '22', '34671234561', '3');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Gómez', 'alberto.gomez@gmail.com', 'Avenida Secundaria 202', '54321098Y', '1987-05-02', 'Masculino', 'Alberto', '27', '34673456782', '3');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Herrera', 'laura.herrera@yahoo.com', 'Calle Residencial 101', '78901234N', '1995-11-28', 'Femenino', 'Laura', '28', '34674567893', '3');

-- Tipo persona 4 (Ex empleado)
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Ramos', 'jorge.ramos@gmail.com', 'Avenida Central 707', '32109876M', '1993-09-12', 'Masculino', 'Jorge', '16', '34675678903', '4');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Lara', 'carmen.lara@yahoo.com', 'Calle Residencial 808', '76543210N', '1981-07-18', 'Femenino', 'Carmen', '17', '34676789014', '4');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Santos', 'raul.santos@gmail.com', 'Avenida Principal 909', '54321098L', '1996-04-03', 'Masculino', 'Raul', '18', '34677890125', '4');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Suárez', 'david.suarez@gmail.com', 'Avenida Central 707', '10987654Q', '1996-12-15', 'Masculino', 'David', '29', '34675678905', '4');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Alvarez', 'claudia.alvarez@yahoo.com', 'Calle Secundaria 606', '32109876R', '1992-08-20', 'Femenino', 'Claudia', '30', '34676789016', '4');
INSERT INTO `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`) VALUES ('Jiménez', 'sergio.jimenez@hotmail.com', 'Avenida Principal 505', '65432109S', '1990-04-03', 'Masculino', 'Sergio', '31', '34677890127', '4');


-- ========================================
--  Usuarios
-- ========================================
-- Usuario (Administrador)
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('a', 'a', '1', '1');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('admin1', 'adminpass1', '2', '1');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('admin2', 'adminpass2', '5', '1');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('admin3', 'adminpass3', '8', '1');

-- Usuario (Normal)
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('user1', 'userpass1', '3', '2');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('user2', 'userpass2', '4', '2');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('user3', 'userpass3', '6', '2');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('user4', 'userpass4', '7', '2');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('user5', 'userpass5', '9', '2');

-- Usuario (Recursos humanos)
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('rh1', 'rhpass1', '10', '3');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('rh2', 'rhpass2', '11', '3');

-- Usuario (Clientes)
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('cliente1', 'cliente123', '12', '4');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('cliente2', 'cliente456', '13', '4');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('cliente3', 'cliente789', '14', '4');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('cliente4', 'cliente012', '15', '4');

-- Usuario (Facturacion)
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('facturacion1', 'facturacion123', '16', '5');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('facturacion2', 'facturacion456', '17', '5');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('facturacion3', 'facturacion789', '18', '5');
INSERT INTO `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`) VALUES ('facturacion4', 'facturacion012', '19', '5');



-- ========================================
--  Solicitudes empleados
-- ========================================
-- Persona 1
-- Bajas Laborales
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero', '2024-02-08', '1', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por enfermedad en marzo (Denegado)', '2024-03-18', '1', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por licencia por maternidad en abril', '2024-04-13', '1', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por estudios en mayo (Denegado)', '2024-05-03', '1', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero', '2024-02-23', '1', '2', '3');
-- Vacaciones Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para mayo.', '2024-04-25', '1', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para junio.', '2024-05-27', '1', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada.', '2024-06-27', '1', '3', '1');
-- Ayudas Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para febrero.', '2024-02-05', '1', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para marzo.', '2024-03-15', '1', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para abril.', '2024-04-10', '1', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para mayo.', '2024-04-30', '1', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para febrero.', '2024-02-20', '1', '2', '2');

-- Persona 2
-- Bajas Laborales
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero (Denegado)', '2024-02-13', '2', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por enfermedad en marzo', '2024-03-23', '2', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por licencia por maternidad en abril (Denegado)', '2024-04-08', '2', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por estudios en mayo', '2024-05-18', '2', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero', '2024-02-18', '2', '2', '3');
-- Vacaciones Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para mayo.', '2024-05-05', '2', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para junio.', '2024-06-05', '2', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada.', '2024-07-05', '2', '3', '1');
-- Ayudas Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para febrero.', '2024-02-10', '2', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para marzo.', '2024-03-20', '2', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para abril.', '2024-04-05', '2', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para mayo.', '2024-05-15', '2', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para febrero.', '2024-02-15', '2', '2', '2');

-- Persona 3 
-- Bajas Laborales
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero (Denegado)', '2024-02-26', '3', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por enfermedad en marzo', '2024-03-08', '3', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por licencia por maternidad en abril (Denegado)', '2024-04-16', '3', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por estudios en mayo', '2024-05-03', '3', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero', '2024-02-23', '3', '2', '3');
-- Vacaciones Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para mayo.', '2024-05-05', '3', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para junio.', '2024-06-05', '3', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada.', '2024-07-05', '3', '3', '1');
-- Ayudas Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para febrero.', '2024-02-25', '3', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para marzo.', '2024-03-05', '3', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para abril.', '2024-04-13', '3', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para mayo.', '2024-04-30', '3', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para febrero.', '2024-02-28', '3', '2', '2');

-- Persona 4 
-- Bajas Laborales
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero', '2024-02-08', '4', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por enfermedad en marzo (Denegado)', '2024-03-18', '4', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por licencia por maternidad en abril', '2024-04-13', '4', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por estudios en mayo (Denegado)', '2024-05-03', '4', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero', '2024-02-23', '4', '2', '3');
-- Vacaciones Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para mayo.', '2024-05-05', '4', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para junio.', '2024-06-05', '4', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada.', '2024-07-05', '4', '3', '1');
-- Ayudas Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para febrero.', '2024-02-05', '4', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para marzo.', '2024-03-15', '4', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para abril.', '2024-04-10', '4', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para mayo.', '2024-04-30', '4', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para febrero.', '2024-02-23', '4', '2', '2');

-- Persona 5 
-- Bajas Laborales
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero (Denegado)', '2024-02-16', '5', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por enfermedad en marzo', '2024-03-13', '5', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por licencia por maternidad en abril', '2024-04-03', '5', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por estudios en mayo (Denegado)', '2024-05-18', '5', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero', '2024-02-23', '5', '2', '3');
-- Vacaciones Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para mayo.', '2024-05-05', '5', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para junio.', '2024-06-05', '5', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada.', '2024-07-05', '5', '3', '1');
-- Ayudas Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para febrero.', '2024-02-15', '5', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para marzo.', '2024-03-10', '5', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para abril.', '2024-03-31', '5', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para mayo.', '2024-05-15', '5', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para febrero.', '2024-02-23', '5', '2', '2');

-- Persona 6 
-- Bajas Laborales
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero', '2024-02-18', '6', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por enfermedad en marzo (Denegado)', '2024-03-23', '6', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por licencia por maternidad en abril', '2024-04-08', '6', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por estudios en mayo', '2024-05-03', '6', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero (Denegado)', '2024-02-13', '6', '3', '3');
-- Vacaciones Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para mayo.', '2024-05-13', '6', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada.', '2024-06-13', '6', '3', '1');
-- Ayudas Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para febrero.', '2024-02-15', '6', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para marzo.', '2024-03-20', '6', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para abril.', '2024-04-05', '6', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para mayo.', '2024-04-30', '6', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para febrero.', '2024-02-13', '6', '3', '2');

-- Persona 7 
-- Bajas Laborales
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en marzo', '2024-03-08', '7', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por enfermedad en abril (Denegado)', '2024-04-16', '7', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por licencia por maternidad en mayo', '2024-05-13', '7', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por estudios en febrero', '2024-02-03', '7', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en abril (Denegado)', '2024-03-30', '7', '3', '3');
-- Vacaciones Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para mayo.', '2024-05-13', '7', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada.', '2024-06-13', '7', '3', '1');
-- Ayudas Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para marzo.', '2024-03-08', '7', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para abril.', '2024-04-13', '7', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para mayo.', '2024-05-10', '7', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para febrero.', '2024-02-03', '7', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para abril.', '2024-03-30', '7', '3', '2');

-- Persona 8 
-- Bajas Laborales
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en mayo', '2024-05-08', '8', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por enfermedad en febrero (Denegado)', '2024-02-16', '8', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por licencia por maternidad en marzo', '2024-03-03', '8', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por estudios en abril', '2024-04-18', '8', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en mayo (Denegado)', '2024-05-23', '8', '3', '3');
-- Vacaciones Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para junio.', '2024-05-30', '8', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para junio.', '2024-06-11', '8', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada.', '2024-06-27', '8', '3', '1');
-- Ayudas Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para mayo.', '2024-05-08', '8', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para febrero.', '2024-02-15', '8', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para marzo.', '2024-03-01', '8', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para abril.', '2024-04-15', '8', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para mayo.', '2024-05-20', '8', '3', '2');

-- Persona 9 
-- Bajas Laborales
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero', '2024-02-13', '9', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por enfermedad en marzo (Denegado)', '2024-03-18', '9', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por licencia por maternidad en abril', '2024-04-06', '9', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por estudios en mayo', '2024-04-30', '9', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en febrero (Denegado)', '2024-02-23', '9', '3', '3');
-- Vacaciones Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para julio.', '2024-06-29', '9', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para agosto.', '2024-08-05', '9', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada para septiembre.', '2024-08-27', '9', '3', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada para octubre.', '2024-10-05', '9', '3', '1');
-- Ayudas Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para febrero.', '2024-02-11', '9', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para marzo.', '2024-03-15', '9', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para abril.', '2024-03-30', '9', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para mayo.', '2024-04-27', '9', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para febrero.', '2024-02-22', '9', '3', '2');

-- Persona 10 
-- Bajas Laborales
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en marzo', '2024-02-29', '10', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por enfermedad en abril (Denegado)', '2024-04-11', '10', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por licencia por maternidad en mayo', '2024-05-08', '10', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por estudios en febrero', '2024-02-03', '10', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en abril (Denegado)', '2024-04-01', '10', '3', '3');
-- Vacaciones Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para mayo.', '2024-04-26', '10', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para junio.', '2024-06-05', '10', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada para julio.', '2024-06-26', '10', '3', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada para agosto.', '2024-08-03', '10', '3', '1');
-- Ayudas Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para marzo.', '2024-02-27', '10', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para abril.', '2024-04-10', '10', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para mayo.', '2024-04-05', '10', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para febrero.', '2024-01-31', '10', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para abril.', '2024-03-29', '10', '3', '2');

-- Persona 11 
-- Bajas Laborales
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en mayo', '2024-05-18', '11', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por enfermedad en febrero (Denegado)', '2024-02-16', '11', '3', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por licencia por maternidad en marzo', '2024-03-03', '11', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por estudios en abril', '2024-04-18', '11', '2', '3');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de baja por vacaciones en mayo (Denegado)', '2024-05-23', '11', '3', '3');
-- Vacaciones Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para mayo.', '2024-04-26', '11', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones aceptadas para junio.', '2024-06-08', '11', '2', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada para julio.', '2024-06-26', '11', '3', '1');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de vacaciones denegada para agosto.', '2024-08-03', '11', '3', '1');
-- Ayudas Empleados
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para mayo.', '2024-05-15', '11', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para febrero.', '2024-02-13', '11', '3', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para marzo.', '2024-02-28', '11', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda aceptada para abril.', '2024-04-15', '11', '2', '2');
INSERT INTO `trabajotfgerp`.`solicitudes_empleados` (`observacion`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('Solicitud de ayuda denegada para mayo.', '2024-05-18', '11', '3', '2');



-- ========================================
--  Asistencias Empleados
-- ========================================
-- Persona 1
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada laboral con minutos y segundos.', '2024-05-01', '09:15:30', '18:45:20', '09:29:50', '1');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día productivo, incluyendo descanso.', '2024-06-05', '08:45:10', '17:20:45', '08:35:35', '1');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones y tareas asignadas.', '2024-07-10', '10:05:45', '18:58:30', '08:52:45', '1');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo con tareas asignadas.', '2024-08-15', '09:30:15', '18:15:40', '08:45:25', '1');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Proyectos y colaboración en equipo.', '2024-09-20', '08:55:30', '17:10:20', '08:14:50', '1');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Sesiones de planificación y desarrollo.', '2024-10-25', '10:10:05', '18:50:55', '08:40:50', '1');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada laboral con minutos y segundos.', '2024-11-01', '09:15:30', '18:45:20', '09:29:50', '1');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día productivo, incluyendo descanso.', '2024-12-05', '08:45:10', '17:20:45', '08:35:35', '1');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones y tareas asignadas.', '2025-01-10', '10:05:45', '18:58:30', '08:52:45', '1');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo con tareas asignadas.', '2025-02-15', '09:30:15', '18:15:40', '08:45:25', '1');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Proyectos y colaboración en equipo.', '2025-03-20', '08:55:30', '17:10:20', '08:14:50', '1');
  
  -- Persona 2
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada laboral con minutos y segundos.', '2024-02-16', '09:20:30', '18:40:20', '09:19:50', '2');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día productivo, incluyendo descanso.', '2024-03-21', '08:40:10', '17:25:45', '08:45:35', '2');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones y tareas asignadas.', '2024-04-26', '10:10:45', '18:53:30', '08:42:45', '2');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo con tareas asignadas.', '2024-03-01', '09:35:15', '18:20:40', '08:45:25', '2');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Proyectos y colaboración en equipo.', '2024-03-16', '09:00:30', '17:15:20', '08:14:50', '2');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Sesiones de planificación y desarrollo.', '2024-04-11', '10:15:05', '18:55:55', '08:40:50', '2');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada laboral con minutos y segundos.', '2024-02-13', '09:20:30', '18:40:20', '09:19:50', '2');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día productivo, incluyendo descanso.', '2024-03-19', '08:40:10', '17:25:45', '08:45:35', '2');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones y tareas asignadas.', '2024-04-24', '10:10:45', '18:53:30', '08:42:45', '2');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo con tareas asignadas.', '2024-03-01', '09:35:15', '18:20:40', '08:45:25', '2');

-- Persona 3
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada laboral con minutos y segundos.', '2024-02-16', '09:20:30', '18:40:20', '09:19:50', '3');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día productivo, incluyendo descanso.', '2024-03-21', '08:40:10', '17:25:45', '08:45:35', '3');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones y tareas asignadas.', '2024-04-26', '10:10:45', '18:53:30', '08:42:45', '3');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo con tareas asignadas.', '2024-03-01', '09:35:15', '18:20:40', '08:45:25', '3');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Proyectos y colaboración en equipo.', '2024-03-16', '09:00:30', '17:15:20', '08:14:50', '3');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Sesiones de planificación y desarrollo.', '2024-04-11', '10:15:05', '18:55:55', '08:40:50', '3');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada laboral con minutos y segundos.', '2024-02-13', '09:20:30', '18:40:20', '09:19:50', '3');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día productivo, incluyendo descanso.', '2024-03-19', '08:40:10', '17:25:45', '08:45:35', '3');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones y tareas asignadas.', '2024-04-24', '10:10:45', '18:53:30', '08:42:45', '3');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo con tareas asignadas.', '2024-03-01', '09:35:15', '18:20:40', '08:45:25', '3');

-- Persona 4
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Variación en minutos y segundos.', '2024-02-16', '09:25:45', '18:38:30', '09:12:45', '4');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día productivo con pequeños ajustes.', '2024-03-21', '08:42:00', '17:23:15', '08:41:15', '4');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones y tareas con cambios.', '2024-04-26', '10:12:30', '18:55:10', '08:42:40', '4');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo enfocado en proyectos con ajustes.', '2024-03-01', '09:36:45', '18:19:50', '08:43:05', '4');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración con el equipo con cambios.', '2024-03-11', '08:18:15', '17:32:30', '09:14:15', '4');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día completo de trabajo con modificaciones.', '2024-04-06', '10:02:45', '18:57:15', '08:54:30', '4');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Variación en horas y minutos.', '2024-02-21', '09:47:30', '18:35:20', '08:47:50', '4');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada con cambios en el tiempo.', '2024-03-16', '08:30:00', '17:45:45', '09:15:45', '4');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Ajustes en horas y minutos.', '2024-04-11', '10:05:20', '18:45:00', '08:39:40', '4');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Variaciones en horas y segundos.', '2024-02-26', '09:23:15', '18:40:45', '09:17:30', '4');

-- Persona 5
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada laboral con cambios.', '2024-02-16', '09:19:45', '18:41:20', '09:21:35', '5');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día productivo con ajustes en minutos y segundos.', '2024-03-21', '08:39:30', '17:26:55', '08:47:25', '5');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones y tareas con modificaciones en el tiempo.', '2024-04-26', '10:09:15', '18:51:40', '08:42:25', '5');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo enfocado en proyectos con cambios.', '2024-03-01', '09:34:05', '18:21:30', '08:47:25', '5');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración con el equipo con ajustes en el tiempo.', '2024-03-11', '08:13:45', '17:31:10', '09:17:25', '5');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día completo de trabajo con variaciones.', '2024-04-06', '09:57:00', '18:59:30', '09:02:30', '5');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Variación en horas y minutos.', '2024-02-21', '09:43:30', '18:37:20', '08:53:50', '5');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada con cambios en el tiempo.', '2024-03-16', '08:27:15', '17:44:45', '09:17:30', '5');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Ajustes en horas y minutos.', '2024-04-11', '10:01:20', '18:46:00', '08:44:40', '5');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Variaciones en horas y segundos.', '2024-02-26', '09:21:15', '18:38:45', '09:17:30', '5');

-- Persona 6
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Variación en minutos y segundos.', '2024-02-16', '09:35:45', '18:28:30', '08:52:45', '6');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día productivo con pequeños ajustes.', '2024-03-21', '08:50:00', '17:43:15', '08:53:15', '6');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones y tareas con cambios.', '2024-04-26', '10:20:30', '18:45:10', '08:24:40', '6');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo enfocado en proyectos con ajustes.', '2024-03-01', '09:45:45', '18:20:50', '08:35:05', '6');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración con el equipo con cambios.', '2024-03-11', '08:22:15', '17:37:30', '09:15:15', '6');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día completo de trabajo.', '2024-04-06', '09:55:00', '18:50:30', '08:55:30', '6');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Variación en horas y minutos.', '2024-02-21', '09:30:30', '18:25:20', '08:54:50', '6');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada con cambios en el tiempo.', '2024-03-16', '08:42:00', '17:54:45', '09:12:45', '6');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Ajustes en horas y minutos.', '2024-04-11', '10:10:20', '18:35:00', '08:24:40', '6');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Variaciones en horas y segundos.', '2024-02-26', '09:17:15', '18:28:45', '09:11:30', '6');

-- Persona 7
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Tareas administrativas y reuniones.', '2024-02-26', '09:50:30', '18:35:50', '08:45:20', '7');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración con el equipo de desarrollo.', '2024-03-11', '08:30:45', '17:45:10', '09:14:25', '7');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día completo de programación.', '2024-04-06', '10:15:00', '19:15:30', '09:00:30', '7');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Resolución de incidencias y soporte técnico.', '2024-02-21', '09:55:00', '18:20:40', '08:25:40', '7');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Entrenamiento del personal nuevo.', '2024-03-06', '08:40:20', '17:30:55', '08:50:35', '7');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Revisión de proyectos y planificación.', '2024-04-16', '10:10:45', '18:53:15', '08:42:30', '7');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo enfocado en proyectos de marketing.', '2024-03-01', '09:35:15', '18:21:00', '08:45:45', '7');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración con el departamento de recursos humanos.', '2024-03-21', '08:15:30', '17:45:45', '09:30:15', '7');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día completo de gestión de proyectos.', '2024-04-26', '10:00:00', '19:00:00', '09:00:00', '7');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones con el equipo de ventas.', '2024-02-11', '09:45:20', '18:35:55', '08:50:35', '7');

-- Persona 8
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Tareas administrativas y reuniones.', '2024-02-26', '09:50:30', '18:35:50', '08:45:20', '8');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración con el equipo de desarrollo.', '2024-03-11', '08:30:45', '17:45:10', '09:14:25', '8');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día completo de programación.', '2024-04-06', '10:15:00', '19:15:30', '09:00:30', '8');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Resolución de incidencias y soporte técnico.', '2024-02-21', '09:55:00', '18:20:40', '08:25:40', '8');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Entrenamiento del personal nuevo.', '2024-03-06', '08:40:20', '17:30:55', '08:50:35', '8');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Revisión de proyectos y planificación.', '2024-04-16', '10:10:45', '18:53:15', '08:42:30', '8');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo enfocado en proyectos de marketing.', '2024-03-01', '09:35:15', '18:21:00', '08:45:45', '8');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración con el departamento de recursos humanos.', '2024-03-21', '08:15:30', '17:45:45', '09:30:15', '8');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día completo de gestión de proyectos.', '2024-04-26', '10:00:00', '19:00:00', '09:00:00', '8');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones con el equipo de ventas.', '2024-02-11', '09:45:20', '18:35:55', '08:50:35', '8');

-- Persona 9
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada productiva con reuniones.', '2024-03-15', '09:30:00', '18:45:30', '09:15:30', '9');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo en equipo y resolución de problemas.', '2024-04-10', '08:45:20', '17:30:45', '08:45:25', '9');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración en proyectos de desarrollo.', '2024-02-20', '10:00:45', '19:15:10', '09:14:25', '9');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Revisión de informes y preparación de presentaciones.', '2024-03-05', '09:20:10', '18:53:45', '09:33:35', '9');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día centrado en proyectos de innovación.', '2024-04-15', '10:40:35', '19:25:00', '08:44:25', '9');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones estratégicas y planificación.', '2024-02-29', '09:55:50', '18:20:15', '08:24:25', '9');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración con el equipo de recursos humanos.', '2024-03-20', '08:35:15', '17:45:40', '09:10:25', '9');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Gestión de proyectos y evaluación de resultados.', '2024-04-25', '10:10:40', '19:00:05', '08:49:25', '9');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Entrenamiento y desarrollo de habilidades.', '2024-02-10', '09:45:05', '18:35:30', '08:50:25', '9');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada enfocada en proyectos de mejora.', '2024-03-15', '09:30:30', '18:45:55', '09:15:25', '9');

-- Persona 10
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Tareas administrativas y reuniones.', '2024-02-25', '09:50:30', '18:35:50', '08:45:20', '10');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración con el equipo de desarrollo.', '2024-03-10', '08:30:45', '17:45:10', '09:14:25', '10');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día completo de programación.', '2024-04-05', '10:15:00', '19:15:30', '09:00:30', '10');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Resolución de incidencias y soporte técnico.', '2024-02-20', '09:55:00', '18:20:40', '08:25:40', '10');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Entrenamiento del personal nuevo.', '2024-03-05', '08:40:20', '17:30:55', '08:50:35', '10');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Revisión de proyectos y planificación.', '2024-04-15', '10:10:45', '18:53:15', '08:42:30', '10');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo enfocado en proyectos de marketing.', '2024-02-29', '09:35:15', '18:21:00', '08:45:45', '10');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración con el departamento de recursos humanos.', '2024-03-20', '08:15:30', '17:45:45', '09:30:15', '10');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día completo de gestión de proyectos.', '2024-04-25', '10:00:00', '19:00:00', '09:00:00', '10');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones con el equipo de ventas.', '2024-02-10', '09:45:20', '18:35:55', '08:50:35', '10');

-- Persona 11
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada productiva con reuniones.', '2024-02-25', '09:30:00', '18:45:30', '09:15:30', '11');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Trabajo en equipo y resolución de problemas.', '2024-04-10', '08:45:20', '17:30:45', '08:45:25', '11');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración en proyectos de desarrollo.', '2024-02-20', '10:00:45', '19:15:10', '09:14:25', '11');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Revisión de informes y preparación de presentaciones.', '2024-03-05', '09:20:10', '18:53:45', '09:33:35', '11');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Día centrado en proyectos de innovación.', '2024-04-15', '10:40:35', '19:25:00', '08:44:25', '11');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Reuniones estratégicas y planificación.', '2024-02-29', '09:55:50', '18:20:15', '08:24:25', '11');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Colaboración con el equipo de recursos humanos.', '2024-03-20', '08:35:15', '17:45:40', '09:10:25', '11');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Gestión de proyectos y evaluación de resultados.', '2024-04-25', '10:10:40', '19:00:05', '08:49:25', '11');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Entrenamiento y desarrollo de habilidades.', '2024-02-10', '09:45:05', '18:35:30', '08:50:25', '11');
INSERT INTO `trabajotfgerp`.`asistencias_empleados` (`observacion`, `fecha_asistencia`, `hora_entrada`, `hora_salida`, `horas_trabajadas_dia`, `id_persona`) VALUES ('Jornada enfocada en proyectos de mejora.', '2024-03-15', '09:30:30', '18:45:55', '09:15:25', '11');



-- ========================================
--  Ayudas Empleados
-- ========================================
-- Persona 1 
-- Aceptadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-02-10', '2024-01-10', '800', '1', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-03-10', '2024-02-10', '1200', '1', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');
-- Denegadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-04-10', '2024-03-10', '1000', '1', '3', '3', 'Ayuda rechazada para guarderías por exceder el presupuesto asignado.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-05-10', '2024-04-10', '1500', '1', '2', '3', 'Ayuda rechazada para transporte por exceder el presupuesto asignado.');

-- Persona 2 
-- Aceptadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-02-10', '2024-01-10', '800', '2', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-03-10', '2024-02-10', '1200', '2', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');
-- Denegadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-04-10', '2024-03-10', '1000', '2', '3', '3', 'Ayuda rechazada para guarderías por exceder el presupuesto asignado.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-05-10', '2024-04-10', '1500', '2', '2', '3', 'Ayuda rechazada para transporte por exceder el presupuesto asignado.');

-- Persona 3 
-- Aceptadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-02-10', '2024-01-10', '800', '3', '3', '2', 'Ayuda aceptada para guarderías.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-03-10', '2024-02-10', '1200', '3', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');
-- Denegadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-04-10', '2024-03-10', '1000', '3', '1', '3', 'Ayuda rechazada para comidas por exceder el presupuesto asignado.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-05-10', '2024-04-10', '1500', '3', '2', '3', 'Ayuda rechazada para transporte por exceder el presupuesto asignado.');

-- Persona 4 
-- Aceptadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-02-15', '2024-01-15', '900', '4', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-03-20', '2024-02-20', '1200', '4', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-04-25', '2024-03-25', '800', '4', '3', '2', 'Ayuda aceptada para cubrir gastos de guarderías.');

-- Persona 5 
-- Aceptadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-02-20', '2024-01-20', '1000', '5', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-03-25', '2024-02-25', '850', '5', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-04-30', '2024-03-30', '1100', '5', '3', '2', 'Ayuda aceptada para cubrir gastos de transporte.');

-- Persona 6 
-- Aceptadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-02-25', '2024-01-25', '1200', '6', '3', '2', 'Ayuda aceptada para cubrir gastos de comidas.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-04-01', '2024-03-01', '950', '6', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-05-05', '2024-04-05', '1050', '6', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');

-- Persona 7 
-- Aceptadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-03-01', '2024-02-01', '950', '7', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-04-06', '2024-03-06', '1100', '7', '3', '2', 'Ayuda aceptada para cubrir gastos de guarderías.');
-- Denegadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-05-11', '2024-04-11', '1200', '7', '1', '3', 'Ayuda denegada por exceder el presupuesto asignado.');

-- Persona 8 
-- Aceptadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-03-06', '2024-02-06', '1050', '8', '3', '2', 'Ayuda aceptada para cubrir gastos de guarderías.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-04-11', '2024-03-11', '1000', '8', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');
-- Denegadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-05-16', '2024-04-16', '850', '8', '2', '3', 'Ayuda denegada por falta de documentación.');

-- Persona 9 
-- Aceptadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-03-11', '2024-02-11', '900', '9', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-04-16', '2024-03-16', '950', '9', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');
-- Denegadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-05-21', '2024-04-21', '1100', '9', '3', '3', 'Ayuda denegada por falta de justificación.');

-- Persona 10 
-- Aceptadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-02-01', '2024-01-01', '1000', '10', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-03-06', '2024-02-06', '850', '10', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');
-- Denegadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-04-11', '2024-03-11', '1200', '10', '3', '3', 'Ayuda denegada por exceder el presupuesto asignado.');

-- Persona 11 
-- Aceptadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-02-06', '2024-01-06', '950', '11', '3', '2', 'Ayuda aceptada para cubrir gastos de guarderías.');
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-03-11', '2024-02-11', '1000', '11', '2', '3', 'Ayuda denegada por falta de documentación.');
-- Denegadas
INSERT INTO `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `observacion`) VALUES ('2024-04-16', '2024-03-16', '1100', '11', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');



-- ========================================
--  Bajas Laborales Empleados
-- ========================================
-- Persona 1
-- Aceptadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-12', '2024-02-10', '1', '1', '2'); -- Baja por vacaciones en febrero
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-18', '2024-04-15', '3', '1', '2'); -- Baja por licencia por maternidad en abril
-- Denegadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-03-23', '2024-03-20', '2', '1', '3'); -- Baja por enfermedad en marzo (Denegada)
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-05-07', '2024-05-05', '5', '1', '3'); -- Baja por estudios en mayo (Denegada)

-- Persona 2
-- Aceptadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-03-28', '2024-03-25', '2', '2', '2'); -- Baja por enfermedad en marzo
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-05-23', '2024-05-20', '5', '2', '2'); -- Baja por estudios en mayo
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-23', '2024-02-20', '1', '2', '2'); -- Baja por vacaciones en febrero
-- Denegadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-18', '2024-02-15', '1', '2', '3'); -- Baja por vacaciones en febrero (Denegada)
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-13', '2024-04-10', '3', '2', '3'); -- Baja por licencia por maternidad en abril (Denegada)

-- Persona 3
-- Aceptadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-03-13', '2024-03-10', '2', '3', '2'); -- Baja por enfermedad en marzo
-- Denegadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-03-02', '2024-02-28', '1', '3', '3'); -- Baja por vacaciones en febrero (Denegada)
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-21', '2024-04-18', '3', '3', '3'); -- Baja por licencia por maternidad en abril (Denegada)

-- Persona 4
-- Aceptadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-12', '2024-02-10', '1', '4', '2'); -- Baja por vacaciones en febrero
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-18', '2024-04-15', '3', '4', '2'); -- Baja por licencia por maternidad en abril
-- Denegadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-03-23', '2024-03-20', '2', '4', '3'); -- Baja por enfermedad en marzo (Denegada)
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-05-07', '2024-05-05', '5', '4', '3'); -- Baja por estudios en mayo (Denegada)

-- Persona 5
-- Aceptadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-21', '2024-02-18', '1', '5', '2'); -- Baja por vacaciones en febrero
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-03-18', '2024-03-15', '2', '5', '2'); -- Baja por enfermedad en marzo
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-08', '2024-04-05', '3', '5', '2'); -- Baja por licencia por maternidad en abril
-- Denegadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-05-23', '2024-05-20', '5', '5', '3'); -- Baja por estudios en mayo (Denegada)

-- Persona 6
-- Aceptadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-23', '2024-02-20', '1', '6', '2'); -- Baja por vacaciones en febrero
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-13', '2024-04-10', '3', '6', '2'); -- Baja por licencia por maternidad en abril
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-05-08', '2024-05-05', '5', '6', '2'); -- Baja por estudios en mayo
-- Denegadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-28', '2024-02-25', '1', '6', '3'); -- Baja por vacaciones en febrero (Denegada)
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-03-28', '2024-03-25', '2', '6', '3'); -- Baja por enfermedad en marzo (Denegada)

-- Persona 7
-- Aceptadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-03-13', '2024-03-10', '1', '7', '2'); -- Baja por vacaciones en marzo
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-05-18', '2024-05-15', '3', '7', '2'); -- Baja por licencia por maternidad en mayo
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-08', '2024-02-05', '5', '7', '2'); -- Baja por estudios en febrero
-- Denegadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-21', '2024-04-18', '2', '7', '3'); -- Baja por enfermedad en abril (Denegada)
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-06', '2024-04-03', '1', '7', '3'); -- Baja por vacaciones en abril (Denegada)

-- Persona 8
-- Aceptadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-05-13', '2024-05-10', '1', '8', '2'); -- Baja por vacaciones en mayo
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-03-08', '2024-03-05', '3', '8', '2'); -- Baja por licencia por maternidad en marzo
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-23', '2024-04-20', '5', '8', '2'); -- Baja por estudios en abril
-- Denegadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-21', '2024-02-18', '2', '8', '3'); -- Baja por enfermedad en febrero (Denegada)
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-05-28', '2024-05-25', '1', '8', '3'); -- Baja por vacaciones en mayo (Denegada)

-- Persona 9
-- Aceptadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-18', '2024-02-15', '1', '9', '2'); -- Baja por vacaciones en febrero
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-11', '2024-04-08', '3', '9', '2'); -- Baja por licencia por maternidad en abril
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-05-05', '2024-05-02', '5', '9', '2'); -- Baja por estudios en mayo
-- Denegadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-28', '2024-02-25', '1', '9', '3'); -- Baja por vacaciones en febrero (Denegada)
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-03-23', '2024-03-20', '2', '9', '3'); -- Baja por enfermedad en marzo (Denegada)

-- Persona 10
-- Aceptadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-03-05', '2024-03-02', '1', '10', '2'); -- Baja por vacaciones en marzo
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-05-13', '2024-05-10', '3', '10', '2'); -- Baja por licencia por maternidad en mayo
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-08', '2024-02-05', '5', '10', '2'); -- Baja por estudios en febrero
-- Denegadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-18', '2024-04-15', '2', '10', '3'); -- Baja por enfermedad en abril (Denegada)
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-06', '2024-04-03', '1', '10', '3'); -- Baja por vacaciones en abril (Denegada)

-- Persona 11
-- Aceptadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-05-23', '2024-05-20', '1', '11', '2'); -- Baja por vacaciones en mayo
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-03-08', '2024-03-05', '3', '11', '2'); -- Baja por licencia por maternidad en marzo
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-04-23', '2024-04-20', '5', '11', '2'); -- Baja por estudios en abril
-- Denegadas
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-02-21', '2024-02-18', '2', '11', '3'); -- Baja por enfermedad en febrero (Denegada)
INSERT INTO `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`) VALUES ('2024-05-28', '2024-05-25', '1', '11', '3'); -- Baja por vacaciones en mayo (Denegada)



-- ========================================
--  Vacaciones empleados
-- ========================================
-- Persona 1
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 25, 0, 5, FALSE, '2023-05-05', '2023-05-01', FALSE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, 1, 2);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-06-05', '2023-06-01', FALSE, NULL, NULL, 'Vacaciones aceptadas para junio.', NULL, '1', '2');
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-07-05', '2023-07-01', FALSE, NULL, NULL, 'Solicitud de vacaciones denegada.', NULL, '1', '3');

-- Persona 2
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('5', '25', '0', '5', FALSE, '2023-05-15', '2023-05-10', FALSE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, '2', '2');
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-06-15', '2023-06-10', FALSE, NULL, NULL, 'Vacaciones aceptadas para junio.', NULL, '2', '2');
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-07-15', '2023-07-10', FALSE, NULL, NULL, 'Solicitud de vacaciones denegada.', NULL, '2', '3');

-- Persona 3
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('5', '25', '0', '5', FALSE, '2023-05-15', '2023-05-10', FALSE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, '3', '2');
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-06-15', '2023-06-10', FALSE, NULL, NULL, 'Vacaciones aceptadas para junio.', NULL, '3', '2');
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-07-15', '2023-07-10', FALSE, NULL, NULL, 'Solicitud de vacaciones denegada.', NULL, '3', '3');

-- Persona 4
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('5', '25', '0', '5', FALSE, '2023-05-15', '2023-05-10', FALSE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, '4', '2');
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-06-15', '2023-06-10', FALSE, NULL, NULL, 'Vacaciones aceptadas para junio.', NULL, '4', '2');
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-07-15', '2023-07-10', FALSE, NULL, NULL, 'Solicitud de vacaciones denegada.', NULL, '4', '3');

-- Persona 5
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('5', '25', '0', '5', FALSE, '2023-05-15', '2023-05-10', FALSE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, '5', '2');
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-06-15', '2023-06-10', FALSE, NULL, NULL, 'Vacaciones aceptadas para junio.', NULL, '5', '2');
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-07-15', '2023-07-10', FALSE, NULL, NULL, 'Solicitud de vacaciones denegada.', NULL, '5', '3');

-- Persona 6
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('5', '25', '0', '5', FALSE, '2023-05-20', '2023-05-15', FALSE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, '6', '2');
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('5', '25', '0', '5', FALSE, '2023-06-20', '2023-06-15', FALSE, NULL, NULL, 'Solicitud de vacaciones denegada.', NULL, '6', '3');

-- Persona 7
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('5', '25', '0', '5', FALSE, '2023-05-20', '2023-05-15', FALSE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, '7', '2');
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('5', '25', '0', '5', FALSE, '2023-06-20', '2023-06-15', FALSE, NULL, NULL, 'Solicitud de vacaciones denegada.', NULL, '7', '3');

-- Persona 8
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('5', '25', '0', '5', FALSE, '2023-06-05', '2023-06-01', FALSE, NULL, NULL, 'Vacaciones aprobadas.', NULL, '8', '2');
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('9', '21', '0', '4', FALSE, '2023-06-18', '2023-06-15', FALSE, NULL, NULL, 'Vacaciones aprobadas.', NULL, '8', '2');
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('9', '21', '0', '5', FALSE, '2023-07-05', '2023-07-01', FALSE, NULL, NULL, 'Vacaciones denegadas.', NULL, '8', '3');

-- Persona 9
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('5', '25', '0', '5', FALSE, '2023-07-05', '2023-07-01', FALSE, NULL, NULL, 'Vacaciones aceptadas para julio.', NULL, '9', '2');
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-08-14', '2023-08-10', FALSE, NULL, NULL, 'Vacaciones aceptadas para agosto.', NULL, '9', '2');
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-09-05', '2023-09-01', FALSE, NULL, NULL, 'Vacaciones denegadas para septiembre.', NULL, '9', '3');
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-10-14', '2023-10-10', FALSE, NULL, NULL, 'Vacaciones denegadas para octubre.', NULL, '9', '3');

-- Persona 10
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('5', '25', '0', '5', FALSE, '2023-05-05', '2023-05-01', FALSE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, '10', '2');
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-06-14', '2023-06-10', FALSE, NULL, NULL, 'Vacaciones aceptadas para junio.', NULL, '10', '2');
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-07-05', '2023-07-01', FALSE, NULL, NULL, 'Vacaciones denegadas para julio.', NULL, '10', '3');
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-08-14', '2023-08-10', FALSE, NULL, NULL, 'Vacaciones denegadas para agosto.', NULL, '10', '3');

-- Persona 11
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('5', '25', '0', '5', FALSE, '2023-05-05', '2023-05-01', FALSE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, '11', '2');
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-06-19', '2023-06-15', FALSE, NULL, NULL, 'Vacaciones aceptadas para junio.', NULL, '11', '2');
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-07-05', '2023-07-01', FALSE, NULL, NULL, 'Vacaciones denegadas para julio.', NULL, '11', '3');
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES ('10', '20', '0', '5', FALSE, '2023-08-14', '2023-08-10', FALSE, NULL, NULL, 'Vacaciones denegadas para agosto.', NULL, '11', '3');



-- ========================================
--  Nominas empleados
-- ========================================
-- Febrero
-- Empleados
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (100.00, 50.00, 'ES12345678901234567890', 30.00, 15.00, 2, 1500.00, 1600.00, 1555.00, '123456789012', 'Mensual', 2024, 1);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (120.00, 70.00, 'ES98765432109876543210', 40.00, 20.00, 2, 1600.00, 1700.00, 1650.00, '098765432109', 'Mensual', 2024, 2);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (80.00, 40.00, 'ES12345678901234567891', 25.00, 10.00, 2, 1400.00, 1450.00, 1415.00, '123456789013', 'Mensual', 2024, 3);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (90.00, 60.00, 'ES98765432109876543211', 35.00, 12.00, 2, 1550.00, 1610.00, 1575.00, '098765432110', 'Mensual', 2024, 4);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (70.00, 35.00, 'ES12345678901234567892', 20.00, 8.00, 2, 1350.00, 1390.00, 1365.00, '123456789014', 'Mensual', 2024, 5);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (110.00, 55.00, 'ES98765432109876543212', 45.00, 18.00, 2, 1700.00, 1765.00, 1720.00, '098765432111', 'Mensual', 2024, 6);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (95.00, 45.00, 'ES12345678901234567893', 28.00, 11.00, 2, 1450.00, 1540.00, 1507.00, '123456789015', 'Mensual', 2024, 7);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (100.00, 50.00, 'ES98765432109876543213', 30.00, 14.00, 2, 1500.00, 1600.00, 1560.00, '098765432112', 'Mensual', 2024, 8);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (85.00, 42.00, 'ES12345678901234567894', 27.00, 9.00, 2, 1420.00, 1463.00, 1436.00, '123456789016', 'Mensual', 2024, 9);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (105.00, 65.00, 'ES98765432109876543214', 32.00, 16.00, 2, 1580.00, 1645.00, 1613.00, '098765432113', 'Mensual', 2024, 10);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (115.00, 75.00, 'ES12345678901234567895', 38.00, 22.00, 2, 1650.00, 1725.00, 1688.00, '123456789017', 'Mensual', 2024, 19);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (125.00, 80.00, 'ES98765432109876543215', 42.00, 24.00, 2, 1700.00, 1780.00, 1750.00, '098765432114', 'Mensual', 2024, 20);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (130.00, 85.00, 'ES12345678901234567896', 45.00, 26.00, 2, 1750.00, 1835.00, 1805.00, '123456789018', 'Mensual', 2024, 23);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (135.00, 90.00, 'ES98765432109876543216', 48.00, 28.00, 2, 1800.00, 1890.00, 1862.00, '098765432115', 'Mensual', 2024, 24);
-- Ex empleados
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (85.00, 35.00, 'ES12345678901234567898', 25.00, 12.00, 2, 1450.00, 1540.00, 1515.00, '123456789020', 'Mensual', 2024, 16);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (95.00, 45.00, 'ES98765432109876543218', 35.00, 17.00, 2, 1550.00, 1645.00, 1600.00, '098765432121', 'Mensual', 2024, 17);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (100.00, 50.00, 'ES12345678901234567899', 40.00, 20.00, 2, 1600.00, 1700.00, 1650.00, '123456789022', 'Mensual', 2024, 18);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (105.00, 55.00, 'ES98765432109876543219', 45.00, 22.00, 2, 1650.00, 1765.00, 1715.00, '098765432123', 'Mensual', 2024, 29);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (110.00, 60.00, 'ES12345678901234567891', 50.00, 25.00, 2, 1700.00, 1810.00, 1750.00, '123456789024', 'Mensual', 2024, 30);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (115.00, 65.00, 'ES98765432109876543220', 55.00, 27.00, 2, 1750.00, 1865.00, 1815.00, '098765432125', 'Mensual', 2024, 31);

-- Marzo
-- Empleados
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (100.00, 50.00, 'ES12345678901234567890', 30.00, 15.00, 3, 1500.00, 1600.00, 1555.00, '123456789012', 'Mensual', 2024, 1);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (120.00, 70.00, 'ES98765432109876543210', 40.00, 20.00, 3, 1600.00, 1700.00, 1650.00, '098765432109', 'Mensual', 2024, 2);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (110.00, 60.00, 'ES12345678901234567891', 35.00, 17.00, 3, 1550.00, 1650.00, 1615.00, '123456789013', 'Mensual', 2024, 3);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (115.00, 65.00, 'ES98765432109876543211', 38.00, 19.00, 3, 1580.00, 1695.00, 1657.00, '098765432110', 'Mensual', 2024, 4);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (105.00, 55.00, 'ES12345678901234567892', 32.00, 16.00, 3, 1520.00, 1615.00, 1583.00, '123456789014', 'Mensual', 2024, 5);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (125.00, 75.00, 'ES98765432109876543212', 45.00, 22.00, 3, 1650.00, 1725.00, 1680.00, '098765432111', 'Mensual', 2024, 6);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (95.00, 45.00, 'ES12345678901234567893', 28.00, 14.00, 3, 1480.00, 1570.00, 1533.00, '123456789015', 'Mensual', 2024, 7);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (130.00, 80.00, 'ES98765432109876543213', 50.00, 25.00, 3, 1700.00, 1800.00, 1750.00, '098765432112', 'Mensual', 2024, 8);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (85.00, 35.00, 'ES12345678901234567894', 25.00, 12.00, 3, 1450.00, 1535.00, 1510.00, '123456789016', 'Mensual', 2024, 9);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (135.00, 85.00, 'ES98765432109876543214', 55.00, 27.00, 3, 1750.00, 1835.00, 1790.00, '098765432113', 'Mensual', 2024, 10);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (140.00, 90.00, 'ES12345678901234567895', 60.00, 30.00, 3, 1800.00, 1890.00, 1840.00, '123456789017', 'Mensual', 2024, 19);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (95.00, 45.00, 'ES98765432109876543215', 28.00, 14.00, 3, 1480.00, 1570.00, 1533.00, '098765432114', 'Mensual', 2024, 20);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (125.00, 75.00, 'ES12345678901234567896', 45.00, 22.00, 3, 1650.00, 1725.00, 1680.00, '123456789018', 'Mensual', 2024, 23);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (130.00, 80.00, 'ES98765432109876543216', 50.00, 25.00, 3, 1700.00, 1800.00, 1750.00, '098765432115', 'Mensual', 2024, 24);
-- Becarios
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (60.00, 20.00, 'ES12345678901234567897', 15.00, 7.00, 3, 800.00, 880.00, 858.00, '123456789025', 'Mensual', 2024, 13);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (65.00, 25.00, 'ES98765432109876543215', 20.00, 9.00, 3, 850.00, 940.00, 916.00, '098765432128', 'Mensual', 2024, 14);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (70.00, 30.00, 'ES12345678901234567896', 25.00, 10.00, 3, 900.00, 1000.00, 975.00, '123456789027', 'Mensual', 2024, 15);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (75.00, 35.00, 'ES98765432109876543216', 30.00, 12.00, 3, 950.00, 1060.00, 1025.00, '098765432130', 'Mensual', 2024, 22);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (80.00, 40.00, 'ES12345678901234567895', 35.00, 14.00, 3, 1000.00, 1120.00, 1085.00, '123456789029', 'Mensual', 2024, 27);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (85.00, 45.00, 'ES98765432109876543217', 40.00, 16.00, 3, 1050.00, 1180.00, 1145.00, '098765432132', 'Mensual', 2024, 28);
-- Ex empleados
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (85.00, 35.00, 'ES12345678901234567898', 25.00, 12.00, 3, 1450.00, 1540.00, 1515.00, '123456789020', 'Mensual', 2024, 16);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (95.00, 45.00, 'ES98765432109876543218', 35.00, 17.00, 3, 1550.00, 1645.00, 1600.00, '098765432121', 'Mensual', 2024, 17);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (100.00, 50.00, 'ES12345678901234567899', 40.00, 20.00, 3, 1600.00, 1700.00, 1650.00, '123456789022', 'Mensual', 2024, 18);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (105.00, 55.00, 'ES98765432109876543219', 45.00, 22.00, 3, 1650.00, 1765.00, 1715.00, '098765432123', 'Mensual', 2024, 29);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (110.00, 60.00, 'ES12345678901234567891', 50.00, 25.00, 3, 1700.00, 1810.00, 1750.00, '123456789024', 'Mensual', 2024, 30);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (115.00, 65.00, 'ES98765432109876543220', 55.00, 27.00, 3, 1750.00, 1865.00, 1815.00, '098765432125', 'Mensual', 2024, 31);

-- Abril
-- Empleados
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (105.00, 55.00, 'ES12345678901234567891', 35.00, 17.00, 4, 1550.00, 1655.00, 1603.00, '123456789013', 'Mensual', 2024, 1);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (125.00, 75.00, 'ES98765432109876543211', 45.00, 22.00, 4, 1650.00, 1725.00, 1680.00, '098765432110', 'Mensual', 2024, 2);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (90.00, 40.00, 'ES12345678901234567892', 30.00, 15.00, 4, 1500.00, 1590.00, 1555.00, '123456789014', 'Mensual', 2024, 3);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (100.00, 50.00, 'ES98765432109876543212', 40.00, 20.00, 4, 1600.00, 1700.00, 1650.00, '098765432111', 'Mensual', 2024, 4);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (95.00, 45.00, 'ES12345678901234567893', 35.00, 17.00, 4, 1550.00, 1645.00, 1600.00, '123456789015', 'Mensual', 2024, 5);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (120.00, 70.00, 'ES98765432109876543213', 50.00, 25.00, 4, 1700.00, 1820.00, 1765.00, '098765432112', 'Mensual', 2024, 6);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (85.00, 35.00, 'ES12345678901234567894', 25.00, 12.00, 4, 1450.00, 1540.00, 1515.00, '123456789016', 'Mensual', 2024, 7);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (110.00, 60.00, 'ES98765432109876543214', 45.00, 22.00, 4, 1600.00, 1710.00, 1660.00, '098765432113', 'Mensual', 2024, 8);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (115.00, 65.00, 'ES12345678901234567895', 55.00, 27.00, 4, 1650.00, 1765.00, 1715.00, '123456789017', 'Mensual', 2024, 9);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (105.00, 55.00, 'ES98765432109876543215', 45.00, 22.00, 4, 1550.00, 1655.00, 1603.00, '098765432114', 'Mensual', 2024, 10);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (95.00, 45.00, 'ES12345678901234567896', 35.00, 17.00, 4, 1550.00, 1645.00, 1600.00, '123456789018', 'Mensual', 2024, 19);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (125.00, 75.00, 'ES98765432109876543216', 55.00, 27.00, 4, 1650.00, 1725.00, 1680.00, '098765432115', 'Mensual', 2024, 20);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (130.00, 80.00, 'ES12345678901234567897', 60.00, 30.00, 4, 1700.00, 1810.00, 1750.00, '123456789019', 'Mensual', 2024, 23);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (100.00, 50.00, 'ES98765432109876543217', 40.00, 20.00, 4, 1600.00, 1700.00, 1650.00, '098765432116', 'Mensual', 2024, 24);
-- Becarios
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (60.00, 20.00, 'ES12345678901234567897', 15.00, 7.00, 4, 800.00, 880.00, 858.00, '123456789025', 'Mensual', 2024, 13);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (65.00, 25.00, 'ES98765432109876543215', 20.00, 9.00, 4, 850.00, 940.00, 916.00, '098765432128', 'Mensual', 2024, 14);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (70.00, 30.00, 'ES12345678901234567896', 25.00, 10.00, 4, 900.00, 1000.00, 975.00, '123456789027', 'Mensual', 2024, 15);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (75.00, 35.00, 'ES98765432109876543216', 30.00, 12.00, 4, 950.00, 1060.00, 1025.00, '098765432130', 'Mensual', 2024, 22);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (80.00, 40.00, 'ES12345678901234567895', 35.00, 14.00, 4, 1000.00, 1120.00, 1085.00, '123456789029', 'Mensual', 2024, 27);
INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (85.00, 45.00, 'ES98765432109876543217', 40.00, 16.00, 4, 1050.00, 1180.00, 1145.00, '098765432132', 'Mensual', 2024, 28);



-- ========================================
--  Clientes
-- ========================================
-- Personas fisicas
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28013', 'elena.rodriguez@gmail.com', 'Calle Gran Vía 123', '12345678A', 'Elena Rodriguez', '2222222', 'Madrid', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28009', 'carlos.sanchez@hotmail.com', 'Calle Alcalá 456', '87654321B', 'Carlos Sanchez', '34612345678', 'Madrid', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28008', 'laura.fernandez@yahoo.es', 'Calle Princesa 789', '23456789C', 'Laura Fernandez', '34623456789', 'Madrid', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28013', 'david.lopez@outlook.es', 'Calle Mayor 101', '34567890D', 'David Lopez', '34634567890', 'Madrid', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28004', 'ana.martinez@gmail.com', 'Calle Fuencarral 202', '45678901E', 'Ana Martinez', '34645678901', 'Madrid', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28006', 'javier.gomez@hotmail.com', 'Calle Serrano 303', '56789012F', 'Javier Gomez', '34656789012', 'Madrid', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28013', 'sofia.navarro@yahoo.es', 'Calle Gran Vía 404', '67890123G', 'Sofia Navarro', '34667890123', 'Madrid', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28014', 'miguel.fernandez@outlook.es', 'Calle Prado 505', '78901234H', 'Miguel Fernandez', '34678901234', 'Madrid', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28012', 'isabel.rodriguez@gmail.com', 'Calle Atocha 606', '89012345I', 'Isabel Rodriguez', '34689012345', 'Madrid', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28001', 'alejandro.lopez@hotmail.com', 'Calle Goya 707', '90123456J', 'Alejandro Lopez', '34690123456', 'Madrid', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Zaragoza', '50003', 'david.lopez@outlook.es', 'Calle Gran Vía 101', '34567890D', 'David Lopez', '34634567890', 'Zaragoza', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Málaga', '29004', 'ana.martinez@gmail.com', 'Calle Alameda 202', '45678901E', 'Ana Martinez', '34645678901', 'Málaga', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Barcelona', '08001', 'javier.gomez@hotmail.com', 'Avenida Diagonal 303', '56789012F', 'Javier Gomez', '34656789012', 'Barcelona', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('A Coruña', '15001', 'sofia.navarro@yahoo.es', 'Calle del Mar 404', '67890123G', 'Sofia Navarro', '34667890123', 'A Coruña', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Oviedo', '33001', 'miguel.fernandez@outlook.es', 'Calle de la Plata 505', '78901234H', 'Miguel Fernandez', '34678901234', 'Asturias', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Sevilla', '41002', 'isabel.rodriguez@gmail.com', 'Calle Mayor 606', '89012345I', 'Isabel Rodriguez', '34689012345', 'Sevilla', NULL);
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Valencia', '46001', 'alejandro.lopez@hotmail.com', 'Avenida de la Paz 707', '90123456J', 'Alejandro Lopez', '34690123456', 'Valencia', NULL);

-- Personas juridicas
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28013', 'soporte@tecno-byte.es', 'Calle Gran Vía 123', 'A1234567B', NULL, '34676543210', 'Madrid', 'TecnoByte Solutions S.L.');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Sevilla', '41004', 'soporte@innova-sys.es', 'Avenida de la Constitución 456', 'C9876543D', NULL, '34681234567', 'Sevilla', 'InnovaSys Tech Group');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Valencia', '46002', 'soporte@microfutura-informatics.es', 'Calle de la Paz 789', 'H2468024J', NULL, '34687654321', 'Valencia', 'MicroFutura Informatics');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Zaragoza', '50003', 'soporte@datavanguard.es', 'Calle Alfonso 101', 'S1357924T', NULL, '34698765432', 'Zaragoza', 'DataVanguard Solutions');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Málaga', '29016', 'soporte@bytelink-microsystems.es', 'Calle Larios 202', 'U9876543V', NULL, '34676543210', 'Málaga', 'ByteLink Microsystems');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Barcelona', '08008', 'soporte@infranet-innovations.es', 'Passeig de Gràcia 303', 'W8765432X', NULL, '34681234567', 'Barcelona', 'InfraNet Innovations S.A.');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('A Coruña', '15001', 'soporte@cloudsphere-tech.es', 'Calle Real 404', 'N2345678P', NULL, '34687654321', 'A Coruña', 'CloudSphere Tech Services');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Oviedo', '33003', 'soporte@ecodata-informatica.es', 'Calle Uria 505', 'M9876543N', NULL, '34698765432', 'Asturias', 'EcoData Informática Integral');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28001', 'soporte@sysharbor-solutions.es', 'Calle Serrano 606', 'R3456789S', NULL, '34676543210', 'Madrid', 'SysHarbor Solutions España');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Sevilla', '41011', 'soporte@gestionmicro-empresarial.es', 'Avenida de la Palmera 707', 'V9876543W', NULL, '34681234567', 'Sevilla', 'GestiónMicro Informática Empresarial');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28014', 'soporte@microsys-solutions.es', 'Calle Gran Via 456', 'G9876543H', NULL, '34676543211', 'Madrid', 'MicroSys Solutions España');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Sevilla', '41005', 'soporte@infrasoft-iberia.es', 'Avenida de la Constitucion 567', 'L2468024M', NULL, '34681234568', 'Sevilla', 'InfraSoft Innovations Iberia');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Valencia', '46004', 'soporte@bytemaster-servicios.es', 'Calle de la Paz 678', 'Q1357924R', NULL, '34687654322', 'Valencia', 'ByteMaster ERP Servicios S.L.');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Zaragoza', '50005', 'soporte@microgestion-tech.es', 'Calle Alfonso 789', 'X1357924Y', NULL, '34698765433', 'Zaragoza', 'MicroGestión Tech España');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Málaga', '29017', 'soporte@redcode-solutions.es', 'Calle Larios 890', 'I9876543J', NULL, '34676543212', 'Málaga', 'RedCode Solutions Ibérica');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Barcelona', '08009', 'soporte@datacrafting.es', 'Passeig de Gracia 123', 'B8765432C', NULL, '34681234569', 'Barcelona', 'DataCrafting Systems España');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('A Coruña', '15003', 'soporte@cloudlogic-microservices.es', 'Calle Real 234', 'F2345678G', NULL, '34687654323', 'A Coruña', 'CloudLogic Microservices S.A.');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Oviedo', '33004', 'soporte@techharbor-soluciones.es', 'Calle Uria 345', 'O9876543P', NULL, '34698765434', 'Asturias', 'TechHarbor ERP Soluciones Spain');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Madrid', '28002', 'soporte@nanoinnovate.es', 'Calle Serrano 456', 'Z3456789A', NULL, '34676543213', 'Madrid', 'NanoInnovate Informatics España');
INSERT INTO `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`) VALUES ('Sevilla', '41006', 'soporte@infrawave-iberica.es', 'Avenida de la Palmera 567', 'T9876543U', NULL, '34681234570', 'Sevilla', 'InfraWave Microsystems Ibérica');



--- ========================================
--  Pedidos clientes
-- ========================================
-- Cliente 1
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Actualización de software', 'Calle Gran Vía 123', '2024-02-28', DATE_ADD('2024-02-28', INTERVAL 3 DAY), '2024-02-25', '12:00:00.000000', '11:00:00.000000', '09:00:00.000000', '09:30:00.000000', NULL, '01:30:00.000000', '01:30:00.000000', 1, 2, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Diagnóstico de fallo', 'Calle Gran Vía 123', NULL, NULL, '2024-01-08', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 2, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de disco duro', 'Calle Gran Vía 123', NULL, NULL, '2024-04-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 2, 3, 3);

-- Cliente 2
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de portátil', 'Calle Gran Vía 123', '2024-01-22', DATE_ADD('2024-01-22', INTERVAL 3 DAY), '2024-01-21', '13:00:00.000000', '12:30:00.000000', '9:00:00.000000', '10:00:00.000000', NULL, '01:30:00.000000', '02:30:00.000000', 2, 3, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reinstalación de Windows', 'Calle Gran Vía 123', NULL, NULL, '2024-01-12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 3, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle Gran Vía 123', NULL, NULL, '2024-01-16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 3, 3, 3);

-- Cliente 3
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de disco duro', 'Calle Alcalá 456', '2024-01-14', DATE_ADD('2024-01-14', INTERVAL 3 DAY), '2024-01-11', '14:00:00.000000', '13:15:00.000000', '11:30:00.000000', '12:30:00.000000', NULL, '01:45:00.000000', '00:45:00.000000', 3, 4, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Actualización de hardware', 'Calle Alcalá 456', NULL, NULL, '2024-02-14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 4, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Diagnóstico de hardware', 'Calle Alcalá 456', NULL, NULL, '2024-01-18', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 4, 3, 3);

-- Cliente 4
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle Princesa 789', '2024-03-10', DATE_ADD('2024-03-10', INTERVAL 3 DAY), '2024-03-08', '15:10:00.000000', '14:30:00.000000', '13:00:00.000000', '13:30:00.000000', NULL, '01:10:00.000000', '01:00:00.000000', 4, 5, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de impresora', 'Calle Princesa 789', NULL, NULL, '2024-02-11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, 5, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de red', 'Calle Princesa 789', NULL, NULL, '2024-01-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, 5, 3, 3);

-- Cliente 8
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de portátil', 'Calle del Mar 404', '2024-02-05', DATE_ADD('2024-02-05', INTERVAL 3 DAY), '2024-02-02', '12:00:00.000000', '11:00:00.000000', '10:00:00.000000', '10:30:00.000000', NULL, '01:30:00.000000', '00:30:00.000000', 8, 6, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Actualización de software', 'Calle del Mar 404', NULL, NULL, '2024-02-03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, 6, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Diagnóstico de fallo', 'Calle del Mar 404', NULL, NULL, '2024-02-08', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, 6, 3, 3);

-- Cliente 9
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de ordenador', 'Calle de la Plata 505', '2024-01-25', DATE_ADD('2024-01-25', INTERVAL 3 DAY), '2024-01-05', '12:00:00.000000', '11:00:00.000000', '09:00:00.000000', '09:30:00.000000', NULL, '01:30:00.000000', '01:30:00.000000', 9, 6, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle de la Plata 505', NULL, NULL, '2024-01-28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 9, 6, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de red', 'Calle de la Plata 505', NULL, NULL, '2024-02-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 9, 6, 3, 3);

-- Cliente 10
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de impresora', 'Calle Mayor 606', '2024-03-05', DATE_ADD('2024-03-05', INTERVAL 5 DAY), '2024-03-01', '11:00:00.000000', '10:15:00.000000', '08:30:00.000000', '09:00:00.000000', NULL, '01:15:00.000000', '01:15:00.000000', 10, 7, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Diagnóstico de fallo', 'Calle Mayor 606', NULL, NULL, '2024-03-03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 10, 7, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle Mayor 606', NULL, NULL, '2024-02-07', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 10, 7, 3, 3);


-- Cliente 11
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de equipos', 'Calle Gran Vía 123', '2024-01-25', DATE_ADD('2024-01-25', INTERVAL 0 DAY), '2024-01-22', '11:30:00.000000', '10:55:00.000000', '09:00:00.000000', '10:00:00.000000', NULL, '01:35:00.000000', '00:55:00.000000', 11, 7, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle Gran Vía 123', NULL, NULL, '2024-02-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11, 7, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Actualización de equipos', 'Calle Gran Vía 123', NULL, NULL, '2024-02-11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11, 7, 3, 3);

-- Cliente 12
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de sistemas', 'Avenida de la Constitución 456', '2024-03-16', DATE_ADD('2024-03-16', INTERVAL 3 DAY), '2024-03-15', '11:25:00.000000', '11:00:00.000000', '10:00:00.000000', '10:10:00.000000', NULL, '00:35:00.000000', '00:50:00.000000', 12, 8, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Avenida de la Constitución 456', NULL, NULL, '2024-02-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 12, 8, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Actualización de sistemas', 'Avenida de la Constitución 456', NULL, NULL, '2024-03-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 12, 8, 3, 3);

-- Cliente 13
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de ordenadores', 'Calle de la Paz 789', '2024-02-15', DATE_ADD('2024-02-15', INTERVAL 3 DAY), '2024-02-05', '12:45:00.000000', '12:15:00.000000', '10:30:00.000000', '11:15:00.000000', NULL, '01:15:00.000000', '01:00:00.000000', 13, 9, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle de la Paz 789', NULL, NULL, '2024-03-03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 13, 9, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Actualización de software', 'Calle de la Paz 789', NULL, NULL, '2024-02-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 13, 9, 3, 3);

-- Cliente 14
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de equipos', 'Calle Alfonso 101', '2024-03-05', DATE_ADD('2024-03-05', INTERVAL 3 DAY), '2024-03-01', '11:00:00.000000', '10:30:00.000000', '08:45:00.000000', '09:30:00.000000', NULL, '01:15:00.000000', '01:00:00.000000', 14, 10, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle Alfonso 101', NULL, NULL, '2024-03-28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 14, 10, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Actualización de equipos', 'Calle Alfonso 101', NULL, NULL, '2024-04-11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 14, 10, 3, 3);

-- Cliente 15
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Mantenimiento de servidores', 'Calle Real 404', '2024-01-20', DATE_ADD('2024-01-20', INTERVAL 3 DAY), '2024-01-15', '14:15:00.000000', '13:30:00.000000', '09:00:00.000000', '09:30:00.000000', NULL, '01:15:00.000000', '04:00:00.000000', 15, 11, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Implementación de sistemas', 'Calle Real 404', NULL, NULL, '2024-03-25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 15, 11, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de redes', 'Calle Real 404', NULL, NULL, '2024-04-03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 15, 11, 3, 3);

-- Cliente 16
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Actualización de software', 'Calle Uria 505', '2024-02-21', DATE_ADD('2024-02-21', INTERVAL 3 DAY), '2024-02-15', '17:00:00.000000', '16:00:00.000000', '15:00:00.000000', '15:40:00.000000', NULL, '01:40:00.000000', '00:20:00.000000', 16, 3, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de ordenadores', 'Calle Uria 505', NULL, NULL, '2024-03-02', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 16, 3, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de periféricos', 'Calle Uria 505', NULL, NULL, '2024-04-04', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 16, 3, 3, 3);

-- Cliente 17
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de servidores', 'Calle Serrano 606', '2024-01-18', DATE_ADD('2024-01-18', INTERVAL 3 DAY), '2024-01-15', '17:30:00.000000', '16:30:00.000000', '15:00:00.000000', '15:30:00.000000', NULL, '01:30:00.000000', '01:00:00.000000', 17, 4, 2, 2);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Mantenimiento de equipos', 'Calle Serrano 606', NULL, NULL, '2024-03-05', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 17, 4, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de redes', 'Calle Serrano 606', NULL, NULL, '2024-04-02', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 17, 4, 3, 3);






-- LOS INSERT NO TIENEN SENTIDOS, ES PARA PROBAR

-- INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('hola', 'aaaa', '2024-01-10', '2024-04-11', '11:00:00.000000', '11:30:00.000000', '10:00:00.000000', '10:10:00.000000', '21', 'prueba', '1000', '30', '70', '01:00:00.000000', '00:30:00.000000', 1210, '1', '1', '4');
-- INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('hola', 'aaaa', '2024-01-10', '2024-04-11', '11:00:00.000000', '11:30:00.000000', '10:00:00.000000', '10:10:00.000000', '21', 'prueba', '1000', '30', '70', '01:00:00.000000', '00:30:00.000000', 1210, '1', '2', '4');

-- INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES ('2024-01-20', '1210', 'Efectivo', '1');
-- INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES ('2024-01-20', '1210', 'Efectivo', '2');
 
-- INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (100.00, 50.00, 'ES12345678901234567890', 30.00, 15.00, 4, 1500.00, 1600.00, 1555.00, '123456789012', 'Mensual', 2024, 1);
-- INSERT INTO `trabajotfgerp`.`nominas_empleados` (`anticipos`, `bonificacion`, `cuenta_bancaria`, `deducciones`, `irpf`, `mes`, `salario_base`, `salario_bruto`, `salario_neto`, `seguridad_social`, `tipo_nomina`, `year`, `id_persona`) VALUES (120.00, 70.00, 'ES98765432109876543210', 40.00, 20.00, 4, 1600.00, 1700.00, 1650.00, '098765432109', 'Mensual', 2024, 2);




-- ========================================
--  Facturas clientes
-- ========================================
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Actualización de software', 'Calle Gran Vía 123', '2024-03-02', '2024-04-02', '12:00:00', '11:00:00', '09:00:00', '09:30:00', 21, NULL, 150.0, 30.0, 70.0, '01:30:00', '01:30:00', 181.5, 1, 1, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Reparación de portátil', 'Calle Gran Vía 123', '2024-01-25', '2024-01-25', '13:00:00', '12:30:00', '09:00:00', '10:00:00', 21, NULL, 220.0, 30.0, 70.0, '01:30:00', '02:30:00', 266.2, 2, 4, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Reparación de disco duro', 'Calle Alcalá 456', '2024-01-17', '2024-01-17', '14:00:00', '12:30:00', '11:30:00', '12:30:00', 21, NULL, 105.0, 30.0, 70.0, '01:45:00', '00:45:00', 127.05, 3, 7, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Instalación de software', 'Calle Princesa 789', '2024-03-13', '2024-03-13', '15:10:00', '14:30:00', '13:00:00', '13:30:00', 21, NULL, 105.0, 30.0, 70.0, '01:10:00', '01:00:00', 127.05, 4, 10, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Reparación de portátil', 'Calle del Mar 404', '2024-02-08', '2024-02-08', '12:00:00', '11:00:00', '10:00:00', '10:30:00', 21, NULL, 80.0, 30.0, 70.0, '01:30:00', '00:30:00', 96.8, 8, 13, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Reparación de ordenador', 'Calle de la Plata 505', '2024-01-28', '2024-01-28', '12:00:00', '11:00:00', '09:00:00', '09:30:00', 21, NULL, 150.0, 30.0, 70.0, '01:30:00', '01:30:00', 181.5, 9, 16, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Reparación de impresora', 'Calle Mayor 606', '2024-03-10', '2024-03-10', '11:00:00', '10:15:00', '08:30:00', '09:00:00', 21, NULL, 125.0, 30.0, 70.0, '01:15:00', '01:15:00', 151.25, 10, 19, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Reparación de equipos', 'Calle Gran Vía 123', '2024-01-25', '2024-01-25', '11:30:00', '10:55:00', '09:00:00', '10:00:00', 21, NULL, 111.67, 30.0, 70.0, '01:35:00', '00:55:00', 135.12, 11, 22, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Reparación de sistemas', 'Avenida de la Constitución 456', '2024-03-19', '2024-03-19', '11:25:00', '11:00:00', '10:00:00', '10:10:00', 21, NULL, 75.83, 30.0, 70.0, '00:35:00', '00:50:00', 91.75, 12, 25, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Reparación de ordenadores', 'Calle de la Paz 789', '2024-02-18', '2024-02-18', '12:45:00', '12:15:00', '10:30:00', '11:15:00', 21, NULL, 107.5, 30.0, 70.0, '01:15:00', '01:00:00', 130.07, 13, 28, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Reparación de equipos', 'Calle Alfonso 101', '2024-03-08', '2024-03-08', '11:00:00', '10:30:00', '08:45:00', '09:30:00', 21, NULL, 107.5, 30.0, 70.0, '01:15:00', '01:00:00', 130.07, 14, 31, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Mantenimiento de servidores', 'Calle Real 404', '2024-01-23', '2024-01-23', '14:15:00', '13:30:00', '09:00:00', '09:30:00', 21, NULL, 317.5, 30.0, 70.0, '01:15:00', '04:00:00', 384.18, 15, 34, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Actualización de software', 'Calle Uria 505', '2024-02-24', '2024-02-24', '17:00:00', '16:00:00', '15:00:00', '15:40:00', 21, NULL, 73.33, 30.0, 70.0, '01:40:00', '00:20:00', 88.73, 16, 37, 4);
INSERT INTO `trabajotfgerp`.`facturas_clientes` (`descripcion_servicio`, `direccion_entrega`, `fecha_entrega_real_pedido`, `fecha_factura_emitida`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `iva`, `observacion`, `subtotal_factura_sin_iva`, `tarifa_hora_desplazamiento`, `tarifa_hora_servicio`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `total_factura`, `id_cliente`, `id_pedido_cliente`, `id_tipo_estado`) VALUES ('Configuración de servidores', 'Calle Serrano 606', '2024-01-21', '2024-01-21', '17:30:00', '16:30:00', '15:00:00', '15:30:00', 21, NULL, 115.0, 30.0, 70.0, '01:30:00', '01:00:00', 139.15, 17, 40, 4);




-- ========================================
--  Pagos facturas clientes
-- ========================================
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-04-02', INTERVAL 1 DAY), 181.5, 'Efectivo', 1);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-01-25', INTERVAL 2 DAY), 266.2, 'Efectivo', 2);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-01-17', INTERVAL 1 DAY), 127.05, 'Efectivo', 3);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-03-13', INTERVAL 3 DAY), 127.05, 'Efectivo', 4);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-02-08', INTERVAL 2 DAY), 96.8, 'Efectivo', 5);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-01-28', INTERVAL 1 DAY), 181.5, 'Efectivo', 6);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-03-10', INTERVAL 2 DAY), 151.25, 'Efectivo', 7);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-01-25', INTERVAL 1 DAY), 135.12, 'Efectivo', 8);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-03-19', INTERVAL 3 DAY), 91.75, 'Efectivo', 9);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-02-18', INTERVAL 1 DAY), 130.07, 'Efectivo', 10);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-03-08', INTERVAL 0 DAY), 130.07, 'Efectivo', 11);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-01-23', INTERVAL 4 DAY), 384.18, 'Efectivo', 12);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-02-24', INTERVAL 0 DAY), 88.73, 'Efectivo', 13);
INSERT INTO `trabajotfgerp`.`pagos_facturas_clientes` (`fecha_pago_realizada`, `importe_pagado`, `metodo_pago`, `id_factura_cliente`) VALUES (DATE_ADD('2024-01-21', INTERVAL 1 DAY), 139.15, 'Efectivo', 14);



-- -------------------------------------------------------------------------------------------------------------------------------


-- ========================================
--  Pedidos clientes creados para generar facturas
-- ========================================
-- Cliente 26
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle Serrano 606', '2024-05-10', DATE_ADD('2024-05-10', INTERVAL 5 DAY), '2024-05-01', '14:30:00.000000', '13:30:00.000000', '11:00:00.000000', '11:30:00.000000', NULL, '01:30:00.000000', '02:00:00.000000', 26, 21, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Mantenimiento preventivo', 'Calle Serrano 606', NULL, NULL, '2024-06-07', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 26, 21, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de hardware', 'Calle Serrano 606', NULL, NULL, '2024-05-27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 26, 21, 3, 3);

-- Cliente 27
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Mantenimiento de sistemas', 'Avenida de la Palmera 707', '2024-05-18', DATE_ADD('2024-05-18', INTERVAL 3 DAY), '2024-05-12', '17:30:00.000000', '16:30:00.000000', '14:30:00.000000', '15:00:00.000000', NULL, '01:30:00.000000', '01:30:00.000000', 27, 22, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de red', 'Avenida de la Palmera 707', NULL, NULL, '2024-06-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 27, 22, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de servidor', 'Avenida de la Palmera 707', NULL, NULL, '2024-05-11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 27, 22, 3, 3);

-- Cliente 28
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Actualización de software', 'Calle Gran Via 456', '2024-06-13', DATE_ADD('2024-06-13', INTERVAL 3 DAY), '2024-06-10', '15:00:00.000000', '14:00:00.000000', '12:00:00.000000', '12:45:00.000000', NULL, '01:45:00.000000', '01:15:00.000000', 28, 23, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de hardware', 'Calle Gran Via 456', NULL, NULL, '2024-06-06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 28, 23, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de sistema operativo', 'Calle Gran Via 456', NULL, NULL, '2024-06-17', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 28, 23, 3, 3);

-- Cliente 29
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de red', 'Avenida de la Constitucion 567', '2024-05-17', DATE_ADD('2024-05-17', INTERVAL 3 DAY), '2024-05-14', '12:30:00.000000', '11:30:00.000000', '09:30:00.000000', '10:00:00.000000', NULL, '01:30:00.000000', '01:30:00.000000', 29, 24, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de servidor', 'Avenida de la Constitucion 567', NULL, NULL, '2024-06-10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 29, 24, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de firewall', 'Avenida de la Constitucion 567', NULL, NULL, '2024-06-25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 29, 24, 3, 3);

-- Cliente 30
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Optimización de base de datos', 'Calle de la Paz 678', '2024-06-22', DATE_ADD('2024-06-22', INTERVAL 3 DAY), '2024-06-20', '13:30:00.000000', '12:45:00.000000', '10:30:00.000000', '11:00:00.000000', NULL, '01:15:00.000000', '01:45:00.000000', 30, 25, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`,`fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Migración de datos', 'Calle de la Paz 678', NULL, NULL, '2024-05-08', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, 25, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de servidores', 'Calle de la Paz 678', NULL, NULL, '2024-06-20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, 25, 3, 3);

-- Cliente 31
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de red', 'Calle Alfonso 789', '2024-05-28', DATE_ADD('2024-05-28', INTERVAL 3 DAY), '2024-05-25', '11:00:00.000000', '10:20:00.000000', '08:00:00.000000', '08:30:00.000000', NULL, '01:10:00.000000', '01:50:00.000000', 31, 4, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle Alfonso 789', NULL, NULL, '2024-06-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 31, 4, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de firewall', 'Calle Alfonso 789', NULL, NULL, '2024-05-24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 31, 4, 3, 3);

-- Cliente 32
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Actualización de software', 'Calle Larios 890', '2024-05-30', DATE_ADD('2024-05-30', INTERVAL 3 DAY), '2024-05-26', '15:30:00.000000', '14:30:00.000000', '12:30:00.000000', '13:00:00.000000', NULL, '01:30:00.000000', '01:30:00.000000', 32, 6, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Mantenimiento preventivo', 'Calle Larios 890', NULL, NULL, '2024-05-26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 32, 6, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de hardware', 'Calle Larios 890', NULL, NULL, '2024-05-27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 32, 6, 3, 3);

-- Cliente 33
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de firewall', 'Passeig de Gracia 123', '2024-06-18', DATE_ADD('2024-06-18', INTERVAL 3 DAY), '2024-06-13', '14:30:00.000000', '13:30:00.000000', '10:15:00.000000', '11:36:00.000000', NULL, '02:21:00.000000', '01:54:00.000000', 33, 7, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Passeig de Gracia 123', NULL, NULL, '2024-05-04', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 33, 7, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Mantenimiento preventivo', 'Passeig de Gracia 123', NULL, NULL, '2024-05-10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 33, 7, 3, 3);

-- Cliente 16
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle Atocha 606', '2024-05-19', DATE_ADD('2024-05-19', INTERVAL 3 DAY), '2024-05-16', '14:30:00.000000', '13:30:00.000000', '11:30:00.000000', '12:00:00.000000', NULL, '01:30:00.000000', '01:30:00.000000', 16, 7, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Mantenimiento preventivo', 'Calle Atocha 606', NULL, NULL, '2024-06-09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 16, 7, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de red', 'Calle Atocha 606', NULL, NULL, '2024-05-22', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 16, 7, 3, 3);

-- Cliente 10
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Optimización de base de datos', 'Calle Goya 707', '2024-05-27', DATE_ADD('2024-05-27', INTERVAL 3 DAY), '2024-05-25', '12:00:00.000000', '11:00:00.000000', '09:40:00.000000', '10:10:00.000000', NULL, '01:30:00.000000', '00:50:00.000000', 10, 7, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle Goya 707', NULL, NULL, '2024-06-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 10, 7, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de firewall', 'Calle Goya 707', NULL, NULL, '2024-06-23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 10, 7, 3, 3);

-- Cliente 11
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle Gran Vía 101', '2024-05-16', DATE_ADD('2024-05-16', INTERVAL 3 DAY), '2024-05-12', '11:05:00.000000', '10:30:00.000000', '07:30:00.000000', '08:00:00.000000', NULL, '01:05:00.000000', '02:30:00.000000', 11, 8, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de red', 'Calle Gran Vía 101', NULL, NULL, '2024-06-10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11, 8, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de servidores', 'Calle Gran Vía 101', NULL, NULL, '2024-06-07', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11, 8, 3, 3);

-- Cliente 12
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Mantenimiento preventivo', 'Calle Alameda 202', '2024-06-22', DATE_ADD('2024-06-22', INTERVAL 3 DAY), '2024-06-20', '10:00:00.000000', '09:30:00.000000', '08:00:00.000000', '08:50:00.000000', NULL, '01:20:00.000000', '00:40:00.000000', 12, 8, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Calle Alameda 202', NULL, NULL, '2024-05-18', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 12, 8, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de red', 'Calle Alameda 202', NULL, NULL, '2024-05-24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 12, 8, 3, 3);

-- Cliente 13
-- Pedidos aceptados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Reparación de hardware', 'Avenida Diagonal 303', '2024-05-25', DATE_ADD('2024-05-25', INTERVAL 3 DAY), '2024-05-20', '12:30:00.000000', '11:30:00.000000', '10:30:00.000000', '11:00:00.000000', NULL, '01:30:00.000000', '00:30:00.000000', 13, 9, 2, 1);
-- Pedidos rechazados
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Instalación de software', 'Avenida Diagonal 303', NULL, NULL, '2024-05-11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 13, 9, 3, 3);
INSERT INTO `trabajotfgerp`.`pedidos_clientes` (`descripcion`, `direccion_entrega`, `fecha_entrega_prevista`, `fecha_entrega_real`, `fecha_solicitud_pedido`, `hora_fin_desplazamiento`, `hora_fin_servicio`, `hora_inicio_desplazamiento`, `hora_inicio_servicio`, `observacion`, `tiempo_desplazamiento_total`, `tiempo_servicio_total`, `id_cliente`, `id_persona_encargado`, `id_tipo_estado`, `id_tipo_estado_factura`) VALUES ('Configuración de red', 'Avenida Diagonal 303', NULL, NULL, '2024-05-10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 13, 9, 3, 3);



-- ========================================
--  Vacaciones empleados creados para almacenar datos en el blockchain
-- ========================================
-- Persona 12
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 25, 0, 5, FALSE, '2024-05-05', '2024-05-01', TRUE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, 12, 2);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 20, 5, 5, FALSE, '2024-08-19', '2024-08-15', TRUE, NULL, NULL, 'Vacaciones aceptadas para agosto.', NULL, 12, 2);
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 0, 5, FALSE, '2023-07-05', '2023-07-01', FALSE, NULL, NULL, 'Vacaciones denegadas para julio.', NULL, 12, 3);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 0, 5, FALSE, '2023-08-14', '2023-08-10', FALSE, NULL, NULL, 'Vacaciones denegadas para agosto.', NULL, 12, 3);

-- Persona 13
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 25, 0, 5, FALSE, '2023-05-05', '2023-05-01', TRUE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, 13, 2);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 20, 5, 5, FALSE, '2023-08-06', '2023-08-02', TRUE, NULL, NULL, 'Vacaciones aceptadas para agosto.', NULL, 13, 2);
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 0, 5, FALSE, '2023-07-05', '2023-07-01', FALSE, NULL, NULL, 'Vacaciones denegadas para julio.', NULL, 13, 3);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 0, 5, FALSE, '2023-08-22', '2023-08-17', FALSE, NULL, NULL, 'Vacaciones denegadas para agosto.', NULL, 13, 3);

-- Persona 14
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 25, 0, 5, FALSE, '2023-05-05', '2023-05-01', TRUE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, 14, 2);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 5, 5, FALSE, '2023-06-20', '2023-06-16', TRUE, NULL, NULL, 'Vacaciones aceptadas para junio.', NULL, 14, 2);
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 20, 0, 5, FALSE, '2023-07-05', '2023-07-01', FALSE, NULL, NULL, 'Vacaciones denegadas para julio.', NULL, 14, 3);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 20, 0, 5, FALSE, '2023-08-14', '2023-08-10', FALSE, NULL, NULL, 'Vacaciones denegadas para agosto.', NULL, 14, 3);

-- Persona 20
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 25, 0, 5, FALSE, '2023-05-05', '2023-05-01', TRUE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, 20, 2);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 20, 5, 5, FALSE, '2023-09-28', '2023-09-23', TRUE, NULL, NULL, 'Vacaciones aceptadas para septiembre.', NULL, 20, 2);
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 20, 0, 5, FALSE, '2023-07-15', '2023-07-11', FALSE, NULL, NULL, 'Vacaciones denegadas para julio.', NULL, 20, 3);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 20, 0, 5, FALSE, '2023-08-24', '2023-08-20', FALSE, NULL, NULL, 'Vacaciones denegadas para agosto.', NULL, 20, 3);

-- Persona 22
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 25, 0, 5, FALSE, '2023-05-05', '2023-05-01', TRUE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, 22, 2);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (8, 22, 3, 5, FALSE, '2023-05-19', '2023-05-17', TRUE, NULL, NULL, 'Vacaciones aceptadas para junio.', NULL, 22, 2);
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (8, 22, 0, 5, FALSE, '2023-07-07', '2023-07-03', FALSE, NULL, NULL, 'Vacaciones denegadas para julio.', NULL, 22, 3);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (8, 22, 0, 5, FALSE, '2023-08-14', '2023-08-10', FALSE, NULL, NULL, 'Vacaciones denegadas para agosto.', NULL, 22, 3);

-- Persona 23
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 25, 0, 5, FALSE, '2023-05-09', '2023-05-05', TRUE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, 23, 2);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 5, 5, FALSE, '2023-07-13', '2023-07-18', TRUE, NULL, NULL, 'Vacaciones aceptadas para junio.', NULL, 23, 2);
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 0, 5, FALSE, '2023-07-05', '2023-07-01', FALSE, NULL, NULL, 'Vacaciones denegadas para julio.', NULL, 23, 3);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 0, 5, FALSE, '2023-08-16', '2023-08-12', FALSE, NULL, NULL, 'Vacaciones denegadas para agosto.', NULL, 23, 3);

-- Persona 24
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 25, 0, 5, FALSE, '2023-05-09', '2023-05-06', TRUE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, 24, 2);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 5, 5, FALSE, '2023-06-16', '2023-06-12', TRUE, NULL, NULL, 'Vacaciones aceptadas para junio.', NULL, 24, 2);
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 0, 5, FALSE, '2023-07-05', '2023-07-01', FALSE, NULL, NULL, 'Vacaciones denegadas para julio.', NULL, 24, 3);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 0, 5, FALSE, '2023-08-17', '2023-08-12', FALSE, NULL, NULL, 'Vacaciones denegadas para agosto.', NULL, 24, 3);

-- Persona 25
-- Aceptadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (5, 25, 0, 5, FALSE, '2023-05-14', '2023-05-09', TRUE, NULL, NULL, 'Vacaciones aceptadas para mayo.', NULL, 25, 2);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 5, 5, FALSE, '2023-06-19', '2023-06-15', TRUE, NULL, NULL, 'Vacaciones aceptadas para junio.', NULL, 25, 2);
-- Denegadas
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 0, 5, FALSE, '2023-07-12', '2023-07-07', FALSE, NULL, NULL, 'Vacaciones denegadas para julio.', NULL, 25, 3);
INSERT INTO `trabajotfgerp`.`vacaciones_empleados` (`dias_disfrutados`, `dias_disponibles`, `dias_pendientes`, `dias_solicitados`, `error_blockchain`, `fecha_fin`, `fecha_inicio`, `gestionado_con_blockchain`, `hash_block`, `hash_transaccion_vacacion`, `observacion`, `previous_hash_block`, `id_persona`, `id_tipo_estado`) VALUES (10, 20, 0, 5, FALSE, '2023-08-15', '2023-08-11', FALSE, NULL, NULL, 'Vacaciones denegadas para agosto.', NULL, 25, 3);