package tfg.backend.repositories;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.TipoAyudaModel;



@Repository
public interface TipoAyudaRepository extends JpaRepository<TipoAyudaModel, Integer> {
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM TipoAyudaModel c WHERE c.tipo_ayuda = :tipo_ayuda")
    boolean existsByTipo_ayuda(@Param("tipo_ayuda") String tipo_ayuda);
}

