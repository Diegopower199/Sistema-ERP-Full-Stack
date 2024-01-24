package tfg.backend.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.AsistenciaEmpleadoModel;
import tfg.backend.models.PersonaModel;

@Repository
public interface AsistenciaEmpleadoRepository extends JpaRepository<AsistenciaEmpleadoModel, Integer> {

    @Query("SELECT c FROM AsistenciaEmpleadoModel c ORDER BY c.id_asistencia_empleado")
    List<AsistenciaEmpleadoModel> findAllOrderedById();

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM AsistenciaEmpleadoModel c WHERE c.persona = :id_persona AND c.fecha = :fecha")
    boolean existsByPersonaAndFecha_AsistenciaEmpleado(
            @Param("id_persona") PersonaModel id_persona,
            @Param("fecha") LocalDate fecha);

}
