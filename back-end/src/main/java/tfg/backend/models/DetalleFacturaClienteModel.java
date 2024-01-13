package tfg.backend.models;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "detalles_facturas_clientes")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DetalleFacturaClienteModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_factura_cliente", nullable = false)
    private int id_detalle_factura_cliente;

    @Column(name = "descripcion_servicio", nullable = false)
    private String descripcion_servicio;

    @Column(name = "tiempo_desplazamiento", nullable = false) // En minutos
    private int tiempo_desplazamiento;

    @Column(name = "tiempo_servicio", nullable = false) // En minutos
    private int tiempo_servicio;

    @Column(name = "tarifa_hora_desplazamiento", nullable = false)
    private float tarifa_hora_desplazamiento;

    @Column(name = "tarifa_hora_servicio", nullable = false)
    private float tarifa_hora_servicio;

    @Column(name = "subtotal_sin_iva", nullable = false)
    private float subtotal_sin_iva;

    @Column(name = "iva", nullable = false)
    private float iva;

    @Column(name = "total", nullable = false)
    private float total;

    @ManyToOne
    @JoinColumn(name = "id_factura_cliente", nullable = false)
    private FacturaClienteModel factura_cliente;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_detalle_factura_cliente", id_detalle_factura_cliente);
        map.put("descripcion_servicio", descripcion_servicio);
        map.put("tiempo_desplazamiento", tiempo_desplazamiento);
        map.put("tiempo_servicio", tiempo_servicio);
        map.put("tarifa_hora_desplazamiento", tarifa_hora_desplazamiento);
        map.put("tarifa_hora_servicio", tarifa_hora_servicio);
        map.put("subtotal_sin_iva", subtotal_sin_iva);
        map.put("iva", iva);
        map.put("total", total);
        return map;
    }
}

/*
 * Tabla: Detalles_Factura (Para los ítems de cada factura) ->
 * Detalles_Facturas_Clientes
 * ID_Detalle (Clave primaria)
 * ID_Factura (Clave foránea que referencia a la tabla de Facturas)
 * Descripción_Servicio
 * Tiempo_Desplazamiento (en horas o minutos)
 * Tiempo_Servicio (en horas o minutos)
 * Tarifa_Hora_Desplazamiento
 * Tarifa_Hora_Servicio
 * Subtotal-Sin_IVA
 * IVA
 * Total
 */