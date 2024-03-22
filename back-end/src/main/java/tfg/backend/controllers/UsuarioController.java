package tfg.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import tfg.backend.models.UsuarioModel;
import tfg.backend.services.UsuarioService;
import tfg.backend.utils.GlobalConstants;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    // localhost:8080/usuarios/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allUsuarios = usuarioService.getAllUsuarios();

        if (allUsuarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allUsuarios);
        }
    }

    // localhost:8080/usuarios/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody UsuarioModel usuarioRequest) {
        try {
            UsuarioModel newUsuario = usuarioService.saveUsuario(usuarioRequest);

            return ResponseEntity.ok(usuarioService.getUsuarioById(newUsuario.getId_usuario()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/usuarios/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedUsuario = usuarioService.getUsuarioById(id);
            return ResponseEntity.ok(selectedUsuario);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/usuarios/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody UsuarioModel usuarioRequest,
            @PathVariable("id") int id) {
        try {
            UsuarioModel updateUsuario = usuarioService.updateUsuario(usuarioRequest, id);

            return ResponseEntity.ok(usuarioService.getUsuarioById(updateUsuario.getId_usuario()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/usuarios/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            usuarioService.deleteUsuario(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // localhost:8080/usuarios/api/login
    @PostMapping("/api/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UsuarioModel usuarioRequest) {
        try {
            boolean loginCorrect = usuarioService.authenticateUser(usuarioRequest);

            Map<String, Object> response = new HashMap<>();
            response.put("resultado", loginCorrect);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/usuarios/api/updatePassword
    @PutMapping("/api/updatePassword")
    public ResponseEntity<Map<String, Object>> updatePassword(@RequestBody Map<String, String> passwordUpdateRequest) {
        try {
            String correoElectronico = passwordUpdateRequest.get("correo_electronico");
            String newPassword = passwordUpdateRequest.get("new_password");
            // Lógica para cambiar la contraseña aquí utilizando los valores proporcionados
            boolean changePasswordResponse = usuarioService.updatePassword(correoElectronico, newPassword);

            if (changePasswordResponse) {
                Map<String, Object> response = new HashMap<>();
                response.put("resultado", true);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/usuarios/api/getByNombreUsuario/{nombre_usuario}
    @GetMapping("/api/getByNombreUsuario/{nombre_usuario}")
    public ResponseEntity<Map<String, Object>> getByNombreUsuario(
            @PathVariable("nombre_usuario") String nombre_usuario) {
        try {
            Map<String, Object> seleccionarUsuario = usuarioService.getUsuarioByNombreUsuario(nombre_usuario);
            return ResponseEntity.ok(seleccionarUsuario);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}