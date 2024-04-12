package tfg.backend.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.ClienteModel;
import tfg.backend.models.FacturaClienteModel;
import tfg.backend.models.PedidoClienteModel;
import tfg.backend.models.TipoEstadoFacturaModel;
import tfg.backend.models.TipoEstadoModel;
import tfg.backend.repositories.ClienteRepository;
import tfg.backend.repositories.FacturaClienteRepository;
import tfg.backend.repositories.PedidoClienteRepository;
import tfg.backend.repositories.TipoEstadoRepository;
import tfg.backend.utils.GlobalConstants;

@Service
public class FacturaClienteService {

    @Autowired
    private FacturaClienteRepository facturaClienteRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PedidoClienteRepository pedidoClienteRepository;

    @Autowired
    private TipoEstadoRepository tipoEstadoRepository;

    public List<Map<String, Object>> getAllFacturasClientes() {
        List<FacturaClienteModel> listaFacturasClientes = facturaClienteRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (FacturaClienteModel facturaCliente : listaFacturasClientes) {
            Map<String, Object> facturaClienteMap = facturaCliente.toMap();

            facturaClienteMap.put("cliente",
                    facturaCliente.getCliente() != null ? facturaCliente.getCliente().toMap() : null);

            facturaClienteMap.put("pedido_cliente",
                    facturaCliente.getPedido_cliente() != null ? facturaCliente.getPedido_cliente().toMap() : null);

            facturaClienteMap.put("tipo_estado",
                    facturaCliente.getTipo_estado() != null ? facturaCliente.getTipo_estado().toMap() : null);

            resultado.add(facturaClienteMap);
        }

        return resultado;
    }

    public FacturaClienteModel saveFacturaCliente(FacturaClienteModel nuevoFacturaCliente) {

        /*
         * Comprobacion de campos correctos -> Ejemplo:
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

        int id_cliente = nuevoFacturaCliente.getCliente().getId_cliente();

        ClienteModel clienteEncontrado = clienteRepository.findById(id_cliente)
                .orElseThrow(() -> new RuntimeException(
                        "Cliente con id " + id_cliente + " no encontrado"));

        nuevoFacturaCliente.setCliente(clienteEncontrado);
        clienteEncontrado.getFacturasClientes().add(nuevoFacturaCliente);

        int id_pedido_cliente = nuevoFacturaCliente.getPedido_cliente().getId_pedido_cliente();

        PedidoClienteModel pedidoClienteEncontrado = pedidoClienteRepository.findById(id_pedido_cliente)
                .orElseThrow(() -> new RuntimeException(
                        "Pedido cliente con id " + id_pedido_cliente + " no encontrado"));

        nuevoFacturaCliente.setPedido_cliente(pedidoClienteEncontrado);
        pedidoClienteEncontrado.getFacturasClientes().add(nuevoFacturaCliente);

        int id_tipo_estado = nuevoFacturaCliente.getTipo_estado().getId_tipo_estado();

        TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                .orElseThrow(() -> new RuntimeException("Tipo estado con id " + id_tipo_estado + " no encontrado"));

        nuevoFacturaCliente.setTipo_estado(tipoEstadoEncontrado);
        tipoEstadoEncontrado.getFacturasClientes().add(nuevoFacturaCliente);

        FacturaClienteModel facturaClienteGuardado = facturaClienteRepository
                .save(nuevoFacturaCliente);

        return facturaClienteGuardado;
    }

    public Map<String, Object> generateFacturasClientes() {
        TipoEstadoFacturaModel tipoEstadoPendienteFacturar = new TipoEstadoFacturaModel();
        tipoEstadoPendienteFacturar.setId_tipo_estado_factura(1);

        TipoEstadoFacturaModel tipoEstadoFacturado = new TipoEstadoFacturaModel();
        tipoEstadoFacturado.setId_tipo_estado_factura(2);

        TipoEstadoModel tipoEstadoPendienteDePago = new TipoEstadoModel();
        tipoEstadoPendienteDePago.setId_tipo_estado(4);

        List<FacturaClienteModel> listaFacturaClientesGuardarBBDD = new ArrayList<>();
        List<PedidoClienteModel> listaPedidosClientesActualizarBBDD = new ArrayList<>();
        List<PedidoClienteModel> listaPedidosClientesParaFacturar = pedidoClienteRepository
                .findByTipoEstadoFacturaIdOrderByPedidoClienteId(tipoEstadoPendienteFacturar);

        LocalDate fechaActual = LocalDate.now();

        for (PedidoClienteModel pedidoCliente : listaPedidosClientesParaFacturar) {
            FacturaClienteModel newFacturaClienteFacturado = new FacturaClienteModel();

            newFacturaClienteFacturado.setDescripcion_servicio(pedidoCliente.getDescripcion());
            newFacturaClienteFacturado.setDireccion_entrega(pedidoCliente.getDireccion_entrega());
            newFacturaClienteFacturado.setHora_inicio_desplazamiento(pedidoCliente.getHora_inicio_desplazamiento());
            newFacturaClienteFacturado.setHora_fin_desplazamiento(pedidoCliente.getHora_fin_desplazamiento());
            newFacturaClienteFacturado.setTiempo_desplazamiento_total(pedidoCliente.getTiempo_desplazamiento_total());
            newFacturaClienteFacturado.setHora_inicio_servicio(pedidoCliente.getHora_inicio_servicio());
            newFacturaClienteFacturado.setHora_fin_servicio(pedidoCliente.getHora_fin_servicio());
            newFacturaClienteFacturado.setTiempo_servicio_total(pedidoCliente.getTiempo_servicio_total());
            newFacturaClienteFacturado.setObservacion(pedidoCliente.getObservacion());
            newFacturaClienteFacturado.setFecha_entrega_real_pedido(pedidoCliente.getFecha_entrega_real());
            newFacturaClienteFacturado.setFecha_factura_emitida(fechaActual);
            newFacturaClienteFacturado.setTarifa_hora_desplazamiento(GlobalConstants.TARIFA_HORA_TRANSPORTE);
            newFacturaClienteFacturado.setTarifa_hora_servicio(GlobalConstants.TARIFA_HORA_SERVICIO);
            newFacturaClienteFacturado.setSubtotal_factura_sin_iva(1000);
            newFacturaClienteFacturado.setIva(GlobalConstants.IVA);
            int subtotalFactura = 1000;
            int calculoTotalFactura = subtotalFactura + (subtotalFactura * (GlobalConstants.IVA / 100));

            newFacturaClienteFacturado.setTotal_factura(0);

            // total_factura = subtotal_factura_sin_iva + (subtotal_factura_sin_iva * (iva / 100))


            newFacturaClienteFacturado.setCliente(pedidoCliente.getCliente());
            newFacturaClienteFacturado.setPedido_cliente(pedidoCliente);
            newFacturaClienteFacturado.setTipo_estado(tipoEstadoPendienteDePago);

            listaFacturaClientesGuardarBBDD.add(newFacturaClienteFacturado);

            pedidoCliente.setTipo_estado_factura(tipoEstadoFacturado);
            pedidoCliente.setTipo_estado(tipoEstadoPendienteDePago);
            listaPedidosClientesActualizarBBDD.add(pedidoCliente);

        }

        facturaClienteRepository.saveAll(listaFacturaClientesGuardarBBDD);
        pedidoClienteRepository.saveAll(listaPedidosClientesActualizarBBDD);

        Map<String, Object> mostrarFacturasGeneradas = new HashMap<>();
        mostrarFacturasGeneradas.put("resultado", listaFacturaClientesGuardarBBDD.size());

        return mostrarFacturasGeneradas;
    }

    public Map<String, Object> getFacturaClienteById(int idFacturaCliente) {
        FacturaClienteModel facturaClienteEncontrado = facturaClienteRepository.findById(idFacturaCliente).orElseThrow(
                () -> new RuntimeException("Factura cliente con id " + idFacturaCliente + " no encontrado"));

        Map<String, Object> facturaClienteMap = facturaClienteEncontrado.toMap();

        facturaClienteMap.put("cliente",
                facturaClienteEncontrado.getCliente() != null ? facturaClienteEncontrado.getCliente().toMap() : null);

        facturaClienteMap.put("pedido_cliente",
                facturaClienteEncontrado.getPedido_cliente() != null
                        ? facturaClienteEncontrado.getPedido_cliente().toMap()
                        : null);

        facturaClienteMap.put("tipo_estado",
                facturaClienteEncontrado.getTipo_estado() != null ? facturaClienteEncontrado.getTipo_estado().toMap()
                        : null);

        return facturaClienteMap;
    }

    public FacturaClienteModel updateFacturaCliente(FacturaClienteModel cambiosFacturaCliente,
            int idFacturaCliente) {

        FacturaClienteModel facturaClienteExistente = facturaClienteRepository.findById(idFacturaCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Factura cliente con id " + idFacturaCliente + " no encontrado"));

        // Comprobacion de campos correctos -> Ejemplo:
        /*
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

        // HACER AQUI LOS SETTER -> Ejemplo:
        // asistenciaEmpleadoExistente.setFecha(cambiosAsistenciaEmpleado.getFecha());

        int id_cliente = cambiosFacturaCliente.getCliente().getId_cliente();

        ClienteModel clienteEncontrado = clienteRepository.findById(id_cliente)
                .orElseThrow(() -> new RuntimeException(
                        "Cliente con id " + id_cliente + " no encontrado"));

        facturaClienteExistente.getCliente().getFacturasClientes().remove(facturaClienteExistente);
        facturaClienteExistente.setCliente(clienteEncontrado);
        clienteEncontrado.getFacturasClientes().add(facturaClienteExistente);

        int id_tipo_estado = cambiosFacturaCliente.getTipo_estado().getId_tipo_estado();

        TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                .orElseThrow(() -> new RuntimeException("Tipo estado con id " + id_tipo_estado + " no encontrado"));

        facturaClienteExistente.getTipo_estado().getFacturasClientes().remove(facturaClienteExistente);
        facturaClienteExistente.setTipo_estado(tipoEstadoEncontrado);
        tipoEstadoEncontrado.getFacturasClientes().add(facturaClienteExistente);

        FacturaClienteModel facturaClienteActualizado = facturaClienteRepository
                .save(facturaClienteExistente);

        return facturaClienteActualizado;
    }

    public void deleteFacturaCliente(int idFacturaCliente) {
        facturaClienteRepository.findById(idFacturaCliente)
                .orElseThrow(
                        () -> new RuntimeException("Factura cliente con id " + idFacturaCliente
                                + " no encontrado"));

        facturaClienteRepository.deleteById(idFacturaCliente);

    }

}