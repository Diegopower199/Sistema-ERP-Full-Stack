package tfg.backend.models;



import java.io.Serializable;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "ayudas_empleados")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AyudaEmpleadoModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ayuda_empleado", nullable = false)
    private int id_ayuda_empleado;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fecha_inicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fecha_fin;

    @Column(name = "valor_asociado", nullable = false)
    private float valor_asociado;

    @Column(name = "comentarios", nullable = true)
    private String comentarios;

    @ManyToOne
    @JoinColumn(name = "id_persona", nullable = false)
    private PersonaModel persona;

    @ManyToOne
    @JoinColumn(name = "id_tipo_ayuda", nullable = false)
    private TipoAyudaModel tipo_ayuda;

    @ManyToOne
    @JoinColumn(name = "id_tipo_estado", nullable = false)
    private TipoEstadoModel tipo_estado;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_ayuda_empleado", id_ayuda_empleado);
        map.put("fecha_inicio", fecha_inicio);
        map.put("fecha_fin", fecha_fin);
        map.put("valor_asociado", valor_asociado);
        map.put("comentarios", comentarios);
        return map;
    }
}

/*
 * - ID de Ayuda (Clave Primaria)
 * - ID de Persona (Clave Externa que se relaciona con la tabla de Gestión de
 * Personas)
 * - ID de Tipo de Ayuda (Clave Externa que se relaciona con la tabla de
 * "Tipos de Ayuda")
 * - Fecha de Inicio
 * - Fecha de Finalización
 * - Monto de la Ayuda (es el valor o cantidad de dinero que se proporciona como
 * ayuda a un empleado)
 */
