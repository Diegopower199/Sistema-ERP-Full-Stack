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
import tfg.backend.models.VacacionEmpleadoModel;
import tfg.backend.services.VacacionEmpleadoService;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/vacacionesEmpleados")
public class VacacionEmpleadoController {

    @Autowired
    VacacionEmpleadoService vacacionEmpleadoService;

    // localhost:8080/vacacionesEmpleados/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allVacacionesEmpleados = vacacionEmpleadoService.getAllVacacionesEmpleados();

        if (allVacacionesEmpleados.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allVacacionesEmpleados);
        }
    }

    // localhost:8080/vacacionesEmpleados/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody VacacionEmpleadoModel vacacionEmpleadoRequest) {
        try {
            VacacionEmpleadoModel newVacacionEmpleado = vacacionEmpleadoService
                    .saveVacacionEmpleado(vacacionEmpleadoRequest);

            if (newVacacionEmpleado == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            } else {
                return ResponseEntity.ok(vacacionEmpleadoService
                        .getVacacionEmpleadoById(newVacacionEmpleado.getId_vacacion_empleado()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/vacacionesEmpleados/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedVacacionEmpleado = vacacionEmpleadoService.getVacacionEmpleadoById(id);
            return ResponseEntity.ok(selectedVacacionEmpleado);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/vacacionesEmpleados/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody VacacionEmpleadoModel vacacionEmpleadoRequest,
            @PathVariable("id") int id) {
        try {
            VacacionEmpleadoModel updateVacacionEmpleado = vacacionEmpleadoService
                    .updateVacacionEmpleado(vacacionEmpleadoRequest, id);

            if (updateVacacionEmpleado == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity.ok(vacacionEmpleadoService
                        .getVacacionEmpleadoById(updateVacacionEmpleado.getId_vacacion_empleado()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/vacacionesEmpleados/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            vacacionEmpleadoService.deleteVacacionEmpleado(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
