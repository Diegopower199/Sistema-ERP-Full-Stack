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

import tfg.backend.constants.GlobalConstants;
import tfg.backend.models.TipoUsuarioModel;
import tfg.backend.services.TipoUsuarioService;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/tiposUsuarios")
public class TipoUsuarioController {

    @Autowired
    TipoUsuarioService tipoUsuarioService;

    // localhost:8080/tiposUsuarios/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allTiposUsuarios = tipoUsuarioService.getAllTiposUsuarios();
        if (allTiposUsuarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allTiposUsuarios);
        }
    }

    // localhost:8080/tiposUsuarios/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody TipoUsuarioModel tipoUsuarioRequest) {
        try {
            TipoUsuarioModel newTipoUsuario = tipoUsuarioService.saveTipoUsuario(tipoUsuarioRequest);
            if (newTipoUsuario == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity.ok(tipoUsuarioService.getTipoUsuarioById(newTipoUsuario.getId_tipo_usuario()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            // No sé si en el status poner bad_request o 409
        }
    }

    // localhost:8080/tiposUsuarios/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedTipoUsuario = tipoUsuarioService.getTipoUsuarioById(id);
            return ResponseEntity.ok(selectedTipoUsuario);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

        }

    }

    // localhost:8080/tiposUsuarios/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody TipoUsuarioModel tipoUsuarioRequest,
            @PathVariable("id") int id) {
        try {
            TipoUsuarioModel updateTipoUsuario = tipoUsuarioService.updateTipoUsuario(tipoUsuarioRequest, id);
            if (updateTipoUsuario == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity.ok(tipoUsuarioService.getTipoUsuarioById(updateTipoUsuario.getId_tipo_usuario()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            // No sé si en el status poner bad_request o 409
        }
    }

    // localhost:8080/tiposUsuarios/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            tipoUsuarioService.deleteTipoUsuario(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
