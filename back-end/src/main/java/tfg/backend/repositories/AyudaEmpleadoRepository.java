package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tfg.backend.models.AyudaEmpleadoModel;

@Repository
public interface AyudaEmpleadoRepository extends JpaRepository<AyudaEmpleadoModel, Integer> {

    @Query("SELECT c FROM AyudaEmpleadoModel c ORDER BY c.id_ayuda_empleado")
    List<AyudaEmpleadoModel> findAllOrderedById();

}