package tfg.backend.services;



import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.TipoSolicitudModel;
import tfg.backend.repositories.TipoSolicitudRepository;



@Service
public class TipoSolicitudService {

    @Autowired
    TipoSolicitudRepository tipoSolicitudRepository;

    public List<Map<String, Object>> getAllTiposSolicitudes() {
        List<TipoSolicitudModel> listaTiposSolicitudes = tipoSolicitudRepository.findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (TipoSolicitudModel tipoSolicitud : listaTiposSolicitudes) {
            Map<String, Object> tipoSolicitudMap = tipoSolicitud.toMap();
            resultado.add(tipoSolicitudMap);
        }

        return resultado;
    }

    public TipoSolicitudModel saveTipoSolicitud(TipoSolicitudModel nuevoTipoSolicitud) {

        if (nuevoTipoSolicitud.getTipo_solicitud() == null) {
            throw new RuntimeException("El campo 'tipo_solicitud' no puede ser null");
        }

        if (tipoSolicitudRepository.existsByTipo_solicitud(nuevoTipoSolicitud.getTipo_solicitud())) {
            throw new RuntimeException("El tipo de solicitud ya existe");
        }

        TipoSolicitudModel tipoSolicitudGuardado = tipoSolicitudRepository.save(nuevoTipoSolicitud);
        return tipoSolicitudGuardado;
    }

    public Map<String, Object> getTipoSolicitudById(int idTipoSolicitud) {
        TipoSolicitudModel tipoSolicitudEncontrado = tipoSolicitudRepository.findById(idTipoSolicitud)
                .orElseThrow(
                        () -> new RuntimeException("Tipo de solicitud con id " + idTipoSolicitud + " no encontrado"));

        Map<String, Object> tipoSolicitudMap = tipoSolicitudEncontrado.toMap();

        return tipoSolicitudMap;
    }

    public TipoSolicitudModel updateTipoSolicitud(TipoSolicitudModel cambiosTipoSolicitud, int idTipoSolicitud) {
        TipoSolicitudModel tipoSolicitudExistente = tipoSolicitudRepository.findById(idTipoSolicitud)
                .orElseThrow(
                        () -> new RuntimeException("Tipo de solicitud con id " + idTipoSolicitud + " no encontrado"));

        if (cambiosTipoSolicitud.getTipo_solicitud() == null) {
            throw new RuntimeException("El campo 'tipo_solicitud' no puede ser null");
        }

        if (!tipoSolicitudExistente.getTipo_solicitud().equals(cambiosTipoSolicitud.getTipo_solicitud())) {
            if (tipoSolicitudRepository.existsByTipo_solicitud(cambiosTipoSolicitud.getTipo_solicitud())) {
                throw new RuntimeException("El tipo de solicitud ya existe");
            }
            tipoSolicitudExistente.setTipo_solicitud(cambiosTipoSolicitud.getTipo_solicitud());
        }

        TipoSolicitudModel tipoSolicitudActualizado = tipoSolicitudRepository.save(tipoSolicitudExistente);

        return tipoSolicitudActualizado;
    }

    public void deleteTipoSolicitud(int idTipoSolicitud) {
        tipoSolicitudRepository.findById(idTipoSolicitud)
                .orElseThrow(
                        () -> new RuntimeException("Tipo de solicitud con id " + idTipoSolicitud + " no encontrado"));

        tipoSolicitudRepository.deleteById(idTipoSolicitud);

    }
}

