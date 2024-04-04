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

import tfg.backend.models.MotivoBajaModel;
import tfg.backend.services.MotivoBajaService;
import tfg.backend.utils.GlobalConstants;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/motivosBajas")
public class MotivoBajaController {

    @Autowired
    MotivoBajaService motivoBajaService;

    // localhost:8080/motivosBajas/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allMotivosBajas = motivoBajaService.getAllMotivosBajas();

        if (allMotivosBajas.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allMotivosBajas);
        }
    }

    // localhost:8080/motivosBajas/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody MotivoBajaModel motivoBajaRequest) {
        try {
            MotivoBajaModel newMotivoBaja = motivoBajaService.saveMotivoBaja(motivoBajaRequest);

            return ResponseEntity.ok(motivoBajaService.getMotivoBajaById(newMotivoBaja.getId_motivo_baja()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/motivosBajas/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedMotivoBaja = motivoBajaService.getMotivoBajaById(id);
            return ResponseEntity.ok(selectedMotivoBaja);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/motivosBajas/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody MotivoBajaModel motivoBajaRequest,
            @PathVariable("id") int id) {
        try {
            MotivoBajaModel updateMotivoBaja = motivoBajaService.updateMotivoBaja(motivoBajaRequest, id);

            return ResponseEntity.ok(motivoBajaService.getMotivoBajaById(updateMotivoBaja.getId_motivo_baja()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/motivosBajas/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            motivoBajaService.deleteMotivoBaja(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

}