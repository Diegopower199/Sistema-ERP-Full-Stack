package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.ClienteModel;
import tfg.backend.repositories.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Map<String, Object>> getAllClientes() {
        List<ClienteModel> listaClientes = clienteRepository.findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();

        return resultado;
    }

    public ClienteModel saveCliente(ClienteModel nuevoCliente) {

        return nuevoCliente;
    }

    public Map<String, Object> getClienteById(int idCliente) {
        ClienteModel clienteEncontrado = clienteRepository.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente con id " + idCliente + " no encontrado"));

        Map<String, Object> clienteMap = clienteEncontrado.toMap();

        return clienteMap;
    }

    public ClienteModel updateCliente(ClienteModel cambiosCliente, int idCliente) {

        return cambiosCliente;
    }

    public void deleteCliente(int idCliente) {
        clienteRepository.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente con id " + idCliente + " no encontrado"));

        clienteRepository.deleteById(idCliente);

    }
}
