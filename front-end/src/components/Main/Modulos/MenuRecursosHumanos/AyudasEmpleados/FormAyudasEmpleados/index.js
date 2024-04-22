import React, { useEffect, useState } from "react";
import { getAllPersonas, getAllPersonasEmpleadosAndBecarios } from "@/services/PersonaService";
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
  saveAyudaEmpleado,
  updateAyudaEmpleado,
} from "@/services/AyudaEmpleadoService";
import { getAllTiposAyudas } from "@/services/TipoAyudaService";
import { getAllTiposEstados } from "@/services/TipoEstadoService";
import moment from "moment";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function FormAyudasEmpleados({
  toggleForm,
  ayudaEmpleadoDataForm,
  formUpdateTrigger,
  cancelOrExitClickTrigger,
  operationType,
  triggerBackendOrDDBBConnectionError,
  triggerErrorMessage,
}) {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);
  const [tiposAyudasOptions, setTiposAyudasOptions] = useState([]);
  const [personasOptions, setPersonasOptions] = useState([]);

  const [formData, setFormData] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    valor_asociado: "",
    observacion: "",
    id_persona: "",
    personaInfo: "",
    tipo_ayuda: "",
    id_tipo_ayuda: "",
    tipo_estado: "",
    id_tipo_estado: "",
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

  const fetchTiposEstadosOptionsAndHandleErrors = async () => {
    try {
      const responseGetAllTiposEstados = await getAllTiposEstados();

      errorHandlingInfo = checkResponseForErrors(responseGetAllTiposEstados);

      if (errorHandlingInfo.noContent) {
        setTiposEstadosOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllTiposEstados.errorMessage
        );
        return false;
      }

      setTiposEstadosOptions(responseGetAllTiposEstados.data);

      if (operationType === "create") {
        setFormData((prevDataState) => {
          return {
            ...prevDataState,
            ["tipo_estado"]:
              responseGetAllTiposEstados.data[0].label.toString(),
            ["id_tipo_estado"]:
              responseGetAllTiposEstados.data[0].value.toString(),
          };
        });
      }

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  const fetchTiposAyudasOptionsAndHandleErrors = async () => {
    try {
      const responseGetAllTiposAyudas = await getAllTiposAyudas();

      errorHandlingInfo = checkResponseForErrors(responseGetAllTiposAyudas);

      if (errorHandlingInfo.noContent) {
        setTiposEstadosOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllTiposAyudas.errorMessage
        );
        return false;
      }

      setTiposAyudasOptions(responseGetAllTiposAyudas.data);

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  const fetchPersonasEmpleadosAndBecariosOptionsAndHandleErrors = async () => {
    try {
      const responseGetAllPersonasEmpleadosAndBecarios = await getAllPersonasEmpleadosAndBecarios();

      errorHandlingInfo = checkResponseForErrors(responseGetAllPersonasEmpleadosAndBecarios);

      if (errorHandlingInfo.noContent) {
        setPersonasOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(responseGetAllPersonasEmpleadosAndBecarios.errorMessage);
        return false;
      }

      const optionsPersonas = responseGetAllPersonasEmpleadosAndBecarios.data.map((persona) => {
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
        noCallErrorsDetected = await fetchTiposEstadosOptionsAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }

        noCallErrorsDetected = await fetchTiposAyudasOptionsAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }

        noCallErrorsDetected = await fetchPersonasEmpleadosAndBecariosOptionsAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }

        if (operationType === "update" || operationType === "view") {
          const fechaInicioValida = validarFechaYYYYMMDD(
            ayudaEmpleadoDataForm.fecha_inicio
          );

          const fechaFinValida = validarFechaYYYYMMDD(
            ayudaEmpleadoDataForm.fecha_fin
          );

          if (fechaInicioValida === null || fechaFinValida === null) {
            const fechaInicioFormateada = formatearFechaYYYYMMDD(
              ayudaEmpleadoDataForm.fecha_inicio
            );

            const fechaFinFormateada = formatearFechaYYYYMMDD(
              ayudaEmpleadoDataForm.fecha_fin
            );

            setFormData(() => ({
              ...ayudaEmpleadoDataForm,
              fecha_inicio: fechaInicioFormateada,
              fecha_fin: fechaFinFormateada,
            }));
          } else {
            setFormData(() => ({
              ...ayudaEmpleadoDataForm,
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

    if (!formData.fecha_inicio) {
      errorMissingFields.fecha_inicio =
        "Por favor, selecciona una fecha de inicio";
    }

    if (!formData.fecha_fin) {
      errorMissingFields.fecha_fin = "Por favor, selecciona una fecha de fin";
    }

    if (!formData.valor_asociado) {
      errorMissingFields.valor_asociado = "Por favor, indica un valor";
    }

    if (!formData.id_persona) {
      errorMissingFields.id_persona = "Por favor, selecciona una persona";
    }

    if (!formData.id_tipo_ayuda) {
      errorMissingFields.id_tipo_ayuda = "Por favor, ingresa un tipo de ayuda";
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

    const fechaInicio = moment(formData.fecha_inicio);
    const fechaFin = moment(formData.fecha_fin);

    if (fechaFin.isBefore(fechaInicio)) {
      logicalErrors.fecha_fin =
        "La fecha de fin no puede ser anterior a la fecha de inicio";
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

  const handleTipoEstadoChange = (value, option) => {
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["tipo_estado"]: option?.children.toString(),
        ["id_tipo_estado"]: value.toString(),
      };
    });
  };

  const handleTipoAyudaChange = (value, option) => {
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["tipo_ayuda"]: option?.children.toString(),
        ["id_tipo_ayuda"]: value.toString(),
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
        const responseCreateAyudaEmpleado = await saveAyudaEmpleado(formData);

        errorHandlingInfo = checkResponseForErrors(responseCreateAyudaEmpleado);

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseCreateAyudaEmpleado.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseCreateAyudaEmpleado.errorMessage
          );
          return;
        }

        setErrorMessage("");
        toggleForm();
        formUpdateTrigger();
      } else if (operationType === "update") {
        const responseUpdateAyudaEmpleado = await updateAyudaEmpleado(
          formData.id,
          formData
        );

        errorHandlingInfo = checkResponseForErrors(responseUpdateAyudaEmpleado);

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseUpdateAyudaEmpleado.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseUpdateAyudaEmpleado.errorMessage
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
        <Antd.Form.Item label="Fecha inicio">
          <Antd.Input
            type="date"
            name="fecha_inicio"
            value={formData.fecha_inicio}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.fecha_inicio ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.fecha_inicio && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.fecha_inicio}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Fecha fin">
          <Antd.Input
            type="date"
            name="fecha_fin"
            value={formData.fecha_fin}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={
              requiredFieldsIncomplete.fecha_fin || logicalDataErrors.fecha_fin
                ? "error"
                : ""
            }
            className={styles.StyleInput}
          />
          {(requiredFieldsIncomplete.fecha_fin ||
            logicalDataErrors.fecha_fin) && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.fecha_fin ||
                logicalDataErrors.fecha_fin}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Valor asociado">
          <Antd.Input
            type="number"
            name="valor_asociado"
            value={formData.valor_asociado}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.valor_asociado ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.valor_asociado && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.valor_asociado}
            </div>
          )}
        </Antd.Form.Item>

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

        <Antd.Form.Item label="Selecciona una persona">
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

        <Antd.Form.Item label="Selecciona un tipo de ayuda">
          <Antd.Select
            name="tipo_ayuda"
            value={
              formData.tipo_ayuda
                ? formData.tipo_ayuda
                : "Selecciona un tipo ayuda"
            }
            onChange={operationType === "view" ? null : handleTipoAyudaChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.id_tipo_ayuda ? "error" : ""}
            className={
              operationType !== "view"
                ? styles.StyleSelect
                : styles.StyleSelectDisabled
            }
            notFoundContent={<span>No hay tipos de ayudas disponibles</span>}
          >
            {operationType !== "view" &&
              tiposAyudasOptions.map((tipoAyuda) => (
                <Antd.Select.Option
                  key={tipoAyuda.value}
                  value={tipoAyuda.value}
                >
                  {tipoAyuda.label}
                </Antd.Select.Option>
              ))}
          </Antd.Select>
          {requiredFieldsIncomplete.id_tipo_ayuda && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.id_tipo_ayuda}
            </div>
          )}
        </Antd.Form.Item>

        {(operationType === "update" || operationType === "view") && (
          <div>
            <Antd.Form.Item label="Selecciona un tipo de estado">
              <Antd.Select
                name="tipo_estado"
                value={
                  formData.tipo_estado
                    ? formData.tipo_estado
                    : "Selecciona un tipo de estado"
                }
                onChange={
                  operationType === "view" ? null : handleTipoEstadoChange
                }
                readOnly={operationType === "view" ? true : false}
                status={requiredFieldsIncomplete.id_tipo_estado ? "error" : ""}
                className={
                  operationType !== "view"
                    ? styles.StyleSelect
                    : styles.StyleSelectDisabled
                }
                notFoundContent={
                  <span>No hay tipos de estados disponibles</span>
                }
              >
                {operationType !== "view" &&
                  tiposEstadosOptions.map((tipoEstado) => (
                    <Antd.Select.Option
                      key={tipoEstado.value}
                      value={tipoEstado.value}
                    >
                      {tipoEstado.label}
                    </Antd.Select.Option>
                  ))}
              </Antd.Select>
              {requiredFieldsIncomplete.id_tipo_estado && (
                <div className={styles.RequiredFieldsOrFormatError}>
                  {requiredFieldsIncomplete.id_tipo_estado}
                </div>
              )}
            </Antd.Form.Item>
          </div>
        )}

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
