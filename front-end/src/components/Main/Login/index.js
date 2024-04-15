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
import * as Antd from "antd";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

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

  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState({});
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);

  const [backendError, setBackendError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [backendOrDDBBConnectionError, setBackendOrDDBBConnectionError] =
    useState(false);

  function handleBackendError(errorMessage) {
    setBackendError(true);
    setErrorMessage(errorMessage);
    setLoginButtonClicked(false);
  }

  function handleBackendAndDBConnectionError(errorMessage) {
    setBackendOrDDBBConnectionError(true);
    setErrorMessage(errorMessage);
    setLoginButtonClicked(false);
  }

  useEffect(() => {
    if (authUser) {
      router.push("/menu-principal");
    } else {
      router.push("/login");
    }
  }, [authUser]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        [name]: value,
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

    return Object.keys(errorMissingFields).length !== 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loginButtonClicked) {
      return;
    }

    setLoginButtonClicked(true);

    const requiredFieldsError = validateRequiredFields();
    if (requiredFieldsError) {
      setErrorMessage(
        "No se puede añadir un registro con uno o más campos vacios "
      );
      setLoginButtonClicked(false);
      return;
    }

    try {
      const responseAuthenticateUser = await authenticateUser(
        formData.nombre_usuario,
        formData.password
      );

      errorHandlingInfo = checkResponseForErrors(responseAuthenticateUser);

      if (errorHandlingInfo.backendError) {
        handleBackendError(responseAuthenticateUser.errorMessage);
        return;
      } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseAuthenticateUser.errorMessage
        );
        return;
      }

      if (responseAuthenticateUser.data.resultado === false) {
        setErrorMessage("Usuario o contraseña no son correctos");
        setLoginButtonClicked(false);
        return;
      }

      const responseNombreUsuario = await getUsuarioByNombreUsuario(
        formData.nombre_usuario
      );

      errorHandlingInfo = checkResponseForErrors(responseNombreUsuario);

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(responseNombreUsuario.errorMessage);
        return;
      }

      const responseTipoUsuarioDelNombreUsuario = await getTipoUsuarioById(
        responseNombreUsuario.data.tipo_usuario.id_tipo_usuario
      );

      errorHandlingInfo = checkResponseForErrors(
        responseTipoUsuarioDelNombreUsuario
      );

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseTipoUsuarioDelNombreUsuario.errorMessage
        );
        return;
      }

      setIsLoggedIn(true);
      setAuthUser({
        id_usuario: responseNombreUsuario.data.id_usuario,
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

      setPermisosUser(responseTipoUsuarioDelNombreUsuario.data.permiso_usuario);
      setLoginButtonClicked(false);
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  return (
    <div>
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
                onChange={handleFormChange}
              />
            </div>

            <div className={styles.contenedorInput}>
              <input
                className={styles.inputEmailUsuarioPassword}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
              />
            </div>
            {(backendError ||
              backendOrDDBBConnectionError ||
              errorMessage.length !== 0 ||
              Object.keys(requiredFieldsIncomplete).length !== 0) && (
              <div>
                <p className={styles.errorMessage}>
                  <ErrorIcon fontSize="medium" color="error" />
                  Error: {errorMessage}
                </p>
              </div>
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
    </div>
  );
}
