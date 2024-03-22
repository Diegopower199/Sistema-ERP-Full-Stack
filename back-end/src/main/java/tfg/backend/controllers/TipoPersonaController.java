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

import tfg.backend.models.TipoPersonaModel;
import tfg.backend.services.TipoPersonaService;
import tfg.backend.utils.GlobalConstants;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/tiposPersonas")
public class TipoPersonaController {

    @Autowired
    TipoPersonaService tipoPersonaService;

    // localhost:8080/tiposPersonas/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allTiposPersonas = tipoPersonaService.getAllTiposPersonas();

        if (allTiposPersonas.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allTiposPersonas);
        }
    }

    // localhost:8080/tiposPersonas/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody TipoPersonaModel tipoPersonaRequest) {
        try {
            TipoPersonaModel newTipoPersona = tipoPersonaService.saveTipoPersona(tipoPersonaRequest);

            return ResponseEntity.ok(tipoPersonaService.getTipoPersonaById(newTipoPersona.getId_tipo_persona()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/tiposPersonas/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedTipoPersona = tipoPersonaService.getTipoPersonaById(id);
            return ResponseEntity.ok(selectedTipoPersona);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/tiposPersonas/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody TipoPersonaModel tipoPersonaRequest,
            @PathVariable("id") int id) {
        try {
            TipoPersonaModel updateTipoPersona = tipoPersonaService.updateTipoPersona(tipoPersonaRequest, id);

            return ResponseEntity.ok(tipoPersonaService.getTipoPersonaById(updateTipoPersona.getId_tipo_persona()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/tiposPersonas/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            tipoPersonaService.deleteTipoPersona(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}