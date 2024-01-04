package tfg.backend.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "solicitudes_empleados")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SolicitudEmpleadoModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitud_empleado", nullable = false)
    private int id_solicitud_empleado;

    @Column(name = "fecha_solicitud", nullable = false)
    private LocalDate fecha_solicitud;

    @Column(name = "comentarios", nullable = true)
    private String comentarios;

    @ManyToOne
    @JoinColumn(name = "id_persona", nullable = false)
    private PersonaModel persona;

    @ManyToOne
    @JoinColumn(name = "id_tipo_solicitud", nullable = false)
    private TipoSolicitudModel tipo_solicitud;

    @ManyToOne
    @JoinColumn(name = "id_tipo_estado", nullable = false)
    private TipoEstadoModel tipo_estado;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_solicitud_empleado", id_solicitud_empleado);
        map.put("fecha_solicitud", fecha_solicitud);
        map.put("comentarios", comentarios);
        return map;
    }
}

/*
 * - ID de Solicitud (Clave Primaria)
 * - ID de Persona (Clave Externa que se relaciona con la tabla de Gestión de
 * Personas)
 * - Fecha de Solicitud
 * - ID de Tipo de Solicitud (Clave Externa que se relaciona con la tabla de
 * "Tipos de Solicitud")
 * - Tipo de Solicitud (permiso, cambio de turno, vacaciones, otros) (clave
 * foránea de tipo_solicitud)
 * - Estado de la Solicitud (pendiente, aprobada, rechazada) -> El campo será
 * "id_tipo_estado" con la tabla tipo_estado
 * - Comentarios
 */
