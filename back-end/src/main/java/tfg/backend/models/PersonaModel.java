package tfg.backend.models;



import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "personas")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PersonaModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_persona", nullable = false)
    private int id_persona;

    @Column(name = "numero_empleado", unique = true, nullable = false)
    private int numero_empleado;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "apellidos", nullable = false)
    private String apellidos;

    @Column(name = "genero", nullable = false)
    private String genero;

    @Column(name = "fecha_nacimiento", nullable = false)
    private String fecha_nacimiento;

    @Column(name = "dni", unique = true, nullable = false)
    private String dni;

    @Column(name = "direccion", nullable = false)
    private String direccion;

    @Column(name = "numero_telefono", unique = true, nullable = false)
    private String numero_telefono;

    @Column(name = "correo_electronico", unique = true, nullable = false)
    private String correo_electronico;

    // sirve para tener un campo con la clave foránea
    @ManyToOne
    @JoinColumn(name = "id_tipo_persona", nullable = false)
    private TipoPersonaModel tipo_persona;

    @OneToOne(mappedBy = "persona", cascade = CascadeType.REMOVE)
    private UsuarioModel usuario;

    // tenemos la información de todas las vacaciones con su ID
    @JsonIgnore
    @OneToMany(mappedBy = "persona", cascade = CascadeType.REMOVE)
    private List<VacacionEmpleadoModel> vacacionesEmpleados;

    @JsonIgnore
    @OneToMany(mappedBy = "persona", cascade = CascadeType.REMOVE)
    private List<AsistenciaEmpleadoModel> asistenciasEmpleados;

    @JsonIgnore
    @OneToMany(mappedBy = "persona", cascade = CascadeType.REMOVE)
    private List<BajaLaboralEmpleadoModel> bajasLaboralesEmpleados;

    @JsonIgnore
    @OneToMany(mappedBy = "persona", cascade = CascadeType.REMOVE)
    private List<SolicitudEmpleadoModel> solicitudesEmpleados;

    @JsonIgnore
    @OneToMany(mappedBy = "persona", cascade = CascadeType.REMOVE)
    private List<AyudaEmpleadoModel> ayudasEmpleados;

    @JsonIgnore
    @OneToMany(mappedBy = "persona", cascade = CascadeType.REMOVE)
    private List<NominaEmpleadoModel> nominasEmpleados;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_persona", id_persona);
        map.put("numero_empleado", numero_empleado);
        map.put("nombre", nombre);
        map.put("apellidos", apellidos);
        map.put("genero", genero);
        map.put("fecha_nacimiento", fecha_nacimiento);
        map.put("dni", dni);
        map.put("direccion", direccion);
        map.put("numero_telefono", numero_telefono);
        map.put("correo_electronico", correo_electronico);
        return map;
    }
}

