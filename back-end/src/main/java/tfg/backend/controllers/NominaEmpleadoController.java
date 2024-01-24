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
import tfg.backend.models.NominaEmpleadoModel;
import tfg.backend.services.NominaEmpleadoService;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/nominasEmpleados")
public class NominaEmpleadoController {

    @Autowired
    NominaEmpleadoService nominaEmpleadoService;

    // localhost:8080/nominasEmpleados/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allNominasEmpleados = nominaEmpleadoService.getAllNominasEmpleados();

        if (allNominasEmpleados.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allNominasEmpleados);
        }
    }

    // localhost:8080/nominasEmpleados/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody NominaEmpleadoModel nominaEmpleadoRequest) {
        try {
            NominaEmpleadoModel newNominaEmpleado = nominaEmpleadoService.saveNominaEmpleado(nominaEmpleadoRequest);

            if (newNominaEmpleado == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            } else {
                return ResponseEntity
                        .ok(nominaEmpleadoService.getNominaEmpleadoById(newNominaEmpleado.getId_nomina_empleado()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/nominasEmpleados/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedNominaEmpleado = nominaEmpleadoService.getNominaEmpleadoById(id);
            return ResponseEntity.ok(selectedNominaEmpleado);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/nominasEmpleados/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody NominaEmpleadoModel nominaEmpleadoRequest,
            @PathVariable("id") int id) {
        try {
            NominaEmpleadoModel updateNominaEmpleado = nominaEmpleadoService.updateNominaEmpleado(nominaEmpleadoRequest,
                    id);

            if (updateNominaEmpleado == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity
                        .ok(nominaEmpleadoService.getNominaEmpleadoById(updateNominaEmpleado.getId_nomina_empleado()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/nominasEmpleados/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            nominaEmpleadoService.deleteNominaEmpleado(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
