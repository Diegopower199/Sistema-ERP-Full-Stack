import React, { useState } from "react";
import { getAllClientes, saveCliente } from "@/services/ClienteService";
import { handleResponse } from "@/utils/responseHandler";
import { getAllAsistenciaEmpleados } from "@/services/AsistenciaEmpleadoService";

// OptimizedResponseErrorHandlingComponent SE VA A LLAMAR ASI AL PROGRAMA

function OptimizedErrorHandling() {
  // Define tus estados useState
  const [backendError, setBackendError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [backendOrDDBBConnectionError, setBackendOrDDBBConnectionError] =
    useState(false);

  const [addUpdateDeleteCorrect, setAddUpdateDeleteCorrect] = useState(false);

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

      errorHandlingInfo = handleResponse(responseGetAllClientes);

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

      const responsGetAllAsistencias = await getAllAsistenciaEmpleados();
      errorHandlingInfo = handleResponse(responsGetAllAsistencias);

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

      errorHandlingInfo = handleResponse(responseSaveCliente);

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

      setAddUpdateDeleteCorrect(true)


    } catch (error) {
      console.error("Ha ocurrido algo inesperado");
    }
  }

  return (
    <div>
      <button onClick={handleResponseAndError}>Simular Respuesta</button>
      <button onClick={handleResponseAndErrorParaSaveUpdateOrDelete}>Añadir Respuesta</button>
      {addUpdateDeleteCorrect && (
        <>
         <h1>FUNCIONA BIEN ESTO</h1>
        </>
      )}
      {backendOrDDBBConnectionError && <p>{errorMessage}</p>}
      {backendError && <p>{errorMessage}</p>}
    </div>
  );
}

export default OptimizedErrorHandling;

