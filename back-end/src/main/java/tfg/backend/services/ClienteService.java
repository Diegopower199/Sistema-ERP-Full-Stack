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

    /* ESTO LO HAGO PORQUE EL NIF SI HAY PERSONAS FISICAS ES DE UN MODO Y SI ES PERSONAS JURIDICAS DE OTRO MIRARME ESTO
     * public class ValidarNIF {

    public static void main(String[] args) {
        String regexNIFPersonasFisicas = "^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$";
        String regexNIFPersonasJuridicas = "^[A-HJNP-SUVW]{1}[0-9]{7}[0-9A-J]$";

        String ejemploNIFPersonasFisicas = "12345678A";
        String ejemploNIFPersonasJuridicas = "A1234567B";

        if (ejemploNIFPersonasFisicas.matches(regexNIFPersonasFisicas)) {
            System.out.println("El NIF de personas físicas es válido.");
        } else {
            System.out.println("El NIF de personas físicas no es válido.");
        }

        if (ejemploNIFPersonasJuridicas.matches(regexNIFPersonasJuridicas)) {
            System.out.println("El NIF de personas jurídicas es válido.");
        } else {
            System.out.println("El NIF de personas jurídicas no es válido.");
        }
    }
}

     */

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

        // Aqui el nombre_apellidos o razon_social, eebe ser uno de los dos nulos, depende del nif que arriba tenemos la diferencia

        /*
         * Comprobacion de campos correctos -> Ejemplo:
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

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
