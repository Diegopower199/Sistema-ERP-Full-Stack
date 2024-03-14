import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./styles.module.css";
import {
  authenticateUser,
  getUsuarioByNombreUsuario,
} from "@/services/UsuarioService";
import { useAuth } from "@/context/UserContext";
import { getTipoUsuarioById } from "@/services/TipoUsuarioService";
import ErrorIcon from "@mui/icons-material/Error";

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

  const [formData, setFormData] = useState({
    nombre_usuario: "a",
    password: "a",
  });

  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState({}); // ME FALTA HACER ESTO
  const [firstButtonInteraction, setFirstButtonInteraction] = useState(false); // ME FALTA HACER ESTO

  const [backendError, setBackendError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [backendOrDDBBConnectionError, setBackendOrDDBBConnectionError] =
    useState(false);

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
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const validateRequiredFields = () => {
    const errorMissingFields = {};

    if (!formData.nombre_usuario) {
      errorMissingFields.nombre_usuario =
        "Por favor, ingresa un nombre de usuario";
    }

    if (!formData.password) {
      errorMissingFields.password = "Por favor, ingresa una contraseña";
    }

    setRequiredFieldsIncomplete(errorMissingFields);

    console.log("errorMissingFields: ", errorMissingFields);

    return Object.keys(errorMissingFields).length !== 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errorDevueltoBack = false;
    let errorConexionBackEndOrBBDD = false;
    let usuarioExiste = false;

    if (!firstButtonInteraction) {
      setFirstButtonInteraction(true);
    }

    const requiredFieldsError = validateRequiredFields();
    if (requiredFieldsError) {
      console.log("Error en campos obligatorios: ", requiredFieldsError);
      setErrorMessage(
        "No se puede añadir un registro con uno o más campos vacios "
      );
      return;
    }

    try {
      console.log(formData);
      const responseAuthenticateUser = await authenticateUser(
        formData.nombre_usuario,
        formData.password
      );
      console.log("Respuesta de back-end: ", responseAuthenticateUser);

      if (responseAuthenticateUser.status === 409) {
        setBackendError(true);
        setErrorMessage(responseAuthenticateUser.errorMessage);
        errorDevueltoBack = true;
      } else if (responseAuthenticateUser.status === 500) {
        setBackendOrDDBBConnectionError(true);
        setErrorMessage(responseAuthenticateUser.errorMessage);
        errorConexionBackEndOrBBDD = true;
      } else {
        errorDevueltoBack = false;
        errorConexionBackEndOrBBDD = false;
        usuarioExiste = responseAuthenticateUser.data.resultado;
        if (usuarioExiste === false) {
          setErrorMessage("Usuario o contraseña no son correctos");
        }
      }

      if (
        errorDevueltoBack === false &&
        errorConexionBackEndOrBBDD === false &&
        usuarioExiste === true
      ) {
        const responseNombreUsuario = await getUsuarioByNombreUsuario(
          formData.nombre_usuario
        );
        console.log("Respuesta de este usuario: ", responseNombreUsuario.data);

        const responseTipoUsuarioDelNombreUsuario = await getTipoUsuarioById(
          responseNombreUsuario.data.tipo_usuario.id_tipo_usuario
        );
        console.log(
          "Respuesta de este responseTipoUsuarioDelNombreUsuario: ",
          responseTipoUsuarioDelNombreUsuario
        );

        setIsLoggedIn(true);
        setAuthUser({
          nombre_usuario: formData.nombre_usuario,
          password: formData.password,
          persona: {
            id_persona: parseInt(responseNombreUsuario.data.persona.id_persona),
          },
          tipo_usuario: {
            id_tipo_usuario: parseInt(
              responseNombreUsuario.data.tipo_usuario.id_tipo_usuario
            ),
          },
        });

        setPermisosUser(
          responseTipoUsuarioDelNombreUsuario.data.permiso_usuario
        );
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
                value={formData.nombre_usuario}
                onChange={handleChange}
              />
            </div>

            <div className={styles.contenedorInput}>
              <input
                className={styles.inputEmailUsuarioPassword}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {(backendError ||
              backendOrDDBBConnectionError ||
              errorMessage.length !== 0 ||
              Object.keys(requiredFieldsIncomplete).length !== 0) && (
              <>
                <p className={styles.errorMessage}>
                  <ErrorIcon fontSize="medium" color="error" />
                  Error: {errorMessage}
                </p>
              </>
            )}
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
