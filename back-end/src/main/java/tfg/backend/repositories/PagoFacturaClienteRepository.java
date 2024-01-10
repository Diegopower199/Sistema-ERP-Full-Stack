package tfg.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.backend.models.PagoFacturaClienteModel;

@Repository
public interface PagoFacturaClienteRepository extends JpaRepository<PagoFacturaClienteModel, Integer> {
    
}
