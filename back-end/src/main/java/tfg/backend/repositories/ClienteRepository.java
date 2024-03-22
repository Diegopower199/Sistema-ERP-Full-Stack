package tfg.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tfg.backend.models.ClienteModel;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteModel, Integer> {

    @Query("SELECT c FROM ClienteModel c ORDER BY c.id_cliente")
    List<ClienteModel> findAllOrderedById();

}