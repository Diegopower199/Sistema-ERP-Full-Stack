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