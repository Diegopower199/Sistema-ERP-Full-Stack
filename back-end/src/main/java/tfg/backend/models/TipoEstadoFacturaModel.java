package tfg.backend.models;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "tipos_estados_facturas", uniqueConstraints = {
        @UniqueConstraint(name = "UK_tipo_estado_factura", columnNames = "tipo_estado_factura"), })
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TipoEstadoFacturaModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_estado_factura", nullable = false)
    private int id_tipo_estado_factura;

    @Column(name = "tipo_estado_factura", unique = true, nullable = false)
    private String tipo_estado_factura;

    /*
     * @JsonIgnore
     * 
     * @OneToMany(mappedBy = "tipo_estado", cascade = CascadeType.REMOVE)
     * private List<BajaLaboralEmpleadoModel> bajasLaboralesEmpleados;
     */

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_tipo_estado_factura", id_tipo_estado_factura);
        map.put("tipo_estado_factura", tipo_estado_factura);
        return map;
    }

}