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
import tfg.backend.models.SolicitudEmpleadoModel;
import tfg.backend.services.SolicitudEmpleadoService;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/solicitudesEmpleados")

public class SolicitudEmpleadoController {

    @Autowired
    SolicitudEmpleadoService solicitudEmpleadoService;

    // localhost:8080/solicitudesEmpleados/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allSolicitudesEmpleados = solicitudEmpleadoService.getAllSolicitudesEmpleados();
        if (allSolicitudesEmpleados.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allSolicitudesEmpleados);
        }
    }

    // localhost:8080/solicitudesEmpleados/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody SolicitudEmpleadoModel solicitudEmpleadoRequest) {
        try {
            SolicitudEmpleadoModel newSolicitudEmpleado = solicitudEmpleadoService
                    .saveSolicitudEmpleado(solicitudEmpleadoRequest);
            if (newSolicitudEmpleado == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            } else {
                return ResponseEntity.ok(solicitudEmpleadoService
                        .getSolicitudEmpleadoById(newSolicitudEmpleado.getId_solicitud_empleado()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            // No sé si en el status poner bad_request o 409
        }
    }

    // localhost:8080/solicitudesEmpleados/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedSolicitudEmpleado = solicitudEmpleadoService.getSolicitudEmpleadoById(id);
            return ResponseEntity.ok(selectedSolicitudEmpleado);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

    }

    // localhost:8080/solicitudesEmpleados/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody SolicitudEmpleadoModel solicitudEmpleadoRequest,
            @PathVariable("id") int id) {
        try {
            SolicitudEmpleadoModel updateSolicitudRequest = solicitudEmpleadoService
                    .updateSolicitudEmpleado(solicitudEmpleadoRequest, id);
            if (updateSolicitudRequest == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity.ok(solicitudEmpleadoService
                        .getSolicitudEmpleadoById(updateSolicitudRequest.getId_solicitud_empleado()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            // No sé si en el status poner bad_request o 409
        }
    }

    // localhost:8080/solicitudesEmpleados/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            solicitudEmpleadoService.deleteSolicitudEmpleado(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
