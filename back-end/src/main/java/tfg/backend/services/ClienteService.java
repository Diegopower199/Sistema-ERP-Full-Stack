package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.ClienteModel;
import tfg.backend.repositories.ClienteRepository;
import tfg.backend.utils.RegexPatterns;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Map<String, Object>> getAllClientes() {
        List<ClienteModel> listaClientes = clienteRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (ClienteModel cliente : listaClientes) {
            Map<String, Object> clienteMap = cliente.toMap();

            resultado.add(clienteMap);
        }

        return resultado;
    }

    public ClienteModel saveCliente(ClienteModel nuevoCliente) {

        if (nuevoCliente.getNif() == null) {
            throw new RuntimeException("El campo 'nif' no puede ser null");
        }

        if (nuevoCliente.getNumero_telefono() == null) {
            throw new RuntimeException("El campo 'numero_telefono' no puede ser null");
        }

        if (nuevoCliente.getCorreo_electronico() == null) {
            throw new RuntimeException("El campo 'correo_electronico' no puede ser null");
        }

        if (nuevoCliente.getDireccion() == null) {
            throw new RuntimeException("El campo 'direccion' no puede ser null");
        }

        if (nuevoCliente.getCodigo_postal() == null) {
            throw new RuntimeException("El campo 'codigo_postal' no puede ser null");
        }

        if (nuevoCliente.getProvincia() == null) {
            throw new RuntimeException("El campo 'provincia' no puede ser null");
        }

        if (nuevoCliente.getCiudad() == null) {
            throw new RuntimeException("El campo 'ciudad' no puede ser null");
        }

        if (nuevoCliente.getNombre_apellidos() != null) {
            if (!validarNIFPersonasFisicas(nuevoCliente.getNif())) {
                throw new RuntimeException("El nif de la persona fisica no tiene un formato válido.");
            }
        }

        if (nuevoCliente.getRazon_social() != null) {
            if (!validarNIFPersonasJuridica(nuevoCliente.getNif())) {
                throw new RuntimeException("El nif de la persona juridica no tiene un formato válido.");
            }
        }

        if (!validarEmail(nuevoCliente.getCorreo_electronico())) {
            throw new RuntimeException("El correo electrónico no tiene un formato válido.");
        }

        if (!validarNumeroTelefono(nuevoCliente.getNumero_telefono())) {
            throw new RuntimeException("El número de teléfono no tene un formato válido");
        }

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

        if (cambiosCliente.getNif() == null) {
            throw new RuntimeException("El campo 'nif' no puede ser null");
        }

        if (cambiosCliente.getNumero_telefono() == null) {
            throw new RuntimeException("El campo 'numero_telefono' no puede ser null");
        }

        if (cambiosCliente.getCorreo_electronico() == null) {
            throw new RuntimeException("El campo 'correo_electronico' no puede ser null");
        }

        if (cambiosCliente.getDireccion() == null) {
            throw new RuntimeException("El campo 'direccion' no puede ser null");
        }

        if (cambiosCliente.getCodigo_postal() == null) {
            throw new RuntimeException("El campo 'codigo_postal' no puede ser null");
        }

        if (cambiosCliente.getProvincia() == null) {
            throw new RuntimeException("El campo 'provincia' no puede ser null");
        }

        if (cambiosCliente.getCiudad() == null) {
            throw new RuntimeException("El campo 'ciudad' no puede ser null");
        }

        if (cambiosCliente.getNombre_apellidos() != null) {
            if (!validarNIFPersonasFisicas(cambiosCliente.getNif())) {
                throw new RuntimeException("El nif de la persona fisica no tiene un formato válido.");
            }
        }

        if (cambiosCliente.getRazon_social() != null) {
            if (!validarNIFPersonasJuridica(cambiosCliente.getNif())) {
                throw new RuntimeException("El nif de la persona juridica no tiene un formato válido.");
            }
        }

        if (!validarEmail(cambiosCliente.getCorreo_electronico())) {
            throw new RuntimeException("El correo electrónico no tiene un formato válido.");
        }

        if (!validarNumeroTelefono(cambiosCliente.getNumero_telefono())) {
            throw new RuntimeException("El número de teléfono no tene un formato válido");
        }

        clienteExistente.setNif(cambiosCliente.getNif());
        clienteExistente.setNombre_apellidos(cambiosCliente.getNombre_apellidos());
        clienteExistente.setRazon_social(cambiosCliente.getRazon_social());
        clienteExistente.setNumero_telefono(cambiosCliente.getNumero_telefono());
        clienteExistente.setCorreo_electronico(cambiosCliente.getCorreo_electronico());
        clienteExistente.setDireccion(cambiosCliente.getDireccion());
        clienteExistente.setCodigo_postal(cambiosCliente.getCodigo_postal());
        clienteExistente.setCiudad(cambiosCliente.getCiudad());
        clienteExistente.setProvincia(cambiosCliente.getProvincia());

        ClienteModel clienteActualizado = clienteRepository.save(clienteExistente);

        return clienteActualizado;
    }

    public void deleteCliente(int idCliente) {
        clienteRepository.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente con id " + idCliente + " no encontrado"));

        clienteRepository.deleteById(idCliente);

    }

    private static boolean validarNIFPersonasFisicas(String nifPersonaFisica) {
        Pattern pattern = Pattern.compile(RegexPatterns.REGEX_NIF_PERSONAS_FISICAS);
        Matcher matcher = pattern.matcher(nifPersonaFisica);

        return matcher.matches();
    }

    private static boolean validarNIFPersonasJuridica(String nifPersonaJuridica) {
        Pattern pattern = Pattern.compile(RegexPatterns.REGEX_NIF_PERSONAS_JURIDICAS);
        Matcher matcher = pattern.matcher(nifPersonaJuridica);

        return matcher.matches();
    }

    private static boolean validarEmail(String email) {
        Pattern pattern = Pattern.compile(RegexPatterns.REGEX_EMAIL);
        Matcher matcher = pattern.matcher(email);

        return matcher.matches();
    }

    private static boolean validarNumeroTelefono(String telefono) {
        Pattern pattern = Pattern.compile(RegexPatterns.REGEX_TELEFONO_CON_PREFIJO);
        Matcher matcher = pattern.matcher(telefono);

        return matcher.matches();
    }

}