package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.MotivoBajaModel;
import tfg.backend.repositories.MotivoBajaRepository;

@Service
public class MotivoBajaService {

    @Autowired
    MotivoBajaRepository motivoBajaRepository;

    public List<Map<String, Object>> getAllMotivosBajas() {
        List<MotivoBajaModel> listaMotivosBajas = motivoBajaRepository.findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (MotivoBajaModel motivoBaja : listaMotivosBajas) {
            Map<String, Object> motivoBajaMap = motivoBaja.toMap();
            resultado.add(motivoBajaMap);
        }

        return resultado;
    }

    public MotivoBajaModel saveMotivoBaja(MotivoBajaModel nuevoMotivoBaja) {

        if (nuevoMotivoBaja.getMotivo_baja() == null) {
            throw new RuntimeException("El campo 'motivo_baja' no puede ser null");
        }

        if (motivoBajaRepository.existsByMotivo_baja(nuevoMotivoBaja.getMotivo_baja())) {
            throw new RuntimeException("El motivo de baja ya existe");
        }

        MotivoBajaModel motivoBajaGuardado = motivoBajaRepository.save(nuevoMotivoBaja);
        return motivoBajaGuardado;
    }

    public Map<String, Object> getMotivoBajaById(int idMotivoBaja) {
        MotivoBajaModel motivoBajaEncontrado = motivoBajaRepository.findById(idMotivoBaja)
                .orElseThrow(() -> new RuntimeException("Motivo de baja con id " + idMotivoBaja + " no encontrado"));

        Map<String, Object> motivoBajaMap = motivoBajaEncontrado.toMap();

        return motivoBajaMap;
    }

    public MotivoBajaModel updateMotivoBaja(MotivoBajaModel cambiosMotivoBaja, int idMotivoBaja) {
        MotivoBajaModel motivoBajaExistente = motivoBajaRepository.findById(idMotivoBaja)
                .orElseThrow(() -> new RuntimeException("Motivo de baja con id " + idMotivoBaja + " no encontrado"));

        if (cambiosMotivoBaja.getMotivo_baja() == null) {
            throw new RuntimeException("El campo 'motivo_baja' no puede ser null");
        }

        if (!motivoBajaExistente.getMotivo_baja().equals(cambiosMotivoBaja.getMotivo_baja())) {
            if (motivoBajaRepository.existsByMotivo_baja(cambiosMotivoBaja.getMotivo_baja())) {
                throw new RuntimeException("El motivo de baja ya existe");
            }
            motivoBajaExistente.setMotivo_baja(cambiosMotivoBaja.getMotivo_baja());
        }

        MotivoBajaModel MotivoBajaActualizado = motivoBajaRepository.save(motivoBajaExistente);

        return MotivoBajaActualizado;
    }

    public void deleteMotivoBaja(int idMotivoBaja) {
        motivoBajaRepository.findById(idMotivoBaja)
                .orElseThrow(() -> new RuntimeException("Motivo de baja con id " + idMotivoBaja + " no encontrado"));

        motivoBajaRepository.deleteById(idMotivoBaja);

    }
}
