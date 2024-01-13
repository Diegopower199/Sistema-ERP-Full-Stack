package tfg.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.backend.models.FacturaClienteModel;

@Repository
public interface FacturaClienteRepository extends JpaRepository<FacturaClienteModel, Integer> {

}
