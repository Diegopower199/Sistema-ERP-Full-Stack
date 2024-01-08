import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/components/Main/Login/styles.module.css";
import {
  authenticateUser,
  getUsuarioByNombreUsuario,
} from "@/services/usuarioService";
import { useAuth } from "@/context/UserContext";

export default function Login() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

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
      const resultado = await authenticateUser(
        formulario.nombre_usuario,
        formulario.password
      );
      console.log("Respuesta de back-end: ", resultado);

      if (resultado === true) {
        const infoUsuario = await getUsuarioByNombreUsuario(
          formulario.nombre_usuario
        );
        console.log("Respuesta de este usuario: ", infoUsuario.data);

        setIsLoggedIn(true);
        setAuthUser({
          nombre_usuario: formulario.nombre_usuario,
          password: formulario.password,
          persona: {
            id_persona: Number(infoUsuario.data.persona.id_persona),
          },
          tipo_usuario: {
            id_tipo_usuario: Number(
              infoUsuario.data.tipo_usuario.id_tipo_usuario
            ),
          },
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
            <Link href={"./registrarUser"}>¿Has olvidado tu contraseña?</Link>
          </p>
        </div>
      </div>
      EN LOGIN DEBO QUITAR LO DE VALUE Y PONER EL COMENTADO EN USUARIO Y
      CONTRASEÑA
    </>
  );
}
