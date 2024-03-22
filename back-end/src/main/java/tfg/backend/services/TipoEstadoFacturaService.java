package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.TipoEstadoFacturaModel;
import tfg.backend.repositories.TipoEstadoFacturaRepository;

@Service
public class TipoEstadoFacturaService {

    @Autowired
    TipoEstadoFacturaRepository tipoEstadoFacturaRepository;

    public List<Map<String, Object>> getAllTiposEstadosFacturas() {
        List<TipoEstadoFacturaModel> listaTiposEstadosFacturas = tipoEstadoFacturaRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (TipoEstadoFacturaModel tipoEstadoFactura : listaTiposEstadosFacturas) {
            Map<String, Object> tipoEstadoFacturaMap = tipoEstadoFactura.toMap();

            resultado.add(tipoEstadoFacturaMap);
        }

        return resultado;
    }

    public TipoEstadoFacturaModel saveTipoEstadoFactura(TipoEstadoFacturaModel nuevoTipoEstadoFactura) {

        if (nuevoTipoEstadoFactura.getTipo_estado_factura() == null) {
            throw new RuntimeException("El campo 'tipo_estado_factura' no puede ser null");
        }

        if (tipoEstadoFacturaRepository.existsByTipo_estado_factura(nuevoTipoEstadoFactura.getTipo_estado_factura())) {
            throw new RuntimeException("El tipo de estado factura ya existe");
        }

        TipoEstadoFacturaModel tipoEstadoFacturaGuardado = tipoEstadoFacturaRepository.save(nuevoTipoEstadoFactura);
        return tipoEstadoFacturaGuardado;
    }

    public Map<String, Object> getTipoEstadoFacturaById(int idTipoEstadoFactura) {
        TipoEstadoFacturaModel tipoEstadoFacturaEncontrado = tipoEstadoFacturaRepository.findById(idTipoEstadoFactura)
                .orElseThrow(() -> new RuntimeException(
                        "Tipo de estado factura con id " + idTipoEstadoFactura + " no encontrado"));

        Map<String, Object> tipoEstadoFacturaMap = tipoEstadoFacturaEncontrado.toMap();

        return tipoEstadoFacturaMap;
    }

    public TipoEstadoFacturaModel updateTipoEstadoFactura(TipoEstadoFacturaModel cambiosTipoEstadoFactura,
            int idTipoEstadoFactura) {
        TipoEstadoFacturaModel tipoEstadoFacturaExistente = tipoEstadoFacturaRepository.findById(idTipoEstadoFactura)
                .orElseThrow(() -> new RuntimeException(
                        "Tipo de estado factura con id " + idTipoEstadoFactura + " no encontrado"));

        if (cambiosTipoEstadoFactura.getTipo_estado_factura() == null) {
            throw new RuntimeException("El campo 'tipo_estado_factura' no puede ser null");
        }

        if (!tipoEstadoFacturaExistente.getTipo_estado_factura()
                .equals(cambiosTipoEstadoFactura.getTipo_estado_factura())) {
            if (tipoEstadoFacturaRepository
                    .existsByTipo_estado_factura(cambiosTipoEstadoFactura.getTipo_estado_factura())) {
                throw new RuntimeException("El tipo de estado factura ya existe");
            }
            tipoEstadoFacturaExistente.setTipo_estado_factura(cambiosTipoEstadoFactura.getTipo_estado_factura());
        }

        TipoEstadoFacturaModel tipoEstadoFacturaActualizado = tipoEstadoFacturaRepository
                .save(tipoEstadoFacturaExistente);

        return tipoEstadoFacturaActualizado;
    }

    public void deleteTipoEstadoFactura(int idTipoEstadoFactura) {
        tipoEstadoFacturaRepository.findById(idTipoEstadoFactura)
                .orElseThrow(() -> new RuntimeException(
                        "Tipo de estado factura con id " + idTipoEstadoFactura + " no encontrado"));

        tipoEstadoFacturaRepository.deleteById(idTipoEstadoFactura);
    }

}