package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.PersonaModel;
import tfg.backend.models.TipoUsuarioModel;
import tfg.backend.models.UsuarioModel;
import tfg.backend.repositories.PersonaRepository;
import tfg.backend.repositories.TipoUsuarioRepository;
import tfg.backend.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TipoUsuarioRepository tipoUsuarioRepository;

    @Autowired
    private PersonaRepository personaRepository;

    public List<Map<String, Object>> getAllUsuarios() {
        List<UsuarioModel> listaUsuarios = usuarioRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (UsuarioModel usuario : listaUsuarios) {
            Map<String, Object> usuarioMap = usuario.toMap();
            // Aqui debe aparecer las claves foraneas, debo ponerlas
            usuarioMap.put("persona", usuario.getPersona() != null ? usuario.getPersona().toMap() : null);

            usuarioMap.put("tipo_usuario",
                    usuario.getTipo_usuario() != null ? usuario.getTipo_usuario().toMap() : null);

            resultado.add(usuarioMap);
        }

        return resultado;
    }

    public UsuarioModel saveUsuario(UsuarioModel nuevoPersona) { // La devuelta no sé si es la correcta (CREO QUE SÍ)

        String nombre_usuario = nuevoPersona.getNombre_usuario();

        // Comprobar campo persona
        if (nuevoPersona.getNombre_usuario() == null) {
            throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
        }

        if (nuevoPersona.getPassword() == null) {
            throw new RuntimeException("El campo 'password' no puede ser null");
        }

        if (nuevoPersona.getPersona() == null) {
            throw new RuntimeException("El objeto 'persona' no puede ser null");
        }

        if (nuevoPersona.getPersona().getId_persona() == 0) {
            throw new RuntimeException("El campo 'id_persona' no puede ser null");
        }

        if (nuevoPersona.getTipo_usuario() == null) {
            throw new RuntimeException("El objeto 'tipo_usuario' no puede ser null");
        }

        if (nuevoPersona.getTipo_usuario().getId_tipo_usuario() == 0) {
            throw new RuntimeException("El campo 'id_tipo_usuario' no puede ser null");
        }

        int id_persona = nuevoPersona.getPersona().getId_persona();

        PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                .orElseThrow(() -> new RuntimeException("Persona con id " + id_persona + " no encontrado"));

        if (usuarioRepository.existsByPersona(personaEncontrado)) {
            throw new RuntimeException("Ya existe un usuario con esa persona");
        }

        nuevoPersona.setPersona(personaEncontrado);

        int id_tipo_usuario = nuevoPersona.getTipo_usuario().getId_tipo_usuario();

        TipoUsuarioModel tipoUsuarioEncontrado = tipoUsuarioRepository.findById(id_tipo_usuario)
                .orElseThrow(() -> new RuntimeException("Tipo usuario con id " + id_tipo_usuario + " no encontrado"));

        nuevoPersona.setTipo_usuario(tipoUsuarioEncontrado);
        tipoUsuarioEncontrado.getUsuarios().add(nuevoPersona);

        // Verificar si el nombre de usuario ya existe en la base de datos
        if (usuarioRepository.existsByNombre_usuario(nombre_usuario)) {
            throw new RuntimeException("El nombre usuario ya existe");
        }

        UsuarioModel usuarioGuardado = usuarioRepository.save(nuevoPersona);

        return usuarioGuardado;
    }

    public Map<String, Object> getUsuarioById(int idUsuario) {
        UsuarioModel usuarioEncontrado = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario con id " + idUsuario + " no encontrado"));

        Map<String, Object> usuarioMap = usuarioEncontrado.toMap();

        usuarioMap.put("persona",
                usuarioEncontrado.getPersona() != null ? usuarioEncontrado.getPersona().toMap() : null);
        usuarioMap.put("tipo_usuario",
                usuarioEncontrado.getTipo_usuario() != null ? usuarioEncontrado.getTipo_usuario().toMap() : null);

        return usuarioMap;
    }

    public UsuarioModel updateUsuario(UsuarioModel cambiosUsuario, int idUsuario) {
        UsuarioModel usuarioExistente = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario con id " + idUsuario + " no encontrado"));

        // Comprobar campo persona
        if (cambiosUsuario.getNombre_usuario() == null) {
            throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
        }

        if (cambiosUsuario.getPassword() == null) {
            throw new RuntimeException("El campo 'password' no puede ser null");
        }

        if (cambiosUsuario.getPersona() == null) {
            throw new RuntimeException("El objeto 'persona' no puede ser null");
        }

        if (cambiosUsuario.getPersona().getId_persona() == 0) {
            throw new RuntimeException("El campo 'id_persona' no puede ser null");
        }

        if (cambiosUsuario.getTipo_usuario() == null) {
            throw new RuntimeException("El objeto 'tipo_usuario' no puede ser null");
        }

        if (cambiosUsuario.getTipo_usuario().getId_tipo_usuario() == 0) {
            throw new RuntimeException("El campo 'id_tipo_usuario' no puede ser null");
        }

        if (!usuarioExistente.getNombre_usuario().equals(cambiosUsuario.getNombre_usuario())) {
            if (usuarioRepository.existsByNombre_usuario(cambiosUsuario.getNombre_usuario())) {
                throw new RuntimeException("El nombre usuario ya existe");
            }
            usuarioExistente.setNombre_usuario(cambiosUsuario.getNombre_usuario());
        }

        usuarioExistente.setPassword(cambiosUsuario.getPassword());

        int id_persona = cambiosUsuario.getPersona().getId_persona();

        PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                .orElseThrow(() -> new RuntimeException("Persona con id " + id_persona + " no encontrado"));

        if (usuarioExistente.getPersona().getId_persona() != (cambiosUsuario.getPersona().getId_persona())) {
            if (usuarioRepository.existsByPersona(personaEncontrado)) {
                throw new RuntimeException("Ya existe un usuario con esa persona");
            }
            usuarioExistente.setPersona(personaEncontrado);
        }

        int id_tipo_usuario = cambiosUsuario.getTipo_usuario().getId_tipo_usuario();

        TipoUsuarioModel tipoUsuarioEncontrado = tipoUsuarioRepository.findById(id_tipo_usuario)
                .orElseThrow(() -> new RuntimeException("Tipo usuario con id " + id_tipo_usuario + " no encontrado"));

        usuarioExistente.getTipo_usuario().getUsuarios().remove(usuarioExistente);
        usuarioExistente.setTipo_usuario(tipoUsuarioEncontrado);
        tipoUsuarioEncontrado.getUsuarios().add(usuarioExistente);

        UsuarioModel usuarioActualizado = usuarioRepository.save(usuarioExistente);

        return usuarioActualizado;

    }

    public void deleteUsuario(int idUsuario) { // ESTO NO FUNCIONA, NO LO BORRA
        usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario con id " + idUsuario + " no encontrado"));
        System.out.println("SE VA A ELIMINAR" + idUsuario);
        try {
            usuarioRepository.deleteById(idUsuario);
        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
        }
    }

    // LAS DE ABAJO NO ESTAN COMPROBADAS
    public Boolean authenticateUser(UsuarioModel credencialesUsuario) {

        if (credencialesUsuario.getNombre_usuario() == null) {
            throw new RuntimeException("Falta completar el campo nombre usuario");
        }

        if (credencialesUsuario.getPassword() == null) {

            throw new RuntimeException("Falta completar el campo nombre usuario");
        }

        System.out.println(usuarioRepository.existsByNombre_usuarioAndPassword(credencialesUsuario.getNombre_usuario(),
                credencialesUsuario.getPassword()));

        if (!usuarioRepository.existsByNombre_usuarioAndPassword(credencialesUsuario.getNombre_usuario(),
                credencialesUsuario.getPassword())) {
            return false;
        }

        return true;
    }

    public Boolean updatePassword(String correoElectronico, String newPassword) {
        System.out.println("Correo electronico: " + correoElectronico + "\nnewPassword: " + newPassword);

        if (correoElectronico == null) {
            throw new RuntimeException("El campo 'correo_electronico' no puede ser null");
        }

        if (newPassword == null) {
            throw new RuntimeException("El campo 'new_password' no puede ser null");
        }

        // TODO Si es la misma contraseña que ya habia puesta lanzar un error

        PersonaModel personaEncontrada = personaRepository.findByCorreo_electronico(correoElectronico)
                .orElseThrow(() -> new RuntimeException("El correo electronico no existe"));

        UsuarioModel usuarioEncontrado = usuarioRepository.findById_persona(personaEncontrada)
                .orElseThrow(() -> new RuntimeException("La persona no existe"));

        usuarioEncontrado.setPassword(newPassword);

        usuarioRepository.save(usuarioEncontrado);

        return true;
    }

    public Map<String, Object> getUsuarioByNombreUsuario(String nombre_usuario) {
        UsuarioModel usuarioEncontrado = usuarioRepository.findByNombre_usuario(nombre_usuario).orElseThrow(
                () -> new RuntimeException("Usuario con nombre_usuario " + nombre_usuario + " no encontrado"));

        Map<String, Object> usuarioMap = usuarioEncontrado.toMap();
        usuarioMap.put("persona",
                usuarioEncontrado.getPersona() != null ? usuarioEncontrado.getPersona().toMap() : null);
        usuarioMap.put("tipo_usuario",
                usuarioEncontrado.getTipo_usuario() != null ? usuarioEncontrado.getTipo_usuario().toMap() : null);

        return usuarioMap;
    }

}