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

    @Column(name = "fecha_entrega_prevista", nullable = true) // Al crear no se pasa nada, es al modificar
    private LocalDate fecha_entrega_prevista;

    @Column(name = "fecha_entrega_real", nullable = true) // Al crear no se pasa nada, es al modificar
    private LocalDate fecha_entrega_real;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false, foreignKey = @ForeignKey(name = "FK_pedidos_clientes_clientes"))
    private ClienteModel cliente;

    @ManyToOne
    @JoinColumn(name = "id_tipo_estado", nullable = false, foreignKey = @ForeignKey(name = "FK_pedidos_clientes_tipos_estados"))
    private TipoEstadoModel tipo_estado;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_pedido_cliente", id_pedido_cliente);
        map.put("fecha_solicitud_pedido", fecha_solicitud_pedido);
        map.put("fecha_entrega_prevista", fecha_entrega_prevista);
        map.put("fecha_entrega_real", fecha_entrega_real);
        return map;
    }

}