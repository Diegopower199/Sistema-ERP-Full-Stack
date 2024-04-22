package tfg.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.PersonaModel;

@Repository
public interface PersonaRepository extends JpaRepository<PersonaModel, Integer> {

    @Query("SELECT c FROM PersonaModel c ORDER BY c.id_persona")
    List<PersonaModel> findAllOrderedById();

    @Query("SELECT c FROM PersonaModel c  WHERE c.tipo_persona.id_tipo_persona = 1 OR c.tipo_persona.id_tipo_persona = 3 ORDER BY c.id_persona")
    List<PersonaModel> findAllTipoPersonaEmpleadosAndBecariosOrderedById();

    @Query("SELECT c FROM PersonaModel c WHERE c.dni = :dni")
    Optional<PersonaModel> findByDni(@Param("dni") String dni);

    @Query("SELECT c FROM PersonaModel c WHERE c.correo_electronico = :correo_electronico")
    Optional<PersonaModel> findByCorreo_electronico(@Param("correo_electronico") String correo_electronico);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM PersonaModel c WHERE c.numero_empleado = :numero_empleado")
    boolean existsByNumero_empleado(@Param("numero_empleado") int numero_empleado);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM PersonaModel c WHERE c.dni = :dni")
    boolean existsByDni(@Param("dni") String dni);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM PersonaModel c WHERE c.numero_telefono = :numero_telefono")
    boolean existsBynumero_telefono(@Param("numero_telefono") String numero_telefono);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM PersonaModel c WHERE c.correo_electronico = :correo_electronico")
    boolean existsBycorreo_electronico(@Param("correo_electronico") String correo_electronico);

}