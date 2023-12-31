package tfg.backend.models;



import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "usuarios")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario", nullable = false)
    private int id_usuario;

    @Column(name = "nombre_usuario", unique = true, nullable = false)
    private String nombre_usuario;

    @Column(name = "password", nullable = false)
    private String password;

    @OneToOne
    @JoinColumn(name = "id_persona", unique = true, nullable = false)
    private PersonaModel persona;

    @ManyToOne
    @JoinColumn(name = "id_tipo_usuario", nullable = false)
    private TipoUsuarioModel tipo_usuario;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_usuario", id_usuario);
        map.put("nombre_usuario", nombre_usuario);
        map.put("password", password);
        return map;
    }

}

