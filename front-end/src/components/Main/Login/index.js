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
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, permisosUser, setPermisosUser } = useAuth();

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
          actualizar_usuarios: true,
          actualizar_personas: true,
          actualizar_nominas: true,
          actualizar_asistencias: true,
          actualizar_ayudas: true,
          actualizar_bajas_laborales: true,
          actualizar_solicitudes: true,
          actualizar_vacaciones: true,
          actualizar_clientes: true,
          actualizar_pedidos_clientes: true,
          actualizar_facturas: true,
          actualizar_detalles_facturas: true,
          actualizar_pagos_facturas_clientes: true,
          borrar_usuarios: true,
          borrar_personas: true,
          borrar_nominas: true,
          borrar_asistencias: true,
          borrar_ayudas: true,
          borrar_bajas_laborales: true,
          borrar_solicitudes: true,
          borrar_vacaciones: true,
          borrar_clientes: true,
          borrar_pedidos_clientes: true,
          borrar_facturas: true,
          borrar_detalles_facturas: true,
          borrar_pagos_facturas_clientes: true,
          crear_usuarios: true,
          crear_personas: true,
          crear_nominas: true,
          crear_asistencias: true,
          crear_ayudas: true,
          crear_bajas_laborales: true,
          crear_solicitudes: true,
          crear_vacacione: true,
          crear_clientes: true,
          crear_pedidos_clientes: true,
          crear_facturas: true,
          crear_detalles_facturas: true,
          crear_pagos_facturas_clientes: true,
          ver_usuarios: true,
          ver_personas: true,
          ver_nominas: true,
          ver_asistencias: true,
          ver_ayudas: true,
          ver_bajas_laborales: true,
          ver_solicitudes: true,
          ver_vacaciones: true,
          ver_clientes: true,
          ver_pedidos_clientes: true,
          ver_facturas: true,
          ver_detalles_facturas: true,
          ver_pagos_facturas_clientes: true,
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
