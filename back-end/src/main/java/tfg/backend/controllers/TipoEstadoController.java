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
import tfg.backend.models.TipoEstadoModel;
import tfg.backend.services.TipoEstadoService;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/tiposEstados")
public class TipoEstadoController {

    @Autowired
    TipoEstadoService tipoEstadoService;

    // localhost:8080/tiposEstados/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allTiposEstados = tipoEstadoService.getAllTiposEstados();

        if (allTiposEstados.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allTiposEstados);
        }
    }

    // localhost:8080/tiposEstados/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody TipoEstadoModel tipoEstadoRequest) {
        try {
            TipoEstadoModel newTipoEstado = tipoEstadoService.saveTipoEstado(tipoEstadoRequest);

            if (newTipoEstado == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity.ok(tipoEstadoService.getTipoEstadoById(newTipoEstado.getId_tipo_estado()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/tiposEstados/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedTipoEstado = tipoEstadoService.getTipoEstadoById(id);
            return ResponseEntity.ok(selectedTipoEstado);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/tiposEstados/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody TipoEstadoModel tipoEstadoRequest,
            @PathVariable("id") int id) {
        try {
            TipoEstadoModel updateTipoEstado = tipoEstadoService.updateTipoEstado(tipoEstadoRequest, id);

            if (updateTipoEstado == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity.ok(tipoEstadoService.getTipoEstadoById(updateTipoEstado.getId_tipo_estado()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/tiposEstados/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            tipoEstadoService.deleteTipoEstado(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
