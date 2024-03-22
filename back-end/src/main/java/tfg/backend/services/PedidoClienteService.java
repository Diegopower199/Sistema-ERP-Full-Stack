package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.ClienteModel;
import tfg.backend.models.PedidoClienteModel;
import tfg.backend.models.TipoEstadoModel;
import tfg.backend.repositories.ClienteRepository;
import tfg.backend.repositories.PedidoClienteRepository;
import tfg.backend.repositories.TipoEstadoRepository;

@Service
public class PedidoClienteService {

    @Autowired
    private PedidoClienteRepository pedidoClienteRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private TipoEstadoRepository tipoEstadoRepository;

    public List<Map<String, Object>> getAllPedidosClientes() {
        List<PedidoClienteModel> listaPedidosClientes = pedidoClienteRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (PedidoClienteModel pedidoCliente : listaPedidosClientes) {
            Map<String, Object> pedidoClienteMap = pedidoCliente.toMap();

            pedidoClienteMap.put("cliente",
                    pedidoCliente.getCliente() != null ? pedidoCliente.getCliente().toMap() : null);

            pedidoClienteMap.put("tipo_estado",
                    pedidoCliente.getTipo_estado() != null ? pedidoCliente.getTipo_estado().toMap() : null);

            resultado.add(pedidoClienteMap);
        }

        return resultado;
    }

    public PedidoClienteModel savePedidoCliente(PedidoClienteModel nuevoPedidoCliente) {

        /*
         * Comprobacion de campos correctos -> Ejemplo:
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

        int id_cliente = nuevoPedidoCliente.getCliente().getId_cliente();

        ClienteModel clienteEncontrado = clienteRepository.findById(id_cliente)
                .orElseThrow(() -> new RuntimeException(
                        "Cliente con id " + id_cliente + " no encontrado"));

        nuevoPedidoCliente.setCliente(clienteEncontrado);
        clienteEncontrado.getPedidosClientes().add(nuevoPedidoCliente);

        int id_tipo_estado = nuevoPedidoCliente.getTipo_estado().getId_tipo_estado();

        TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                .orElseThrow(() -> new RuntimeException("Tipo estado con id " + id_tipo_estado + " no encontrado"));

        nuevoPedidoCliente.setTipo_estado(tipoEstadoEncontrado);
        tipoEstadoEncontrado.getPedidosClientes().add(nuevoPedidoCliente);

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
                pedidoClienteEncontrado.getCliente() != null ? pedidoClienteEncontrado.getCliente().toMap() : null);

        pedidoClienteMap.put("tipo_estado",
                pedidoClienteEncontrado.getTipo_estado() != null ? pedidoClienteEncontrado.getTipo_estado().toMap()
                        : null);

        return pedidoClienteMap;
    }

    public PedidoClienteModel updatePedidoCliente(PedidoClienteModel cambiosPedidoCliente, int idPedidoCliente) {

        PedidoClienteModel pedidoClienteExistente = pedidoClienteRepository.findById(idPedidoCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Pedido cliente con id " + idPedidoCliente + " no encontrado"));

        /*
         * Comprobacion de campos correctos -> Ejemplo:
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

        int id_tipo_estado = cambiosPedidoCliente.getTipo_estado().getId_tipo_estado();

        TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                .orElseThrow(() -> new RuntimeException("Tipo estado con id " + id_tipo_estado + " no encontrado"));

        pedidoClienteExistente.getTipo_estado().getPedidosClientes().remove(pedidoClienteExistente);
        pedidoClienteExistente.setTipo_estado(tipoEstadoEncontrado);
        tipoEstadoEncontrado.getPedidosClientes().add(pedidoClienteExistente);

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