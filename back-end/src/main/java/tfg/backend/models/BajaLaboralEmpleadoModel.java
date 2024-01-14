package tfg.backend.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "bajas_laborales_empleados")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BajaLaboralEmpleadoModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_baja_laboral_empleado", nullable = false)
    private int id_baja_laboral_empleado;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fecha_inicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fecha_fin;

    @Column(name = "comentarios", nullable = true)
    private String comentarios;

    @ManyToOne
    @JoinColumn(name = "id_persona", nullable = false, foreignKey = @ForeignKey(name = "FK_bajas_laborales_empleados_personas"))
    private PersonaModel persona;

    @ManyToOne
    @JoinColumn(name = "id_motivo_baja", nullable = false, foreignKey = @ForeignKey(name = "FK_bajas_laborales_empleados_motivos_bajas"))
    private MotivoBajaModel motivo_baja;

    @ManyToOne
    @JoinColumn(name = "id_tipo_estado", nullable = false, foreignKey = @ForeignKey(name = "FK_bajas_laborales_empleados_tipos_estados"))
    private TipoEstadoModel tipo_estado;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_baja_laboral_empleado", id_baja_laboral_empleado);
        map.put("fecha_inicio", fecha_inicio);
        map.put("fecha_fin", fecha_fin);
        map.put("comentarios", comentarios);
        return map;
    }
}

/*
 * - ID de Baja (Clave Primaria)
 * - ID de Persona (Clave Externa que se relaciona con la tabla de Gestión de
 * Personas)
 * - Fecha de Inicio
 * - Fecha de Finalización
 * - ID de Motivo de la Baja (Clave Externa que se relaciona con la tabla de
 * Motivos de Baja)
 * - Estado de la Baja (pendiente, aprobada, rechazada) -> El campo será
 * "id_tipo_estado" con la tabla tipo_estado
 */
