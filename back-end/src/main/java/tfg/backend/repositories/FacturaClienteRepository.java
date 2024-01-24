package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tfg.backend.models.FacturaClienteModel;

@Repository
public interface FacturaClienteRepository extends JpaRepository<FacturaClienteModel, Integer> {

    @Query("SELECT c FROM FacturaClienteModel c ORDER BY c.id_factura_cliente")
    List<FacturaClienteModel> findAllOrderedById();

}
