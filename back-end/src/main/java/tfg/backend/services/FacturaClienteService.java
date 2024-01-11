package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.ClienteModel;
import tfg.backend.models.FacturaClienteModel;
import tfg.backend.repositories.ClienteRepository;
import tfg.backend.repositories.FacturaClienteRepository;

@Service
public class FacturaClienteService {

        @Autowired
        private FacturaClienteRepository facturaClienteRepository;

        @Autowired
        private ClienteRepository clienteRepository;

        public List<Map<String, Object>> getAllFacturasClientes() {
                List<FacturaClienteModel> listaFacturasClientes = facturaClienteRepository.findAll();
                List<Map<String, Object>> resultado = new ArrayList<>();

                for (FacturaClienteModel facturaCliente : listaFacturasClientes) {
                        Map<String, Object> facturaClienteMap = facturaCliente.toMap();

                        facturaClienteMap.put("cliente",
                                        facturaCliente.getCliente() != null ? facturaCliente.getCliente().toMap()
                                                        : null);

                        resultado.add(facturaClienteMap);
                }

                return resultado;
        }

        public FacturaClienteModel saveFacturaCliente(FacturaClienteModel nuevoFacturaCliente) {

                int id_cliente = nuevoFacturaCliente.getCliente().getId_cliente();

                ClienteModel clienteEncontrado = clienteRepository.findById(id_cliente)
                                .orElseThrow(() -> new RuntimeException(
                                                "Cliente con id " + id_cliente + " no encontrado"));

                nuevoFacturaCliente.setCliente(clienteEncontrado);
                clienteEncontrado.getFacturasClientes().add(nuevoFacturaCliente);

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
                                facturaClienteEncontrado.getCliente() != null
                                                ? facturaClienteEncontrado.getCliente().toMap()
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
