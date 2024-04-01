package tfg.backend.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "pedidos_clientes")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PedidoClienteModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido_cliente", nullable = false)
    private int id_pedido_cliente;

    @Column(name = "direccion_entrega", nullable = true)
    private String direccion_entrega;

    @Column(name = "fecha_solicitud_pedido", nullable = false)
    private LocalDate fecha_solicitud_pedido;

    @Column(name = "fecha_entrega_prevista", nullable = true) // Al crear no se pasa nada, es al modificar
    private LocalDate fecha_entrega_prevista;

    @Column(name = "fecha_entrega_real", nullable = true) // Al crear no se pasa nada, es al modificar
    private LocalDate fecha_entrega_real;

    @Column(name = "hora_inicio_desplazamiento", nullable = true)
    private LocalTime hora_inicio_desplazamiento;

    @Column(name = "hora_fin_desplazamiento", nullable = true)
    private LocalTime hora_fin_desplazamiento;

    @Column(name = "tiempo_desplazamiento_total", nullable = true)
    private LocalTime tiempo_desplazamiento_total;

    @Column(name = "hora_inicio_servicio", nullable = true)
    private LocalTime hora_inicio_servicio;

    @Column(name = "hora_fin_servicio", nullable = true)
    private LocalTime hora_fin_servicio;

    @Column(name = "tiempo_servicio_total", nullable = true)
    private LocalTime tiempo_servicio_total;

    @Column(name = "descripcion", nullable = true)
    private String descripcion;

    @Column(name = "observacion", nullable = true)
    private String observacion;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false, foreignKey = @ForeignKey(name = "FK_pedidos_clientes_clientes"))
    private ClienteModel cliente;

    @ManyToOne
    @JoinColumn(name = "id_persona_encargado", nullable = false, foreignKey = @ForeignKey(name = "FK_pedidos_clientes_personas"))
    private PersonaModel persona_encargado;

    @ManyToOne
    @JoinColumn(name = "id_tipo_estado", nullable = false, foreignKey = @ForeignKey(name = "FK_pedidos_clientes_tipos_estados"))
    private TipoEstadoModel tipo_estado;

    @ManyToOne
    @JoinColumn(name = "id_tipo_estado_factura", nullable = false, foreignKey = @ForeignKey(name = "FK_pedidos_clientes_tipos_estados_facturas"))
    private TipoEstadoFacturaModel tipo_estado_factura;

    @JsonIgnore
    @OneToMany(mappedBy = "pedido_cliente", cascade = CascadeType.REMOVE)
    private List<FacturaClienteModel> facturasClientes;

    public PedidoClienteModel(TipoEstadoFacturaModel tipo_estado_factura) {
        this.tipo_estado_factura = tipo_estado_factura;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_pedido_cliente", id_pedido_cliente);
        map.put("direccion_entrega", direccion_entrega);
        map.put("fecha_solicitud_pedido", fecha_solicitud_pedido);
        map.put("fecha_entrega_prevista", fecha_entrega_prevista);
        map.put("fecha_entrega_real", fecha_entrega_real);
        map.put("hora_inicio_desplazamiento", hora_inicio_desplazamiento);
        map.put("hora_fin_desplazamiento", hora_fin_desplazamiento);
        map.put("tiempo_desplazamiento_total", tiempo_desplazamiento_total);
        map.put("hora_inicio_servicio", hora_inicio_servicio);
        map.put("hora_fin_servicio", hora_fin_servicio);
        map.put("tiempo_servicio_total", tiempo_servicio_total);
        map.put("descripcion", descripcion);
        map.put("observacion", observacion);
        return map;
    }

}