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

import tfg.backend.models.PermisoUsuarioModel;
import tfg.backend.services.PermisoUsuarioService;
import tfg.backend.utils.GlobalConstants;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/permisosUsuarios")
public class PermisoUsuarioController {

    @Autowired
    PermisoUsuarioService permisoUsuarioService;

    // localhost:8080/permisosUsuarios/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allPermisosUsuarios = permisoUsuarioService.getAllPermisosUsuarios();

        if (allPermisosUsuarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allPermisosUsuarios);
        }
    }

    // localhost:8080/permisosUsuarios/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody PermisoUsuarioModel permisoUsuarioRequest) {
        try {
            PermisoUsuarioModel newPermisoUsuario = permisoUsuarioService.savePermisoUsuario(permisoUsuarioRequest);

            return ResponseEntity
                    .ok(permisoUsuarioService.getPermisoUsuarioById(newPermisoUsuario.getId_permiso_usuario()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/permisosUsuarios/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedPermisoUsuario = permisoUsuarioService.getPermisoUsuarioById(id);
            return ResponseEntity.ok(selectedPermisoUsuario);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/permisosUsuarios/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody PermisoUsuarioModel permisoUsuarioRequest,
            @PathVariable("id") int id) {
        try {
            PermisoUsuarioModel updatePermisoUsuario = permisoUsuarioService.updatePermisoUsuario(permisoUsuarioRequest,
                    id);

            return ResponseEntity
                    .ok(permisoUsuarioService.getPermisoUsuarioById(updatePermisoUsuario.getId_permiso_usuario()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/permisosUsuarios/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            permisoUsuarioService.deletePermisoUsuario(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

}