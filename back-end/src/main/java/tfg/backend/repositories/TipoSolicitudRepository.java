package tfg.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.TipoSolicitudModel;

@Repository
public interface TipoSolicitudRepository extends JpaRepository<TipoSolicitudModel, Integer> {
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM TipoSolicitudModel c WHERE c.tipo_solicitud = :tipo_solicitud")
    boolean existsByTipo_solicitud(@Param("tipo_solicitud") String tipo_solicitud);
}