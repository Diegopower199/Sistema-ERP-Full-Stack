USE trabajotfgerp;

-- ========================================
-- Permisos Usuarios
-- ========================================
CREATE TABLE `permisos_usuarios` (
  `id_permiso_usuario` int NOT NULL AUTO_INCREMENT,
  `actualizar_asistencias` tinyint(1) NOT NULL DEFAULT '0',
  `actualizar_ayudas` tinyint(1) NOT NULL DEFAULT '0',
  `actualizar_bajas_laborales` tinyint(1) NOT NULL DEFAULT '0',
  `actualizar_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `actualizar_detalles_facturas` tinyint(1) NOT NULL DEFAULT '0',
  `actualizar_facturas` tinyint(1) NOT NULL DEFAULT '0',
  `actualizar_nominas` tinyint(1) NOT NULL DEFAULT '0',
  `actualizar_pagos_facturas_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `actualizar_pedidos_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `actualizar_personas` tinyint(1) NOT NULL DEFAULT '0',
  `actualizar_solicitudes` tinyint(1) NOT NULL DEFAULT '0',
  `actualizar_usuarios` tinyint(1) NOT NULL DEFAULT '0',
  `actualizar_vacaciones` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_asistencias` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_ayudas` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_bajas_laborales` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_detalles_facturas` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_facturas` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_nominas` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_pagos_facturas_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_pedidos_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_personas` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_solicitudes` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_usuarios` tinyint(1) NOT NULL DEFAULT '0',
  `borrar_vacaciones` tinyint(1) NOT NULL DEFAULT '0',
  `crear_asistencias` tinyint(1) NOT NULL DEFAULT '0',
  `crear_ayudas` tinyint(1) NOT NULL DEFAULT '0',
  `crear_bajas_laborales` tinyint(1) NOT NULL DEFAULT '0',
  `crear_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `crear_detalles_facturas` tinyint(1) NOT NULL DEFAULT '0',
  `crear_facturas` tinyint(1) NOT NULL DEFAULT '0',
  `crear_nominas` tinyint(1) NOT NULL DEFAULT '0',
  `crear_pagos_facturas_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `crear_pedidos_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `crear_personas` tinyint(1) NOT NULL DEFAULT '0',
  `crear_solicitudes` tinyint(1) NOT NULL DEFAULT '0',
  `crear_usuarios` tinyint(1) NOT NULL DEFAULT '0',
  `crear_vacaciones` tinyint(1) NOT NULL DEFAULT '0',
  `ver_asistencias` tinyint(1) NOT NULL DEFAULT '0',
  `ver_ayudas` tinyint(1) NOT NULL DEFAULT '0',
  `ver_bajas_laborales` tinyint(1) NOT NULL DEFAULT '0',
  `ver_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `ver_detalles_facturas` tinyint(1) NOT NULL DEFAULT '0',
  `ver_facturas` tinyint(1) NOT NULL DEFAULT '0',
  `ver_nominas` tinyint(1) NOT NULL DEFAULT '0',
  `ver_pagos_facturas_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `ver_pedidos_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `ver_personas` tinyint(1) NOT NULL DEFAULT '0',
  `ver_section_clientes` tinyint(1) NOT NULL DEFAULT '0',
  `ver_section_facturacion` tinyint(1) NOT NULL DEFAULT '0',
  `ver_section_recursos_humanos` tinyint(1) NOT NULL DEFAULT '0',
  `ver_solicitudes` tinyint(1) NOT NULL DEFAULT '0',
  `ver_usuarios` tinyint(1) NOT NULL DEFAULT '0',
  `ver_vacaciones` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_permiso_usuario`)
);



-- ========================================
-- Tipos estados facturas
-- ========================================
CREATE TABLE `tipos_estados_facturas` (
  `id_tipo_estado_factura` int NOT NULL AUTO_INCREMENT,
  `tipo_estado_factura` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_estado_factura`),
  UNIQUE KEY `UK_tipo_estado_factura` (`tipo_estado_factura`)
);



-- ========================================
-- Tipos estados
-- ========================================
CREATE TABLE `tipos_estados` (
  `id_tipo_estado` int NOT NULL AUTO_INCREMENT,
  `tipo_estado` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_estado`),
  UNIQUE KEY `UK_tipo_estado` (`tipo_estado`)
);



-- ========================================
-- Tipos usuarios
-- ========================================
CREATE TABLE `tipos_usuarios` (
  `id_tipo_usuario` int NOT NULL AUTO_INCREMENT,
  `tipo_usuario` varchar(255) NOT NULL,
  `id_permiso_usuario` int NOT NULL,
  PRIMARY KEY (`id_tipo_usuario`),
  UNIQUE KEY `UK_tipo_usuario` (`tipo_usuario`),
  UNIQUE KEY `UK_mg9jyr0sdb2fnx4adp9mo74j4` (`id_permiso_usuario`),
  CONSTRAINT `FK_tipos_usuarios_permisos_usuarios` FOREIGN KEY (`id_permiso_usuario`) REFERENCES `permisos_usuarios` (`id_permiso_usuario`)
);



-- ========================================
-- Tipos personas
-- ========================================
CREATE TABLE `tipos_personas` (
  `id_tipo_persona` int NOT NULL AUTO_INCREMENT,
  `tipo_persona` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_persona`),
  UNIQUE KEY `UK_tipo_persona` (`tipo_persona`)
);



-- ========================================
-- Tipos solicitudes
-- ========================================
CREATE TABLE `tipos_solicitudes` (
  `id_tipo_solicitud` int NOT NULL AUTO_INCREMENT,
  `tipo_solicitud` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_solicitud`),
  UNIQUE KEY `UK_tipo_solicitud` (`tipo_solicitud`)
);



-- ========================================
-- Motivos bajas
-- ========================================
CREATE TABLE `motivos_bajas` (
  `id_motivo_baja` int NOT NULL AUTO_INCREMENT,
  `motivo_baja` varchar(255) NOT NULL,
  PRIMARY KEY (`id_motivo_baja`),
  UNIQUE KEY `UK_motivo_baja` (`motivo_baja`)
);



-- ========================================
-- Tipos ayudas
-- ========================================
CREATE TABLE `tipos_ayudas` (
  `id_tipo_ayuda` int NOT NULL AUTO_INCREMENT,
  `tipo_ayuda` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_ayuda`),
  UNIQUE KEY `UK_tipo_ayuda` (`tipo_ayuda`)
);



-- ========================================
--  Personas
-- ========================================
CREATE TABLE `personas` (
  `id_persona` int NOT NULL AUTO_INCREMENT,
  `apellidos` varchar(255) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
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



-- ========================================
--  Usuarios
-- ========================================
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



-- ========================================
--  Solicitudes empleados
-- ========================================
CREATE TABLE `solicitudes_empleados` (
  `id_solicitud_empleado` int NOT NULL AUTO_INCREMENT,
  `fecha_solicitud` date NOT NULL,
  `observacion` varchar(255) DEFAULT NULL,
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



-- ========================================
--  Asistencias Empleados
-- ========================================
CREATE TABLE `asistencias_empleados` (
  `id_asistencia_empleado` int NOT NULL AUTO_INCREMENT,
  `fecha_asistencia` date NOT NULL,
  `hora_entrada` time(6) NOT NULL,
  `hora_salida` time(6) DEFAULT NULL,
  `horas_trabajadas_dia` time(6) DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `id_persona` int NOT NULL,
  PRIMARY KEY (`id_asistencia_empleado`),
  KEY `FK_asistencias_empleados_personas` (`id_persona`),
  CONSTRAINT `FK_asistencias_empleados_personas` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`)
);



-- ========================================
--  Ayudas Empleados
-- ========================================
CREATE TABLE `ayudas_empleados` (
  `id_ayuda_empleado` int NOT NULL AUTO_INCREMENT,
  `fecha_fin` date NOT NULL,
  `fecha_inicio` date NOT NULL,
  `observacion` varchar(255) DEFAULT NULL,
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



-- ========================================
--  Bajas Laborales Empleados
-- ========================================
CREATE TABLE `bajas_laborales_empleados` (
  `id_baja_laboral_empleado` int NOT NULL AUTO_INCREMENT,
  `fecha_fin` date NOT NULL,
  `fecha_inicio` date NOT NULL,
  `observacion` varchar(255) DEFAULT NULL,
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



-- ========================================
--  Vacaciones empleados
-- ========================================
CREATE TABLE `vacaciones_empleados` (
  `id_vacacion_empleado` int NOT NULL AUTO_INCREMENT,
  `dias_disfrutados` int NOT NULL,
  `dias_disponibles` int NOT NULL,
  `dias_pendientes` int NOT NULL,
  `dias_solicitados` int NOT NULL,
  `error_blockchain` tinyint(1) NOT NULL DEFAULT '0',
  `fecha_fin` date NOT NULL,
  `fecha_inicio` date NOT NULL,
  `gestionado_con_blockchain` bit(1) NOT NULL,
  `hash_block` varchar(256) DEFAULT NULL,
  `hash_transaccion_vacacion` varchar(256) DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `previous_hash_block` varchar(256) DEFAULT NULL,
  `timestamp_transaccion_vacacion` varchar(255) DEFAULT NULL,
  `id_persona` int NOT NULL,
  `id_tipo_estado` int NOT NULL,
  PRIMARY KEY (`id_vacacion_empleado`),
  KEY `FK_vacaciones_empleados_personas` (`id_persona`),
  KEY `FK_vacaciones_empleados_tipos_estados` (`id_tipo_estado`),
  CONSTRAINT `FK_vacaciones_empleados_personas` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`),
  CONSTRAINT `FK_vacaciones_empleados_tipos_estados` FOREIGN KEY (`id_tipo_estado`) REFERENCES `tipos_estados` (`id_tipo_estado`)
);



-- ========================================
--  Nominas empleados
-- ========================================
CREATE TABLE `nominas_empleados` (
  `id_nomina_empleado` int NOT NULL AUTO_INCREMENT,
  `anticipos` float NOT NULL,
  `bonificacion` float NOT NULL,
  `cuenta_bancaria` varchar(255) NOT NULL,
  `deducciones` float NOT NULL,
  `irpf` float NOT NULL,
  `mes` int NOT NULL,
  `salario_base` float NOT NULL,
  `salario_bruto` float NOT NULL,
  `salario_neto` float NOT NULL,
  `seguridad_social` varchar(255) NOT NULL,
  `tipo_nomina` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `id_persona` int NOT NULL,
  PRIMARY KEY (`id_nomina_empleado`),
  KEY `FK_nominas_empleados_personas` (`id_persona`),
  CONSTRAINT `FK_nominas_empleados_personas` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`)
);



-- ========================================
--  Clientes
-- ========================================
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `ciudad` varchar(255) NOT NULL,
  `codigo_postal` varchar(255) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `nif` varchar(255) NOT NULL,
  `nombre_apellidos` varchar(255) DEFAULT NULL,
  `numero_telefono` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL,
  `razon_social` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
);



--- ========================================
--  Pedidos clientes
-- ========================================
CREATE TABLE `pedidos_clientes` (
  `id_pedido_cliente` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `direccion_entrega` varchar(255) DEFAULT NULL,
  `fecha_entrega_prevista` date DEFAULT NULL,
  `fecha_entrega_real` date DEFAULT NULL,
  `fecha_solicitud_pedido` date NOT NULL,
  `hora_fin_desplazamiento` time(6) DEFAULT NULL,
  `hora_fin_servicio` time(6) DEFAULT NULL,
  `hora_inicio_desplazamiento` time(6) DEFAULT NULL,
  `hora_inicio_servicio` time(6) DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `tiempo_desplazamiento_total` time(6) DEFAULT NULL,
  `tiempo_servicio_total` time(6) DEFAULT NULL,
  `id_cliente` int NOT NULL,
  `id_persona_encargado` int NOT NULL,
  `id_tipo_estado` int NOT NULL,
  `id_tipo_estado_factura` int NOT NULL,
  PRIMARY KEY (`id_pedido_cliente`),
  KEY `FK_pedidos_clientes_clientes` (`id_cliente`),
  KEY `FK_pedidos_clientes_personas` (`id_persona_encargado`),
  KEY `FK_pedidos_clientes_tipos_estados` (`id_tipo_estado`),
  KEY `FK_pedidos_clientes_tipos_estados_facturas` (`id_tipo_estado_factura`),
  CONSTRAINT `FK_pedidos_clientes_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `FK_pedidos_clientes_personas` FOREIGN KEY (`id_persona_encargado`) REFERENCES `personas` (`id_persona`),
  CONSTRAINT `FK_pedidos_clientes_tipos_estados` FOREIGN KEY (`id_tipo_estado`) REFERENCES `tipos_estados` (`id_tipo_estado`),
  CONSTRAINT `FK_pedidos_clientes_tipos_estados_facturas` FOREIGN KEY (`id_tipo_estado_factura`) REFERENCES `tipos_estados_facturas` (`id_tipo_estado_factura`)
);



-- ========================================
--  Facturas clientes
-- ========================================
CREATE TABLE `facturas_clientes` (
  `id_factura_cliente` int NOT NULL AUTO_INCREMENT,
  `descripcion_servicio` varchar(255) DEFAULT NULL,
  `direccion_entrega` varchar(255) NOT NULL,
  `fecha_entrega_real_pedido` date NOT NULL,
  `fecha_factura_emitida` date NOT NULL,
  `hora_fin_desplazamiento` time(6) NOT NULL,
  `hora_fin_servicio` time(6) NOT NULL,
  `hora_inicio_desplazamiento` time(6) NOT NULL,
  `hora_inicio_servicio` time(6) NOT NULL,
  `iva` double NOT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `subtotal_factura_sin_iva` double NOT NULL,
  `tarifa_hora_desplazamiento` double NOT NULL,
  `tarifa_hora_servicio` double NOT NULL,
  `tiempo_desplazamiento_total` time(6) NOT NULL,
  `tiempo_servicio_total` time(6) NOT NULL,
  `total_factura` double NOT NULL,
  `id_cliente` int NOT NULL,
  `id_pedido_cliente` int NOT NULL,
  `id_tipo_estado` int NOT NULL,
  PRIMARY KEY (`id_factura_cliente`),
  KEY `FK_facturas_clientes_clientes` (`id_cliente`),
  KEY `FK_facturas_clientes_pedidos_clientes` (`id_pedido_cliente`),
  KEY `FK_facturas_clientes_tipos_estados` (`id_tipo_estado`),
  CONSTRAINT `FK_facturas_clientes_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `FK_facturas_clientes_pedidos_clientes` FOREIGN KEY (`id_pedido_cliente`) REFERENCES `pedidos_clientes` (`id_pedido_cliente`),
  CONSTRAINT `FK_facturas_clientes_tipos_estados` FOREIGN KEY (`id_tipo_estado`) REFERENCES `tipos_estados` (`id_tipo_estado`)
);



-- ========================================
--  Pagos facturas clientes
-- ========================================
CREATE TABLE `pagos_facturas_clientes` (
  `id_pago_factura_cliente` int NOT NULL AUTO_INCREMENT,
  `fecha_pago_realizada` date NOT NULL,
  `importe_pagado` float NOT NULL,
  `metodo_pago` varchar(255) NOT NULL,
  `id_factura_cliente` int NOT NULL,
  PRIMARY KEY (`id_pago_factura_cliente`),
  KEY `FK_pagos_facturas_clientes_facturas_clientes` (`id_factura_cliente`),
  CONSTRAINT `FK_pagos_facturas_clientes_facturas_clientes` FOREIGN KEY (`id_factura_cliente`) REFERENCES `facturas_clientes` (`id_factura_cliente`)
);
