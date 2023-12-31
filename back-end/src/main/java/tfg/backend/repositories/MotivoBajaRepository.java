package tfg.backend.repositories;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.MotivoBajaModel;



@Repository
public interface MotivoBajaRepository extends JpaRepository<MotivoBajaModel, Integer> {
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM MotivoBajaModel c WHERE c.motivo_baja = :motivo_baja")
    boolean existsByMotivo_baja(@Param("motivo_baja") String motivo_baja);
}

