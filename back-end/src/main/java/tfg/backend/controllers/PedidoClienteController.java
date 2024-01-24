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
import tfg.backend.models.PedidoClienteModel;
import tfg.backend.services.PedidoClienteService;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/pedidosClientes")
public class PedidoClienteController {

    @Autowired
    PedidoClienteService pedidoClienteService;

    // localhost:8080/pedidosClientes/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        List<Map<String, Object>> allPedidosClientes = pedidoClienteService.getAllPedidosClientes();

        if (allPedidosClientes.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(allPedidosClientes);
        }
    }

    // localhost:8080/pedidosClientes/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody PedidoClienteModel pedidoClienteRequest) {
        try {
            PedidoClienteModel newPedidoCliente = pedidoClienteService.savePedidoCliente(pedidoClienteRequest);

            if (newPedidoCliente == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            } else {
                return ResponseEntity
                        .ok(pedidoClienteService.getPedidoClienteById(newPedidoCliente.getId_pedido_cliente()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/pedidosClientes/api/getById/{id}
    @GetMapping("/api/getById/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") int id) {
        try {
            Map<String, Object> selectedPedidoCliente = pedidoClienteService.getPedidoClienteById(id);
            return ResponseEntity.ok(selectedPedidoCliente);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/pedidosClientes/api/update/{id}
    @PutMapping("/api/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody PedidoClienteModel pedidoClienteRequest,
            @PathVariable("id") int id) {
        try {
            PedidoClienteModel updatePedidoCliente = pedidoClienteService.updatePedidoCliente(pedidoClienteRequest, id);

            if (updatePedidoCliente == null) {
                return ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity
                        .ok(pedidoClienteService.getPedidoClienteById(updatePedidoCliente.getId_pedido_cliente()));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // localhost:8080/pedidosClientes/api/delete/{id}
    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        try {
            pedidoClienteService.deletePedidoCliente(id);
            return ResponseEntity.ok("Se ha eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
