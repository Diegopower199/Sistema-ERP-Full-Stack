package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tfg.backend.models.NominaEmpleadoModel;

@Repository
public interface NominaEmpleadoRepository extends JpaRepository<NominaEmpleadoModel, Integer> {

    @Query("SELECT c FROM NominaEmpleadoModel c ORDER BY c.id_nomina_empleado")
    List<NominaEmpleadoModel> findAllOrderedById();

}