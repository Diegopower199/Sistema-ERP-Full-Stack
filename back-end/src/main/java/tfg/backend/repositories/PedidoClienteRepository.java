package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.PedidoClienteModel;
import tfg.backend.models.TipoEstadoFacturaModel;

@Repository
public interface PedidoClienteRepository extends JpaRepository<PedidoClienteModel, Integer> {

    @Query("SELECT c FROM PedidoClienteModel c ORDER BY c.id_pedido_cliente")
    List<PedidoClienteModel> findAllOrderedById();

    @Query("SELECT c FROM PedidoClienteModel c WHERE c.tipo_estado_factura = :id_tipo_estado_factura ORDER BY c.id_pedido_cliente")
    List<PedidoClienteModel> findByTipoEstadoFacturaIdOrderByPedidoClienteId(
            @Param("id_tipo_estado_factura") TipoEstadoFacturaModel id_tipo_estado_factura);

}