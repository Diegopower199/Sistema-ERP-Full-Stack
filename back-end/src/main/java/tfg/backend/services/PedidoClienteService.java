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

        return resultado;
    }

    public PedidoClienteModel savePedidoCliente(PedidoClienteModel nuevoPedidoCliente) {

        return nuevoPedidoCliente;
    }

    public Map<String, Object> getPedidoClienteById(int idPedidoCliente) {
        PedidoClienteModel pedidoClienteEncontrado = pedidoClienteRepository.findById(idPedidoCliente)
                .orElseThrow(() -> new RuntimeException("Pedido cliente con id " + idPedidoCliente + " no encontrado"));

        Map<String, Object> pedidoClienteMap = pedidoClienteEncontrado.toMap();

        return pedidoClienteMap;
    }

    public PedidoClienteModel updatePedidoCliente(PedidoClienteModel cambiosPedidoCliente, int idPedidoCliente) {

        return cambiosPedidoCliente;
    }

    public void deletePedidoCliente(int idPedidoCliente) {
        pedidoClienteRepository.findById(idPedidoCliente)
                .orElseThrow(() -> new RuntimeException("Pedido cliente con id " + idPedidoCliente + " no encontrado"));

        pedidoClienteRepository.deleteById(idPedidoCliente);

    }
}
