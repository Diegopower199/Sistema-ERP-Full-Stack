package tfg.backend.models;



import java.io.Serializable;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "nominas_empleados")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NominaEmpleadoModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nomina_empleado", nullable = false)
    private int id_nomina_empleado;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "mes", nullable = false)
    private int mes;

    @Column(name = "year", nullable = false)
    private int year;

    @Column(name = "salario", nullable = false)
    private float salario;

    @Column(name = "deducciones", nullable = false)
    private float deducciones;

    @Column(name = "bonificacion", nullable = false)
    private float bonificacion;

    @Column(name = "salario_neto", nullable = false)
    private float salario_neto;

    @ManyToOne
    @JoinColumn(name = "id_persona", nullable = false)
    private PersonaModel persona;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_nomina_empleado", id_nomina_empleado);
        map.put("fecha", fecha);
        map.put("mes", mes);
        map.put("year", year);
        map.put("salario", salario);
        map.put("deducciones", deducciones);
        map.put("bonificacion", bonificacion);
        map.put("salario_neto", salario_neto);
        return map;
    }
}

/*
 * - ID de Registro (Clave Primaria)
 * - ID de Persona (Clave Externa que se relaciona con la tabla de Gestión de
 * Personas)
 * - Mes y Año de la Nómina
 * - Salario
 * - Deducciones
 * - Bonificaciones
 * - Salario Neto
 * 
 */
