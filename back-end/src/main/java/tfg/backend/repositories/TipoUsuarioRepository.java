package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.TipoUsuarioModel;

@Repository
public interface TipoUsuarioRepository extends JpaRepository<TipoUsuarioModel, Integer> {

    @Query("SELECT c FROM TipoUsuarioModel c ORDER BY c.id_tipo_usuario")
    List<TipoUsuarioModel> findAllOrderedById();

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM TipoUsuarioModel c WHERE c.tipo_usuario = :tipo_usuario")
    boolean existsByTipo_usuario(@Param("tipo_usuario") String tipo_usuario);

}
