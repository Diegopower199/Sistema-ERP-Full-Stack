package tfg.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.backend.models.NominaEmpleadoModel;

@Repository
public interface NominaEmpleadoRepository extends JpaRepository<NominaEmpleadoModel, Integer> {

}