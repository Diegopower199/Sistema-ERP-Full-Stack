package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.TipoEstadoModel;

@Repository
public interface TipoEstadoRepository extends JpaRepository<TipoEstadoModel, Integer> {

    @Query("SELECT c FROM TipoEstadoModel c ORDER BY c.id_tipo_estado")
    List<TipoEstadoModel> findAllOrderedById();

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM TipoEstadoModel c WHERE c.tipo_estado = :tipo_estado")
    boolean existsByTipo_estado(@Param("tipo_estado") String tipo_estado);

}
