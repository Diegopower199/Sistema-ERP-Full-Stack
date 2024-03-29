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
            setCorrectEmail(true);
          }
        } else {
          console.log("EMAIL NO EXISTE");
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
    <>
      {correctEmail === false && correctVerificationCode === false && (
        <>
          <h1>Recuperacion de cuenta</h1>
          <label>
            Correo electronico:
            <input
              type="text"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleFormChange}
            />
            {requiredFieldsIncomplete.correo_electronico && (
              <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {requiredFieldsIncomplete.correo_electronico}
              </div>
            )}
          </label>
          <br />
          <br />
        </>
      )}
      {correctEmail === true && correctVerificationCode === false && (
        <>
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
          </label>
          <br />
          <br />
        </>
      )}
      {correctEmail === true && correctVerificationCode === true && (
        <>
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
        </>
      )}

      {correctEmail === false && correctVerificationCode === false && (
        <>
          <button onClick={redirectToLogin}>Cancelar</button>{" "}
          <button onClick={sendEmail}>Continuar</button>
        </>
      )}
      {correctEmail === true && correctVerificationCode === false && (
        <>
          <button onClick={resetStates}>Anterior</button>{" "}
          <button onClick={verifyCode}>Verificar</button>
        </>
      )}
      {correctEmail === true && correctVerificationCode === true && (
        <>
          <button onClick={resetStates}>Anterior</button>{" "}
          <button onClick={changePassword}>Cambiar la contraseña</button>
        </>
      )}
    </>
  );
}
