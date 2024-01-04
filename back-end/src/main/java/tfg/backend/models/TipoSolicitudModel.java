package tfg.backend.models;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "tipos_solicitudes")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TipoSolicitudModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_solicitud", nullable = false)
    private int id_tipo_solicitud;

    @Column(name = "tipo_solicitud", unique = true, nullable = false)
    private String tipo_solicitud;

    @JsonIgnore
    @OneToMany(mappedBy = "tipo_solicitud", cascade = CascadeType.REMOVE) // En el mappedBy debo poner la variable que
                                                                          // he
                                                                          // puesto en usuario, en lo del private
    private List<SolicitudEmpleadoModel> solicitudesEmpleados;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_tipo_solicitud", id_tipo_solicitud);
        map.put("tipo_solicitud", tipo_solicitud);
        return map;
    }
}
