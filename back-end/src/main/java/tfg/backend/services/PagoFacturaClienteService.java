package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.FacturaClienteModel;
import tfg.backend.models.PagoFacturaClienteModel;
import tfg.backend.repositories.FacturaClienteRepository;
import tfg.backend.repositories.PagoFacturaClienteRepository;

@Service
public class PagoFacturaClienteService {

    @Autowired
    private PagoFacturaClienteRepository pagoFacturaClienteRepository;

    @Autowired
    private FacturaClienteRepository facturaClienteRepository;

    public List<Map<String, Object>> getAllPagosFacturasClientes() {
        List<PagoFacturaClienteModel> listaPagosFacturasClientes = pagoFacturaClienteRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (PagoFacturaClienteModel pagoFacturaCliente : listaPagosFacturasClientes) {
            Map<String, Object> pagoFacturaClienteMap = pagoFacturaCliente.toMap();

            pagoFacturaClienteMap.put("factura_cliente",
                    pagoFacturaCliente.getFactura_cliente() != null
                            ? pagoFacturaCliente.getFactura_cliente().toMap()
                            : null);

            resultado.add(pagoFacturaClienteMap);
        }

        return resultado;
    }

    public PagoFacturaClienteModel savePagoFacturaCliente(PagoFacturaClienteModel nuevoPagoFacturaCliente) {

        /*
         * Comprobacion de campos correctos -> Ejemplo:
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

        int id_factura_cliente = nuevoPagoFacturaCliente.getFactura_cliente().getId_factura_cliente();

        FacturaClienteModel facturaClienteEncontrado = facturaClienteRepository.findById(id_factura_cliente)
                .orElseThrow(() -> new RuntimeException(
                        "Factura cliente con id " + id_factura_cliente + " no encontrado"));

        nuevoPagoFacturaCliente.setFactura_cliente(facturaClienteEncontrado);
        facturaClienteEncontrado.getPagosFacturasClientes().add(nuevoPagoFacturaCliente);

        PagoFacturaClienteModel pagoFacturaClienteGuardado = pagoFacturaClienteRepository
                .save(nuevoPagoFacturaCliente);

        return pagoFacturaClienteGuardado;
    }

    public Map<String, Object> getPagoFacturaClienteById(int idPagoFacturaCliente) {
        PagoFacturaClienteModel pagoFacturaClienteEncontrado = pagoFacturaClienteRepository
                .findById(idPagoFacturaCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Pago factura cliente con id " + idPagoFacturaCliente
                                + " no encontrado"));

        Map<String, Object> pagoFacturaClienteMap = pagoFacturaClienteEncontrado.toMap();

        pagoFacturaClienteMap.put("factura_cliente",
                pagoFacturaClienteEncontrado.getFactura_cliente() != null
                        ? pagoFacturaClienteEncontrado.getFactura_cliente().toMap()
                        : null);

        return pagoFacturaClienteMap;
    }

    public PagoFacturaClienteModel updatePagoFacturaCliente(PagoFacturaClienteModel cambiosPagoFacturaCliente,
            int idPagoFacturaCliente) {

        PagoFacturaClienteModel pagoFacturaClienteExistente = pagoFacturaClienteRepository
                .findById(idPagoFacturaCliente).orElseThrow(() -> new RuntimeException(
                        "Pago factura cliente con id " + idPagoFacturaCliente
                                + " no encontrado"));

        // Comprobacion de campos correctos -> Ejemplo:
        /*
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

        // HACER AQUI LOS SETTER -> Ejemplo:
        // asistenciaEmpleadoExistente.setFecha(cambiosAsistenciaEmpleado.getFecha());

        int id_factura_cliente = cambiosPagoFacturaCliente.getFactura_cliente().getId_factura_cliente();

        FacturaClienteModel facturaClienteEncontrado = facturaClienteRepository.findById(id_factura_cliente)
                .orElseThrow(() -> new RuntimeException(
                        "Factura cliente con id " + id_factura_cliente + " no encontrado"));

        pagoFacturaClienteExistente.getFactura_cliente().getPagosFacturasClientes()
                .remove(pagoFacturaClienteExistente);
        pagoFacturaClienteExistente.setFactura_cliente(facturaClienteEncontrado);
        facturaClienteEncontrado.getPagosFacturasClientes().add(pagoFacturaClienteExistente);

        PagoFacturaClienteModel pagoFacturaClienteActualizado = pagoFacturaClienteRepository
                .save(pagoFacturaClienteExistente);

        return pagoFacturaClienteActualizado;
    }

    public void deletePagoFacturaCliente(int idPagoFacturaCliente) {
        pagoFacturaClienteRepository.findById(idPagoFacturaCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Pago factura cliente con id " + idPagoFacturaCliente
                                + " no encontrado"));

        pagoFacturaClienteRepository.deleteById(idPagoFacturaCliente);

    }
}
