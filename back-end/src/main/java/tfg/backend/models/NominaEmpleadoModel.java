package tfg.backend.models;

import java.io.Serializable;
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

    @Column(name = "year", nullable = false)
    private int year;

    @Column(name = "mes", nullable = false)
    private int mes;

    @Column(name = "tipo_nomina", nullable = false)
    private String tipo_nomina;

    @Column(name = "salario_base", nullable = false)
    private float salario_base;

    @Column(name = "deducciones", nullable = false)
    private float deducciones;

    @Column(name = "bonificacion", nullable = false)
    private float bonificacion;

    @Column(name = "salario_bruto", nullable = false)
    private float salario_bruto;

    @Column(name = "irpf", nullable = false)
    private float irpf;

    @Column(name = "seguridad_social", nullable = false)
    private String seguridad_social;

    @Column(name = "anticipos", nullable = false)
    private float anticipos;

    @Column(name = "salario_neto", nullable = false)
    private float salario_neto;

    @Column(name = "cuenta_bancaria", nullable = false)
    private String cuenta_bancaria;

    @ManyToOne
    @JoinColumn(name = "id_persona", nullable = false, foreignKey = @ForeignKey(name = "FK_nominas_empleados_personas"))
    private PersonaModel persona;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_nomina_empleado", id_nomina_empleado);
        map.put("year", year);
        map.put("mes", mes);
        map.put("tipo_nomina", tipo_nomina);
        map.put("salario_base", salario_base);
        map.put("deducciones", deducciones);
        map.put("bonificacion", bonificacion);
        map.put("salario_bruto", salario_bruto);
        map.put("irpf", irpf);
        map.put("seguridad_social", seguridad_social);
        map.put("anticipos", anticipos);
        map.put("salario_neto", salario_neto);
        map.put("cuenta_bancaria", cuenta_bancaria);
        return map;
    }
}

/*
 * Tabla de Nómina Empleados:
 * - ID de nomina(Clave Primaria)
 * - ID de Persona (Clave Externa se relaciona con la tabla de Personas)
 * - Año nomina
 * - Mes nómina
 * - Tipo nómina
 * - Salario base
 * - Deducciones
 * - Bonificaciones
 * - Salario bruto
 * - IRPF -> 14%
 * - Seguridad social
 * - Anticipos
 * - Salario Neto
 * - Cuenta bancaria
 */