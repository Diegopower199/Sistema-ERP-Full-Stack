package tfg.backend.models;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "motivos_bajas", uniqueConstraints = {
        @UniqueConstraint(name = "UK_motivo_baja", columnNames = "motivo_baja"), })
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MotivoBajaModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_motivo_baja", nullable = false)
    private int id_motivo_baja;

    @Column(name = "motivo_baja", unique = true, nullable = false)
    private String motivo_baja;

    @JsonIgnore
    @OneToMany(mappedBy = "motivo_baja", cascade = CascadeType.REMOVE)
    private List<BajaLaboralEmpleadoModel> bajasLaboralesEmpleados;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_motivo_baja", id_motivo_baja);
        map.put("motivo_baja", motivo_baja);
        return map;
    }

}
