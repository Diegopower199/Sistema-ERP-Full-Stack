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

        for (ClienteModel cliente : listaClientes) {
            Map<String, Object> clienteMap = cliente.toMap();

            resultado.add(clienteMap);
        }

        return resultado;
    }

    public ClienteModel saveCliente(ClienteModel nuevoCliente) {

        // Comprobacion de campos correctos

        ClienteModel clienteGuardado = clienteRepository.save(nuevoCliente);

        return clienteGuardado;
    }

    public Map<String, Object> getClienteById(int idCliente) {
        ClienteModel clienteEncontrado = clienteRepository.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente con id " + idCliente + " no encontrado"));

        Map<String, Object> clienteMap = clienteEncontrado.toMap();

        return clienteMap;
    }

    public ClienteModel updateCliente(ClienteModel cambiosCliente, int idCliente) {

        ClienteModel clienteExistente = clienteRepository.findById(idCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Cliente con id " + idCliente + " no encontrado"));

        // Comprobacion de campos correctos -> Ejemplo:
        /*
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

        // HACER AQUI LOS SETTER -> Ejemplo:
        // asistenciaEmpleadoExistente.setFecha(cambiosAsistenciaEmpleado.getFecha());

        ClienteModel clienteActualizado = clienteRepository.save(clienteExistente);

        return clienteActualizado;
    }

    public void deleteCliente(int idCliente) {
        clienteRepository.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente con id " + idCliente + " no encontrado"));

        clienteRepository.deleteById(idCliente);

    }
}
