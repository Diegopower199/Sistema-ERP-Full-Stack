package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.DetalleFacturaClienteModel;
import tfg.backend.repositories.DetalleFacturaClienteRepository;
import tfg.backend.repositories.FacturaClienteRepository;

@Service
public class DetalleFacturaClienteService {

    @Autowired
    private DetalleFacturaClienteRepository detalleFacturaClienteRepository;

    @Autowired
    private FacturaClienteRepository facturaClienteRepository;

    public List<Map<String, Object>> getAllDetallesFacturasClientes() {
        List<DetalleFacturaClienteModel> listaDetallesFacturasClientes = detalleFacturaClienteRepository.findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();

        return resultado;
    }

    public DetalleFacturaClienteModel saveDetalleFacturaCliente(DetalleFacturaClienteModel nuevoDetalleFacturaCliente) {

        return nuevoDetalleFacturaCliente;
    }

    public Map<String, Object> getDetalleFacturaClienteById(int idDetalleFacturaCliente) {
        DetalleFacturaClienteModel detalleFacturaClienteEncontrado = detalleFacturaClienteRepository
                .findById(idDetalleFacturaCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Detalle factura cliente con id " + idDetalleFacturaCliente + " no encontrado"));

        Map<String, Object> detalleFacturaClienteMap = detalleFacturaClienteEncontrado.toMap();

        return detalleFacturaClienteMap;
    }

    public DetalleFacturaClienteModel updateDetalleFacturaCliente(
            DetalleFacturaClienteModel cambiosDetalleFacturaCliente, int idDetalleFacturaCliente) {

        return cambiosDetalleFacturaCliente;
    }

    public void deleteDetalleFacturaCliente(int idDetalleFacturaCliente) {
        detalleFacturaClienteRepository.findById(idDetalleFacturaCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Detalle factura cliente con id " + idDetalleFacturaCliente + " no encontrado"));

        detalleFacturaClienteRepository.deleteById(idDetalleFacturaCliente);

    }
}
