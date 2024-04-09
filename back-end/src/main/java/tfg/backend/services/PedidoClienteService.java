package tfg.backend.services;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.ClienteModel;
import tfg.backend.models.PedidoClienteModel;
import tfg.backend.models.PersonaModel;
import tfg.backend.models.TipoEstadoFacturaModel;
import tfg.backend.models.TipoEstadoModel;
import tfg.backend.repositories.ClienteRepository;
import tfg.backend.repositories.PedidoClienteRepository;
import tfg.backend.repositories.PersonaRepository;
import tfg.backend.repositories.TipoEstadoFacturaRepository;
import tfg.backend.repositories.TipoEstadoRepository;

@Service
public class PedidoClienteService {

    @Autowired
    private PedidoClienteRepository pedidoClienteRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private TipoEstadoRepository tipoEstadoRepository;

    @Autowired
    private TipoEstadoFacturaRepository tipoEstadoFacturaRepository;

    public List<Map<String, Object>> getAllPedidosClientes() {
        List<PedidoClienteModel> listaPedidosClientes = pedidoClienteRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (PedidoClienteModel pedidoCliente : listaPedidosClientes) {
            Map<String, Object> pedidoClienteMap = pedidoCliente.toMap();

            pedidoClienteMap.put("cliente",
                    pedidoCliente.getCliente() != null ? pedidoCliente.getCliente().toMap() : null);

            pedidoClienteMap.put("persona_encargado",
                    pedidoCliente.getPersona_encargado() != null ? pedidoCliente.getPersona_encargado().toMap() : null);

            pedidoClienteMap.put("tipo_estado",
                    pedidoCliente.getTipo_estado() != null ? pedidoCliente.getTipo_estado().toMap() : null);

            pedidoClienteMap.put("tipo_estado_factura",
                    pedidoCliente.getTipo_estado_factura() != null ? pedidoCliente.getTipo_estado_factura().toMap()
                            : null);

            resultado.add(pedidoClienteMap);
        }

        return resultado;
    }

    public PedidoClienteModel savePedidoCliente(PedidoClienteModel nuevoPedidoCliente) {

        /*
         * Comprobacion de campos correctos -> Ejemplo:
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

        int id_cliente = nuevoPedidoCliente.getCliente().getId_cliente();

        ClienteModel clienteEncontrado = clienteRepository.findById(id_cliente)
                .orElseThrow(() -> new RuntimeException(
                        "Cliente con id " + id_cliente + " no encontrado"));

        nuevoPedidoCliente.setCliente(clienteEncontrado);
        clienteEncontrado.getPedidosClientes().add(nuevoPedidoCliente);

        int id_persona_encargado = nuevoPedidoCliente.getPersona_encargado().getId_persona();

        PersonaModel personaEncontrado = personaRepository.findById(id_persona_encargado)
                .orElseThrow(() -> new RuntimeException(
                        "Persona con id " + id_persona_encargado + " no encontrado"));

        nuevoPedidoCliente.setPersona_encargado(personaEncontrado);
        personaEncontrado.getPedidosClientes().add(nuevoPedidoCliente);

        int id_tipo_estado = nuevoPedidoCliente.getTipo_estado().getId_tipo_estado();

        TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                .orElseThrow(() -> new RuntimeException("Tipo estado con id " + id_tipo_estado + " no encontrado"));

        nuevoPedidoCliente.setTipo_estado(tipoEstadoEncontrado);
        tipoEstadoEncontrado.getPedidosClientes().add(nuevoPedidoCliente);

        int id_tipo_estado_factura = nuevoPedidoCliente.getTipo_estado_factura().getId_tipo_estado_factura();

        TipoEstadoFacturaModel tipoEstadoFacturaEncontrado = tipoEstadoFacturaRepository
                .findById(id_tipo_estado_factura)
                .orElseThrow(() -> new RuntimeException(
                        "Tipo estado factura con id " + id_tipo_estado_factura + " no encontrado"));

        nuevoPedidoCliente.setTipo_estado_factura(tipoEstadoFacturaEncontrado);
        tipoEstadoFacturaEncontrado.getPedidosClientes().add(nuevoPedidoCliente);

        PedidoClienteModel pedidoClienteGuardado = pedidoClienteRepository
                .save(nuevoPedidoCliente);

        return pedidoClienteGuardado;
    }

    public Map<String, Object> getPedidoClienteById(int idPedidoCliente) {
        PedidoClienteModel pedidoClienteEncontrado = pedidoClienteRepository.findById(idPedidoCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Pedido cliente con id " + idPedidoCliente + " no encontrado"));

        Map<String, Object> pedidoClienteMap = pedidoClienteEncontrado.toMap();

        pedidoClienteMap.put("cliente",
                pedidoClienteEncontrado.getCliente() != null ? pedidoClienteEncontrado.getCliente().toMap() : null);

        pedidoClienteMap.put("persona_encargado",
                pedidoClienteEncontrado.getPersona_encargado() != null
                        ? pedidoClienteEncontrado.getPersona_encargado().toMap()
                        : null);

        pedidoClienteMap.put("tipo_estado",
                pedidoClienteEncontrado.getTipo_estado() != null ? pedidoClienteEncontrado.getTipo_estado().toMap()
                        : null);

        pedidoClienteMap.put("tipo_estado_factura",
                pedidoClienteEncontrado.getTipo_estado_factura() != null
                        ? pedidoClienteEncontrado.getTipo_estado_factura().toMap()
                        : null);

        return pedidoClienteMap;
    }

    public PedidoClienteModel updatePedidoCliente(PedidoClienteModel cambiosPedidoCliente, int idPedidoCliente) {

        System.out.println("\n\n\nidPedidoCliente: " + idPedidoCliente + "\n\n\n");
        PedidoClienteModel pedidoClienteExistente = pedidoClienteRepository.findById(idPedidoCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Pedido cliente con id " + idPedidoCliente + " no encontrado"));

        /*
         * Comprobacion de campos correctos -> Ejemplo:
         * if (cambiosUsuario.getNombre_usuario() == null) {
         * throw new RuntimeException("El campo 'nombre_usuario' no puede ser null");
         * }
         */

        LocalTime horaInicioDesplazamiento = cambiosPedidoCliente.getHora_inicio_desplazamiento();
        LocalTime horaFinDesplazamiento = cambiosPedidoCliente.getHora_fin_desplazamiento();
        LocalTime horaInicioServicio = cambiosPedidoCliente.getHora_inicio_servicio();
        LocalTime horaFinServicio = cambiosPedidoCliente.getHora_fin_servicio();

        pedidoClienteExistente.setDireccion_entrega(cambiosPedidoCliente.getDireccion_entrega());
        pedidoClienteExistente.setFecha_solicitud_pedido(cambiosPedidoCliente.getFecha_solicitud_pedido());
        pedidoClienteExistente.setFecha_entrega_prevista(cambiosPedidoCliente.getFecha_entrega_prevista());
        pedidoClienteExistente.setFecha_entrega_real(cambiosPedidoCliente.getFecha_entrega_real());

        TipoEstadoModel tipoEstadoAprobado = new TipoEstadoModel();
        tipoEstadoAprobado.setId_tipo_estado(2);

        if (tipoEstadoAprobado.getId_tipo_estado() == cambiosPedidoCliente.getTipo_estado().getId_tipo_estado()) {
            pedidoClienteExistente.setHora_inicio_desplazamiento(cambiosPedidoCliente.getHora_inicio_desplazamiento());
            pedidoClienteExistente.setHora_fin_desplazamiento(cambiosPedidoCliente.getHora_fin_desplazamiento());
            pedidoClienteExistente.setHora_inicio_servicio(cambiosPedidoCliente.getHora_inicio_servicio());
            pedidoClienteExistente.setHora_fin_servicio(cambiosPedidoCliente.getHora_fin_servicio());

            // Calculamos el total de tiempo de desplazamiento y de servicio
            long minutosEntreInicioDesplazamientoYServicio = horaInicioDesplazamiento.until(horaInicioServicio,
                    ChronoUnit.MINUTES);
            long minutosEntreInicioYFinDeServicio = horaInicioServicio.until(horaFinServicio, ChronoUnit.MINUTES);
            long minutosEntreFinDeServicioYFinDesplazamiento = horaFinServicio.until(horaFinDesplazamiento,
                    ChronoUnit.MINUTES);

            long minutosDesplazamiento = minutosEntreInicioDesplazamientoYServicio
                    + minutosEntreFinDeServicioYFinDesplazamiento;
            long minutosServicio = minutosEntreInicioYFinDeServicio;

            LocalTime resultadoTotalTiempoDesplazamiento = LocalTime.of((int) minutosDesplazamiento / 60,
                    (int) minutosDesplazamiento % 60, 0);

            LocalTime resultadoTotalTiempoServicio = LocalTime.of((int) minutosServicio / 60,
                    (int) minutosServicio % 60,
                    0);

            pedidoClienteExistente.setTiempo_desplazamiento_total(resultadoTotalTiempoDesplazamiento);
            pedidoClienteExistente.setTiempo_servicio_total(resultadoTotalTiempoServicio);
        }

        pedidoClienteExistente.setDescripcion(cambiosPedidoCliente.getDescripcion());
        pedidoClienteExistente.setObservacion(cambiosPedidoCliente.getObservacion());

        int id_cliente = cambiosPedidoCliente.getCliente().getId_cliente();

        ClienteModel clienteEncontrado = clienteRepository.findById(id_cliente)
                .orElseThrow(() -> new RuntimeException(
                        "Cliente con id " + id_cliente + " no encontrado"));

        pedidoClienteExistente.getCliente().getPedidosClientes().remove(pedidoClienteExistente);
        pedidoClienteExistente.setCliente(clienteEncontrado);
        clienteEncontrado.getPedidosClientes().add(pedidoClienteExistente);

        int id_persona = cambiosPedidoCliente.getPersona_encargado().getId_persona();

        PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                .orElseThrow(() -> new RuntimeException(
                        "Persona con id " + id_persona + " no encontrado"));

        pedidoClienteExistente.getPersona_encargado().getPedidosClientes().remove(pedidoClienteExistente);
        pedidoClienteExistente.setPersona_encargado(personaEncontrado);
        personaEncontrado.getPedidosClientes().add(pedidoClienteExistente);

        int id_tipo_estado = cambiosPedidoCliente.getTipo_estado().getId_tipo_estado();

        TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                .orElseThrow(() -> new RuntimeException("Tipo estado con id " + id_tipo_estado + " no encontrado"));

        pedidoClienteExistente.getTipo_estado().getPedidosClientes().remove(pedidoClienteExistente);
        pedidoClienteExistente.setTipo_estado(tipoEstadoEncontrado);
        tipoEstadoEncontrado.getPedidosClientes().add(pedidoClienteExistente);

        int id_tipo_estado_factura = cambiosPedidoCliente.getTipo_estado_factura().getId_tipo_estado_factura();

        TipoEstadoFacturaModel tipoEstadoFacturaEncontrado = tipoEstadoFacturaRepository
                .findById(id_tipo_estado_factura)
                .orElseThrow(
                        () -> new RuntimeException("Tipo estado factura con id " + id_tipo_estado + " no encontrado"));

        pedidoClienteExistente.getTipo_estado_factura().getPedidosClientes().remove(pedidoClienteExistente);
        pedidoClienteExistente.setTipo_estado_factura(tipoEstadoFacturaEncontrado);
        tipoEstadoFacturaEncontrado.getPedidosClientes().add(pedidoClienteExistente);

        PedidoClienteModel pedidoClienteActualizado = pedidoClienteRepository.save(pedidoClienteExistente);

        return pedidoClienteActualizado;
    }

    public void deletePedidoCliente(int idPedidoCliente) {
        pedidoClienteRepository.findById(idPedidoCliente)
                .orElseThrow(() -> new RuntimeException(
                        "Pedido cliente con id " + idPedidoCliente + " no encontrado"));

        pedidoClienteRepository.deleteById(idPedidoCliente);

    }

}