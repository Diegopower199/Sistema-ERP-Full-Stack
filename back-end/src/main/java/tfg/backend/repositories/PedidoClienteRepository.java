package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tfg.backend.models.PedidoClienteModel;

@Repository
public interface PedidoClienteRepository extends JpaRepository<PedidoClienteModel, Integer> {

    @Query("SELECT c FROM PedidoClienteModel c ORDER BY c.id_pedido_cliente")
    List<PedidoClienteModel> findAllOrderedById();

}