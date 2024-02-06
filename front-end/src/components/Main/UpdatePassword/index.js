import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { RESEND_API_KEY } from "@/utils/constants";
import { Resend } from "resend";

export default function UpdatePassword() {
  const router = useRouter();

  const [correctEmail, setCorrectEmail] = useState(false);
  const [correctVerificationCode, setCorrectVerificationCode] = useState(false);
  const [userAttempts, setUserAttempts] = useState(0);
  const [codigoVerificacion, setCodigoVerificacion] = useState("");

  const [formData, setFormData] = useState({
    correo_electronico: "",
    codigo_verificacion: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  function generateRandomNumber() {
    // Generate a random number between 0 and 999999 (inclusive)
    let randomNumber = Math.floor(Math.random() * 1000000);

    // Convert the number to a string and pad with zeros to ensure 6 digits
    let formattedNumber = randomNumber.toString().padStart(6, "0");

    return formattedNumber;
  }

  const sendEmail = async () => {
    try {
      // Siempre será correcto el email
      const codigoVerificacion = generateRandomNumber();
      console.log("codigoVerificacion: ", codigoVerificacion);
      setCodigoVerificacion(codigoVerificacion);
      const resendInstance = new Resend(RESEND_API_KEY);
      /*const response = await resendInstance.emails.send({
        from: "TechSoluciones Informáticas S.L <soporte@techsoluciones.com>",
        to: ["dgonzalezs2@alumnos.nebrija.es"],
        subject: "Saludos, que tal te encuentras",
        html: `
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Código de Verificación</h2>
            <p>Estimado Usuario,</p>
            <p>Aquí tienes tu código de verificación:</p>
            <h1 style="font-size: 2em; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">${codigoVerificacion}</h1>
            <p>Por favor, utiliza este código para completar tu proceso de verificación.</p>
            <p>Gracias,<br>Equipo de Soporte</p>
          </div>
        `,
      });
      console.log("Response: ", response);*/
      setCorrectEmail(true);
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const verifyCode = () => {
    console.log(codigoVerificacion);

    console.log(
      "formData.codigo_verificacion: ",
      formData.codigo_verificacion,
      "\ncodigoVerificacion: ",
      codigoVerificacion
    );
    if (
      parseInt(formData.codigo_verificacion) !== parseInt(codigoVerificacion)
    ) {
      console.log("ESTA MAL");
      setUserAttempts(userAttempts + 1);
      return false;
    } else {
      setCorrectVerificationCode(true);
      return true;
    }
  };

  const changePassword = async () => {};

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("FORM DATA: ", formData);

    // Se envia aqui el correo: sendEmail
    sendEmail();

    console.log("email exists: ", correctEmail);

    let errorDevueltoBack = false;
    try {
    } catch (error) {
      console.log("Error al agregar registro: ", error);
    }
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
              onChange={handleChange}
            />
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
              onChange={handleChange}
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
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            Confirmar nueva contraseña:
            <input
              type="text"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
        </>
      )}

      {correctEmail === false && correctVerificationCode === false && (
        <>
          <button onClick={() => router.push("/login")}>Cancelar</button>{" "}
          <button onClick={handleSubmit}>Continuar</button>
        </>
      )}
      {correctEmail === true && correctVerificationCode === false && (
        <>
          <button
            onClick={() => {
              setUserAttempts(0);
              setCorrectEmail(false);
            }}
          >
            Anterior
          </button>{" "}
          <button onClick={verifyCode}>Verificar</button>
        </>
      )}
      {correctEmail === true && correctVerificationCode === true && (
        <>
          <button
            onClick={() => {
              setCorrectEmail(false);
              setCorrectVerificationCode(false);
              setUserAttempts(0);
              setCodigoVerificacion("");
            }}
          >
            Anterior
          </button>{" "}
          <button onClick={changePassword}>Cambiar la contraseña</button>
        </>
      )}
    </>
  );
}
