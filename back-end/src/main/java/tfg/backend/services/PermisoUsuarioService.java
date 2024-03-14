package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.PermisoUsuarioModel;
import tfg.backend.repositories.PermisoUsuarioRepository;

@Service
public class PermisoUsuarioService {

    @Autowired
    PermisoUsuarioRepository permisoUsuarioRepository;

    public List<Map<String, Object>> getAllPermisosUsuarios() {
        List<PermisoUsuarioModel> listaPermisosUsuarios = permisoUsuarioRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (PermisoUsuarioModel permisoUsuario : listaPermisosUsuarios) {
            Map<String, Object> permisoUsuarioMap = permisoUsuario.toMap();

            resultado.add(permisoUsuarioMap);
        }

        return resultado;
    }

    public PermisoUsuarioModel savePermisoUsuario(PermisoUsuarioModel nuevoPermisoUsuario) {
        PermisoUsuarioModel permisoUsuarioGuardado = permisoUsuarioRepository.save(nuevoPermisoUsuario);

        return permisoUsuarioGuardado;
    }

    public Map<String, Object> getPermisoUsuarioById(int idPermisoUsuario) {
        PermisoUsuarioModel permisoUsuarioEncontrado = permisoUsuarioRepository.findById(idPermisoUsuario)
                .orElseThrow(
                        () -> new RuntimeException("Permiso usuario con id " + idPermisoUsuario + " no encontrado"));

        Map<String, Object> permisoUsuarioMap = permisoUsuarioEncontrado.toMap();

        return permisoUsuarioMap;
    }

    public PermisoUsuarioModel updatePermisoUsuario(PermisoUsuarioModel cambiosPermisoUsuario, int idPermisoUsuario) {
        PermisoUsuarioModel permisoUsuarioExistente = permisoUsuarioRepository.findById(idPermisoUsuario)
                .orElseThrow(
                        () -> new RuntimeException("Permiso usuario con id " + idPermisoUsuario + " no encontrado"));

        PermisoUsuarioModel permisoUsuarioActualizado = permisoUsuarioRepository.save(permisoUsuarioExistente);

        return permisoUsuarioActualizado;
    }

    public void deletePermisoUsuario(int idpermisoUsuario) {
        permisoUsuarioRepository.findById(idpermisoUsuario)
                .orElseThrow(
                        () -> new RuntimeException("Permiso usuario con id " + idpermisoUsuario + " no encontrado"));

        permisoUsuarioRepository.deleteById(idpermisoUsuario);

    }
}