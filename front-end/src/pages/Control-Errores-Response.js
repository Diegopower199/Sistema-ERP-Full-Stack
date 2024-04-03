import React, { useState } from "react";
import { getAllClientes } from "@/services/ClienteService";
import { handleResponse } from "@/utils/responseHandler";

// OptimizedResponseErrorHandlingComponent SE VA A LLAMAR ASI AL PROGRAMA

function OptimizedErrorHandling() {
  // Define tus estados useState
  const [backendError, setBackendError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [backendOrDDBBConnectionError, setBackendOrDDBBConnectionError] =
    useState(false);

  // Función manejadora para simular la respuesta y manejarla
  async function handleResponseAndError() {
    let errorHandlingInfo = {
      errorMessage: "",
      backendOrDDBBConnectionError: false,
      backendError: false,
    };
    try {
      // Obtiene la respuesta simulada
      const responseGetBajaOptions = await getAllClientes();

      console.log("responseGetBajaOptions: ", responseGetBajaOptions);

      errorHandlingInfo = handleResponse(responseGetBajaOptions);

      console.log("errorHandlingInfo", errorHandlingInfo);

      if (
        errorHandlingInfo.backendError ||
        errorHandlingInfo.backendOrDDBBConnectionError
      ) {
        setBackendError(errorHandlingInfo.backendError);
        setErrorMessage(errorHandlingInfo.errorMessage);
        setBackendOrDDBBConnectionError(
          errorHandlingInfo.backendOrDDBBConnectionError
        );
        return;
      }

      const responseMotivos = await getAllClientes();
      errorHandlingInfo = handleResponse(responseMotivos);

      console.log("hola", errorHandlingInfo);

      if (
        errorHandlingInfo.backendError ||
        errorHandlingInfo.backendOrDDBBConnectionError
      ) {
        setBackendError(errorHandlingInfo.backendError);
        setErrorMessage(errorHandlingInfo.errorMessage);
        setBackendOrDDBBConnectionError(
          errorHandlingInfo.backendOrDDBBConnectionError
        );
        return;
      }
    } catch (error) {
      console.error("Ha ocurrido algo inesperado");
    }
  }

  return (
    <div>
      <button onClick={handleResponseAndError}>Simular Respuesta</button>
      {backendOrDDBBConnectionError && <p>{errorMessage}</p>}
      {backendError && <p>{errorMessage}</p>}
    </div>
  );
}

export default OptimizedErrorHandling;

