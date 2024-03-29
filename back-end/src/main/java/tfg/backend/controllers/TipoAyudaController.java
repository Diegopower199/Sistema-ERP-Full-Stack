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

import tfg.backend.models.TipoAyudaModel;
import tfg.backend.services.TipoAyudaService;
import tfg.backend.utils.GlobalConstants;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/tiposAyudas")
public class TipoAyudaController {

    @Autowired
    TipoAyudaService tipoAyudaService;

    // localhost:8080/tiposAyudas/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allTiposAyudas = tipoAyudaService.getAllTiposAyudas();

        if (allTiposAyudas.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allTiposAyudas);
        }
    }

    // localhost:8080/tiposAyudas/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody TipoAyudaModel tipoAyudaRequest) {
        try {
            TipoAyudaModel newTipoAyuda = tipoAyudaService.saveTipoAyuda(tipoAyudaRequest);

            return ResponseEntity.ok(tipoAyudaService.getTipoAyudaById(newTipoAyuda.getId_tipo_ayuda()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/tiposAyudas/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedTipoAyuda = tipoAyudaService.getTipoAyudaById(id);
            return ResponseEntity.ok(selectedTipoAyuda);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/tiposAyudas/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody TipoAyudaModel tipoAyudaRequest,
            @PathVariable("id") int id) {
        try {
            TipoAyudaModel updateTipoAyuda = tipoAyudaService.updateTipoAyuda(tipoAyudaRequest, id);

            return ResponseEntity.ok(tipoAyudaService.getTipoAyudaById(updateTipoAyuda.getId_tipo_ayuda()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/tiposAyudas/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            tipoAyudaService.deleteTipoAyuda(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}