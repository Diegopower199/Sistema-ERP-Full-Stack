package tfg.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.backend.models.PedidoClienteModel;

@Repository
public interface PedidoClienteRepository extends JpaRepository<PedidoClienteModel, Integer> {

}
