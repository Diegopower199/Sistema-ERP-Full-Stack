package tfg.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.backend.models.BajaLaboralEmpleadoModel;

@Repository
public interface BajaLaboralEmpleadoRepository extends JpaRepository<BajaLaboralEmpleadoModel, Integer> {

}
