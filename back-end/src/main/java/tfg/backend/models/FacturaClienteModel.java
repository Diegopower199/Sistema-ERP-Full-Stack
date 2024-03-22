package tfg.backend.models;

import java.io.Serializable;
import java.time.LocalDate;
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

    @Column(name = "fecha_factura_emitida", nullable = false)
    private LocalDate fecha_factura_emitida;

    @Column(name = "total_factura", nullable = false)
    private float total_factura;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false, foreignKey = @ForeignKey(name = "FK_facturas_clientes_clientes"))
    private ClienteModel cliente;

    @ManyToOne
    @JoinColumn(name = "id_tipo_estado", nullable = false, foreignKey = @ForeignKey(name = "FK_facturas_clientes_tipos_estados"))
    private TipoEstadoModel tipo_estado;

    @JsonIgnore
    @OneToMany(mappedBy = "factura_cliente", cascade = CascadeType.REMOVE)
    private List<DetalleFacturaClienteModel> detallesFacturasClientes;

    @JsonIgnore
    @OneToMany(mappedBy = "factura_cliente", cascade = CascadeType.REMOVE)
    private List<PagoFacturaClienteModel> pagosFacturasClientes;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_factura_cliente", id_factura_cliente);
        map.put("fecha_factura_emitida", fecha_factura_emitida);
        map.put("total_factura", total_factura);
        return map;
    }

}