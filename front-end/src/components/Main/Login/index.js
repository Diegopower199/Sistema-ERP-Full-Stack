import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/components/Main/Login/styles.module.css";
import {
  authenticateUser,
  getUsuarioByNombreUsuario,
} from "@/services/UsuarioService";
import { useAuth } from "@/context/UserContext";
import { getTipoUsuarioById } from "@/services/TipoUsuarioService";

export default function Login() {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    permisosUser,
    setPermisosUser,
  } = useAuth();

  const router = useRouter();

  const [formulario, setFormulario] = useState({
    nombre_usuario: "a",
    password: "a",
  });

  const [usuarioIncorrecta, setUsuarioIncorrecta] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    console.log("pagina de login: ");
    console.log("authUser: ", authUser);
    console.log("isLoggedIn: ", isLoggedIn);
    if (authUser) {
      router.push("/menu-principal");
    } else {
      router.push("/login");
    }
  }, [authUser]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    // Manejar cambios según el tipo de input
    setFormulario((prevState) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formulario);
      const responseAuthenticateUser = await authenticateUser(
        formulario.nombre_usuario,
        formulario.password
      );
      console.log("Respuesta de back-end: ", responseAuthenticateUser);

      if (responseAuthenticateUser.data.resultado === true) {
        const responseNombreUsuario = await getUsuarioByNombreUsuario(
          formulario.nombre_usuario
        );
        console.log("Respuesta de este usuario: ", responseNombreUsuario.data);

        const responseTipoUsuarioDelNombreUsuario = await getTipoUsuarioById(
          responseNombreUsuario.data.tipo_usuario.id_tipo_usuario
        );
        console.log(
          "Respuesta de este responseTipoUsuarioDelNombreUsuario: ",
          responseTipoUsuarioDelNombreUsuario
        );

        // Poner aqui abajo los permisos del usuario con setPermisosUser
        setIsLoggedIn(true);
        setAuthUser({
          nombre_usuario: formulario.nombre_usuario,
          password: formulario.password,
          persona: {
            id_persona: parseInt(responseNombreUsuario.data.persona.id_persona),
          },
          tipo_usuario: {
            id_tipo_usuario: parseInt(
              responseNombreUsuario.data.tipo_usuario.id_tipo_usuario
            ),
          },
        });
        setPermisosUser({
          actualizar_usuarios:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_usuarios,
          actualizar_personas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_personas,
          actualizar_nominas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_nominas,
          actualizar_asistencias:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_asistencias,
          actualizar_ayudas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_ayudas,
          actualizar_bajas_laborales:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_bajas_laborales,
          actualizar_solicitudes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_solicitudes,
          actualizar_vacaciones:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_vacaciones,
          actualizar_clientes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_clientes,
          actualizar_pedidos_clientes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_pedidos_clientes,
          actualizar_facturas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_facturas,
          actualizar_detalles_facturas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_detalles_facturas,
          actualizar_pagos_facturas_clientes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .actualizar_pagos_facturas_clientes,
          borrar_usuarios:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_usuarios,
          borrar_personas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_personas,
          borrar_nominas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_nominas,
          borrar_asistencias:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_asistencias,
          borrar_ayudas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_ayudas,
          borrar_bajas_laborales:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_bajas_laborales,
          borrar_solicitudes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_solicitudes,
          borrar_vacaciones:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_vacaciones,
          borrar_clientes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_clientes,
          borrar_pedidos_clientes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_pedidos_clientes,
          borrar_facturas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_facturas,
          borrar_detalles_facturas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_detalles_facturas,
          borrar_pagos_facturas_clientes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .borrar_pagos_facturas_clientes,
          crear_usuarios:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_usuarios,
          crear_personas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_personas,
          crear_nominas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_nominas,
          crear_asistencias:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_asistencias,
          crear_ayudas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_ayudas,
          crear_bajas_laborales:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_bajas_laborales,
          crear_solicitudes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_solicitudes,
          crear_vacacione:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_vacaciones,
          crear_clientes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_clientes,
          crear_pedidos_clientes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_pedidos_clientes,
          crear_facturas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_facturas,
          crear_detalles_facturas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_detalles_facturas,
          crear_pagos_facturas_clientes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .crear_pagos_facturas_clientes,
          ver_usuarios:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .ver_usuarios,
          ver_personas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .ver_personas,
          ver_nominas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .ver_nominas,
          ver_asistencias:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .ver_asistencias,
          ver_ayudas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario.ver_ayudas,
          ver_bajas_laborales:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .ver_bajas_laborales,
          ver_solicitudes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .ver_solicitudes,
          ver_vacaciones:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .ver_vacaciones,
          ver_clientes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .ver_clientes,
          ver_pedidos_clientes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .ver_pedidos_clientes,
          ver_facturas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .ver_facturas,
          ver_detalles_facturas:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .ver_detalles_facturas,
          ver_pagos_facturas_clientes:
            responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
              .ver_pagos_facturas_clientes,
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <h1>LOGIN</h1>
      <div className={styles.formulario}>
        <h1 className={styles.tituloH1}>Login</h1>
        <div className={styles.contenedor}>
          <form onSubmit={handleSubmit}>
            <div className={styles.contenedorInput}>
              <input
                className={styles.inputEmailUsuarioPassword}
                type="text"
                name="nombre_usuario"
                value={formulario.nombre_usuario}
                onChange={handleChange}
              />
            </div>

            <div className={styles.contenedorInput}>
              <input
                className={styles.inputEmailUsuarioPassword}
                type="password"
                name="password"
                value={formulario.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p className={styles.parrafo}>
            Al registrarte, aceptas nuestras Condiciones de uso y Política de
            privacidad.
          </p>
          <p className={styles.parrafo}>
            <Link href={"/update-password"}>¿Has olvidado tu contraseña?</Link>
          </p>
        </div>
      </div>
      EN LOGIN DEBO QUITAR LO DE VALUE Y PONER EL COMENTADO EN USUARIO Y
      CONTRASEÑA
    </>
  );
}
