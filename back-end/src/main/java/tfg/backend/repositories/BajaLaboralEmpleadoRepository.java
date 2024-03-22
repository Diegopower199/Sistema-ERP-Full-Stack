package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tfg.backend.models.BajaLaboralEmpleadoModel;

@Repository
public interface BajaLaboralEmpleadoRepository extends JpaRepository<BajaLaboralEmpleadoModel, Integer> {

    @Query("SELECT c FROM BajaLaboralEmpleadoModel c ORDER BY c.id_baja_laboral_empleado")
    List<BajaLaboralEmpleadoModel> findAllOrderedById();

}