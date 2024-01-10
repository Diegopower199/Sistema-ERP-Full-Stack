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
import tfg.backend.models.DetalleFacturaClienteModel;
import tfg.backend.services.DetalleFacturaClienteService;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/detallesFacturasClientes")
public class DetalleFacturaClienteController {

    @Autowired
    DetalleFacturaClienteService detalleFacturaClienteService;

    // localhost:8080/detallesFacturasClientes/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allDetallesFacturasClientes = detalleFacturaClienteService
                .getAllDetallesFacturasClientes();
        if (allDetallesFacturasClientes.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allDetallesFacturasClientes);
        }
    }

    // localhost:8080/detallesFacturasClientes/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(
            @RequestBody DetalleFacturaClienteModel detalleFacturaClienteRequest) {
        try {
            DetalleFacturaClienteModel newDetalleFacturaCliente = detalleFacturaClienteService
                    .saveDetalleFacturaCliente(detalleFacturaClienteRequest);
            if (newDetalleFacturaCliente == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            } else {
                return ResponseEntity
                        .ok(detalleFacturaClienteService.getDetalleFacturaClienteById(
                                newDetalleFacturaCliente.getId_detalle_factura_cliente()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            // No sé si en el status poner bad_request o 409
        }
    }

    // localhost:8080/detallesFacturasClientes/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedDetalleFacturaCliente = detalleFacturaClienteService
                    .getDetalleFacturaClienteById(id);
            return ResponseEntity.ok(selectedDetalleFacturaCliente);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

    }

    // localhost:8080/detallesFacturasClientes/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(
            @RequestBody DetalleFacturaClienteModel detalleFacturaClienteRequest,
            @PathVariable("id") int id) {
        try {
            DetalleFacturaClienteModel updateDetalleFacturaCliente = detalleFacturaClienteService
                    .updateDetalleFacturaCliente(detalleFacturaClienteRequest, id);
            if (updateDetalleFacturaCliente == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity
                        .ok(detalleFacturaClienteService.getDetalleFacturaClienteById(
                                updateDetalleFacturaCliente.getId_detalle_factura_cliente()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            // No sé si en el status poner bad_request o 409
        }
    }

    // localhost:8080/detallesFacturasClientes/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            detalleFacturaClienteService.deleteDetalleFacturaCliente(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
