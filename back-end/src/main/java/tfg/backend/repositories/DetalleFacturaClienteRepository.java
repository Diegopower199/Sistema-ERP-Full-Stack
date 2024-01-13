package tfg.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.backend.models.DetalleFacturaClienteModel;

@Repository
public interface DetalleFacturaClienteRepository extends JpaRepository<DetalleFacturaClienteModel, Integer> {

}
