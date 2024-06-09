import { sendEmailNodeMailer } from "@/services/EmailService";
import { existsCorreoElectronico } from "@/services/PersonaService";
import { updatePassword } from "@/services/UsuarioService";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";
import * as Antd from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./styles.module.css";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function UpdatePassword() {
  const router = useRouter();

  const [correctEmail, setCorrectEmail] = useState(false);
  const [correctVerificationCode, setCorrectVerificationCode] = useState(false);
  const [userAttempts, setUserAttempts] = useState(0);
  const [codigoVerificacion, setCodigoVerificacion] = useState("");

  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState({});
  const [backendError, setBackendError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [backendOrDDBBConnectionError, setBackendOrDDBBConnectionError] =
    useState(false);

  const [formData, setFormData] = useState({
    correo_electronico: "",
    codigo_verificacion: "",
    new_password: "",
    confirm_new_password: "",
  });

  function handleBackendError(errorMessage) {
    setBackendError(true);
    setErrorMessage(errorMessage);
    setBackendOrDDBBConnectionError(false);
  }

  function handleBackendAndDBConnectionError(errorMessage) {
    setBackendOrDDBBConnectionError(true);
    setErrorMessage(errorMessage);
    setBackendError(false);
  }

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
          "Por favor, ingresa un correo electrónico";
      }

      setRequiredFieldsIncomplete(errorMissingFields);

      if (Object.keys(errorMissingFields).length !== 0) {
        return;
      }

      const codigoVerificacion = generateRandomNumber();
      setCodigoVerificacion(codigoVerificacion);

      const data = {
        correo_electronico: formData.correo_electronico,
        codigo_verificacion: codigoVerificacion,
      };

      const responseExistsEmail = await existsCorreoElectronico(
        data.correo_electronico
      );

      errorHandlingInfo = checkResponseForErrors(responseExistsEmail);

      if (errorHandlingInfo.backendError) {
        handleBackendError(responseExistsEmail.errorMessage);
        return;
      } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(responseExistsEmail.errorMessage);
        return;
      }

      if (responseExistsEmail.data.resultado === false) {
        handleBackendError(
          "Error, el correo electrónico introducido no existe"
        );
        return;
      }

      const responseSendEmail = await sendEmailNodeMailer(data);

      errorHandlingInfo = checkResponseForErrors(responseSendEmail);

      if (errorHandlingInfo.backendError) {
        handleBackendError(responseSendEmail.errorMessage);
        return;
      } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(responseSendEmail.errorMessage);
        return;
      }

      resetErrorState();
      setCorrectEmail(true);
    } catch (error) {}
  };

  const verifyCode = () => {
    const errorMissingFields = {};

    if (!formData.codigo_verificacion) {
      errorMissingFields.codigo_verificacion = "Por favor, ingresa un código";
    }

    setRequiredFieldsIncomplete(errorMissingFields);

    if (Object.keys(errorMissingFields).length !== 0) {
      return;
    }

    if (formData.codigo_verificacion.length !== 6) {
      setErrorMessage("Error, el código de verificación debe tener 6 dígitos");
      return;
    } else {
      setErrorMessage("");
    }

    if (
      parseInt(formData.codigo_verificacion) !== parseInt(codigoVerificacion)
    ) {
      setUserAttempts(userAttempts + 1);
      return false;
    } else {
      resetErrorState();
      setCorrectVerificationCode(true);
      return true;
    }
  };

  const changePassword = async () => {
    try {
      const errorMissingFields = {};

      if (!formData.new_password) {
        errorMissingFields.new_password =
          "Por favor, ingresa una nueva contraseña";
      }

      if (!formData.confirm_new_password) {
        errorMissingFields.confirm_new_password =
          "Por favor, ingresa la confirmación de la nueva contraseña";
      }

      setRequiredFieldsIncomplete(errorMissingFields);

      if (Object.keys(errorMissingFields).length !== 0) {
        setErrorMessage("");
        return;
      }

      if (formData.new_password === formData.confirm_new_password) {
        const responseUpdatePassword = await updatePassword(formData);

        errorHandlingInfo = checkResponseForErrors(responseUpdatePassword);

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseUpdatePassword.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseUpdatePassword.errorMessage
          );
          return;
        }

        router.push("/login");
      } else {
        setErrorMessage("La contraseñas no coinciden");
        setBackendError(true);
      }
    } catch (error) {}
  };

  function redirectToLogin() {
    router.push("/login");
  }

  function resetStates() {
    setCorrectEmail(false);
    setCorrectVerificationCode(false);
    setUserAttempts(0);
    setCodigoVerificacion("");
    resetErrorState();
    setFormData({
      correo_electronico: "",
      codigo_verificacion: "",
      new_password: "",
      confirm_new_password: "",
    });
  }

  function resetErrorState() {
    setRequiredFieldsIncomplete({});
    setBackendError(false);
    setErrorMessage("");
    setBackendOrDDBBConnectionError(false);
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

  const renderEmailRecoveryForm = () => {
    const renderErrorMessage = () => (
      <div className={styles.BackendError}>{errorMessage}</div>
    );

    const renderMainContent = () => (
      <div>
        <Antd.Form>
          {correctEmail === false && correctVerificationCode === false && (
            <div>
              <h1>Recuperación de cuenta</h1>
              <Antd.Form.Item label="Correo electrónico">
                <Antd.Input
                  type="text"
                  name="correo_electronico"
                  value={formData.correo_electronico}
                  onChange={handleFormChange}
                  status={
                    requiredFieldsIncomplete.correo_electronico ? "error" : ""
                  }
                  className={styles.StyleInput}
                />
                {(requiredFieldsIncomplete.correo_electronico ||
                  (backendError && errorMessage.length !== 0)) && (
                  <div className={styles.RequiredFieldsOrFormatError}>
                    {requiredFieldsIncomplete.correo_electronico ||
                      errorMessage}
                  </div>
                )}
              </Antd.Form.Item>
            </div>
          )}
          {correctEmail === false && correctVerificationCode === false && (
            <div>
              <Antd.Button onClick={redirectToLogin}>Cancelar</Antd.Button>{" "}
              <Antd.Button onClick={sendEmail}>Continuar</Antd.Button>
            </div>
          )}

          {correctEmail === true && correctVerificationCode === false && (
            <div>
              <h1>Introduce el código</h1>
              <p>
                Introduce el código de verificación de 6 digitos del correo
                electrónico
              </p>
              <p>
                {`Has realizado ${userAttempts} intentos. te quedan ${
                  5 - userAttempts
                } intentos`}
              </p>

              <Antd.Form.Item label="">
                <Antd.Input
                  type="number"
                  name="codigo_verificacion"
                  value={formData.codigo_verificacion}
                  onChange={handleFormChange}
                  status={
                    requiredFieldsIncomplete.codigo_verificacion || errorMessage
                      ? "error"
                      : ""
                  }
                  className={styles.StyleInput}
                />
                {(requiredFieldsIncomplete.codigo_verificacion ||
                  errorMessage.length !== 0) && (
                  <div className={styles.RequiredFieldsOrFormatError}>
                    {requiredFieldsIncomplete.codigo_verificacion ||
                      errorMessage}
                  </div>
                )}
              </Antd.Form.Item>
            </div>
          )}
          {correctEmail === true && correctVerificationCode === false && (
            <div>
              <Antd.Button onClick={resetStates}>Anterior</Antd.Button>{" "}
              <Antd.Button
                onClick={verifyCode}
                disabled={
                  userAttempts >= 5 && correctVerificationCode === false
                    ? true
                    : false
                }
              >
                Verificar
              </Antd.Button>
            </div>
          )}

          {correctEmail === true && correctVerificationCode === true && (
            <div>
              <h1>Cambiar la contraseña</h1>

              <Antd.Form.Item label="Nueva contraseña">
                <Antd.Input
                  type="text"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleFormChange}
                  status={requiredFieldsIncomplete.new_password ? "error" : ""}
                  className={styles.StyleInput}
                />
                {requiredFieldsIncomplete.new_password && (
                  <div className={styles.RequiredFieldsOrFormatError}>
                    {requiredFieldsIncomplete.new_password}
                  </div>
                )}
              </Antd.Form.Item>

              <Antd.Form.Item label="Confirmar nueva contraseña">
                <Antd.Input
                  type="text"
                  name="confirm_new_password"
                  value={formData.confirm_new_password}
                  onChange={handleFormChange}
                  status={
                    requiredFieldsIncomplete.confirm_new_password ? "error" : ""
                  }
                  className={styles.StyleInput}
                />
                {requiredFieldsIncomplete.confirm_new_password && (
                  <div className={styles.RequiredFieldsOrFormatError}>
                    {requiredFieldsIncomplete.confirm_new_password}
                  </div>
                )}
              </Antd.Form.Item>

              {errorMessage && backendError && (
                <div className={styles.RequiredFieldsOrFormatError}>
                  {errorMessage}
                </div>
              )}
            </div>
          )}
          {correctEmail === true && correctVerificationCode === true && (
            <div>
              <Antd.Button onClick={resetStates}>Anterior</Antd.Button>{" "}
              <Antd.Button onClick={changePassword}>
                Cambiar la contraseña
              </Antd.Button>
            </div>
          )}
        </Antd.Form>
      </div>
    );

    return (
      <div>
        {renderMainContent()}

        {errorMessage.length !== 0 &&
          backendOrDDBBConnectionError &&
          renderErrorMessage()}
      </div>
    );
  };

  return renderEmailRecoveryForm();
}
