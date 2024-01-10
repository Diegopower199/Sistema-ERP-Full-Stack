package tfg.backend.models;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "clientes")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClienteModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente", nullable = false)
    private int id_cliente;

    @Column(name = "nif", nullable = false)
    private String nif;

    @Column(name = "nombre_apellidos", nullable = false)
    private String nombre_apellidos;

    @Column(name = "razon_social", nullable = false)
    private String razon_social;

    @Column(name = "numero_telefono", nullable = false)
    private String numero_telefono;

    @Column(name = "correo_electronico", nullable = false)
    private String correo_electronico;

    @Column(name = "direccion", nullable = false)
    private String direccion;

    @Column(name = "codigo_postal", nullable = false)
    private String codigo_postal;

    @Column(name = "ciudad", nullable = false)
    private String ciudad;

    @Column(name = "provincia", nullable = false)
    private String provincia;

    @JsonIgnore
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.REMOVE)
    private List<PedidoClienteModel> pedidosClientes;

    @JsonIgnore
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.REMOVE)
    private List<FacturaClienteModel> facturasClientes;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_cliente", id_cliente);
        map.put("nif", nif);
        map.put("nombre_apellidos", nombre_apellidos);
        map.put("razon_social", razon_social);
        map.put("numero_telefono", numero_telefono);
        map.put("correo_electronico", correo_electronico);
        map.put("direccion", direccion);
        map.put("codigo_postal", codigo_postal);
        map.put("ciudad", ciudad);
        map.put("provincia", provincia);
        return map;
    }
}

/*
 * Tabla: Clientes
 * ID_Cliente (Clave primaria)
 * NIF -> mirar esto: https://www.generador-de-dni.com/generador-de-dni
 * Nombre y apellidos
 * Empresa (Razon social) -> Nombre de la empresa
 * Teléfono
 * Correo
 * Dirección
 * Código_Postal
 * Ciudad
 * Provincia
 */