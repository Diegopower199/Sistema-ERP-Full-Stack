package tfg.backend.models;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "tipos_ayudas")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TipoAyudaModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_ayuda", nullable = false)
    private int id_tipo_ayuda;

    @Column(name = "tipo_ayuda", unique = true, nullable = false)
    private String tipo_ayuda;

    @JsonIgnore
    @OneToMany(mappedBy = "tipo_ayuda", cascade = CascadeType.REMOVE)
    private List<AyudaEmpleadoModel> ayudasEmpleados;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_tipo_ayuda", id_tipo_ayuda);
        map.put("tipo_ayuda", tipo_ayuda);
        return map;
    }
}
