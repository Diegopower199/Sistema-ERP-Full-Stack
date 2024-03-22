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

import tfg.backend.models.BajaLaboralEmpleadoModel;
import tfg.backend.services.BajaLaboralEmpleadoService;
import tfg.backend.utils.GlobalConstants;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/bajasLaboralesEmpleados")
public class BajaLaboralEmpleadoController {

    @Autowired
    BajaLaboralEmpleadoService bajaLaboralEmpleadoService;

    // localhost:8080/bajasLaboralesEmpleados/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allBajasLaboralesEmpleados = bajaLaboralEmpleadoService
                .getAllBajasLaboralesEmpleados();

        if (allBajasLaboralesEmpleados.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allBajasLaboralesEmpleados);
        }
    }

    // localhost:8080/bajasLaboralesEmpleados/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody BajaLaboralEmpleadoModel bajaLaboralEmpleadoRequest) {
        try {
            BajaLaboralEmpleadoModel newBajaLaboralEmpleado = bajaLaboralEmpleadoService
                    .saveBajaLaboralEmpleado(bajaLaboralEmpleadoRequest);

            return ResponseEntity.ok(bajaLaboralEmpleadoService
                    .getBajaLaboralEmpleadoById(newBajaLaboralEmpleado.getId_baja_laboral_empleado()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/bajasLaboralesEmpleados/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedBajaLaboralEmpleado = bajaLaboralEmpleadoService.getBajaLaboralEmpleadoById(id);
            return ResponseEntity.ok(selectedBajaLaboralEmpleado);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/bajasLaboralesEmpleados/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody BajaLaboralEmpleadoModel bajaLaboralEmpleadoRequest,
            @PathVariable("id") int id) {
        try {
            BajaLaboralEmpleadoModel updateBajaLaboralEmpleado = bajaLaboralEmpleadoService
                    .updateBajaLaboralEmpleado(bajaLaboralEmpleadoRequest, id);

            return ResponseEntity.ok(bajaLaboralEmpleadoService
                    .getBajaLaboralEmpleadoById(updateBajaLaboralEmpleado.getId_baja_laboral_empleado()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/bajasLaboralesEmpleados/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            bajaLaboralEmpleadoService.deleteBajaLaboralEmpleado(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}