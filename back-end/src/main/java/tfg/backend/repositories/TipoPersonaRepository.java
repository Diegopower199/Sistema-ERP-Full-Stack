package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.TipoPersonaModel;

@Repository
public interface TipoPersonaRepository extends JpaRepository<TipoPersonaModel, Integer> {

    @Query("SELECT c FROM TipoPersonaModel c ORDER BY c.id_tipo_persona")
    List<TipoPersonaModel> findAllOrderedById();

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM TipoPersonaModel c WHERE c.tipo_persona = :tipo_persona")
    boolean existsByTipo_persona(@Param("tipo_persona") String tipo_persona);

}
