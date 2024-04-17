package tfg.backend.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import commonclasses.TransaccionVacacion;
import tfg.backend.ExcepcionControlada.ConexionServidoresException;
import tfg.backend.ExcepcionControlada.TransaccionVacacionRechazadaException;
import tfg.backend.services.BlockchainVacacionAutorizadaService;
import tfg.backend.utils.GlobalConstants;

@CrossOrigin(origins = GlobalConstants.FRONTEND_URL, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/blockchainVacacionesAutorizadas")
public class BlockchainVacacionAutorizadaController {

    @Autowired
    BlockchainVacacionAutorizadaService blockchainVacacionAutorizadaService;

    // localhost:8080/blockchainVacacionesAutorizadas/api/getAll
    @GetMapping("/api/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        try {
            List<Map<String, Object>> allVacacionesEmpleados = blockchainVacacionAutorizadaService
                    .getAllTransaccionesVacacionesAutorizadas();

            if (allVacacionesEmpleados.isEmpty()) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.ok(allVacacionesEmpleados);
            }
        } catch (ConexionServidoresException e) {
            List<Map<String, Object>> resultado = new ArrayList<>();
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            resultado.add(response);
            return ResponseEntity.status(e.getStatus()).body(resultado);
        } catch (Exception e) {
            List<Map<String, Object>> resultado = new ArrayList<>();
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            resultado.add(response);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(resultado);
        }
    }

    // localhost:8080/blockchainVacacionesAutorizadas/api/save
    @PostMapping("/api/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody TransaccionVacacion vacacionEmpleadoRequest) {
        try {
            TransaccionVacacion newVacacionAutorizada = blockchainVacacionAutorizadaService
                    .saveTransaccionVacacionAutorizada(vacacionEmpleadoRequest);

            if (newVacacionAutorizada == null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            } else {
                return ResponseEntity.ok(newVacacionAutorizada.toMap());
            }
        } catch (ConexionServidoresException e) {
            System.out.println("EL ERROR EN CONTROLLER" + e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(e.getStatus()).body(response);
        } catch (TransaccionVacacionRechazadaException e) {
            System.out.println("EL ERROR EN CONTROLLER" + e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(e.getStatus()).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // localhost:8080/blockchainVacacionesAutorizadas/api/checkVacacionesAutorizadas
    @GetMapping("/api/checkVacacionesAutorizadas")
    public ResponseEntity<List<Map<String, Object>>> check() {
        try {
            List<Map<String, Object>> allVacacionesEmpleados = blockchainVacacionAutorizadaService
                    .checkVacacionesAutorizadas();

            return ResponseEntity.noContent().build();

            /*
             * if (allVacacionesEmpleados.isEmpty()) {
             * return ResponseEntity.noContent().build();
             * } else {
             * return ResponseEntity.ok(allVacacionesEmpleados);
             * }
             */
        } catch (ConexionServidoresException e) {
            List<Map<String, Object>> resultado = new ArrayList<>();
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            resultado.add(response);
            return ResponseEntity.status(e.getStatus()).body(resultado);
        } catch (Exception e) {
            List<Map<String, Object>> resultado = new ArrayList<>();
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            resultado.add(response);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(resultado);
        }
    }

}