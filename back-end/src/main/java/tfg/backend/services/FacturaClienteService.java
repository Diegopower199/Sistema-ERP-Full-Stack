package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.FacturaClienteModel;
import tfg.backend.repositories.ClienteRepository;
import tfg.backend.repositories.FacturaClienteRepository;

@Service
public class FacturaClienteService {

    @Autowired
    private FacturaClienteRepository facturaClienteRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Map<String, Object>> getAllFacturasClientes() {
        List<FacturaClienteModel> listaFacturasClientes = facturaClienteRepository.findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();

        return resultado;
    }

    public FacturaClienteModel saveFacturaCliente(FacturaClienteModel nuevoFacturaCliente) {

        return nuevoFacturaCliente;
    }

    public Map<String, Object> getFacturaClienteById(int idFacturaCliente) {
        FacturaClienteModel facturaClienteEncontrado = facturaClienteRepository.findById(idFacturaCliente)
                .orElseThrow(
                        () -> new RuntimeException("Factura cliente con id " + idFacturaCliente + " no encontrado"));

        Map<String, Object> facturaClienteMap = facturaClienteEncontrado.toMap();

        return facturaClienteMap;
    }

    public FacturaClienteModel updateFacturaCliente(FacturaClienteModel cambiosFacturaCliente, int idFacturaCliente) {

        return cambiosFacturaCliente;
    }

    public void deleteFacturaCliente(int idFacturaCliente) {
        facturaClienteRepository.findById(idFacturaCliente)
                .orElseThrow(
                        () -> new RuntimeException("Factura cliente con id " + idFacturaCliente + " no encontrado"));

        facturaClienteRepository.deleteById(idFacturaCliente);

    }
}
