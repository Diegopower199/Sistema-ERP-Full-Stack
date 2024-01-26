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

import tfg.backend.models.PersonaModel;
import tfg.backend.services.PersonaService;
import tfg.backend.utils.GlobalConstants;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/personas")
public class PersonaController {

    @Autowired
    PersonaService personaService;

    // localhost:8080/personas/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allPersonas = personaService.getAllPersonas();

        if (allPersonas.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allPersonas);
        }
    }

    // localhost:8080/personas/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody PersonaModel personaRequest) {
        try {
            PersonaModel newPersona = personaService.savePersona(personaRequest);

            return ResponseEntity.ok(personaService.getPersonaById(newPersona.getId_persona()));

        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/personas/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedPersona = personaService.getPersonaById(id);
            return ResponseEntity.ok(selectedPersona);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/personas/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody PersonaModel personaRequest,
            @PathVariable("id") int id) {
        try {
            PersonaModel updatePersona = personaService.updatePersona(personaRequest, id);

            return ResponseEntity.ok(personaService.getPersonaById(updatePersona.getId_persona()));

        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/personas/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            personaService.deletePersona(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
