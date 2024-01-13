package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.DetalleFacturaClienteModel;
import tfg.backend.models.FacturaClienteModel;
import tfg.backend.repositories.DetalleFacturaClienteRepository;
import tfg.backend.repositories.FacturaClienteRepository;

@Service
public class DetalleFacturaClienteService {

    @Autowired
    private DetalleFacturaClienteRepository detalleFacturaClienteRepository;

    @Autowired
    private FacturaClienteRepository facturaClienteRepository;

    public List<Map<String, Object>> getAllDetallesFacturasClientes() {
        List<DetalleFacturaClienteModel> listaDetallesFacturasClientes = detalleFacturaClienteRepository
                .findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (DetalleFacturaClienteModel detalleFacturaCliente : listaDetallesFacturasClientes) {
            Map<String, Object> detalleFacturaClienteMap = detalleFacturaCliente.toMap();

            detalleFacturaClienteMap.put("factura_cliente",
                    detalleFacturaCliente.getFactura_cliente() != null
                            ? detalleFacturaCliente.getFactura_cliente().toMap()
                            : null);

            resultado.add(detalleFacturaClienteMap);
        }

        return resultado;
    }

    public DetalleFacturaClienteModel saveDetalleFacturaCliente(
            DetalleFacturaClienteModel nuevoDetalleFacturaCliente) {

        /*
         * Comprobacion de campos correctos -> Ejemplo:
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

        int id_factura_cliente = nuevoDetalleFacturaCliente.getFactura_cliente().getId_factura_cliente();

        FacturaClienteModel facturaClienteEncontrado = facturaClienteRepository.findById(id_factura_cliente)
                .orElseThrow(() -> new RuntimeException(
                        "Factura cliente con id " + id_factura_cliente + " no encontrado"));

        nuevoDetalleFacturaCliente.setFactura_cliente(facturaClienteEncontrado);
        facturaClienteEncontrado.getDetallesPedidosClientes().add(nuevoDetalleFacturaCliente);

        DetalleFacturaClienteModel detalleFacturaClienteGuardado = detalleFacturaClienteRepository
                .save(nuevoDetalleFacturaCliente);

        return detalleFacturaClienteGuardado;
    }

    public Map<String, Object> getDetalleFacturaClienteById(int idDetalleFacturaCliente) {
        DetalleFacturaClienteModel detalleFacturaClienteEncontrado = detalleFacturaClienteRepository
                .findById(idDetalleFacturaCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Detalle factura cliente con id " + idDetalleFacturaCliente
                                + " no encontrado"));

        Map<String, Object> detalleFacturaClienteMap = detalleFacturaClienteEncontrado.toMap();

        detalleFacturaClienteMap.put("factura_cliente",
                detalleFacturaClienteEncontrado.getFactura_cliente() != null
                        ? detalleFacturaClienteEncontrado.getFactura_cliente().toMap()
                        : null);

        return detalleFacturaClienteMap;
    }

    public DetalleFacturaClienteModel updateDetalleFacturaCliente(
            DetalleFacturaClienteModel cambiosDetalleFacturaCliente, int idDetalleFacturaCliente) {

        DetalleFacturaClienteModel detalleFacturaClienteExistente = detalleFacturaClienteRepository
                .findById(idDetalleFacturaCliente).orElseThrow(() -> new RuntimeException(
                        "Detalle factura cliente con id " + idDetalleFacturaCliente
                                + " no encontrado"));

        /*
         * Comprobacion de campos correctos -> Ejemplo:
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

        // HACER AQUI LOS SETTER -> Ejemplo:
        // asistenciaEmpleadoExistente.setFecha(cambiosAsistenciaEmpleado.getFecha());

        int id_factura_cliente = cambiosDetalleFacturaCliente.getFactura_cliente().getId_factura_cliente();

        FacturaClienteModel facturaClienteEncontrado = facturaClienteRepository.findById(id_factura_cliente)
                .orElseThrow(() -> new RuntimeException(
                        "Factura cliente con id " + id_factura_cliente + " no encontrado"));

        detalleFacturaClienteExistente.getFactura_cliente().getDetallesPedidosClientes()
                .remove(detalleFacturaClienteExistente);
        detalleFacturaClienteExistente.setFactura_cliente(facturaClienteEncontrado);
        facturaClienteEncontrado.getDetallesPedidosClientes().add(detalleFacturaClienteExistente);

        DetalleFacturaClienteModel detalleFacturaClienteActualizado = detalleFacturaClienteRepository
                .save(detalleFacturaClienteExistente);

        return detalleFacturaClienteActualizado;
    }

    public void deleteDetalleFacturaCliente(int idDetalleFacturaCliente) {
        detalleFacturaClienteRepository.findById(idDetalleFacturaCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Detalle factura cliente con id " + idDetalleFacturaCliente
                                + " no encontrado"));

        detalleFacturaClienteRepository.deleteById(idDetalleFacturaCliente);

    }
}
