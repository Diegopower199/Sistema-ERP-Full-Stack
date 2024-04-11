import React, { useState } from "react";
import { getAllClientes, saveCliente } from "@/services/ClienteService";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";
import { getAllAsistenciaEmpleados } from "@/services/AsistenciaEmpleadoService";

// OptimizedResponseErrorHandlingComponent SE VA A LLAMAR ASI AL PROGRAMA

function OptimizedErrorHandling() {
  // Define tus estados useState
  const [backendError, setBackendError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [backendOrDDBBConnectionError, setBackendOrDDBBConnectionError] =
    useState(false);

  const [addUpdateDeleteCorrect, setAddUpdateDeleteCorrect] = useState(false);

  function handleBackendError(errorMessage) {
    setBackendError(true);
    setErrorMessage(errorMessage);
  }

  function handleBackendAndDBConnectionError(errorMessage) {
    setBackendOrDDBBConnectionError(true);
    setErrorMessage(errorMessage);
  }

  // Función manejadora para simular la respuesta y manejarla
  async function handleResponseAndError() {
    let errorHandlingInfo = {
      errorMessage: "",
      backendOrDDBBConnectionError: false,
      backendError: false,
    };
    try {
      // Obtiene la respuesta simulada
      const responseGetAllClientes = await getAllClientes();

      console.log("responseGetAllClientes: ", responseGetAllClientes);

      errorHandlingInfo = checkResponseForErrors(responseGetAllClientes);

      console.log("errorHandlingInfo", errorHandlingInfo);

      if (errorHandlingInfo.backendError) {
        handleBackendError(errorHandlingInfo.errorMessage);
        return;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(errorHandlingInfo.errorMessage);
        return;
      }

      const responsGetAllAsistencias = await getAllAsistenciaEmpleados();
      errorHandlingInfo = checkResponseForErrors(responsGetAllAsistencias);

      console.log("hola", errorHandlingInfo);

      if (errorHandlingInfo.backendError) {
        console.log("errorHandlingInfo.backendError");
        handleBackendError(errorHandlingInfo.errorMessage);
        return;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        console.log("errorHandlingInfo.backendOrDDBBConnectionError");
        handleBackendAndDBConnectionError(errorHandlingInfo.errorMessage);
        return;
      }
    } catch (error) {
      console.error("Ha ocurrido algo inesperado");
    }
  }

  async function handleResponseAndErrorParaSaveUpdateOrDelete() {
    let errorHandlingInfo = {
      errorMessage: "",
      backendOrDDBBConnectionError: false,
      backendError: false,
    };
    try {
      // Obtiene la respuesta simulada
      const responseSaveCliente = await saveCliente({});

      console.log("responseSaveCliente: ", responseSaveCliente);

      errorHandlingInfo = checkResponseForErrors(responseSaveCliente);

      console.log("errorHandlingInfo", errorHandlingInfo);

      if (errorHandlingInfo.backendError) {
        console.log("errorHandlingInfo.backendError");
        handleBackendError(errorHandlingInfo.errorMessage);
        return;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        console.log("errorHandlingInfo.backendOrDDBBConnectionError");
        handleBackendAndDBConnectionError(errorHandlingInfo.errorMessage);
        return;
      }

      setAddUpdateDeleteCorrect(true);
    } catch (error) {
      console.error("Ha ocurrido algo inesperado");
    }
  }

  return (
    <div>
      <button onClick={handleResponseAndError}>Simular Respuesta</button>
      <button onClick={handleResponseAndErrorParaSaveUpdateOrDelete}>
        Añadir Respuesta
      </button>
      {addUpdateDeleteCorrect && (
        <div>
          <h1>FUNCIONA BIEN ESTO</h1>
        </div>
      )}
      {backendOrDDBBConnectionError && <p>{errorMessage}</p>}
      {backendError && <p>{errorMessage}</p>}
    </div>
  );
}

export default OptimizedErrorHandling;
