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

@Table(name = "facturas_clientes")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FacturaClienteModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_factura_cliente", nullable = false)
    private int id_factura_cliente;

    @Column(name = "descripcion_servicio", nullable = true)
    private String descripcion_servicio;

    @Column(name = "direccion_entrega", nullable = false)
    private String direccion_entrega;

    @Column(name = "hora_inicio_desplazamiento", nullable = false)
    private LocalTime hora_inicio_desplazamiento;

    @Column(name = "hora_fin_desplazamiento", nullable = false)
    private LocalTime hora_fin_desplazamiento;

    @Column(name = "tiempo_desplazamiento_total", nullable = false)
    private LocalTime tiempo_desplazamiento_total;

    @Column(name = "hora_inicio_servicio", nullable = false)
    private LocalTime hora_inicio_servicio;

    @Column(name = "hora_fin_servicio", nullable = false)
    private LocalTime hora_fin_servicio;

    @Column(name = "tiempo_servicio_total", nullable = false)
    private LocalTime tiempo_servicio_total;
    
    @Column(name = "observacion", nullable = true)
    private String observacion;

    @Column(name = "fecha_entrega_real_pedido", nullable = false)
    private LocalDate fecha_entrega_real_pedido;

    @Column(name = "fecha_factura_emitida", nullable = false)
    private LocalDate fecha_factura_emitida;

    @Column(name = "tarifa_hora_desplazamiento", nullable = false)
    private float tarifa_hora_desplazamiento;

    @Column(name = "tarifa_hora_servicio", nullable = false)
    private float tarifa_hora_servicio;

    @Column(name = "subtotal_factura_sin_iva", nullable = false)
    private float subtotal_factura_sin_iva;

    @Column(name = "iva", nullable = false)
    private float iva;

    @Column(name = "total_factura", nullable = false)
    private float total_factura;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false, foreignKey = @ForeignKey(name = "FK_facturas_clientes_clientes"))
    private ClienteModel cliente;

    @ManyToOne
    @JoinColumn(name = "id_pedido_cliente", nullable = false, foreignKey = @ForeignKey(name = "FK_facturas_clientes_pedidos_clientes"))
    private PedidoClienteModel pedido_cliente;

    @ManyToOne
    @JoinColumn(name = "id_tipo_estado", nullable = false, foreignKey = @ForeignKey(name = "FK_facturas_clientes_tipos_estados"))
    private TipoEstadoModel tipo_estado;

    @JsonIgnore
    @OneToMany(mappedBy = "factura_cliente", cascade = CascadeType.REMOVE)
    private List<PagoFacturaClienteModel> pagosFacturasClientes;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_factura_cliente", id_factura_cliente);
        map.put("descripcion_servicio", descripcion_servicio);
        map.put("direccion_entrega", direccion_entrega);
        map.put("hora_inicio_desplazamiento", hora_inicio_desplazamiento);
        map.put("hora_fin_desplazamiento", hora_fin_desplazamiento);
        map.put("tiempo_desplazamiento_total", tiempo_desplazamiento_total);
        map.put("hora_inicio_servicio", hora_inicio_servicio);
        map.put("hora_fin_servicio", hora_fin_servicio);
        map.put("tiempo_servicio_total", tiempo_servicio_total);
        map.put("observacion", observacion);
        map.put("fecha_entrega_real_pedido", fecha_entrega_real_pedido);
        map.put("fecha_factura_emitida", fecha_factura_emitida);
        map.put("tarifa_hora_desplazamiento", tarifa_hora_desplazamiento);
        map.put("tarifa_hora_servicio", tarifa_hora_servicio);
        map.put("subtotal_factura_sin_iva", subtotal_factura_sin_iva);
        map.put("iva", iva);
        map.put("total_factura", total_factura);
        return map;
    }

}