import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { sendEmailNodeMailer } from "@/services/EmailService";
import { updatePassword } from "@/services/UsuarioService";
import { existsCorreoElectronico } from "@/services/PersonaService";
import styles from "./styles.module.css";

export default function UpdatePassword() {
  const router = useRouter();

  const [correctEmail, setCorrectEmail] = useState(false);
  const [correctVerificationCode, setCorrectVerificationCode] = useState(false);
  const [userAttempts, setUserAttempts] = useState(0);
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    correo_electronico: "",
    codigo_verificacion: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState({});

  function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 1000000);

    let formattedNumber = randomNumber.toString().padStart(6, "0");

    return formattedNumber;
  }

  const sendEmail = async () => {
    try {
      const errorMissingFields = {};

      if (!formData.correo_electronico) {
        errorMissingFields.correo_electronico =
          "Por favor, ingresa un correo electronico";
      }

      setRequiredFieldsIncomplete(errorMissingFields);

      console.log("errorMissingFields: ", errorMissingFields);

      if (Object.keys(errorMissingFields).length === 0) {
        const codigoVerificacion = generateRandomNumber();
        console.log("codigoVerificacion: ", codigoVerificacion);
        setCodigoVerificacion(codigoVerificacion);
        const data = {
          correo_electronico: formData.correo_electronico,
          codigo_verificacion: codigoVerificacion,
        };

        const responseExistsEmail = await existsCorreoElectronico(
          data.correo_electronico
        );

        console.log("responseExistsEmail: ", responseExistsEmail);

        if (responseExistsEmail.data.resultado === true) {
          const responseSendEmail = await sendEmailNodeMailer(data);

          console.log("responseSendEmail: ", responseSendEmail);
          if (responseSendEmail.status === 200) {
            setErrorMessage("");
            setCorrectEmail(true);
          }
        } else {
          setErrorMessage("Error, El correo no existe");
        }
      }
    } catch (error) {
      console.error("El Error es: ", error.message);
    }
  };

  const verifyCode = () => {
    console.log("formData.codigo_verificacion: ", formData.codigo_verificacion);
    console.log("codigoVerificacion: ", codigoVerificacion);

    if (
      formData.codigo_verificacion === "" ||
      formData.codigo_verificacion === null
    ) {
      setErrorMessage("Error, debes ingresar un código");
      return;
    } else {
      setErrorMessage("");
    }
    if (
      parseInt(formData.codigo_verificacion) !== parseInt(codigoVerificacion)
    ) {
      console.log("No coincide");
      setUserAttempts(userAttempts + 1);
      return false;
    } else {
      setCorrectVerificationCode(true);
      return true;
    }
  };

  const changePassword = async () => {
    try {
      console.log("change password");

      if (formData.new_password === formData.confirm_new_password) {
        const responseUpdatePassword = await updatePassword(formData);

        console.log("responseUpdatePassword: ", responseUpdatePassword);
        router.push("/login");
      } else {
        console.log("La contraseñas no coinciden");
      }
    } catch (error) {
      console.error("El Error es: ", error.message);
    }
  };

  function redirectToLogin() {
    router.push("/login");
  }

  function resetStates() {
    setCorrectEmail(false);
    setCorrectVerificationCode(false);
    setUserAttempts(0);
    setCodigoVerificacion("");
    setFormData({
      correo_electronico: "",
      codigo_verificacion: "",
      new_password: "",
      confirm_new_password: "",
    });
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        [name]: value,
      };
    });
  };

  return (
    <div>
      {correctEmail === false && correctVerificationCode === false && (
        <div>
          <h1>Recuperacion de cuenta</h1>
          <label>
            Correo electronico:
            <input
              type="text"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleFormChange}
            />
            {(requiredFieldsIncomplete.correo_electronico ||
              errorMessage.length !== 0) && (
              <div className={styles.RequiredFieldsOrFormatError}>
                {requiredFieldsIncomplete.correo_electronico || errorMessage}
              </div>
            )}
          </label>
          <br />
          <br />
        </div>
      )}
      {correctEmail === false && correctVerificationCode === false && (
        <div>
          <button onClick={redirectToLogin}>Cancelar</button>{" "}
          <button onClick={sendEmail}>Continuar</button>
        </div>
      )}

      {correctEmail === true && correctVerificationCode === false && (
        <div>
          <h1>Introduce el codigo</h1>
          <p>
            Introduce el codigo de verificacion de 6 digitos del correo
            electronico
          </p>
          <p>
            {`Has realizado ${userAttempts} intentos. te quedan ${
              5 - userAttempts
            } intentos`}
          </p>
          <label>
            <input
              type="number"
              name="codigo_verificacion"
              value={formData.codigo_verificacion}
              onChange={handleFormChange}
            />
            {errorMessage.length !== 0 && (
              <div className={styles.RequiredFieldsOrFormatError}>
                {errorMessage}
              </div>
            )}
          </label>
          <br />
          <br />
        </div>
      )}
      {correctEmail === true && correctVerificationCode === false && (
        <div>
          <button onClick={resetStates}>Anterior</button>{" "}
          <button
            onClick={verifyCode}
            disabled={
              userAttempts >= 5 && correctVerificationCode === false
                ? true
                : false
            }
          >
            Verificar
          </button>
        </div>
      )}

      {correctEmail === true && correctVerificationCode === true && (
        <div>
          <h1>Cambiar la contraseña</h1>
          <label>
            Nueva contraseña:
            <input
              type="text"
              name="new_password"
              value={formData.new_password}
              onChange={handleFormChange}
            />
          </label>
          <br />
          <br />
          <label>
            Confirmar nueva contraseña:
            <input
              type="text"
              name="confirm_new_password"
              value={formData.confirm_new_password}
              onChange={handleFormChange}
            />
          </label>
          <br />
          <br />
        </div>
      )}
      {correctEmail === true && correctVerificationCode === true && (
        <div>
          <button onClick={resetStates}>Anterior</button>{" "}
          <button onClick={changePassword}>Cambiar la contraseña</button>
        </div>
      )}
    </div>
  );
}
