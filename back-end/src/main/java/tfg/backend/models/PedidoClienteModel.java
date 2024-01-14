package tfg.backend.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

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

    @Column(name = "fecha_solicitud_pedido", nullable = false)
    private LocalDate fecha_solicitud_pedido;

    @Column(name = "fecha_entrega_prevista", nullable = false)
    private LocalDate fecha_entrega_prevista;

    @Column(name = "fecha_entrega_real", nullable = false)
    private LocalDate fecha_entrega_real;

    @Column(name = "tipo_estado_pedido", nullable = false)
    private String tipo_estado_pedido;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false, foreignKey = @ForeignKey(name = "FK_pedidos_clientes_clientes"))
    private ClienteModel cliente;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_pedido_cliente", id_pedido_cliente);
        map.put("fecha_solicitud_pedido", fecha_solicitud_pedido);
        map.put("fecha_entrega_prevista", fecha_entrega_prevista);
        map.put("fecha_entrega_real", fecha_entrega_real);
        map.put("tipo_estado_pedido", tipo_estado_pedido);
        return map;
    }
}

/*
 * Tabla: Pedidos -> Pedidos_Clientes
 * ID_Pedido (Clave primaria)
 * ID_Cliente (Clave foránea referenciando a la tabla de Clientes)
 * Fecha_Solicitud_Pedido
 * Fecha_Entrega_Prevista
 * Fecha_Entrega_Real
 * Tipo_Estado_Pedido
 */