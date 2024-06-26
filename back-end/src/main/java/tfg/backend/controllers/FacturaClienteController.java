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

import tfg.backend.models.FacturaClienteModel;
import tfg.backend.services.FacturaClienteService;
import tfg.backend.utils.GlobalConstants;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/facturasClientes")
public class FacturaClienteController {

    @Autowired
    FacturaClienteService facturaClienteService;

    // localhost:8080/facturasClientes/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allFacturasClientes = facturaClienteService.getAllFacturasClientes();

        if (allFacturasClientes.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allFacturasClientes);
        }
    }

    // localhost:8080/facturasClientes/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody FacturaClienteModel facturaClienteRequest) {
        try {
            FacturaClienteModel newFacturaCliente = facturaClienteService.saveFacturaCliente(facturaClienteRequest);

            return ResponseEntity
                    .ok(facturaClienteService.getFacturaClienteById(newFacturaCliente.getId_factura_cliente()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/facturasClientes/api/generate
    @PostMapping("/api/generate")
    public ResponseEntity<Map<String, Object>> generate() {
        try {
            Map<String, Object> facturasClientesGeneradas = facturaClienteService.generateFacturasClientes();

            return ResponseEntity.ok().body(facturasClientesGeneradas);
        } catch (Exception e) {
            Map<String, Object> mostrarMensajeError = new HashMap<>();
            mostrarMensajeError.put("message", e.getMessage());

            return ResponseEntity.badRequest().body(mostrarMensajeError);

        }
    }

    // localhost:8080/facturasClientes/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedFacturaCliente = facturaClienteService.getFacturaClienteById(id);
            return ResponseEntity.ok(selectedFacturaCliente);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/facturasClientes/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody FacturaClienteModel facturaClienteRequest,
            @PathVariable("id") int id) {
        try {
            FacturaClienteModel updateFacturaCliente = facturaClienteService.updateFacturaCliente(facturaClienteRequest,
                    id);

            return ResponseEntity
                    .ok(facturaClienteService.getFacturaClienteById(updateFacturaCliente.getId_factura_cliente()));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/facturasClientes/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            facturaClienteService.deleteFacturaCliente(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

}