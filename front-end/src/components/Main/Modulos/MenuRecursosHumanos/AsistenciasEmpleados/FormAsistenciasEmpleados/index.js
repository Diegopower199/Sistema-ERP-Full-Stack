import React, { useEffect, useState } from "react";
import { getAllPersonasEmpleadosAndBecarios } from "@/services/PersonaService";
import styles from "./styles.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import {
  formatearFechaYYYYMMDD,
  validarFechaYYYYMMDD,
} from "@/utils/functionsFecha";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";
import * as Antd from "antd";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";
import {
  saveAsistenciaEmpleado,
  updateAsistenciaEmpleado,
} from "@/services/AsistenciaEmpleadoService";
import moment from "moment";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function FormAsistenciasEmpleados({
  toggleForm,
  asistenciaEmpleadoDataForm,
  formUpdateTrigger,
  cancelOrExitClickTrigger,
  operationType,
  triggerBackendOrDDBBConnectionError,
  triggerErrorMessage,
}) {
  const [personasOptions, setPersonasOptions] = useState([]);

  const [formData, setFormData] = useState({
    fecha_asistencia: "",
    hora_entrada: "",
    hora_salida: "",
    horas_trabajadas_dia: "",
    observacion: "",
    id_persona: "",
    personaInfo: "",
  });

  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [logicalDataErrors, setLogicalDataErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [backendError, setBackendError] = useState(false);

  function handleBackendError(errorMessage) {
    setBackendError(true);
    setErrorMessage(errorMessage);
  }

  function handleBackendAndDBConnectionError(errorMessage) {
    triggerBackendOrDDBBConnectionError(true);
    triggerErrorMessage(errorMessage);
  }

  const fetchPersonasEmpleadosAndBecariosOptionsAndHandleErrors = async () => {
    try {
      const responseGetAllPersonasEmpleadosAndBecarios =
        await getAllPersonasEmpleadosAndBecarios();

      errorHandlingInfo = checkResponseForErrors(
        responseGetAllPersonasEmpleadosAndBecarios
      );

      if (errorHandlingInfo.noContent) {
        setPersonasOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllPersonasEmpleadosAndBecarios.errorMessage
        );
        return false;
      }

      const optionsPersonas =
        responseGetAllPersonasEmpleadosAndBecarios.data.map((persona) => {
          const { id_persona, nombre, apellidos, dni } = persona;

          return {
            value: id_persona,
            label: `${nombre + " " + apellidos} - ${dni}`,
          };
        });

      setPersonasOptions(optionsPersonas);

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  useEffect(() => {
    let noCallErrorsDetected = false;

    const fetchData = async () => {
      try {
        noCallErrorsDetected =
          await fetchPersonasEmpleadosAndBecariosOptionsAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }

        if (operationType === "update" || operationType === "view") {
          const fechaAsistenciaValida = validarFechaYYYYMMDD(
            asistenciaEmpleadoDataForm.fecha_asistencia
          );
          if (fechaAsistenciaValida === null) {
            const fechaAsistenciaFormateada = formatearFechaYYYYMMDD(
              asistenciaEmpleadoDataForm.fecha_asistencia
            );

            setFormData(() => ({
              ...asistenciaEmpleadoDataForm,
              fecha_asistencia: fechaAsistenciaFormateada,
            }));
          } else {
            setFormData(() => ({
              ...asistenciaEmpleadoDataForm,
            }));
          }
        }
      } catch (error) {
        console.error("Ha ocurrido algo inesperado", error);
      }
    };

    fetchData();
  }, []);

  const validateRequiredFields = () => {
    const errorMissingFields = {};

    if (!formData.fecha_asistencia) {
      errorMissingFields.fecha_asistencia =
        "Por favor, selecciona una fecha de asistencia";
    }

    if (!formData.hora_entrada) {
      errorMissingFields.hora_entrada =
        "Por favor, selecciona una hora de entrada";
    }

    if (operationType === "update") {
      if (!formData.hora_salida) {
        errorMissingFields.hora_salida =
          "Por favor, selecciona una hora de salida";
      }
    }

    if (!formData.id_persona) {
      errorMissingFields.id_persona = "Por favor, selecciona una persona";
    }

    setRequiredFieldsIncomplete(errorMissingFields);

    return Object.keys(errorMissingFields).length !== 0;
  };

  const validateFormData = () => {
    const errorForm = {};

    setFormErrors(errorForm);

    return Object.keys(errorForm).length !== 0;
  };

  const validateLogicalData = () => {
    const logicalErrors = {};

    const horaEntrada = moment(formData.hora_entrada, "HH:mm:ss");
    const horaSalida = moment(formData.hora_salida, "HH:mm:ss");

    if (horaSalida.isBefore(horaEntrada)) {
      logicalErrors.hora_salida =
        "La hora de salida no puede ser antes que la hora de entrada";
    }

    setLogicalDataErrors(logicalErrors);

    return Object.keys(logicalErrors).length !== 0;
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        [name]: value,
      };
    });
  };

  const handleTimeChange = (time, timeString, name) => {
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        [name]: timeString,
      };
    });
  };

  const handleSelectPersonaChange = (value, option) => {
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["id_persona"]: value.toString(),
        ["personaInfo"]: option?.children.toString(),
      };
    });
  };

  const handleSelectPersonaSearch = (value) => {
    // console.log("Search persona:", value);
  };

  const filterIncrementalSearch = (input, option) => {
    const optionLabel = option?.children.toLowerCase();

    const userInput = input.toLowerCase();

    const isOptionIncluded = optionLabel.includes(userInput);

    return isOptionIncluded;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFieldsError = validateRequiredFields();
    const formDataError = validateFormData();
    const logicalDataError = validateLogicalData();

    if (requiredFieldsError || formDataError || logicalDataError) {
      return;
    }

    try {
      if (operationType === "create") {
        const responseCreateAsistenciaEmpleado = await saveAsistenciaEmpleado(
          formData
        );

        errorHandlingInfo = checkResponseForErrors(
          responseCreateAsistenciaEmpleado
        );

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseCreateAsistenciaEmpleado.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseCreateAsistenciaEmpleado.errorMessage
          );
          return;
        }

        setErrorMessage("");
        toggleForm();
        formUpdateTrigger();
      } else if (operationType === "update") {
        const responseUpdateAsistenciaEmpleado = await updateAsistenciaEmpleado(
          formData.id,
          formData
        );

        errorHandlingInfo = checkResponseForErrors(
          responseUpdateAsistenciaEmpleado
        );

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseUpdateAsistenciaEmpleado.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseUpdateAsistenciaEmpleado.errorMessage
          );
          return;
        }

        setErrorMessage("");
        toggleForm();
        formUpdateTrigger();
      }
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  return (
    <div>
      <Header />
      <Antd.Form>
        <Antd.Form.Item label="Fecha asistencia">
          <Antd.Input
            type="date"
            name="fecha_asistencia"
            value={formData.fecha_asistencia}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.fecha_asistencia ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.fecha_asistencia && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.fecha_asistencia}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Hora entrada">
          <Antd.TimePicker
            name="hora_entrada"
            value={
              formData.hora_entrada
                ? moment(formData.hora_entrada, "HH:mm:ss")
                : null
            }
            onChange={(time, timeString) =>
              handleTimeChange(time, timeString, "hora_entrada")
            }
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.hora_entrada ? "error" : ""}
            className={
              operationType !== "view"
                ? styles.StyleTimePicker
                : styles.StyleTimePickerDisabled
            }
            format="HH:mm:ss"
          />
          {requiredFieldsIncomplete.hora_entrada && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.hora_entrada}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Hora salida">
          <Antd.TimePicker
            name="hora_salida"
            value={
              formData.hora_salida
                ? moment(formData.hora_salida, "HH:mm:ss")
                : null
            }
            onChange={(time, timeString) =>
              handleTimeChange(time, timeString, "hora_salida")
            }
            readOnly={operationType === "view" ? true : false}
            status={
              requiredFieldsIncomplete.hora_salida ||
              logicalDataErrors.hora_salida
                ? "error"
                : ""
            }
            className={
              operationType !== "view"
                ? styles.StyleTimePicker
                : styles.StyleTimePickerDisabled
            }
            format="HH:mm:ss"
          />
          {(requiredFieldsIncomplete.hora_salida ||
            logicalDataErrors.hora_salida) && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.hora_salida ||
                logicalDataErrors.hora_salida}
            </div>
          )}
        </Antd.Form.Item>

        {operationType === "view" && (
          <div>
            <Antd.Form.Item label="Horas trabajadas">
              <Antd.TimePicker
                name="horas_trabajadas_dia"
                value={
                  formData.horas_trabajadas_dia
                    ? moment(formData.horas_trabajadas_dia, "HH:mm:ss")
                    : null
                }
                readOnly={true}
                className={styles.StyleTimePickerDisabled}
                format="HH:mm:ss"
              />
            </Antd.Form.Item>
          </div>
        )}

        <Antd.Form.Item label="Observación">
          <Antd.Input
            type="text"
            name="observacion"
            value={formData.observacion}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            className={styles.StyleInput}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Selecciona una persona que se encargue del pedido">
          <Antd.Select
            name="personaInfo"
            value={
              formData.personaInfo
                ? formData.personaInfo
                : "Selecciona un persona"
            }
            onChange={
              operationType === "view" ? null : handleSelectPersonaChange
            }
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.id_persona ? "error" : ""}
            className={
              operationType !== "view"
                ? styles.StyleSelect
                : styles.StyleSelectDisabled
            }
            notFoundContent={<span>No hay personas disponibles</span>}
            showSearch={true}
            onSearch={
              operationType === "view" ? null : handleSelectPersonaSearch
            }
            filterOption={
              operationType === "view" ? null : filterIncrementalSearch
            }
          >
            {operationType !== "view" &&
              personasOptions.map((persona) => (
                <Antd.Select.Option key={persona.value} value={persona.value}>
                  {persona.label}
                </Antd.Select.Option>
              ))}
          </Antd.Select>
          {requiredFieldsIncomplete.id_persona && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.id_persona}
            </div>
          )}
        </Antd.Form.Item>

        {errorMessage.length !== 0 && backendError && (
          <div>
            <p className={styles.BackendError}>
              <ErrorIcon fontSize="medium" color="red" />
              Error: {errorMessage}
            </p>
          </div>
        )}
        {(operationType === "create" || operationType === "update") && (
          <div>
            <Antd.Button
              onClick={() => {
                toggleForm();
                cancelOrExitClickTrigger();
              }}
            >
              Cancelar
            </Antd.Button>{" "}
            <Antd.Button onClick={handleSubmit}>Guardar</Antd.Button>
          </div>
        )}
        {operationType === "view" && (
          <div>
            <Antd.Button
              onClick={() => {
                toggleForm();
                cancelOrExitClickTrigger();
              }}
            >
              Salir
            </Antd.Button>
          </div>
        )}
      </Antd.Form>
      <Footer />
    </div>
  );
}
