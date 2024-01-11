package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.ClienteModel;
import tfg.backend.models.PedidoClienteModel;
import tfg.backend.repositories.ClienteRepository;
import tfg.backend.repositories.PedidoClienteRepository;

@Service
public class PedidoClienteService {

        @Autowired
        private PedidoClienteRepository pedidoClienteRepository;

        @Autowired
        private ClienteRepository clienteRepository;

        public List<Map<String, Object>> getAllPedidosClientes() {
                List<PedidoClienteModel> listaPedidosClientes = pedidoClienteRepository.findAll();
                List<Map<String, Object>> resultado = new ArrayList<>();

                for (PedidoClienteModel pedidoCliente : listaPedidosClientes) {
                        Map<String, Object> pedidoClienteMap = pedidoCliente.toMap();

                        pedidoClienteMap.put("cliente",
                                        pedidoCliente.getCliente() != null
                                                        ? pedidoCliente.getCliente().toMap()
                                                        : null);

                        resultado.add(pedidoClienteMap);
                }

                return resultado;
        }

        public PedidoClienteModel savePedidoCliente(PedidoClienteModel nuevoPedidoCliente) {

                int id_cliente = nuevoPedidoCliente.getCliente().getId_cliente();

                ClienteModel clienteEncontrado = clienteRepository.findById(id_cliente)
                                .orElseThrow(() -> new RuntimeException(
                                                "Cliente con id " + id_cliente + " no encontrado"));

                nuevoPedidoCliente.setCliente(clienteEncontrado);
                clienteEncontrado.getPedidosClientes().add(nuevoPedidoCliente);

                PedidoClienteModel pedidoClienteGuardado = pedidoClienteRepository
                                .save(nuevoPedidoCliente);

                return pedidoClienteGuardado;
        }

        public Map<String, Object> getPedidoClienteById(int idPedidoCliente) {
                PedidoClienteModel pedidoClienteEncontrado = pedidoClienteRepository.findById(idPedidoCliente)
                                .orElseThrow(() -> new RuntimeException(
                                                "Pedido cliente con id " + idPedidoCliente + " no encontrado"));

                Map<String, Object> pedidoClienteMap = pedidoClienteEncontrado.toMap();

                pedidoClienteMap.put("cliente",
                                pedidoClienteEncontrado.getCliente() != null
                                                ? pedidoClienteEncontrado.getCliente().toMap()
                                                : null);

                return pedidoClienteMap;
        }

        public PedidoClienteModel updatePedidoCliente(PedidoClienteModel cambiosPedidoCliente, int idPedidoCliente) {

                PedidoClienteModel pedidoClienteExistente = pedidoClienteRepository.findById(idPedidoCliente)
                                .orElseThrow(() -> new RuntimeException(
                                                "Pedido cliente con id " + idPedidoCliente + " no encontrado"));

                // Comprobacion de campos correctos -> Ejemplo:
                /*
                 * if (cambiosUsuario.getNombre_usuario() == null) {
                 * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
                 * }
                 */

                // HACER AQUI LOS SETTER -> Ejemplo:
                // asistenciaEmpleadoExistente.setFecha(cambiosAsistenciaEmpleado.getFecha());

                int id_cliente = cambiosPedidoCliente.getCliente().getId_cliente();

                ClienteModel clienteEncontrado = clienteRepository.findById(id_cliente)
                                .orElseThrow(() -> new RuntimeException(
                                                "Cliente con id " + id_cliente + " no encontrado"));

                pedidoClienteExistente.getCliente().getPedidosClientes().remove(pedidoClienteExistente);
                pedidoClienteExistente.setCliente(clienteEncontrado);
                clienteEncontrado.getPedidosClientes().add(pedidoClienteExistente);

                PedidoClienteModel pedidoClienteActualizado = pedidoClienteRepository.save(pedidoClienteExistente);

                return pedidoClienteActualizado;
        }

        public void deletePedidoCliente(int idPedidoCliente) {
                pedidoClienteRepository.findById(idPedidoCliente)
                                .orElseThrow(() -> new RuntimeException(
                                                "Pedido cliente con id " + idPedidoCliente + " no encontrado"));

                pedidoClienteRepository.deleteById(idPedidoCliente);

        }
}
