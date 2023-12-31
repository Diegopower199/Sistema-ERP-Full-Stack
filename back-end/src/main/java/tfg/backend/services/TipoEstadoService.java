package tfg.backend.services;



import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.TipoEstadoModel;
import tfg.backend.repositories.TipoEstadoRepository;



@Service
public class TipoEstadoService {

    @Autowired
    TipoEstadoRepository tipoEstadoRepository;

    public List<Map<String, Object>> getAllTiposEstados() {
        List<TipoEstadoModel> listaTiposEstados = tipoEstadoRepository.findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (TipoEstadoModel tipoEstado : listaTiposEstados) {
            Map<String, Object> tipoEstadoMap = tipoEstado.toMap();
            resultado.add(tipoEstadoMap);
        }

        return resultado;
    }

    public TipoEstadoModel saveTipoEstado(TipoEstadoModel nuevoTipoEstado) {

        if (nuevoTipoEstado.getTipo_estado() == null) {
            throw new RuntimeException("El campo 'tipo_estado' no puede ser null");
        }

        if (tipoEstadoRepository.existsByTipo_estado(nuevoTipoEstado.getTipo_estado())) {
            throw new RuntimeException("El tipo de estado ya existe");
        }

        TipoEstadoModel tipoEstadoGuardado = tipoEstadoRepository.save(nuevoTipoEstado);
        return tipoEstadoGuardado;
    }

    public Map<String, Object> getTipoEstadoById(int idTipoEstado) {
        TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(idTipoEstado)
                .orElseThrow(() -> new RuntimeException("Tipo de estado con id " + idTipoEstado + " no encontrado"));

        Map<String, Object> tipoEstadoMap = tipoEstadoEncontrado.toMap();

        return tipoEstadoMap;
    }

    public TipoEstadoModel updateTipoEstado(TipoEstadoModel cambiosTipoEstado, int idTipoEstado) {
        TipoEstadoModel tipoEstadoExistente = tipoEstadoRepository.findById(idTipoEstado)
                .orElseThrow(() -> new RuntimeException("Tipo de estado con id " + idTipoEstado + " no encontrado"));

        if (cambiosTipoEstado.getTipo_estado() == null) {
            throw new RuntimeException("El campo 'tipo_estado' no puede ser null");
        }

        if (!tipoEstadoExistente.getTipo_estado().equals(cambiosTipoEstado.getTipo_estado())) {
            if (tipoEstadoRepository.existsByTipo_estado(cambiosTipoEstado.getTipo_estado())) {
                throw new RuntimeException("El tipo de estado ya existe");
            }
            tipoEstadoExistente.setTipo_estado(cambiosTipoEstado.getTipo_estado());
        }

        TipoEstadoModel tipoEstadoActualizado = tipoEstadoRepository.save(tipoEstadoExistente);

        return tipoEstadoActualizado;
    }

    public void deleteTipoEstado(int idTipoEstado) {
        tipoEstadoRepository.findById(idTipoEstado)
                .orElseThrow(() -> new RuntimeException("Tipo de estado con id " + idTipoEstado + " no encontrado"));

        tipoEstadoRepository.deleteById(idTipoEstado);

    }
}

