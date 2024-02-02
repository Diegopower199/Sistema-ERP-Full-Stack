package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.ClienteModel;
import tfg.backend.models.FacturaClienteModel;
import tfg.backend.models.TipoEstadoModel;
import tfg.backend.repositories.ClienteRepository;
import tfg.backend.repositories.FacturaClienteRepository;
import tfg.backend.repositories.TipoEstadoRepository;

@Service
public class FacturaClienteService {

    @Autowired
    private FacturaClienteRepository facturaClienteRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private TipoEstadoRepository tipoEstadoRepository;

    public List<Map<String, Object>> getAllFacturasClientes() {
        List<FacturaClienteModel> listaFacturasClientes = facturaClienteRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (FacturaClienteModel facturaCliente : listaFacturasClientes) {
            Map<String, Object> facturaClienteMap = facturaCliente.toMap();

            facturaClienteMap.put("cliente",
                    facturaCliente.getCliente() != null ? facturaCliente.getCliente().toMap() : null);

            facturaClienteMap.put("tipo_estado",
                    facturaCliente.getTipo_estado() != null ? facturaCliente.getTipo_estado().toMap() : null);

            resultado.add(facturaClienteMap);
        }

        return resultado;
    }

    public FacturaClienteModel saveFacturaCliente(FacturaClienteModel nuevoFacturaCliente) {

        /*
         * Comprobacion de campos correctos -> Ejemplo:
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

        int id_cliente = nuevoFacturaCliente.getCliente().getId_cliente();

        ClienteModel clienteEncontrado = clienteRepository.findById(id_cliente)
                .orElseThrow(() -> new RuntimeException(
                        "Cliente con id " + id_cliente + " no encontrado"));

        nuevoFacturaCliente.setCliente(clienteEncontrado);
        clienteEncontrado.getFacturasClientes().add(nuevoFacturaCliente);

        int id_tipo_estado = nuevoFacturaCliente.getTipo_estado().getId_tipo_estado();

        TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                .orElseThrow(() -> new RuntimeException("Tipo estado con id " + id_tipo_estado + " no encontrado"));

        nuevoFacturaCliente.setTipo_estado(tipoEstadoEncontrado);
        tipoEstadoEncontrado.getFacturasClientes().add(nuevoFacturaCliente);

        FacturaClienteModel facturaClienteGuardado = facturaClienteRepository
                .save(nuevoFacturaCliente);

        return facturaClienteGuardado;
    }

    public Map<String, Object> getFacturaClienteById(int idFacturaCliente) {
        FacturaClienteModel facturaClienteEncontrado = facturaClienteRepository.findById(idFacturaCliente)
                .orElseThrow(
                        () -> new RuntimeException("Factura cliente con id " + idFacturaCliente
                                + " no encontrado"));

        Map<String, Object> facturaClienteMap = facturaClienteEncontrado.toMap();

        facturaClienteMap.put("cliente",
                facturaClienteEncontrado.getCliente() != null ? facturaClienteEncontrado.getCliente().toMap() : null);

        facturaClienteMap.put("tipo_estado",
                facturaClienteEncontrado.getTipo_estado() != null ? facturaClienteEncontrado.getTipo_estado().toMap()
                        : null);

        return facturaClienteMap;
    }

    public FacturaClienteModel updateFacturaCliente(FacturaClienteModel cambiosFacturaCliente,
            int idFacturaCliente) {

        FacturaClienteModel facturaClienteExistente = facturaClienteRepository.findById(idFacturaCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Factura cliente con id " + idFacturaCliente + " no encontrado"));

        // Comprobacion de campos correctos -> Ejemplo:
        /*
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

        // HACER AQUI LOS SETTER -> Ejemplo:
        // asistenciaEmpleadoExistente.setFecha(cambiosAsistenciaEmpleado.getFecha());

        int id_cliente = cambiosFacturaCliente.getCliente().getId_cliente();

        ClienteModel clienteEncontrado = clienteRepository.findById(id_cliente)
                .orElseThrow(() -> new RuntimeException(
                        "Cliente con id " + id_cliente + " no encontrado"));

        facturaClienteExistente.getCliente().getFacturasClientes().remove(facturaClienteExistente);
        facturaClienteExistente.setCliente(clienteEncontrado);
        clienteEncontrado.getFacturasClientes().add(facturaClienteExistente);

        int id_tipo_estado = cambiosFacturaCliente.getTipo_estado().getId_tipo_estado();

        TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                .orElseThrow(() -> new RuntimeException("Tipo estado con id " + id_tipo_estado + " no encontrado"));

        facturaClienteExistente.getTipo_estado().getFacturasClientes().remove(facturaClienteExistente);
        facturaClienteExistente.setTipo_estado(tipoEstadoEncontrado);
        tipoEstadoEncontrado.getFacturasClientes().add(facturaClienteExistente);

        FacturaClienteModel facturaClienteActualizado = facturaClienteRepository
                .save(facturaClienteExistente);

        return facturaClienteActualizado;
    }

    public void deleteFacturaCliente(int idFacturaCliente) {
        facturaClienteRepository.findById(idFacturaCliente)
                .orElseThrow(
                        () -> new RuntimeException("Factura cliente con id " + idFacturaCliente
                                + " no encontrado"));

        facturaClienteRepository.deleteById(idFacturaCliente);

    }
}
