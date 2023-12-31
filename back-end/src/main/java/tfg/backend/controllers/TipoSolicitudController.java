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
import tfg.backend.models.TipoSolicitudModel;
import tfg.backend.services.TipoSolicitudService;



@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/tiposSolicitudes")
public class TipoSolicitudController {

    @Autowired
    TipoSolicitudService tipoSolicitudService;

    // localhost:8080/tiposSolicitudes/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allTiposSolicitudes = tipoSolicitudService.getAllTiposSolicitudes();
        if (allTiposSolicitudes.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allTiposSolicitudes);
        }
    }

    // localhost:8080/tiposSolicitudes/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody TipoSolicitudModel tipoSolicitudRequest) {
        try {
            TipoSolicitudModel newTipoSolicitud = tipoSolicitudService.saveTipoSolicitud(tipoSolicitudRequest);
            if (newTipoSolicitud == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity
                        .ok(tipoSolicitudService.getTipoSolicitudById(newTipoSolicitud.getId_tipo_solicitud()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            // No sé si en el status poner bad_request o 409
        }
    }

    // localhost:8080/tiposSolicitudes/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedTipoSolicitud = tipoSolicitudService.getTipoSolicitudById(id);
            return ResponseEntity.ok(selectedTipoSolicitud);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

        }

    }

    // localhost:8080/tiposSolicitudes/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody TipoSolicitudModel tipoSolicitudRequest,
            @PathVariable("id") int id) {
        try {
            TipoSolicitudModel updateTipoSolicitud = tipoSolicitudService.updateTipoSolicitud(tipoSolicitudRequest, id);
            if (updateTipoSolicitud == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity
                        .ok(tipoSolicitudService.getTipoSolicitudById(updateTipoSolicitud.getId_tipo_solicitud()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            // No sé si en el status poner bad_request o 409
        }
    }

    // localhost:8080/tiposSolicitudes/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            tipoSolicitudService.deleteTipoSolicitud(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
