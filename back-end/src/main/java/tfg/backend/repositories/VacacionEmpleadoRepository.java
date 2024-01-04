package tfg.backend.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.PersonaModel;
import tfg.backend.models.VacacionEmpleadoModel;

@Repository
public interface VacacionEmpleadoRepository extends JpaRepository<VacacionEmpleadoModel, Integer> {
    // CASE WHEN COUNT(c) > 0 THEN true ELSE false END: Esta es una expresión de
    // caso condicional. Si la cuenta de filas es mayor que cero, devuelve true; de
    // lo contrario, devuelve false
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM VacacionEmpleadoModel c WHERE c.persona = :id_persona AND c.fecha_inicio <= :fecha_fin AND c.fecha_fin >= :fecha_inicio")
    boolean existsByPersonaAndFecha_inicioAndFecha_fin(
            @Param("id_persona") PersonaModel id_persona,
            @Param("fecha_inicio") LocalDate fecha_inicio,
            @Param("fecha_fin") LocalDate fecha_fin);

}
