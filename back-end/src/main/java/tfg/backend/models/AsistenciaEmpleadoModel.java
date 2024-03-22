package tfg.backend.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.LinkedHashMap;
import java.util.Map;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "asistencias_empleados")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AsistenciaEmpleadoModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_asistencia_empleado", nullable = false)
    private int id_asistencia_empleado;

    @Column(name = "fecha_asistencia", nullable = false)
    private LocalDate fecha_asistencia;

    @Column(name = "hora_entrada", nullable = false)
    private LocalTime hora_entrada;

    @Column(name = "hora_salida", nullable = true)
    private LocalTime hora_salida;

    @Column(name = "horas_trabajadas_dia", nullable = true)
    private LocalTime horas_trabajadas_dia;

    @Column(name = "observacion", nullable = true)
    private String observacion;

    @ManyToOne
    @JoinColumn(name = "id_persona", nullable = false, foreignKey = @ForeignKey(name = "FK_asistencias_empleados_personas"))
    private PersonaModel persona;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_asistencia_empleado", id_asistencia_empleado);
        map.put("fecha_asistencia", fecha_asistencia);
        map.put("hora_entrada", hora_entrada);
        map.put("hora_salida", hora_salida);
        map.put("horas_trabajadas_dia", horas_trabajadas_dia);
        map.put("observacion", observacion);
        return map;
    }

}