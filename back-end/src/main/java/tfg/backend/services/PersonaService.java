package tfg.backend.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.PersonaModel;
import tfg.backend.models.TipoPersonaModel;
import tfg.backend.repositories.PersonaRepository;
import tfg.backend.repositories.TipoPersonaRepository;
import tfg.backend.utils.RegexPatterns;

@Service
public class PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private TipoPersonaRepository tipoPersonaRepository;

    public List<Map<String, Object>> getAllPersonas() {
        List<PersonaModel> listaPersonas = personaRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (PersonaModel persona : listaPersonas) {
            Map<String, Object> personaMap = persona.toMap();

            personaMap.put("tipo_persona",
                    persona.getTipo_persona() != null ? persona.getTipo_persona().toMap() : null);

            resultado.add(personaMap);
        }

        return resultado;
    }

    public List<Map<String, Object>> getAllEmpleadosAndBecarios() {
        List<PersonaModel> listaPersonas = personaRepository.findAllTipoPersonaEmpleadosAndBecariosOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (PersonaModel persona : listaPersonas) {
            Map<String, Object> personaMap = persona.toMap();

            personaMap.put("tipo_persona",
                    persona.getTipo_persona() != null ? persona.getTipo_persona().toMap() : null);

            resultado.add(personaMap);
        }

        return resultado;
    }

    public PersonaModel savePersona(PersonaModel nuevoPersona) {
        int numero_empleado = nuevoPersona.getNumero_empleado();
        String nombre = nuevoPersona.getNombre();
        String apellidos = nuevoPersona.getApellidos();
        String genero = nuevoPersona.getGenero();
        LocalDate fecha_nacimiento = nuevoPersona.getFecha_nacimiento();
        String dni = nuevoPersona.getDni();
        String direccion = nuevoPersona.getDireccion();
        String numero_telefono = nuevoPersona.getNumero_telefono();
        String correo_electronico = nuevoPersona.getCorreo_electronico();

        if (numero_empleado == 0) {
            throw new RuntimeException("El campo 'numero_empleado' no puede ser 0");
        }

        if (nombre == null) {
            throw new RuntimeException("El campo 'nombre' no puede ser null");
        }

        if (apellidos == null) {
            throw new RuntimeException("El campo 'apellidos' no puede ser null");
        }

        if (genero == null) {
            throw new RuntimeException("El campo 'genero' no puede ser null");
        }

        if (fecha_nacimiento == null) {
            throw new RuntimeException("El campo 'fecha_nacimiento' no puede ser null");
        }

        if (dni == null) {
            throw new RuntimeException("El campo 'dni' no puede ser null");
        }

        if (direccion == null) {
            throw new RuntimeException("El campo 'direccion' no puede ser null");
        }

        if (numero_telefono == null) {
            throw new RuntimeException("El campo 'numero_telefono' no puede ser null");
        }

        if (correo_electronico == null) {
            throw new RuntimeException("El campo 'correo_electronico' no puede ser null");
        }

        if (personaRepository.existsByNumero_empleado(numero_empleado)) {
            throw new RuntimeException("El numero empleado ya existe para una persona");
        }

        if (personaRepository.existsByDni(dni)) {
            throw new RuntimeException("El dni ya existe para una persona");
        }

        if (personaRepository.existsBynumero_telefono(numero_telefono)) {
            throw new RuntimeException("El numero de telefono ya existe para una persona");
        }

        if (personaRepository.existsBycorreo_electronico(correo_electronico)) {
            throw new RuntimeException("El correo electronico ya existe para una persona");
        }

        if (!validarDNI(dni)) {
            throw new RuntimeException("El DNI no tiene un formato válido.");
        }

        if (!validarEmail(correo_electronico)) {
            throw new RuntimeException("El correo electrónico no tiene un formato válido.");
        }

        if (!validarNumeroTelefono(numero_telefono)) {
            throw new RuntimeException("El número de teléfono no tene un formato válido");
        }

        int id_tipo_persona = nuevoPersona.getTipo_persona().getId_tipo_persona();

        TipoPersonaModel tipoPersonaEncontrado = tipoPersonaRepository.findById(id_tipo_persona)
                .orElseThrow(() -> new RuntimeException("Tipo persona con id " + id_tipo_persona + " no encontrado"));
        nuevoPersona.setTipo_persona(tipoPersonaEncontrado);
        tipoPersonaEncontrado.getPersonas().add(nuevoPersona);

        PersonaModel personaGuardado = personaRepository.save(nuevoPersona);
        return personaGuardado;
    }

    public Map<String, Object> getPersonaById(int idPersona) {
        PersonaModel personaEncontrado = personaRepository.findById(idPersona)
                .orElseThrow(() -> new RuntimeException("Persona con id " + idPersona + " no encontrado"));

        Map<String, Object> personaMap = personaEncontrado.toMap();

        personaMap.put("tipo_persona",
                personaEncontrado.getTipo_persona() != null ? personaEncontrado.getTipo_persona().toMap() : null);

        return personaMap;
    }

    public PersonaModel updatePersona(PersonaModel cambiosPersona, int idPersona) {
        PersonaModel personaExistente = personaRepository.findById(idPersona)
                .orElseThrow(() -> new RuntimeException("Persona con id " + idPersona + " no encontrado"));

        personaExistente.setNombre(cambiosPersona.getNombre());
        personaExistente.setApellidos(cambiosPersona.getApellidos());
        personaExistente.setGenero(cambiosPersona.getGenero());
        personaExistente.setFecha_nacimiento(cambiosPersona.getFecha_nacimiento());
        personaExistente.setDireccion(cambiosPersona.getDireccion());

        if (personaExistente.getNumero_empleado() != cambiosPersona.getNumero_empleado()) {
            if (personaRepository.existsByNumero_empleado(cambiosPersona.getNumero_empleado())) {
                throw new RuntimeException("El numero empleado ya existe para una persona");
            }
            personaExistente.setNumero_empleado(cambiosPersona.getNumero_empleado());
        }

        if (!personaExistente.getDni().equals(cambiosPersona.getDni())) {
            if (personaRepository.existsByDni(cambiosPersona.getDni())) {
                throw new RuntimeException("El dni ya existe para una persona");
            }
            personaExistente.setDni(cambiosPersona.getDni());
        }

        if (!personaExistente.getNumero_telefono().equals(cambiosPersona.getNumero_telefono())) {
            if (personaRepository.existsBynumero_telefono(cambiosPersona.getNumero_telefono())) {
                throw new RuntimeException("El numero de telefono ya existe para una persona");
            }
            personaExistente.setNumero_telefono(cambiosPersona.getNumero_telefono());
        }

        if (!personaExistente.getCorreo_electronico().equals(cambiosPersona.getCorreo_electronico())) {
            if (personaRepository.existsBycorreo_electronico(cambiosPersona.getCorreo_electronico())) {
                throw new RuntimeException("El correo electronico ya existe para una persona");
            }
            personaExistente.setCorreo_electronico(cambiosPersona.getCorreo_electronico());
        }

        int id_tipo_persona = cambiosPersona.getTipo_persona().getId_tipo_persona();

        TipoPersonaModel tipoPersonaEncontrado = tipoPersonaRepository
                .findById(cambiosPersona.getTipo_persona().getId_tipo_persona())
                .orElseThrow(() -> new RuntimeException("Tipo persona con id " + id_tipo_persona + " no encontrado"));

        personaExistente.getTipo_persona().getPersonas().remove(personaExistente);
        personaExistente.setTipo_persona(tipoPersonaEncontrado);
        tipoPersonaEncontrado.getPersonas().add(personaExistente);

        PersonaModel personaActualizado = personaRepository.save(personaExistente);

        return personaActualizado;

    }

    public void deletePersona(int idPersona) {
        personaRepository.findById(idPersona)
                .orElseThrow(() -> new RuntimeException("Persona con id " + idPersona + " no encontrado"));

        personaRepository.deleteById(idPersona);

    }

    public Boolean existsCorreoElectronico(String correo_electronico) {

        if (!personaRepository.existsBycorreo_electronico(correo_electronico)) {
            return false;
        }

        return true;
    }

    private static boolean validarDNI(String dni) {
        Pattern pattern = Pattern.compile(RegexPatterns.REGEX_DNI);
        Matcher matcher = pattern.matcher(dni);

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