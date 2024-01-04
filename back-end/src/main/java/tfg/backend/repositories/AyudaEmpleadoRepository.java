package tfg.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.backend.models.AyudaEmpleadoModel;

@Repository
public interface AyudaEmpleadoRepository extends JpaRepository<AyudaEmpleadoModel, Integer> {

}
