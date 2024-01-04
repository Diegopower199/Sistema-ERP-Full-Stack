package tfg.backend.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.PersonaModel;
import tfg.backend.models.SolicitudEmpleadoModel;

@Repository
public interface SolicitudEmpleadoRepository extends JpaRepository<SolicitudEmpleadoModel, Integer> {
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM SolicitudEmpleadoModel c WHERE c.persona = :id_persona AND c.fecha_solicitud = :fecha_solicitud")
    boolean existsByPersonaAndFecha_solicitud(
            @Param("id_persona") PersonaModel id_persona,
            @Param("fecha_solicitud") LocalDate fecha_solicitud);
}
