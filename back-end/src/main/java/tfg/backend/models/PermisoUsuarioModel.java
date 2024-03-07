package tfg.backend.models;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "permisos_usuarios")
@Entity
@ToString
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PermisoUsuarioModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_permiso_usuario", nullable = false)
    private int id_permiso_usuario;

    @Column(name = "crear_usuarios", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_usuarios;

    @Column(name = "actualizar_usuarios", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_usuarios;

    @Column(name = "ver_usuarios", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_usuarios;

    @Column(name = "borrar_usuarios", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_usuarios;

    @Column(name = "crear_personas", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_personas;

    @Column(name = "actualizar_personas", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_personas;

    @Column(name = "ver_personas", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_personas;

    @Column(name = "borrar_personas", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_personas;

    @Column(name = "crear_nominas", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_nominas;

    @Column(name = "actualizar_nominas", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_nominas;

    @Column(name = "ver_nominas", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_nominas;

    @Column(name = "borrar_nominas", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_nominas;

    @Column(name = "crear_asistencias", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_asistencias;

    @Column(name = "actualizar_asistencias", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_asistencias;

    @Column(name = "ver_asistencias", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_asistencias;

    @Column(name = "borrar_asistencias", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_asistencias;

    @Column(name = "crear_ayudas", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_ayudas;

    @Column(name = "actualizar_ayudas", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_ayudas;

    @Column(name = "ver_ayudas", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_ayudas;

    @Column(name = "borrar_ayudas", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_ayudas;

    @Column(name = "crear_bajas_laborales", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_bajas_laborales;

    @Column(name = "actualizar_bajas_laborales", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_bajas_laborales;

    @Column(name = "ver_bajas_laborales", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_bajas_laborales;

    @Column(name = "borrar_bajas_laborales", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_bajas_laborales;

    @Column(name = "crear_solicitudes", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_solicitudes;

    @Column(name = "actualizar_solicitudes", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_solicitudes;

    @Column(name = "ver_solicitudes", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_solicitudes;

    @Column(name = "borrar_solicitudes", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_solicitudes;

    @Column(name = "crear_vacaciones", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_vacaciones;

    @Column(name = "actualizar_vacaciones", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_vacaciones;

    @Column(name = "ver_vacaciones", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_vacaciones;

    @Column(name = "borrar_vacaciones", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_vacaciones;

    @Column(name = "crear_clientes", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_clientes;

    @Column(name = "actualizar_clientes", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_clientes;

    @Column(name = "ver_clientes", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_clientes;

    @Column(name = "borrar_clientes", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_clientes;

    @Column(name = "crear_pedidos_clientes", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_pedidos_clientes;

    @Column(name = "actualizar_pedidos_clientes", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_pedidos_clientes;

    @Column(name = "ver_pedidos_clientes", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_pedidos_clientes;

    @Column(name = "borrar_pedidos_clientes", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_pedidos_clientes;

    @Column(name = "crear_facturas", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_facturas;

    @Column(name = "actualizar_facturas", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_facturas;

    @Column(name = "ver_facturas", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_facturas;

    @Column(name = "borrar_facturas", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_facturas;

    @Column(name = "crear_detalles_facturas", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_detalles_facturas;

    @Column(name = "actualizar_detalles_facturas", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_detalles_facturas;

    @Column(name = "ver_detalles_facturas", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_detalles_facturas;

    @Column(name = "borrar_detalles_facturas", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_detalles_facturas;

    @Column(name = "crear_pagos_facturas_clientes", nullable = false, columnDefinition = "boolean default false")
    private boolean crear_pagos_facturas_clientes;

    @Column(name = "actualizar_pagos_facturas_clientes", nullable = false, columnDefinition = "boolean default false")
    private boolean actualizar_pagos_facturas_clientes;

    @Column(name = "ver_pagos_facturas_clientes", nullable = false, columnDefinition = "boolean default false")
    private boolean ver_pagos_facturas_clientes;

    @Column(name = "borrar_pagos_facturas_clientes", nullable = false, columnDefinition = "boolean default false")
    private boolean borrar_pagos_facturas_clientes;

    @JsonIgnore
    @OneToOne(mappedBy = "permiso_usuario", cascade = CascadeType.REMOVE)
    private TipoUsuarioModel tipo_usuario;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id_permiso_usuario", id_permiso_usuario);
        map.put("actualizar_usuarios", actualizar_usuarios);
        map.put("actualizar_personas", actualizar_personas);
        map.put("actualizar_nominas", actualizar_nominas);
        map.put("actualizar_asistencias", actualizar_asistencias);
        map.put("actualizar_ayudas", actualizar_ayudas);
        map.put("actualizar_bajas_laborales", actualizar_bajas_laborales);
        map.put("actualizar_solicitudes", actualizar_solicitudes);
        map.put("actualizar_vacaciones", actualizar_vacaciones);
        map.put("actualizar_clientes", actualizar_clientes);
        map.put("actualizar_pedidos_clientes", actualizar_pedidos_clientes);
        map.put("actualizar_facturas", actualizar_facturas);
        map.put("actualizar_detalles_facturas", actualizar_detalles_facturas);
        map.put("actualizar_pagos_facturas_clientes", actualizar_pagos_facturas_clientes);
        map.put("borrar_usuarios", borrar_usuarios);
        map.put("borrar_personas", borrar_personas);
        map.put("borrar_nominas", borrar_nominas);
        map.put("borrar_asistencias", borrar_asistencias);
        map.put("borrar_ayudas", borrar_ayudas);
        map.put("borrar_bajas_laborales", borrar_bajas_laborales);
        map.put("borrar_solicitudes", borrar_solicitudes);
        map.put("borrar_vacaciones", borrar_vacaciones);
        map.put("borrar_clientes", borrar_clientes);
        map.put("borrar_pedidos_clientes", borrar_pedidos_clientes);
        map.put("borrar_facturas", borrar_facturas);
        map.put("borrar_detalles_facturas", borrar_detalles_facturas);
        map.put("borrar_pagos_facturas_clientes", borrar_pagos_facturas_clientes);
        map.put("crear_usuarios", crear_usuarios);
        map.put("crear_personas", crear_personas);
        map.put("crear_nominas", crear_nominas);
        map.put("crear_asistencias", crear_asistencias);
        map.put("crear_ayudas", crear_ayudas);
        map.put("crear_bajas_laborales", crear_bajas_laborales);
        map.put("crear_solicitudes", crear_solicitudes);
        map.put("crear_vacaciones", crear_vacaciones);
        map.put("crear_clientes", crear_clientes);
        map.put("crear_pedidos_clientes", crear_pedidos_clientes);
        map.put("crear_facturas", crear_facturas);
        map.put("crear_detalles_facturas", crear_detalles_facturas);
        map.put("crear_pagos_facturas_clientes", crear_pagos_facturas_clientes);
        map.put("ver_usuarios", ver_usuarios);
        map.put("ver_personas", ver_personas);
        map.put("ver_nominas", ver_nominas);
        map.put("ver_asistencias", ver_asistencias);
        map.put("ver_ayudas", ver_ayudas);
        map.put("ver_bajas_laborales", ver_bajas_laborales);
        map.put("ver_solicitudes", ver_solicitudes);
        map.put("ver_vacaciones", ver_vacaciones);
        map.put("ver_clientes", ver_clientes);
        map.put("ver_pedidos_clientes", ver_pedidos_clientes);
        map.put("ver_facturas", ver_facturas);
        map.put("ver_detalles_facturas", ver_detalles_facturas);
        map.put("ver_pagos_facturas_clientes", ver_pagos_facturas_clientes);

        return map;
    }

}
