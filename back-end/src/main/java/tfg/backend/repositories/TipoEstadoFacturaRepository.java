package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.TipoEstadoFacturaModel;

@Repository
public interface TipoEstadoFacturaRepository extends JpaRepository<TipoEstadoFacturaModel, Integer> {

    @Query("SELECT c FROM TipoEstadoFacturaModel c ORDER BY c.id_tipo_estado_factura")
    List<TipoEstadoFacturaModel> findAllOrderedById();

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM TipoEstadoFacturaModel c WHERE c.tipo_estado_factura = :tipo_estado_factura")
    boolean existsByTipo_estado_factura(@Param("tipo_estado_factura") String tipo_estado_factura);

}