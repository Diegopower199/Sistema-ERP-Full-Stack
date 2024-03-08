package tfg.backend.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "pagos_facturas_clientes")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PagoFacturaClienteModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pago_factura_cliente", nullable = false)
    private int id_pago_factura_cliente;

    @Column(name = "fecha_pago_realizada", nullable = false)
    private LocalDate fecha_pago_realizada;

    @Column(name = "importe_pagado", nullable = false)
    private float importe_pagado;

    @Column(name = "metodo_pago", nullable = false)
    private String metodo_pago;

    @ManyToOne
    @JoinColumn(name = "id_factura_cliente", nullable = false, foreignKey = @ForeignKey(name = "FK_pagos_facturas_clientes_facturas_clientes"))
    private FacturaClienteModel factura_cliente;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_pago_factura_cliente", id_pago_factura_cliente);
        map.put("fecha_pago_realizada", fecha_pago_realizada);
        map.put("importe_pagado", importe_pagado);
        map.put("metodo_pago", metodo_pago);
        return map;
    }

}

/*
 * Tabla: Pagos -> Pagos_Facturas_Clientes
 * ID_Pago (Clave primaria): Identificador único de cada transacción de pago.
 * ID_Factura (Clave foránea que referencia a la tabla de Facturas): Enlace a la
 * factura asociada al pago.
 * Fecha_Pago: Fecha en que se realizó el pago.
 * Importe_Pagado: Importe total pagado por el cliente.
 * Método_Pago: Método utilizado para realizar el pago (efectivo, tarjeta,
 * transferencia, etc.).
 */