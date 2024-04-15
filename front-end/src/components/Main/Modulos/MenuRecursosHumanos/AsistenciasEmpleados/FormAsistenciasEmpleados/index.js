import React, { useEffect, useState } from "react";
import { getAllPersonas } from "@/services/PersonaService";
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

  const fetchPersonasOptionsAndHandleErrors = async () => {
    try {
      const responseGetAllPersonas = await getAllPersonas();

      errorHandlingInfo = checkResponseForErrors(responseGetAllPersonas);

      if (errorHandlingInfo.noContent) {
        setPersonasOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(responseGetAllPersonas.errorMessage);
        return false;
      }

      const optionsPersonas = responseGetAllPersonas.data.map((persona) => {
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
        noCallErrorsDetected = await fetchPersonasOptionsAndHandleErrors();

        if (noCallErrorsDetected === false) {
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

    setRequiredFieldsIncomplete(errorMissingFields);

    return Object.keys(errorMissingFields).length !== 0;
  };

  const validateFormData = () => {
    const errorForm = {};

    setFormErrors(errorForm);

    return Object.keys(errorForm).length !== 0;
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;

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
    if (requiredFieldsError) {
      setErrorMessage(
        "No se puede añadir un registro con uno o más campos vacios "
      );
      return;
    }

    const formDataError = validateFormData();
    if (formDataError) {
      setErrorMessage("");
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

        <Antd.Form.Item label="hora entrada">
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
            status={requiredFieldsIncomplete.hora_salida ? "error" : ""}
            className={
              operationType !== "view"
                ? styles.StyleTimePicker
                : styles.StyleTimePickerDisabled
            }
            format="HH:mm:ss"
          />
          {requiredFieldsIncomplete.hora_salida && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.hora_salida}
            </div>
          )}
        </Antd.Form.Item>

        {operationType === "view" && (
          <div>
            <Antd.Form.Item label="Horas trabajadas dia">
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

        <Antd.Form.Item label="Observacion">
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
            notFoundContent={<span>No hay personas</span>}
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
            <Antd.Button onClick={toggleForm}>Cancelar</Antd.Button>{" "}
            <Antd.Button onClick={handleSubmit}>Guardar</Antd.Button>
          </div>
        )}
        {operationType === "view" && (
          <div>
            <Antd.Button onClick={toggleForm}>Salir</Antd.Button>
          </div>
        )}
      </Antd.Form>
      <Footer />
    </div>
  );
}
