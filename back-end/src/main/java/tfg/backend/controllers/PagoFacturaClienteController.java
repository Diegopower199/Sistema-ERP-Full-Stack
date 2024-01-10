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
import tfg.backend.models.PagoFacturaClienteModel;
import tfg.backend.services.PagoFacturaClienteService;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/pagosFacturasClientes")
public class PagoFacturaClienteController {

    @Autowired
    PagoFacturaClienteService pagoFacturaClienteService;

    // localhost:8080/pagosFacturasClientes/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allPagosFacturasClientes = pagoFacturaClienteService.getAllPagosFacturasClientes();
        if (allPagosFacturasClientes.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allPagosFacturasClientes);
        }
    }

    // localhost:8080/pagosFacturasClientes/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody PagoFacturaClienteModel pagoFacturaClienteRequest) {
        try {
            PagoFacturaClienteModel newPagoFacturaCliente = pagoFacturaClienteService
                    .savePagoFacturaCliente(pagoFacturaClienteRequest);
            if (newPagoFacturaCliente == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            } else {
                return ResponseEntity
                        .ok(pagoFacturaClienteService
                                .getPagoFacturaClienteById(newPagoFacturaCliente.getId_pago_factura_cliente()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            // No sé si en el status poner bad_request o 409
        }
    }

    // localhost:8080/pagosFacturasClientes/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedPagoFacturaCliente = pagoFacturaClienteService.getPagoFacturaClienteById(id);
            return ResponseEntity.ok(selectedPagoFacturaCliente);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

    }

    // localhost:8080/pagosFacturasClientes/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody PagoFacturaClienteModel pagoFacturaClienteRequest,
            @PathVariable("id") int id) {
        try {
            PagoFacturaClienteModel updatePagoFacturaCliente = pagoFacturaClienteService
                    .updatePagoFacturaCliente(pagoFacturaClienteRequest, id);
            if (updatePagoFacturaCliente == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity
                        .ok(pagoFacturaClienteService
                                .getPagoFacturaClienteById(updatePagoFacturaCliente.getId_pago_factura_cliente()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            // No sé si en el status poner bad_request o 409
        }
    }

    // localhost:8080/pagosFacturasClientes/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            pagoFacturaClienteService.deletePagoFacturaCliente(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
