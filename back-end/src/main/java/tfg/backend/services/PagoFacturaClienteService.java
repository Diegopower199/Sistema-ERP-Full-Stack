package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.PagoFacturaClienteModel;
import tfg.backend.repositories.FacturaClienteRepository;
import tfg.backend.repositories.PagoFacturaClienteRepository;

@Service
public class PagoFacturaClienteService {

    @Autowired
    private PagoFacturaClienteRepository pagoFacturaClienteRepository;

    @Autowired
    private FacturaClienteRepository facturaClienteRepository;

    public List<Map<String, Object>> getAllPagosFacturasClientes() {
        List<PagoFacturaClienteModel> listaPagosFacturasClientes = pagoFacturaClienteRepository.findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();

        return resultado;
    }

    public PagoFacturaClienteModel savePagoFacturaCliente(PagoFacturaClienteModel nuevoPagoFacturaCliente) {

        return nuevoPagoFacturaCliente;
    }

    public Map<String, Object> getPagoFacturaClienteById(int idPagoFacturaCliente) {
        PagoFacturaClienteModel pagoFacturaClienteEncontrado = pagoFacturaClienteRepository
                .findById(idPagoFacturaCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Pago factura cliente con id " + idPagoFacturaCliente + " no encontrado"));

        Map<String, Object> pagoFacturaClienteMap = pagoFacturaClienteEncontrado.toMap();

        return pagoFacturaClienteMap;
    }

    public PagoFacturaClienteModel updatePagoFacturaCliente(PagoFacturaClienteModel cambiosPagoFacturaCliente,
            int idPagoFacturaCliente) {

        return cambiosPagoFacturaCliente;
    }

    public void deletePagoFacturaCliente(int idPagoFacturaCliente) {
        pagoFacturaClienteRepository.findById(idPagoFacturaCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Pago factura cliente con id " + idPagoFacturaCliente + " no encontrado"));

        pagoFacturaClienteRepository.deleteById(idPagoFacturaCliente);

    }
}
