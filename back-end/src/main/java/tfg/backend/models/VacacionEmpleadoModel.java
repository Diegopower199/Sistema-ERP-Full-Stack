package tfg.backend.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "vacaciones_empleados")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VacacionEmpleadoModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vacacion_empleado", nullable = false)
    private int id_vacacion_empleado;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fecha_inicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fecha_fin;

    @Column(name = "dias_disponibles", nullable = false)
    private int dias_disponibles;

    @Column(name = "dias_pendientes", nullable = false)
    private int dias_pendientes;

    @Column(name = "dias_solicitados", nullable = false)
    private int dias_solicitados;

    @Column(name = "dias_disfrutados", nullable = false)
    private int dias_disfrutados;

    @Column(name = "observacion", nullable = true)
    private String observacion;

    @Column(name = "hash_transaccion_vacacion", nullable = true, columnDefinition = "VARCHAR(256) DEFAULT NULL")
    private String hash_transaccion_vacacion;

    @Column(name = "hash_block", nullable = true, columnDefinition = "VARCHAR(256) DEFAULT NULL")
    private String hash_block;

    @Column(name = "previous_hash_block", nullable = true, columnDefinition = "VARCHAR(256) DEFAULT NULL")
    private String previous_hash_block;

    @Column(name = "error_blockchain", nullable = false, columnDefinition = "boolean default false")
    private boolean error_blockchain;

    @Column(name = "gestionado_con_blockchain", nullable = false)
    private boolean gestionado_con_blockchain;

    @ManyToOne
    @JoinColumn(name = "id_persona", nullable = false, foreignKey = @ForeignKey(name = "FK_vacaciones_empleados_personas"))
    private PersonaModel persona;

    @ManyToOne
    @JoinColumn(name = "id_tipo_estado", nullable = false, foreignKey = @ForeignKey(name = "FK_vacaciones_empleados_tipos_estados"))
    private TipoEstadoModel tipo_estado;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_vacacion_empleado", id_vacacion_empleado);
        map.put("fecha_inicio", fecha_inicio);
        map.put("fecha_fin", fecha_fin);
        map.put("dias_disponibles", dias_disponibles);
        map.put("dias_pendientes", dias_pendientes);
        map.put("dias_solicitados", dias_solicitados);
        map.put("dias_disfrutados", dias_disfrutados);
        map.put("observacion", observacion);
        map.put("hash_transaccion_vacacion", hash_transaccion_vacacion);
        map.put("hash_block", hash_block);
        map.put("previous_hash_block", previous_hash_block);
        map.put("error_blockchain", error_blockchain);
        map.put("gestionado_con_blockchain", gestionado_con_blockchain);
        return map;
    }

}