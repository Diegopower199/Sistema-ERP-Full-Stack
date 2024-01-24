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
import tfg.backend.models.AyudaEmpleadoModel;
import tfg.backend.services.AyudaEmpleadoService;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/ayudasEmpleados")
public class AyudaEmpleadoController {

    @Autowired
    AyudaEmpleadoService ayudaEmpleadoService;

    // localhost:8080/ayudasEmpleados/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allAyudasEmpleados = ayudaEmpleadoService.getAllAyudasEmpleados();

        if (allAyudasEmpleados.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allAyudasEmpleados);
        }
    }

    // localhost:8080/ayudasEmpleados/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody AyudaEmpleadoModel ayudaEmpleadoRequest) {
        try {
            AyudaEmpleadoModel newAyudaEmpleado = ayudaEmpleadoService.saveAyudaEmpleado(ayudaEmpleadoRequest);

            if (newAyudaEmpleado == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            } else {
                return ResponseEntity
                        .ok(ayudaEmpleadoService.getAyudaEmpleadoById(newAyudaEmpleado.getId_ayuda_empleado()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/ayudasEmpleados/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedAyudaEmpleado = ayudaEmpleadoService.getAyudaEmpleadoById(id);
            return ResponseEntity.ok(selectedAyudaEmpleado);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/ayudasEmpleados/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody AyudaEmpleadoModel ayudaEmpleadoRequest,
            @PathVariable("id") int id) {
        try {
            AyudaEmpleadoModel updateAyudaEmpleado = ayudaEmpleadoService.updateAyudaEmpleado(ayudaEmpleadoRequest, id);

            if (updateAyudaEmpleado == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity
                        .ok(ayudaEmpleadoService.getAyudaEmpleadoById(updateAyudaEmpleado.getId_ayuda_empleado()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/ayudasEmpleados/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            ayudaEmpleadoService.deleteAyudaEmpleado(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
