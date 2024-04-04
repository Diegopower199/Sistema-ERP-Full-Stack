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

import tfg.backend.models.ClienteModel;
import tfg.backend.services.ClienteService;
import tfg.backend.utils.GlobalConstants;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    ClienteService clienteService;

    // localhost:8080/clientes/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allClientes = clienteService.getAllClientes();

        if (allClientes.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allClientes);
        }
    }

    // localhost:8080/clientes/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody ClienteModel clienteRequest) {
        try {
            ClienteModel newCliente = clienteService.saveCliente(clienteRequest);

            return ResponseEntity
                    .ok(clienteService.getClienteById(newCliente.getId_cliente()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/clientes/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedCliente = clienteService.getClienteById(id);
            return ResponseEntity.ok(selectedCliente);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/clientes/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody ClienteModel clienteRequest,
            @PathVariable("id") int id) {
        try {
            ClienteModel updateCliente = clienteService.updateCliente(clienteRequest, id);

            return ResponseEntity
                    .ok(clienteService.getClienteById(updateCliente.getId_cliente()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/clientes/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            clienteService.deleteCliente(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

}