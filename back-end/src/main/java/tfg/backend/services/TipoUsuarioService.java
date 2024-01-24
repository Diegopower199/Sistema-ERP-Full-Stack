package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.TipoUsuarioModel;
import tfg.backend.repositories.TipoUsuarioRepository;

@Service
public class TipoUsuarioService {

    @Autowired
    TipoUsuarioRepository tipoUsuarioRepository;

    public List<Map<String, Object>> getAllTiposUsuarios() {
        List<TipoUsuarioModel> listaTiposUsuarios = tipoUsuarioRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (TipoUsuarioModel tipoUsuario : listaTiposUsuarios) {
            Map<String, Object> tipoUsuarioMap = tipoUsuario.toMap();

            resultado.add(tipoUsuarioMap);
        }

        return resultado;
    }

    public TipoUsuarioModel saveTipoUsuario(TipoUsuarioModel nuevoTipoUsuario) {
        String tipo_usuario = nuevoTipoUsuario.getTipo_usuario();

        if (nuevoTipoUsuario.getTipo_usuario() == null) {
            throw new RuntimeException("El campo 'tipo_usuario' no puede ser null");
        }

        if (tipoUsuarioRepository.existsByTipo_usuario(tipo_usuario)) {
            throw new RuntimeException("El tipo usuario ya existe");
        }

        TipoUsuarioModel tipoUsuarioGuardado = tipoUsuarioRepository.save(nuevoTipoUsuario);
        return tipoUsuarioGuardado;
    }

    public Map<String, Object> getTipoUsuarioById(int idTipoUsuario) {
        TipoUsuarioModel tipoUsuarioEncontrado = tipoUsuarioRepository.findById(idTipoUsuario)
                .orElseThrow(() -> new RuntimeException("Tipo de usuario con id " + idTipoUsuario + " no encontrado"));

        Map<String, Object> tipoUsuarioMap = tipoUsuarioEncontrado.toMap();

        return tipoUsuarioMap;
    }

    public TipoUsuarioModel updateTipoUsuario(TipoUsuarioModel cambiosTipoUsuario, int idTipoUsuario) {
        TipoUsuarioModel tipoUsuarioExistente = tipoUsuarioRepository.findById(idTipoUsuario)
                .orElseThrow(() -> new RuntimeException("Tipo de usuario con id " + idTipoUsuario + " no encontrado"));

        if (cambiosTipoUsuario.getTipo_usuario() == null) {
            throw new RuntimeException("El campo 'tipo_usuario' no puede ser null");
        }

        if (!tipoUsuarioExistente.getTipo_usuario().equals(cambiosTipoUsuario.getTipo_usuario())) {
            if (tipoUsuarioRepository.existsByTipo_usuario(cambiosTipoUsuario.getTipo_usuario())) {
                throw new RuntimeException("El tipo de usuario ya existe");
            }
            tipoUsuarioExistente.setTipo_usuario(cambiosTipoUsuario.getTipo_usuario());
        }

        TipoUsuarioModel tipoUsuarioActualizado = tipoUsuarioRepository.save(tipoUsuarioExistente);

        return tipoUsuarioActualizado;
    }

    public void deleteTipoUsuario(int idTipoUsuario) {
        tipoUsuarioRepository.findById(idTipoUsuario)
                .orElseThrow(() -> new RuntimeException("Tipo de usuario con id " + idTipoUsuario + " no encontrado"));

        tipoUsuarioRepository.deleteById(idTipoUsuario);

    }
}
