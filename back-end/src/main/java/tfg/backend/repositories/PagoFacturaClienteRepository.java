package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tfg.backend.models.PagoFacturaClienteModel;

@Repository
public interface PagoFacturaClienteRepository extends JpaRepository<PagoFacturaClienteModel, Integer> {

    @Query("SELECT c FROM PagoFacturaClienteModel c ORDER BY c.id_pago_factura_cliente")
    List<PagoFacturaClienteModel> findAllOrderedById();

}
