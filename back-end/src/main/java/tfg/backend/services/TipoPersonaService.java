package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.TipoPersonaModel;
import tfg.backend.repositories.TipoPersonaRepository;

@Service
public class TipoPersonaService {
    @Autowired
    TipoPersonaRepository tipoPersonaRepository;

    public List<Map<String, Object>> getAllTiposPersonas() {
        List<TipoPersonaModel> listaTiposPersonas = tipoPersonaRepository.findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (TipoPersonaModel tipoPersona : listaTiposPersonas) {
            Map<String, Object> tipoPersonaMap = tipoPersona.toMap();
            resultado.add(tipoPersonaMap);
        }

        return resultado;
    }

    public TipoPersonaModel saveTipoPersona(TipoPersonaModel nuevoTipoPersona) {

        if (nuevoTipoPersona.getTipo_persona() == null) {
            throw new RuntimeException("El campo 'tipo_persona' no puede ser null");
        }

        if (tipoPersonaRepository.existsByTipo_persona(nuevoTipoPersona.getTipo_persona())) {
            throw new RuntimeException("El tipo de persona ya existe");
        }

        TipoPersonaModel tipoPersonaGuardado = tipoPersonaRepository.save(nuevoTipoPersona);
        return tipoPersonaGuardado;
    }

    public Map<String, Object> getTipoPersonaById(int idTipoPersona) {
        TipoPersonaModel tipoPersonaEncontrado = tipoPersonaRepository.findById(idTipoPersona)
                .orElseThrow(() -> new RuntimeException("Tipo de persona con id " + idTipoPersona + " no encontrado"));

        Map<String, Object> tipoPersonaMap = tipoPersonaEncontrado.toMap();

        return tipoPersonaMap;
    }

    public TipoPersonaModel updateTipoPersona(TipoPersonaModel cambiosTipoPersona, int idTipoPersona) {
        TipoPersonaModel tipoPersonaExistente = tipoPersonaRepository.findById(idTipoPersona)
                .orElseThrow(() -> new RuntimeException("Tipo de persona con id " + idTipoPersona + " no encontrado"));

        if (cambiosTipoPersona.getTipo_persona() == null) {
            throw new RuntimeException("El campo 'tipo_persona' no puede ser null");
        }

        if (!tipoPersonaExistente.getTipo_persona().equals(cambiosTipoPersona.getTipo_persona())) {
            if (tipoPersonaRepository.existsByTipo_persona(cambiosTipoPersona.getTipo_persona())) {
                throw new RuntimeException("El tipo de persona ya existe");
            }
            tipoPersonaExistente.setTipo_persona(cambiosTipoPersona.getTipo_persona());
        }

        TipoPersonaModel tipoPersonaActualizado = tipoPersonaRepository.save(tipoPersonaExistente);

        return tipoPersonaActualizado;
    }

    public void deleteTipoPersona(int idTipoPersona) {
        tipoPersonaRepository.findById(idTipoPersona)
                .orElseThrow(() -> new RuntimeException("Tipo de persona con id " + idTipoPersona + " no encontrado"));

        tipoPersonaRepository.deleteById(idTipoPersona);

    }
}
