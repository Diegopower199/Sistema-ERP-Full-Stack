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

import tfg.backend.models.TipoEstadoFacturaModel;
import tfg.backend.services.TipoEstadoFacturaService;
import tfg.backend.utils.GlobalConstants;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/tiposEstadosFacturas")
public class TipoEstadoFacturaController {

    @Autowired
    TipoEstadoFacturaService tipoEstadoFacturaService;

    // localhost:8080/tiposEstadosFacturas/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allTiposEstadosFacturas = tipoEstadoFacturaService.getAllTiposEstadosFacturas();

        if (allTiposEstadosFacturas.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allTiposEstadosFacturas);
        }
    }

    // localhost:8080/tiposEstadosFacturas/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody TipoEstadoFacturaModel tipoEstadoFacturaRequest) {
        try {
            TipoEstadoFacturaModel newTipoEstadoFactura = tipoEstadoFacturaService
                    .saveTipoEstadoFactura(tipoEstadoFacturaRequest);

            return ResponseEntity.ok(tipoEstadoFacturaService
                    .getTipoEstadoFacturaById(newTipoEstadoFactura.getId_tipo_estado_factura()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/tiposEstadosFacturas/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedTipoEstadoFactura = tipoEstadoFacturaService.getTipoEstadoFacturaById(id);
            return ResponseEntity.ok(selectedTipoEstadoFactura);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/tiposEstadosFacturas/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody TipoEstadoFacturaModel tipoEstadoFacturaRequest,
            @PathVariable("id") int id) {
        try {
            TipoEstadoFacturaModel updateTipoEstadoFactura = tipoEstadoFacturaService
                    .updateTipoEstadoFactura(tipoEstadoFacturaRequest, id);

            return ResponseEntity.ok(tipoEstadoFacturaService
                    .getTipoEstadoFacturaById(updateTipoEstadoFactura.getId_tipo_estado_factura()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/tiposEstadosFacturas/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            tipoEstadoFacturaService.deleteTipoEstadoFactura(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}