package tfg.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tfg.backend.models.PersonaModel;
import tfg.backend.models.UsuarioModel;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Integer> {

    @Query("SELECT c FROM UsuarioModel c ORDER BY c.id_usuario")
    List<UsuarioModel> findAllOrderedById();

    @Query("SELECT c FROM UsuarioModel c WHERE c.nombre_usuario = :nombre_usuario")
    Optional<UsuarioModel> findByNombre_usuario(@Param("nombre_usuario") String nombre_usuario);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM UsuarioModel c WHERE c.nombre_usuario = :nombre_usuario")
    boolean existsByNombre_usuario(@Param("nombre_usuario") String nombre_usuario);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM UsuarioModel c WHERE c.persona = :id_persona")
    boolean existsByPersona(@Param("id_persona") PersonaModel id_persona);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM UsuarioModel c WHERE c.nombre_usuario = :nombre_usuario AND c.password = :password")
    boolean existsByNombre_usuarioAndPassword(@Param("nombre_usuario") String nombre_usuario,
            @Param("password") String password);

}
