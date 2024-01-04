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

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "hora_entrada", nullable = false) // LocalTime tiempoEspecifico = LocalTime.of(12, 30, 45);
    private LocalTime hora_entrada;

    @Column(name = "hora_salida", nullable = true)
    private LocalTime hora_salida;

    @Column(name = "total_horas_trabajadas", nullable = false)
    private int total_horas_trabajadas;

    @Column(name = "comentarios", nullable = true)
    private String comentarios;

    @ManyToOne
    @JoinColumn(name = "id_persona", nullable = false)
    private PersonaModel persona;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_asistencia_empleado", id_asistencia_empleado);
        map.put("fecha", fecha);
        map.put("hora_entrada", hora_entrada);
        map.put("hora_salida", hora_salida);
        map.put("total_horas_trabajadas", total_horas_trabajadas);
        map.put("comentarios", comentarios);
        return map;
    }
}

/*
 * - ID de Registro (Clave Primaria)
 * - ID de Persona (Clave Externa que se relaciona con la tabla de Gestión de
 * Personas)
 * - Fecha
 * - Hora de Entrada
 * - Hora de Salida
 * - Total de Horas Trabajadas
 */