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

import tfg.backend.models.AsistenciaEmpleadoModel;
import tfg.backend.services.AsistenciaEmpleadoService;
import tfg.backend.utils.GlobalConstants;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/asistenciasEmpleados")
public class AsistenciaEmpleadoController {

    @Autowired
    AsistenciaEmpleadoService asistenciaEmpleadoService;

    // localhost:8080/asistenciasEmpleados/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allAsistenciasEmpleados = asistenciaEmpleadoService.getAllAsistenciasEmpleados();

        if (allAsistenciasEmpleados.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allAsistenciasEmpleados);
        }
    }

    // localhost:8080/asistenciasEmpleados/api/startOfWorkday
    @PostMapping("/api/startOfWorkday")
    public ResponseEntity<Map<String, Object>> startOfWorkday(
            @RequestBody AsistenciaEmpleadoModel asistenciaEmpleadoRequest) {
        try {
            AsistenciaEmpleadoModel newAsistenciaEmpleado = asistenciaEmpleadoService
                    .startOfWorkdayAsistenciaEmpleado(asistenciaEmpleadoRequest);

            return ResponseEntity.ok(asistenciaEmpleadoService
                    .getAsistenciaEmpleadoById(newAsistenciaEmpleado.getId_asistencia_empleado()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/asistenciasEmpleados/api/endOfWorkday/{id}
    @PostMapping("/api/endOfWorkday/{id}")
    public ResponseEntity<Map<String, Object>> endOfWorkday(
            @RequestBody AsistenciaEmpleadoModel asistenciaEmpleadoRequest, @PathVariable("id") int id) {
        // TODO mirarme esta funcion y completarla, hacerla en el service
        try {
            AsistenciaEmpleadoModel updateAsistenciaEmpleado = asistenciaEmpleadoService
                    .endOfWorkdayAsistenciaEmpleado(asistenciaEmpleadoRequest, id);

            return ResponseEntity.ok(asistenciaEmpleadoService
                    .getAsistenciaEmpleadoById(updateAsistenciaEmpleado.getId_asistencia_empleado()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/asistenciasEmpleados/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedAsistenciaEmpleado = asistenciaEmpleadoService.getAsistenciaEmpleadoById(id);
            return ResponseEntity.ok(selectedAsistenciaEmpleado);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/asistenciasEmpleados/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody AsistenciaEmpleadoModel asistenciaEmpleadoRequest,
            @PathVariable("id") int id) {
        try {
            AsistenciaEmpleadoModel updateAsistenciaEmpleado = asistenciaEmpleadoService
                    .updateAsistenciaEmpleado(asistenciaEmpleadoRequest, id);

            return ResponseEntity.ok(asistenciaEmpleadoService
                    .getAsistenciaEmpleadoById(updateAsistenciaEmpleado.getId_asistencia_empleado()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/asistenciasEmpleados/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            asistenciaEmpleadoService.deleteAsistenciaEmpleado(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}