package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tfg.backend.models.DetalleFacturaClienteModel;

@Repository
public interface DetalleFacturaClienteRepository extends JpaRepository<DetalleFacturaClienteModel, Integer> {

    @Query("SELECT c FROM DetalleFacturaClienteModel c ORDER BY c.id_detalle_factura_cliente")
    List<DetalleFacturaClienteModel> findAllOrderedById();

}