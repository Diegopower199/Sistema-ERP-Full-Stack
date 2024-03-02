package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tfg.backend.models.PermisoUsuarioModel;

@Repository
public interface PermisoUsuarioRepository extends JpaRepository<PermisoUsuarioModel, Integer> {

    @Query("SELECT c FROM PermisoUsuarioModel c ORDER BY c.id_permiso_usuario")
    List<PermisoUsuarioModel> findAllOrderedById();

}