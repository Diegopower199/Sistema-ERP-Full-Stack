package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.TipoAyudaModel;
import tfg.backend.repositories.TipoAyudaRepository;

@Service
public class TipoAyudaService {

    @Autowired
    TipoAyudaRepository tipoAyudaRepository;

    public List<Map<String, Object>> getAllTiposAyudas() {
        List<TipoAyudaModel> listaTiposAyudas = tipoAyudaRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (TipoAyudaModel tipoAyuda : listaTiposAyudas) {
            Map<String, Object> tipoAyudaMap = tipoAyuda.toMap();

            resultado.add(tipoAyudaMap);
        }

        return resultado;
    }

    public TipoAyudaModel saveTipoAyuda(TipoAyudaModel nuevoTipoAyuda) {

        if (nuevoTipoAyuda.getTipo_ayuda() == null) {
            throw new RuntimeException("El campo 'tipo_ayuda' no puede ser null");
        }

        if (tipoAyudaRepository.existsByTipo_ayuda(nuevoTipoAyuda.getTipo_ayuda())) {
            throw new RuntimeException("El tipo de ayuda ya existe");
        }

        TipoAyudaModel tipoAyudaGuardado = tipoAyudaRepository.save(nuevoTipoAyuda);
        return tipoAyudaGuardado;
    }

    public Map<String, Object> getTipoAyudaById(int idTipoAyuda) {
        TipoAyudaModel tipoAyudaEncontrado = tipoAyudaRepository.findById(idTipoAyuda)
                .orElseThrow(() -> new RuntimeException("Tipo de ayuda con id " + idTipoAyuda + " no encontrado"));

        Map<String, Object> tipoAyudaMap = tipoAyudaEncontrado.toMap();

        return tipoAyudaMap;
    }

    public TipoAyudaModel updateTipoAyuda(TipoAyudaModel cambiosTipoAyuda, int idTipoAyuda) {
        TipoAyudaModel tipoAyudaExistente = tipoAyudaRepository.findById(idTipoAyuda)
                .orElseThrow(() -> new RuntimeException("Tipo de ayuda con id " + idTipoAyuda + " no encontrado"));

        if (cambiosTipoAyuda.getTipo_ayuda() == null) {
            throw new RuntimeException("El campo 'tipo_ayuda' no puede ser null");
        }

        if (!tipoAyudaExistente.getTipo_ayuda().equals(cambiosTipoAyuda.getTipo_ayuda())) {
            if (tipoAyudaRepository.existsByTipo_ayuda(cambiosTipoAyuda.getTipo_ayuda())) {
                throw new RuntimeException("El tipo de ayuda ya existe");
            }
            tipoAyudaExistente.setTipo_ayuda(cambiosTipoAyuda.getTipo_ayuda());
        }

        TipoAyudaModel tipoAyudaActualizado = tipoAyudaRepository.save(tipoAyudaExistente);

        return tipoAyudaActualizado;
    }

    public void deleteTipoAyuda(int idTipoAyuda) {
        tipoAyudaRepository.findById(idTipoAyuda)
                .orElseThrow(() -> new RuntimeException("Tipo de ayuda con id " + idTipoAyuda + " no encontrado"));

        tipoAyudaRepository.deleteById(idTipoAyuda);

    }
}
