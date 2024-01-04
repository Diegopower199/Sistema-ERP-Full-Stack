package tfg.backend.models;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "tipos_personas")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TipoPersonaModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_persona", nullable = false)
    private int id_tipo_persona;

    @Column(name = "tipo_persona", unique = true, nullable = false)
    private String tipo_persona;

    @JsonIgnore
    @OneToMany(mappedBy = "tipo_persona", cascade = CascadeType.REMOVE) // En el mappedBy debo poner la variable que he
                                                                        // puesto en usuario, en lo del private
    private List<PersonaModel> personas;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_tipo_persona", id_tipo_persona);
        map.put("tipo_persona", tipo_persona);
        return map;
    }
}
