/*INSERT INTO `trabajotfgerp`.`solicitudes` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`) VALUES ('a', '2023-01-01', '2', '1', '1');*/
-- SELECT CASE WHEN COUNT(*) > 0 THEN true ELSE false END FROM solicitudes c WHERE c.id_persona = 1 AND c.fecha_solicitud = "2023-12-1";
-- SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM VacacionEmpleadoModel c WHERE c.persona = :id_persona AND c.fecha_inicio <= :fecha_finalizacion AND c.fecha_finalizacion >= :fecha_inicio")
-- Configuración de Usuario y Esquema en MySQL
/*DROP USER IF EXISTS 'diegogonzalez'@'localhost';

CREATE USER 'diegogonzalez'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bbdd1122';


DROP SCHEMA IF EXISTS trabajotfgerp;

CREATE SCHEMA trabajotfgerp;


GRANT ALL PRIVILEGES ON trabajotfgerp.* TO 'diegogonzalez'@'localhost';

flush privileges;


USE trabajotfgerp;*/
/* -- Creación de Tablas en la Base de Datos AUN NO ESTAN TODOS

-- Asistencias Empleados
CREATE TABLE `asistencias_empleados` (
`id_asistencia_empleado` int NOT NULL AUTO_INCREMENT,
`comentarios` varchar(255) DEFAULT NULL,
`fecha` date NOT NULL,
`hora_entrada` time(6) NOT NULL,
`hora_salida` time(6) DEFAULT NULL,
`total_horas_trabajadas` time(6) NOT NULL,
`id_persona` int NOT NULL,
PRIMARY KEY (`id_asistencia_empleado`),
KEY `FK_asistencias_empleados_personas` (`id_persona`),
CONSTRAINT `FK_asistencias_empleados_personas` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`)
);


-- Ayudas Empleados
CREATE TABLE `ayudas_empleados` (
`id_ayuda_empleado` int NOT NULL AUTO_INCREMENT,
`comentarios` varchar(255) DEFAULT NULL,
`fecha_fin` date NOT NULL,
`fecha_inicio` date NOT NULL,
`valor_asociado` float NOT NULL,
`id_persona` int NOT NULL,
`id_tipo_ayuda` int NOT NULL,
`id_tipo_estado` int NOT NULL,
PRIMARY KEY (`id_ayuda_empleado`),
KEY `FK_ayudas_empleados_personas` (`id_persona`),
KEY `FK_ayudas_empleados_tipos_ayudas` (`id_tipo_ayuda`),
KEY `FK_ayudas_empleados_tipos_estados` (`id_tipo_estado`),
CONSTRAINT `FK_ayudas_empleados_personas` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`),
CONSTRAINT `FK_ayudas_empleados_tipos_ayudas` FOREIGN KEY (`id_tipo_ayuda`) REFERENCES `tipos_ayudas` (`id_tipo_ayuda`),
CONSTRAINT `FK_ayudas_empleados_tipos_estados` FOREIGN KEY (`id_tipo_estado`) REFERENCES `tipos_estados` (`id_tipo_estado`)
);


-- Bajas Laborales Empleados
CREATE TABLE `bajas_laborales_empleados` (
`id_baja_laboral_empleado` int NOT NULL AUTO_INCREMENT,
`comentarios` varchar(255) DEFAULT NULL,
`fecha_fin` date NOT NULL,
`fecha_inicio` date NOT NULL,
`id_motivo_baja` int NOT NULL,
`id_persona` int NOT NULL,
`id_tipo_estado` int NOT NULL,
PRIMARY KEY (`id_baja_laboral_empleado`),
KEY `FK_bajas_laborales_empleados_motivos_bajas` (`id_motivo_baja`),
KEY `FK_bajas_laborales_empleados_personas` (`id_persona`),
KEY `FK_bajas_laborales_empleados_tipos_estados` (`id_tipo_estado`),
CONSTRAINT `FK_bajas_laborales_empleados_motivos_bajas` FOREIGN KEY (`id_motivo_baja`) REFERENCES `motivos_bajas` (`id_motivo_baja`),
CONSTRAINT `FK_bajas_laborales_empleados_personas` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`),
CONSTRAINT `FK_bajas_laborales_empleados_tipos_estados` FOREIGN KEY (`id_tipo_estado`) REFERENCES `tipos_estados` (`id_tipo_estado`)
);


-- Clientes


-- Detalles Facturas Clientes


-- Facturas Clientes


-- Motivos_Bajas
CREATE TABLE `motivos_bajas` (
`id_motivo_baja` int NOT NULL AUTO_INCREMENT,
`motivo_baja` varchar(255) NOT NULL,
PRIMARY KEY (`id_motivo_baja`),
UNIQUE KEY `UK_motivo_baja` (`motivo_baja`)
);


-- Nominas Empleados


-- Pagos Facturas_Clientes


-- Pedidos Clientes


-- Personas
CREATE TABLE `personas` (
`id_persona` int NOT NULL AUTO_INCREMENT,
`apellidos` varchar(255) NOT NULL,
`correo_electronico` varchar(255) NOT NULL,
`direccion` varchar(255) NOT NULL,
`dni` varchar(255) NOT NULL,
`fecha_nacimiento` varchar(255) NOT NULL,
`genero` varchar(255) NOT NULL,
`nombre` varchar(255) NOT NULL,
`numero_empleado` int NOT NULL,
`numero_telefono` varchar(255) NOT NULL,
`id_tipo_persona` int NOT NULL,
PRIMARY KEY (`id_persona`),
UNIQUE KEY `UK_numero_empleado` (`numero_empleado`),
UNIQUE KEY `UK_dni` (`dni`),
UNIQUE KEY `UK_numero_telefono` (`numero_telefono`),
UNIQUE KEY `UK_correo_electronico` (`correo_electronico`),
KEY `FK_personas_tipos_personas` (`id_tipo_persona`),
CONSTRAINT `FK_personas_tipos_personas` FOREIGN KEY (`id_tipo_persona`) REFERENCES `tipos_personas` (`id_tipo_persona`)
);


-- Solicitudes Empleados
CREATE TABLE `solicitudes_empleados` (
`id_solicitud_empleado` int NOT NULL AUTO_INCREMENT,
`comentarios` varchar(255) DEFAULT NULL,
`fecha_solicitud` date NOT NULL,
`id_persona` int NOT NULL,
`id_tipo_estado` int NOT NULL,
`id_tipo_solicitud` int NOT NULL,
PRIMARY KEY (`id_solicitud_empleado`),
KEY `FK_solicitudes_empleados_personas` (`id_persona`),
KEY `FK_solicitudes_empleados_tipos_estados` (`id_tipo_estado`),
KEY `FK_solicitudes_empleados_tipos_solicitudes` (`id_tipo_solicitud`),
CONSTRAINT `FK_solicitudes_empleados_personas` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`),
CONSTRAINT `FK_solicitudes_empleados_tipos_estados` FOREIGN KEY (`id_tipo_estado`) REFERENCES `tipos_estados` (`id_tipo_estado`),
CONSTRAINT `FK_solicitudes_empleados_tipos_solicitudes` FOREIGN KEY (`id_tipo_solicitud`) REFERENCES `tipos_solicitudes` (`id_tipo_solicitud`)
);


-- Tipos Ayudas
CREATE TABLE `tipos_ayudas` (
`id_tipo_ayuda` int NOT NULL AUTO_INCREMENT,
`tipo_ayuda` varchar(255) NOT NULL,
PRIMARY KEY (`id_tipo_ayuda`),
UNIQUE KEY `UK_tipo_ayuda` (`tipo_ayuda`)
);


-- Tipos Estados
CREATE TABLE `tipos_estados` (
`id_tipo_estado` int NOT NULL AUTO_INCREMENT,
`tipo_estado` varchar(255) NOT NULL,
PRIMARY KEY (`id_tipo_estado`),
UNIQUE KEY `UK_tipo_estado` (`tipo_estado`)
);


-- Tipos Personas
CREATE TABLE `tipos_personas` (
`id_tipo_persona` int NOT NULL AUTO_INCREMENT,
`tipo_persona` varchar(255) NOT NULL,
PRIMARY KEY (`id_tipo_persona`),
UNIQUE KEY `UK_tipo_persona` (`tipo_persona`)
);


-- Tipos Solicitudes
CREATE TABLE `tipos_solicitudes` (
`id_tipo_solicitud` int NOT NULL AUTO_INCREMENT,
`tipo_solicitud` varchar(255) NOT NULL,
PRIMARY KEY (`id_tipo_solicitud`),
UNIQUE KEY `UK_tipo_solicitud` (`tipo_solicitud`)
);


-- Tipos Usuarios
CREATE TABLE `tipos_usuarios` (
`id_tipo_usuario` int NOT NULL AUTO_INCREMENT,
`tipo_usuario` varchar(255) NOT NULL,
PRIMARY KEY (`id_tipo_usuario`),
UNIQUE KEY `UK_tipo_usuario` (`tipo_usuario`)
);


-- Usuarios
CREATE TABLE `usuarios` (
`id_usuario` int NOT NULL AUTO_INCREMENT,
`nombre_usuario` varchar(255) NOT NULL,
`password` varchar(255) NOT NULL,
`id_persona` int NOT NULL,
`id_tipo_usuario` int NOT NULL,
PRIMARY KEY (`id_usuario`),
UNIQUE KEY `UK_nombre_usuario` (`nombre_usuario`),
UNIQUE KEY `UK_id_persona` (`id_persona`),
KEY `FK_usuarios_tipos_usuarios` (`id_tipo_usuario`),
CONSTRAINT `FK_usuarios_personas` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`),
CONSTRAINT `FK_usuarios_tipos_usuarios` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipos_usuarios` (`id_tipo_usuario`)
);


-- Vacaciones Empleados
CREATE TABLE `vacaciones_empleados` (
`id_vacacion_empleado` int NOT NULL AUTO_INCREMENT,
`comentarios` varchar(255) DEFAULT NULL,
`dias_disfrutados` int NOT NULL,
`dias_restantes` int NOT NULL,
`dias_solicitados` int NOT NULL,
`fecha_fin` date NOT NULL,
`fecha_inicio` date NOT NULL,
`id_persona` int NOT NULL,
`id_tipo_estado` int NOT NULL,
PRIMARY KEY (`id_vacacion_empleado`),
KEY `FK_vacaciones_empleados_personas` (`id_persona`),
KEY `FK_vacaciones_empleados_tipos_estados` (`id_tipo_estado`),
CONSTRAINT `FK_vacaciones_empleados_personas` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`),
CONSTRAINT `FK_vacaciones_empleados_tipos_estados` FOREIGN KEY (`id_tipo_estado`) REFERENCES `tipos_estados` (`id_tipo_estado`)
);
 */
-- ========================================
-- Tipos estados
-- ========================================
INSERT INTO
    `trabajotfgerp`.`tipos_estados` (`tipo_estado`)
VALUES
    ('Pendiente');

INSERT INTO
    `trabajotfgerp`.`tipos_estados` (`tipo_estado`)
VALUES
    ('Aprobada');

INSERT INTO
    `trabajotfgerp`.`tipos_estados` (`tipo_estado`)
VALUES
    ('Rechazada');

-- ========================================
-- Tipos usuarios
-- ========================================
INSERT INTO
    `trabajotfgerp`.`tipos_usuarios` (`tipo_usuario`)
VALUES
    ('Administrador');

INSERT INTO
    `trabajotfgerp`.`tipos_usuarios` (`tipo_usuario`)
VALUES
    ('Normal');

INSERT INTO
    `trabajotfgerp`.`tipos_usuarios` (`tipo_usuario`)
VALUES
    ('Recursos humanos');

-- ========================================
-- Tipos personas
-- ========================================
INSERT INTO
    `trabajotfgerp`.`tipos_personas` (`tipo_persona`)
VALUES
    ('Empleado');

INSERT INTO
    `trabajotfgerp`.`tipos_personas` (`tipo_persona`)
VALUES
    ('No empleado');

INSERT INTO
    `trabajotfgerp`.`tipos_personas` (`tipo_persona`)
VALUES
    ('Becario');

INSERT INTO
    `trabajotfgerp`.`tipos_personas` (`tipo_persona`)
VALUES
    ('Ex empleado');

-- ========================================
-- Tipos solicitudes
-- ========================================
INSERT INTO
    `trabajotfgerp`.`tipos_solicitudes` (`tipo_solicitud`)
VALUES
    ('Vacaciones');

INSERT INTO
    `trabajotfgerp`.`tipos_solicitudes` (`tipo_solicitud`)
VALUES
    ('Ayudas');

INSERT INTO
    `trabajotfgerp`.`tipos_solicitudes` (`tipo_solicitud`)
VALUES
    ('Bajas laborales');

-- ========================================
-- Motivos bajas
-- ========================================
INSERT INTO
    `trabajotfgerp`.`motivos_bajas` (`motivo_baja`)
VALUES
    ('Vacaciones');

INSERT INTO
    `trabajotfgerp`.`motivos_bajas` (`motivo_baja`)
VALUES
    ('Enfermedad');

INSERT INTO
    `trabajotfgerp`.`motivos_bajas` (`motivo_baja`)
VALUES
    ('Licencia por maternidad');

INSERT INTO
    `trabajotfgerp`.`motivos_bajas` (`motivo_baja`)
VALUES
    ('Licencia por paternidad');

INSERT INTO
    `trabajotfgerp`.`motivos_bajas` (`motivo_baja`)
VALUES
    ('Licencia por estudios');

-- ========================================
-- Tipos ayudas
-- ========================================
INSERT INTO
    `trabajotfgerp`.`tipos_ayudas` (`tipo_ayuda`)
VALUES
    ('Comida');

INSERT INTO
    `trabajotfgerp`.`tipos_ayudas` (`tipo_ayuda`)
VALUES
    ('Transporte');

INSERT INTO
    `trabajotfgerp`.`tipos_ayudas` (`tipo_ayuda`)
VALUES
    ('Guarderias');

-- ========================================
--  Personas
-- ========================================
-- Tipo persona 1 (Empleado)
INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Master', 'admin@example.com', 'Calle Administrativa 1', '12345678A', '1986-01-01', 'Masculino', 'Admin', '1', '34678901234', '1');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Gonzalez', 'diego.gonzalez@gmail.com', 'Calle Principal 123', '12345678H', '1990-12-12', 'Masculino', 'Diego', '2', '34671234567', '1');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Martinez', 'laura.martinez@yahoo.com', 'Avenida Central 456', '98765432R', '1985-05-05', 'Femenino', 'Laura', '3', '3467890123', '1');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Rodriguez', 'carlos.rodriguez@hotmail.com', 'Calle Secundaria 789', '13579246S', '1995-08-20', 'Masculino', 'Carlos', '4', '34671234568', '1');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Fernandez', 'ana.fernandez@gmail.com', 'Calle Residencial 101', '24681357K', '2000-03-15', 'Femenino', 'Ana', '5', '34672345679', '1');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Lopez', 'pablo.lopez@yahoo.com', 'Avenida Principal 567', '65432109H', '1987-11-10', 'Masculino', 'Pablo', '6', '34673456780', '1');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Sanchez', 'marina.sanchez@hotmail.com', 'Calle Central 123', '10987654R', '1992-09-25', 'Femenino', 'Marina', '7', '34674567891', '1');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Gomez', 'javier.gomez@gmail.com', 'Avenida Secundaria 456', '32109876S', '1983-07-18', 'Masculino', 'Javier', '8', '34675678902', '1');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Perez', 'sara.perez@yahoo.com', 'Calle Residencial 789', '76543210K', '1998-04-03', 'Femenino', 'Sara', '9', '34676789013', '1');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Hernandez', 'adrian.hernandez@gmail.com', 'Avenida Principal 101', '54321098H', '1980-12-29', 'Masculino', 'Adrian', '10', '34677890124', '1');

-- Tipo persona 2 (No empleado)
INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Vega', 'noemi.vega@yahoo.com', 'Calle Secundaria 202', '87654321J', '1994-06-08', 'Femenino', 'Noemí', '11', '34678901236', '2');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Ruiz', 'miguel.ruiz@hotmail.com', 'Avenida Central 303', '13579864Q', '1989-02-14', 'Masculino', 'Miguel', '12', '34671234569', '2');

-- Tipo persona 3 (Becario)
INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Cortes', 'elena.cortes@gmail.com', 'Calle Residencial 404', '24681357P', '1997-10-21', 'Femenino', 'Elena', '13', '34672345670', '3');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Fuentes', 'alejandro.fuentes@yahoo.com', 'Avenida Principal 505', '65432109X', '1991-05-16', 'Masculino', 'Alejandro', '14', '34673456781', '3');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Molina', 'isabel.molina@hotmail.com', 'Calle Secundaria 606', '10987654Y', '1986-03-05', 'Femenino', 'Isabel', '15', '34674567892', '3');

-- Tipo persona 4 (Ex empleado)
INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Ramos', 'jorge.ramos@gmail.com', 'Avenida Central 707', '32109876M', '1993-09-12', 'Masculino', 'Jorge', '16', '34675678903', '4');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Lara', 'carmen.lara@yahoo.com', 'Calle Residencial 808', '76543210N', '1981-07-18', 'Femenino', 'Carmen', '17', '34676789014', '4');

INSERT INTO
    `trabajotfgerp`.`personas` (`apellidos`, `correo_electronico`, `direccion`, `dni`, `fecha_nacimiento`, `genero`, `nombre`, `numero_empleado`, `numero_telefono`, `id_tipo_persona`)
VALUES
    ('Santos', 'raul.santos@gmail.com', 'Avenida Principal 909', '54321098L', '1996-04-03', 'Masculino', 'Raul', '18', '34677890125', '4');

-- ========================================
--  Usuarios
-- ========================================
-- Tipo usuario 1 (Administrador)
INSERT INTO
    `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`)
VALUES
    ('a', 'a', '1', '1');

INSERT INTO
    `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`)
VALUES
    ('admin1', 'adminpass1', '2', '1');

INSERT INTO
    `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`)
VALUES
    ('admin2', 'adminpass2', '5', '1');

INSERT INTO
    `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`)
VALUES
    ('admin3', 'adminpass3', '8', '1');

-- Tipo usuario 2 (Normal)
INSERT INTO
    `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`)
VALUES
    ('user1', 'userpass1', '3', '2');

INSERT INTO
    `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`)
VALUES
    ('user2', 'userpass2', '4', '2');

INSERT INTO
    `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`)
VALUES
    ('user3', 'userpass3', '6', '2');

INSERT INTO
    `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`)
VALUES
    ('user4', 'userpass4', '7', '2');

INSERT INTO
    `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`)
VALUES
    ('user5', 'userpass5', '9', '2');

-- Tipo usuario 3 (Recursos humanos)
INSERT INTO
    `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`)
VALUES
    ('rh1', 'rhpass1', '10', '3');

INSERT INTO
    `trabajotfgerp`.`usuarios` (`nombre_usuario`, `password`, `id_persona`, `id_tipo_usuario`)
VALUES
    ('rh2', 'rhpass2', '11', '3');

-- ========================================
--  Solicitudes empleados
-- ========================================
-- Persona 1
-- Bajas Laborales
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero', '2024-02-08', '1', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por enfermedad en marzo (Denegado)', '2024-03-18', '1', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por licencia por maternidad en abril', '2024-04-13', '1', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por estudios en mayo (Denegado)', '2024-05-03', '1', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero', '2024-02-23', '1', '2', '3');

-- Vacaciones Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para mayo.', '2024-04-25', '1', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para junio.', '2024-05-27', '1', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada.', '2024-06-27', '1', '3', '1');

-- Ayudas Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para febrero.', '2024-02-05', '1', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para marzo.', '2024-03-15', '1', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para abril.', '2024-04-10', '1', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para mayo.', '2024-04-30', '1', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para febrero.', '2024-02-20', '1', '2', '2');

-- Persona 2
-- Bajas Laborales
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero (Denegado)', '2024-02-13', '2', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por enfermedad en marzo', '2024-03-23', '2', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por licencia por maternidad en abril (Denegado)', '2024-04-08', '2', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por estudios en mayo', '2024-05-18', '2', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero', '2024-02-18', '2', '2', '3');

-- Vacaciones Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para mayo.', '2024-05-05', '2', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para junio.', '2024-06-05', '2', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada.', '2024-07-05', '2', '3', '1');

-- Ayudas Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para febrero.', '2024-02-10', '2', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para marzo.', '2024-03-20', '2', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para abril.', '2024-04-05', '2', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para mayo.', '2024-05-15', '2', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para febrero.', '2024-02-15', '2', '2', '2');

-- Persona 3 
-- Bajas Laborales
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero (Denegado)', '2024-02-26', '3', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por enfermedad en marzo', '2024-03-08', '3', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por licencia por maternidad en abril (Denegado)', '2024-04-16', '3', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por estudios en mayo', '2024-05-03', '3', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero', '2024-02-23', '3', '2', '3');

-- Vacaciones Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para mayo.', '2024-05-05', '3', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para junio.', '2024-06-05', '3', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada.', '2024-07-05', '3', '3', '1');

-- Ayudas Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para febrero.', '2024-02-25', '3', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para marzo.', '2024-03-05', '3', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para abril.', '2024-04-13', '3', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para mayo.', '2024-04-30', '3', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para febrero.', '2024-02-28', '3', '2', '2');

-- Persona 4 
-- Bajas Laborales
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero', '2024-02-08', '4', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por enfermedad en marzo (Denegado)', '2024-03-18', '4', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por licencia por maternidad en abril', '2024-04-13', '4', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por estudios en mayo (Denegado)', '2024-05-03', '4', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero', '2024-02-23', '4', '2', '3');

-- Vacaciones Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para mayo.', '2024-05-05', '4', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para junio.', '2024-06-05', '4', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada.', '2024-07-05', '4', '3', '1');

-- Ayudas Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para febrero.', '2024-02-05', '4', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para marzo.', '2024-03-15', '4', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para abril.', '2024-04-10', '4', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para mayo.', '2024-04-30', '4', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para febrero.', '2024-02-23', '4', '2', '2');

-- Persona 5 
-- Bajas Laborales
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero (Denegado)', '2024-02-16', '5', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por enfermedad en marzo', '2024-03-13', '5', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por licencia por maternidad en abril', '2024-04-03', '5', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por estudios en mayo (Denegado)', '2024-05-18', '5', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero', '2024-02-23', '5', '2', '3');

-- Vacaciones Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para mayo.', '2024-05-05', '5', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para junio.', '2024-06-05', '5', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada.', '2024-07-05', '5', '3', '1');

-- Ayudas Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para febrero.', '2024-02-15', '5', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para marzo.', '2024-03-10', '5', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para abril.', '2024-03-31', '5', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para mayo.', '2024-05-15', '5', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para febrero.', '2024-02-23', '5', '2', '2');

-- Persona 6 
-- Bajas Laborales
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero', '2024-02-18', '6', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por enfermedad en marzo (Denegado)', '2024-03-23', '6', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por licencia por maternidad en abril', '2024-04-08', '6', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por estudios en mayo', '2024-05-03', '6', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero (Denegado)', '2024-02-13', '6', '3', '3');

-- Vacaciones Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para mayo.', '2024-05-13', '6', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada.', '2024-06-13', '6', '3', '1');

-- Ayudas Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para febrero.', '2024-02-15', '6', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para marzo.', '2024-03-20', '6', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para abril.', '2024-04-05', '6', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para mayo.', '2024-04-30', '6', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para febrero.', '2024-02-13', '6', '3', '2');

-- Persona 7 
-- Bajas Laborales
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en marzo', '2024-03-08', '7', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por enfermedad en abril (Denegado)', '2024-04-16', '7', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por licencia por maternidad en mayo', '2024-05-13', '7', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por estudios en febrero', '2024-02-03', '7', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en abril (Denegado)', '2024-03-30', '7', '3', '3');

-- Vacaciones Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para mayo.', '2024-05-13', '7', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada.', '2024-06-13', '7', '3', '1');

-- Ayudas Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para marzo.', '2024-03-08', '7', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para abril.', '2024-04-13', '7', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para mayo.', '2024-05-10', '7', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para febrero.', '2024-02-03', '7', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para abril.', '2024-03-30', '7', '3', '2');

-- Persona 8 
-- Bajas Laborales
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en mayo', '2024-05-08', '8', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por enfermedad en febrero (Denegado)', '2024-02-16', '8', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por licencia por maternidad en marzo', '2024-03-03', '8', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por estudios en abril', '2024-04-18', '8', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en mayo (Denegado)', '2024-05-23', '8', '3', '3');

-- Vacaciones Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para junio.', '2024-05-30', '8', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para junio.', '2024-06-11', '8', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada.', '2024-06-27', '8', '3', '1');

-- Ayudas Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para mayo.', '2024-05-08', '8', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para febrero.', '2024-02-15', '8', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para marzo.', '2024-03-01', '8', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para abril.', '2024-04-15', '8', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para mayo.', '2024-05-20', '8', '3', '2');

-- Persona 9 
-- Bajas Laborales
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero', '2024-02-13', '9', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por enfermedad en marzo (Denegado)', '2024-03-18', '9', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por licencia por maternidad en abril', '2024-04-06', '9', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por estudios en mayo', '2024-04-30', '9', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en febrero (Denegado)', '2024-02-23', '9', '3', '3');

-- Vacaciones Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para julio.', '2024-06-29', '9', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para agosto.', '2024-08-05', '9', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada para septiembre.', '2024-08-27', '9', '3', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada para octubre.', '2024-10-05', '9', '3', '1');

-- Ayudas Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para febrero.', '2024-02-11', '9', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para marzo.', '2024-03-15', '9', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para abril.', '2024-03-30', '9', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para mayo.', '2024-04-27', '9', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para febrero.', '2024-02-22', '9', '3', '2');

-- Persona 10 
-- Bajas Laborales
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en marzo', '2024-02-29', '10', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por enfermedad en abril (Denegado)', '2024-04-11', '10', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por licencia por maternidad en mayo', '2024-05-08', '10', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por estudios en febrero', '2024-02-03', '10', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en abril (Denegado)', '2024-04-01', '10', '3', '3');

-- Vacaciones Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para mayo.', '2024-04-26', '10', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para junio.', '2024-06-05', '10', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada para julio.', '2024-06-26', '10', '3', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada para agosto.', '2024-08-03', '10', '3', '1');

-- Ayudas Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para marzo.', '2024-02-27', '10', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para abril.', '2024-04-10', '10', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para mayo.', '2024-04-05', '10', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para febrero.', '2024-01-31', '10', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para abril.', '2024-03-29', '10', '3', '2');

-- Persona 11 
-- Bajas Laborales
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en mayo', '2024-05-18', '11', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por enfermedad en febrero (Denegado)', '2024-02-16', '11', '3', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por licencia por maternidad en marzo', '2024-03-03', '11', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por estudios en abril', '2024-04-18', '11', '2', '3');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de baja por vacaciones en mayo (Denegado)', '2024-05-23', '11', '3', '3');

-- Vacaciones Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para mayo.', '2024-04-26', '11', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones aceptadas para junio.', '2024-06-08', '11', '2', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada para julio.', '2024-06-26', '11', '3', '1');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de vacaciones denegada para agosto.', '2024-08-03', '11', '3', '1');

-- Ayudas Empleados
INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para mayo.', '2024-05-15', '11', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para febrero.', '2024-02-13', '11', '3', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para marzo.', '2024-02-28', '11', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda aceptada para abril.', '2024-04-15', '11', '2', '2');

INSERT INTO
    `trabajotfgerp`.`solicitudes_empleados` (`comentarios`, `fecha_solicitud`, `id_persona`, `id_tipo_estado`, `id_tipo_solicitud`)
VALUES
    ('Solicitud de ayuda denegada para mayo.', '2024-05-18', '11', '3', '2');

-- ========================================
--  Asistencias Empleados
-- ========================================
-- Persona 1
INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada laboral con minutos y segundos.', '2024-05-01', '09:15:30', '18:45:20', '09:29:50', '1');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día productivo, incluyendo descanso.', '2024-06-05', '08:45:10', '17:20:45', '08:35:35', '1');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones y tareas asignadas.', '2024-07-10', '10:05:45', '18:58:30', '08:52:45', '1');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo con tareas asignadas.', '2024-08-15', '09:30:15', '18:15:40', '08:45:25', '1');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Proyectos y colaboración en equipo.', '2024-09-20', '08:55:30', '17:10:20', '08:14:50', '1');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Sesiones de planificación y desarrollo.', '2024-10-25', '10:10:05', '18:50:55', '08:40:50', '1');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada laboral con minutos y segundos.', '2024-11-01', '09:15:30', '18:45:20', '09:29:50', '1');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día productivo, incluyendo descanso.', '2024-12-05', '08:45:10', '17:20:45', '08:35:35', '1');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones y tareas asignadas.', '2025-01-10', '10:05:45', '18:58:30', '08:52:45', '1');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo con tareas asignadas.', '2025-02-15', '09:30:15', '18:15:40', '08:45:25', '1');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Proyectos y colaboración en equipo.', '2025-03-20', '08:55:30', '17:10:20', '08:14:50', '1');

-- Persona 2
INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada laboral con minutos y segundos.', '2024-02-16', '09:20:30', '18:40:20', '09:19:50', '2');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día productivo, incluyendo descanso.', '2024-03-21', '08:40:10', '17:25:45', '08:45:35', '2');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones y tareas asignadas.', '2024-04-26', '10:10:45', '18:53:30', '08:42:45', '2');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo con tareas asignadas.', '2024-03-01', '09:35:15', '18:20:40', '08:45:25', '2');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Proyectos y colaboración en equipo.', '2024-03-16', '09:00:30', '17:15:20', '08:14:50', '2');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Sesiones de planificación y desarrollo.', '2024-04-11', '10:15:05', '18:55:55', '08:40:50', '2');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada laboral con minutos y segundos.', '2024-02-13', '09:20:30', '18:40:20', '09:19:50', '2');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día productivo, incluyendo descanso.', '2024-03-19', '08:40:10', '17:25:45', '08:45:35', '2');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones y tareas asignadas.', '2024-04-24', '10:10:45', '18:53:30', '08:42:45', '2');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo con tareas asignadas.', '2024-03-01', '09:35:15', '18:20:40', '08:45:25', '2');

-- Persona 3
INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada laboral con minutos y segundos.', '2024-02-16', '09:20:30', '18:40:20', '09:19:50', '3');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día productivo, incluyendo descanso.', '2024-03-21', '08:40:10', '17:25:45', '08:45:35', '3');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones y tareas asignadas.', '2024-04-26', '10:10:45', '18:53:30', '08:42:45', '3');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo con tareas asignadas.', '2024-03-01', '09:35:15', '18:20:40', '08:45:25', '3');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Proyectos y colaboración en equipo.', '2024-03-16', '09:00:30', '17:15:20', '08:14:50', '3');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Sesiones de planificación y desarrollo.', '2024-04-11', '10:15:05', '18:55:55', '08:40:50', '3');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada laboral con minutos y segundos.', '2024-02-13', '09:20:30', '18:40:20', '09:19:50', '3');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día productivo, incluyendo descanso.', '2024-03-19', '08:40:10', '17:25:45', '08:45:35', '3');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones y tareas asignadas.', '2024-04-24', '10:10:45', '18:53:30', '08:42:45', '3');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo con tareas asignadas.', '2024-03-01', '09:35:15', '18:20:40', '08:45:25', '3');

-- Persona 4
INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Variación en minutos y segundos.', '2024-02-16', '09:25:45', '18:38:30', '09:12:45', '4');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día productivo con pequeños ajustes.', '2024-03-21', '08:42:00', '17:23:15', '08:41:15', '4');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones y tareas con cambios.', '2024-04-26', '10:12:30', '18:55:10', '08:42:40', '4');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo enfocado en proyectos con ajustes.', '2024-03-01', '09:36:45', '18:19:50', '08:43:05', '4');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración con el equipo con cambios.', '2024-03-11', '08:18:15', '17:32:30', '09:14:15', '4');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día completo de trabajo con modificaciones.', '2024-04-06', '10:02:45', '18:57:15', '08:54:30', '4');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Variación en horas y minutos.', '2024-02-21', '09:47:30', '18:35:20', '08:47:50', '4');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada con cambios en el tiempo.', '2024-03-16', '08:30:00', '17:45:45', '09:15:45', '4');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Ajustes en horas y minutos.', '2024-04-11', '10:05:20', '18:45:00', '08:39:40', '4');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Variaciones en horas y segundos.', '2024-02-26', '09:23:15', '18:40:45', '09:17:30', '4');

-- Persona 5
INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada laboral con cambios.', '2024-02-16', '09:19:45', '18:41:20', '09:21:35', '5');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día productivo con ajustes en minutos y segundos.', '2024-03-21', '08:39:30', '17:26:55', '08:47:25', '5');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones y tareas con modificaciones en el tiempo.', '2024-04-26', '10:09:15', '18:51:40', '08:42:25', '5');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo enfocado en proyectos con cambios.', '2024-03-01', '09:34:05', '18:21:30', '08:47:25', '5');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración con el equipo con ajustes en el tiempo.', '2024-03-11', '08:13:45', '17:31:10', '09:17:25', '5');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día completo de trabajo con variaciones.', '2024-04-06', '09:57:00', '18:59:30', '09:02:30', '5');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Variación en horas y minutos.', '2024-02-21', '09:43:30', '18:37:20', '08:53:50', '5');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada con cambios en el tiempo.', '2024-03-16', '08:27:15', '17:44:45', '09:17:30', '5');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Ajustes en horas y minutos.', '2024-04-11', '10:01:20', '18:46:00', '08:44:40', '5');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Variaciones en horas y segundos.', '2024-02-26', '09:21:15', '18:38:45', '09:17:30', '5');

-- Persona 6
INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Variación en minutos y segundos.', '2024-02-16', '09:35:45', '18:28:30', '08:52:45', '6');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día productivo con pequeños ajustes.', '2024-03-21', '08:50:00', '17:43:15', '08:53:15', '6');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones y tareas con cambios.', '2024-04-26', '10:20:30', '18:45:10', '08:24:40', '6');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo enfocado en proyectos con ajustes.', '2024-03-01', '09:45:45', '18:20:50', '08:35:05', '6');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración con el equipo con cambios.', '2024-03-11', '08:22:15', '17:37:30', '09:15:15', '6');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día completo de trabajo.', '2024-04-06', '09:55:00', '18:50:30', '08:55:30', '6');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Variación en horas y minutos.', '2024-02-21', '09:30:30', '18:25:20', '08:54:50', '6');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada con cambios en el tiempo.', '2024-03-16', '08:42:00', '17:54:45', '09:12:45', '6');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Ajustes en horas y minutos.', '2024-04-11', '10:10:20', '18:35:00', '08:24:40', '6');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Variaciones en horas y segundos.', '2024-02-26', '09:17:15', '18:28:45', '09:11:30', '6');

-- Persona 7
INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Tareas administrativas y reuniones.', '2024-02-26', '09:50:30', '18:35:50', '08:45:20', '7');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración con el equipo de desarrollo.', '2024-03-11', '08:30:45', '17:45:10', '09:14:25', '7');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día completo de programación.', '2024-04-06', '10:15:00', '19:15:30', '09:00:30', '7');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Resolución de incidencias y soporte técnico.', '2024-02-21', '09:55:00', '18:20:40', '08:25:40', '7');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Entrenamiento del personal nuevo.', '2024-03-06', '08:40:20', '17:30:55', '08:50:35', '7');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Revisión de proyectos y planificación.', '2024-04-16', '10:10:45', '18:53:15', '08:42:30', '7');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo enfocado en proyectos de marketing.', '2024-03-01', '09:35:15', '18:21:00', '08:45:45', '7');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración con el departamento de recursos humanos.', '2024-03-21', '08:15:30', '17:45:45', '09:30:15', '7');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día completo de gestión de proyectos.', '2024-04-26', '10:00:00', '19:00:00', '09:00:00', '7');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones con el equipo de ventas.', '2024-02-11', '09:45:20', '18:35:55', '08:50:35', '7');

-- Persona 8
INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Tareas administrativas y reuniones.', '2024-02-26', '09:50:30', '18:35:50', '08:45:20', '8');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración con el equipo de desarrollo.', '2024-03-11', '08:30:45', '17:45:10', '09:14:25', '8');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día completo de programación.', '2024-04-06', '10:15:00', '19:15:30', '09:00:30', '8');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Resolución de incidencias y soporte técnico.', '2024-02-21', '09:55:00', '18:20:40', '08:25:40', '8');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Entrenamiento del personal nuevo.', '2024-03-06', '08:40:20', '17:30:55', '08:50:35', '8');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Revisión de proyectos y planificación.', '2024-04-16', '10:10:45', '18:53:15', '08:42:30', '8');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo enfocado en proyectos de marketing.', '2024-03-01', '09:35:15', '18:21:00', '08:45:45', '8');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración con el departamento de recursos humanos.', '2024-03-21', '08:15:30', '17:45:45', '09:30:15', '8');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día completo de gestión de proyectos.', '2024-04-26', '10:00:00', '19:00:00', '09:00:00', '8');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones con el equipo de ventas.', '2024-02-11', '09:45:20', '18:35:55', '08:50:35', '8');

-- Persona 9
INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada productiva con reuniones.', '2024-03-15', '09:30:00', '18:45:30', '09:15:30', '9');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo en equipo y resolución de problemas.', '2024-04-10', '08:45:20', '17:30:45', '08:45:25', '9');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración en proyectos de desarrollo.', '2024-02-20', '10:00:45', '19:15:10', '09:14:25', '9');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Revisión de informes y preparación de presentaciones.', '2024-03-05', '09:20:10', '18:53:45', '09:33:35', '9');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día centrado en proyectos de innovación.', '2024-04-15', '10:40:35', '19:25:00', '08:44:25', '9');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones estratégicas y planificación.', '2024-02-29', '09:55:50', '18:20:15', '08:24:25', '9');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración con el equipo de recursos humanos.', '2024-03-20', '08:35:15', '17:45:40', '09:10:25', '9');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Gestión de proyectos y evaluación de resultados.', '2024-04-25', '10:10:40', '19:00:05', '08:49:25', '9');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Entrenamiento y desarrollo de habilidades.', '2024-02-10', '09:45:05', '18:35:30', '08:50:25', '9');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada enfocada en proyectos de mejora.', '2024-03-15', '09:30:30', '18:45:55', '09:15:25', '9');

-- Persona 10
INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Tareas administrativas y reuniones.', '2024-02-25', '09:50:30', '18:35:50', '08:45:20', '10');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración con el equipo de desarrollo.', '2024-03-10', '08:30:45', '17:45:10', '09:14:25', '10');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día completo de programación.', '2024-04-05', '10:15:00', '19:15:30', '09:00:30', '10');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Resolución de incidencias y soporte técnico.', '2024-02-20', '09:55:00', '18:20:40', '08:25:40', '10');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Entrenamiento del personal nuevo.', '2024-03-05', '08:40:20', '17:30:55', '08:50:35', '10');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Revisión de proyectos y planificación.', '2024-04-15', '10:10:45', '18:53:15', '08:42:30', '10');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo enfocado en proyectos de marketing.', '2024-02-29', '09:35:15', '18:21:00', '08:45:45', '10');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración con el departamento de recursos humanos.', '2024-03-20', '08:15:30', '17:45:45', '09:30:15', '10');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día completo de gestión de proyectos.', '2024-04-25', '10:00:00', '19:00:00', '09:00:00', '10');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones con el equipo de ventas.', '2024-02-10', '09:45:20', '18:35:55', '08:50:35', '10');

-- Persona 11
INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada productiva con reuniones.', '2024-02-25', '09:30:00', '18:45:30', '09:15:30', '11');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Trabajo en equipo y resolución de problemas.', '2024-04-10', '08:45:20', '17:30:45', '08:45:25', '11');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración en proyectos de desarrollo.', '2024-02-20', '10:00:45', '19:15:10', '09:14:25', '11');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Revisión de informes y preparación de presentaciones.', '2024-03-05', '09:20:10', '18:53:45', '09:33:35', '11');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Día centrado en proyectos de innovación.', '2024-04-15', '10:40:35', '19:25:00', '08:44:25', '11');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Reuniones estratégicas y planificación.', '2024-02-29', '09:55:50', '18:20:15', '08:24:25', '11');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Colaboración con el equipo de recursos humanos.', '2024-03-20', '08:35:15', '17:45:40', '09:10:25', '11');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Gestión de proyectos y evaluación de resultados.', '2024-04-25', '10:10:40', '19:00:05', '08:49:25', '11');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Entrenamiento y desarrollo de habilidades.', '2024-02-10', '09:45:05', '18:35:30', '08:50:25', '11');

INSERT INTO
    `trabajotfgerp`.`asistencias_empleados` (`comentarios`, `fecha`, `hora_entrada`, `hora_salida`, `total_horas_trabajadas`, `id_persona`)
VALUES
    ('Jornada enfocada en proyectos de mejora.', '2024-03-15', '09:30:30', '18:45:55', '09:15:25', '11');

-- ========================================
--  Ayudas Empleados
-- ========================================
-- Persona 1 
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-02-10', '2024-01-10', '800', '1', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-03-10', '2024-02-10', '1200', '1', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-04-10', '2024-03-10', '1000', '1', '3', '3', 'Ayuda rechazada para guarderías por exceder el presupuesto asignado.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-05-10', '2024-04-10', '1500', '1', '2', '3', 'Ayuda rechazada para transporte por exceder el presupuesto asignado.');

-- Persona 2 
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-02-10', '2024-01-10', '800', '2', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-03-10', '2024-02-10', '1200', '2', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-04-10', '2024-03-10', '1000', '2', '3', '3', 'Ayuda rechazada para guarderías por exceder el presupuesto asignado.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-05-10', '2024-04-10', '1500', '2', '2', '3', 'Ayuda rechazada para transporte por exceder el presupuesto asignado.');

-- Persona 3 
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-02-10', '2024-01-10', '800', '3', '3', '2', 'Ayuda aceptada para guarderías.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-03-10', '2024-02-10', '1200', '3', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-04-10', '2024-03-10', '1000', '3', '1', '3', 'Ayuda rechazada para comidas por exceder el presupuesto asignado.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-05-10', '2024-04-10', '1500', '3', '2', '3', 'Ayuda rechazada para transporte por exceder el presupuesto asignado.');

-- Persona 4 
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-02-15', '2024-01-15', '900', '4', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-03-20', '2024-02-20', '1200', '4', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-04-25', '2024-03-25', '800', '4', '3', '2', 'Ayuda aceptada para cubrir gastos de guarderías.');

-- Persona 5 
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-02-20', '2024-01-20', '1000', '5', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-03-25', '2024-02-25', '850', '5', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-04-30', '2024-03-30', '1100', '5', '3', '2', 'Ayuda aceptada para cubrir gastos de transporte.');

-- Persona 6 
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-02-25', '2024-01-25', '1200', '6', '3', '2', 'Ayuda aceptada para cubrir gastos de comidas.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-04-01', '2024-03-01', '950', '6', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-05-05', '2024-04-05', '1050', '6', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');

-- Persona 7 
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-03-01', '2024-02-01', '950', '7', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-04-06', '2024-03-06', '1100', '7', '3', '2', 'Ayuda aceptada para cubrir gastos de guarderías.');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-05-11', '2024-04-11', '1200', '7', '1', '3', 'Ayuda denegada por exceder el presupuesto asignado.');

-- Persona 8 
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-03-06', '2024-02-06', '1050', '8', '3', '2', 'Ayuda aceptada para cubrir gastos de guarderías.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-04-11', '2024-03-11', '1000', '8', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-05-16', '2024-04-16', '850', '8', '2', '3', 'Ayuda denegada por falta de documentación.');

-- Persona 9 
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-03-11', '2024-02-11', '900', '9', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-04-16', '2024-03-16', '950', '9', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-05-21', '2024-04-21', '1100', '9', '3', '3', 'Ayuda denegada por falta de justificación.');

-- Persona 10 
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-02-01', '2024-01-01', '1000', '10', '2', '2', 'Ayuda aceptada para cubrir gastos de transporte.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-03-06', '2024-02-06', '850', '10', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-04-11', '2024-03-11', '1200', '10', '3', '3', 'Ayuda denegada por exceder el presupuesto asignado.');

-- Persona 11 
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-02-06', '2024-01-06', '950', '11', '3', '2', 'Ayuda aceptada para cubrir gastos de guarderías.');

INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-03-11', '2024-02-11', '1000', '11', '2', '3', 'Ayuda denegada por falta de documentación.');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`ayudas_empleados` (`fecha_fin`, `fecha_inicio`, `valor_asociado`, `id_persona`, `id_tipo_ayuda`, `id_tipo_estado`, `comentarios`)
VALUES
    ('2024-04-16', '2024-03-16', '1100', '11', '1', '2', 'Ayuda aceptada para cubrir gastos de comidas.');

-- ========================================
--  Bajas Laborales Empleados
-- ========================================
-- Persona 1
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-12', '2024-02-10', '1', '1', '2');

-- Baja por vacaciones en febrero
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-18', '2024-04-15', '3', '1', '2');

-- Baja por licencia por maternidad en abril
-- Denegadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-03-23', '2024-03-20', '2', '1', '3');

-- Baja por enfermedad en marzo (Denegada)
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-05-07', '2024-05-05', '5', '1', '3');

-- Baja por estudios en mayo (Denegada)
-- Persona 2
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-03-28', '2024-03-25', '2', '2', '2');

-- Baja por enfermedad en marzo
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-05-23', '2024-05-20', '5', '2', '2');

-- Baja por estudios en mayo
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-23', '2024-02-20', '1', '2', '2');

-- Baja por vacaciones en febrero
-- Denegadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-18', '2024-02-15', '1', '2', '3');

-- Baja por vacaciones en febrero (Denegada)
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-13', '2024-04-10', '3', '2', '3');

-- Baja por licencia por maternidad en abril (Denegada)
-- Persona 3
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-03-13', '2024-03-10', '2', '3', '2');

-- Baja por enfermedad en marzo
-- Denegadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-03-02', '2024-02-28', '1', '3', '3');

-- Baja por vacaciones en febrero (Denegada)
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-21', '2024-04-18', '3', '3', '3');

-- Baja por licencia por maternidad en abril (Denegada)
-- Persona 4
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-12', '2024-02-10', '1', '4', '2');

-- Baja por vacaciones en febrero
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-18', '2024-04-15', '3', '4', '2');

-- Baja por licencia por maternidad en abril
-- Denegadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-03-23', '2024-03-20', '2', '4', '3');

-- Baja por enfermedad en marzo (Denegada)
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-05-07', '2024-05-05', '5', '4', '3');

-- Baja por estudios en mayo (Denegada)
-- Persona 5
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-21', '2024-02-18', '1', '5', '2');

-- Baja por vacaciones en febrero
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-03-18', '2024-03-15', '2', '5', '2');

-- Baja por enfermedad en marzo
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-08', '2024-04-05', '3', '5', '2');

-- Baja por licencia por maternidad en abril
-- Denegadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-05-23', '2024-05-20', '5', '5', '3');

-- Baja por estudios en mayo (Denegada)
-- Persona 6
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-23', '2024-02-20', '1', '6', '2');

-- Baja por vacaciones en febrero
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-13', '2024-04-10', '3', '6', '2');

-- Baja por licencia por maternidad en abril
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-05-08', '2024-05-05', '5', '6', '2');

-- Baja por estudios en mayo
-- Denegadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-28', '2024-02-25', '1', '6', '3');

-- Baja por vacaciones en febrero (Denegada)
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-03-28', '2024-03-25', '2', '6', '3');

-- Baja por enfermedad en marzo (Denegada)
-- Persona 7
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-03-13', '2024-03-10', '1', '7', '2');

-- Baja por vacaciones en marzo
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-05-18', '2024-05-15', '3', '7', '2');

-- Baja por licencia por maternidad en mayo
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-08', '2024-02-05', '5', '7', '2');

-- Baja por estudios en febrero
-- Denegadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-21', '2024-04-18', '2', '7', '3');

-- Baja por enfermedad en abril (Denegada)
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-06', '2024-04-03', '1', '7', '3');

-- Baja por vacaciones en abril (Denegada)
-- Persona 8
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-05-13', '2024-05-10', '1', '8', '2');

-- Baja por vacaciones en mayo
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-03-08', '2024-03-05', '3', '8', '2');

-- Baja por licencia por maternidad en marzo
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-23', '2024-04-20', '5', '8', '2');

-- Baja por estudios en abril
-- Denegadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-21', '2024-02-18', '2', '8', '3');

-- Baja por enfermedad en febrero (Denegada)
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-05-28', '2024-05-25', '1', '8', '3');

-- Baja por vacaciones en mayo (Denegada)
-- Persona 9
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-18', '2024-02-15', '1', '9', '2');

-- Baja por vacaciones en febrero
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-11', '2024-04-08', '3', '9', '2');

-- Baja por licencia por maternidad en abril
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-05-05', '2024-05-02', '5', '9', '2');

-- Baja por estudios en mayo
-- Denegadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-28', '2024-02-25', '1', '9', '3');

-- Baja por vacaciones en febrero (Denegada)
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-03-23', '2024-03-20', '2', '9', '3');

-- Baja por enfermedad en marzo (Denegada)
-- Persona 10
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-03-05', '2024-03-02', '1', '10', '2');

-- Baja por vacaciones en marzo
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-05-13', '2024-05-10', '3', '10', '2');

-- Baja por licencia por maternidad en mayo
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-08', '2024-02-05', '5', '10', '2');

-- Baja por estudios en febrero
-- Denegadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-18', '2024-04-15', '2', '10', '3');

-- Baja por enfermedad en abril (Denegada)
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-06', '2024-04-03', '1', '10', '3');

-- Baja por vacaciones en abril (Denegada)
-- Persona 11
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-05-23', '2024-05-20', '1', '11', '2');

-- Baja por vacaciones en mayo
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-03-08', '2024-03-05', '3', '11', '2');

-- Baja por licencia por maternidad en marzo
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-04-23', '2024-04-20', '5', '11', '2');

-- Baja por estudios en abril
-- Denegadas
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-02-21', '2024-02-18', '2', '11', '3');

-- Baja por enfermedad en febrero (Denegada)
INSERT INTO
    `trabajotfgerp`.`bajas_laborales_empleados` (`fecha_fin`, `fecha_inicio`, `id_motivo_baja`, `id_persona`, `id_tipo_estado`)
VALUES
    ('2024-05-28', '2024-05-25', '1', '11', '3');

-- Baja por vacaciones en mayo (Denegada)
-- ========================================
--  Vacaciones empleados
-- ========================================
-- Persona 1
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para mayo.', '5', '25', '5', '2024-05-05', '2024-05-01', '1', '2');

INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para junio.', '5', '20', '5', '2024-06-05', '2024-06-01', '1', '2');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Solicitud de vacaciones denegada.', '0', '20', '5', '2024-07-05', '2024-07-01', '1', '3');

-- Persona 2
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para mayo.', '5', '25', '5', '2024-05-15', '2024-05-10', '2', '2');

INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para junio.', '5', '20', '5', '2024-06-15', '2024-06-10', '2', '2');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Solicitud de vacaciones denegada.', '0', '20', '5', '2024-07-15', '2024-07-10', '2', '3');

-- Persona 3
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para mayo.', '5', '25', '5', '2024-05-15', '2024-05-10', '3', '2');

INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para junio.', '5', '20', '5', '2024-06-15', '2024-06-10', '3', '2');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Solicitud de vacaciones denegada.', '0', '20', '5', '2024-07-15', '2024-07-10', '3', '3');

-- Persona 4
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para mayo.', '5', '25', '5', '2024-05-15', '2024-05-10', '4', '2');

INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para junio.', '5', '20', '5', '2024-06-15', '2024-06-10', '4', '2');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Solicitud de vacaciones denegada.', '0', '20', '5', '2024-07-15', '2024-07-10', '4', '3');

-- Persona 5
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para mayo.', '5', '25', '5', '2024-05-15', '2024-05-10', '5', '2');

INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para junio.', '5', '20', '5', '2024-06-15', '2024-06-10', '5', '2');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Solicitud de vacaciones denegada.', '0', '20', '5', '2024-07-15', '2024-07-10', '5', '3');

-- Persona 6
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para mayo.', '5', '20', '5', '2024-05-20', '2024-05-15', '6', '2');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Solicitud de vacaciones denegada.', '0', '20', '5', '2024-06-20', '2024-06-15', '6', '3');

-- Persona 7
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para mayo.', '5', '20', '5', '2024-05-20', '2024-05-15', '7', '2');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Solicitud de vacaciones denegada.', '0', '20', '5', '2024-06-20', '2024-06-15', '7', '3');

-- Persona 8
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aprobadas.', '0', '25', '5', '2024-06-05', '2024-06-01', '8', '2');

INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aprobadas.', '0', '21', '4', '2024-06-18', '2024-06-15', '8', '2');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones denegadas.', '0', '21', '5', '2024-07-05', '2024-07-01', '8', '3');

-- Vacaciones Persona 9
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para julio.', '0', '16', '5', '2024-07-05', '2024-07-01', '9', '2');

INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para agosto.', '0', '11', '5', '2024-08-14', '2024-08-10', '9', '2');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones denegadas para septiembre.', '0', '16', '5', '2024-09-05', '2024-09-01', '9', '3');

INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones denegadas para octubre.', '0', '11', '5', '2024-10-14', '2024-10-10', '9', '3');

-- Persona 10
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para mayo.', '0', '15', '5', '2024-05-05', '2024-05-01', '10', '2');

INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para junio.', '0', '10', '5', '2024-06-14', '2024-06-10', '10', '2');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones denegadas para julio.', '0', '15', '5', '2024-07-05', '2024-07-01', '10', '3');

INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones denegadas para agosto.', '0', '10', '5', '2024-08-14', '2024-08-10', '10', '3');

-- Vacaciones Persona 11
-- Aceptadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para mayo.', '0', '15', '5', '2024-05-05', '2024-05-01', '11', '2');

INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones aceptadas para junio.', '0', '10', '5', '2024-06-19', '2024-06-15', '11', '2');

-- Denegadas
INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones denegadas para julio.', '0', '15', '5', '2024-07-05', '2024-07-01', '11', '3');

INSERT INTO
    `trabajotfgerp`.`vacaciones_empleados` (`comentarios`, `dias_disfrutados`, `dias_restantes`, `dias_solicitados`, `fecha_fin`, `fecha_inicio`, `id_persona`, `id_tipo_estado`)
VALUES
    ('Vacaciones denegadas para agosto.', '0', '10', '5', '2024-08-14', '2024-08-10', '11', '3');

-- ========================================
--  Clientes
-- ========================================
-- Personas fisicas
INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28013', 'elena.rodriguez@gmail.com', 'Calle Gran Vía 123', '12345678A', 'Elena Rodriguez', '2222222', 'MADRID', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28009', 'carlos.sanchez@hotmail.com', 'Calle Alcalá 456', '87654321B', 'Carlos Sanchez', '34612345678', 'MADRID', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28008', 'laura.fernandez@yahoo.es', 'Calle Princesa 789', '23456789C', 'Laura Fernandez', '34623456789', 'MADRID', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28013', 'david.lopez@outlook.es', 'Calle Mayor 101', '34567890D', 'David Lopez', '34634567890', 'MADRID', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28004', 'ana.martinez@gmail.com', 'Calle Fuencarral 202', '45678901E', 'Ana Martinez', '34645678901', 'MADRID', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28006', 'javier.gomez@hotmail.com', 'Calle Serrano 303', '56789012F', 'Javier Gomez', '34656789012', 'MADRID', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28013', 'sofia.navarro@yahoo.es', 'Calle Gran Vía 404', '67890123G', 'Sofia Navarro', '34667890123', 'MADRID', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28014', 'miguel.fernandez@outlook.es', 'Calle Prado 505', '78901234H', 'Miguel Fernandez', '34678901234', 'MADRID', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28012', 'isabel.rodriguez@gmail.com', 'Calle Atocha 606', '89012345I', 'Isabel Rodriguez', '34689012345', 'MADRID', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28001', 'alejandro.lopez@hotmail.com', 'Calle Goya 707', '90123456J', 'Alejandro Lopez', '34690123456', 'MADRID', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('ZARAGOZA', '50003', 'david.lopez@outlook.es', 'Calle Gran Vía 101', '34567890D', 'David Lopez', '34634567890', 'ZARAGOZA', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MALAGA', '29004', 'ana.martinez@gmail.com', 'Calle Alameda 202', '45678901E', 'Ana Martinez', '34645678901', 'MALAGA', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('BARCELONA', '08001', 'javier.gomez@hotmail.com', 'Avenida Diagonal 303', '56789012F', 'Javier Gomez', '34656789012', 'BARCELONA', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('A CORUÑA', '15001', 'sofia.navarro@yahoo.es', 'Calle del Mar 404', '67890123G', 'Sofia Navarro', '34667890123', 'A CORUÑA', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('OVIEDO', '33001', 'miguel.fernandez@outlook.es', 'Calle de la Plata 505', '78901234H', 'Miguel Fernandez', '34678901234', 'ASTURIAS', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('SEVILLA', '41002', 'isabel.rodriguez@gmail.com', 'Calle Mayor 606', '89012345I', 'Isabel Rodriguez', '34689012345', 'SEVILLA', null);

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('VALENCIA', '46001', 'alejandro.lopez@hotmail.com', 'Avenida de la Paz 707', '90123456J', 'Alejandro Lopez', '34690123456', 'VALENCIA', null);

-- Personas juridicas
INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28013', 'soporte@tecno-byte.es', 'Calle Gran Vía 123', 'A1234567B', null, '34676543210', 'MADRID', 'TecnoByte Solutions S.L.');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('SEVILLA', '41004', 'soporte@innova-sys.es', 'Avenida de la Constitución 456', 'C9876543D', null, '34681234567', 'SEVILLA', 'InnovaSys Tech Group');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('VALENCIA', '46002', 'soporte@microfutura-informatics.es', 'Calle de la Paz 789', 'H2468024J', null, '34687654321', 'VALENCIA', 'MicroFutura Informatics');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('ZARAGOZA', '50003', 'soporte@datavanguard.es', 'Calle Alfonso 101', 'S1357924T', null, '34698765432', 'ZARAGOZA', 'DataVanguard Solutions');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MALAGA', '29016', 'soporte@bytelink-microsystems.es', 'Calle Larios 202', 'U9876543V', null, '34676543210', 'MALAGA', 'ByteLink Microsystems');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('BARCELONA', '08008', 'soporte@infranet-innovations.es', 'Passeig de Gràcia 303', 'W8765432X', null, '34681234567', 'BARCELONA', 'InfraNet Innovations S.A.');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('A CORUÑA', '15001', 'soporte@cloudsphere-tech.es', 'Calle Real 404', 'N2345678P', null, '34687654321', 'A CORUÑA', 'CloudSphere Tech Services');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('OVIEDO', '33003', 'soporte@ecodata-informatica.es', 'Calle Uria 505', 'M9876543N', null, '34698765432', 'ASTURIAS', 'EcoData Informática Integral');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28001', 'soporte@sysharbor-solutions.es', 'Calle Serrano 606', 'R3456789S', null, '34676543210', 'MADRID', 'SysHarbor Solutions España');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('SEVILLA', '41011', 'soporte@gestionmicro-empresarial.es', 'Avenida de la Palmera 707', 'V9876543W', null, '34681234567', 'SEVILLA', 'GestiónMicro Informática Empresarial');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28014', 'soporte@microsys-solutions.es', 'Calle Gran Via 456', 'G9876543H', null, '34676543211', 'MADRID', 'MicroSys Solutions España');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('SEVILLA', '41005', 'soporte@infrasoft-iberia.es', 'Avenida de la Constitucion 567', 'L2468024M', null, '34681234568', 'SEVILLA', 'InfraSoft Innovations Iberia');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('VALENCIA', '46004', 'soporte@bytemaster-servicios.es', 'Calle de la Paz 678', 'Q1357924R', null, '34687654322', 'VALENCIA', 'ByteMaster ERP Servicios S.L.');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('ZARAGOZA', '50005', 'soporte@microgestion-tech.es', 'Calle Alfonso 789', 'X1357924Y', null, '34698765433', 'ZARAGOZA', 'MicroGestión Tech España');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MALAGA', '29017', 'soporte@redcode-solutions.es', 'Calle Larios 890', 'I9876543J', null, '34676543212', 'MALAGA', 'RedCode Solutions Ibérica');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('BARCELONA', '08009', 'soporte@datacrafting.es', 'Passeig de Gracia 123', 'B8765432C', null, '34681234569', 'BARCELONA', 'DataCrafting Systems España');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('A CORUÑA', '15003', 'soporte@cloudlogic-microservices.es', 'Calle Real 234', 'F2345678G', null, '34687654323', 'A CORUÑA', 'CloudLogic Microservices S.A.');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('OVIEDO', '33004', 'soporte@techharbor-soluciones.es', 'Calle Uria 345', 'O9876543P', null, '34698765434', 'ASTURIAS', 'TechHarbor ERP Soluciones Spain');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('MADRID', '28002', 'soporte@nanoinnovate.es', 'Calle Serrano 456', 'Z3456789A', null, '34676543213', 'MADRID', 'NanoInnovate Informatics España');

INSERT INTO
    `trabajotfgerp`.`clientes` (`ciudad`, `codigo_postal`, `correo_electronico`, `direccion`, `nif`, `nombre_apellidos`, `numero_telefono`, `provincia`, `razon_social`)
VALUES
    ('SEVILLA', '41006', 'soporte@infrawave-iberica.es', 'Avenida de la Palmera 567', 'T9876543U', null, '34681234570', 'SEVILLA', 'InfraWave Microsystems Ibérica');